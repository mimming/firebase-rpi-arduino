var five = require("johnny-five");
var Firebase = require("firebase");

var board = new five.Board();
var myFirebaseRef = new Firebase("https://YOUR_FIREBASE.firebaseio.com/");

board.on("ready", function() {
  var potentiometer = new five.Sensor({
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

  var lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [ 7, 8, 9, 10, 11, 12 ],
    rows: 2,
    cols: 16
  });

  lcd.on("ready", function() {
    myFirebaseRef.on("value", function(snap) {
      lcd.clear().print(snap.val());
      lcd.cursor(1, 0);
    });
  });
});