async function runner<T>(cb: () => T, ms: number, close = true) {
  let timer: ReturnType<typeof setInterval>;
  if (!close) {
    console.log("Closed");
    return () => clearInterval(timer);
  }
  timer = await setInterval(() => {
    return cb();
  }, ms);
}

runner(() => {
  console.log("Yes");
}, 1000).catch(console.log);

function range(start: number, end: number, step: number = 1) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        start = start + step;
        return { value: start, done: false };
      }
      return { value: end, done: true };
    },
  };
}

console.log(...range(0, 100, 5));
