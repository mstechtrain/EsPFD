import { cC, ctxaS, ctxaF, ctxeadi} from "./canv.js";
import { ticks } from "./ticks.js";
import { drawAll } from "./draw.js";

window.addEventListener('devicemotion', (event) => {
  document.getElementById("label").innerText = event.acceleration.x;
  console.log(`${event.acceleration.x} m/s2`);
});

window.requestAnimationFrame(drawAll);
