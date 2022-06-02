playlistApi = window.location.href + '/api';

fetch(playlistApi)
    .then(res => res.json())
    .then(data => {
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
            songs: data,
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
                            <i class="fas fa-ellipsis-h"></i>
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

                // Xử lý việc quay dừng CD animate(array, option)
                const cdThumbAnimate = cdThumb.animate([
                    {transform: 'rotate(360deg)'}
                ], {
                    duration: 10000, // 10 seconds
                    iterations: Infinity, 
                });

                cdThumbAnimate.pause();

                // Xử lý phóng to hoặc thu nhỏ CD
                document.onscroll = function() {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const newWidth = cdWidth - scrollTop;   

                    // Kéo lên set width của cd = newWidth, nếu < 0 thì cho bằng 0
                    cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;

                    // Làm mờ khi scroll top 
                    cd.style.opacity = newWidth / cdWidth;
                }

                // Xử lý sự kiện play click
                playBtn.onclick = function() {
                    if (!app.isPlaying) {
                        audio.play();
                    }
                    else {
                        app.isPlaying = false;
                        audio.pause();
                    }
                }

                // Xử lý sự kiện song play
                audio.onplay = function() {
                    app.isPlaying = true;
                    player.classList.add("playing");
                    cdThumbAnimate.play();
                }

                // Xử lý sự kiện song paused
                audio.onpause = function() {
                    app.isPlaying = false;
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

                // Xử lý tua song
                progress.onchange = function(e) {
                    // Số giây hiện tại từ %
                    const seekTime = e.target.value * audio.duration / 100; 
                    // Set cho thời gian hiện tại của song
                    audio.currentTime = seekTime;
                }

                // Xử lý next song
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
                
                // Xử lý prev song
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

                // Xử lý random song 
                randBtn.onclick = function(e) {
                    // Click then change the boolean
                    _this.isRandom = !_this.isRandom;
                    _this.setConfig('isRandom', _this.isRandom);
                    randBtn.classList.toggle('active', _this.isRandom);
                }

                // Xử lý lặp lại một song
                repeatBtn.onclick = function() {
                    _this.isRepeat = !_this.isRepeat;
                    _this.setConfig('isRepeat', _this.isRepeat);
                    repeatBtn.classList.toggle('active', _this.isRepeat);
                }

                // Xử lý next song khi audio ended
                audio.onended = function() {
                    if (_this.isRepeat) {
                        audio.play();
                    }
                    else
                        nextBtn.click();
                }

                // Lắng nghe click vào playlist
                playlist.onclick = function(e) {
                    const songNode = e.target.closest('.song:not(.active)');
                    // Xử lý khi click song
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
                            // Xu ly option
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

                // Định nghĩa thuộc tính Obj
                this.defineProperties();

                // Xử lý sự kiện
                this.handleEvents();

                // Load bài hát hiện tại
                this.loadCurrentSong();

                this.render();
                randBtn.classList.toggle('active', this.isRandom);
                repeatBtn.classList.toggle('active', this.isRepeat);
            },
        };
        
        if (data.length > 0) {
            app.start();
        }
    })
    .catch(error => console.log(error));