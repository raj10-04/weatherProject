const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
 });

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apikey = "17bbbd377815c2db179d2df9b330b7b0";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"";
    https.get(url,function(response){    
        response.on("data",function(data){
            const weaterData= JSON.parse(data)           
            const temp = weaterData.main.temp;
            const icon = weaterData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Current Temp is:"+temp+"</h1>");
            res.write("<img src="+imgUrl+">");
            res.send()
        })
    })
})




app.listen(3000,function(){
    console.log("Running");
}); 
