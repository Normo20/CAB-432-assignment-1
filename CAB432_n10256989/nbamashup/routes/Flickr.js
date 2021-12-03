const express = require("express");
const https = require("https");
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");
var teamObj = require("./team");

const teamNewsData = teamObj.teamNewsData;
// console.log(teamNewsData);
router.use(logger("tiny"));
router.get("/Team", (req, res) => {
    res.set("content-type", "text/html");





    //Construct url for Team Pictures
    const url = `https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key=b3bf75c8bba1d65dde9710148a0456cc&tags=${teamNewsData.name}&per-page=50&format=json&media=photos&nojsoncallback=1`;
  
    //runs initialising stuff for flickr
    const options = createFlickrOptions(req.params.query,req.params.number);
 const flickReq = https.request(options, (flickRes) => {
 let body = [];
 flickRes.on('data',function(chunk) {
 body.push(chunk);
 });
 flickRes.on('end', function() {
 res.writeHead(flickRes.statusCode,{'content-type':
'text/html'});
 const bodyString = body.join('');
 const rsp = JSON.parse(bodyString);
 const s = createPage('Flickr Photo Search',rsp);
 res.write(s);
 res.end();
 });
 });
 flickReq.on('error', (e) => {
 console.error(e);
 });
 flickReq.end();
});
//creates object to hold flickr url
const flickr = {
 method: 'flickr.photos.search',
 api_key: "12fd08e2c1681306306696a917793803",
 format: "json",
 media: "photos",
 nojsoncallback: 1
};
function createFlickrOptions(query,number) {
 const options = {
 hostname: 'api.flickr.com',
 port: 443,
 path: '/services/rest/?',
 method: 'GET'
 }
 //makes sure the team name has no spaces and replaces them with %20 as to not break flickr api 
 var re1=teamNewsData.name.split(" ");
 console.log(re1);
 var final1=re1.join();
 console.log(final1);
 var op = final1.replace(',','%20');
 console.log(op);
 const str = 'method=' + flickr.method +
 '&api_key=' + flickr.api_key +
 '&tags=' + op +
 '&per_page=' + 100 +
 '&format=' + flickr.format +
 '&media=' + flickr.media +
 '&nojsoncallback=' + flickr.nojsoncallback;
 options.path += str;
 return options;
}
//Various font sizes used to fit URL on screen
function parsePhotoRsp(rsp) {
 let s = "";
 for (let i = 0; i < rsp.photos.photo.length; i++) {
 photo = rsp.photos.photo[i];
 t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
 p_url = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
 s += `<a href="${p_url}"><img alt="${photo.title}" src="${t_url}"/></a>`;
 }
 return s;
}
//Creates the page with images on it for team images
function createPage(title,rsp) {
 const number = rsp.photos.photo.length;
 const imageString = parsePhotoRsp(rsp);
 //Headers and opening body, then main content and close
 const str = '<!DOCTYPE html>' +
 '<html><head><title>Flickr JSON</title></head>' +
 '<body>' +
 '<h1>' + title + '</h1>' +
 'Total number of entries is: ' + number + '</br>' +
 imageString +
 '</body></html>';
 return str;
}
  ;
  

  
  
  
  
  
  // Code to retrieve images for team specific stadiums
  router.get("/stadium", (req, res) => {
    res.set("content-type", "text/html");
  
    //Construct url for stadium news
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b3bf75c8bba1d65dde9710148a0456cc&tags=${teamNewsData.stadium}&format=json&nojsoncallback=1`;
  
    console.log(url);
    const options2 = createFlickrOptions2(req.params.query,req.params.number);
 const flickReq = https.request(options2, (flickRes) => {
 let body = [];
 flickRes.on('data',function(chunk) {
 body.push(chunk);
 });
 flickRes.on('end', function() {
 res.writeHead(flickRes.statusCode,{'content-type':
'text/html'});
 const bodyString = body.join('');
 const rsp = JSON.parse(bodyString);
 const s = createPage('Flickr Photo Search',rsp);
 res.write(s);
 res.end();
 });
 });
 flickReq.on('error', (e) => {
 console.error(e);
 });
 flickReq.end();
});
const flickr2 = {
 method: 'flickr.photos.search',
 api_key: "12fd08e2c1681306306696a917793803",
 format: "json",
 media: "photos",
 nojsoncallback: 1
};
function createFlickrOptions2(query,number) {
 const options2 = {
 hostname: 'api.flickr.com',
 port: 443,
 path: '/services/rest/?',
 method: 'GET'
 }
 // once again makes sure that there are no spaces 
 var re=teamNewsData.stadium.split(" ");
 var final=re.join();
 var op2 = final.replace(',','%20');
 var op3 = op2.replace(',','%20');
 const str2 = 'method=' + flickr2.method +
 '&api_key=' + flickr2.api_key +
 '&tags=' + op3 +
 '&per_page=' + 100 +
 '&format=' + flickr2.format +
 '&media=' + flickr2.media +
 '&nojsoncallback=' + flickr2.nojsoncallback;
 options2.path += str2;
 return options2;
}

  
  function parsePhotoRsp(rsp) {
    let s = "";
    for (let i = 0; i < rsp.photos.photo.length; i++) {
    photo = rsp.photos.photo[i];
    t_url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    p_url = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
    s += `<a href="${p_url}"><img alt="${photo.title}" src="${t_url}"/></a>`;
    }
    return s;
   }
   function createPage(title,rsp) {
    const number = rsp.photos.photo.length;
    const imageString = parsePhotoRsp(rsp);
    //Headers and opening body, then main content and close
    const str2 = '<!DOCTYPE html>' +
    '<html><head><title>Flickr JSON</title></head>' +
    '<body>' +
    '<h1>' + title + '</h1>' +
    'Total number of entries is: ' + number + '</br>' +
    imageString +
    '</body></html>';
    return str2;
   }
  
  module.exports = router;