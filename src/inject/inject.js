var CURRENT_URL = location.href.split("/");
var CURRENT_DATE = +new Date();
var message = {
  url: CURRENT_URL,
  openedAt: CURRENT_DATE
};

if (!chrome.runtime) {
  // Chrome 20-21
  chrome.runtime = chrome.extension;
} else if (!chrome.runtime.onMessage) {
  // Chrome 22-25
  chrome.runtime.onMessage = chrome.extension.onMessage;
  chrome.runtime.sendMessage = chrome.extension.sendMessage;
  chrome.runtime.onConnect = chrome.extension.onConnect;
  chrome.runtime.connect = chrome.extension.connect;
}

chrome.runtime.sendMessage(message, function(response) {
  console.log('got a response', response);
});
