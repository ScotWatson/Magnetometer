/*
(c) 2022 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

"use strict";

const initPageTime = performance.now();

const loadWindow = new Promise(function (resolve, reject) {
  window.addEventListener("load", function (evt) {
    resolve(evt);
  });
});

const loadErrorLogModule = (async function () {
  const module = await import("https://scotwatson.github.io/Debug/ErrorLog.mjs");
  console.log(Object.getOwnPropertyNames(module));
  return module;
})();

Promise.all( [ loadWindow, loadErrorLogModule ] ).then(start, fail);

function start( [ evtWindow, ErrorLog ] ) {
  try {
    let p = document.createElement("p");
    let label = document.createElement("span");
    label.innerHTML = "x: ";
    p.appendChild(label);
    let xDisplay = document.createElement("span");
    xDisplay.innerHTML = "";
    document.body.appendChild(xDisplay);
    p = document.createElement("p");
    label = document.createElement("span");
    label.innerHTML = "y: ";
    p.appendChild(label);
    let yDisplay = document.createElement("span");
    yDisplay.innerHTML = "";
    document.body.appendChild(yDisplay);
    p = document.createElement("p");
    label = document.createElement("span");
    label.innerHTML = "z: ";
    p.appendChild(label);
    let zDisplay = document.createElement("span");
    zDisplay.innerHTML = "";
    document.body.appendChild(zDisplay);
    const mag = new Magnetometer({frequency: 60});
    mag.addEventListener("reading", function (evt) {
      xDisplay.innerHTML = mag.x;
      yDisplay.innerHTML = mag.y;
      zDisplay.innerHTML = mag.z;
    });
    mag.start();
  } catch (e) {
    finalCatch({
      functionName: "start",
      error: e,
    });
  }
}

function fail(e) {
  console.error(e);
}