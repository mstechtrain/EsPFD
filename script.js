let newText = "<h1>hello!</h1>";
let currentText = document.querySelector("h1");
console.log(currentText);
let data = {
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
};

let options = { acceptAllDevices: true };

function testBT() {
  navigator.bluetooth
    .requestDevice(options)
    .then((device) => {
      currentText.innerHTML = device.name;
      console.log(device.name);
    })
    .catch((error) => (currentText.innerHTML = error));
}

for (const item in data) {
  data[item] = Math.random() * 10;
}


// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((dataOut) => {
//     data = dataOut;
//     currentText.innerHTML = JSON.stringify(data);
//     console.log(data);
//   });

//   .then((json) => {
//     console.log(currentText);
//     currentText.innerText = json;
//   });

// console.log(data);

setTimeout(function () {
  currentText.innerHTML = "<h1> IT WORKS! </h1>";
}, 1000);
