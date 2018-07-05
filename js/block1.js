const mainImg = document.getElementsByClassName('b1__img')[0];

function scrollImg() {
  if (window.pageYOffset > window.innerHeight) {
    return;
  }

  const doc = document.documentElement;
  const top =
    0.6 * ((window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0));

  mainImg.style.transform = `translate(0, ${top}px)`;
}

scrollImg();

window.onscroll = scrollImg;
