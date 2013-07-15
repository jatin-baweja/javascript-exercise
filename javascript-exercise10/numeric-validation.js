var form = {
  formRoot : document.getElementById("numeric-form"),
  numberField : document.getElementById("number"),
  resultField : document.getElementById("result")
};
//Regex Patterns
var patterns = {
  numericPattern : /^[\+-]?[\d]*([\.][\d]+)?$/
};
//Numeric Validation Class
function NumericValidation(form) {
  this.form = form;
  this.validateNumber = function(event) {
    //Check if pattern matches
    if (!patterns.numericPattern.test(form.numberField.value)) {
      form.resultField.value = false;
      alert("Please enter a numeric Value only!");
      event.preventDefault();
    }
    else {
      form.resultField.value = true;
    }
  }
  //Put a Form submit Event Listener
  this.form.formRoot.addEventListener("submit", this.validateNumber, false);
}
//Initialise the objects
var numericFormValidation = new NumericValidation(form);
