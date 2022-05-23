import { useState } from "react";
import SideBar from "./components/SideBar";
import { generateArray, MIN } from "./utils";

function App() {
  const [array, setArray] = useState<number[]>(generateArray(MIN, MIN));
  return (
    <>
      <div className="flex items-center justify-center h-screen ml-44 bg-slate-700">
        <div className="text-center flex bottom-0">
          {array.map((e, index) => {
            const height2 = e * 7;
            return (
              <div
                id={`array-bar-${index}`}
                className="bg-blue-400 p-0.5 m-0.5 rounded-3xl"
                style={{ height: `${height2}px` }}
                key={`${e}-${index}`}
              ></div>
            );
          })}
        </div>
      </div>
      <SideBar setArray={setArray} array={array} />
    </>
  );
}

export default App;
