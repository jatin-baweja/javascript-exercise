function selectAll(){
  var checkboxes = document.getElementsByTagName("input");
  //Iterate over the checkboxes and mark checked property as true
  for(var j = checkboxes.length-1; j>=0; j--){
    checkboxes[j].checked = true;
  }
}

function selectNone(){
  var checkboxes = document.getElementsByTagName("input");
  //Iterate over the checkboxes and mark checked property as false
  for(var j = checkboxes.length-1; j>=0; j--){
    checkboxes[j].checked = false;
  }
}
