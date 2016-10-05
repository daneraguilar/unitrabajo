
var estudios = require('../models/estudios');
var mongoose = require('mongoose');
var egresados = require('../models/egresados');
module.exports ={
	guardar : function(req,res){

	    var id=req.body._idcv;
         if(req.body._id){
         return res.json({message:"id no valido"});
         }
         if(!id){
           return res.json({message:"idcv no valido"});
         }

	   var  estudio= new estudios(req.body); 
	   egresados.findOne({_id:id},function(err,cv){
		if(err) {
                 return res.status(500).json({
                    message: 'Error error buscado cv.'
                 });
                 }
                 if(!cv){
                    return res.status(404).json({message : 'cv no encontrado'})
                 }

                estudio.save(function(err,e){
                if(err) {
                 return res.status(500).json({
                    message: 'Error error guaradando estudio.', err
                 });
                        }
                        cv.estudios.push(e._id);
                       cv.save(function(err,c){

                        if(err) {
                            return res.status(500).json({
                            message: 'Error error guaradando cv ', err
                         });
                        }
                        
                        return res.json(c);

                       });
                 
                          
               
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
     estudios.findOne({_id:id},function(err,estudio){
     	if(err){
     	       return res.status(500).json({
                    message: 'Error error modificando estudios.', 
                 });
 
                }
                if(!estudio){
                    return res.status(404).json({message:'estudio no encontrado'});
                }
     	       estudio.institucion = req.body.institucion;
     	       estudio.nivel = req.body.nivel;
     	       estudio.inicio = req.body.inicio;
     	       estudio.final = req.body.final;
     	       estudio.actualmente = req.body.actualmente;
     	       estudio.ciudad = req.body.ciudad;
     	          	       estudio.save(function(err,ex){
     	       	if(err){
     	       	return res.status(500).json({
                    message: 'Error guardado estudios.', err
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
                    message: 'Error eliminar cv estudios.', err
                 });

     	   }
           if(!cv){
            return res.status(404).json({message:'no se encontro cv'})
           }

     	  	estudios.findByIdAndRemove(id,function(err,data){
				if(err){
     	       return res.status(500).json({
                   message: 'Error error eliminar estudio.', err
                 });
     	               }
                            if(!data){
            return res.status(404).json({message:'no se encontro estudio'})
           }

 
     	       var index = cv.estudios.indexOf(id);
     	       if(index > -1){
     	       	cv.estudios.splice(index, 1);
     	       	cv.save(function(err,data){
               if(err){
               return res.status(500).json({
                   message: 'Error modificando cv.', err
                 });
                       }
                 
                });
     	       

               }
                return res.json(cv.estudios); 
               
                

		})


		})
	
	}

}