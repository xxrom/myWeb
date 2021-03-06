const items = document.getElementsByClassName('b3__item');
const wrapper = document.getElementsByClassName('b3__wrapper-items')[0];

const worker = new Worker('./js/workers/b3.js');

worker.postMessage(items.length);
worker.onmessage = function ({ data }) {
  wrapper.style.transform = `translate(-${data}%)`;
};
