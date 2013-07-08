var urlToOpen = prompt("Enter URL (eg. www.abc.com OR abc.com):", "");
console.log(urlToOpen);
if (urlToOpen != null && urlToOpen != "") {
  urlToOpen = "http://" + urlToOpen;
  var newWindow = window.open(urlToOpen, "_blank", "height=450,width=400,location=no,menubar=no,scrollbars=no,status=no,toolbar=no");
}
else {
  alert("No URL entered");
}