let adcVoltageList = {
  vinavg: [],
  adc1s1: [],
  adc1s2: [],
  adc2s1: [],
  adc2s2: [],
};

let calVals = {
  adc1s1max: 0,
  adc1s1min: 0,
  adc1s2max: 0,
  adc1s2min: 0,
  adc2s1max: 0,
  adc2s1min: 0,
  adc2s2max: 0,
  adc2s2min: 0,
  calMax: 0,
  calMin: 0,
  length: 0,
};

function numCalVals() {
  for (const key in calVals) {
    calVals[key] = parseFloat(localStorage[key]);
  }
  console.log(JSON.stringify(calVals));
}

numCalVals();

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
  adc2vsi: 0,
};

let vsiList = {
  adc1vsi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  adc2vsi: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  adc1vsiLastAlt: 0,
  adc2vsiLastAlt: 0,
};

let aSchange = -0.1;
let aFchange = -200;

function getEspData() {
  fetch("http://192.168.1.1/data", {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      if (!res.ok) {
        alert(res.status);
        return;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      updateData(data);
      // console.log(espData);
      setTimeout(() => {
        getEspData();
      }, 10);
      // setTimeout(getEspData(), 5000);
    })
    .catch((error) => {
      console.log(error);
    });
}

function debug() {
  let debugRaw = {};

  // document.getElementById("airdatadiv").innerText = JSON.stringify(airData);
  // document.getElementById("adcvoltdiv").innerText =
  //   JSON.stringify(adcVoltageList);
  document.getElementById("adcvoltavgdiv").innerText = JSON.stringify(adcPress);
  // console.log(calVals);
}

function updateData(dataIn) {
  if (adcVoltageList["adc1s1"].length < 50) {
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
  calculateAirSpeed("q400adc2");
  // calculateAirSpeedTest();
  // console.log(airData);
}

function calculatePress() {
  if (calVals.length >= 10) {
    for (const key in adcPress) {
      let avgVal = ((adcVavg[key] / adcVavg.vinavg + 0.095) / 0.009) * 10;
      adcPress[key] =
        Math.round(
          (((avgVal - calVals[key + "min"]) *
            (calVals.calMax - calVals.calMin)) /
            (calVals[key + "max"] - calVals[key + "min"]) +
            calVals.calMin) *
            1e3
        ) / 1e3;
    }
    // console.log("ran cal");
  } else {
    for (const key in adcPress) {
      adcPress[key] =
        Math.round(
          ((adcVavg[key] / adcVavg.vinavg + 0.095) / 0.009) * 10 * 1e3
        ) / 1e3;
    }
    // console.log(calVals.length);
  }
  // console.log(adcPress);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//   ptCal = (((ptPress - ptMin) * (calMax - calMin)) / (ptMax - ptMin)) + calMin;
//   psCal = (((psPress - psMin) * (calMax - calMin)) / (psMax - psMin)) + calMin;
//////////////////////////////////////////////////////////////////////////////////////////////////

function calculateAlt() {
  let temp = 15;
  airData.adc1altFeet = Math.round(
    (((Math.pow(1013.25 / adcPress.adc1s2, 1 / 5.257) - 1.0) *
      (temp + 273.15)) /
      0.0065) *
      3.28084
  );
  airData.adc2altFeet = Math.round(
    (((Math.pow(1013.25 / adcPress.adc2s2, 1 / 5.257) - 1.0) *
      (temp + 273.15)) /
      0.0065) *
      3.28084
  );
}

function calculateAirSpeed(mode) {
  let airDensity = 1.204;

  let testvalue = adcPress.adc2s2;

  let adc1pitot = adcPress.adc1s1,
    adc1static = adcPress.adc1s2,
    adc2pitot = adcPress.adc2s1,
    adc2static = adcPress.adc2s2;

  // if (testvalue) {
  //   adc1pitot = testvalue -3;
  //   adc1static = testvalue;
  //   adc2pitot = testvalue - 3;
  //   adc2static = testvalue;
  // }

  if (mode == "q400adc1") {
    adc2static = adc1static;
  } else if (mode == "q400adc2") {
    adc1static = adc2static;
  } else {};

  if (adc1pitot > adc1static) {
    airData.adc1airSpeed = Math.round(
      Math.sqrt(1000 * (adc1pitot - adc1static)) / airDensity
    );
  } else {
    let neg = Math.round(
      Math.sqrt(1000 * (adc1static - adc1pitot)) / airDensity
    );
    airData.adc1airSpeed = -neg;
  }
  if (adc2pitot > adc2static) {
    airData.adc2airSpeed = Math.round(
      Math.sqrt(1000 * (adc2pitot - adc2static)) / airDensity
    );
  } else {
    let neg = Math.round(
      Math.sqrt(1000 * (adc2static - adc2pitot)) / airDensity
    );
    airData.adc2airSpeed = -neg;
  }
  console.log(airData);
}

function calculateVSI() {
  vsiList.adc1vsi.shift();
  vsiList.adc2vsi.shift();
  vsiList.adc1vsi.push(airData.adc1altFeet - vsiList.adc1vsiLastAlt);
  vsiList.adc2vsi.push(airData.adc2altFeet - vsiList.adc2vsiLastAlt);

  airData.adc1vsi =
    Math.round(
      vsiList.adc1vsi.reduce((a, b) => a + b) / vsiList.adc1vsi.length
    ) * 30;

  airData.adc2vsi =
    Math.round(
      vsiList.adc2vsi.reduce((a, b) => a + b) / vsiList.adc2vsi.length
    ) * 30;

  vsiList.adc1vsiLastAlt = airData.adc1altFeet;
  vsiList.adc2vsiLastAlt = airData.adc2altFeet;
}

function formatAirData() {
  for (const key in airData) {
    airData[key] = Math.round(airData[key]);
  }
}

function outputforrender(adcrev) {
  if (adcrev == 0) {
    // let tempAirspeed = (airData.adc1airSpeed + airData.adc2airSpeed) / 2;
    let output = {
      altFeet: (airData.adc1altFeet + airData.adc2altFeet) / 2,
      airSpeed: Math.max((airData.adc1airSpeed + airData.adc2airSpeed) / 2, 30),
      vsi: (airData.adc1vsi + airData.adc2vsi) / 2,
    };
    return output;
  } else if (adcrev == 1) {
    let output = {
      altFeet: airData.adc1altFeet,
      airSpeed: Math.max(airData.adc1airSpeed, 30),
      vsi: airData.adc1vsi,
    };
    return output;
  } else {
    let output = {
      altFeet: airData.adc2altFeet,
      airSpeed: Math.max(airData.adc2airSpeed, 30),
      vsi: airData.adc2vsi,
    };
    return output;
  }
}
function start() {
  setInterval(() => {
    calculateVSI();
    formatAirData();
    // console.log(airData.adc2altFeet - vsiList.adc2vsiLastAlt);
    // document.getElementById("label").innerText = JSON.stringify(
    //   outputforrender(0)
    // );
  }, 300);
}

function enableADC() {
  getEspData();
}

export { enableADC, outputforrender, start, debug };
