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
var patterns = {
  var emailPattern = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
  var urlPattern = /^((http|https):\/\/)?(www.)?[\w.-]+\.[a-z]{2,4}([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i;
};
//Form Validation class
function FormValidation(form) {
  this.form = form;
  this.validateForm = function(e) {
    //Get all input text boxes
    var elements = form.formRoot.querySelectorAll("input[type='text'], input[type='email'], input[type='url']");
    //Check each textbox to see if it's empty or not
    for (var i = 0, j = elements.length; i < j; i++) {
      var elementName = form.getElementLabel(elements[i]);
      if (elements[i].value == "") {
        alert(elementName + " cannot be empty.");
        elements[i].focus();
        e.preventDefault();
        return false;
      }
    }
    var emailFieldName = form.getElementLabel(form.emailField);
    if(!patterns.emailPattern.test(form.emailField.value)) {
      alert("Please enter correct " + emailFieldName + "!");
      e.preventDefault();
      return false;
      }
    var homePageFieldName = form.getElementLabel(form.homePageField);
    if(!patterns.urlPattern.test(form.homePageField.value)) {
      alert("Please enter correct " + homePageFieldName + "!");
      e.preventDefault();
      return false;
      }
    //Get textarea
    var textArea = form.formRoot.querySelector("textarea");
    //Textarea Length
    var minLength = 50, minLengthMessage = "";
    if (textArea.value.length < minLength) {
      var textAreaName = form.getElementLabel(textArea);
      minLengthMessage = "Minimum length of " + textAreaName + " should be " + minLength + " characters.";
      alert(minLengthMessage);
      textArea.focus();
      e.preventDefault();
      return false;
    }
    //Check receive notifications
    var doOrDont = form.notificationsElement.checked ? "" : "don\'t ";
    var confirmed = confirm("Are you sure you " + doOrDont + "want to receive notifications?");
    if (!confirmed) {
      e.preventDefault();
      return false;
    }
  }
  //Put a Form submit Event Listener
  this.form.formRoot.addEventListener("submit", this.validateForm, false);
}
//Initialise the objects
var registrationFormValidation = new FormValidation(form);
