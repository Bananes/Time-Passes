var port = chrome.extension.connect({name: "Sample Communication"});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
        console.log("message recieved "+msg);
        document.getElementById("para").innerHTML = msg;
});

//var BG = chrome.extension.getBackgroundPage();
//console.log(BG);
