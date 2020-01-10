import { http } from './http';
import { ui } from './ui';



/****************************************************
  EVENT LISTENER
****************************************************/

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getData);

// Add posts on click 
document.querySelector('.post-submit').addEventListener('click', postData);

// Delete post on click
document.querySelector('#posts').addEventListener('click', deleteData);

// Edit post on click
document.querySelector('#posts').addEventListener('click', enablEdit);

// Cancel Edit on click
document.querySelector('.card-form').addEventListener('click', cancelEdit);

/****************************************************
  FUNCTIONS REQUEST
****************************************************/

function enablEdit(e) {
  if (e.target.classList.contains('edit') ) {
    const selectedPost = e.target.parentElement;
    console.log(e.target.dataset.id);

    const id = parseInt(e.target.getAttribute('data-id'));
    const title = e.target.previousElementSibling.previousElementSibling.textContent;
    const content = e.target.previousElementSibling.textContent;
    
    const data = { id, title, content }
    console.log(data);

    // Fill form with current post data and enable edit
    ui.showEditState(data);

  }
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    console.log('yes');
    ui.handleEditState(false);

  }
}

function deleteData(e) {
  if (e.target.classList.contains('delete') ) {
    console.log(e.target.getAttribute('data-id'));

    const itemIdToDelete = e.target.getAttribute('data-id'); 

    if (confirm('Are you sure?')) {

      http.delete(`http://localhost:3000/posts/${itemIdToDelete}`)
      .then( () => {
        ui.showMessage('.btn-group', 'Post Deleted!', 'alert-secondary' ); 
        getData();
      })
      .catch( (err) => { 
        ui.showMessage('.btn-group', err, 'alert-danger' ) 
      });

    }
    
  }
}

function postData() {

  const { data, error } = getFormData();

  if (error) {

    ui.showMessage('.btn-group', error, 'alert-danger' );

  } else {

    const id = ui.getFormId()
    console.log(id, "My ID");
    // Check Id to determine if edit state
    if (id === '') {

      // Create Post 
      http.post('http://localhost:3000/posts', data)
      .then( ( data ) => { 
        ui.showMessage('.btn-group', 'Great Success!', 'alert-success' ); 
        getData();
      })
      .catch( (err) => { 
        ui.showMessage('.btn-group', err, 'alert-danger' ) 
      });

    } else {  

      // Update Post 
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then( ( data ) => { 
        ui.showMessage('.btn-group', 'Great Success!', 'alert-success' ); 
        ui.handleEditState(false);
        getData();
      })
      .catch( (err) => { 
        ui.showMessage('.btn-group', err, 'alert-danger' ) 
      });
    }

  }

}

function getData() {
  console.log('DOM loaded');
  http.get('http://localhost:3000/posts')
    .then( response => ui.showPosts(response) )
    .catch( error => console.error("HTTP GET ERROR: ", error) );
}

/****************************************************
  FUNCTIONS GET DATA FROM DOM
****************************************************/

function getFormData() {

  let _state = {
    data: null,
    error: null
  };

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;

  const newData = { title, content };

  if ( title === '' || content === '' ) {

    _state = { 
      data: null,
      error: 'Oh snap! Input cant be blank.'
    };

  } else {

    _state = { 
      data: newData,
      error: null 
    };

    ui.clearFields(['#content', '#title']);

  }

  return _state;

}



