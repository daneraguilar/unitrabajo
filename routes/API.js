var express = require('express');
var router = express.Router();
var empresaController = require('../controller/empresaController');
var usersController = require('../controller/usercontroller');
var experienciasController = require('../controller/experienciasController');
var estudiosController = require('../controller/estudiosController');
var idiomasController = require('../controller/idiomasController');
var competenciasController = require('../controller/competenciasController');
var ofertasController = require('../controller/ofertasController');

/* GET 	Api listing. */

///// empresas controller///
router.get('/empresashow', empresaController.todos);
router.post('/empresanew', empresaController.guardar);
router.get('/empresashow/:_id', empresaController.buscarID);
router.put('/empresaupdate/:_id', empresaController.modificar);
router.delete('/empresa/:_id', empresaController.eliminar);
router.post('/empresaauth', empresaController.auth);
//-----------------------/////

// ofertas controller----//
router.get('/ofertashow', ofertasController.todos);
router.post('/ofertanew', ofertasController.guardar);
router.get('/ofertashow/:_id', ofertasController.buscarID);
router.put('/ofertaupdate/:_id', ofertasController.modificar);
router.post('/ofertadelete/:_id', ofertasController.eliminar); 
router.post('/ofertaaplicar/:_id', ofertasController.aplicar);

/////////////////////////////////////////////////////

// user controller routers//////
router.get('/egresadoshow', usersController.todos);
router.post('/egresadonew', usersController.guardar);
router.post('/egresadoauth', usersController.auth);
router.get('/egresadoshow/:_id', usersController.buscarID);
router.put('/egresadoupdate/:_id', usersController.modificar);
router.delete('/egresado/:_id', usersController.eliminar);


//***************experiencias*********************************//

router.post('/experiencianew', experienciasController.guardar);
router.put('/experienciaupdate/:_id', experienciasController.modificar);
router.post('/experienciadelete/:_id', experienciasController.eliminar); /////////////////////////////////////////////////////

/////////-------estudios//////////////////////////
router.post('/estudionew', estudiosController.guardar);
router.put('/estudioupdate/:_id', estudiosController.modificar);
router.post('/estudiodelete/:_id', estudiosController.eliminar);

////****////////////idiomas/////--------------------
router.post('/idiomanew', idiomasController.guardar);
router.put('/idiomaupdate/:_id', idiomasController.modificar);
router.post('/idiomadelete/:_id', idiomasController.eliminar);
///-------------------------------------/////--------------




///**************competencias *///////
router.post('/competencianew', competenciasController.guardar);
router.put('/competenciaupdate/:_id', competenciasController.modificar);
router.post('/competenciadelete/:_id', competenciasController.eliminar);
module.exports = router;
