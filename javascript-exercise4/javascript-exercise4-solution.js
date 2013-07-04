function Favourites(existingId, childId, favouriteChoices) {
  this.choiceArray = favouriteChoices;
  this.existingId = existingId;
  this.childId = childId;
  //Generate a child list from the given choiceArray array
  var majorElement = document.getElementById(existingId);
  var choiceList = document.createElement("ul");
  choiceList.className = "favourite-list";
  choiceList.setAttribute("id",childId);
  for (var i = 0, j = this.choiceArray.length; i < j; i++) {
    //Create checkboxes with correct labels and append them to the child list
    var choiceLiElement = choiceList.appendChild(document.createElement("li"));
    var choiceInputElement = document.createElement("input");
    choiceInputElement.setAttribute("type","checkbox");
    choiceInputElement.setAttribute("id", this.choiceArray[i]);
    var choiceLabel = document.createElement("label");
    choiceLabel.setAttribute("for", this.choiceArray[i]);
    choiceLabel.appendChild(document.createTextNode(this.choiceArray[i]));
    choiceLiElement.appendChild(choiceInputElement);
    choiceLiElement.appendChild(choiceLabel);
    choiceList.appendChild(choiceLiElement);
  }
  //Hide the child list by default and append it to the parent checkbox
  choiceList.style = "display:none";
  majorElement.parentNode.appendChild(choiceList);
}

Favourites.prototype.showHideChildCheckboxes = function() {
  //Find child checkboxes and make their checked value same as parent checkbox
  var parentCheckbox = document.getElementById(this.existingId);
  var checkedValue = parentCheckbox.checked;
  var childList = document.getElementById(this.childId);
  var blockValue = checkedValue ? "block" : "none";
  childCheckboxes = childList.querySelectorAll("li input[type='checkbox']");
  for (var i = childCheckboxes.length - 1; i >= 0; i--) {
    childCheckboxes[i].checked = checkedValue;
  }
  // Change the child list display property to none or block
  childList.style = "display:" + blockValue;
  //Move to child list to avoid scrolling
  document.location.hash = this.childId;
}

//Initialise the objects
var color = new Favourites("color","colors", ["red", "yellow", "green", "blue"]);
var movie = new Favourites("movie","movies", ["Dar", "Sir"]);
var drink = new Favourites("drink","drinks", ["coke", "pepsi", "dew"]);
var bike = new Favourites("bike","bikes", ["V-rod", "pulsar", "cbz"]);
