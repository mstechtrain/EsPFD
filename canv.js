import { drawAll } from "./draw.js";

let canvas = document.getElementById("myCanvas");

let cC = { aSbg: [], aFbg: [] };
let ctx = canvas.getContext("2d");

function updatecC() {
  cC = {
    aSbg: [0, 0, canvas.width * 0.2, canvas.height],
    aFbg: [canvas.width * 0.8, 0, canvas.width * 0.2, canvas.height],
  };
}

const resize = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  updatecC();
  drawAll();
};

resize();
window.addEventListener("resize", resize);

export { cC, ctx, canvas, updatecC };
