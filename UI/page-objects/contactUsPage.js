const FormCommands = require("../commands/FormCommands");

module.exports = {
  url: "http://automationpractice.multiformis.com/index.php?controller=contact",
  elements: {
    subjectHeading: "#id_contact",
    emailAddress: "#email",
    orderReference: "#id_order",
    attachFileInput: "#fileUpload",
    message: "#message",
    sendButton: "#submitMessage",
    successMessage: ".alert-success",
    errorMessage: ".alert-danger",
  },
  commands: [FormCommands],
};
