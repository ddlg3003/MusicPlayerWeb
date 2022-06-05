const openCreateBtn = document.querySelector('.quick-playlist-cre-btn');
const modal = document.querySelector('.modal-create');
const closeBtn = document.querySelector('.modal-create-close');
const createBtn = document.querySelector('#create-list');
const playlistContainer = document.querySelector('.playlist-container');
const inputName = document.querySelector('input[name="name"]');
const createApi = `${window.location.protocol}//${window.location.host}/playlist/done`;
const playlistApi = `${window.location.protocol}//${window.location.host}/playlist/api`;

openCreateBtn.addEventListener('click', () => {
    modal.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
});

function createPlaylist(data) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    fetch(createApi, options)
    .then(response => response.json())
    .catch(error => console.log(error));
}

function handleCreateForm() {
    createBtn.addEventListener('click', () => {
        let name = document.querySelector('input[name="name"]').value;
        if(name === '') {
            name = 'Unnamed playlist';
        }

        const data = {
            name,
        }
        createPlaylist(data);
        modal.classList.remove('open');
        
        if (window.location.href === `${window.location.protocol}//${window.location.host}/me/library`)
            window.location.reload();
    });
}

if (window.location.href === `${window.location.protocol}//${window.location.host}/me/library`) {
    // Delete handler
    let delOpenBtns = document.getElementsByClassName('del-playlist');
    const delModal = document.querySelector('.modal-delete');
    const delCloseBtn = document.querySelector('.modal-delete-close');
    const cancelBtn = document.querySelector('#cancel');
    const delBtn = document.querySelector('#delete-list');

    function showDelModal() {
        delModal.classList.add('del-open');
    }

    function closeDelModal() {
        delModal.classList.remove('del-open');
    }

    function delPlaylist(api) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        fetch(api, options)
        .then(response => response.json())
        .catch(error => console.log(error));
    }

    console.log(delOpenBtns);

    for(const delOpenBtn of delOpenBtns) {
        const id = delOpenBtn.getAttribute('data-id');
        delOpenBtn.addEventListener('click', () => {
            showDelModal();
            const delApi = `${window.location.protocol}//${window.location.host}/playlist/${id}`;
            delBtn.addEventListener('click', () => {
                delPlaylist(delApi);
                closeDelModal();
                window.location.reload();
            });
        });
    }

    cancelBtn.addEventListener('click', closeDelModal);

    delCloseBtn.addEventListener('click', closeDelModal);
}

document.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        createBtn.click();
        e.preventDefault();
    }
});

handleCreateForm();


