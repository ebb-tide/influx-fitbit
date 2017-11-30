/*
Application logic which executes on the device.
Has access to the Device API,
interacts directly with the presentation layer,
communicates with the companion,
can read and write settings.
*/

import * as messaging from "messaging";
import { influxUI } from "./ui.js";

var ui = new influxUI();

import { HeartRateSensor } from "heart-rate";

var hrm = new HeartRateSensor;
hrm.start();

var heartRates=[]
setInterval(function() {
  heartRates.push(hrm.heartRate ? hrm.heartRate : 0); 
  console.log('pushing to heartRates')
}, 1000);

function sendMessage() {
    console.log('sending heartRates to companion')
    console.log(heartRates)
    messaging.peerSocket.send(heartRates);
    heartRates=[]; 
}

setInterval(sendMessage, 1000 * 10);


