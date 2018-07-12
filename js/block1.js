const mainImg = document.getElementsByClassName('b1__img')[0];
const block = document.getElementsByClassName('block1')[0];

block.style.height = `${window.innerHeight}px`;

let currentHeight = getComputedStyle(block).height.replace('px', '');

function scrollImg() {
  if (window.pageYOffset > currentHeight) {
    mainImg.style.display = 'none';
    return; // выходим, блок не видно
  }
  mainImg.style.display = 'block';

  parallax(mainImg, 0.5);
}

function resizeWindow() {
  currentHeight = getComputedStyle(block).height.replace('px', '');
  changeHeight(block, 0.4, currentHeight, window.innerHeight);
}

function parallax(item, coefficient) {
  const doc = document.documentElement;
  const top =
    coefficient *
    ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));

  item.style.transform = `translate(0, ${top}px)`;
}

function changeHeight(item, coefficient, current, maxHeight) {
  if (Math.abs(current - maxHeight) > coefficient * current) {
    block.style.height = `${maxHeight}px`;
  }
}

scrollImg();

window.onscroll = scrollImg;
window.onresize = resizeWindow;
