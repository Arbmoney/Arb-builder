const { Board, Led } = require("johnny-five");
const App = require("express")();
const board = new Board({ port: "/dev/ttyACM0" });

board.on("ready", () => {
  // Create a standard `led` component instance
  const led = new Led(13);

  // "blink" the led in 500ms
  // on-off phase periods
  App.get("/", (req, res) => {
    res.json({ Status: "?" });
  });

  App.listen(8000, () => {
    console.log("?");
  });

  led.blink(500);
});
