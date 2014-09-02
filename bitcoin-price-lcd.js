var five = require("johnny-five");
var Firebase = require("firebase");

var board = new five.Board();
board.on("ready", function() {
  // Init the LCD
  var lcd = new five.LCD({
    // LCD pins  RS  EN  DB4  DB5  DB6  DB7
    pins:       [ 7,  8,   9,  10,  11,  12 ],
    rows: 2, cols: 16
  });

  // Set up Firebase to reference the cryptocurrency open data set
  var myFirebaseRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");
  lcd.on("ready", function() {
    // Listen for changes to the Bitcoin price
    myFirebaseRef.child("last").on("value", function(snap) {
      // Print the value on the LCD
      lcd.cursor(1, 1).clear().print("BTC: " + snap.val());
    });
  });
});