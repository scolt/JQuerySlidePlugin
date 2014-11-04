<!DOCTYPE html>
<html>
<head>
  <title>JS</title>
  <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="lib/slider.js"></script>
  <script src="js.js"></script>
  <link rel="stylesheet" href="lib/slider.css"/>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
<form action="some-action.html">
  <h1>Horizontal</h1>

  <h2>Two inputs from one js init (min: 10, max: 20, step: 2)</h2>
  <input name="firstInputFromFirstInit" type="hidden" class="InputFromFirstInit"/>
  <input name="secondInputFromFirstInit" type="hidden" class="InputFromFirstInit"/>

  <h2>
    Input for a range more than width
    <br>(min: 0, max: 1200, step: 2)
  </h2>
  <input name="horizontalLarge" type="hidden" class="largeInput"/>

  <h2>
    Disabled
    <br>(min: 0, max: 100, step: 5), (min: 0, max: 1200, step: 2)
  </h2>
  <input name="firstDisabledHorizontal" type="hidden" class="firstDisabledHorizontalInput"/>
  <input name="secondDisabledHorizontal" type="hidden" class="secondDisabledHorizontalInput"/>

  <h2>Action (min: 0, max: 1200, step: 2)</h2>
  <label for="rangeSelect">Change range: </label>
  <select name="params1" id="rangeSelect">
    <option value="to1200">from 0 to 1200</option>
    <option value="to100">from 0 to 100</option>
  </select>
  <br>
  <label for="disabledCheckbox">Change disabled status: </label>
  <input type="checkbox" id="disabledCheckbox"/>
  <br>
  <a href="#" id="destroyLink">Destroy slider</a>
  <input name="action" type="hidden" class="actionInput"/>

  <h1>Vertical</h1>

  <div class="verticalBlock">
    <input name="verticalNormal" type="hidden" class="verticalNormalInput"/>
    <input name="verticalLarge" type="hidden" class="verticalLargeInput"/>
    <input name="verticalLargeDisabled" type="hidden" class="verticalLargeDisabledInput"/>
    <input name="verticalNormalDisabled" type="hidden" class="verticalNormalDisabledInput"/>
  </div>
  <div style="clear: both"></div>
  <h1>Another examples</h1>
  <input name="exampleOne" type="hidden" class="exampleOneInput"/>
  <h1>Description</h1>
  <ul>
    <li><strong>disabled</strong> - disabled input (only draw)</li>
    <li><strong>responsive</strong> - run rebuild of item on orientation change event with saving params</li>
    <li><strong>type</strong> - choose type of slider (should be "vertical" or "horizontal")</li>
    <li><strong>minValue</strong> - min value of range</li>
    <li><strong>maxValue</strong> - max value of range</li>
    <li><strong>step</strong> - step between two closed values</li>
  </ul>
  <strong>Default params:</strong>
  <pre>
    type: "horizontal",
    minValue: 0,
    maxValue: 100,
    step: 1,
    disabled: false,
    responsive: false
  </pre>
  <hr/>
  <button>OK</button>
</form>

</body>
</html>