// https://developer.chrome.com/extensions/event_pages
// https://github.com/anpross/jenkinsautologin/blob/04f603256426188d974eacc9911a89cae6153405/src/manifest.json
var urlAct;
var urlLast;
var data = {
	urls: [],
	timePasses: []
};

if (!chrome.runtime) {
	// Chrome 20-21
	chrome.runtime = chrome.extension;
} else if(!chrome.runtime.onMessage) {
	// Chrome 22-25
	chrome.runtime.onMessage = chrome.extension.onMessage;
	chrome.runtime.sendMessage = chrome.extension.sendMessage;
	chrome.runtime.onConnect = chrome.extension.onConnect;
	chrome.runtime.connect = chrome.extension.connect;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('from inject', request);
		urlLast =urlAct;
		urlAct = request;

		if (typeof urlLast !== "undefined") {
			var t = urlAct.openedAt - urlLast.openedAt;
			console.log(t);
			if (typeof data.timePasses[data.urls.indexOf(urlLast.url[2])] == "undefined") {
				data.timePasses.push(t);
			}
			else {
				data.timePasses[data.urls.indexOf(urlLast.url[2])] = data.timePasses[data.urls.indexOf(urlLast.url[2])] +t;

			}
			console.log(data);
		}
		console.log(data.urls.indexOf(urlAct.url[2]));
		if (data.urls.indexOf(urlAct.url[2]) == -1) {
			data.urls.push(urlAct.url[2]);
			console.log(data.urls);
		}
    sendResponse({
      'success': urlAct
    });
});

chrome.tabs.onActivated.addListener(()=>{
chrome.tabs.query({
    active: true,               // Select active tabs
    lastFocusedWindow: true     // In the current window
}, function(array_of_Tabs) {
    // Since there can only be one active tab in one active window,
    //  the array has only one element
		console.log(array_of_Tabs);
    var tab = array_of_Tabs[0];
		urlLast =urlAct;
    var url = tab.url.split("/");
		if (url[2] !== "newtab") {
			urlAct.url = url[2];
			urlAct.openedAt = +new Date();
			console.log(urlAct);

			var t = urlAct.openedAt - urlLast.openedAt;
			data.timePasses[data.urls.indexOf(urlLast.url[2])] = data.timePasses[data.urls.indexOf(urlLast.url[2])] +t;
		}
    console.log(url[2]);
});
});

chrome.extension.onConnect.addListener(function(port) {
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {
		console.log("message recievd "+ msg);
		port.postMessage(urlAct.url[2]);
	});
});
