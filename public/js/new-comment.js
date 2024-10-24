// Function to handle form submission for a new comment
const handleCommentForm = async (event) => {
    event.preventDefault();
  
    // Get the post ID and comment body from the input fields
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    // Ensure the comment body is not empty
    if (body) {
      // Make a POST request to submit the new comment
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Reload the page if the comment was successfully added
      if (response.ok) {
        document.location.reload();
      } else {
        // Redirect to the login page if the user is not logged in
        document.location.replace('/login');
      }
    }
  };
  
  // Attach the comment form handler to the submit event
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', handleCommentForm);
  