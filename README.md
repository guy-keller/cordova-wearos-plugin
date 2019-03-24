# Cordova WearOs Plugin

Simple plugin that establishes a session with a WearOs Watch and helps exchange of messages between a hybrid application and its WearOs application and vice-versa.

## Installation

### With cordova-cli

If you are using [cordova-cli](https://github.com/apache/cordova-cli), install
with:

    cordova plugin add https://github.com/guikeller/cordova-wearos-plugin.git

### With ionic

With ionic:

    ionic cordova plugin add https://github.com/guikeller/cordova-wearos-plugin.git

## Use from Javascript
Edit `www/js/index.js` and add the following code inside `onDeviceReady`
```js
    // Receiving messages from Watch
    var receiveMessageSuccess = function(message){
        // Received a message
        var value = JSON.stringify(message);
        alert("Received message from Watch : "+value);
    };
    var receiveMessageFailure = function(){
        alert("Could not receive message from Watch");
    };

    // Sending Messages to Watch
    var sendMessageSuccess = function() {
        alert("Message sent successfully!");
    };
    var sendMessageFailure = function(){
        alert("Could not send message to Watch.");
    };
    
    // Initialised a Session successfully
    var initWatchSuccess = function() {
        // Sends a message through 'sendMessage'
        var message = {message: "hello from phone", value: "1234", foo: "bar"};
        WearOsPlugin.sendMessage(message, sendMessageSuccess, sendMessageFailure);    
	    // Register to receive messages
        WearOsPlugin.registerMessageListener(receiveMessageSuccess, receiveMessageFailure);
    };
    var initWatchFailure = function() {
        alert("Could not connect to Watch.");
    };
    
    // Starts things up
    WearOsPlugin.init(initWatchSuccess, initWatchFailure);
```
## Use from WearOs

```js
// WearOs Message Path - to send/listen
messagePath#id: '/cordova/plugin/wearos'
```

## Credits
[Gui Keller](https://www.github.com/guikeller)

## More Info
TODO: The plugin is very simple and short without much error handling, yet functional. 