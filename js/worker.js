self.onmessage = function (e) {
  console.log('worker message', e.data);
  self.postMessage('From worker!!!');
};
