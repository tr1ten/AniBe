import { ReactNode } from "react";
import ElementCard from "./ElementCard";
import { Result } from "../../interfaces/index";
import ReactLoading from "react-loading";

type DisplayResultsProps = {
  children?: ReactNode;
  results: Result[];
  isLoading:boolean,
};
const DisplayResults = ({ results, children,isLoading }: DisplayResultsProps) => {
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
    <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-stretch w-full">
      {isLoading ? <ReactLoading type="cylon"  color="#8B5CF6" />   : results.length === 0 ? (
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
