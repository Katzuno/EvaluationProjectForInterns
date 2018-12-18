var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express();

app.use(express.static('public'));
public_html = __dirname + "/public/";

app.get('/', function (req, res) {
    res.sendFile( public_html + "index.html" );
 });

 // MAI SUS NU SCHIMBI NIMIC
// MAI JOS SCRII COD - ai 2 modele pentru request

 app.get('/test', function(req, res)    {
    res.send("Hello TEST");
 });

// Model POST request - pasul 3 acceptare cost
app.post('/accept-cost', urlencodedParser, function (req, res) {
    response = {
        confirmat:req.body.confirmat,//Preiau atributul name din input
        last_name:req.body.date_end
    }
    console.log("wkfnekfn");
    res.send(response);
});




 // MAI JOS NU SCHIMBI NIMIC
 var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("NodeJS app listening at http://157.230.22.135/app/");
 });