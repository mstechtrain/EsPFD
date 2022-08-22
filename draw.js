import { ctx, cC } from "./canv.js";
import { ticks } from "./ticks.js";
import { espData, getTestData } from "./airData.js";

let colors = {
  tapeBG: "rgba(0,0,0,.5)",
  ticks: "rgb(255,255,255)",
};

let currentData = getTestData();

function drawTapeBG() {
  ctx.fillStyle = colors.tapeBG;
  ctx.fillRect(...cC.aSbg);
  ctx.fillRect(...cC.aFbg);
}

function drawAirSpeedTicks() {
  ctx.fillStyle = colors.ticks;
  ctx.font = "26pt Arial";
  ctx.textAlign = "center";
  let currentTicks = ticks.airSpeedTicks.filter((element) => {
    return (
      element <= currentData.airSpeed + 25 &&
      element >= currentData.airSpeed - 25
    );
  });
  currentTicks.forEach((value) => {
    ctx.fillText(
      value,
      cC.aSbg[2] * 0.5,
      cC.aSbg[3] * 0.5 - (value - currentData.airSpeed) * 15
    );
  });
}

function drawAirSpeedValue() {
  ctx.font = "30pt Arial";
  ctx.textAlign = "center";
  ctx.fillText(Math.round(currentData.airSpeed), cC.aSbg[2] * 0.5, cC.aSbg[3] * 0.5);
}

function drawAirSpeed() {
  drawAirSpeedTicks();
  drawAirSpeedValue();
}

function drawAltFeetTicks() {
  ctx.fillStyle = colors.ticks;
  ctx.font = "26pt Arial";
  ctx.textAlign = "center";
  let currentTicks = ticks.altFeetTicks.filter((element) => {
    return (
      element <= currentData.altFeet + 2000 &&
      element >= currentData.altFeet - 2000
    );
  });

  currentTicks.forEach((value) => {
    ctx.fillText(
      value,
      cC.aFbg[0] + cC.aFbg[2] * 0.25,
      cC.aFbg[3] * 0.5 - (value - currentData.altFeet) * 0.25
    );
  });
}

function drawAltFeetValue() {
  ctx.font = "30pt Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    currentData.altFeet,
    cC.aFbg[0] + cC.aFbg[2] * 0.25,
    cC.aFbg[3] * 0.5
  );
}

function drawAltFeet() {
  drawAltFeetTicks();
  drawAltFeetValue();
}

function drawAll() {
  currentData = getTestData();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawTapeBG();
  drawAirSpeed();
  drawAltFeet();
  console.log(currentData);
  window.requestAnimationFrame(drawAll);
}

export { drawAll };
