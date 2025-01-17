const newFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comments').value.trim();
    
    const post_id = event.target.getAttribute('data-id');
    if (content && post_id) {
     
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${post_id}`);
        alert('comment added');
      } else {
        alert('Failed to create comment');
      }
    } 
  };

  const deleteBttnHandler = async (event) => {
    
      const comment_id = event.target.getAttribute('data-id');
      
      const response = await fetch(`/api/comments/${comment_id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
        alert('post deleted');
      } else {
        alert('Failed to delete post');
      }
    
  };

  const updateBttnHandler = async (event) => {
    event.preventDefault();

    const post_id = event.target.getAttribute('update-id');
    const name = document.querySelector('#post-name-updates').value.trim();
    const description = document.querySelector('#post-desc-updates').value.trim();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        alert('post updated');
      } else {
        alert('Failed to update post');
      }
};
 //null check
 if(document.querySelector('.deleteBtn') != null) {
    document.querySelectorAll(".deleteBtn").forEach(btn => btn.addEventListener("click", deleteBttnHandler));
};
  
//null check
if(document.querySelector('.submitBtn') != null) {
    document
    .querySelector('.submitBtn')
    .addEventListener('click', newFormHandler);
};

//null check
if(document.querySelector('.updateBtn') != null) {
    document.querySelectorAll(".updateBtn").forEach(btn => btn.addEventListener("click", updateBttnHandler));
};