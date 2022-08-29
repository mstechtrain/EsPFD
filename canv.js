import { drawAll } from "./draw.js";

let asCanvas = document.getElementById("asCanvas");
let eadiCanvas = document.getElementById("eadiCanvas");
let afCanvas = document.getElementById("afCanvas");

let cC = {
  aSbg: [0, 0, asCanvas.width, asCanvas.height],
  aScv: asCanvas.height * 0.5,
  aSch: asCanvas.width * 0.5,
  aFbg: [0, 0, afCanvas.width, afCanvas.height],
  aFcv: afCanvas.height * 0.5,
  aFch: afCanvas.width * 0.5,
  vsibg: [
    afCanvas.width * 0.63,
    0,
    afCanvas.width,
    afCanvas.height,
  ],
};

let ctxaS = asCanvas.getContext("2d");
let ctxeadi = eadiCanvas.getContext("2d");
let ctxaF = afCanvas.getContext("2d");

function updatecC() {
  cC = {
    aSbg: [0, 0, asCanvas.width, asCanvas.height],
    aScv: asCanvas.height * 0.5,
    aSch: asCanvas.width * 0.5,
    aFbg: [0, 0, afCanvas.width, afCanvas.height],
    aFcv: afCanvas.height * 0.5,
    aFch: afCanvas.width * 0.5,
    vsibg: [
      afCanvas.width * 0.63,
      0,
      afCanvas.width,
      afCanvas.height,
    ],
  };
  // console.log(cC);
}

const resize = () => {
  ctxaS.canvas.width = window.innerWidth * 0.15;
  ctxaS.canvas.height = window.innerHeight;
  ctxeadi.canvas.width = window.innerWidth;
  ctxeadi.canvas.height = window.innerHeight;
  ctxaF.canvas.width = window.innerWidth * 0.2;
  ctxaF.canvas.height = window.innerHeight;
  updatecC();
  drawAll();
};

resize();
window.addEventListener("resize", resize);

export { cC, ctxaS, ctxaF, ctxeadi, updatecC };
