//#####FAIRE LES MODIFS AVANT DE LANCER LE SERVEUR######
//npm install express-session --save

const {res} = require('express');
const { req } = require('http');
let session = require('express-session');
let express = require('express');
let routes = require('./mesroutes');

let application = express();

application.use(express.urlencoded({extended : true})); //permet de décoder le body





application.use(session({
    secret: 'my secret', //clé unique
    resave : false, //laisser à false pour éviter de perdre la session quand on sauve un nouveau formulaire
    saveUninitialized : true
}));

//******Faut-il aussi le mettre dans mesroutes.ejs?? */
//

application.use('/', routes);



//application.get('/login/:user', (req, res) => {  //ici on enregistre dans la session le user défini dans l'url
//    req.session.user = req.params.user;
//    console.log(req.session);
//    res.send('Hello ' + req.session.user);
//})

application.use(express.static('public'))


application.listen(3000, function(){
    console.log('Server is running on port 3000')
});