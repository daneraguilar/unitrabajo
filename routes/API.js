var express = require('express');
var router = express.Router();
var usersController = require('../controller/usercontroller');
var experienciasController = require('../controller/experienciasController');
var estudiosController = require('../controller/estudiosController');
var idiomasController = require('../controller/idiomasController');
var competenciasController = require('../controller/competenciasController');

/* GET users listing. */
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
router.delete('/idiomadelete/:_id', idiomasController.eliminar);
///-------------------------------------/////--------------




///**************competencias *///////
router.post('/competencianew', competenciasController.guardar);
router.put('/competenciaupdate/:_id', competenciasController.modificar);
router.delete('/competenciadelete/:_id', competenciasController.eliminar);
module.exports = router;
