let video = document.querySelectorAll("video")[0];
let changeObserver = new MutationObserver(newTime);
let time;
changeObserver.observe(video , {attributes: true});

function newTime() {
    let duration = video.duration;
    let speed = video.playbackRate;
    let reducedSeconds = Math.floor(duration / speed);
    let minutes = reducedSeconds / 60;
    let fraction = minutes - Math.floor(minutes);
    let seconds = Math.floor(fraction*60);
    console.log(`${Math.floor(minutes)}mins ${seconds}sec`)
    time = `${Math.floor(minutes)}mins ${seconds}sec`;
}

chrome.runtime.sendMessage({ time });


// Listen for the extension button click
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getVideoDuration") {
        // Send the video duration when the button is clicked
        chrome.runtime.sendMessage({time});
    }
});

