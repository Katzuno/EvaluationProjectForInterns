var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var dotenv = require('dotenv').config();
var mysql = require('mysql');
var util = require('util');

var app = express();

const server_ip = process.env.SERVER;
const username = process.env.USERNAME;
const pass = process.env.PASSWORD;
const db = process.env.DATABASE;

app.use(express.static('public'));
app.set('view engine', 'ejs');

var dbEngine = mysql.createConnection({
    host: server_ip,
    user: username,
    password: pass,
    database: db
});

public_html = __dirname + "/views/";

dbEngine.connect(function(err) {
    if (err) 
    {
        throw err;
    }
    console.log("Succesfully connected to MySQL Database!");
  });

  var query = util.promisify(dbEngine.query).bind(dbEngine);

async function dbOperation(query_string)
{
    try {
        console.info(query_string);
        const result = await query(query_string);
        return result;
      } 
    catch(err)
    {
        console.info(err);
    }
}

app.get('/', function (req, res) {
    field_test_readonly = "readonly";
    res.render('index', {test_readonly:field_test_readonly});
 });

 // MODEL SELECT DB
 app.get('/select-documents', function(req, res)    {
    documents_promise = dbOperation("SELECT * FROM documente");
    documents_promise.then(function(result) {
                                console.log("[RESULT] ", result);
                                docDetails = result;

                                // In response stochezi elementele din rezultatul primit din baza de date
                                response = 
                                {
                                    cod_document:docDetails[0].document_number,
                                    nume_document:docDetails[0].document_name
                                };
                                
                                console.log(response);
                                res.send(response);

                            }, 
                            function(err) {
                                console.log(err);
                            }
                        );
 });

 // MODEL INSERT DB - Update e similar, dar difera query-ul SQL
 app.post('/insert-document', function(req, res)    {
    sql = "INSERT INTO documente (document_number, document_name) VALUES ('D.002', 'Reparatie iPhone XS')";  
        try
        {
            dbOperation(sql);
        }
        catch(err)
        {
            res.send("[ERROR] Can't be inserted", err);
            console.log(err);
        }
    res.send("Request sent to database succesfully");
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
    console.log("Got a POST request for the homepage");
    //res.send('Hello POST');
    res.send(response);
});



 // MAI JOS NU SCHIMBI NIMIC
 var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("NodeJS app listening at http://142.93.138.151/");
 });