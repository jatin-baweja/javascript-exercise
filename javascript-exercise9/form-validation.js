var forms = {
  formId : document.getElementById("registration"),
  notifications : document.getElementById("notifications")
};

function FormValidation(forms) {
  this.forms = forms;
  
  this.FormChecker = function(e) {
    //Get all input text boxes
    var elements = forms.formId.querySelectorAll("input[type='text'], input[type='email'], input[type='url']");
    //Check each textbox to see if it's empty or not
    for (var i = 0, j = elements.length; i < j; i++) {
      var elementName = getLabel(elements[i]);
      if (elements[i].value == "") {
        alert(elementName + " cannot be empty.");
        elements[i].focus();
        e.preventDefault();
        return false;
      }
    }
    //Get Email Field
    var emailField = forms.formId.querySelector("#email");
    //Email Pattern to check
    var emailPattern = /^[a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    var emailFieldName = getLabel(emailField);
    if(!emailPattern.test(emailField.value)) {
      alert("Please enter correct " + emailFieldName + "!");
      e.preventDefault();
      return false;
      }
    //Get HomePage Field
    var homePageField = forms.formId.querySelector("#home-page");
    //URl Pattern to check
    var urlPattern = /^((http|https):\/\/)?(www.)?[\w.-]+\.[a-z]{2,4}([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i;
    var homePageFieldName = getLabel(homePageField);
    if(!urlPattern.test(homePageField.value)) {
      alert("Please enter correct " + homePageFieldName + "!");
      e.preventDefault();
      return false;
      }
    //Get textarea
    var textArea = forms.formId.querySelector("textarea");
    //Textarea Length
    var minLength = 50, minLengthMessage = "";
    if (textArea.value.length < minLength) {
      var textAreaName = getLabel(textArea);
      minLengthMessage = "Minimum length of " + textAreaName + " should be " + minLength + " characters.";
      alert(minLengthMessage);
      textArea.focus();
      e.preventDefault();
      return false;
    }
    //Check receive notifications
    var doOrDont = forms.notifications.checked ? "" : "don\'t ";
    var confirmed = confirm("Are you sure you " + doOrDont + "want to receive notifications?");
    if (!confirmed) {
      e.preventDefault();
      return false;
    }
  }
  //Put a Form submit Event Listener
  this.forms.formId.addEventListener("submit", this.FormChecker, false);
}
//Function to get label of input field
function getLabel(field) {
  var label = field.parentNode.parentNode.querySelector("label").textContent;
  return label;
}
//Initialise the objects
var contactFormValidation = new FormValidation(forms);
