// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the main Parent Component
var PageContainer = require("./components/PageContainer");

// This code here allows us to render our main component (in this case Parent)
// ReactDOM.render(<Parent />, document.getElementById("app"));
ReactDOM.render(<PageContainer />, document.getElementById("app"));
