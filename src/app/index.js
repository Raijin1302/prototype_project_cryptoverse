const request = require("request");

const options = {
  method: "GET",
  url: "https://coinranking1.p.rapidapi.com/stats",
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "20e59a1fbamshe3ccadeeeb636fcp1cea81jsn0fe0a70fe059",
    useQueryString: true,
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
