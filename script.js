'use-strict'

const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')


// Shows error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}


// Shows success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


// Check email is valid
function checkEmail(input) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}


// Get the input field name
function getFieldName(str) {
  if (str === 'password2') {
    return 'Password confirmation';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}


// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(str = input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}


// Check field length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(str = input.id)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(str = input.id)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}


// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, 'Passwords do not match')
  }
}


form.addEventListener('submit', (event) => {
  event.preventDefault();

  checkRequired(inputArr = [username, email, password, password2]);
  checkLength(username, 3, 16);
  checkLength(email, 8, 40);
  checkLength(password, 8, 16)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
})

