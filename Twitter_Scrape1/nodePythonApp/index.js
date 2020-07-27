const express = require('express')
const {spawn} = require('child_process');
const csv = require('csv-parser');
const fs = require('fs');


const app = express()
const port = 3000


var EntireTweet = [],TweetsOnly = [];

app.get('/', (req, res) => {
    
 const python = spawn('python', ['../Tweets.py']);
 
 fs.createReadStream('../narendramodi.csv')
  .pipe(csv())
  .on('data', (row) => {
      
    EntireTweet.push(row)
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
 });
 
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 
 for(let i = 0;i<EntireTweet.length;i++){
    console.log(EntireTweet[i].Tweets);
    TweetsOnly.push(EntireTweet[i].Tweets)
}

    res.send(TweetsOnly)
 });
 
})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))