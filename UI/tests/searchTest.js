module.exports = {
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
