const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
router.use(logger("tiny"));
//Stores team info
const teamNewsData = {
  id: null,
  name: null,
  stadium: null,
  manager: null,
  players: [],
  selectedPlayer: null
};
// Stores response from each get request
const getResponse = {
  first: null,
  second: null
};
router.get("/:team", (req, res) => {
  res.set("content-type", "text/html");
  const options = createSportsDBObj(req.params.team);
  //Construct url
  
  const url = `https://www.${options.hostname}${options.path}${options.lookup}${options.id}`;
  //console.log(url);
  //Begin the request
  // Gets basic team information
  axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .then(rsp => {
      //console.log(rsp);
       const s = addtoPage(rsp);
      getResponse.first = rsp;
    
       res.write(s);
       res.end();
      return getResponse.first;
    })
    .catch(error => {
      console.error(error);
    });
  
});

function createSportsDBObj(query) {
  //example url 
  //https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=Arsenal
  const sportsDBObj = {
    hostname: "thesportsdb.com/api/",
    path: "v1/json/1/",
    lookup: "searchteams.php?t=",
    id: "_"
  };
  

  // detect the team name and make sure it's ok for api
  if (query == "Atlanta Hawks") {
    sportsDBObj.id = "Atlanta%20Hawks";
  } else if (query == "Boston Celtics") {
    sportsDBObj.id = "Boston%20Celtics";
  } else if (query == "Brooklyn Nets") {
    sportsDBObj.id = "Brooklyn%20Nets";
  } else if (query == "Charlotte Hornets") {
    sportsDBObj.id = "Charlotte%20Hornets";
  } else if (query == "Chicago Bulls") {
    sportsDBObj.id = "Chicago%20Bulls";
  } else if (query == "Cleveland Cavaliers") {
    sportsDBObj.id = "Cleveland%20Cavaliers";
  } else if (query == "Detroit Pistons") {
    sportsDBObj.id = "Detroit%20Pistons";
  } else if (query == "Indiana Pacers") {
    sportsDBObj.id = "Indiana%20Pacers";
  } else if (query == "Miami Heat") {
    sportsDBObj.id = "Miami%20Heat";
  } else if (query == "Milwaukee Bucks") {
    sportsDBObj.id = "Milwaukee%20Bucks";
  } else if (query == "New York Knicks") {
    sportsDBObj.id = "New%20York%20Knicks";
  } else if (query == "Orlando Magic") {
    sportsDBObj.id = "Orlando%20Magic";
  } else if (query == "Philadelphia 76ers") {
    sportsDBObj.id = "Philadelphia%2076ers";
  } else if (query == "Toronto Raptors") {
    sportsDBObj.id = "Toronto%20Raptors";
  } else if (query == "Washington Wizards") {
    sportsDBObj.id = "Washington%20Wizards";
  } else {
    sportsDBObj.id = "Washington%20Wizards";
  }
  return sportsDBObj;
  console.log(sportsDBObj.id);
}
// creates a page containing team basic info
function addtoPage(first, second) {
  //Saving the team name from the api
  teamNewsData.name = first.teams[0].strTeam;
  //Saving the stadium from api
  teamNewsData.stadium = first.teams[0].strStadium;

  

  //Generating string for team page
  const str = `<!DOCTYPE html>
    <html>
    
    <head><title>Sports DB</title>
    <link rel="stylesheet" href="/styles.css">
    </head>
    <body class="team">


    <h1 class="title">${first.teams[0].strTeam}</h1>
    <img class="badge" src= ${first.teams[0].strTeamBadge} >
    <img class="kit" src= ${first.teams[0].strTeamJersey} >
    <p class="text">${first.teams[0].strDescriptionEN}</p> 
    <li>Stadium Name: ${first.teams[0].strStadium}</li>
   
    <img src= ${first.teams[0].strStadiumThumb} >
    </br>
    <li class="team"><a href="../news/Team">Click here to get Team news</a></li>
    <li class="team"><a href="../news/stadium">Click here to get stadium news</a></li>
    <li class="team"><a href="../Flickr/Team">Click here to get Team pictures</a></li>
    <li class="team"><a href="../Flickr/stadium">Click here to get stadium pictures</a></li>

  
  
    </body></html>`;
  return str;
}

module.exports = {
  router: router,
  teamNewsData: teamNewsData
};