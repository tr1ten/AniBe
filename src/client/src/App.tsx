import Search from "./components/anibe/Search";
import Layout from "./layouts/Layout";
import Logo from "./components/anibe/Logo";
import DisplayResults from "./components/anibe/DisplayResults";
import { DOption, Result } from "./interfaces";
import { useState } from "react";
import Footer from "./components/anibe/Footer";
const DUMMY_DATA = [
  {
    label: "Attack on titan",
    imgUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_FMjpg_UX1000_.jpg",
    linkUrl: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin#",
  },
];
const totalGenres = [
  { label: "Adventure", value: "genre:Adventure" },
  { label: "Cars", value: "genre:Cars" },
  { label: "Comedy", value: "genre:Comedy" },
  { label: "Dementia", value: "genre:Dementia" },
  { label: "Demons", value: "genre:Demons" },
  { label: "Drama", value: "genre:Drama" },
  { label: "Ecchi", value: "genre:Ecchi" },
  { label: "Fantasy", value: "genre:Fantasy" },
  { label: "Game", value: "genre:Game" },
  { label: "Harem", value: "genre:Harem" },
  { label: "Hentai", value: "genre:Hentai" },
  { label: "Historical", value: "genre:Historical" },
  { label: "Horror", value: "genre:Horror" },
  { label: "Josei", value: "genre:Josei" },
  { label: "Kids", value: "genre:Kids" },
  { label: "Magic", value: "genre:Magic" },
  { label: "Martial Arts", value: "genre:Martial Arts" },
  { label: "Mecha", value: "genre:Mecha" },
  { label: "Military", value: "genre:Military" },
  { label: "Music", value: "genre:Music" },
  { label: "Mystery", value: "genre:Mystery" },
  { label: "Parody", value: "genre:Parody" },
  { label: "Police", value: "genre:Police" },
  { label: "Psychological", value: "genre:Psychological" },
  { label: "Romance", value: "genre:Romance" },
  { label: "Samurai", value: "genre:Samurai" },
  { label: "School", value: "genre:School" },
  { label: "Sci-Fi", value: "genre:Sci-Fi" },
  { label: "Seinen", value: "genre:Seinen" },
  { label: "Shoujo", value: "genre:Shoujo" },
  { label: "Shoujo Ai", value: "genre:Shoujo Ai" },
  { label: "Shounen", value: "genre:Shounen" },
  { label: "Shounen Ai", value: "genre:Shounen Ai" },
  { label: "Slice of Life", value: "genre:Slice of Life" },
  { label: "Space", value: "genre:Space" },
  { label: "Sports", value: "genre:Sports" },
  { label: "Super Power", value: "genre:Super Power" },
  { label: "Supernatural", value: "genre:Supernatural" },
  { label: "Thriller", value: "genre:Thriller" },
  { label: "Vampire", value: "genre:Vampire" },
  { label: "Yaoi", value: "genre:Yaoi" },
  { label: "Yuri", value: "genre:Yuri" },
  { label: "Action", value: "genre:Action" },
  { label: "Adventure", value: "genre:Adventure" },
  { label: "Cars", value: "genre:Cars" },
  { label: "Comedy", value: "genre:Comedy" },
  { label: "Dementia", value: "genre:Dementia" },
  { label: "Demons", value: "genre:Demons" },
  { label: "Drama", value: "genre:Drama" },
  { label: "Ecchi", value: "genre:Ecchi" },
  { label: "Fantasy", value: "genre:Fantasy" },
  { label: "Game", value: "genre:Game" },
  { label: "Harem", value: "genre:Harem" },
  { label: "Hentai", value: "genre:Hentai" },
  { label: "Historical", value: "genre:Historical" },
  { label: "Horror", value: "genre:Horror" },
  { label: "Josei", value: "genre:Josei" },
  { label: "Kids", value: "genre:Kids" },
  { label: "Magic", value: "genre:Magic" },
  { label: "Martial Arts", value: "genre:Martial Arts" },
  { label: "Mecha", value: "genre:Mecha" },
  { label: "Military", value: "genre:Military" },
  { label: "Music", value: "genre:Music" },
  { label: "Mystery", value: "genre:Mystery" },
  { label: "Parody", value: "genre:Parody" },
  { label: "Police", value: "genre:Police" },
  { label: "Psychological", value: "genre:Psychological" },
  { label: "Romance", value: "genre:Romance" },
  { label: "Samurai", value: "genre:Samurai" },
  { label: "School", value: "genre:School" },
  { label: "Sci-Fi", value: "genre:Sci-Fi" },
  { label: "Seinen", value: "genre:Seinen" },
  { label: "Shoujo", value: "genre:Shoujo" },
  { label: "Shounen", value: "genre:Shounen" },
  { label: "Slice of Life", value: "genre:Slice of Life" },
  { label: "Space", value: "genre:Space" },
  { label: "Sports", value: "genre:Sports" },
  { label: "Super Power", value: "genre:Super Power" },
  { label: "Supernatural", value: "genre:Supernatural" },
  { label: "Thriller", value: "genre:Thriller" },
  { label: "Vampire", value: "genre:Vampire" },
  { label: "Yaoi", value: "genre:Yaoi" },
];
const sortBys = [
  { label: "Relevance", value: "REV" },
  { label: "Popularity", value: "POP" },
  { label: "Ranking", value: "RANK" },
];

function App() {
  const [Results, setResults] = useState<Result[]>(DUMMY_DATA);
  const [genre, setgenre] = useState<readonly DOption[]>();
  const [sortby, setsortby] = useState<DOption>(sortBys[0]);
  const [isLoading, setisLoading] = useState(false);
  const onGenreChange = (option: readonly DOption[]): void => {
    setgenre(option);
  };
  const onSortChange = (option: DOption | null): void => {
    setsortby(option!);
  };

  const onSearchHandler = async (query: string, synopsis: string) => {
    // console.log("searching...", query, synopsis, genre, sortby);
    setisLoading(true)
    const gen = genre
      ? genre.map((option: DOption) => option.value).toString()
      : "";
    const body = await fetch(
      "/api/search?" +
        new URLSearchParams({
          q: query,
          syp: synopsis,
          sortby: sortby.value,
          genres: gen,
        }).toString()
    ).then((res) => res.json());
    // console.log("got res", body.results);
    setResults(body.results);
    setisLoading(false)
  };
  return (
    <Layout>
      <div className="flex py-2 flex-col items-center justify-center w-full">
        <Logo />
        <Search
          sortBys={sortBys}
          onGenreChange={onGenreChange}
          onSortByChange={onSortChange}
          cgenre={genre}
          sortBy={sortby}
          genres={totalGenres}
          onSearchHandler={onSearchHandler}
        />
        <DisplayResults results={Results} isLoading={isLoading}/>
      </div>
      <Footer />
    </Layout>
  );
}

export default App;
