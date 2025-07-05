

module.exports = {
  form(subjectHeading, emailAddress, orderReference, attachFileInput, message) {
    const form = this
      .setValue("@subjectHeading", subjectHeading)
      .setValue("@emailAddress", emailAddress)
      .setValue("@orderReference", orderReference);

    if (attachFileInput) {
      form.setValue("@attachFileInput", attachFileInput);
    }

    return form
      .setValue("@message", message)
      .click("@sendButton");
  }
};
