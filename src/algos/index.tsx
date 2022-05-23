import { OPTIONS_OBJ, setDelay } from "../utils";
import { runBubbleSort } from "./bubble";
import { runHeapSort } from "./heap";
import { runInsertionSort } from "./insertion";
import { runMergeSort } from "./merge";
import { runQuickSort } from "./quick";
import { runSectionSort } from "./selection";

export const runSorting = (
  type: string,
  array: number[],
  speed: number,
  setIsRunning: (value: boolean) => void
) => {
  // let result = array;
  const done = () => setIsRunning(false);

  setDelay(speed);

  switch (type) {
    case OPTIONS_OBJ.Selection:
      runSectionSort(array, done);
      break;
    case OPTIONS_OBJ.Bubble:
      runBubbleSort(array, done);
      break;
    case OPTIONS_OBJ.Heap:
      runHeapSort(array, done);
      break;
    case OPTIONS_OBJ.Insertion:
      runInsertionSort(array, done);
      break;
    case OPTIONS_OBJ.Merge:
      runMergeSort(array, done);
      break;
    case OPTIONS_OBJ.Quick:
      runQuickSort(array, done);
      break;
    default:
      break;
  }

  // const testArray = array.slice().sort((a, b) => a - b);
  // console.log(compareSorting(testArray, result));
  // setIsRunning(false);
};

// const compareSorting = (test: number[], actual: number[]): boolean => {
//   if (test.length !== actual.length) {
//     return false;
//   }
//   for (let i = 0; i < test.length; i++) {
//     if (actual[i] !== test[i]) {
//       return false;
//     }
//   }
//   return true;
// };
