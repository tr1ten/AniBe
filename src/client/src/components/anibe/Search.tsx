import React, { ChangeEvent } from "react";
import Button from "../UI/Button";
import { useState } from "react";
import { DOption } from "../../interfaces";
import AsyncSelect from "react-select/async/";
import Select, { SingleValue } from "react-select";
type SearchProps = {
  onSearchHandler: (query: string, synopsis: string) => void;
  genres: DOption[];
  cgenre: readonly DOption[] | undefined;
  sortBys: DOption[];
  sortBy: DOption;
  onGenreChange: (option: readonly DOption[], actionMeta: any) => void;
  onSortByChange: (option: DOption | null, actionMeta: any) => void;
};
const Search = ({
  onSearchHandler,
  genres,
  cgenre,
  sortBy,
  sortBys,
  onGenreChange,
  onSortByChange,
}: SearchProps) => {
  const CustomStyle = {
    control: (styles: any) => ({ ...styles, minWidth: "8em" }),
  };
  const [synopsis, setsynopsis] = useState("");
  const [query, setquery] = useState("");
  const onSynopsisChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setsynopsis(e.target.value);
  };
  const onClickHandler = () => {
    onSearchHandler(query, synopsis);
  };
  const handleOnSearch = (q: string) => {
    setquery(q);
    // console.log("setting query", q);
  };

  const getAsyncOptions = async (q: string) => {
    const body = await fetch(
      "http://0.0.0.0:3000/autocomplete?" + new URLSearchParams({ q })
    ).then((res) => res.json());
    return body.results.map((title: string) => ({
      label: title,
      value: title,
    }));
  };
  const boundaryClass =
    "w-full border-2 border-solid border-purple-500 focus:border-blue-600 rounded m-1 outline-none ";
  return (
    <div className="flex w-2/3 h-full flex-col items-center justify-center">
      <AsyncSelect
        inputValue={query}
        onChange={(val: SingleValue<DOption>, other: any) =>
          !!val && handleOnSearch(val!.label)
        }
        onInputChange={(newVal, { action }) =>
          !["input-blur", "menu-close"].includes(action) &&
          handleOnSearch(newVal)
        }
        escapeClearsValue={true}
        loadingMessage={() => "Ara ara ~"}
        noOptionsMessage={() => "anime not found :' "}
        placeholder="Attack on titan.."
        cacheOptions
        blurInputOnSelect={false} //set by default, but to be sure
        closeMenuOnSelect={false} //prevents menu close after select, which would also result in input blur    
        defaultOptions
        isClearable
        className={boundaryClass}
        name="search"
        loadOptions={getAsyncOptions}
      />
      <textarea
        value={synopsis}
        onChange={onSynopsisChangeHandler}
        placeholder="Synopsis.."
        rows={4}
        className={boundaryClass + "p-2"}
      />
      <Select
        isMulti={true}
        placeholder="genres (eg. Action,Ecchi)"
        styles={CustomStyle}
        value={cgenre}
        options={genres}
        onChange={onGenreChange}
        className={boundaryClass}
      />
      <div className="flex flex-col sm:flex-row w-full justify-between items-center">
        <Select
          isSearchable={false}
          defaultValue={sortBy}
          onChange={onSortByChange}
          className={boundaryClass + "sm:w-1/4 mx-0"}
          options={sortBys}
        />

        <Button
          onClick={onClickHandler}
          className=" border-purple-500 mx-0 text-purple-600 hover:text-white hover:bg-purple-700 rounded-2xl"
        >
          {" "}
          Search{" "}
        </Button>
      </div>
    </div>
  );
};
export default Search;
