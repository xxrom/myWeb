const throttleTime = 30;
const mainImg = document.getElementsByClassName('b1__img')[0];
let timeId;

function calcImg() {
  const top = Math.round(window.pageYOffset * 0.6);
  mainImg.style.top = `${top}px`;

  timeId = undefined;
}

window.onscroll = function scrollImg() {
  if (
    typeof timeId === 'undefined' &&
    window.pageYOffset < window.innerHeight
  ) {
    timeId = setTimeout(calcImg, throttleTime);
  }
};

const worker = new Worker('./js/worker.js');
worker.postMessage({ hello: 'world' });
worker.onmessage = function (e) {
  console.log('onMessage from worker', e);
};
