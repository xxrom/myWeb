let i = 0;
const visibleItems = 4;
let currentShift = 0;

self.onmessage = function onMessage({ data }) {
  console.log('Worker', data);
  const numberItems = data;

  setInterval(() => {
    i += 1;
    if (i > numberItems - visibleItems) {
      i = 0;
    }
    currentShift = i * (100 / visibleItems);

    this.postMessage(currentShift);
  }, 3000);
};
