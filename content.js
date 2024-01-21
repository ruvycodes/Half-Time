let video;
let time;
let intervalID;

function checkVideo() {
  video = document.querySelectorAll("video")[0];

  if (video) {

    clearInterval(intervalID);  // stop the interval when the video element is found
    const changeObserver = new MutationObserver(newLength);
    changeObserver.observe(video, { attributes: true });

  }

  else {

    console.error("Video element not found")

  }

}

intervalID = setInterval(checkVideo, 100);   //repeatedly call checkVideo


// Logic for calculating time in minutes and seconds 
function calculateTime() {

  let duration = video.duration;   // gives the duration in seconds
  let speed = video.playbackRate;
  let reducedSeconds = Math.floor(duration / speed);
  let minutes = reducedSeconds / 60;
  let remainingFraction = minutes - Math.floor(minutes);
  let seconds = Math.floor(remainingFraction * 60);

  return { minutes, seconds };

}

// send the length to popup.js
function sendLength() {

  let { minutes, seconds } = calculateTime();  // destructuring
  time = `${Math.floor(minutes)} min ${seconds} sec`;
  chrome.runtime.sendMessage({ time });

  console.log(`${Math.floor(minutes)}mins ${seconds}sec`)
}

function newLength() {
  sendLength();
}

// Listen for the extension button click
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getVideoDuration") {
    // Send the video duration when the button is clicked
    chrome.runtime.sendMessage({ time });
  }
});