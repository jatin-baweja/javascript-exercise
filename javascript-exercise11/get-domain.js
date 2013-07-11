var form = {
  formRoot : document.getElementById("url-form"),
  urlField : document.getElementById("url")
};
//To Store All Regex patterns
var pattern = {
  urlPattern : /^((http|https|ftp):\/\/)?(www.)?(([\w.-]+)[.])?([\w-]+\.[a-z]{2,4})([\/][\w%.-]+)*(\/)?([#][\w9%-]+)?([\?][\w%.]+\=[\w%]+)?(&[\w%.]+\=[\w%.]*)*$/i
};
//Domain Matching Class
function DomainMatching(form) {
  this.form = form;
  this.obtainDomain = function(e) {
    //Check if pattern matches
    if(!pattern.urlPattern.test(form.urlField.value)) {
      alert("Please enter a URL only!");
      }
    else {
      var subDomain = RegExp.$5;
      var domainName = RegExp.$6;
      var subDomainString = "";
      if(typeof subDomain == "string" && subDomain != "") {
        subDomainString = ", Subdomain : " + subDomain;
        }
      alert("Domain : " + domainName + subDomainString);
      }
      e.preventDefault();
  }
  //Put a Form submit Event Listener
  this.form.formRoot.addEventListener("submit", this.obtainDomain, false);
}
//Initialise the objects
var domainValidation = new DomainMatching(form);
