function weakPassword(currentPassword) {
  let numCheck = new RegExp("[0-9]");
  let capCheck = new RegExp("[A-Z]");
  let smallCheck = new RegExp("[a-z]");
  let symbolCheck = new RegExp("[@#$%^&*()_!~`.,<>/?;:]");
  if (currentPassword.length < 6) return true;
  else if (
    !numCheck.exec(currentPassword) ||
    !capCheck.exec(currentPassword) ||
    !symbolCheck.exec(currentPassword) ||
    !smallCheck.exec(currentPassword)
  )
    return true;
  return false;
}

function validate() {
  let mobileNumLength = String(mobile.value).length;
  if (password.value != confirmPassword.value) {
    alert("Password and Confirm password not matching");
  } else if (weakPassword(password.value)) {
    alert("Password is Weak, Please set a strong password !");
  } else if (mobileNumLength > 1 && mobileNumLength != 10) {
    alert("Invalid Mobile Number , you entered less than 10 digits");
  } else {
    submit.click();
  }
}
