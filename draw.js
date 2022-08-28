import { cC, ctxaS, ctxaF, ctxeadi } from "./canv.js";
import { ticks } from "./ticks.js";
import { outputforrender } from "./airData.js";
// import { getADSData, outputforrender } from "./airData.js";

let colors = {
  tapeBG: "rgba(0,0,0,.5)",
  ticks: "rgb(255,255,255)",
};

let rot = 0;

let currentData = {
  altFeet: 0,
  airSpeed: 0,
  vsi: 0,
};

// setInterval(() => {
//   rot += 0.001;
// }, 1000);

function drawEADI() {
  ctxeadi.clearRect(0, 0, ctxeadi.canvas.width, ctxeadi.canvas.height);
  ctxeadi.scale(1, 1);

  ctxeadi.translate(ctxeadi.canvas.width * 0.5, ctxeadi.canvas.height * 0.5);
  ctxeadi.rotate((rot * Math.PI) / 180);
  ctxeadi.translate(ctxeadi.canvas.width * -0.5, ctxeadi.canvas.height * -0.5);

  let grd1 = ctxeadi.createLinearGradient(
    ctxeadi.canvas.width * 0.5,
    0,
    ctxeadi.canvas.width * 0.5,
    ctxeadi.canvas.height * 0.5
  );

  grd1.addColorStop(0, "lightblue");
  grd1.addColorStop(1, "blue");

  ctxeadi.fillStyle = grd1;
  ctxeadi.fillRect(
    0 - ctxeadi.canvas.width * 0.2,
    0 - ctxeadi.canvas.height * 0.2,
    ctxeadi.canvas.width * 1.4,
    ctxeadi.canvas.height * 0.7
  );

  let grd2 = ctxeadi.createLinearGradient(
    ctxeadi.canvas.width * 0.5,
    ctxeadi.canvas.height * 0.5,
    ctxeadi.canvas.width * 0.5,
    ctxeadi.canvas.height
  );

  grd2.addColorStop(0, "orange");
  grd2.addColorStop(1, "brown");

  ctxeadi.fillStyle = grd2;
  ctxeadi.fillRect(
    0 - ctxeadi.canvas.width * 0.2,
    ctxeadi.canvas.height * 0.5,
    ctxeadi.canvas.width * 1.4,
    ctxeadi.canvas.height * 0.7
  );
}

// function drawTapeBG() {
//   ctxaS.fillStyle = colors.tapeBG;
//   ctxaS.fillRect(...cC.aSaFbg);
//   ctxaF.fillStyle = colors.tapeBG;
//   ctxaF.fillRect(...cC.aSaFbg);
// }

function drawAirSpeedTicks() {
  ctxaS.fillStyle = colors.ticks;
  ctxaS.textBaseline = "middle";
  ctxaS.font = "26pt Arial";
  ctxaS.textAlign = "center";
  let currentTicks = ticks.airSpeedTicks.filter((element) => {
    return (
      element <= currentData.airSpeed + 25 &&
      element >= currentData.airSpeed - 25
    );
  });
  currentTicks.forEach((value) => {
    ctxaS.fillText(
      value,
      cC.aSaFbg[2] * 0.5,
      cC.aSaFbg[3] * 0.5 - (value - currentData.airSpeed) * 15
    );
    // ctxaS.fillRect(
    //   cC.aSaFbg[2] * 0,
    //   cC.aSaFbg[3] * 0.5 - value,
    //   cC.aSaFbg[2] * 1,
    //   (cC.aSaFbg[3] * 0.5) - (value + 1) * -.05
    // );
  });
}

function drawAirSpeedValue() {
  ctxaS.font = "30pt Arial";
  ctxaS.textAlign = "center";
  ctxaS.textBaseline = "middle";
  ctxaS.fillText(
    Math.round(currentData.airSpeed),
    cC.aSaFbg[2] * 0.5,
    cC.aSaFbg[3] * 0.5
  );
}

function drawAirSpeed() {
  ctxaS.clearRect(0, 0, ctxaS.canvas.width, ctxaS.canvas.height);
  drawAirSpeedTicks();
  drawAirSpeedValue();
}

function drawAltFeetTicks() {
  ctxaF.fillStyle = colors.ticks;
  ctxaF.textBaseline = "middle";
  ctxaF.font = "26pt Arial";
  ctxaF.textAlign = "center";
  let currentTicks = ticks.altFeetTicks.filter((element) => {
    return (
      element <= currentData.altFeet + 2000 &&
      element >= currentData.altFeet - 2000
    );
  });

  currentTicks.forEach((value) => {
    ctxaF.fillText(
      value,
      cC.aSaFbg[0] + cC.aSaFbg[2] * 0.25,
      cC.aSaFbg[3] * 0.5 - (value - currentData.altFeet) * 0.25
    );
  });
}

function drawAltFeetValue() {
  ctxaF.font = "30pt Arial";
  ctxaF.textBaseline = "middle";
  ctxaF.textAlign = "center";
  ctxaF.fillText(
    Math.floor(currentData.altFeet / 10) * 10,
    cC.aSaFbg[0] + cC.aSaFbg[2] * 0.25,
    cC.aSaFbg[3] * 0.5
  );
}

function drawAltFeet() {
  ctxaF.clearRect(0, 0, ctxaF.canvas.width, ctxaF.canvas.height);
  drawAltFeetTicks();
  drawAltFeetValue();
}

async function drawAll() {
  currentData = await outputforrender(0);

  drawEADI();
  drawAirSpeed();
  drawAltFeet();

  window.requestAnimationFrame(drawAll);
}

export { drawAll };
