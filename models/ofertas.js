var mongoose =require('mongoose');
var Schema = mongoose.Schema;

 var ofertas = new Schema ({
 	inicio:{type:Date,required:true},
 	final :{type:Date,required:true},
 	perfil:{type:String ,requeried:true},
 	descripcion: {type:String ,requeried:true, lowercase: true},
 	vacantes:{type:Number, default :1 },
 	salario:{type:String,required:true},
 	contracto:{type:String , requeried:true, lowercase: true},
 	jornada :{type:String , requeried:true, lowercase: true},
 	pais:{type:String , requeried:true, lowercase: true},
 	departamento:{type:String , requeried:true, lowercase: true},
 	cuidad:{type:String , requeried:true, lowercase: true},
    aplicados:[{type: Schema.Types.ObjectId,ref:'egresados'}],
 	empresa : {type:Schema.Types.ObjectId,ref:'empresas',requeried:true},
 	educacion:{type:String },
 	experiencia:{type:String},
 	viajar :{type:String },
 	residencia:{type:String},
 	estado:{type:String ,default:"abierta"}
 	///hacer el controlador de ofertas

 });
 module.exports= mongoose.model('ofertas',ofertas);