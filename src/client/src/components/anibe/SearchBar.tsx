import React from "react";
import Button from "../UI/Button";
import { useState } from "react";
import { Option } from "../../interfaces";
const {ReactSearchAutocomplete} = require("react-search-autocomplete");
type SearchProps = {
  onSearchHandler: (query: string) => void;
  options: Option[];
};
const SearchBar = ({ onSearchHandler, options }: SearchProps) => {
  const [query, setquery] = useState("");
  const onClickHandler = () => {
    onSearchHandler(query);
  };
  const handleOnSearch = (query: string) => {
    setquery(query);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    setquery(item.name)
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const handleForm = (item:any)=>item;
  return (
    <div className="flex w-full h-full flex-row items-center justify-center">
      {/* <input
        onChange={(e) => handleOnSearch(e.target.value)}
        className="border-purple-900 border-solid border-2 m-1 px-2 py-1 rounded-2xl "
      /> */}
      <div className="input-wrapper" >
      <ReactSearchAutocomplete
        items={options}
        showIcon={false}
        onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={handleForm}
      />
      </div>
      <Button
        onClick={onClickHandler}
        className="bg-purple-400 border-purple-500 text-white hover:text-purple-300 rounded-2xl"
      >
        {" "}
        Search{" "}
      </Button>
    </div>
  );
};
export default SearchBar;
