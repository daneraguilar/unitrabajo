var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var empresasSchema = new Schema({
	nit:{ type: String,  required: true, lowercase: true , unique: true },
	email:{ type: String, lowercase: true, required: true , index:true, unique: true  },
	password:{ type: String,  required: true },
	nombre:{ type: String,  required: true, lowercase: true },
	razon:{ type: String,  required: true, lowercase: true },
	representante :{ type: String, lowercase: true, required: true },
	direccion :{ type: String, lowercase: true, required: true },
	pais :{ type: String, lowercase: true, required: true },
	departamento:{ type: String, lowercase: true, required: true },
	cuidad :{ type: String, lowercase: true, required: true },
	sector :{ type: String, lowercase: true, required: true },
	tipo :{ type: String, lowercase: true, required: true },
	pagina :{ type: String, lowercase: true, required: true },
	telefono :{ type: Number, lowercase: true, required: true },
	ofertas:[{type: Schema.Types.ObjectId,ref:'ofertas'}],
    createdAt: {type: Date, default: Date.now}



});
module.exports = mongoose.model('empresas', empresasSchema);