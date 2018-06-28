const mainImg = document.getElementsByClassName('b1__img')[0];

window.onscroll = function block1() {
  const top = Math.round(window.pageYOffset * 0.6);
  mainImg.style.top = `${top}px`;
};
