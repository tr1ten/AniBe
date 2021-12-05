const express = require("express");
const path = require("path");
const cors = require("cors");
const elastic = require("elasticsearch");
const redis = require("redis");
// redis setup
const rclient = redis.createClient({
  host: "localhost",
  port: 6379,
});
rclient.on("error", (err) => {
  console.log("Error in redis > " + err);
});
rclient.connect().then(()=>console.log('connectef to redis !'))
// elastic-search setup
const client = new elastic.Client({
  hosts: ["http://localhost:9200"],
});
client.ping(
  {
    requestTimeout: 3000,
  },
  (err) => console.log("Working Elastic-Search : ", !err)
);

const app = express();
const port = 3000;
app.use(cors());

const DUMMY_DATA = [
  {
    label: "Attack on titan",
    imgUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY5ODk1NzUyMl5BMl5BanBnXkFtZTgwMjUyNzEyMTE@._V1_FMjpg_UX1000_.jpg",
  },
];
app.get("/titles", async (req, res) => {
  const response = await client.search({
    size:10000,
    index: "mal",
    _source: ["title"],
    body: {
      query: {
        match_all: {},
      },
    },
  });
  console.log('total titles found',response.hits.hits.length)
  return res.send({
    results: response.hits.hits,
  });
});
app.get("/search", async (req, res) => {
  const response = await client.search({
    index: "mal",
    _source: ["title", "uid","link"],
    body: {
      query: {
        match: {
          title: req.query.q,
        },
      },
    },
  });
  const results = [];
  const ress = [...new Map(response.hits.hits.map(v => [v._source.uid, v])).values()]
  const uids = ress.map((hit) => {
    return hit._source.uid;
  });
  for (let index = 0; index < uids.length; index++) {
    let imgUrl;
    try {
      imgUrl = await rclient.get(`${uids[index]}`)
      if(!imgUrl){
        imgUrl = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
      }
    } catch (error) {
      imgUrl = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
    }
    const result = {
      label: ress[index]._source.title,
      imgUrl,
      linkUrl:ress[index]._source.link,

    }
    results.push(result);

  }

  return res.send({
    results,
  });
});
app.get("/", (req, res) => {
  res.send({
    Working: "Nice",
  });
});
app.get("/dummy", (req, res) => {
  res.send({
    results: DUMMY_DATA,
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}`));
