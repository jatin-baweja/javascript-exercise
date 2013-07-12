var form = {
  formRoot : document.getElementById("autocomplete-form"),
  nameField : document.getElementById("name")
};
var patterns = {

function createXHR()  {
  if(typeof XMLHttpRequest != "undefined") {
    return new XMLHttpRequest();
  } else if(typeof ActiveXObject != "undefined") {
    if(typeof arguments.callee.activeXString != "string") {
      var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],i,len;
      for(i=0,len=versions.length;i<len;i++) {
        try {
          new ActiveXObject(versions[i]);
          arguments.callee.activeXString = versions[i];
          break;
        } catch(ex) {
          //skip
        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString);
  } else {
    throw new Error("No XHR Object Available");
  }
}
function JsonAutocompleter(form) {
  this.form = form;
  this.autocompleteText = function(e) {
    var xhr = createXHR();
  }
  //Put a Form submit Event Listener
  this.forms.nameField.addEventListener("keyup", this.autocompleteText, false);
}
//Initialise the objects
var textAutocompleter = new JsonAutocompleter(form);
