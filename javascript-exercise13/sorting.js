product = '[{"name":"1","url":"1.jpg","color":"Yellow","brand":"BRAND A","sold_out":"1"},{"name":"2","url":"2.jpg","color":"Red","brand":"BRAND B","sold_out":"0"},{"name":"3","url":"3.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"4","url":"4.jpg","color":"Red","brand":"BRAND A","sold_out":"1"},{"name":"5","url":"5.jpg","color":"Blue","brand":"BRAND B","sold_out":"0"},{"name":"6","url":"6.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"7","url":"7.jpg","color":"Red","brand":"BRAND C","sold_out":"1"},{"name":"8","url":"8.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"9","url":"9.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"},{"name":"10","url":"10.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"11","url":"11.jpg","color":"Green","brand":"BRAND D","sold_out":"0"},{"name":"12","url":"12.jpg","color":"Yellow","brand":"BRAND D","sold_out":"0"},{"name":"13","url":"13.jpg","color":"Blue","brand":"BRAND A","sold_out":"0"},{"name":"14","url":"14.jpg","color":"Blue","brand":"BRAND D","sold_out":"0"},{"name":"15","url":"15.jpg","color":"Green","brand":"BRAND B","sold_out":"0"},{"name":"16","url":"16.jpg","color":"Yellow","brand":"BRAND B","sold_out":"1"},{"name":"17","url":"17.jpg","color":"Green","brand":"BRAND A","sold_out":"1"},{"name":"18","url":"18.jpg","color":"Blue","brand":"BRAND D","sold_out":"1"},{"name":"19","url":"19.jpg","color":"Green","brand":"BRAND C","sold_out":"0"},{"name":"20","url":"20.jpg","color":"Yellow","brand":"BRAND A","sold_out":"0"}]';
//Defining image path and root of grid
var imagePath = "product_data/images/";
var gridRoot = document.getElementById("grid");
//Build The Grid to display all the images
function buildGrid(gridDetails) {
  var row=0,column=0;
  gridRoot.innerHTML = "";
  for(i in gridDetails) {
    row=parseInt(i/4+1,10);
    column=i%4+1;
    var newGridPosition = gridRoot.appendChild(document.createElement("div"));
    newGridPosition.id = "grid-row" + row + "-column" + column;
    newGridPosition.appendChild(document.createElement("img"));
    newGridPosition.querySelector("img").src = imagePath + gridDetails[i].url;
  }
}
//Function to sort grid based on different properties
function sortGridBy(type) {
  var productCopy = JSON.parse(product);
  productCopy.sort(function(firstObject, secondObject) {
    firstObjectProperty = firstObject[type];
    secondObjectProperty = secondObject[type];
    return firstObjectProperty === secondObjectProperty ? 0 : (firstObjectProperty > secondObjectProperty ? 1 : -1);
  });
  buildGrid(productCopy);
}
//Grid Sorting Class
function GridSorting() {
  this.sortBySelector = document.getElementById("sorting-dropdown");
  this.sortGrid = function(event) {
    var sortBy = event.target.value;
    switch(sortBy) {
      case "availability" : sortGridBy("sold_out");
        break;
      default : sortGridBy(sortBy);
    }
  }
}
//Build Initial Grid
buildGrid(JSON.parse(product));
//Initialise the objects
var productGrid = new GridSorting();
//Put a Selection click Event Listener
productGrid.sortBySelector.addEventListener("click", productGrid.sortGrid, false);
