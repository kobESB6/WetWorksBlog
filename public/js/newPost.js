// Function to handle the submission of the new post form
const handleNewPostFormSubmit = async function (event) {
    event.preventDefault();
  
    // Get values from the input fields
    const titleInput = document.querySelector('input[name="post-title"]').value;
    const bodyInput = document.querySelector('textarea[name="post-body"]').value;
  
    // Send a POST request to create a new post
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: titleInput,
        body: bodyInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    // Redirect to the dashboard after the post is created
    document.location.replace('/dashboard');
  };
  
  // Attach the form submission handler to the submit event of the new post form
  document.querySelector('#new-post-form').addEventListener('submit', handleNewPostFormSubmit);
  