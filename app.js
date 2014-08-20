var five = require("johnny-five");
var Firebase = require("firebase");

board = new five.Board();
var myFirebaseRef = new Firebase("https://firenoduino.firebaseio.com/");

board.on("ready", function () {
  // button writes to firebase
  var button = new five.Button(8);
  board.repl.inject({
    button: button
  });

  button.on("down", function () {
    console.log("rawr");
    myFirebaseRef.child("button").set("down");
  });

  button.on("up", function () {
    console.log("moo");
    myFirebaseRef.child("button").set("up");
  });

  var led = five.Led(13);
  myFirebaseRef.child("button").on("value", function(snap) {
    if(snap.val() == "down") {
      led.on();
    } else {
      led.off();
    }
  });
});
