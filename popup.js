

let btn = document.getElementById('get_time')
let span = document.getElementById('box')

// Send a message to content.js to get the video duration when the button is clicked
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getVideoDuration" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`popup - ${message.time}`);
    // Update the popup content with the video duration
    span.innerText = `Time: ${message.time}`;
});





