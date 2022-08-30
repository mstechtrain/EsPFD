import { enableADC, start, debug } from "./airData.js";
import { drawAll, changeADS } from "./draw.js";

var noSleep = new NoSleep();

document.addEventListener("touchstart", touch2Mouse, true);
document.addEventListener("touchmove", touch2Mouse, true);
document.addEventListener("touchend", touch2Mouse, true);

function touch2Mouse(e) {
  var theTouch = e.changedTouches[0];
  var mouseEv;

  switch (e.type) {
    case "touchstart":
      mouseEv = "mousedown";
      break;
    case "touchend":
      mouseEv = "mouseup";
      break;
    case "touchmove":
      mouseEv = "mousemove";
      break;
    default:
      return;
  }

  var mouseEvent = document.createEvent("MouseEvent");
  mouseEvent.initMouseEvent(
    mouseEv,
    true,
    true,
    window,
    1,
    theTouch.screenX,
    theTouch.screenY,
    theTouch.clientX,
    theTouch.clientY,
    false,
    false,
    false,
    false,
    0,
    null
  );
  theTouch.target.dispatchEvent(mouseEvent);

  e.preventDefault();
}

let adsrevbutton = document.getElementById("adsRevSwitch");
let eadilockbutton = document.getElementById("eadiLockSwitch");

// eadilockbutton.addEventListener("pointerup", () => {
//   eadilock();
// });

adsrevbutton.addEventListener("pointerup", () => {
  adsrev();
});

document.addEventListener(
  "click",
  function enableNoSleep() {
    document.removeEventListener("click", enableNoSleep, false);
    noSleep.enable();
  },
  false
);

// window.addEventListener("devicemotion", (event) => {
//   let combinedText =
//     Math.round(event.accelerationIncludingGravity.x) +
//     " x     " +
//     Math.round(event.accelerationIncludingGravity.y) +
//     " y     " +
//     Math.round(event.accelerationIncludingGravity.z) +
//     "  z";
//   document.getElementById("label").innerText = combinedText;
//   console.log(`${event.acceleration.x} m/s2`);
// });

window.addEventListener("load", (event) => {
  enableADC();
});

function eadilock() {
  DeviceMotionEvent.requestPermission().then((res) => {
    document.getElementById("label").innerText = res;
  });
}

function adsrev() {
  changeADS();
}

window.debug = debug;

setTimeout(() => {
  start();
  window.requestAnimationFrame(drawAll);
}, 1000);
