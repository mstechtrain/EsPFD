function setTicks(start, end, step) {
  const arrayLength = Math.floor((end - start) / step) + 1;
  const range = [...Array(arrayLength).keys()].map((x) => x * step + start);
  return range;
}

const ticks = {
  airSpeedTicks: setTicks(30, 280, 10),
  altFeetTicks: setTicks(-2000, 40000, 500),
};

export { ticks };
