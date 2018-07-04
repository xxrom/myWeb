console.log(window.width);
function Background() {
  console.log('test');

  this.myCanvas = document.getElementById('myCanvas');
  console.log(this.myCanvas);

  this.ctx = this.myCanvas.getContext('2d');
  console.log(window.width);

  this.myCanvas.width = window.innerWidth;
  this.myCanvas.height = 200;

  // this.myCanvas.style.border = '1px solid red';

  this.updateTime = 30;
  this.step = 1;

  this.numberItems = 10;
  this.items = [];

  this.generateNewItem = function generateNewItem() {
    return Math.random() > 0.5
      ? {
        x: Math.random() * this.myCanvas.width,
        y: 0
      }
      : {
        x: 0,
        y: Math.random() * this.myCanvas.height
      };
  };

  this.calcDist = function calcDist(one, two) {
    return Math.sqrt(Math.abs((one.x - two.x) * (one.x - two.x)) +
        Math.abs((one.y - two.y) * (one.y - two.y)));
  };

  this.makeLineByTwoPoints = function makeLineByTwoPoints(one, two) {
    this.ctx.moveTo(one.x, one.y);
    this.ctx.lineTo(two.x, two.y);
    this.ctx.stroke();
  };

  this.findNearItems = function findNearItems() {
    this.items.forEach((obj) => {
      this.items.forEach((item) => {
        if (this.calcDist(obj, item) < 70) {
          this.makeLineByTwoPoints(obj, item);
        }
      });
    });
  };

  this.moveItem = function moveItem(index) {
    this.items[index].x += this.step;
    this.items[index].y += this.step;

    if (
      this.items[index].x > this.myCanvas.width ||
      this.items[index].y > this.myCanvas.height
    ) {
      this.items[index] = this.generateNewItem();
    }
  };

  this.run = function run(numberItems) {
    this.numberItems = numberItems;
    for (let i = 0; i < numberItems; i++) {
      this.items.push(this.generateNewItem());
    }

    setInterval(() => {
      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#00f';
      this.items.forEach((item, index) => {
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, 3, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.moveItem(index);
      });

      this.ctx.lineWidth = 0.1;
      this.ctx.strokeStyle = '#000';

      this.findNearItems();
    }, this.updateTime);
  };

  // myCanvas.addEventListener('mousemove', (e) => {
  //   const bounds = myCanvas.getBoundingClientRect();
  //   const mx = e.clientX - bounds.left;
  //   const my = e.clientY - bounds.top;
  //   console.log(`${mx} ${my}`);

  //   ctx.beginPath();
  //   ctx.arc(mx, my, 10, 0, 2 * Math.PI);
  //   ctx.stroke();
  // });
}

const background = new Background();
background.run(30);
