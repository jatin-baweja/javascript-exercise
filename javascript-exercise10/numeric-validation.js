var forms = {
  formId : document.getElementById("numeric-form"),
  numberField : document.getElementById("number"),
  resultField : document.getElementById("result"),
};

function FormValidation(forms) {
  this.forms = forms;
  
  this.NumericChecker = function(e) {
    //Number Pattern
    var numericPattern = /^\d+$/;
    //Check if pattern matches
    if(!numericPattern.test(forms.numberField.value)) {
      forms.resultField.value = false;
      alert("Please enter a numeric Value only!");
      e.preventDefault();
      }
    else {
      forms.resultField.value = true;
      }
  }
  //Put a Form submit Event Listener
  this.forms.formId.addEventListener("submit",this.NumericChecker,false);
}
//Initialise the objects
var numericFormValidation = new FormValidation(forms);
