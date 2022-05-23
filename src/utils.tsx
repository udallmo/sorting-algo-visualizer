export const MIN = 15;
export const MIN_NUM = 10;
export const MAX = 200;
export const MAX_NUM = 135;
export let DELAY = 200;
const SPEED = 500;
export const CURRENTBAR = "#34d198";
export const SWAPBAR = "#d19d34";
export const SORTEDBAR = "#8756db";
export const COMPAREBAR = "#6d35cc";

export const OPTIONS = [
  "Selection sort",
  "Bubble sort",
  "Insertion sort",
  "Merge sort",
  "Quick sort",
  "Heap sort",
];

export const OPTIONS_OBJ = {
  Selection: "Selection sort",
  Bubble: "Bubble sort",
  Insertion: "Insertion sort",
  Merge: "Merge sort",
  Quick: "Quick sort",
  Heap: "Heap sort",
};

export const generateArray = (max: number, size: number) => {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * (max - MIN + 1)) + MIN);
  }

  return array;
};

export const setDelay = (input: number) => (DELAY = SPEED - input);
