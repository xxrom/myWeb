console.log(window.width);
function Background() {
  console.log('test');

  this.myCanvas = document.getElementById('myCanvas');
  console.log(this.myCanvas);

  const Footer = document.getElementsByClassName('footer-text')[0];
  console.log(Footer.offsetHeight);
  console.log(getComputedStyle(Footer).height.replace('px', ''));
  console.log(getComputedStyle(Footer).paddingTop.replace('px', ''));
  console.log(getComputedStyle(Footer).paddingBottom.replace('px', ''));

  const footerHeight =
    +getComputedStyle(Footer).height.replace('px', '') +
    +getComputedStyle(Footer).paddingTop.replace('px', '') +
    +getComputedStyle(Footer).paddingBottom.replace('px', '');
  console.log(footerHeight);

  this.ctx = this.myCanvas.getContext('2d');

  this.myCanvas.width = window.innerWidth;

  this.myCanvas.height = footerHeight;

  // this.myCanvas.style.border = '1px solid red';

  this.updateTime = 60;
  this.step = 1;
  this.connectLength = 0.2 * window.innerWidth;

  this.numberItems = 10;
  this.items = [];

  this.generateNewItem = function generateNewItem(randomParam = 0) {
    return Math.random() > this.myCanvas.height / this.myCanvas.width
      ? {
        x: Math.random() * this.myCanvas.width,
        y: randomParam
      }
      : {
        x: randomParam,
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
        if (this.calcDist(obj, item) < this.connectLength) {
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
      this.items.push(this.generateNewItem(Math.random() * this.myCanvas.height));
    }

    setInterval(() => {
      this.myCanvas.width = window.innerWidth;

      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = 'rgba(0,0,255,0.3)';
      this.items.forEach((item, index) => {
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, 1, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.moveItem(index);
      });

      this.ctx.lineWidth = 0.05;
      this.ctx.strokeStyle = 'rgba(0,0,0,0.08)';

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
