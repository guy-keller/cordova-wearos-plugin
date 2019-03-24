module.exports = {
    init: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaWearOsPlugin", "init", []);
    },
    shutdown: function(onNewMessageCallback, errorCallback) {
        cordova.exec(onNewMessageCallback, errorCallback, "CordovaWearOsPlugin", "shutdown", []);
    },
    sendMessage: function(successCallback, errorCallback, message) {
        cordova.exec(successCallback, errorCallback, "CordovaWearOsPlugin", "sendMessage", [message]);
    },
    registerMessageListener: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "CordovaWearOsPlugin", "registerMessageListener", []);
    }
};
