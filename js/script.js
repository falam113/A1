document.addEventListener("DOMContentLoaded", function() {
  validateForm();
});

//Functions for form validation start here
//Active validation for the password, confirmation password and email are "listened" for here.
function validateForm() {
  const email = document.querySelector("#signupEmail");
  email.addEventListener("keyup", function(e) {
    validateEmail(email);
  });
  const pass = document.querySelector("#signupPass1");
  pass.addEventListener("keyup", function(i) {
    validatepassLength(pass);
  });
  const pass2 = document.querySelector("#signupPass2");
  pass2.addEventListener("keyup", function(i) {
    validatepassMatch(pass, pass2);
  });
}

//check email is in valid format as the user types. Display warning if email is in unacceptable format
function validateEmail(email) {
  const badEmail = document.querySelector("#badEmail");
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (emailReg.test(email.value)) {
    badEmail.classList.add("hidden");
  } else {
    badEmail.classList.remove("hidden");
    badEmail.innerHTML = "*Email Not In Supported Format*";
  }
}

//check first password is greater than minimum length display warning if password is too short
function validatepassLength(pass) {
  const badPass = document.querySelector("#badPass");
  if (pass.value.length >= 8) {
    badPass.classList.add("hidden");
  } else {
    badPass.classList.remove("hidden");
    badPass.innerHTML = "*Password Too Short*";
  }
}

//check second password matches first password, display warning if passwords don't match
function validatepassMatch(pass, pass2) {
  const badPass2 = document.querySelector("#badPass2");
  if (pass.value == pass2.value) {
    badPass2.classList.add("hidden");
  } else {
    badPass2.classList.remove("hidden");
    badPass2.innerHTML = "*Passwords Do not Match*";
  }
}

//Ensure all form boxes contain input, ouput message if input is requried and not present
function ensureInput() {
  let valid = true;
  const fName = document.querySelector("#signupFName").value;
  const lName = document.querySelector("#signupLName").value;
  const city = document.querySelector("#signupCity").value;
  const country = document.querySelector("#signupCountry").value;
  const email = document.querySelector("#signupEmail").value;
  const pass = document.querySelector("#signupPass1").value;
  const pass2 = document.querySelector("#signupPass2").value;
  const badInput = document.querySelector("#missingInput");
  if (fName == "") {
    badInput.innerHTML = "*First Name Required*";
    valid = false;
  } else if (lName == "") {
    badInput.innerHTML = "*Last Name Required*";
    valid = false;
  } else if (city == "") {
    badInput.innerHTML = "*City Required*";
    valid = false;
  } else if (country == "") {
    badInput.innerHTML = "*Country Required*";
    valid = false;
  } else if (email == "") {
    badInput.innerHTML = "*Email Required*";
    valid = false;
  } else if (pass == "") {
    badInput.innerHTML = "*Password Required*";
    valid = false;
  } else if (pass2 == "") {
    badInput.innerHTML = "*Please Confirm Password*";
    valid = false;
  }
  if (!valid) {
    badInput.classList.remove("hidden");
    return false;
  } else {
    badInput.classList.add("hidden");
  }
}
