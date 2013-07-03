function checkLimit(day) {
  var days = document.getElementsByName("day");
  var none = document.getElementById("none");
  //Make 'None' unchecked if any of the days are selected
  none.checked = false;
  var countOfAlreadySelectedDays = 0, MaxSelectedDaysPossible = 3;
  //Array to store the days already selected
  var selectedDays = new Array();
  for (var j = days.length - 1; j >= 0; j--) {
    //Count the number of days selected excluding the day selected just now
    if (days[j].checked == true && j != day) {
      countOfAlreadySelectedDays++;
      selectedDays.push(days[j]);
    }
    //If count goes above limit, uncheck selected day and alert already selected days
    if (countOfAlreadySelectedDays >= MaxSelectedDaysPossible) {
      days[day].checked = false;
      alert("Only 3 days can be selected. You have already selected " + selectedDays[2].value + ", " + selectedDays[1].value + " and " + selectedDays[0].value);
      return false;
    }
  }
  return true;
}

function selectNone() {
  var days = document.getElementsByName("day");
  //Iterate over the checkboxes and mark checked property as false
  for (var j = days.length - 1; j >= 0; j--) {
    days[j].checked = false;
  }
}
