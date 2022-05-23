import { CURRENTBAR, DELAY, SWAPBAR } from "../utils";

export const runInsertionSort = (array: number[], done: () => void) => {
  const animations = [];
  for (let i = 1; i < array.length; i++) {
    // iterate from 1 to N of the array
    // compare the current element key to the previous element
    // if the key is less than the previous element
    // swap key until it is correctly sorted
    const key = array[i];
    // End of the sorted part
    let j = i - 1;
    while (j >= 0 && key < array[j]) {
      animations.push({
        current: j,
        swap: j + 1,
      });
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = key;
  }

  runAnimation(animations, array, done);
  return array;
};

const runAnimation = (animations: any, array: number[], done: () => void) => {
  for (let i = 0; i < animations.length; i++) {
    const { current, swap } = animations[i];

    setTimeout(() => {
      const currentBar = document.getElementById(`array-bar-${current}`);
      const swapBar = document.getElementById(`array-bar-${swap}`);

      if (currentBar && swapBar) {
        setTimeout(() => {
          currentBar.style.backgroundColor = "";
          swapBar.style.backgroundColor = "";
          if (i === array.length - 1) {
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
