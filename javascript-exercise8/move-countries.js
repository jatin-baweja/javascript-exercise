window.onload = function() {
  //move Selected Items from one selection box to the other
  function moveSelectedOptions(originSelection, destinationSelection){
    while (originSelection.selectedIndex !== -1) {
      option = originSelection.options[originSelection.selectedIndex];
      destinationSelection.add(option,undefined);
    }
  }
  //Initialize Selection Boxes
  var countrySelection = document.getElementById("country");
  var newCountrySelection = document.getElementById("added-countries");
  //Initialize Add and Remove buttons
  var addButton = document.getElementById("add-button");
  var removeButton = document.getElementById("remove-button");
  //Add click event listeners on add and remove buttons
  addButton.addEventListener("click", function() {
    moveSelectedOptions(countrySelection,newCountrySelection);
  }, false);
  removeButton.addEventListener("click", function() {
    moveSelectedOptions(newCountrySelection,countrySelection);
  }, false);
}
