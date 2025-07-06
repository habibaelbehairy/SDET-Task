const path = require("path");

module.exports = {
  beforeEach: function (browser) {
    browser.maximizeWindow();
  },

  afterEach: function (browser, done) {
    browser.end(function () {
      done();
    });
  },

  // TC01: Missing subject with all other fields valid
  "TC01 - Missing subject should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("", "user@example.com", "ORD123456", filePath, "Short message");
    contact.assert.visible("@errorMessage");
  },

  // TC02: Missing email with valid subject
  "TC02 - Missing email should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("2", "", "ORD123456", filePath, "Need help with order");
    contact.assert.visible("@errorMessage");
  },

  // TC03: Invalid email format (missing @)
  "TC03 - Invalid email format (no @) should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("1", "userexample.com", "ORD123456", filePath, "Quick question");
    contact.assert.visible("@errorMessage");
  },

  // TC04: Invalid email format (no domain)
  "TC04 - Invalid email format (no domain) should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("2", "user@", "ORD123456", filePath, "Info needed");
    contact.assert.visible("@errorMessage");
  },

  // TC05: Invalid email format (no username)
  "TC05 - Invalid email format (no username) should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("1", "@domain.com", "ORD123456", filePath, "I'm contacting you");
    contact.assert.visible("@errorMessage");
  },

  // TC06: Very long email
  "TC06 - Very long email should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const veryLongEmail = "a".repeat(255) + "@example.com";
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("2", veryLongEmail, "ORD123456", filePath, "Long email test");
    contact.assert.visible("@errorMessage");
  },

  // TC07: Blank order reference (should pass as it's optional)
  "TC07 - Blank order reference should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("1", "user@example.com", "", null, "Please contact me");
    contact.assert.visible("@successMessage");
  },

  // TC08: Order reference with special characters
  "TC08 - Order reference with special characters should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("1", "user@example.com", "ORD@#!", filePath, "Weird ref format");
    contact.assert.visible("@errorMessage");
  },

  // TC09: Very long order reference
  "TC09 - Very long order reference should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const longOrderRef = "ORD" + "1".repeat(100);
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("1", "user@example.com", longOrderRef, filePath, "Long order ref test");
    contact.assert.visible("@errorMessage");
  },

  // TC10: Invalid file type
  "TC10 - Invalid file type should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "test-file.exe");
    contact.form("2", "user@example.com", "ORD123456", filePath, "Check file type");
    contact.assert.visible("@errorMessage");
  },

  // TC11: File too large
  "TC11 - File too large should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "python-3.13-docs-pdf-a4.zip");
    contact.form("2", "user@example.com", "ORD123456", filePath, "File too large");
    contact.assert.visible("@errorMessage");
  },

  // TC12: Blank message should fail
  "TC12 - Blank message should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("2", "user@example.com", "ORD123456", null, "");
    contact.assert.visible("@errorMessage");
  },

  // TC13: Short message should pass
  "TC13 - Short message should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("1", "user@example.com", "ORD123456", null, "Short msg");
    contact.assert.visible("@successMessage");
  },

  // TC14: Very long message
  "TC14 - Very long message should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const longMessage = "A".repeat(1000);
    contact.form("2", "user@example.com", "ORD123456", null, longMessage);
    contact.assert.visible("@successMessage");
  },

  // TC15: Message with script tags (XSS attempt)
  "TC15 - Message with script tags should be sanitized": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("2", "user@example.com", "ORD123456", filePath, '<script>alert("XSS")</script>');
    contact.assert.visible("@errorMessage");
  },

  // TC16: All valid inputs
  "TC16 - All valid inputs should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("2", "user@example.com", "ORD123456", filePath, "All valid inputs test");
    contact.assert.visible("@successMessage");
  },

  // TC17: Invalid subject value "0"
  "TC17 - Invalid subject value should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "small-test-file.pdf");
    contact.form("0", "user@example.com", "ORD123456", filePath, "Test invalid subject value");
    contact.assert.visible("@errorMessage");
  },

  // TC18: Another valid submission with different subject
  "TC18 - Valid submission with Webmaster subject should pass": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    const filePath = path.join(__dirname, "..", "test-files", "Nightwatchjs.png");
    contact.form("1", "user@example.com", "ORD123456", filePath, "Hello again");
    contact.assert.visible("@successMessage");
  },

  // TC19: All fields blank
  "TC19 - All fields blank should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("", "", "", null, "");
    contact.assert.visible("@errorMessage");
  }
};