import { COMPAREBAR, CURRENTBAR, DELAY, SWAPBAR } from "../utils";

let animations: {
  current: number;
  swap: number;
  type: string;
}[] = [];

export const runQuickSort = (array: number[], done: () => void): number[] => {
  animations = [];
  quickSort(array, 0, array.length - 1);
  runAnimation(animations, done);
  return array;
};

const runAnimation = (animations: any, done: () => void) => {
  for (let i = 0; i < animations.length; i++) {
    const { current, swap, type } = animations[i];

    setTimeout(() => {
      const currentBar = document.getElementById(`array-bar-${current}`);
      const swapBar = document.getElementById(`array-bar-${swap}`);

      if (currentBar && swapBar) {
        if (type === "swap") {
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
        } else {
          setTimeout(() => {
            currentBar.style.backgroundColor = "";
            swapBar.style.backgroundColor = "";
          }, DELAY / 2);

          currentBar.style.backgroundColor = COMPAREBAR;
          swapBar.style.backgroundColor = COMPAREBAR;
        }
      }
    }, i * DELAY);
  }
};

const partition = (array: number[], start: number, end: number): number => {
  // Taking the last element as the pivot
  const pivotValue = array[end];
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    // animations.push({
    //   current: pivotIndex,
    //   swap: end,
    //   type: "compare",
    // });

    if (array[i] < pivotValue) {
      // Swapping elements
      animations.push({
        current: i,
        swap: pivotIndex,
        type: "swap",
      });
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      // Moving to next element
      pivotIndex++;
    }
  }

  // Putting the pivot value in the middle
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  animations.push({
    current: pivotIndex,
    swap: end,
    type: "swap",
  });
  return pivotIndex;
};

const quickSort = (array: number[], start: number, end: number) => {
  // Base case or terminating case
  if (start >= end) {
    return;
  }

  // Returns pivotIndex
  let index = partition(array, start, end);

  // Recursively apply the same logic to the left and right subarrays
  quickSort(array, start, index - 1);
  quickSort(array, index + 1, end);
};
