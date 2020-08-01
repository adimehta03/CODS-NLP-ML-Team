const express = require('express'); 
const app = express();
const path = require('path');
const spawn = require("child_process").spawn; 
const bodyParser = require('body-parser');

app.set('view engine','ejs') 
// app.set('views',__dirname+'/views')
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:false}));
let predictions;
app.get('/',(req,res)=>{
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
app.listen(3000, function() { 
    console.log('Listening at port 3000...'); 
} ) 