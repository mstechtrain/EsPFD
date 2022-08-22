//Canvas Setup//

let canvas = document.getElementById("myCanvas");
let cC = { aSbg: [], aFbg: [] };

function setTicks(start, end, step) {
  const arrayLength = Math.floor((end - start) / step) + 1;
  const range = [...Array(arrayLength).keys()].map((x) => x * step + start);
  return range;
}

let ticks = {
  airSpeedTicks: setTicks(30, 280, 10),
  altFeetTicks: setTicks(-2000, 40000, 500),
};

function updatecC() {
  cC = {
    aSbg: [0, 0, canvas.height * 0.2, canvas.height],
    aFbg: [canvas.width * 0.8, 0, canvas.width * 0.2, canvas.height],
  };
  console.log(cC);
}

const resize = () => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  updatecC();
  drawAll();
};

let ctx = canvas.getContext("2d");

resize();
window.addEventListener("resize", resize);
// window.onload(setTicks);
////////////////////////////////

let espData = {
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
};

for (const item in espData) {
  espData[item] = Math.random() * 10;
}

function drawTapeBG() {
  ctx.fillStyle = "rgb(0,0,0,.5)";
  ctx.fillRect(...cC.aSbg);
  ctx.fillRect(...cC.aFbg);
}

function drawAirSpeed() {
  drawAirSpeedTicks();
  drawAirSpeedValue();
}

function drawAirSpeedTicks() {}

function drawAll() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawTapeBG();
  console.log(ticks);
}

window.requestAnimationFrame(drawAll);
