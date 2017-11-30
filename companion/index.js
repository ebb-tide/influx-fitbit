/*
Companion logic which executes on the mobile device. 
Has access to the Companion API 
Capable of making direct requests to the internet,
and communicating with the 'app'.
*/

import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { me } from "companion";

console.log("Companion starting! LaunchReasons: " + JSON.stringify(me.launchReasons));

settingsStorage.onchange = function(evt) {
  console.log("Settings have changed! " + JSON.stringify(evt));
}

messaging.peerSocket.onopen = function() {}

messaging.peerSocket.onmessage = function(evt) {
  console.log('sending heartReates  OUT!');
  sendPOSTreq(evt.data)
}

messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}

function sendPOSTreq(data) {
  return new Promise(function(resolve, reject) {
    var url = "https://requestb.in/1gps99p1";
    
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data)
      }).then(function(json) {
      console.log("Got JSON response from server:" + JSON.stringify(json));
      resolve(json);
    }).catch(function (error) {
      console.log("Fetching " + url + " failed: " + JSON.stringify(error));
      reject(error);
    });
  });
}


