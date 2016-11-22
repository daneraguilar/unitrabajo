
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var egresadosSchema = new Schema({


	cc:{ type: String, lowercase: true, unique: true  },
	tipo:{ type: String, lowercase: true},
	disponiblidad :{ type: String, lowercase: true },
	graduacion :{ type: Date, lowercase: true},
	Fecha_Nac:{ type: Date, },
	email2:{ type: String, lowercase: true},
	direccion:{ type: String, lowercase: true},
	ciudad:{ type: String, lowercase: true},
	departamento:{ type: String, lowercase: true},
	pais:{ type: String, lowercase: true},

	///////// ---------   old --------- ///////////
	
	email:{ type: String, lowercase: true, required: true , index:true, unique: true  },
	password:{ type: String,  required: true },
	nombres :{ type: String, lowercase: true, required: true },
	apellidos :{ type: String, lowercase: true, required: true },
	sexo :{ type: String, lowercase: true, required: true },
	telefono :{ type: Number, lowercase: true, required: true },
    experiencias :[{type: Schema.Types.ObjectId,ref:'experiencias'}],
	estudios :[{type: Schema.Types.ObjectId,ref:'formaciones'}],
	idiomas:[{type: Schema.Types.ObjectId,ref:'idiomas'}],
	competencias:[{type: Schema.Types.ObjectId,ref:'competencias'}],
	aplicaciones:[{type: Schema.Types.ObjectId,ref:'ofertas'}],
    createdAt: {type: Date, default: Date.now}



   
	



});
module.exports = mongoose.model('egresados', egresadosSchema);
