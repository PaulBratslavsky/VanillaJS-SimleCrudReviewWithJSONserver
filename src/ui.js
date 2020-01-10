class UI {

    constructor() {
        this.formContainer = document.querySelector('.form-container');
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.content = document.querySelector('#content');
        this.id = document.querySelector('#id');
        this.heading = document.querySelector('#heading');
        this.subHeading = document.querySelector('#sub-heading');
        this.postSubmit = document.querySelector('.post-submit');
    }

    clearFields(items) {
        items.forEach( item => {
            document.querySelector(item).value = '';
        });
    }

    togglePostBeingEdited(type) {

        let allPosts = document.querySelectorAll(`.post`);
            allPosts = Array.from(allPosts);

        if ( type.toLowerCase() === 'hide' ) {

            allPosts.forEach( item => {
                item.style.visibility = 'hidden';
            });

        } else {

            allPosts.forEach( item => {
                item.style.visibility = 'visible';
            });
        }
    }


    getFormId() {
        return this.id.value
    }

    showEditState(data) {

        this.id.value = data.id;
        this.titleInput.value = data.title;
        this.content.value = data.content;

        this.handleEditState(true)
    
    }

    changeButtonStyle(tagName, btnText, btnStyleClass) {
        const currentButton = document.querySelector(`${tagName}`);
        currentButton.textContent = btnText;
        currentButton.className = `${btnStyleClass}`;
    } 

    handleEditState(type) {
        console.log(type, "FROM FORM STATe")
        if (type) {

            this.togglePostBeingEdited('hide');

            this.heading.textContent = "Edit Post"
            this.subHeading.style.display = "none";
            this.formContainer.style.background = "#809395";

            this.changeButtonStyle('.post-submit', 'Update Post', 'post-submit btn btn-success');

            // Create Cancel Button
            const button = document.createElement("button");
            button.className = "post-cancel delete btn btn-danger";

            button.appendChild(document.createTextNode('Cancel'));

            this.postSubmit.parentNode.insertBefore(button, this.postSubmit.nextSibling);


        } else {

            this.togglePostBeingEdited('show');

            this.clearFields(['#id','#title', '#content']);

            this.heading.textContent = "Say Something"
            this.subHeading.style.display = 'block';
            this.formContainer.style.background = 'white';

            // Remove Cancel Button
            this.postSubmit.nextSibling.remove();

            this.changeButtonStyle('.post-submit', 'Submit Post', 'post-submit btn btn-info');


        }
    }

    

    showMessage(tagName, message = "Oh snap!", className = "alert-secondary") {
    
        const element = document.querySelector(`${tagName}`);
    
        // Create the new node to insert
        let newNode = document.createElement("div");
        newNode.className = 'alert mt-3';
        newNode.classList.add(className);
    
        var strongTag = document.createElement("strong");                      
        strongTag.appendChild(document.createTextNode(`${message}`)); 
        newNode.appendChild(strongTag);
    
        element.parentNode.insertBefore(newNode, element.nextSibling);
    
        setTimeout( () => {
            element.nextSibling.remove()
        }, 2000);
    
        }

    showPosts(posts) {
        console.log(posts, 'from ui');

        // Create Posts
        let outputHtml = '';

        // Add Posts to Data
        posts.forEach( post => {
            outputHtml +=`
                <div id="${post.id}" class="post card mb-3">
                    <div class="card-body">

                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.content}</p>

                        <button type="button" data-id="${post.id}" class="edit btn btn-primary"><i class="fa fa-pencil" style="margin-right: 5px;"></i>Edit</button>
                        <button type="button" data-id="${post.id}" class="delete btn btn-danger"><i class="fa fa-remove" style="margin-right: 5px;"></i>Delete</button>
                    </div>
                </div>
            `;
        });

        // Add Posts to DOM
        this.post.innerHTML = outputHtml;
 
    }
}

export const ui = new UI();