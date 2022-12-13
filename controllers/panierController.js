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

let formationsInscrites = [];
let panierList = [];
let formationList = [];


connection.query("select * from formations;", function(error, result){
    if (error) console.log(error);
    for (let i = 0; i<result.length ; i++){
        let formation = new Formation(result[i].Nomformation, result[i].Prix, result[i].Debut, result[i].Fin);
        formationList.push(formation);
    };
});




exports.panierAdd = function(req, res) {
    if (!formationsInscrites.includes(req.params.Nomformation)){
        formationsInscrites.push(req.params.Nomformation);
        

    };
      

}
exports.panierDel = function(req, res) {
    for (let i = 0; i<formationsInscrites.length ; i++){
        console.log(formationsInscrites);
        console.log(req.params.Nomformation);
        if (req.params.Nomformation == formationsInscrites[i]){
            formationsInscrites.splice(formationsInscrites[i], 1);
            panierList.splice(formationsInscrites[i]);
        }
    }
    res.redirect('/');



};
exports.panierShow = function(req, res) {
    let message = ""
      
    for (let i = 0; i<formationList.length ; i++){
        
        if (formationsInscrites.includes(formationList[i].Nomformation)){
            if (!panierList.includes(formationList[i])){
            
                console.log('ok********************');
                panierList.push(formationList[i]);
            };
        }
        

    };
    console.log(panierList);


    
    
    res.render('panier.ejs', {formations : panierList, message : message});  

};
exports.confirmOrder = function(req, res) {
    let currentUser = req.session.user;
    
    
    
    if (currentUser == undefined){
        console.log("redirect");
        res.render('connecterror.ejs');
        

    };
    
    if (currentUser != undefined){
        message = "enregistrement réussi"
        for (let i = 0; i<formationsInscrites.length ; i++){
    
        connection.query("INSERT INTO inscriptions(session, formationsChoisiesIndex) VALUES(?, ?)  ", [currentUser, formationsInscrites[i]],   function(error, result){ 
            if (error) console.log(error);
            else console.log(currentUser + formationsInscrites);  

        });
        res.render('panier.ejs', {formations : panierList, message : message})
        
        };
        formationsInscrites = [];
        panierList = [];
    };
    
};

