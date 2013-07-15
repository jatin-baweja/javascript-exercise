//JSON of users
users = '[{"name":"Luigi Damiano"}, {"name":"Zenith Coboro"}, {"name":"Zig Ziglar"}, {"name":"Steve Costner"}, {"name":"Bill Grazer"}, {"name":"Timothy Frazer"}, {"name":"Boris Becker"}, {"name":"Glenn Gladwich"}, {"name":"Jim Jackson"}, {"name":"Aaron Kabin"}, {"name":"Roy Goldwin"}, {"name":"Jason Goldberg"}, {"name":"Tim Ferris"}, {"name":"Buck Singham"}, {"name":"Malcom Gladwell"}, {"name":"Joy Rabura"}, {"name":"Vid Luther"}, {"name":"Tom Glicken"}, {"name":"Ray Baxter"}, {"name":"Ari Kama"}, {"name":"Kenichi Suzuki"}, {"name":"Rick Olson"}]';
//Form Elements
var form = {
  formRoot : document.getElementById("autocomplete-form"),
  nameField : document.getElementById("name"),
  suggestionList : document.querySelector(".suggestion-list")
};
//Text Autocompleter class
function TextAutocompleter(form) {
  this.form = form;
  //To hide autosuggest field when clicked anywhere else on the document other than the name field or autosuggest list
  this.hideSuggestionField = function(e) {
    form.suggestionList.innerHTML = "";
    form.suggestionList.setAttribute("style", "border:none;");
  }
  //To autofill the text field when clicked on an option in the list
  this.autoFillText = function(e) {
    form.nameField.value = e.target.innerHTML;
    form.nameField.focus();
  }
  //To auto-suggest Text
  this.autoSuggestText = function(e) {
    var usersCopy = JSON.parse(users), stringToCompare = document.getElementById("name").value, regexToMatch = new RegExp("^" + stringToCompare + "[a-z0-9\s]*","i"), countOfSuggestions = 0;
    form.suggestionList.innerHTML = "";
    form.suggestionList.setAttribute("style", "border:none;");
    if (stringToCompare != "") {
      for (i in usersCopy) {
        if (usersCopy[i].name.match(regexToMatch) !== null && usersCopy[i].name.match(regexToMatch).length > 0) {
          var newListElement = form.suggestionList.appendChild(document.createElement("li"));
          newListElement.appendChild(document.createTextNode(usersCopy[i].name));
          countOfSuggestions++;
        }
      }
    }
    //Put border around list
    if (countOfSuggestions > 0) {
      form.suggestionList.setAttribute("style", "border:1px solid black;");
    }
    //Stop propagation so that document click event listener is not fired
    e.stopPropagation();
  }
  //Put Event Listeners for click and keyup events
  this.form.nameField.addEventListener("keyup", this.autoSuggestText, false);
  this.form.suggestionList.addEventListener("click", this.autoFillText, false);
  this.form.nameField.addEventListener("click", this.autoSuggestText, false);
  document.addEventListener("click", this.hideSuggestionField, false);
}
//Initialise the objects
var nameAutocompleter = new TextAutocompleter(form);
