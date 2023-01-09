const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const fetch = require ('node-fetch');
const https = require('follow-redirects').https;
const dotenv = require('dotenv');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

if (process.env.NODE_ENV === 'development')
  dotenv.config(
    {
      path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV + '.local')
    }
);

const ID = process.env.PANTRY_ID

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
 return res.send('pong');
});

app.get('/api/getData', function (req, mainRes) {
    var options = {
        'method': 'GET',
        'hostname': 'getpantry.cloud',
        'path': `/apiv1/pantry/${ID}/basket/towatchapp`,
        'headers': {
          'Content-Type': 'application/json'
        },
        'maxRedirects': 20
    };
    let data = {};
     console.log('отправлен get запрос')
    const getReq = https.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
            
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          data = body.toString()
          mainRes.send(data)
          console.log(data)
          console.log('получены данные с сервера')
        });
      
        res.on("error", function (error) {

          console.error(error);
        });
    });

    getReq.end();
})


app.post('/api/postData', async function (mainReq, mainRes) {
  console.log(mainReq.body)
  try {
    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${ID}/basket/towatchapp`, {
      method: 'POST',
      body: JSON.stringify(mainReq.body),
      headers: {'Content-Type': 'application/json'},
      'maxRedirects': 20
    });
    mainRes.send(response)
  } catch (error) {
    console.log(error)
  }
  
})

app.put('/api/putData', async function (mainReq, mainRes) {
  console.log(mainReq.body)
  try {
    const response = await fetch(`https://getpantry.cloud/apiv1/pantry/${ID}/basket/towatchapp`, {
      method: 'PUT',
      body: JSON.stringify(mainReq.body),
      headers: {'Content-Type': 'application/json'},
      'maxRedirects': 20
    });
    console.log(response.ok ? 'успешно отправлено' : 'ошибка отправки')
    mainRes.send(response.ok)
  } catch (error) {
    console.log(error)
  }
  
})

//обслуживание html
app.get('/*', function (req, res) {
res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);