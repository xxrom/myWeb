const workerBackground = new Worker('./js/workers/background.js');

function Background(numberItems) {
  this.myCanvas = document.getElementById('myCanvas');
  [this.Footer] = document.getElementsByClassName('footer-text');

  this.ctx = this.myCanvas.getContext('2d');

  this.myCanvas.width = window.innerWidth;
  this.myCanvas.height = getFooterHeight.call(this);

  this.updateTime = 30;
  this.step = 0.2;
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
    const linearGradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    linearGradient.addColorStop(0, 'rgba( 0, 0,   0, 0)');
    linearGradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.7)');
    linearGradient.addColorStop(1, 'rgba( 0, 0, 0, 0)');

    this.ctx.strokeStyle = linearGradient;
    this.ctx.lineWidth = 0.11;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  };

  function getFooterHeight() {
    return (
      +getComputedStyle(this.Footer).height.replace('px', '') +
      +getComputedStyle(this.Footer).paddingTop.replace('px', '') +
      +getComputedStyle(this.Footer).paddingBottom.replace('px', '')
    );
  }
  this.getFooterHeight = getFooterHeight;

  this.run = function run() {
    for (let i = 0; i < this.numberItems; i += 1) {
      this.items.push(this.generateNewItem(Math.random() * this.myCanvas.height));
    }
    // for mouse cursor new Item
    this.items.push({
      x: 10,
      y: 10
    });
    workerBackground.onmessage = (obj) => {
      this.lines = obj.data.lines;
      this.items = obj.data.items;
    };

    this.myCanvas.onmousemove = (event) => {
      console.log(event.pageX);
      console.log(event.pageY);
      console.log(event.clientX);
      console.log(event.clientY);
      const rect = this.myCanvas.getBoundingClientRect();
      console.log(rect.top);
      console.log(`len ${this.items.length}`);
      this.items[this.items.length - 1] = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    setInterval(() => {
      workerBackground.postMessage({
        type: 'find',
        payload: {
          items: this.items,
          connectLength: this.connectLength,
          canvasHeight: this.myCanvas.height,
          canvasWidth: this.myCanvas.width,
          step: this.step,
          numberItems: this.numberItems
        }
      });

      this.myCanvas.height = this.getFooterHeight();
      this.myCanvas.width = window.innerWidth;

      this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);

      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = 'rgba(255,0,0,0.6)';
      this.items.forEach((item) => {
        this.ctx.beginPath();
        this.ctx.arc(item.x, item.y, 1, 0, 2 * Math.PI);
        this.ctx.stroke();
      });

      this.lines.forEach(item =>
        this.makeLineByTwoPoints(item.x1, item.y1, item.x2, item.y2));
    }, this.updateTime);
  };
}

const background = new Background(10);
// time ms
// 50 N*N 300 +-
// 50 1/2*N*N 150 +-
background.run();
