var form = {
  formRoot : document.getElementById("registration"),
  notificationsElement : document.getElementById("notifications"),
  emailField : document.getElementById("email"),
  homePageField : document.getElementById("home-page"),
  getElementLabel : function(field) {
    var label = field.parentNode.parentNode.querySelector("label").textContent;
    return label;
  }
};
//Patterns to check against
var patterns = {
  emailPattern : /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
  urlPattern : /^((http|https):\/\/)?(www.)?[\w.-]+\.[a-z]{2,4}([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i
};
//To check if a form field is empty
function isEmptyField(field, event) {
  var fieldName = form.getElementLabel(field);
  if (field.value == "") {
    alert(fieldName + " cannot be empty.");
    field.focus();
    event.preventDefault();
    return true;
  }
  return false;
}
//To check if a form field is valid
function isValidField(patternToMatch, field, event) {
  var fieldName = form.getElementLabel(field);
  if(!patternToMatch.test(field.value)) {
    alert("Please enter correct " + fieldName + "!");
    event.preventDefault();
    return false;
  }
  return true;
}
//Form Validation class
function FormValidation(form) {
  this.form = form;
  this.validateForm = function(event) {
    //Get all input text boxes
    var elements = form.formRoot.querySelectorAll("input[type='text'], input[type='email'], input[type='url']");
    //Check each textbox to see if it's empty or not
    for (var i = 0, j = elements.length; i < j; i++) {
      if(isEmptyField(elements[i], event)) {
        return false;
      }
    }
    //Check Email and HomePage Fields if they match the respective Patterns
    if(!isValidField(patterns.emailPattern, form.emailField, event)) {
      return false;
    }
    if(!isValidField(patterns.urlPattern, form.homePageField, event)) {
      return false;
    }
    //Get textarea
    var textArea = form.formRoot.querySelector("textarea");
    //Define Minimum Textarea Length
    var minLength = 50, minLengthMessage = "";
    if (textArea.value.length < minLength) {
      var textAreaName = form.getElementLabel(textArea);
      minLengthMessage = "Minimum length of " + textAreaName + " should be " + minLength + " characters.";
      alert(minLengthMessage);
      textArea.focus();
      event.preventDefault();
      return false;
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
