let express = require('express');
//déclare l'objet router
let router = express.Router();
let session = require('express-session');
var formationController = require('./controllers/formationController');
var connectController = require('./controllers/connectController');
var panierController = require('./controllers/panierController');
var connectErrorController = require('./controllers/connectErrorController');
//Liste des routes vers les contrôleurs

//router.use(express.urlencoded({extended : true})); //permet de décoder le body
//
//router.use(session({
//    secret: 'my secret', //clé unique
//    resave : false, //laisser à false pour éviter de perdre la session quand on sauve un nouveau formulaire
//    saveUninitialized : true
//}));
//
//peut aussi être un router.post
router.get('/events', function(req, res) {
    res.send("events called");
});

router.get('/', formationController.formationList);

router.post('/connectPage', connectController.pageConnection);
router.post('/connectErrorPage', connectErrorController.pageConnection);
router.get('/inscription/:Nomformation', panierController.panierAdd);
router.get('/desinscription/:Nomformation', panierController.panierDel);
router.post('/panier', panierController.panierShow);
router.post('/confirm', panierController.confirmOrder);


router.post('/connect', connectController.connectSession);
router.post('/connectError', connectErrorController.connectSession);
//redirection : router.get('/', (req, res) => req.redirect('/user'));
module.exports = router;

//router.get('/user/add', Usercontroller.userFormAdd)