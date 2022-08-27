let espData = {
  airSpeed: 74,
  altFeet: 2000,
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
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
  alert(JSON.stringify(espData));
  fetch("http://192.168.1.1/data")
    .then((res) => {
      if (!res.ok) {
        console.log(res.status);
        return;
      } else {
        return res.text();
      }
    })
    .then((data) => {
      espData = data;
      console.log(espData);
      setTimeout(getEspData(), 20);
    });
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

function getTestData() {
  return espData;
}

export { getTestData, espData, getEspData };
