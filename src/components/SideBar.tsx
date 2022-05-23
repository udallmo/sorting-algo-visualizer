import { useEffect, useState } from "react";
import { runSorting } from "../algos";
import {
  generateArray,
  MAX,
  MAX_NUM,
  MIN,
  MIN_NUM,
  OPTIONS,
  OPTIONS_OBJ,
} from "../utils";
import Button from "./Button";

const SideBar = ({
  setArray,
  array,
}: {
  setArray: (value: number[]) => void;
  array: number[];
}) => {
  return (
    <>
      <SideBarOptions setArray={setArray} array={array} />
    </>
  );
};

const SideBarOptions = ({
  setArray,
  array,
}: {
  array: number[];
  setArray: (value: number[]) => void;
}) => {
  const [sliderValue, setSliderValue] = useState(100);
  const [numberValue, setNumberValue] = useState(50);
  const [speed, setSpeed] = useState(250);
  const [isRunning, setIsRunning] = useState(false);
  const [active, setActive] = useState(OPTIONS_OBJ.Selection);

  useEffect(() => {
    setArray(generateArray(numberValue, sliderValue));
  }, [numberValue, sliderValue, setArray]);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-48
  m-0 flex flex-col bg-primary text-white shadow-lg transition-width duration-200 ease-in-out`}
    >
      <div className=" my-2 mx-4">
        <div>
          <Button
            onClick={() => {
              setIsRunning(true);
              runSorting(active, array, speed, setIsRunning);
            }}
            disabled={isRunning}
          >
            Sort
          </Button>

          <Button
            onClick={() => {
              setSliderValue(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
              setNumberValue(
                Math.floor(Math.random() * (MAX_NUM - MIN + 1)) + MIN
              );
            }}
            disabled={isRunning}
          >
            <div className="text-center">
              <span>Generate Random Array</span>
            </div>
          </Button>

          <label
            htmlFor="minmax-range"
            className="block mb-2 text-sm font-medium text-white"
          >
            Speed
          </label>
          <input
            disabled={isRunning}
            id="minmax-range"
            type="range"
            min={0}
            max={500}
            value={speed}
            onChange={(event) => setSpeed(parseInt(event.target.value, 10))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="minmax-range"
            className="block mb-2 text-sm font-medium text-white"
          >
            Array Size
          </label>
          <input
            disabled={isRunning}
            id="minmax-range"
            type="range"
            min={MIN}
            max={MAX}
            value={sliderValue}
            onChange={(event) =>
              setSliderValue(parseInt(event.target.value, 10))
            }
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />

          <label
            htmlFor="minmax-range"
            className="block mb-2 text-sm font-medium text-white"
          >
            Number Variation
          </label>
          <input
            disabled={isRunning}
            id="minmax-range"
            type="range"
            min={MIN_NUM}
            max={MAX_NUM}
            value={numberValue}
            onChange={(event) =>
              setNumberValue(parseInt(event.target.value, 10))
            }
            className="form-range w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>

        <div className={`bg-gray-700 rounded-2xl p-2 mt-2 text-center`}>
          <div className="text-2xl underline cursor-default">
            Sorting Algoirthms
          </div>
          {OPTIONS.map((op) => {
            const isActive = active === op;
            const fcn = !isRunning ? () => setActive(op) : () => {};
            return (
              <div
                key={op}
                onClick={() => fcn()}
                className={`${
                  isRunning
                    ? "cursor-default"
                    : "hover:text-green-600 cursor-pointer"
                } font-medium text-sm p-4 mt-2  ${
                  isActive ? "bg-gray-500 text-green-600 rounded-2xl" : ""
                }`}
              >
                {op.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
export default SideBar;
