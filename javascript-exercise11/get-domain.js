var forms = {
  formId : document.getElementById("url-form"),
  urlField : document.getElementById("url"),
};

function DomainMatching(forms) {
  this.forms = forms;
  
  this.obtainDomain = function(e) {
    //Number Pattern
    var urlPattern = /^((http|https|ftp):\/\/)?(www.)?([\w.-]+\.[a-z]{2,4})([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i;
    //Check if pattern matches
    if(!urlPattern.test(forms.urlField.value)) {
      alert("Please enter a URL only!");
      }
    else {
      var hostName = RegExp.$4;
      var domainNameParts = hostName.split(".");
      var domainName = domainNameParts.pop();
      var domainName = domainNameParts.pop() + "." + domainName;
      var subDomainString = "";
      if(domainNameParts.length > 0)
        {
        subDomainString = ", Subdomain : " + domainNameParts.join(".");
        }
      alert("Domain : " + domainName + subDomainString);
      }
      e.preventDefault();
  }
  //Put a Form submit Event Listener
  this.forms.formId.addEventListener("submit",this.obtainDomain,false);
}
//Initialise the objects
var numericFormValidation = new DomainMatching(forms);
