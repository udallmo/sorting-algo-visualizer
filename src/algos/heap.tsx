import { CURRENTBAR, DELAY, SWAPBAR } from "../utils";

let animations: { current: number; swap: number }[] = [];

const runAnimation = (
  animations: { current: number; swap: number }[],
  done: () => void
) => {
  for (let i = 0; i < animations.length; i++) {
    const { current, swap } = animations[i];

    setTimeout(() => {
      const currentBar = document.getElementById(`array-bar-${current}`);
      const swapBar = document.getElementById(`array-bar-${swap}`);

      if (currentBar && swapBar) {
        setTimeout(() => {
          currentBar.style.backgroundColor = "";
          swapBar.style.backgroundColor = "";

          if (i === animations.length - 1) {
            done();
          }
        }, DELAY / 2);

        currentBar.style.backgroundColor = CURRENTBAR;
        swapBar.style.backgroundColor = SWAPBAR;

        const tempHeight = currentBar.style.height;
        currentBar.style.height = swapBar.style.height;
        swapBar.style.height = tempHeight;
      }
    }, i * DELAY);
  }
};

export const runHeapSort = (array: number[], done: () => void) => {
  animations = [];

  const n = array.length;

  // build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(array, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    animations.push({
      current: 0,
      swap: i,
    });
    heapify(array, i, 0);
  }

  runAnimation(animations, done);
  return array;
};

const heapify = (array: number[], n: number, i: number) => {
  let largest = i;

  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && array[l] > array[largest]) {
    largest = l;
  }

  if (r < n && array[r] > array[largest]) {
    largest = r;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    animations.push({
      current: i,
      swap: largest,
    });
    heapify(array, n, largest);
  }
};
