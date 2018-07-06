function calcDist(one, two) {
  return Math.sqrt(Math.abs((one.x - two.x) * (one.x - two.x)) +
      Math.abs((one.y - two.y) * (one.y - two.y)));
}

function findNearItems(items, connectLength) {
  const ans = [];
  let one;
  let two;
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      one = items[i];
      two = items[j];

      if (calcDist(one, two) < connectLength) {
        ans.push({
          x1: one.x,
          y1: one.y,
          x2: two.x,
          y2: two.y
        });
      }
    }
  }
  return ans;
}

self.onmessage = function onMessage(props) {
  const { type, payload } = props.data;
  switch (type) {
    case 'move': {
      console.log('W move');
      this.postMessage(['test']);
      break;
    }
    case 'find': {
      const { items, connectLength } = payload;
      const lines = findNearItems(items, connectLength);
      this.postMessage({
        lines
      });
      break;
    }
    default: {
      console.log('W default');
      break;
    }
  }
};
