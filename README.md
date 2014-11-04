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