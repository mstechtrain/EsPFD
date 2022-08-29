import { debug, enableADC } from "./airData.js";
import { testcaldata } from "./calData.js";

console.log("json:", testcaldata);

let calVals = {};

function startADC() {
  enableADC();
  document.getElementById("adcstatus").innerText = "STARTED";
  document.getElementById("adcstatus").style.backgroundColor = "lime";

  setInterval(() => {
    debug();
  }, 200);
}
const input = document.querySelectorAll("input");
console.log(input);
input.forEach((element) => {
  document.getElementById(element.id).addEventListener("change", (event) => {
    updateCalVals(element.id, document.getElementById(element.id).value);
  });
});

function updateCalVals(id, value) {
  localStorage.setItem(String(id), value);
  calVals[id] = value;
  console.log(calVals);
}
// input.addEventListener('change', ((event)=>{console.log(event)}))

window.startADC = startADC;
window.enableADC = enableADC;
window.debug = debug;
