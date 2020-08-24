// get elements

const player = document.querySelector(".player");
const video = player.querySelector('.viewer');
const progress =  player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButton = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// build our functions
function togglePlay(){
    if(video.paused){
        video.play();
    }
    else{
        video.pause();
    }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
let clicked =false;
function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
    // clicked = true;
}
function toggel_flag(){
    clicked = !clicked;
}

function handleRangeUpdate(){
    if(clicked) {
        video[this.name] = this.value;
    }
}

function progressBarUpdate(){
    const percent  =(video.currentTime/ video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}


function progressBarClicked(e){
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

function makeFullScreen(){
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}
// hook up the event listeners
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
toggle.addEventListener('click',togglePlay);
skipButton.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown',toggel_flag));
ranges.forEach(range => range.addEventListener('mouseup',toggel_flag));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
video.addEventListener('timeupdate',progressBarUpdate);
let progress_clicked =false;
progress.addEventListener('click',progressBarClicked);
progress.addEventListener('mousedown', () => progress_clicked =true);
progress.addEventListener('mouseup', () => progress_clicked =false);
progress.addEventListener('mousemove',(e)=>{progress_clicked && progressBarClicked(e)});

// add full screen button and fucntion
fullscreen.addEventListener('click', makeFullScreen);
