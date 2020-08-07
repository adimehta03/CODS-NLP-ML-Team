const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const spawn = require("child_process").spawn; 
const bodyParser = require('body-parser');

app.set('view engine','ejs') 

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/static/map'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/static'));

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'static','lander.html'));
});

app.post('/evaChatbot',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','lander.html'));
})

app.get('/evaChatbot',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','lander.html'));
})

app.post('/newsAndTweets',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','news.html'));
})

app.get('/newsAndTweets',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','news.html'));
})

let predictions;
app.post('/preditionsModel',(req,res)=>{
    res.render('index',{data:{prediction1:null}});
})

app.get('/preditionsModel',(req,res)=>{
    res.render('index',{data:{prediction1:null}});
})
 
app.post('/predictions', (req, res) =>{ 

    const yyyy= req.body.name.split('-')[0];
    const mm = req.body.name.split('-')[1];
    const dd = req.body.name.split('-')[2]
    const process = spawn('python',["./sirModel.py", 
                            parseInt(yyyy),parseInt(mm),parseInt(dd)] ); 
  
    process.stdout.on('data', function(data) { 
        predictions = data.toString().split("##########");
        res.redirect('/output')
    } ) 
} ); 
  
app.get('/output',(req,res)=>{
    res.render('index',{data:{prediction1:predictions[0],prediction2:predictions[1],prediction3:predictions[2]}});
});

app.get('/maps',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','map.html'));
})

app.post('/maps',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','map.html'));
})

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','about.html'));
})

app.get("/worldMap",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','worldMaps.html'));
})

app.get("/IndiaMap",(req,res)=>{
    res.sendFile(path.join(__dirname,'static','IndiaMap.html'));
})

app.listen(3000,()=>console.log("Listening at port 3000...."));