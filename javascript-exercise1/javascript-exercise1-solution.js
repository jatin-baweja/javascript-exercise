function selectAllOrNone(allOrNone){
  var checkboxes = document.querySelectorAll("input[type='checkbox']");
  //Iterate over the checkboxes and mark checked property as true or false
  for(var j = checkboxes.length-1; j>=0; j--){
    checkboxes[j].checked = allOrNone;
  }
}
