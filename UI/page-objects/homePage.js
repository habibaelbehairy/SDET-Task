const searchCommands = require("../custom-commands/searchCommands");

module.exports = {
  url: "http://automationpractice.multiformis.com/index.php",
  elements: {
    searchBox: "#search_query_top",
    searchBoxButton: "#searchbox > button",
    productList: "#product_list",
    headingCounter: "#center_column > h1 > span.heading-counter",
    searchHeading: "#center_column > h1 > span.lighter",
    productNames: "#product_list .product-name",
  },
  commands: [searchCommands],
};
