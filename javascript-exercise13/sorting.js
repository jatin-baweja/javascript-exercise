product = '[{"name":"1","url":"1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}]';
function Grid(gridId, gridJSON, gridImagePath) {
  this.gridRoot = document.getElementById(gridId);
  this.imagePath = gridImagePath;
  this.gridDetails = JSON.parse(gridJSON);
  this.sortBySelector = document.getElementById("sorting-dropdown");
  var grid = this;
  //Build grid
  this.buildGrid = function() {
    var row=0,column=0;
    grid.gridRoot.innerHTML = "";
    for(i in grid.gridDetails) {
      row=parseInt(i/4+1,10);
      column=i%4+1;
      var newGridPosition = grid.gridRoot.appendChild(document.createElement("div"));
      newGridPosition.id = "grid-row" + row + "-column" + column;
      var addedImage = newGridPosition.appendChild(document.createElement("img"));
      addedImage.src = grid.imagePath + grid.gridDetails[i].url;
    }
  }
  //Function to sort grid based on different properties
  this.sortGridBy = function(property) {
    grid.gridDetails.sort(function(firstObject, secondObject) {
      var firstObjectProperty = firstObject[property];
      var secondObjectProperty = secondObject[property];
      if(firstObjectProperty === secondObjectProperty) {
        return 0;
      }
      else if (firstObjectProperty > secondObjectProperty) {
        return 1;
      }
      else {
        return -1;
      }
    });
    grid.buildGrid();
  }
  //Sort Grid and decide which property to sort by
  this.sortGrid = function() {
    var sortBy = this.value;
    switch(sortBy) {
      case "availability" : grid.sortGridBy("sold_out");
        break;
      default : grid.sortGridBy(sortBy);
    }
  }
}
//Initialise Grid
var productGrid = new Grid("grid", product, "product_data/images/");
//Add event handler to select box
productGrid.sortBySelector.addEventListener("change", productGrid.sortGrid, false);
//Build initial grid
productGrid.buildGrid();