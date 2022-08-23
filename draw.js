import { cC, ctxaS, ctxaF, ctxeadi } from "./canv.js";
import { ticks } from "./ticks.js";
import { getTestData } from "./airData.js";

let colors = {
  tapeBG: "rgba(0,0,0,.5)",
  ticks: "rgb(255,255,255)",
};

let currentData = getTestData();

// function drawEADI() {
//   let grd = ctx.createRadialGradient(
//     canvas.width * 0.5,
//     canvas.height * 0.5,
//     canvas.width * 0.125,
//     canvas.width * 0.5,
//     canvas.height * 0.5,
//     canvas.width * 0.75
//   );

//   grd.addColorStop(0, "blue");
//   grd.addColorStop(1, "cyan");

//   ctx.fillStyle = grd;
//   ctx.arc(
//     canvas.width * 0.5,
//     canvas.height * 0.5,
//     canvas.width * 0.7,
//     1 * Math.PI,
//     2 * Math.PI
//   );
// //   ctx.fill();

//   let grd2 = ctx.createRadialGradient(
//     canvas.width * 0.5,
//     canvas.height * 0.5,
//     canvas.width * 0.125,
//     canvas.width * 0.5,
//     canvas.height * 0.5,
//     canvas.width * 0.75
//   );

//   grd2.addColorStop(0, "brown");
//   grd2.addColorStop(1, "black");
// //   ctx.fillStyle = grd2;
// //   ctx.arc(
// //     canvas.width * 0.5,
// //     canvas.height * 0.5,
// //     canvas.width * 0.17,
// //     0.5 * Math.PI,
// //     1 * Math.PI
// //   );
// //   ctx.fill();
// }

function drawTapeBG() {
  ctxaS.fillStyle = colors.tapeBG;
  ctxaS.fillRect(...cC.aSaFbg);
  ctxaF.fillStyle = colors.tapeBG;
  ctxaF.fillRect(...cC.aSaFbg);
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
  ctx.fillText(
    Math.round(currentData.airSpeed),
    cC.aSbg[2] * 0.5,
    cC.aSbg[3] * 0.5
  );
}

function drawAirSpeed() {
  // drawAirSpeedTicks();
  // drawAirSpeedValue();
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
    Math.floor(currentData.altFeet / 10) * 10,
    cC.aFbg[0] + cC.aFbg[2] * 0.25,
    cC.aFbg[3] * 0.5
  );
}

function drawAltFeet() {
  // drawAltFeetTicks();
  // drawAltFeetValue();
}

function drawAll() {
  currentData = getTestData();
  ctxaS.clearRect(0, 0, ctxaS.canvas.width, ctxaS.canvas.height);
  ctxeadi.clearRect(0, 0, ctxeadi.canvas.width, ctxeadi.canvas.height);
  ctxaF.clearRect(0, 0, ctxaF.canvas.width, ctxaF.canvas.height);
  // drawEADI();
  drawTapeBG();
  drawAirSpeed();
  drawAltFeet();

  window.requestAnimationFrame(drawAll);
}

export { drawAll };
