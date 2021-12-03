const express = require("express");
const teamRouter = require("./routes/team");
const newsRouter = require("./routes/news");
const FlickrRouter = require("./routes/Flickr");
const helmet = require("helmet");

const app = express();

const hostname = "127.0.0.1";
const port = 3000;
app.use(express.static("public"));
//lists all the teams in html 
app.get("/", (req, res) => {
  const str = `<!DOCTYPE html> 
    <html><head><title> Eastern conference Basketball news and pics mashup </title>
    <link rel="stylesheet" href="/styles.css">
    </head>
    <div class="bg">
    <body class="body"> <h1 class="head">Get news, team information and pics about your favourite NBA teams</h1>

    <p class="p">Please choose your team to start</p>
    <li class="li"><a href="/teams/Atlanta%20Hawks">Atlanta Hawks</a></li>
    <li class="li"><a href="/teams/Boston%20Celtics">Boston Celtics</a></li>
    <li class="li"><a href="/teams/Brooklyn%20Nets">Brooklyn Nets</a></li>
    <li class="li"><a href="/teams/Charlotte%20Hornets">Charlotte Hornets</a></li>
    <li class="li"><a href="/teams/Chicago%20Bulls">Chicago Bulls</a></li>
    <li class="li"><a href="/teams/Cleveland%20Cavaliers">Cleveland Cavaliers</a></li>
    <li class="li"><a href="/teams/Detroit%20Pistons">Detroit Pistons</a></li>
    <li class="li"><a href="/teams/Indiana%20Pacers">Indiana Pacers</a></li>
    <li class="li"><a href="/teams/Miami%20Heat">Miami Heat</a></li>
    <li class="li"><a href="/teams/Milwaukee%20Bucks">Milwaukee Bucks</a></li>
    <li class="li"><a href="/teams/New%20York%20Knicks">New York Knicks </a></li>
    <li class="li"><a href="/teams/Orlando%20Magic">Orlando Magic</a></li>
    <li class="li"><a href="/teams/Philadelphia%2076ers">Philadelphia 76ers</a></li>
    <li class="li"><a href="/teams/Toronto%20Raptors">Toronto Raptors</a></li>
    <li class="li"><a href="/teams/Washington%20Wizards">Washington Wizards</a></li>
    </ul></body></div></html>`;

  
  res.write(str);
  res.end();
});
//routing 
app.use("/teams?", teamRouter.router);
app.use("/news?", newsRouter);
app.use("/Flickr?",FlickrRouter);
app.listen(port, function() {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});
