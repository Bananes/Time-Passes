var port = chrome.extension.connect({name: "Sample Communication"});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
        console.log("message recieved "+msg);
        msg.urls.forEach(function(url){
            document.getElementById("para").innerHTML += url + "<br>";
        });
        msg.timePasses.forEach(function(times){
            document.getElementById("time").innerHTML += Math.round(times / 1000) + " s <br>";
        });
        //document.getElementById("para").innerHTML = msg.urls;
});

//var BG = chrome.extension.getBackgroundPage();
//console.log(BG);
