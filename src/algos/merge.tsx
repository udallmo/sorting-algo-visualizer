import { CURRENTBAR, DELAY, SWAPBAR } from "../utils";

let animations: { current: number; swap: number }[] = [];

let indexMap: { [key: string]: { value: number; index: number } } = {};

export const runMergeSort = (array: number[], done: () => void) => {
  animations = [];
  for (let member in indexMap) {
    delete indexMap[member];
  }
  // if r > l
  //  find the middle point to divide: m = l + (r-l)/2
  // call mergeSort first half mergeSort(arr, l, m)
  // call mergeSort second half mergeSort(arr, m+1, r)
  // merge(arr, l, m, r)
  const indexes = array.map((_, index) => index);
  const seen: { [v: string]: number } = {};
  indexMap = indexes.reduce((o, k, i) => {
    if (seen[array[i].toString()] > -1) {
      seen[array[i]]++;
    } else {
      seen[array[i]] = 0;
    }

    return {
      ...o,
      [`${array[i]}-${seen[array[i]]}`]: { value: array[i], index: k },
    };
  }, {});
  mergeSort(array, Object.keys(indexMap));
  runAnimation(animations, done);
  return array;
};

const swap = (array: number[] | string[], i: number, j: number) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const runAnimation = (animations: any, done: () => void) => {
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

const merge = (
  left: number[],
  right: number[],
  leftIds: string[],
  rightIds: string[]
): number[] => {
  let arr: number[] = [];
  while (left.length && right.length) {
    let shiftValue = left[0] < right[0] ? left.shift() : right.shift();

    if (shiftValue) {
      arr.push(shiftValue);
    }
  }

  getSwaps([
    ...leftIds.sort((a, b) => indexMap[a].index - indexMap[b].index),
    ...rightIds.sort((a, b) => indexMap[a].index - indexMap[b].index),
  ]);

  return [...arr, ...left, ...right];
};

const getSwaps = (oldOrder: string[]) => {
  const values = oldOrder.map((id) => indexMap[id]?.value);
  const swaps = [];
  const min = Math.min(...oldOrder.map((id) => indexMap[id]?.index));
  for (let i = 1; i < values.length; i++) {
    const key = values[i];
    let j = i - 1;
    while (j >= 0 && key < values[j]) {
      swaps.push({
        currentId: j,
        swapId: j + 1,
        min,
      });
      values[j + 1] = values[j];
      j--;
    }
    values[j + 1] = key;
  }

  for (const animate of swaps) {
    const { currentId, swapId, min } = animate;
    swap(oldOrder, currentId, swapId);
    animations.push({ current: min + currentId, swap: min + swapId });
  }

  for (let i = 0; i < oldOrder.length; i++) {
    indexMap[oldOrder[i]].index = i + min;
  }
};

const mergeSort = (array: number[], indexes: string[]): number[] => {
  const mid = Math.floor(array.length / 2);
  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, mid);
  const leftIds = indexes.slice().splice(0, mid);
  const rightIds = indexes.slice().splice(mid, array.length);
  return merge(
    mergeSort(left, leftIds),
    mergeSort(array, rightIds),
    leftIds,
    rightIds
  );
};
