import { cC, ctx, canvas, updatecC } from "./canv.js";
import { ticks } from "./ticks.js";
import { drawAll } from "./draw.js";

//Canvas Setup//

let espData = {
  airSpeed: 30,
  altFeet: 2000,
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
};

for (const item in espData) {
  espData[item] = Math.random() * 10;
}

window.requestAnimationFrame(drawAll);
