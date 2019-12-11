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
    var receiveMessageSuccess = function(message) {
        // Received a message
        var value = JSON.stringify(message);
        alert("Received message from Watch : "+value);
    };
    var receiveMessageFailure = function() {
        alert("Could not receive message from Watch");
    };

    // Sending Messages to Watch
    var sendMessageSuccess = function() {
        alert("Message sent successfully!");
    };
    var sendMessageFailure = function() {
        alert("Could not send message to Watch.");
    };
    
    // Initialised a Session successfully
    var initWatchSuccess = function() {
        // Waits for 2secs, it should be enough to initialise things up, find/connect to the watch
        window.setTimeout( () => {
	    // Register to receive messages from the watch
            WearOsPlugin.registerMessageListener(receiveMessageSuccess, receiveMessageFailure);
	    window.setTimeout( () => {
	      // Sends a message through 'sendMessage' - it 'should be' connected now
              var message = {message: "hello from phone", value: "1234", foo: "bar"};
              WearOsPlugin.sendMessage(sendMessageSuccess, sendMessageFailure, message);
	    }, 1250);
	}, 2000);
    };
    var initWatchFailure = function() {
        alert("Could not connect to Watch.");
    };
    
    // Starts things up
    WearOsPlugin.init(initWatchSuccess, initWatchFailure);
```
## Use from WearOs (Java)
Step 1: You will need to create a listener:
```java
public class MyMessageListener implements MessageClient.OnMessageReceivedListener {

    private static final String TAG = MyMessageListener.class.getSimpleName();
    private static final String MESSAGE_PATH = "/cordova/plugin/wearos";

    private Context context;

    public MyMessageListener(Context context) {
        this.context = context;
        Log.i(TAG, "constructor");
    }

    @Override
    public void onMessageReceived(MessageEvent messageEvent) {
        Log.i(TAG,"onMessageReceived");
        if(messageEvent != null && MESSAGE_PATH.equals(messageEvent.getPath())){
            String message = new String(messageEvent.getData(), StandardCharsets.UTF_8);
            System.out.println("Message received: " + message);
        }
    }

}
```
Step 2: You will need to register the listener (prob in the 'main' activity):
```java
    protected void listenToMessages(Context context) {
        Log.i(TAG,"listenToMessages");
        if (this.messageListener == null) {
            this.messageListener = new MyMessageListener(context);
            Wearable.getMessageClient(context).addListener(this.messageListener);
        }
    }
```
Step 3: To send a message from the watch to the phone:
```java
    private static final String MESSAGE_PATH = "/cordova/plugin/wearos";

    // Assumption is made that the mobile and watch are paired and connected
    public void sendMessage(final String messageToSend) {
        Log.i(TAG, "sendMessage");
        NodeClient nodeClient = Wearable.getNodeClient(context);
        Task<List<Node>> connectedNodes = nodeClient.getConnectedNodes();
        connectedNodes.addOnCompleteListener(new OnCompleteListener<List<Node>>() {
            @Override
            public void onComplete(@NonNull Task<List<Node>> task) {
                List<Node> nodes = task.getResult();
                for(Node node : nodes) {
                    sendMessageToNode(node.getId(), messageToSend);
                }
            }
        });
    }

    protected void sendMessageToNode(String nodeId, String messageToSend) {
        Log.i(TAG, "sendMessageToNode");
        byte[] message = new String(messageToSend).getBytes();
        Wearable.getMessageClient(context).sendMessage(nodeId, MESSAGE_PATH, message);
    }
```
Step 4 - add the watch/wearable feature and library to your Android.xml:
```xml
<manifest ..shortened_for_brevity>

  <uses-feature android:name="android.hardware.type.watch" />

  <application ..shortened_for_brevity>
    ...
    <uses-library
            android:name="com.google.android.wearable"
            android:required="true" />
    ...
  </application>
</manifest>
```
## Extra info
In case your build fails after installing this plugin;<br>
You will need to also install the following plugins below. 
```bash
cordova-plugin-androidx
cordova-plugin-androidx-adapter
cordova-android-play-services-gradle-release
```

**VERY IMPORTANT**: Android _versionName_ must match, _versionCode_ must be sequential eg:
```js
mobile app
versionName: "1.6.4"
versionCode: 10604001

wear app
versionName: "1.6.4"
versionCode: 10604002
```
https://developer.android.com/training/wearables/apps/packaging#distribution-to-wear-1.x-and-2.0-watches

## Credits
[Gui Keller](https://www.github.com/guikeller)

## More Info
TODO: The plugin is very simple and short without much error handling, yet functional. 
