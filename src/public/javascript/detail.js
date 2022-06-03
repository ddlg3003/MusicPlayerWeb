const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cdThumb = $('.detail-cd-thumb');
const playBtn = $('.detail-btn-toggle-play');
const progress = $('#detail-progress');
const audio = $('#detail-audio');
const player = $('.detail-player');

let isPlaying = false;

// Xử lý sự kiện play click
playBtn.onclick = function() {
    if (!isPlaying) {
        audio.play();
    }
    else {
        isPlaying = false;
        audio.pause();
    }
}

// Xử lý sự kiện song play
audio.onplay = function() {
    isPlaying = true;
    player.classList.add("playing");
    cdThumbAnimate.play();
}

// Xử lý sự kiện song paused
audio.onpause = function() {
    isPlaying = false;
    player.classList.remove("playing");
    cdThumbAnimate.pause();
}

// Tiến độ của song
audio.ontimeupdate = function() {
    if (audio.duration) {
        // Tính phần trăm của bài hát 
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
        // Set range theo phần trăm
        progress.value = progressPercent;
    }
}

progress.onchange = function(e) {
    // Số giây hiện tại từ %
    const seekTime = e.target.value * audio.duration / 100; 
    // Set cho thời gian hiện tại của song
    audio.currentTime = seekTime;
}

// Xử lý việc quay dừng CD animate(array, option)
const cdThumbAnimate = cdThumb.animate([
    {transform: 'rotate(360deg)'}
], {
    duration: 10000, // 10 seconds
    iterations: Infinity, 
})

cdThumbAnimate.pause();


//--------------------------------------------------------

window.addEventListener('load', () => {
    const createBtnn = document.querySelector('#create-list');
    const list = document.querySelector('.playlist-list');
    const listApi = `http://${window.location.host}/playlist/api`;
    let addTolistBtns = document.querySelectorAll('.btn-add-to-playlist');

    function handleAddToList() {
        for(const addTolistBtn of addTolistBtns) {
            addTolistBtn.addEventListener('click', (e) => {
                console.log(e.target.getAttribute('id'));
                const options = {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                alert('Song added');
                const addApi = `${window.location.href}/${e.target.getAttribute('id')}/add`;
                fetch(addApi, options)
                .then(response => response.json())
                .catch(error => console.log(error));
            });
        }
    }

    handleAddToList();

    function renderList() {
        fetch(listApi)
            .then(res => res.json())
            .then(data => {
                const htmls = data.playlists.map(playlist => {
                    return `<li id="${playlist._id}" class="btn-add-to-playlist">${playlist.name}</li>`;
                })
                list.innerHTML = 
                '<p class="list-title">ADD TO PLAYLIST</p>' + htmls.join('');
            })
    }

    createBtnn.addEventListener('click', () => {
        renderList();
    })

    const config = { attributes: true, childList: true, subtree: true };
    const callback = mutations => {  
        mutations.forEach(mutation => {
            if(mutation.type === 'childList') {
                addTolistBtns = document.querySelectorAll('.btn-add-to-playlist');
                handleAddToList();
            }
        });
    }
    const observer = new MutationObserver(callback);
    observer.observe(list, config);
})




