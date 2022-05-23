import { CURRENTBAR, DELAY, SWAPBAR } from "../utils";

export const runBubbleSort = (array: number[], done: () => void) => {
  const animations = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      const animate = {
        current: j,
        next: j + 1,
        type: "compare",
        currentValue: array[j],
        nextValue: array[j + 1],
        iteration: i,
      };
      if (array[j] > array[j + 1]) {
        animate.type = "swap";
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      animations.push(animate);
    }
  }
  runAnimation(animations, array.length, done);
  return array;
};

const runAnimation = (animations: any, length: number, done: () => void) => {
  // let iter = animations[0].iteration;
  // let len = length - 1;
  for (let i = 0; i < animations.length; i++) {
    const { type, next, current, currentValue, nextValue } =
      animations[i];

    // eslint-disable-next-line no-loop-func
    setTimeout(() => {
      const currentBar = document.getElementById(`array-bar-${current}`);
      const swapBar = document.getElementById(`array-bar-${next}`);
      if (currentBar && swapBar) {
        setTimeout(() => {
          currentBar.style.backgroundColor = "";
          swapBar.style.backgroundColor = "";
          //   if (iter !== iteration) {
          //     const last = document.getElementById(`array-bar-${len - iter}`);
          //     if (last) {
          //       last.style.backgroundColor = SORTEDBAR;
          //     }
          //     iter = iteration;
          //   }
          //   if (iter + 1 === len) {
          //     currentBar.style.backgroundColor = SORTEDBAR;
          //     swapBar.style.backgroundColor = SORTEDBAR;
          //   }

          if (i === animations.length - 1) {
            done();
          }
        }, DELAY / 2);

        currentBar.style.backgroundColor = CURRENTBAR;
        swapBar.style.backgroundColor = SWAPBAR;

        if (type === "swap") {
          currentBar.style.height = `${nextValue * 7}px`;
          swapBar.style.height = `${currentValue * 7}px`;
        }
      }
    }, i * DELAY);
  }
};
