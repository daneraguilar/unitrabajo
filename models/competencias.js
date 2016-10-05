var mongoose =require('mongoose');
var Schema = mongoose.Schema;

 var competencias = new Schema ({
 	competencia:{type:String,required:true},
 	cv : {type:Schema.Types.ObjectId,ref:'cvs'}
 	
 });
 module.exports= mongoose.model('competencias',competencias);