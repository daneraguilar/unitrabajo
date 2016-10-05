var egresados = require('../models/egresados');
var idiomas = require('../models/idiomas');
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
	     var  idioma = new idiomas(req.body); 
	     egresados.findOne({_id:id},function(err,cv){
		 if(err) {
                 return res.status(500).json({
                    message: 'Error  buscado cv.'
                 });
                 }

                idioma.save(function(err,e){
                if(err) {
                 return res.status(500).json({
                    message: 'Error error guaradando idioma.', err
                 });
                        }
                        cv.idiomas.push(e._id);
                       cv.save(function(err,c){

                        if(err) {
                            return res.status(500).json({
                            message: 'Error error guaradando cv form.', err
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

       idiomas.findOne({_id:id},function(err,idioma){
     	if(err){
     	       return res.status(500).json({
                    message: 'Error error modificando idioma.', 
                 });
 
                }
           if(!idioma){
            return res.status(404).json({messege:'idioma no encontrado'});
           }

     	       idioma.idioma = req.body.idioma;
     	       idioma.nivel = req.body.nivel;
     	     
     	          	       idioma.save(function(err,ex){
     	       	if(err){
     	       	return res.status(500).json({
                    message: 'Error error save exp.', err
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
                    message: 'Error error eliminar cv.', err
                 });

     	    }
             if(!cv){
            return res.status(404).json({messege:'cv no encontrado'});
            }
             if(!cv){
            return res.status(404).json({messege:'cv no encontrado'});
            }

     	  	idiomas.findByIdAndRemove(id,function(err,idioma){
				if(err){
     	       return res.status(500).json({
                   message: 'Error error eliminar idioma.', err
                 });
     	               }

                         if(!idioma){
            return res.status(404).json({messege:'idioma no encontrado'});
            }

 
     	       var index = cv.idiomas.indexOf(id);
     	       if(index > -1){
     	       	cv.idiomas.splice(index, 1);
     	       	cv.save(function(err,data){
               if(err){
               return res.status(500).json({
                   message: 'Error save cv.', err
                 });
                       }
                 
                });
     	       

               }
                return res.json(cv.idiomas); 
               
                

		})


		})
	
	}

}