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
  var that = this;
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
  //Display Matched Users List
  this.displayUsers = function(matchedUsersArray) {
    var userListFragment = document.createDocumentFragment();
    for (var i in matchedUsersArray) {
      var newListElement = userListFragment.appendChild(document.createElement("li"));
      newListElement.appendChild(document.createTextNode(matchedUsersArray[i].name));
    }
    //Add Fragment to DOM
    form.suggestionList.appendChild(userListFragment);
    //Display border around list
    form.suggestionList.setAttribute("style", "border:1px solid black;");
  }
  //To auto-suggest Text
  this.autoSuggestText = function(e) {
    var usersCopy = JSON.parse(users), stringToCompare = document.getElementById("name").value, regexToMatch = new RegExp("^" + stringToCompare + "[a-z0-9\s]*","i");
    form.suggestionList.innerHTML = "";
    form.suggestionList.setAttribute("style", "border:none;");
    var matchedUsersArray = [];
    if (stringToCompare != "") {
      for (i in usersCopy) {
        if (usersCopy[i].name.match(regexToMatch) !== null && usersCopy[i].name.match(regexToMatch).length > 0) {
          matchedUsersArray.push(usersCopy[i]);
        }
      }
    }
    //Display Users List if one or more name matches
    if (matchedUsersArray.length > 0) {
      that.displayUsers(matchedUsersArray);
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
