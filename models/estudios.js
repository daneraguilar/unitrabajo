var mongoose = require('mongoose');
 var Schema=mongoose.Schema;

var estudios = new Schema({
	institucion : {type:String ,required:true},
	nivel : {type:String ,required:true},
	inicio :{type:Date , require:true},
	final : {type:Date },
	actualmente : {type:Boolean ,required:true},
	area: {type:String , required:true},
	cv : {type:Schema.Types.ObjectId,ref:'cvs'}
	
});
module.exports = mongoose.model('estudios',estudios);