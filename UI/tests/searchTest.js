module.exports = {
  beforeEach: function (browser) {
    // Setup for each test
    browser.maximizeWindow();
  },

  afterEach: function (browser, done) {
    // Clean up after each test - ensure this runs even after failures
    browser.end(function () {
      done();
    });
  },

  "search for a dress": (browser) => {
    const homePage = browser.page.homePage();

    homePage
      .navigate()
      .search("dress")
      .assertSearchHeading("DRESS")
      .assertAllProductsContainDress()
      .end();
  },
};
