import { cC, ctxaS, ctxaF, ctxeadi } from "./canv.js";
import { ticks } from "./ticks.js";
import { drawAll } from "./draw.js";
import { adcVoltageList, getADSData, enableADC } from "./airData.js";

var noSleep = new NoSleep();

let btbutton = document.getElementById("eadiLockSwitch");
// btbutton.addEventListener("pointerup", () => {
//   navigator.bluetooth.requestDevice({ acceptAllDevices: true });
// });

// btbutton.addEventListener("touchend", () => {
//   navigator.bluetooth.requestDevice({ acceptAllDevices: true });
// });

// btbutton.addEventListener("touchend", getEspData());
// btbutton.addEventListener("pointerup", getEspData());
// 
document.addEventListener(
  "click",
  function enableNoSleep() {
    document.removeEventListener("click", enableNoSleep, false);
    noSleep.enable();
  },
  false
);

// function tryBluetooth() {
//   navigator.bluetooth.requestDevice();
// }

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

// setInterval(getEspData(),1000)
window.adcVoltageList = adcVoltageList;
window.enableADC = enableADC;
window.getAdsData = getADSData;
window.requestAnimationFrame(drawAll);
