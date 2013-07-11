//Function to display Prompt
function enterAndValidateName(namePosition) {
  var nameValue = prompt("Enter your " + namePosition + " name :", "");
  trimmedNameValue = nameValue.trim();
  //If Name is not correct, enter name again. Else, return name
  if (nameValue === null || nameValue === "" || trimmedNameValue === "" ) {
    alert("Please enter " + namePosition + " name correctly");
    return enterAndValidateName(namePosition);
  }
  else {
    return nameValue;
  }
}
//Call function
var firstName = enterAndValidateName("First");
var lastName = enterAndValidateName("Last");
var message = "Hello " + firstName + " " + lastName; 
//Show alert with names
alert(message);
//Put text in HTML page
document.getElementById("welcome-message").innerHTML = message;
