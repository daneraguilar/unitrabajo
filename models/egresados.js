
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var egresadosSchema = new Schema({
	
	email:{ type: String, lowercase: true, required: true , index:true, unique: true  },
	password:{ type: String,  required: true },
	nombres :{ type: String, lowercase: true, required: true },
	apellidos :{ type: String, lowercase: true, required: true },
	sexo :{ type: String, lowercase: true, required: true },
	telefono :{ type: String, lowercase: true, required: true },
    experiencias :[{type: Schema.Types.ObjectId,ref:'experiencias'}],
	estudios :[{type: Schema.Types.ObjectId,ref:'formaciones'}],
	idiomas:[{type: Schema.Types.ObjectId,ref:'idiomas'}],
	competencias:[{type: Schema.Types.ObjectId,ref:'competencias'}],
    createdAt: {type: Date, default: Date.now}



});
module.exports = mongoose.model('egresados', egresadosSchema);
