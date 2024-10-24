// Function to handle the submission of the signup form
const handleSignupFormSubmit = async function (event) {
    event.preventDefault();
  
    // Get the values from the username and password fields
    const usernameInput = document.querySelector('#username-input-signup').value.trim();
    const passwordInput = document.querySelector('#password-input-signup').value.trim();
  
    // Ensure the password is at least 8 characters long and the username is provided
    if (passwordInput.length >= 8 && usernameInput) {
      // Send a POST request to the API to create a new user
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameInput,
          password: passwordInput,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Redirect to the homepage if signup is successful
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up');
      }
    } else {
      alert('Please provide a valid username and password (minimum 8 characters)');
    }
  };
  
  // Attach the form submission handler to the submit event of the signup form
  document.querySelector('#signup-form').addEventListener('submit', handleSignupFormSubmit);
  