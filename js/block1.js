const throttleTime = 30;
const mainImg = document.getElementsByClassName('b1__img')[0];
let timeId;
// let top;

function calcImg() {
  const top = Math.round(window.pageYOffset * 0.6);
  mainImg.style.top = `${top}px`;

  timeId = undefined;
}

window.onscroll = function scrollImg() {
  console.log('scroll', timeId);
  // console.log(window.pageYOffset);
  // console.log(window.innerHeight);
  if (
    typeof timeId === 'undefined' &&
    window.pageYOffset < window.innerHeight
  ) {
    timeId = setTimeout(calcImg, throttleTime);
  }
};
