//Function to display Prompt
function enterName(namePosition) {
  var nameValue = prompt("Enter your " + namePosition + " name :", "");
  nameCorrect = false;
  if (nameValue != null) {
    for (var i = 0, j = nameValue.length; i < j; i++) {
      if (nameValue.charCodeAt(i) != 32) {
        nameCorrect = true;
        break;
      }
    }
  }
  //If Name is not correct, enter name again. Else, return name
  if (nameCorrect != true) {
    alert("Please enter " + namePosition + " name correctly");
    return enterName(namePosition);
  }
  else {
    return nameValue;
  }
}
//Call function
var firstName = enterName("First");
var lastName = enterName("Last");
var message = "Hello " + firstName + " " + lastName; 
//Show alert with names
alert(message);
//Put text in HTML page
document.getElementById("welcome-message").innerHTML = message;