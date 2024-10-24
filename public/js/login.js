// Function to handle the login form submission
const handleLoginFormSubmit = async function (event) {
    event.preventDefault();
  
    // Get values from the input fields
    const usernameInput = document.querySelector('#username-input-login').value.trim();
    const passwordInput = document.querySelector('#password-input-login').value.trim();
  
    // Send a POST request to log in the user
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the login is successful, redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // Alert the user if login fails
      alert('Failed to login');
    }
  };
  
  // Attach the form submission handler to the submit event of the login form
  document.querySelector('#login-form').addEventListener('submit', handleLoginFormSubmit);
  