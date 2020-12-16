
/* eslint-disable func-names */
const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpForm = document.getElementById('signup-form')

const emailErr = document.getElementById("emailErr");
const passwordErr = document.getElementById("passwordErr");
const confirmErr = document.getElementById("confirmErr");

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


function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}


email.addEventListener("focusout", checkEmail);
password.addEventListener("focusout", checkPw);


signUpForm.addEventListener("submit", function(event) {
  if (!checkEmail()|| !checkPw()) {
    return event.preventDefault();
  }
  event.preventDefault();
    fetch('/login',{
      headers:{
        'content-type':'application/json',
      },
      method:'post',
      body:JSON.stringify({
          email:email.value,
          password:password.value
      })
    })
      .then(({status})=> {
        if (status===200) {return window.location.href='/home'}
        throw new Error();
      }).catch(err=>window.location.href ='../html/500.html')
});
