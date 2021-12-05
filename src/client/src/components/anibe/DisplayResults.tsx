import { ReactNode } from "react";
import ElementCard from "./ElementCard";
import { Result } from "../../interfaces/index";

type DisplayResultsProps = {
  children?: ReactNode;
  results: Result[];
};
const DisplayResults = ({ results, children }: DisplayResultsProps) => {
  function guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  return (
    <div className="flex flex-row flex-wrap justify-center items-center w-full">
      {results.length === 0 ? (
        <p className="text-center text-lg"> No result found! </p>
      ) : (
        results.map((anime: Result, index: number) => {
          return <ElementCard key={guidGenerator()} {...anime} />;
        })
      )}
    </div>
  );
};
export default DisplayResults;
