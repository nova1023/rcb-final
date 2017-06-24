// Include React
var React = require("react");


// Create the Parent Component
class PageContainer extends React.Component {
  render() {
    return <h1>Hello, whats up?</h1>
  }
}

// Export the component back for use in other files
module.exports = PageContainer;