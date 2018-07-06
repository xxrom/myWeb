const workerBackground = new Worker('./js/workers/background.js');

function Background(numberItems) {
  this.myCanvas = document.getElementById('myCanvas');

  this.Footer = document.getElementsByClassName('footer-text')[0];
  const footerHeight =
    +getComputedStyle(this.Footer).height.replace('px', '') +
    +getComputedStyle(this.Footer).paddingTop.replace('px', '') +
    +getComputedStyle(this.Footer).paddingBottom.replace('px', '');

  this.ctx = this.myCanvas.getContext('2d');

  this.myCanvas.width = window.innerWidth;

  this.myCanvas.height = footerHeight;

  this.updateTime = 60;
  this.step = 0.5;
  this.connectLength = 0.3 * window.innerWidth;

  this.numberItems = numberItems;
  this.items = [];
  this.lines = [];

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

  this.makeLineByTwoPoints = function makeLineByTwoPoints(x1, y1, x2, y2) {
    // this.ctx.moveTo(one.x, one.y);
    // this.ctx.lineTo(two.x, two.y);
    // this.ctx.stroke();
    const linearGradient2 = this.ctx.createLinearGradient(x1, y1, x2, y2);
    linearGradient2.addColorStop(0, 'rgba( 0, 0,   0, 0)');
    // linearGradient2.addColorStop(0.1, 'rgba( 0, 0, 200, 0.1)');
    linearGradient2.addColorStop(0.5, 'rgba(0, 0, 255, 0.15)');
    // linearGradient2.addColorStop(0.9, 'rgba( 0, 0, 200, 0.1)');
    linearGradient2.addColorStop(1, 'rgba( 0, 0, 0, 0)');

    this.ctx.strokeStyle = linearGradient2;
    this.ctx.lineWidth = 0.11;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
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

  this.getFooterHeight = function getFooterHeight() {
    return (
      +getComputedStyle(this.Footer).height.replace('px', '') +
      +getComputedStyle(this.Footer).paddingTop.replace('px', '') +
      +getComputedStyle(this.Footer).paddingBottom.replace('px', '')
    );
  };

  this.run = function run() {
    for (let i = 0; i < this.numberItems; i++) {
      this.items.push(this.generateNewItem(Math.random() * this.myCanvas.height));
    }
    workerBackground.onmessage = (obj) => {
      this.lines = obj.data.lines;
    };

    setInterval(() => {
      workerBackground.postMessage({
        type: 'find',
        payload: {
          items: this.items,
          connectLength: this.connectLength
        }
      });

      this.myCanvas.height = this.getFooterHeight();
      this.myCanvas.width = window.innerWidth;

      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = 'rgba(0,0,255,0.2)';
      this.items.forEach((item, index) => {
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, 1, 0, 2 * Math.PI);
        this.ctx.stroke();

        this.moveItem(index);
      });

      this.ctx.lineWidth = 0.05;
      this.ctx.strokeStyle = 'rgba(0,0,0,0.09)';
      this.lines.forEach(item =>
        this.makeLineByTwoPoints(item.x1, item.y1, item.x2, item.y2));
    }, this.updateTime);
  };
}

const background = new Background(10);
// 50 N*N 300 +-
// 50 1/2*N*N 150 +-
background.run();

// worker.postMessage(items.length);
// worker.onmessage = function ({ data }) {
//   wrapper.style.transform = `translate(-${data}%)`;
// };
