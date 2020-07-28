const express = require('express'); 
const app = express();
const path = require('path');
const spawn = require("child_process").spawn; 
const bodyParser = require('body-parser');

app.use('/public',express.static(path.join(__dirname,'static')));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'static','index.html'));
})
 
app.post('/predictions', (req, res) =>{ 

    const yyyy= req.body.name.split('-')[0];
    const mm = req.body.name.split('-')[1];
    const dd = req.body.name.split('-')[2]
    const process = spawn('python',["./sirModel.py", 
                            parseInt(yyyy),parseInt(mm),parseInt(dd)] ); 
  
    process.stdout.on('data', function(data) { 
        res.send(data); 
        console.log(data)
    } ) 
} ); 
  
app.listen(3000, function() { 
    console.log('Listening at port 3000...'); 
} ) 