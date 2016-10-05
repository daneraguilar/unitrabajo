var express = require('express');
var router = express.Router();
var usersController= require('../controller/usercontroller');
var experienciasController= require('../controller/experienciasController');
var estudiosController= require('../controller/estudiosController');
var idiomasController= require('../controller/idiomasController');
var competenciasController= require('../controller/competenciasController');

/* GET users listing. */
// user controller routers//////
router.get('/egresadoshow', function(req, res, next) {
 usersController.todos(req,res);
});
router.post('/egresadonew', function(req, res, next) {
 usersController.guardar(req,res);

});
router.get('/egresadoshow/:_id', function(req, res, next) {
 usersController.buscarID(req,res);

});
router.put('/egresadoupdate/:_id', function(req, res, next) {
 usersController.modificar(req,res);

});
router.delete('/egresado/:_id', function(req, res, next) {
 usersController.eliminar(req,res);


//***************experiencias*********************************//
 
});
router.post('/experiencianew', function(req, res, next) {
 experienciasController.guardar(req,res);

});
router.put('/experienciaupdate/:_id', function(req, res, next) {
 experienciasController.modificar(req,res);

});
router.delete('/experienciadelete/:_id', function(req, res, next) {
 experienciasController.eliminar(req,res);


 /////////////////////////////////////////////////////

});
router.post('/estudionew', function(req, res, next) {
estudiosController.guardar(req,res);

});
router.put('/estudioupdate/:_id', function(req, res, next) {
 estudiosController.modificar(req,res);

});
router.delete('/estudiodelete/:_id', function(req, res, next) {
estudiosController.eliminar(req,res);

});

////****////////////idiomas/////--------------------
router.post('/idiomanew', function(req, res, next) {
idiomasController.guardar(req,res);

});
router.put('/idiomaupdate/:_id', function(req, res, next) {
idiomasController.modificar(req,res);

});
router.delete('/idiomadelete/:_id', function(req, res, next) {
idiomasController.eliminar(req,res);
///-------------------------------------/////--------------




///**************competencias *///////
});
router.post('/competencianew', function(req, res, next) {
competenciasController.guardar(req,res);

});
router.put('/competenciaupdate/:_id', function(req, res, next) {
competenciasController.modificar(req,res);

});
router.delete('/competenciadelete/:_id', function(req, res, next) {
competenciasController.eliminar(req,res);

});
module.exports = router;
