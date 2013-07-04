function addOrEditContact(contactId) {
  //Get Table Body Element and attach a table row
  var contactTableBody = document.getElementsByTagName("tbody")[0];
  //In case of edit functionality, a contactId is passed. Here, the existing values of the name and email are stored in variables. Also, the existing row is removed.
  if (contactId instanceof Object) {
    var contactRow = contactId.parentNode.parentNode;
    var contactName = contactRow.firstChild.innerHTML;
    var contactEmail = contactRow.firstChild.nextSibling.innerHTML;
    contactRow.innerHTML = "";
    var newTableRow = contactRow;
  }
  else {
    var newTableRow = contactTableBody.appendChild(document.createElement("tr"));
  }
  //Name input is created and its attributes are set
  var nameInput = document.createElement("input");
  nameInput.setAttribute("name" , "contact-name");
  nameInput.setAttribute("type" , "text");
  nameInput.setAttribute("autofocus" , true);
  //Email input is created and its attributes are set
  var emailInput = document.createElement("input");
  emailInput.setAttribute("name" , "contact-email");
  emailInput.setAttribute("type" , "email");
  //Save button is created and its onclick function is set
  var saveButton = document.createElement("button");
  saveButton.setAttribute("name" , "contact-button");
  saveButton.setAttribute("onclick" , "addContact(this);");
  saveButton.innerHTML = "Save";
  //If editing is done, existing values are put into input box 
  if (contactId instanceof Object) {
    nameInput.setAttribute("value" , contactName);
    emailInput.setAttribute("value" , contactEmail);
  }
  //Table cells and their corresponding values are being appended to the table row
  var newTableCell1 = newTableRow.appendChild(document.createElement("td"));
  newTableCell1.appendChild(nameInput);
  var newTableCell2 = newTableRow.appendChild(document.createElement("td"));
  newTableCell2.appendChild(emailInput);
  var newTableCell3 = newTableRow.appendChild(document.createElement("td"));
  newTableCell3.appendChild(saveButton);
  if (contactId instanceof Object) {
    return false;
  }
}

function addContact(contactId) {
  //Extracting values of Name and Email
  var contactName = contactId.parentNode.parentNode.firstChild.firstChild;
  var contactEmail = contactId.parentNode.parentNode.firstChild.nextSibling.firstChild;
  //Check for Blank Fields and don't save if fields are blank
  if (contactName.value == "" || contactEmail.value == "") {
    alert("Please don\'t leave Name and Email fields blank");
    return false;
  }
  //Replacing input textboxes with the Name and Email values
  contactName.outerHTML = contactName.value;
  contactEmail.outerHTML = contactEmail.value;
  //Replacing Save button with Edit/ Delete links 
  contactId.outerHTML = "<a href='#' onclick='return addOrEditContact(this)'>Edit</a> / <a href='#' onclick='return deleteContact(this)'>Delete</a>";
}

function deleteContact(contactId) {
  //Extracting Row to be deleted from the link and removing that row
  var contactRow = contactId.parentNode.parentNode;
  contactRow.parentNode.removeChild(contactRow);
  return false;
}
