
/* eslint-disable func-names */
const userName = document.getElementById('username');
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const signUpForm = document.getElementById('signup-form')

const userNameErr = document.getElementById('userNameErr');
const emailErr = document.getElementById("emailErr");
const passwordErr = document.getElementById("passwordErr");
const confirmErr = document.getElementById("confirmErr");

const checkUserName = function() {
  if (userName.validity.typeMismatch) {
    displayErr(userNameErr, "Please enter a valid user name address");
  } else if (userName.validity.valueMissing) {
    displayErr(userNameErr, "Please enter an user name address");
  } else if (userName.validity.tooShort ||userName.validity.tooLong ){
    displayErr(userNameErr, "Please enter a valid user name length 3 - 50 characters");
  }  else {
    displayErr(userNameErr, "");
    return true;
  }
};


const checkEmail = function() {
  if (email.validity.typeMismatch) {
    displayErr(emailErr, "Please enter a valid email address");
  } else if (email.validity.valueMissing) {
    displayErr(emailErr, "Please enter an email address");
  } else {
    displayErr(emailErr, "");
    return true;
  }
};

const checkPw = function() {
  if (password.validity.patternMismatch) {
    displayErr(
      passwordErr,
      "Password must contain at least eight characters, including one letter and one number"
    );
  } else if (password.validity.valueMissing) {
    displayErr(passwordErr, "Please enter a password");
  } else {
    displayErr(passwordErr, "");
    return true;
  }
};

const checkConfirmPw = function() {
  if (password.value != confirmPassword.value) {
    displayErr(confirmErr, "Passwords do not match");
  } else if (confirmPassword.validity.valueMissing) {
    displayErr(confirmErr, "Please confirm your password");
  } else {
    displayErr(confirmErr, "");
    return true;
  }
};

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}


email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);


signUpForm.addEventListener("submit", function(event) {
  if(!checkUserName() || !checkEmail() || !checkConfirmPw()){
    return event.preventDefault();
  }
  event.preventDefault();
  fetch('/register',{
    headers:{
      'content-type':'application/json',
    },
    method:'post',
    body:JSON.stringify({
        userName:userName.value,
        email:email.value,
        password:password.value,
        confirmPassword:confirmPassword.value
    })
  })
    .then(({status})=> {
      if (status===200) {return window.location.href='/home'}
      throw new Error();
    }).catch(err=>window.location.href ='../html/500.html')
});



