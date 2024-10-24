// Function to handle the user logout process
const handleLogout = async () => {
    // Make a POST request to log out the user
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the response is OK, redirect to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // Alert the user if there was an issue with the logout process
      alert(response.statusText);
    }
  };
  
  // Attach the logout handler to the click event of the logout button
  document.querySelector('#logout').addEventListener('click', handleLogout);
  