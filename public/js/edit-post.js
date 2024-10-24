// Get the post ID from the hidden input field in the edit form
const postId = document.querySelector('input[name="post-id"]').value;

// Function to handle form submission for editing a post
const handleEditForm = async (event) => {
  event.preventDefault();

  // Get the title and body values from the input fields
  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  // Make a PUT request to update the post using its ID
  await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Redirect to the dashboard after updating the post
  document.location.replace('/dashboard');
};

// Function to handle deleting a post
const handleDeleteClick = async () => {
  // Make a DELETE request to remove the post
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  // Redirect to the dashboard after deleting the post
  document.location.replace('/dashboard');
};

// Attach the edit form handler to the submit event
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', handleEditForm);

// Attach the delete button handler to the click event
document
  .querySelector('#delete-btn')
  .addEventListener('click', handleDeleteClick);
