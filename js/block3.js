const items = document.getElementsByClassName('b3__item');

const wrapper = document.getElementsByClassName('b3__wrapper-items')[0];

let i = 0;

setInterval(() => {
  i += 1;
  if (i > items.length - 4) {
    i = 0;
  }
  wrapper.style.transform = `translate(-${i * 25}%)`;
}, 3000);
