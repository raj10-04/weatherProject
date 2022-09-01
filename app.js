const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const exp = require('constants');
const { json } = require('body-parser');
const { parse } = require('path');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(request,res){
    const query = request.body.cityName;
    const apikey = "17bbbd377815c2db179d2df9b330b7b0";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"";
    https.get(url,function(response){
        response.on("data",function(data){  
        const weather = JSON.parse(data);
        const temp = weather.main.temp;
        res.write("<h1>Current Temp is:"+temp+"</h1>");
        res.send();

        })
    })

});


app.listen(3000,function(){
    console.log("Running");
}); 
