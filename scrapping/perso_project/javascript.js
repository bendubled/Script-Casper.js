var fs = require('fs');

var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    pageSettings: {

        loadImages: true,
        loadPlugins: true,
        clientScripts: ["../libs/jquery.min.js"]
    },
    onDie: function () {
        console.log('Page is died');
    },
    onPageInitialized: function () {
        console.log("Page Initialized");
    }
});


casper.on('remote.message', function (msg) {
    this.echo('remote message caught: ' + msg);
});

casper.on("page.error", function (msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

var url_connexion = 'https://accounts.zoho.eu/signin?servicename=ZohoCRM&signupurl=https://www.zoho.eu/crm/lp/signup.html';


var credentials = {email: "christian.manach@hotmail.fr", password: "pleindebonheur66@@"};


var identifiant = {input_email: 'input[name="lid"]', input_password: 'input[name="pwd"]', valider_connexion: '#signin_submit'};


var result = [];



var x = require('casper').selectXPath;

casper.start(url_connexion, function() {
        console.log('start1');
        console.log("*************************");
        console.log(" Page de connexion chargee");
        console.log("*************************");
        casper.wait(5000, function(){
        casper.capture("./screenshots/step_1.png");
        console.log('premier_screen')});
    
        this.sendKeys(identifiant.input_email, credentials.email);
        this.sendKeys(identifiant.input_password, credentials.password);
        casper.wait(5000, function(){
        casper.capture("./screenshots/step_2.png");
        console.log('second_screen')});
    
        casper.thenClick(identifiant.valider_connexion, function(){


        casper.wait(5000, function(){

        casper.capture("./screenshots/step_3.png");
        console.log('troisieme_screen');

    });
  });
});
casper.then(function(){
console.log('ATTENTIONNNNNNNE');
var myparameters = {Url:"https://crm.zoho.com/crm/ShowTab.do?module=Invoices"};

casper.wait(5000, function(){
 casper.thenOpen('https://crm.zoho.com/crm/ShowTab.do?module=Invoices', function(){ 
      console.log("step_cap");
casper.capture("./screenshots/step_4.png");
 });             
 });
});

casper.then(function(){
console.log('NEWWWW');
var myparameters = {Url:"https://crm.zoho.com/crm/EntityInfo.do?module=Invoices&id=3050952000000147091"};

casper.wait(5000, function(){
 casper.thenOpen('https://crm.zoho.com/crm/EntityInfo.do?module=Invoices&id=3050952000000147091', function(){ 
      console.log("step_cap");
casper.capture("./screenshots/step_5.png");
casper.then(Extract_data_on_page);
 });             
 });
});



function Extract_data_on_page(){
  console.log('extract_data');
  var zoho_result_identifiant = 
  {
    result_id:'//*[@id="subvalue_INVOICESUBJECT"]'
    
  };


    var result_intermediaire = {name :""};
       result_intermediaire.name = this.fetchText('tr#detailViewButtonLayerDummyTableRow #dv_title #topSectionTitle #headervalue_INVOICESUBJECT #subvalue_INVOICESUBJECT');

result= [];
result.push(result_intermediaire);



casper.then(function(){
console.log('***********************');
console.log(result[0].name);
console.log(result[0]);
console.log(result);
console.log(result_intermediaire);

console.log('***********************');

});
}


casper.then(function(){
    console.log('*******************************');
    console.log('Results');
    var fs = require('fs');
    var csv = "nom"+'\n';
    for(var i=0;i<result.length;i++){
      console.log(result[i].name);
      console.log('——————————————————————————————————————————————————————');
      csv += result[i].name+'\n';
    }
    fs.write("results_scrapped.csv", csv, {mode:"a",charset:"iso-8859-1"});
    console.log('*******************************');  
    console.log('**********************************************************');
    console.log('**********************************************************');
    console.log(' Un fichier csv a ete genere avec les informations des personnes en resultats de recherche');
    console.log('**********************************************************');
    console.log('**********************************************************');
   


})
  
//casper.then(function(){
//'use strict';
//
//const parse      = require('csv-parse');
//const util       = require('util');
//const fs         = require('fs');
//const path       = require('path');
//const mysql      = require('mysql');
//const async      = require('async');
//const csvHeaders = require('csv-headers');
//const leftpad    = require('leftpad');
//
//const csvfn = process.argv[2];
//const dbnm  = process.argv[3];
//const tblnm = process.argv[4];


//new Promise((resolve, reject) => {
//    csvHeaders({
//        file      : csvfn,
//        delimiter : ','
//    }, function(err, headers) {
//        if (err) reject(err);
//        else resolve({ headers });
//    });
//})

//.then(context => {
//    return new Promise((resolve, reject) => {
//        context.db = mysql.createConnection({
//            host     : '127.0.0.1',
//            user     : 'root',
//            password : 'rastaman66',
//            database : zoho_first
//        });
//        context.db.connect((err) => {
//            if (err) {
//                console.error('error connecting: ' + err.stack);
//                reject(err);
//            } else {
//                resolve(context);
//            }
//        });
//    });
//});
//
//
//});











//casper.then(function(){
//var mysql = require('mysql');
//
//
//    console.log("start_bdd");
//    var con = mysql.createConnection({
//        user: 'root',
//        password: 'rastaman66',
//        host: 'localhost',
//        database: 'zoho_first'
//    });
//    
//    
//
//
//
//
//  con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!");
//  var sql = "INSERT INTO Factures (Titre) VALUES ('Company Inc')";
//  con.query(sql, function (err, result) {
//    if (err) throw err;
//    console.log("1 record inserted");
//  });
//});
//});
casper.run();











