var forms = {
  formId : document.getElementById("registration"),
  notifications : document.getElementById("notifications"),
};

function FormValidation(forms) {
  this.forms = forms;
  
  this.FormChecker = function(e) {
    //Get all input text boxes
    var elements = forms.formId.querySelectorAll("input[type='text'], input[type='email'], input[type='url']");
    //Check each textbox to see if it's empty or not
    for (var i = 0, j = elements.length; i < j; i++) {
      elementName = elements[i].parentNode.parentNode.querySelector("label").textContent;
      if (elements[i].value == "") {
        alert(elementName + " cannot be empty.");
        elements[i].focus();
        e.preventDefault();
        return false;
      }
    }
    //Get textarea
    var textArea = forms.formId.querySelector("textarea");
    //Textarea Length
    var minLength = 50, minLengthMessage = "";
    if (textArea.value.length < minLength) {
      textAreaName = textArea.parentNode.parentNode.querySelector("label").textContent;
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
  this.forms.formId.addEventListener("submit",this.FormChecker,false);
}

//Initialise the objects
var contactFormValidation = new FormValidation(forms);