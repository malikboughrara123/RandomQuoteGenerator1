// Get the login button and form inputs
const loginButton = document.querySelector('.button');
const emailInput = document.querySelector('.email input');
const passwordInput = document.querySelector('.password input');

// Add an event listener to the login button
loginButton.addEventListener('click', function() {
  const email = emailInput.value.trim(); // Get the trimmed email input value
  const password = passwordInput.value.trim(); // Get the trimmed password input value

  // Check if the email and password are correct
  if (email === 'admin' && password === 'admin') {
    // Redirect to index.html (admin page)
    window.location.href = 'index.html';
  } else {
    // Show an alert for invalid credentials
    alert('Invalid credentials. Please try again.');
  }
});
