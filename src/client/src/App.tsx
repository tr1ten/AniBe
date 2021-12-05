import SearchBar from "./components/anibe/SearchBar";
import Layout from "./layouts/Layout";
import Logo from "./components/anibe/Logo";
import DisplayResults from "./components/anibe/DisplayResults";
import { Result } from "./interfaces";
import { useState, useEffect } from "react";
const DUMMY_DATA = [
  {
    label: "Attack on titan",
    imgUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_FMjpg_UX1000_.jpg",
    linkUrl:"https://myanimelist.net/anime/16498/Shingeki_no_Kyojin#",
  },
];
function App() {
  const [Results, setResults] = useState<Result[]>(DUMMY_DATA);
  const [options, setoptions] = useState([]);
  const onSearchHandler = async (query: string) => {
    console.log("searching...", query);
    const body = await fetch(
      "http://localhost:3000/search?" +
        new URLSearchParams({
          q: query,
        }).toString()
    ).then((res) => res.json());
    console.log('got res',body.results);
    setResults(body.results);
  };
  useEffect(() => {
    fetch("http://localhost:3000/titles")
      .then((res) => res.json())
      .then((body) => {
        const newOptons = body.results.map((option: any, index: number) => {
          return { name: option._source.title, id: index };
        });
        console.log('new options ',newOptons);
        setoptions(newOptons);
      });
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full">
        <Logo />
        <SearchBar options={options} onSearchHandler={onSearchHandler} />
        <DisplayResults results={Results} />
      </div>
    </Layout>
  );
}

export default App;
