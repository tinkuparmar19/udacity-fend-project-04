var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const aylien = require("aylien_textapi");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
app.use(express.json()) 
app.use(express.static('dist'));
app.use(cors());
console.log(__dirname)

// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/testing', async (req, res, next) => {
    //console.log(req.body);
    try {
      var data = textapi.sentiment({
        //'text': 'John is a very good football player!'
        'text': req.body.text
      }, function(error, response) {
        if (error) {
          throw error;
          res.send(response);
        }
      });
      //res.send(mockAPIResponse)
    } catch(error) {
      // Passes errors into the handler
      return next(error)
    }
    //res.send(returnVal);
  })
  

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
