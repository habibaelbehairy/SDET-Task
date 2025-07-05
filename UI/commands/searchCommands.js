module.exports = {
  search(searchTerm) {
    return this.setValue("@searchBox", searchTerm)
      .click("@searchBoxButton")
      .waitForElementVisible("@productList", 10000);
  },

  assertSearchHeading(expectedText) {
    const browser = this.api;
    this.getText("@searchHeading", (result) => {
      const actualText = result.value;
      browser.assert.ok(
        actualText.includes(expectedText),
        `Search heading "${actualText}" contains "${expectedText}"`
      );
    });
    return this;
  },

  assertSearchResultCount() {
    const browser = this.api;
    this.getText("@headingCounter", (result) => {
      const counterText = result.value;
      const match = counterText.match(/(\d+)\s+results?/i);

      if (match && match[1]) {
        const expectedCount = parseInt(match[1], 10);
        browser.globals.expectedResultCount = expectedCount;
        browser.assert.ok(
          expectedCount > 0,
          `Search found ${expectedCount} results according to heading counter`
        );
      } else {
        browser.assert.fail(
          "Could not extract result count from heading counter"
        );
      }
    });

    return this;
  },

  assertAllProductsContainDress() {
    const browser = this.api;
    this.assertSearchResultCount();

    browser.elements("css selector", "@productNames", (result) => {
      const elements = result.value || [];
      const expectedCount = browser.globals.expectedResultCount;

      browser.assert.strictEqual(
        elements.length,
        expectedCount,
        `Expected ${expectedCount} products, found ${elements.length}`
      );

      if (elements.length === 0) {
        browser.assert.fail("No products found in the search results");
        return;
      }

      let processed = 0;
      let dressCount = 0;

      elements.forEach((element) => {
        const elementId =
          element.ELEMENT || element["element-6066-11e4-a52e-4f735466cecf"];
        browser.elementIdText(elementId, (textResult) => {
          const text = textResult.value
            ? String(textResult.value).toLowerCase()
            : "";

          if (text.includes("dress")) {
            dressCount++;
          }

          processed++;

          if (processed === elements.length) {
            browser.assert.strictEqual(
              dressCount,
              expectedCount,
              `All ${expectedCount} products should contain 'dress'. Found ${dressCount}`
            );
          }
        });
      });
    });

    return this;
  },
};
