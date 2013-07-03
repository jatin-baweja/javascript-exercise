//Created a User class with name and age properties
function User(name, age) {
  this.name = name;
  this.age = age;
}

//Created a compare function for ages
User.prototype.compare = function(user2) {
  if (this.age == user2.age) {
    alert(this.name + " and " + user2.name + " are of the same age");
    }
  else {
    //Older user's name is assigned to older and younger user's to younger
    var older = this.age > user2.age ? this.name : user2.name;
    var younger = this.age > user2.age ? user2.name : this.name;
    alert(older + " is older than " + younger);
  }
}

var user1 = new User("Mary",40);
var user2 = new User("John",30);
user1.compare(user2);

