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
  try {
    const module = await import("https://scotwatson.github.io/Debug/ErrorLog.mjs");
    return module;
  } catch (e) {
    console.error(e);
  }
})();

(async function () {
  try {
    const modules = await Promise.all( [ loadWindow, loadErrorLogModule ] );
    start(modules);
  } catch (e) {
    console.error(e);
  }
})();

function start( [ evtWindow, ErrorLog ] ) {
  try {
    let p = document.createElement("p");
    let label = document.createElement("span");
    label.innerHTML = "x: ";
    p.appendChild(label);
    let xDisplay = document.createElement("span");
    xDisplay.innerHTML = "";
    p.appendChild(xDisplay);
    document.body.appendChild(p);
    p = document.createElement("p");
    label = document.createElement("span");
    label.innerHTML = "y: ";
    p.appendChild(label);
    let yDisplay = document.createElement("span");
    yDisplay.innerHTML = "";
    p.appendChild(yDisplay);
    document.body.appendChild(p);
    p = document.createElement("p");
    label = document.createElement("span");
    label.innerHTML = "z: ";
    p.appendChild(label);
    let zDisplay = document.createElement("span");
    zDisplay.innerHTML = "";
    p.appendChild(zDisplay);
    document.body.appendChild(p);
    const mag = new Magnetometer({frequency: 60});
    mag.addEventListener("reading", function (evt) {
      xDisplay.innerHTML = mag.x;
      yDisplay.innerHTML = mag.y;
      zDisplay.innerHTML = mag.z;
    });
    mag.start();
  } catch (e) {
    ErrorLog.finalCatch({
      functionName: "start",
      error: e,
    });
  }
}
