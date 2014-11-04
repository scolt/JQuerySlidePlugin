$(document).ready(function () {
  $(".InputFromFirstInit").sliderbar({
    type: "horizontal",
    minValue: 10,
    maxValue: 20,
    step: 2,
    disabled: false
  });
  $(".exampleOneInput").sliderbar({
    type: "horizontal",
    minValue: 10,
    maxValue: 20,
    step: 2,
    disabled: false,
    responsive: true
  });
  $(".largeInput").sliderbar({
    type: "horizontal",
    minValue: 0,
    maxValue: 1200,
    step: 2,
    disabled: false
  });
  $(".firstDisabledHorizontalInput").sliderbar({
    type: "horizontal",
    minValue: 0,
    maxValue: 100,
    step: 5,
    disabled: true
  });
  $(".secondDisabledHorizontalInput").sliderbar({
    type: "horizontal",
    minValue: 0,
    maxValue: 1200,
    step: 2,
    disabled: true
  });
  var item = $(".actionInput").sliderbar({
    type: "horizontal",
    minValue: 0,
    maxValue: 1200,
    step: 2,
    disabled: false
  });

  $(".verticalNormalInput").sliderbar({
    type: "vertical",
    minValue: 0,
    maxValue: 10,
    step: 1,
    disabled: false,
    responsive: true
  });

  $(".verticalLargeInput").sliderbar({
    type: "vertical",
    minValue: 0,
    maxValue: 120,
    step: 1,
    disabled: false
  });

  $(".verticalLargeDisabledInput").sliderbar({
    type: "vertical",
    minValue: 0,
    maxValue: 120,
    step: 1,
    disabled: true
  });

  $(".verticalNormalDisabledInput").sliderbar({
    type: "vertical",
    minValue: 0,
    maxValue: 10,
    step: 1,
    disabled: true
  });

  $("#disabledCheckbox").change(function () {
    if ($(this).is(':checked')) {
      item.sliderbar({
        disabled: true
      });
    } else {
      item.sliderbar({
        disabled: false
      });
    }
  });

  $('#destroyLink').on('click', function() {
    item.sliderbar('destroy');
  });

  $("#rangeSelect").change(function () {
    switch ($(this).val()) {
      case 'to1200':
        item.sliderbar({
          maxValue: 1200
        });
        break;
      case 'to100':
        item.sliderbar({
          maxValue: 100
        });
        break;
    }
  });
});