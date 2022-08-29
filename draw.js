import { cC, ctxaS, ctxaF, ctxeadi } from "./canv.js";
import { ticks } from "./ticks.js";
import { outputforrender } from "./airData.js";
// import { getADSData, outputforrender } from "./airData.js";

let colors = {
  tapeBG: "rgba(0,0,0,.5)",
  ticks: "rgb(255,255,255)",
};

let rot = 0;

let ads = 0;

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

function drawAirSpeedTicks() {
  let canvhc = cC.aSch,
    canvvc = cC.aScv,
    currentAirspeed = currentData.airSpeed,
    // currentAirspeed = 200,
    spread = 10;

  ctxaS.fillStyle = colors.ticks;
  ctxaS.textBaseline = "middle";
  ctxaS.font = "26pt Share";
  ctxaS.textAlign = "center";

  let currentTicks = ticks.airSpeedTicks.filter((element) => {
    return element <= currentAirspeed + 40 && element >= currentAirspeed - 40;
  });

  currentTicks.forEach((value) => {
    let tickwidth = Math.round(ctxaS.measureText(value).width);

    if (!(value % 20)) {
      //even
      ctxaS.fillText(
        value,
        canvhc,
        canvvc - (value - currentAirspeed) * spread
      );
      ctxaS.fillRect(
        canvhc + tickwidth * 0.6,

        canvvc - (value - currentAirspeed) * spread,
        canvhc,
        cC.aSbg[3] * 0.005
      );
    } else if (value % 20 && value > 200) {
      //odd
      ctxaS.fillRect(
        canvhc + tickwidth,
        canvvc - (value - currentAirspeed) * spread,
        canvhc,
        cC.aSbg[3] * 0.005
      );
    } else {
      ctxaS.fillText(
        value,
        canvhc,
        canvvc - (value - currentAirspeed) * spread
      );
      ctxaS.fillRect(
        canvhc + tickwidth,
        canvvc - (value - currentAirspeed) * spread,
        canvhc,
        cC.aSbg[3] * 0.005
      );
    }
  });
}

function drawAirSpeedValue() {
  let canvhc = cC.aSch,
    canvvc = cC.aScv,
    currentAirspeed = currentData.airSpeed,
    textSize = ctxaS.measureText(currentAirspeed),
    valueHeight = Math.round(
      textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent
    ),
    valuewidth = Math.round(textSize.width);

  //draw value bg here
  // console.log(valueHeight);
  ctxaS.fillStyle = "black";
  ctxaS.strokeStyle = "white";
  ctxaS.lineWidth = 3;
  ctxaS.beginPath();
  ctxaS.moveTo(cC.aSbg[2] * 0.1, canvvc - valueHeight);
  ctxaS.lineTo(canvhc + valuewidth * 1.3, canvvc - valueHeight);
  ctxaS.lineTo(cC.aSbg[2], canvvc);
  ctxaS.lineTo(canvhc + valuewidth * 1.3, canvvc + valueHeight);
  ctxaS.lineTo(cC.aSbg[2] * 0.1, canvvc + valueHeight);
  ctxaS.closePath();
  ctxaS.fill();
  ctxaS.stroke();

  //draw value
  ctxaS.font = "30pt Share";
  ctxaS.fillStyle = "lime";
  ctxaS.textAlign = "center";
  ctxaS.textBaseline = "middle";
  ctxaS.fillText(Math.round(currentData.airSpeed), canvhc, canvvc);
}

function drawAirSpeed() {
  ctxaS.clearRect(0, 0, ctxaS.canvas.width, ctxaS.canvas.height);
  drawAirSpeedTicks();
  drawAirSpeedValue();
}

function drawAltFeetTicks() {
  let canvhc = cC.aFch,
    canvvc = cC.aFcv,
    spread = 1;

  ctxaF.fillStyle = colors.ticks;
  ctxaF.textBaseline = "middle";
  ctxaF.font = "26pt Share";
  ctxaF.textAlign = "left";

  let currentTicks = ticks.altFeetTicks.filter((element) => {
    return (
      element <= currentData.altFeet + 550 &&
      element >= currentData.altFeet - 550
    );
  });

  currentTicks.forEach((value) => {
    let tickwidth = Math.round(ctxaF.measureText(value).width);
    ctxaF.fillText(
      value,
      canvhc * 0.25,
      canvvc - (value - currentData.altFeet) * spread
    );

    ctxaF.fillRect(
      0,
      canvvc - (value - currentData.altFeet) * spread - cC.aFbg[3] * 0.0025,

      canvhc * 0.2,
      // canvhc*.5,
      cC.aFbg[3] * 0.005
    );
  });
}

function drawAltFeetValue() {
  let canvhc = cC.aFch,
    canvvc = cC.aFcv,
    currentaltFeet = currentData.altFeet,
    // currentaltFeet = -8000,
    textSize = ctxaS.measureText(currentaltFeet),
    valueHeight = Math.round(
      textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent
    ),
    valuewidth = Math.round(textSize.width);

  //draw value bg here
  // console.log(valueHeight);
  ctxaF.fillStyle = "black";
  ctxaF.strokeStyle = "white";
  ctxaF.lineWidth = 3;

  ctxaF.beginPath();
  // ctxaF.moveTo(cC.aFbg[2] * 0.5, canvvc - valueHeight);
  ctxaF.moveTo(0, canvvc);
  ctxaF.lineTo(canvhc * 0.25, canvvc - valueHeight);

  ctxaF.lineTo(canvhc * 1.25, canvvc - valueHeight);
  ctxaF.lineTo(canvhc * 1.25, canvvc + valueHeight);

  ctxaF.lineTo(canvhc * 0.25, canvvc + valueHeight);

  ctxaF.closePath();
  ctxaF.fill();
  ctxaF.stroke();

  ctxaF.font = "30pt Share";
  ctxaF.textBaseline = "middle";
  ctxaF.textAlign = "left";
  ctxaF.fillStyle = "lime";

  ctxaF.fillText(Math.floor(currentaltFeet / 10) * 10, canvhc * 0.25, canvvc);
}

function drawAltFeet() {
  ctxaF.clearRect(0, 0, ctxaF.canvas.width, ctxaF.canvas.height);
  drawAltFeetTicks();
  drawAltFeetValue();
}

function changeADS() {
  if (ads == 0) {
    ads++;
    document.getElementById("adsRevInd").innerText="ADS 1";
  } else if (ads == 1){
    ads++;
    document.getElementById("adsRevInd").innerText="ADS 2";
  } else {
    ads = 0;
    document.getElementById("adsRevInd").innerText="BOTH";
  }
}

async function drawAll() {
  currentData = await outputforrender(ads);

  drawEADI();
  drawAirSpeed();
  drawAltFeet();

  window.requestAnimationFrame(drawAll);
}

export { drawAll, changeADS };
