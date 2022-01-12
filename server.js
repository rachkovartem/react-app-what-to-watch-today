const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const fetch = require ('node-fetch');
var https = require('follow-redirects').https;
var fs = require('fs');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


const port = process.env.PORT || 8080;

// здесь у нас происходит импорт пакетов и определяется порт нашего сервера
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors(corsOptions))
app.use(favicon(__dirname + '/build/favicon.ico')); 

//здесь наше приложение отдаёт статику
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//простой тест сервера
app.get('/ping', function (req, res) {
 return res.send('isDev');
});


app.get('/api/getData', function (req, mainRes) {
    var options = {
        'method': 'GET',
        'hostname': 'getpantry.cloud',
        'path': '/apiv1/pantry/2b1cdc78-73a2-4a92-a1d4-8c61e000900f/basket/towatchapp',
        'headers': {
          'Content-Type': 'application/json'
        },
        'maxRedirects': 20
    };
    let data = {
        "squadName": "Super hero squad",
        "homeTown": "Metro City",
        "formed": 2016,
        "secretBase": "Super tower",
        "active": true,
        "members": [
          {
            "name": "Molecule Man",
            "age": 29,
            "secretIdentity": "Dan Jukes",
            "powers": [
              "Radiation resistance",
              "Turning tiny",
              "Radiation blast"
            ]
          },
          {
            "name": "Madame Uppercut",
            "age": 39,
            "secretIdentity": "Jane Wilson",
            "powers": [
              "Million tonne punch",
              "Damage resistance",
              "Superhuman reflexes"
            ]
          },
          {
            "name": "Eternal Flame",
            "age": 1000000,
            "secretIdentity": "Unknown",
            "powers": [
              "Immortality",
              "Heat Immunity",
              "Inferno",
              "Teleportation",
              "Interdimensional travel"
            ]
          }
        ]
      };

     
    const getReq = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
            
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          data = body.toString()
          mainRes.send(data)
        });
      
        res.on("error", function (error) {

          console.error(error);
        });
    });

    getReq.end();

})



app.post('/api/postData', async function (mainReq, mainRes) {
  console.log(mainReq.body)
  const response = await fetch('https://getpantry.cloud/apiv1/pantry/2b1cdc78-73a2-4a92-a1d4-8c61e000900f/basket/towatchapp', {
    method: 'post',
    body: JSON.stringify(mainReq.body),
    headers: {'Content-Type': 'application/json'},
    'maxRedirects': 20
  });

  
  mainRes.end('200 OK')
})

//обслуживание html
app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);