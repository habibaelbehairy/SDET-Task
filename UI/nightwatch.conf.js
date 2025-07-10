const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");

module.exports = {
  src_folders: ["./tests"],
  page_objects_path: ["./page-objects"],

  webdriver: {
    start_process: true,
    port: 9515,
    server_path: chromedriver.path,
  },
  // this is commented to generate html report as it gives error when running tests after a failure
  // Uncomment to run tests after a failure

  // skip_testcases_on_fail: false,
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        },
      },
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        start_process: true,
        port: 9515,
      },
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
        },
        "goog:loggingPrefs": { browser: "ALL" },
      },
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
        port: 4444,
      },
      desiredCapabilities: {
        browserName: "firefox",
        "moz:firefoxOptions": {
          args: ["--headless"],
        },
      },
    },
  },
};
