let espData = {
  airSpeed: 74,
  altFeet: 2000,
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
};

let adcVoltageList = {
  vinavg: [],
  adc1s1: [],
  adc1s2: [],
  adc2s1: [],
  adc2s2: [],
};

let adcVavg = {};

let adcPress = {
  adc1s1: [],
  adc1s2: [],
  adc2s1: [],
  adc2s2: [],
};

let airData = {
  adc1altFeet: 0,
  adc2altFeet: 0,
  adc1airSpeed: 0,
  adc2airSpeed: 0,
  adc1vsi: 0,
  asdc2vsi: 0,
};

let aSchange = -0.1;
let aFchange = -200;

function getEspDataButton() {
  console.log("ADS Button pressed");
  fetch("https://www.mstechtrain.github.io/EsPFDjs/")
    .then((response) => {
      if (!response.ok) {
        console.log(response.status);
      } else {
        return response.text();
      }
    })
    .then((data) => console.log(data));
}

function getEspData() {
  fetch("http://192.168.1.36/data")
    .then((res) => {
      if (!res.ok) {
        console.log(res.status);
        return;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      document.getElementById("label").innerText = JSON.stringify(data);
      updateData(data);
      // console.log(espData);
      setTimeout(() => {
        getEspData();
      }, 10);
      // setTimeout(getEspData(), 5000);
    });
}

function updateData(dataIn) {
  if (adcVoltageList["adc1s1"].length < 10) {
    for (const key in dataIn) {
      // adcVoltageList[key].push(((dataIn[key] * 6.144) / 32767).toFixed(4));
      adcVoltageList[key].push(dataIn[key]);
    }
  } else {
    for (const key in dataIn) {
      adcVoltageList[key].shift();
      adcVoltageList[key].push(dataIn[key]);
    }
  }

  for (const key in adcVoltageList) {
    let eachAvg =
      adcVoltageList[key].reduce((a, b) => a + b) / adcVoltageList[key].length;
    let eachAvgToV = (eachAvg * 6.144) / 32767;
    adcVavg[key] = Math.round(eachAvgToV * 1e4) / 1e4;
  }
  calculatePress();
  calculateAlt();
  calculateAirSpeed();
  console.log(airData);
}

function calculatePress() {
  for (const key in adcPress) {
    adcPress[key] = ((adcVavg[key] / adcVavg.vinavg + 0.095) / 0.009) * 10;
  }
  // console.log(adcPress);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
//   ptCal = (((ptPress - ptMin) * (calMax - calMin)) / (ptMax - ptMin)) + calMin;
//   psCal = (((psPress - psMin) * (calMax - calMin)) / (psMax - psMin)) + calMin;
//////////////////////////////////////////////////////////////////////////////////////////////////

function calculateAlt() {
  let temp = 15;
  airData.adc1altFeet =
    (((Math.pow(1013.25 / adcPress.adc1s1, 1 / 5.257) - 1.0) *
      (temp + 273.15)) /
      0.0065) *
    3.28084;
  airData.adc2altFeet =
    (((Math.pow(1013.25 / adcPress.adc2s1, 1 / 5.257) - 1.0) *
      (temp + 273.15)) /
      0.0065) *
    3.28084;
}

function calculateAirSpeed() {
  let airDensity = 1.204;
  if (adcPress.adc1s2 > adcPress.adc1s1) {
    airData.adc1airSpeed = Math.sqrt(
      (2 * (adcPress.adc1s2 - adcPress.adc1s1)) / airDensity
    );
  } else {
    let neg = Math.sqrt((2 * (adcPress.adc1s1 - adcPress.adc1s2)) / airDensity);
    airData.adc1airSpeed = -neg;
  }
  if(adcPress.adc2s2>adcPress.adc2s1){
    airData.adc2airSpeed =
      Math.sqrt((2 * (adcPress.adc2s2 - adcPress.adc2s1)) / airDensity);
    } else {
      let neg = Math.sqrt((2 * (adcPress.adc2s1 - adcPress.adc2s2)) / airDensity);
      airData.adc2airSpeed = -(neg);
    }
  
}
// setInterval(() => {
//   if (espData.airSpeed > 30 && espData.airSpeed < 250) {
//     espData.airSpeed = +(espData.airSpeed + aSchange).toFixed(2);
//   } else if (espData.airSpeed <= 30) {
//     aSchange = 0.1;
//     espData.airSpeed = +(espData.airSpeed + aSchange).toFixed(2);
//   } else if ((espData.airSpeed = 250)) {
//     aSchange = -0.1;
//     espData.airSpeed = +(espData.airSpeed + aSchange).toFixed(2);
//   }

//   if (espData.altFeet > -1000 && espData.altFeet < 30000)
//     espData.altFeet += aFchange;
//   else if (espData.altFeet == -1000) {
//     aFchange = 2;
//     espData.altFeet += aFchange;
//   } else if (espData.altFeet == 30000) {
//     aFchange = -2;
//     espData.altFeet += aFchange;
//   }
// }, 20);

// for (const item in espData) {
//   espData[item] = Math.random() * 10;
// }

function enableADC() {
  getEspData();
}

function getADSData() {
  return adcPress;
}
export { getADSData, adcVoltageList, enableADC };
