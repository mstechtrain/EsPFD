import { drawAll } from "./draw.js";

let asCanvas = document.getElementById("asCanvas");
let eadiCanvas = document.getElementById("eadiCanvas");
let afCanvas = document.getElementById("afCanvas");

let cC = { aSbg: [], aFbg: [] };
let ctxaS = asCanvas.getContext("2d");
let ctxeadi = eadiCanvas.getContext("2d");
let ctxaF = afCanvas.getContext("2d");

function updatecC() {
  cC = {
    aSbg: [0, 0, asCanvas.width, asCanvas.height],
    aFbg: [0, 0, afCanvas.width, afCanvas.height],
  };
}

const resize = () => {
  ctxaS.canvas.width = window.innerWidth*.2;
  ctxaS.canvas.height = window.innerHeight;
  ctxeadi.canvas.width = window.innerWidth;
  ctxeadi.canvas.height = window.innerHeight;
  ctxaF.canvas.width = window.innerWidth*.2;
  ctxaF.canvas.height = window.innerHeight;
  updatecC();
  drawAll();
};

resize();
window.addEventListener("resize", resize);

export { cC, ctxaS, ctxaF, ctxeadi, updatecC };
