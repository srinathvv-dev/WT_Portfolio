function validateForm() {
  var name = document.forms["myForm"]["email"].value;
  var pass = document.forms["myForm"]["passwords"].value;

  if (name == "") {
    alert("Email can't be blank");
    return false;
  } else if (pass.length < 6) {
    alert("Password must be atleast 6 characters.");
    return false;
  }
}
