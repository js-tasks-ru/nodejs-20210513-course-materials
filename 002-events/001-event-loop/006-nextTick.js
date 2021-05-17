setTimeout(() => {
  console.log('setTimeout'); // 3/4
}, 0);

setImmediate(() => {
  console.log('setImmediate'); // 3/4
});

queueMicrotask(() => {
  console.log('queueMicrotask'); //2
});

// setTimeout(() => {
// }, 0)
process.nextTick(() => {
  console.log('nextTick'); // 1
});

/**
 * stack: [main]
 *
 * nextTick: [nextTick]
 * micro: [microtask]
 *
 * timer: [timer]
 * immediate: [immediate]
 *
 */

