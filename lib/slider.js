(function ($) {

  $.fn.sliderbar = function (options) {

    return $(this).each(
        function () {
          if ($(this).data('slider')) {
            var dataObject = $(this).data('slider');
            if (options == 'destroy') {
              dataObject.destroy();
            }

            if (typeof options == 'object') {
              dataObject.update(options);
            }
          } else {
            if (options !== 'destroy') {
              $(this).data('slider', new sliderbar(this, options));
            }
          }
        }
    );
  };


  var sliderbar = function (element, options) {
    var self = this;

    self.settings = $.extend({
      type: "horizontal",
      minValue: 0,
      maxValue: 100,
      step: 1,
      disabled: false,
      responsive: false
    }, options);

    self.element = $(element);

    self.init();
    return self;
  };

  $.extend(sliderbar.prototype, {
    getOffsetSum: function (elem) {
      var top = 0, left = 0;
      while (elem) {
        top = top + parseFloat(elem.offsetTop);
        left = left + parseFloat(elem.offsetLeft);
        elem = elem.offsetParent
      }
      return {top: Math.round(top), left: Math.round(left)}
    },

    draw: function (self) {
      var slideBlock;
      slideBlock = '<div data-min="' + self.settings.minValue + '" data-max="' + self.settings.maxValue +'"';
      slideBlock += 'class="' + self.settings.type + 'Style ' + self.element.attr('name') + '">';
      slideBlock += '<div class="controlStyle"><div></div></div></div>';
      self.element.after(slideBlock);
    },

    linkItems: function (self) {
      self.currentBar = $('.' + self.element.attr('name'));
      self.control = self.currentBar.find('.controlStyle');
      self.description = self.control.find('div');
      self.input = $('input[name="' + self.currentBar.attr('class').split(' ').pop() + '"]');
    },

    updateConfig: function (self) {
      var stepCount = ( self.settings.maxValue - self.settings.minValue ) / self.settings.step;
      switch (self.settings.type) {
        case 'horizontal':
          if (( ( self.settings.maxValue - self.settings.minValue ) / self.settings.step) > self.currentBar.width()) {
            self.settings.widthBar = ( self.settings.maxValue - self.settings.minValue ) / self.settings.step;
            self.currentBar.width(self.settings.widthBar);
          } else {
            self.settings.widthBar = self.currentBar.width();
          }
          self.stepWidth = self.settings.widthBar / stepCount;
          break;
        case 'vertical':
          if (( ( self.settings.maxValue - self.settings.minValue ) / self.settings.step) > self.currentBar.height()) {
            self.settings.heightBar = ( self.settings.maxValue - self.settings.minValue ) / self.settings.step;
            self.currentBar.height(self.settings.heightBar);
          } else {
            self.settings.heightBar = self.currentBar.height();
          }
          self.stepWidth = self.settings.heightBar / stepCount;
          break;
      }

      self.settings.widthButton = self.control.width();
      self.settings.heightButton = self.control.height();
    },

    bindActions: function (type, self) {
      var down, move, up, resize;
      self.timeStamp = new Date();
      self.document = $(document);
      if ("ontouchstart" in window) {
        down = "touchstart.slider";
        move = "touchmove.slider." + self.element.attr('name');
        up = "touchend.slider." + self.element.attr('name');
        resize = 'orientationchange.slide.' + self.element.attr('name');
      } else {
        down = "mousedown.slider";
        up = "mouseup.slider." + self.element.attr('name');
        move = "mousemove.slider." + self.element.attr('name');
        resize = 'resize.slide.' + self.element.attr('name');
      }

      if (type == 'bind') {
        self.control.on(down, function (e) {
          self.mouseDown(e, self);
        });
        $(document).on(up, function (e) {
          self.mouseUp(e, self);
        });
        $(document).on(move, function (e) {
          self.mouseMove(e, self);
        });
        self.currentBar.on(down, function (e) {
          self.barClick(e, self);
        });
        if (self.settings.responsive) {
          $(window).on(resize, function () {
            clearTimeout(self.timerId);
            self.timerId = setTimeout(function() {
              self.update(self.settings);
              self.checkResult(self.value, self.currentBar , self);
            }, 200);
          });
        }
      } else {
        if (type === 'unbind') {
          self.control.off(down);
          $(document).off(up);
          $(document).off(move);
          self.currentBar.off(down);
          if (self.settings.responsive) {
            $(window).off(resize);
          }
        }
      }
    },

    init: function () {
      var self = this;
      var controlPosition;

      self.draw(self);
      self.linkItems(self);
      self.updateConfig(self);

      controlPosition = {
        marginTop: self.settings.heightButton / 2,
        marginLeft: self.settings.widthButton / 2
      };

      self.control.css({'margin-top': -controlPosition.marginTop, 'margin-left': -controlPosition.marginLeft});
      self.description.html(self.settings.minValue);
      self.input.val(self.settings.minValue);

      if (self.settings.disabled) {
        self.currentBar.addClass('disabledSlide');
      } else {
        self.bindActions('bind', self);
      }
    },

    mouseDown: function (e, self) {
      if ($(e.target).hasClass('controlStyle')) {
        self.currentObject = $(e.target);
        self.currentObject.addClass('active');
      }
      return false;
    },

    mouseUp: function (e, self) {
      if (self.currentObject) {
        self.currentObject.removeClass('active');
        self.currentObject = null;
      }
      return false;
    },

    checkResult: function (e, obj, self) {
      var pos;
      switch (self.settings.type) {
        case 'horizontal':
          if (typeof e === 'object') {
            pos = "ontouchstart" in window ? e.originalEvent.touches[0].pageX : e.pageX;
            self.control.left = pos - self.getOffsetSum(obj).left;
            self.value = self.settings.minValue + Math.ceil(self.control.left / self.stepWidth) * self.settings.step;
          } else {
            self.value = self.value == 'undefined' ? self.settings.minValue : self.value;
            self.control.left = (self.value - self.settings.minValue) * self.stepWidth / self.settings.step;
          }


          if (( self.control.left >= ( +self.settings.widthBar + self.settings.widthButton / 2 ) ) || (  self.value > self.settings.maxValue )) {
            self.control.css({left: +self.settings.widthBar});
            self.input.val(self.settings.maxValue);
            self.description.html(self.settings.maxValue);
            return false;
          }

          if (( self.control.left <= 0 ) || ( self.value < self.settings.minValue )) {
            self.control.css({left: 0});
            self.input.val(self.settings.minValue);
            self.description.html(self.settings.minValue);
            return false;
          }

          self.control.css({left: self.control.left});
        break;
        case 'vertical':
          if (typeof e === 'object') {
            pos = "ontouchstart" in window ? e.originalEvent.touches[0].pageY : e.pageY;
            self.control.top = pos - self.getOffsetSum(obj).top;
            self.value = self.settings.minValue + Math.ceil(self.control.top / self.stepWidth) * self.settings.step;
          } else {
            self.value = self.value == 'undefined' ? self.settings.minValue : self.value;
            self.control.top = (self.value - self.settings.minValue) * self.stepWidth / self.settings.step;
          }

          if (( self.control.top >= ( +self.settings.heightBar + self.settings.heightButton / 2 ) ) || ( self.value > self.settings.maxValue )) {
            self.control.css({top: +self.settings.heightBar});
            self.input.val(self.settings.maxValue);
            self.description.html(self.settings.maxValue);
            return false;
          }

          if (( self.control.top <= 0 ) || (self.value < self.settings.minValue )) {
            self.control.css({top: 0});
            self.input.val(self.settings.minValue);
            self.description.html(self.settings.minValue);
            return false;
          }

          self.control.css({top: self.control.top});
          break;
      }

      self.input.val(self.value);
      self.description.html(self.value);
      return true;
    },
    /* Changing position control and calculating new number for input, when clicked on a bar*/
    barClick: function (e, self) {
      if (!$(e.target).hasClass('horizontalStyle') && !$(e.target).hasClass('verticalStyle')) {
        return false;
      } else {

        var checkObj = e.target;
        self.checkResult(e, checkObj, self);
      }

      return true;
    },

    mouseMove: function (e, self) {
      if (self.currentObject) {
        var checkObj = self.currentObject[0].parentNode;
        e.preventDefault();
        self.checkResult(e, checkObj, self);
      }

      return true;
    },

    clear: function () {
      var self = this;
      self.bindActions('unbind', self);
      self.currentBar.remove();
    },

    destroy: function () {
      var self = this;
      self.clear();
      self.element.removeData('slider');
    },

    update: function (options) {
      var self = this;
      self.clear();
      self.settings = $.extend(self.settings, options);
      self.init();
    }
  });

}(jQuery));

