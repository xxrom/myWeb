const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
console.log(window.width);
canvas.width = 0.5 * window.innerWidth;
canvas.height = 0.5 * window.innerHeight;
canvas.style.border = '1px solid red';

ctx.beginPath();
ctx.arc(60, 60, 60, 0, 2 * Math.PI);
ctx.stroke();

const updateTime = 30;
const step = 1;

const numberItems = 30;
const items = [];

function init() {
  for (let i = 0; i < numberItems; i++) {
    items.push(generateNewItem());
  }
}

init();

function generateNewItem() {
  return Math.random() > 0.5
    ? {
      x: Math.random() * canvas.width,
      y: 0
    }
    : {
      x: 0,
      y: Math.random() * canvas.height
    };
}

function calcDist(one, two) {
  return Math.sqrt(Math.abs((one.x - two.x) * (one.x - two.x)) +
      Math.abs((one.y - two.y) * (one.y - two.y)));
}

function makeLineByTwoPoints(one, two, ctx) {
  ctx.moveTo(one.x, one.y);
  ctx.lineTo(two.x, two.y);
  ctx.stroke();
}

function findNearItems(arr, ctx) {
  arr.forEach((obj) => {
    arr.forEach((item) => {
      if (calcDist(obj, item) < 100) {
        makeLineByTwoPoints(obj, item, ctx);
      }
    });
  });
}

function moveItem(items, index) {
  items[index].x += step;
  items[index].y += step;

  if (items[index].x > canvas.width || items[index].y > canvas.height) {
    items[index] = generateNewItem();
  }
}

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00f';
  items.forEach((item, index) => {
    ctx.beginPath();
    ctx.arc(item.x, item.y, 3, 0, 2 * Math.PI);
    ctx.stroke();

    moveItem(items, index);
  });

  ctx.lineWidth = 0.1;
  ctx.strokeStyle = '#f00';

  findNearItems(items, ctx);
}, updateTime);

canvas.addEventListener('mousemove', (e) => {
  const bounds = canvas.getBoundingClientRect();
  const mx = e.clientX - bounds.left;
  const my = e.clientY - bounds.top;
  console.log(`${mx} ${my}`);

  ctx.beginPath();
  ctx.arc(mx, my, 10, 0, 2 * Math.PI);
  ctx.stroke();
});
