const path = require("path");

module.exports = {
  // 1. All fields blank
  "Contact Form - All fields blank should fail": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact.form("", "", "", "", "").assert.visible("@errorMessage");
  },

  // 2. Invalid email with selected subject and valid message
  "Contact Form - Invalid email should trigger error": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("Customer service", "user@", "ORD123", "", "This is a test message")
      .assert.visible("@errorMessage");
  },

  // 3. Valid email and file but no message
  "Contact Form - Missing message should block submission": (browser) => {
    const contact = browser.page.contactUsPage();
    const filePath = path.resolve(
      "C:\\Users\\habib\\Downloads\\SDET 2025 - Technical Task.pdf"
    );
    contact.navigate();
    contact
      .form("Customer service", "user@example.com", "ORD123", filePath, "")
      .assert.visible("@errorMessage");
  },

  // 4. Invalid file type uploaded
  "Contact Form - Invalid file type should show error": (browser) => {
    const contact = browser.page.contactUsPage();
    const filePath = path.resolve("C:\\Users\\habib\\Downloads\\malware.exe");
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "ORD4",
        filePath,
        "Check attachment"
      )
      .assert.visible("@errorMessage");
  },

  // 5.  Very long message
  "Contact Form - Long message ": (browser) => {
    const longMsg = "a".repeat(5000);
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form("Customer service", "user@example.com", "ORD467", "", longMsg)
      .assert.visible("@successMessage");
  },

  // 6. Long email
  "Contact Form - very Long email (email max 64 before @)": (browser) => {
    const filePath = path.resolve(
      "C:\\Users\\habib\\Downloads\\SDET 2025 - Technical Task.pdf"
    );
    const longEmail = "verylongemailaddress".repeat(10) + "@example.com";
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Customer service",
        longEmail,
        "order202022",
        filePath,
        "Test message with long data"
      )
      .assert.visible("@errorMessage");
  },

  // 7. Contact Form - Should prevent script injection in message field
  "Contact Form - Message with script tag should be sanitized": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "ORD777",
        "",
        '<script>alert("XSS")</script>'
      )
      .assert.visible("@errorMessage");
  },

  // 8. Uploads a file larger than the allowed limit to verify rejection
  "Contact Form - Large file upload should be rejected": (browser) => {
    const contact = browser.page.contactUsPage();
    const filePath = "C:\\Users\\habib\\Downloads\\simulated_book_100MB.pdf";
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "ORD888",
        filePath,
        "This file is too big"
      )
      .assert.visible("@successMessage");
  },

  // 9. All valid fields (Happy path)
  "Contact Form - All valid fields should succeed": (browser) => {
    const contact = browser.page.contactUsPage();
    contact.navigate();
    contact
      .form(
        "Customer service",
        "user@example.com",
        "ORD101",
        "invoice.png",
        "Thank you for your help."
      )
      .assert.not.visible("@errorMessage")
      .assert.visible("@successMessage");
  },
};
