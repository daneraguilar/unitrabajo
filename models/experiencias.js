var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experiencias = new Schema({
    empresa: { type: String, required: true },
    cargo: { type: String, required: true },
    inicio: { type: Date, require: true },
    final: { type: Date },
    actualmente: { type: Boolean, required: true },
    departamento: { type: String, required: true },
    funcion: { type: String, required: true },
    });
module.exports = mongoose.model('experiencias', experiencias);
