function calcDist(one, two) {
  return Math.sqrt(Math.abs((one.x - two.x) * (one.x - two.x)) +
      Math.abs((one.y - two.y) * (one.y - two.y)));
}

function generateNewItem(canvasWidth, canvasHeight, randomParam = 0) {
  return Math.random() > canvasHeight / canvasWidth
    ? {
      x: Math.random() * canvasWidth,
      y: randomParam,
      step: 0.1 + Math.random() * 0.9
    }
    : {
      x: randomParam,
      y: Math.random() * canvasHeight,
      step: 0.1 + Math.random() * 0.9
    };
}

function findNearItems({
  items,
  connectLength,
  step,
  canvasHeight,
  canvasWidth
}) {
  const lines = [];
  const newItems = [];

  let x = 0;
  let y = 0;

  for (let i = 0; i < items.length; i += 1) {
    x = items[i].x + items[i].step;
    y = items[i].y + items[i].step;

    if (x > canvasWidth || y > canvasHeight) {
      newItems.push(generateNewItem(canvasWidth, canvasHeight));
    } else {
      newItems.push({ x, y, step: items[i].step });
    }
  }

  let one;
  let two;
  for (let i = 0; i < newItems.length; i += 1) {
    for (let j = i + 1; j < newItems.length; j += 1) {
      one = newItems[i];
      two = newItems[j];

      if (calcDist(one, two) < connectLength) {
        lines.push({
          x1: one.x,
          y1: one.y,
          x2: two.x,
          y2: two.y
        });
      }
    }
  }

  return {
    lines,
    items: newItems
  };
}

self.onmessage = function onMessage(props) {
  const { type, payload } = props.data;
  switch (type) {
    case 'find': {
      const ansObj = findNearItems(payload);
      this.postMessage(ansObj);
      break;
    }
    default: {
      console.log('W default');
      this.postMessage(props.data);
      break;
    }
  }
};
