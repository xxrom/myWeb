const throttleTime = 10;
const mainImg = document.getElementsByClassName('b1__img')[0];
let timeId;

function calcImg() {
  const doc = document.documentElement;
  console.log('mainImg', doc.scrollTop);
  const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

  // const top = Math.round(window.pageYOffset * 0.6);
  mainImg.style.top = `${0.6 * top}px`;

  timeId = undefined;
}

window.onscroll = function scrollImg() {
  if (
    typeof timeId === 'undefined' &&
    window.pageYOffset < window.innerHeight
  ) {
    timeId = setTimeout(calcImg, throttleTime);
  }
};
