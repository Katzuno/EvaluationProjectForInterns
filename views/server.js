

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

  // nu te atingi de ea
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

 // MODEL INSERT / UPDATE DB - Update e similar, dar difera query-ul SQL
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
        date:req.body.date_end
    }

    console.log("Got a POST request for the homepage");
    //res.send('Hello POST');
    res.send(response);
});
// cod scris de mine ->

app.post('/diagnosticare', urlencodedParser, function (req, res) {
    var nume = req.body.nume_produs;
    var imei = req.body.imei;
    var cod_produs=req.body.cod_produs;
    var date = req.body.date_end;

    
    response = {
        nume:req.body.nume_produs,
        imei:req.body.imei,
        date:req.body.date_end,
    }
    
    


    documents_promise = dbOperation("SELECT id,nume,Data_end, IMEI FROM Cod_Produs WHERE cod_produs='"+cod_produs+"' AND nume='"+nume+ "' AND IMEI='"+ imei+"'");
    documents_promise.then(function(result) {
                                console.log("[RESULT] ", result);
                                docDetails = result;

                                var data_out='not exist';
                                var nume_out='not exist';
                                var id_out = "not exist";
                                var imei_out='not exist';

                                if (docDetails[0])
                                {
                                    id_out = docDetails[0].id;
                                    nume_out = docDetails[0].nume;
                                    imei_out = docDetails[0].IMEI;
                                    data_out=docDetails[0].Date_end;
                                }
                                // In response stochezi elementele din rezultatul primit din baza de date
                                response = 
                                {
                                    id_produs:id_out,
                                    nume:nume_out,
                                    imei:imei_out,
                                    datta:data_out,
                                    //nume_document:docDetails[0].document_name
                                };
                                
                                console.log(response);
                                res.send(response);

                            }, 
                            function(err) {
                                console.log(err);
                            }
                        );

    console.log("Got a POST request for the homepage");
    //res.send('Hello POST');

});
app.post('/comunicare-cost-client', urlencodedParser, function (req, res) {
    var pret = req.body.valoare;
    
    response = {
        pret:req.body.valoare
        
    }
    console.log("Got a POST request for the homepage");
    //res.send('Hello POST');
    res.send(response);
});






 // MAI JOS NU SCHIMBI NIMIC
 var server = app.listen(1337, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("NodeJS app running on http://142.93.138.151/");
 });
