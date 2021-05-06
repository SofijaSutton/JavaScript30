//Can structure so elements, functions, and event listeners are grouped together for legibility

//--------Elements---------
const video = document.querySelector(".player__video");
const playButton = document.querySelector(".player__button");
const player__sliders = document.querySelectorAll(".player__slider");
const skipButtons = document.querySelectorAll(".player__button[data-skip]");
const progressFill = document.querySelector(".progress__filled");
const progressBar = document.querySelector(".progress");
const fullscreenButton = document.querySelector(".fullscreen");
const player = document.querySelector(".player");

//--------Functions-----------
//play funcionallity
let isPlaying = false;
function togglePlay() {
	if (isPlaying) {
		video.pause();
		playButton.innerHTML = "►"; //we grouped the button change and play
		//event into one function. This could be split to allow for other play events
		//such as 'enter' or 'space bar'
	} else {
		video.play();
		playButton.innerHTML = "&#9646;&#9646;";
	}
	isPlaying = !isPlaying;
}

//change volume and speed
function inputChange(e) {
	//can refactor the if statement to be one line since both ranges have
	//value inputs
	video[this.name] = this.value;
	// if(this.name === "volume"){
	//     video.volume = this.value;
	// } else {
	//     video.playbackRate = this.value;
	// }
}

// skip buttons
function onSkip() {
	video.currentTime += Number(this.dataset.skip);
}

//progress bar update
function updateProgressBar() {
	let percentage = (100 / video.duration) * video.currentTime;
	progressFill.style.flexBasis = `${percentage}%`;
}

//scrub progress bar
function onScrub(e) {
	//find offsetX on the mouse event properties to see how far along the bar the click happened
	const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
	//gives us a percentage bar used, then times the duration to get time
	video.currentTime = scrubTime;
}
let scrubOn = false; //is someone currently scrubbing? no

//fullscreen
function openFullscreen() {
	console.log("opening");
	//fullscreen not toggling, only player class, not pseudo fullscreen class
	// player.classList.toggle("player")

	// 	if (fullscreenStatus === false) {
	//         player.className = "fullscreen"
	player.requestFullscreen(); //will make the fullscreen look correct, but cannot exit it except with esc key
    fullscreenButton.style.display = "none"; // this hides the fullscreen button as it only closes on esc key with this version
	//         fullscreenStatus = true
	// 	} else {
	//        //player.exitFullscreen() // does not work, still reasearching
	//        player.className = "player";
	//        fullscreenStatus = false;
	//    }
}
//let fullscreenStatus = false;

//--------Event listeners---------
playButton.addEventListener("click", togglePlay);
player__sliders.forEach((slider) =>
	slider.addEventListener("input", inputChange)
);
skipButtons.forEach((skipButton) =>
	skipButton.addEventListener("click", onSkip)
);
video.addEventListener("timeupdate", updateProgressBar);
progressBar.addEventListener("click", onScrub); //updates scrub on click
progressBar.addEventListener("mousemove", (e) => scrubOn && onScrub(e)); //checks to see if scrub = true, and if so, runs the func
progressBar.addEventListener("mousedown", () => (scrubOn = true)); //someone is scrubbing now
progressBar.addEventListener("mouseup", () => (scrubOn = false)); //scrubbing stopped
fullscreenButton.addEventListener("click", openFullscreen);
