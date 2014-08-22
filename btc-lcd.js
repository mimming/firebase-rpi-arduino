var five = require("johnny-five");
var Firebase = require("firebase");

var board, lcd;

board = new five.Board();
var myFirebaseRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");


board.on("ready", function() {

  var lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [ 7, 8, 9, 10, 11, 12 ],
    rows: 2,
    cols: 16
  });

  lcd.on("ready", function() {
    myFirebaseRef.child("last").on("value", function(snap) {
      lcd.cursor(1, 1);
      lcd.clear().print("BTC: " + snap.val());

    });
  });
});