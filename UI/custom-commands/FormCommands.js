module.exports = {
  form(subjectHeading, emailAddress, orderReference, attachFileInput, message) {
    if (subjectHeading) {
      this.api.execute(
        function (value) {
          document.querySelector("#id_contact").value = value;
          const event = new Event("change", { bubbles: true });
          document.querySelector("#id_contact").dispatchEvent(event);
        },
        [subjectHeading]
      );
    }

    this.setValue("@emailAddress", emailAddress).setValue(
      "@orderReference",
      orderReference
    );

    if (attachFileInput) {
      this.setValue("@attachFileInput", attachFileInput);
    }

    return this.setValue("@message", message).click("@sendButton");
  },
};
