function promise() {
  return Promise.resolve()
    .then(promise)
}

function nextTick() {
  process.nextTick(nextTick)
}

setTimeout(() => {
  console.log('timeout');
}, 1);
// nextTick();
promise();


console.log('end');
