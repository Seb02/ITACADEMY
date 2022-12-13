let session = require('express-session');
let express = require('express');



exports.pageConnection = function(request, response) {
    response.render('connecterror.ejs');

};



exports.connectSession = function(request, response)  {  //ici on enregistre dans la session le user défini dans l'url
        request.session.user = request.body.Pseudo;
        console.log(request.session);
        response.redirect(307, '/confirm'); // redirection vers la page de base.
};