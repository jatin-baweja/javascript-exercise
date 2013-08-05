function Validation(fieldId) {
  //Variables required for each instance
  this.field = document.getElementById(fieldId);
  this.fieldType = this.field.tagName.toLowerCase();
  if(this.field.getAttribute('type') != null)
    this.fieldType += "[" + this.field.getAttribute('type') + "]";
  this.fieldLabel = document.querySelector("label[for='" + fieldId + "']").textContent;
}
//To check if a field is satisfying a condition
Validation.prototype.isSatisfyingCondition = function(propertyToCheck, constraint) {
  switch (propertyToCheck) {
    case "notempty" :
      if (this.isTextField()) {
        return this.isNotEmptyField();
      }
      break;
    case "length" :
      if (this.isTextField()) {
        return this.hasMinimumLength(constraint);
      }
      break;
    case "checked" :
      if (this.isCheckbox()) {
        return this.confirmChecked(constraint);
      }
      break;
    default :
      break;
  }
}
//To check if given field is a Text Field
Validation.prototype.isCheckbox = function() {
  return this.fieldType == "input[checkbox]";
}
//To check if given field is a Text Field
Validation.prototype.isTextField = function() {
  return this.fieldType == "input[text]"
    || this.fieldType == "input[email]"
    || this.fieldType == "input[url]"
    || this.fieldType == "textarea";
}
//To check if a checkbox is checked or not
Validation.prototype.isChecked = function() {
  return this.isCheckbox()
    && this.field.checked;
}
//To check if a field is empty or not
Validation.prototype.isNotEmptyField = function() {
  var trimmedFieldValue = this.field.value.trim();
  var errorMessage = this.fieldLabel + " cannot be empty.";
  if (this.field.value == "" || trimmedFieldValue == "") {
    this.outputError(errorMessage);
    return false;
  }
  return true;
}
//To check if the length of a field is greater than a certain value
Validation.prototype.hasMinimumLength = function(length) {
  var fieldValue = this.field.value;
  var errorMessage = this.fieldLabel + " should be minimum " + length + " characters.";
  if (fieldValue.length < length) {
    this.outputError(errorMessage);
    return false;
  }
  return true;
}
//To confirm whether a user has or has not clicked on a form Checkbox
Validation.prototype.confirmChecked = function(confirmMessage) {
  var confirmed = confirm(confirmMessage);
  return confirmed;
}
//To output error
Validation.prototype.outputError = function(messageToOutput) {
  alert(messageToOutput);
  this.field.focus();
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