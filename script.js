import { cC, ctxaS, ctxaF, ctxeadi } from "./canv.js";
import { ticks } from "./ticks.js";
import { drawAll } from "./draw.js";

window.addEventListener("devicemotion", (event) => {
  let combinedText =
    Math.round(event.acceleration.x) +
    " x     " +
    Math.round(event.acceleration.y) +
    " y     " +
    Math.round(event.acceleration.z) +
    "  z";
  document.getElementById("label").innerText = combinedText;
  console.log(`${event.acceleration.x} m/s2`);
});

window.requestAnimationFrame(drawAll);
