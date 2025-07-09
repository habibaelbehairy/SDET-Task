module.exports = {
  src_folders: ["./tests"],
  page_objects_path: ["./page-objects"],
  
  webdriver: {
    start_process: true,
    port: 9515,
    server_path: require('chromedriver').path
  },

  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        path: "screenshots",
        on_failure: true
      },
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]
        }
      }
    },
    chrome: {
      webdriver: {
        server_path: require('chromedriver').path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]
        },
        loggingPrefs: { browser: 'ALL' }
      }
    },
    firefox: {
      webdriver: {
        server_path: require('geckodriver').path,
        port: 4444
      },
      desiredCapabilities: {
        browserName: "firefox",
        "moz:firefoxOptions": {
          args: ["--headless"]
        }
      }
    }
  }
};