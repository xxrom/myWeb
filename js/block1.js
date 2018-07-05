const throttleTime = 10;
const mainImg = document.getElementsByClassName('b1__img')[0];
let timeId;
const moveStep = 5;

function calcImg() {
  if (window.pageYOffset > window.innerHeight) {
    clearInterval(timeId);
    timeId = undefined;
  }

  const doc = document.documentElement;
  const top =
    0.6 * ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));
  console.log(`top ${top}`);
  let newTop = mainImg.style.top;
  newTop = +newTop.replace('px', '');

  console.log(`begin ${newTop}`);
  console.log('sum ', newTop + moveStep);

  if (newTop + moveStep < top) {
    newTop += moveStep;
    mainImg.style.top = `${newTop}px`;
  } else if (newTop - moveStep > top) {
    newTop -= moveStep;
    mainImg.style.top = `${newTop}px`;
  } else {
    console.log('EXIT');
    clearInterval(timeId);
    timeId = undefined;
  }
}

window.onscroll = function scrollImg() {
  if (
    typeof timeId === 'undefined' &&
    window.pageYOffset < window.innerHeight
  ) {
    timeId = setInterval(calcImg, throttleTime);
  }
};
