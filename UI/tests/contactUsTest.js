const path = require("path");

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

  // 1. Contact Form - All fields blank should fail
  "Contact Form - All fields blank should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("", "", "", "", "").assert.visible("@errorMessage");
  },

  // 2. Invalid email and unselected subject should fail
  "Contact Form - Invalid email and unselected subject should fail": (
    browser
  ) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("--", "invalidEmail", "order123", "", "Hello")
      .assert.visible("@errorMessage");
  },

  // 3. Minimal valid submission should pass
  "Contact Form - Minimal valid submission should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("Customer service", "user@example.com", "order456", "", "Hello")
      .assert.visible("@successMessage");
  },

  // 4. Missing order reference should pass
  "Contact Form - missing order reference should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("Customer service", "user@example.com", "", "", "Hello")
      .assert.visible("@successMessage");
  },

  // 5. Missing message should fail
  "Contact Form - missing message should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("Customer service", "user@example.com", "order", "", "")
      .assert.visible("@errorMessage");
  },

  // 6. Valid order reference and long message should pass
  "Contact Form - Valid order reference and long message should pass": (
    browser
  ) => {
    const contact = browser.page.contactUsPage();
    const longMessage = "A".repeat(1000);
    contact.navigate();
    contact
      .form("Webmaster", "user@example.com", "ORD123456", "", longMessage)
      .assert.visible("@successMessage");
  },

  // 7. Invalid order reference
  "Contact Form - Invalid order reference": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Webmaster",
        "user@example.com",
        "ORD@#!",
        "",
        "Please help with my order"
      )
      .assert.visible("@errorMessage");
  },

  // 8. XSS input in message
  "Contact Form - XSS input in message": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "",
        "",
        '<script>alert("XSS")</script>'
      )
      .assert.visible("@errorMessage");
  },

  // 9. Upload valid file should pass
  "Contact Form - Upload valid file should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    const filePath = path.join(
      __dirname,
      "..",
      "test-files",
      "small-test-file.pdf"
    );
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "",
        filePath,
        "Attached file"
      )
      .assert.visible("@successMessage");
  },

  // 10. Upload unsupported file format should fail
  "Contact Form - Upload unsupported file format should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    const filePath = path.join(__dirname, "..", "test-files", "test-file.exe");
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "",
        filePath,
        "Check this file"
      )
      .assert.visible("@errorMessage");
  },

  // 11. Submit with emojis and long order reference
  "Contact Form - Submit with emojis and long order reference": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "ORDER" + "X".repeat(40),
        "",
        "Please help 😊"
      )
      .assert.visible("@errorMessage");
  },
};
