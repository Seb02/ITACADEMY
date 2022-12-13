let Formation = require('../models/FormationModel');

let express = require('express');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'listeformations',
})

connection.connect(function(error) {if (error) console.log(error);});
let formationList = [];
connection.query("select * from formations;", function(error, result){
    if (error) console.log(error);
    for (let i = 0; i<result.length ; i++){
        let formation = new Formation(result[i].Nomformation, result[i].Prix, result[i].Debut, result[i].Fin);
        formationList.push(formation);
    };
});
// voir for each


exports.formationList = function(req, res) {
    //let formation = new Formation("Nomformation, Prix, Debut, Fin, Inscrits")
    
    res.render('formations.ejs', {formations : formationList})
    };

