const express = require("express");
const path = require("path");
const cors = require("cors");
const elastic = require("elasticsearch");
const redis = require("redis");
require("dotenv").config();
// configs

const es_url = `https://${process.env.ELASTIC_USERNAME}:${process.env.ELASTIC_PASSWORD}@${process.env.ELASTIC_HOSTNAME}`;
url = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOSTNAME}:${process.env.REDIS_PORT}`;

// redis setup

const rclient = redis.createClient({url});
rclient.on("error", (err) => {
  console.log("Error in redis > " + err);
});
rclient.connect().then(() => console.log("connected to redis !"));
// elastic-search setup
const client = new elastic.Client({
  hosts: [es_url],
  ssl: { rejectUnauthorized: false, pfx: [] },
});
client.ping(
  {
    requestTimeout: 9000,
  },
  (err) => console.log("Working Elastic-Search : ", !err)
);

// maeat 

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const sortBys = {
  REV: {
    _score: {
      order: "desc",
    },
  },
  POP: {
    popularity: {
      order: "asc",
    },
  },
  RANK: {
    score: {
      order: "desc",
    },
  },
};
app.get("/autocomplete", async (req, res) => {
  const response = await client.search({
    size: 5,
    index: "mal",
    _source: ["title"],
    body: {
      query: {
        match: {
          title: req.query.q,
        },
      },
    },
  });
  return res.send({
    results: response.hits.hits.map((hit) => hit._source.title),
  });
});
app.get("/search", async (req, res) => {
  const { genres, sortby, q, syp } = req.query;
  const query = {
    index: "mal",
    size:50,
    _source: ["title", "uid", "link"],
    body: {
      sort: sortBys[sortby],
      query: {
        bool: {
          should: [
            { match: { title: q } },
            { match: { synopsis: syp } },
            {
              query_string: {
                query: genres.replaceAll(",", " AND "),
              },
            },
          ],
        },
      },
    },
  };
  // console.log('here query',JSON.stringify(query))
  const response = await client.search(query);
  console.log('got results from elastic search')
  const results = [];
  const ress = [
    ...new Map(response.hits.hits.map((v) => [v._source.uid, v])).values(),
  ];
  const uids = ress.map((hit) => {
    return hit._source.uid;
  });
  for (let index = 0; index < uids.length; index++) {
    let imgUrl;
    try {
      imgUrl = await rclient.get(`${uids[index]}`);
      if (!imgUrl) {
        imgUrl =
          "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
      }
    } catch (error) {
      imgUrl =
        "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
    }
    const result = {
      label: ress[index]._source.title,
      imgUrl,
      linkUrl: ress[index]._source.link,
    };
    results.push(result);
  }
  console.log('sending data now!')
  return res.send({
    results,
  });
});
app.get("/", (req, res) => {
  res.status(200).send({
    working: "Nice",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
