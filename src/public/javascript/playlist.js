playlistApi = window.location.href + '/api';

fetch(playlistApi)
    .then(res => res.json())
    .then(data => {
        console.log(data.songs);
        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const PLAYER_STORAGE_KEY = 'Dang_key';
        const playlist = $('.playlist');
        const heading = $('header h2');
        const cdThumb = $('.cd-thumb');
        const audio = $('#audio');
        const cd = $('.cd');
        const playBtn = $('.btn-toggle-play');
        const player = $('.player');
        const progress = $('#progress-music');
        const nextBtn = $('.btn-next');
        const prevBtn = $('.btn-prev');
        const randBtn = $('.btn-random');
        const repeatBtn = $('.btn-repeat');

        const app = {
            currentIndex: 0,
            isPlaying: false,
            isRandom: false,
            isRepeat: false,
            config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
            songs: data.songs,
            setConfig: function(key, value) {
                this.config[key] = value;
                localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
            },
            render: function() {
                const htmls = this.songs.map((song, index) => {
                    return `
                    <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb" style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                    `;
                })
                playlist.innerHTML = htmls.join('');
            },
            defineProperties: function() {
                Object.defineProperty(this, 'currentSong', {
                    get: function() {
                        return this.songs[this.currentIndex];
                    }
                });
            },
            handleEvents: function() {
                const cdWidth = cd.offsetWidth;
                const _this = this;

                // X??? l?? vi???c quay d???ng CD animate(array, option)
                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 10000, // 10 seconds
                    iterations: Infinity, 
                });

                cdThumbAnimate.pause();

                // X??? l?? ph??ng to ho???c thu nh??? CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const newWidth = cdWidth - scrollTop;   

                    // K??o l??n set width c???a cd = newWidth, n???u < 0 th?? cho b???ng 0
                    cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;

                    // L??m m??? khi scroll top 
                    cd.style.opacity = newWidth / cdWidth;
                }

                // X??? l?? s??? ki???n play click
                playBtn.onclick = function() {
                    if (!app.isPlaying) {
                        audio.play();
                    }
                    else {
                        app.isPlaying = false;
                        audio.pause();
                    }
                }

                // X??? l?? s??? ki???n song play
                audio.onplay = function() {
                    app.isPlaying = true;
                    player.classList.add("playing");
                    cdThumbAnimate.play();
                }

                // X??? l?? s??? ki???n song paused
                audio.onpause = function() {
                    app.isPlaying = false;
                    player.classList.remove("playing");
                    cdThumbAnimate.pause(); 
                }

                // Ti???n ????? c???a song
                audio.ontimeupdate = function() {
                    if (audio.duration) {
                        // T??nh ph???n tr??m c???a b??i h??t 
                        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                        // Set range theo ph???n tr??m
                        progress.value = progressPercent;
                    }
                }

                // X??? l?? tua song
                progress.onchange = function(e) {
                    // S??? gi??y hi???n t???i t??? %
                    const seekTime = e.target.value * audio.duration / 100; 
                    // Set cho th???i gian hi???n t???i c???a song
                    audio.currentTime = seekTime;
                }

                // X??? l?? next song
                nextBtn.onclick = function() {
                    if (_this.isRandom) {
                        _this.playRandomSong();
                    }
                    else
                        _this.nextSong(); 
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {

                        })
                        .catch(error => {

                        });
                    }
                    _this.render();
                }
                
                // X??? l?? prev song
                prevBtn.onclick = function() {
                    if (_this.isRandom) {
                        _this.playRandomSong();
                    }
                    else
                        _this.prevSong(); 
                    const playPromise = audio.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {

                        })
                        .catch(error => {

                        });
                    }
                    _this.render(); 
                }

                // X??? l?? random song 
                randBtn.onclick = function(e) {
                    // Click then change the boolean
                    _this.isRandom = !_this.isRandom;
                    _this.setConfig('isRandom', _this.isRandom);
                    randBtn.classList.toggle('active', _this.isRandom);
                }

                // X??? l?? l???p l???i m???t song
                repeatBtn.onclick = function() {
                    _this.isRepeat = !_this.isRepeat;
                    _this.setConfig('isRepeat', _this.isRepeat);
                    repeatBtn.classList.toggle('active', _this.isRepeat);
                }

                // X??? l?? next song khi audio ended
                audio.onended = function() {
                    if (_this.isRepeat) {
                        audio.play();
                    }
                    else
                        nextBtn.click();
                }

                // L???ng nghe click v??o playlist
                playlist.onclick = function(e) {
                    const songNode = e.target.closest('.song:not(.active)');
                    // X??? l?? khi click song
                    if(songNode || e.target.closest('.option')) {
                        if(songNode) {
                            _this.currentIndex = Number(songNode.dataset.index);
                            _this.loadCurrentSong();
                            const playPromise = audio.play();
                            if (playPromise !== undefined) {
                                playPromise.then(_ => {
                
                                })
                                .catch(error => {
                
                                });
                            }
                            _this.render();
                        }

                        if(e.target.closest('.option')) {
                            if(data.permission) {
                                const pathArr = window.location.pathname.split('/');
                                const playlistId = pathArr[3];
                                console.log(_this.currentSong._id)
    
                                function delSongPlaylist(api) {
                                    const options = {
                                        method: 'PUT',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    };
    
                                    fetch(api, options)
                                    .then(response => response.json())
                                    .catch(error => console.log(error));
                                }
                                
                                const delSongPlaylistApi =
                                `${window.location.protocol}//${window.location.host}/playlist/` +
                                `${playlistId}/${_this.currentSong._id}/remove`;
                                delSongPlaylist(delSongPlaylistApi);
                                window.location.reload();
                            }
                            else
                                alert("You do not have permission to make change to this playlist");
                        }
                    }
                }
            },
            loadCurrentSong: function() {
                heading.textContent = this.currentSong.name;
                cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
                audio.src = 'https://docs.google.com/uc?export=download&id=' + this.currentSong.path;
            },
            loadConfig: function() {
                this.isRandom = this.config.isRandom;
                this.isRepeat = this.config.isRepeat;
            },
            nextSong: function() {
                this.currentIndex++;
                if (this.currentIndex >= this.songs.length) {
                    this.currentIndex = 0;
                }
                this.loadCurrentSong();
            },
            prevSong: function() {
                this.currentIndex--;
                if (this.currentIndex < 0) {
                    this.currentIndex = this.songs.length - 1;
                }
                this.loadCurrentSong();
            },
            playRandomSong: function() {
                let randIndex;
                do {
                    randIndex = Math.floor(Math.random() * this.songs.length);
                }
                while (randIndex === this.currentIndex)

                this.currentIndex = randIndex;
                this.loadCurrentSong();
            },
            scrollToActiveSong: function() {
                setTimeout(() => {
                    $('.song.active').scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    })
                }, 200);
            },
            start: function() {
                // Load cau hinh config vao app
                this.loadConfig();

                // ?????nh ngh??a thu???c t??nh Obj
                this.defineProperties();

                // X??? l?? s??? ki???n
                this.handleEvents();

                // Load b??i h??t hi???n t???i
                this.loadCurrentSong();

                this.render();
                randBtn.classList.toggle('active', this.isRandom);
                repeatBtn.classList.toggle('active', this.isRepeat);
            },
        };
        
        if (data.songs.length > 0) {
            app.start();
        }
    })
    .catch(error => console.log(error));