const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');

const app = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
            {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./music_Libary/Click Pow Get Down - (amlijatt.in).mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
            },
            {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
            image:
                "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
            },
            {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path:
                "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
            },
            {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
            image:
                "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
            },
            {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
            image:
                "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
            },
            {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
                "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
                "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
            },
            {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
            image:
                "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
            }
        ],
        
        render: function(){
            const htmls = this.songs.map(song=>{
                return`
                <div class="song">
                    <div class="thumb" 
                    style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                `
            })
            $('.playlist').innerHTML = htmls.join('');
        },
        defineProperties: function(){
            Object.defineProperty(this, 'currentSong', {
                get: function(){
                    return this.songs[this.currentIndex]
                }
            })
        },
        handleEvents : function(){
            
            const cdWidth = cd.offsetWidth;
            const _this = this;

            const cdThumbAnimate = cdThumb.animate([
                {transform:'rotate(360deg)'}
            ],{
                duration: 10000,
                iterations: Infinity
            })
            cdThumbAnimate.pause()

            document.onscroll = function(){
                const scrollTop = window.scrollY || document.documentElement.scrollTop
                const newCdWidth = cdWidth - scrollTop;

                cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0;
                cd.style.opacity = newCdWidth/cdWidth;
            }

            playBtn.onclick = function(){
                if(_this.isPlaying){
                    audio.pause();
                }
                else{
                    audio.play();
                }
                //lang nghe su kien tu audio
                audio.onplay = function(){
                    _this.isPlaying = true
                    player.classList.add('playing');
                    cdThumbAnimate.play()
                }

                audio.onpause = function(){
                    _this.isPlaying = false
                    player.classList.remove('playing');
                    cdThumbAnimate.pause()
                }

                audio.ontimeupdate = function () {
                    if(audio.duration){
                        const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
                        progress.value = progressPercent
                    }
                }

                progress.onchange = function (e) {
                    const seekTime = audio.duration* e.target.value/100
                    audio.currentTime = seekTime
                }

                nextBtn.onclick = function () {
                    _this.nextSong()
                    audio.play()
                }

            }
        },
        loadCurrentSong: function(){
            heading.textContent = this.currentSong.name
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
            audio.src = this.currentSong.path
        },

        nextSong: function () {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }
        },

        start : function(){
            this.defineProperties();
            this.handleEvents();
            this.loadCurrentSong();

            this.render();
      }

}

app.start();