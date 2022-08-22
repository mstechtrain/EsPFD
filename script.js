let newText = "<h1>hello!</h1>";
let currentText = document.querySelector("h1");
console.log(currentText);
let data = {
  Pt1: 0,
  Pt2: 0,
  Ps1: 0,
  Ps2: 0,
};

for (const item in data) {
  data[item] = Math.random() * 10;
}

function insertText(text) {
  //   console.log(text);
  //   currentText.innerHTML = text;
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


setInterval(function(){
currentText.innerHTML = "<h1> IT WORKS! </h1>";
navigator.bluetooth.requestDevice(options.acceptAllDevices=true).then((device)=>{currentText.innerHTML = device.name})

}, 5000);