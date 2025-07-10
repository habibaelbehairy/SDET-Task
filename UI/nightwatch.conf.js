// module.exports = {
//   src_folders: ["./tests"],
//   page_objects_path: ["./page-objects"],
  
//   webdriver: {
//     start_process: true,
//     port: 9515,
//     server_path: require('chromedriver').path
//   },

//   skip_testcases_on_fail: false,
  
//   test_settings: {
//     default: {
//       screenshots: {
//         enabled: false,
//         path: "screenshots",
//         on_failure: false
//       },
//       desiredCapabilities: {
//         browserName: "chrome",
//         chromeOptions: {
//           args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]
//         }
//       }
//     },
//     chrome: {
//       webdriver: {
//         server_path: require('chromedriver').path,
//         port: 9515
//       },
//       desiredCapabilities: {
//         browserName: "chrome",
//         chromeOptions: {
//           args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"]
//         },
//         loggingPrefs: { browser: 'ALL' }
//       }
//     },
//     firefox: {
//       webdriver: {
//         server_path: require('geckodriver').path,
//         port: 4444
//       },
//       desiredCapabilities: {
//         browserName: "firefox",
//         "moz:firefoxOptions": {
//           args: ["--headless"]
//         }
//       }
//     }
//   }
// };
const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  src_folders: ["./tests"],
  page_objects_path: ["./page-objects"],
  
  webdriver: {
    start_process: true,
    port: 9515,
    server_path: chromedriver.path
  },

  skip_testcases_on_fail: false,
  
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-dev-shm-usage"]
        }
      }
    },
    chrome: {
      webdriver: {
        server_path: chromedriver.path,
        port: 9515
      },
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--disable-dev-shm-usage"]
        },
        "goog:loggingPrefs": { browser: 'ALL' }
      }
    },
    firefox: {
      webdriver: {
        server_path: geckodriver.path,
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