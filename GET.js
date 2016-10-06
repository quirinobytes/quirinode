#!/usr/bin/env node

/* KRNGET */
var debug = true;
var keepalive = false;
var verbose = false;
var porta;

console.log("KRNGET 0.1 || HTTP GET http://" + process.argv[2] + "/ [no_porta] \n");
if (typeof process.argv[2] == 'undefined') { console.log ("\n\nTente: ./GET.js host [porta]\n") ; return; } 
console.log('Host: '+process.argv[2]);

if (process.argv.indexOf("-v"))
	verbose = true;

if (process.argv[3] ){
	porta = process.argv[3];
	console.log('Porta= '+ porta);
}
else {
	porta = 80;
	console.log('Porta= '+ porta);
}

var http = require ("http");
var dateFormat = require('dateformat');
var colors = require('colors');
var now = new Date();
var start = process.hrtime(); //marca o exato momento do inicio do processo, tipo para usar em um cronometro.

if (keepalive)
	var options = {  hostname: '',  port: porta,  path: '/',  method: 'GET'};
else
	var options = {  hostname: '',  port: porta,  path: '/',  method: 'GET',  agent: false};

options[0] = process.argv[2];


var get = 	http.get(options, function(res) {
  				if (verbose) console.log("Start: " + dateFormat(now,"hh:MM:ss dd/mm/yy\n"));
  				if (verbose) process.stdout.write(("Got response: " + res.statusCode + " em: ").blue); 
  				if (verbose) elapsed_time();
  				
  				console.log("Connection: " + res.headers.connection + "\n");
				
				

			}).on('error', function(e) {
				console.log("Start: " + dateFormat(now,"hh:MM:ss dd/mm/yy\n"));
				console.log(("Got error: " + e.message).red);
			
			}).on('close', function(socket) {
				if (debug)  elapsed_time(" >> Tempo gasto para finalizar a conexao TCP/IP devido ao keep-alive (TRUE/FALSE)");
				if (debug)  console.log(("Programa encerrado\n").yellow);
			
			}).on('data' , function(chunk) {
    			console.log(("BODY: " + chunk).blue );
  			});



//funcao de Tempo Gasto, para determinar quanto tempo levou para executar determinadas partes do processo ou requisição, basta chamar elapsed_time("Com Nota ou sem");
var elapsed_time = function(note){
    var precision = 0; // 2 decimal places
    var elapsed = process.hrtime(start)[1] ; // divide by a million to get nano to milli
    if (note) {
    	//console.log(process.hrtime(start)[1] /1000000);
    	//console.log("elapsed"+ elapsed);
    	console.log((process.hrtime(start)[0] + "," + elapsed.toFixed(precision) + " s ").green + note.blue); // print time
    }else{
    	//console.log("Elapsed"+ elapsed);
    	console.log((process.hrtime(start)[0] + "," + elapsed.toFixed(precision) + " s ").green); // print time + message
    }
    start = process.hrtime(); // reset the timer
}	
