const mainImg = document.getElementsByClassName('b1__img')[0];

window.onscroll = function block1() {
  console.log('scroll', window.pageYOffset);

  const top = Math.round(window.pageYOffset * 0.6);
  console.log(top);
  console.log(mainImg.style.top);

  mainImg.style.top = `${top}px`;
};
