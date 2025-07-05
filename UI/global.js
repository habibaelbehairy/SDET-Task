module.exports = {
  skipTestcasesOnFail: false,
  abortOnAssertionFailure: false,

  // Custom function that runs before each test suite
  beforeEach: function (browser, done) {
    console.log("Running test: " + browser.currentTest.name);
    done();
  },

  // Custom function that runs after each test suite
  afterEach: function (browser, done) {
    console.log("Completed test: " + browser.currentTest.name);
    done();
  },
};

