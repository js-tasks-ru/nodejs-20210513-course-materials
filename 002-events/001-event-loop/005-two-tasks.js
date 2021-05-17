setTimeout(() => {
  console.log('setTimeout-1'); // 1
  Promise.resolve().then(
    () => {
      console.log('then-1'); // 2
    }
  );
}, 0);

setTimeout(() => {
  console.log('setTimeout-2'); // 3
  queueMicrotask(() => {
    console.log('queueMicrotask-2'); // 4
  });
}, 0);

/**
 * stack: []
 *
 * micro: []
 * timers: []
 *
 */

// setTimeout(() => {
//   setTimeout(() => {}, 100)
//   // sync 200 ms
// }, 0)
