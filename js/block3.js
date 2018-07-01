const items = document.getElementsByClassName('b3__item');

const wrapper = document.getElementsByClassName('b3__wrapper-items')[0];

let i = 0;
const visibleItems = 4;

setInterval(() => {
  i += 1;
  if (i > items.length - visibleItems) {
    i = 0;
  }
  wrapper.style.transform = `translate(-${i * (100 / visibleItems)}%)`;
}, 3000);
