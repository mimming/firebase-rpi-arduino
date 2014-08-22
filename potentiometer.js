var five = require("johnny-five");
var Firebase = require("firebase");

board = new five.Board();
var myFirebaseRef = new Firebase("https://firenoduino.firebaseio.com/potentiometer");

board.on("ready", function() {

  potentiometer = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });

  var lastKnownVal = 0;
  // "data" get the current reading from the potentiometer
  potentiometer.on("data", function() {
    if(this.value != lastKnownVal) {
      lastKnownVal = this.value;
      myFirebaseRef.set(this.value);
    }
  });
});
