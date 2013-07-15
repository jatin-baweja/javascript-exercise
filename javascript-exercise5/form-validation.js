var form = {
  formRoot : document.getElementById("registration"),
  notificationsElement : document.getElementById("notifications"),
  aboutMeField : document.getElementById("about-me"),
  getElementLabel : function(field) {
    var label = field.parentNode.parentNode.querySelector("label").textContent;
    return label;
  }
};
//To output error message
function outputError(field, messageToOutput, event){
  alert(messageToOutput);
  field.focus();
  event.preventDefault();
  return false;
}
//To check if a form field is empty
function isEmptyField(field, event) {
  var fieldName = form.getElementLabel(field);
  var trimmedFieldValue = field.value.trim();
  var errorMessage = fieldName + " cannot be empty.";
  if (field.value == "" || trimmedFieldValue == "") {
    return !outputError(field, errorMessage, event);
  }
  return false;
}
//Form Validation class
function FormValidation(form) {
  this.form = form;
  this.validateForm = function(event) {
    //Get all input text boxes
    var elements = form.formRoot.querySelectorAll(".textinput");
    //Check each textbox to see if it's empty or not
    for (var i = 0, j = elements.length; i < j; i++) {
      if(isEmptyField(elements[i], event)) {
        return false;
      }
    }
    //Define Minimum Textarea Length, Textarea Name and Error Messages
    var textAreaName = form.getElementLabel(form.aboutMeField);
    var minLength = 50, minLengthMessage = "Minimum length of " + textAreaName + " should be " + minLength + " characters.", blankInputMessage = textAreaName + " cannot be empty or blank.";
    if (form.aboutMeField.value.trim() == "") {
      return outputError(form.aboutMeField, blankInputMessage, event);
    }
    if (form.aboutMeField.value.length < minLength) {
      return outputError(form.aboutMeField, minLengthMessage, event);
    }
    //Check receive notifications
    var doOrDont = form.notificationsElement.checked ? "" : "don\'t ";
    var confirmed = confirm("Are you sure you " + doOrDont + "want to receive notifications?");
    if (!confirmed) {
      event.preventDefault();
      return false;
    }
  }
  //Put a Form submit Event Listener
  this.form.formRoot.addEventListener("submit", this.validateForm, false);
}
//Initialise the objects
var registrationFormValidation = new FormValidation(form);
