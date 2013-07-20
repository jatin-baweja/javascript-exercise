function Validation(fieldId) {
  this.field = document.getElementById(fieldId);
  this.fieldType = this.field.tagName.toLowerCase();
  if(this.field.getAttribute('type') != null)
    this.fieldType += "[" + this.field.getAttribute('type') + "]";
  this.fieldLabel = document.querySelector("label[for='" + fieldId + "']").textContent;
  var validationScope = this;
  //To check if a field is satisfying a condition
  this.isSatisfyingCondition = function(propertyToCheck, constraint) {
    switch (propertyToCheck) {
      case "notempty" :
        if (validationScope.isTextField()) {
          return validationScope.isNotEmptyField();
        }
        break;
      case "length" :
        if (validationScope.isTextField()) {
          return validationScope.hasMinimumLength(constraint);
        }
        break;
      case "checked" :
        if (validationScope.isCheckbox()) {
          return validationScope.confirmChecked(constraint);
        }
        break;
      default :
        break;
    }
  }
  //To check if given field is a Text Field
  this.isCheckbox = function() {
    if (validationScope.fieldType == "input[checkbox]") {
      return true;
    }
    return false;
  }
  //To check if given field is a Text Field
  this.isTextField = function() {
    if (validationScope.fieldType == "input[text]"
        || validationScope.fieldType == "input[email]"
        || validationScope.fieldType == "input[url]"
        || validationScope.fieldType == "textarea") {
      return true;
    }
    return false;
  }
  //To check if a checkbox is checked or not
  this.isChecked = function() {
    if (validationScope.isCheckbox()) {
      return validationScope.field.checked;
    }
    return false;
  }
  //To check if a field is empty or not
  this.isNotEmptyField = function() {
    var trimmedFieldValue = validationScope.field.value.trim();
    var errorMessage = validationScope.fieldLabel + " cannot be empty.";
    if (validationScope.field.value == "" || trimmedFieldValue == "") {
      validationScope.outputError(errorMessage);
      return false;
    }
    return true;
  }
  //To check if the length of a field is greater than a certain value
  this.hasMinimumLength = function(length) {
    var fieldValue = validationScope.field.value;
    var errorMessage = validationScope.fieldLabel + " should be minimum " + length + " characters.";
    if (fieldValue.length < length) {
      validationScope.outputError(errorMessage);
      return false;
    }
    return true;
  }
  //To confirm whether a user has or has not clicked on a form
  this.confirmChecked = function(confirmMessage) {
    var confirmed = confirm(confirmMessage);
    if (!confirmed) {
      return false;
    }
    return true;
  }
  //To output error
  this.outputError = function(messageToOutput) {
    alert(messageToOutput);
    validationScope.field.focus();
  }
}
//Define the variables for which validation is required
var notificationValidation = new Validation("notifications");
var aboutMeValidation = new Validation("about-me");
var textfields = document.querySelectorAll('.textinput');
var textfieldsValidation = [];
for (var i = 0; i < textfields.length; i++) {
  textfieldsValidation[i] = new Validation(textfields[i].id);
}
//To validate the Registration Form
function validateRegistrationForm(event) {
  //Validate whether textfields are empty or not
  for (var i = 0; i < textfields.length; i++) {
    if (!textfieldsValidation[i].isSatisfyingCondition("notempty")) {
      event.preventDefault();
      return false;
    }
  }
  //Validate Length of About Me Textarea
  if (!aboutMeValidation.isSatisfyingCondition("length", 50)) {
    event.preventDefault();
    return false;
  }
  //Validate whether user wants to recieve notifications or not
  var doOrDont = " don\'t";
  if (notificationValidation.isChecked()) {
    doOrDont = "";
  }
  var notificationsMessage = "Are you sure you" + doOrDont + " want to recieve notifications?";
  if (!notificationValidation.isSatisfyingCondition("checked", notificationsMessage)) {
    event.preventDefault();
    return false;
  }
}
//Add event listener to the Registration form
document.getElementById('registration').addEventListener('submit', validateRegistrationForm, false);