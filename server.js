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

/* app.post('/diagnosticare', urlencodedParser, function (req, res) {
    var nume = req.body.nume_produs;
    var imei = req.body.imei;
    var cod_produs=req.body.cod_produs;
    date = req.body.date_end;

    
    response = {
        nume:req.body.nume_produs,
        imei:req.body.imei,
        date:req.body.date_end
    }
    
    


    documents_promise = dbOperation("SELECT id,nume, IMEI FROM Cod_Produs WHERE cod_produs='"+cod_produs+"' AND nume='"+nume+ "' AND IMEI='"+ imei+"'" );
    documents_promise.then(function(result) {
                                console.log("[RESULT] ", result);
                                docDetails = result;

                                var nume_out='not exist';
                                var id_out = "not exist";
                                var imei_out='not exist';
                                if (docDetails[0])
                                {
                                    id_out = docDetails[0].id;
                                    nume_out = docDetails[0].nume;
                                    imei_out = docDetails[0].IMEI;
                                }
                                // In response stochezi elementele din rezultatul primit din baza de date
                                response = 
                                {
                                    id_produs:id_out,
                                    nume:nume_out,
                                    imei:imei_out
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
}); */

     //  Noul cod scris de mine

app.post('/diagnosticare', urlencodedParser, function (req, res) {
    //var nume = req.body.nume_produs;
    //var imei = req.body.imei;
    var test_produs = req.body.cod_produs;//Modificare
    //var date = req.body.date_end;
   // var merge_reparat = req.body.reparabil;


    response = {
        ID_PRODUS:req.body.cod_produs, //Modificare
        //nume:req.body.nume_produs
        /*imei:req.body.imei,
        date:req.body.date_end,
        merge_reparat:req.body.reparabil
        */
    }
    console.info("PRIMUL RESPONSE");
    console.info(response);



    documents_promise = dbOperation("SELECT F.ID_PRODUS, P.NUME, U.NUME AS NUME2, S.Stare FROM FISA_SERVICE F INNER JOIN PRODUS P ON F.ID_PRODUS = P.ID INNER JOIN USER U ON U.ID=F.ID_USER INNER JOIN STARE S ON S.ID=F.ID_STARE WHERE ID_PRODUS='"+test_produs+"'"  );
    //documents_promise = dbOperation("SELECT ID_PRODUS FROM FISA_SERVICE  WHERE ID_PRODUS ='"+test_produs+"'" );
    documents_promise.then(function(result) {
                                console.log("[RESULT] ", result);
                                docDetails = result;

                                

                                //linia 1
                                var idd_out='noooot exist';
                                var nume_out='noOt exist';
                                var nume_user1="not exist";
                                
                                //linia 2
                                var id_out2 = "not exist";
                                var nume_out2="not exist";
                                var nume_user2="not exist";
                                // linia 3
                               /* var id_out3='not exist';
                                var nume_out3='noOt exist';
                                var nume_user3="not exist";
                                
                                //linia 4
                                var id_out4='not exist';
                                var nume_out4='noOt exist';
                                var nume_user4="not exist";*/

                                

                               

                                //var imei_out='not exist';
                                //var date_out='not exist';
                                //var merge='not exist';
                                if (docDetails[0])
                                {
                                    console.log("A INTRAT IN PRIMUL IF DIN PROMISE THEN " + docDetails[0]);
                                     
                                
                               /*
                                var total = [];

                                for (var i = 0; i < docDetails.length; i++)
                                {
                                    row = 
                                    {
                                        test1: docDetails[i].ID_PRODUS,
                                        test2: docDetails[i].NUME
                                    }
                                    total.push(row);

                            }
                            
                                    idd_out = docDetails[0].ID_PRODUS; // Modificare
                                    nume_out = docDetails[0].NUME;
                                    nume_user1 = docDetails[0].NUME2;

                                    id_out2 =  docDetails[1].ID_PRODUS;
                                    nume_out2 = docDetails[1].NUME;
                                    nume_user2 = docDetails[1].NUME2;

                                    id_out3 = docDetails[2].ID_PRODUS; // Modificare
                                    nume_out3 = docDetails[2].NUME;
                                    nume_user3 = docDetails[2].NUME3;

                                    id_out4 = docDetails[3].ID_PRODUS; // Modificare
                                    nume_out4 = docDetails[3].NUME;
                                    nume_user4 = docDetails[3].Stare;*/
                                    //imei_out = docDetails[0].IMEI;
                                    //date_out=docDetails[0].DATE_OUT;
                                    //merge=docDetails[0].ID_STARE;
                                }
                                // In response stochezi elementele din rezultatul primit din baza de date
                                response = 
                                {/*
                                    id_produs1:idd_out,//Modificare
                                    nume1:nume_out,
                                    user1:nume_user1,

                                    id_produs2:id_out2,//Modificare
                                    nume2:nume_out2,
                                    user2:nume_user2,

                                    id_produs3:id_out3,//Modificare
                                    nume3:nume_out3,
                                    user3:nume_user3,

                                    id_produs4:id_out4,//Modificare
                                    nume4:nume_out4,
                                    user4:nume_user4,
                                    //imei:imei_out
                                    //nume_document:docDetails[0].document_name
                                    //date_ouut:date_out,
                                    //merge_reparat:merge

                                  */  
                                };

                                console.log("RESPONSE DIN THEN");
                                console.log(response);
                                res.send(docDetails);

                            }, 
                            function(err) {
                                console.log(err);
                            }
                        );

    console.log("Got a POST request for the homepage");
    //res.send('Hello POST');

});

//        O NOUA DIAGNOSTICARE PENTRU ALT TABEL




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