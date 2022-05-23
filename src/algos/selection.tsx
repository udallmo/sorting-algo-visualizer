import { CURRENTBAR, DELAY, SWAPBAR } from "../utils";

export const runSectionSort = (array: number[], done: () => void) => {
  // Sectection: pick the smallest element in the array
  // Swapping: bring value to starting point
  // Shift: increase the counter
  for (let counter = 0; counter < array.length; counter++) {
    let minIndex = counter;

    for (let i = counter + 1; i < array.length; i++) {
      if (array[i] < array[minIndex]) {
        minIndex = i;
      }
    }
    const temp = array[counter];
    array[counter] = array[minIndex];
    array[minIndex] = temp;

    setTimeout(() => {
      const currentBar = document.getElementById(`array-bar-${counter}`);
      const swapBar = document.getElementById(`array-bar-${minIndex}`);

      if (currentBar && swapBar) {
        setTimeout(() => {
          currentBar.style.backgroundColor = "";
          if (counter !== minIndex) {
            swapBar.style.backgroundColor = "";
          }

          if (counter === array.length - 1) {
            done();
          }
          //   currentBar.style.backgroundColor = SORTEDBAR;
        }, DELAY / 2);
        currentBar.style.backgroundColor = CURRENTBAR;

        if (counter !== minIndex) {
          swapBar.style.backgroundColor = SWAPBAR;
        }

        currentBar.style.height = `${array[counter] * 7}px`;
        swapBar.style.height = `${temp * 7}px`;
      }
    }, counter * DELAY);
  }
  return array;
};
