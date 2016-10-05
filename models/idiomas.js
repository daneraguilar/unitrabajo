var mongoose =require('mongoose');
var Schema = mongoose.Schema;

 var idiomas = new Schema ({
 	idioma:{type:String,required:true},
 	nivel :{type:String,required:true},
 	cv : {type:Schema.Types.ObjectId,ref:'cvs'}
 });
 module.exports= mongoose.model('idiomas',idiomas);