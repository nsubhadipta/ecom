const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const password = formData.get('password');

  console.log(email,password);

  fetch('http://localhost:5500/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = 'cart.html';
      }else{
        errorMessage.style.display = 'block';
        // throw new Error('Email or password is incorrect');
      }
    })
    .then((data) => {
      // Update the UI to show that the user is logged in
      console.log(data);
    })
    .catch((error) => {
      // Show an error message
      console.error(error);
    });
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const email = formData.get('email');
  const password = formData.get('password');
  const username = formData.get('username');

  fetch('http://localhost:5500/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, username }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) {
        // return response.json();
        window.location.href = 'cart.html';
      }
      throw new Error('Registration failed');
    })
    .then((data) => {
      // Update the UI to show that the user is registered
      console.log(data);
    })
    .catch((error) => {
      // Show an error message
      console.error(error);
    });
});
