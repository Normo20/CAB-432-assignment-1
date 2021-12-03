const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
var teamObj = require("./team");

const teamNewsData = teamObj.teamNewsData;


router.use(logger("tiny"));

router.get("/Team", (req, res) => {
  res.set("content-type", "text/html");
  //Construct url for Team news 
  const url = `https://newsapi.org/v2/everything?qInTitle=${teamNewsData.name}&apiKey=29dfee2c13a944d7aee19f40dcd03b57&language=en`;

  console.log(url);
  //This is request gets team news
  axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      // console.log(rsp);
      const x = createNewsPage(rsp);
      res.write(x, function(err) {
        res.end();
      });
    })
    .catch(error => {
      console.error(error);
    });
});

router.get("/stadium", (req, res) => {
  res.set("content-type", "text/html");
  //making sure the stadium name has no spaces othwerwise url fails
  var re=teamNewsData.stadium.split(" ");
 var final=re.join();
 var op2 = final.replace(',','%20');
 var op3 = op2.replace(',','%20');
 

  //Construct url for stadium news
  const url = `https://newsapi.org/v2/everything?qInTitle=${teamNewsData.stadium}&apiKey=29dfee2c13a944d7aee19f40dcd03b57&language=en`;

  //console.log(url);
  
  //This is request gets trending Stadium news
  axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      const x = createNewsPage(rsp);
      res.write(x, function(err) {
        res.end();
      });
    })
    .catch(error => {
      console.error(error);
    });
});

function createNewsPage(rsp) {
  let newsHeadlines = "";
  for (let i = 0; i < rsp.articles.length; i++) {
    newsHeadlines += `<h2 class="newsHead">${rsp.articles[i].title}</h2>
    <h2><i>${rsp.articles[i].description}</i></h2>
    <p>${rsp.articles[i].publishedAt}</p>
    <a href=  ${rsp.articles[i].url}>  ${rsp.articles[i].url}</a>
    <img src=${rsp.articles[i].urlToImage}>`;
  }
  const str = `<!DOCTYPE html>
  <html><head><title>News Page</title>
  <link rel="stylesheet" href="/styles.css"></head>
  <h1><b>Welcome to the news page<h1></b>
  <body class="team">
  ${newsHeadlines}
  </body></html>`;

  return str;
}

module.exports = router;
