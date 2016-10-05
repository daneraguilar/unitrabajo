var cvs = require('../models/cvs');
var egresados = require('../models/egresados');
var experiencias = require('../models/experiencias');
var mongoose = require('mongoose');
module.exports ={
	guardar : function(req,res){
     var id=req.body._idcv;
         if(req.body._id){
         return res.json({message:"id no valido"});
         }
         if(!id){
           return res.json({message:"idcv no valido"});
         }

    	var  experiencia= new experiencias(req.body); 
	 egresados.findOne({_id:id},function(err,cv){
		if(err) {
                 return res.status(500).json({
                    message: 'Error no se encuentra cv .',err
                 });
                 }
          if(!cv){
            return res.status(404).json({message:'cv no encontrado'});
          }  
           //////////////////////////////////////
                experiencia.save(function(err,e){
                if(err) {
                 return res.status(500).json({
                    message: 'Error guaradando la experiencia laboral.', err
                 });
                        }
                        cv.experiencias.push(e._id);
                       cv.save();
                       return res.json(cv);   
                          
               
                })    

	 })

	},
	modificar: function(req,res){
           if(!req.params._id){
           return res.json({message:"id no valido"});
          }
          var id =req.params._id;
         if(!mongoose.Types.ObjectId.isValid(id)){
         return res.json({message:"id no valido"});
         }
        
         experiencias.findOne({_id:id},function(err,experiencia){
        	if(err){
     	       return res.status(500).json({
                    message: 'Error error modificando experiencia laboral.', err
                 });

                }
          if(!experiencia){
            return res.status(404).json({message:'experiencia no encontrada'});
          }        
     	       experiencia.empresa = req.body.empresa;
     	       experiencia.cargo = req.body.cargo;
     	       experiencia.inicio = req.body.inicio;
     	       experiencia.final = req.body.final;
     	       experiencia.actualmente = req.body.actualmente;
     	       experiencia.ciudad = req.body.ciudad;
     	       experiencia.funcion = req.body.funcion;
     	       experiencia.save(function(err,ex){
     	       	if(err){
     	       	return res.status(500).json({
                    message: 'Error error modficando experiencia laboral.', err
                 });
     	       }
     	       	return res.json(ex);

     	       })
       })
 

	},
	eliminar: function(req,res){

        if(!req.params._id){
         return res.json({message:"id no valido"});
         }
             if(!req.body._idcv){
         return res.json({message:"idcv no valido"});
         }
          var id =req.params._id;
          var idcv =req.body._idcv;
         if(!mongoose.Types.ObjectId.isValid(id)){
         return res.json({message:"id no valido"});
         }
          if(!mongoose.Types.ObjectId.isValid(idcv)){
         return res.json({message:"idcv no valido"});
         }


		egresados.findOne({_id :idcv},function(err,cv){
			if(err){
     	       return res.status(500).json({
                    message: 'Error no se encuentra  cv.', err
                 });
     	   }
             if(!cv){
            return res.status(404).json({message:'no se encontro cv'})
           }
     	  	experiencias.findByIdAndRemove(id,function(err,data){
				if(err){
     	       return res.status(500).json({
                   message: 'Error al eliminar experiencia.', err
                 });
     	   }
                           if(!data){
            return res.status(404).json({message:'no se encontro experiencia'})
           }

     	       var index = cv.experiencias.indexOf(id);
     	       if(index > -1){
     	       	cv.experiencias.splice(index, 1);
     	       	cv.save(function(err,data){
     	       		  if(err){
               return res.status(500).json({
                   message: 'Error actualizando  cv.', err
                 });
                       }

     	       	});
     	     

               }
                  return res.json(cv.experiencias);

		})


		})
	
	}

}