var egresados = require('../models/egresados');
var competencias = require('../models/competencias');
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
	     var  competencia= new competencias(req.body); 
	     egresados.findOne({_id:id},function(err,cv){
		 if(err) {
                 return res.status(500).json({
                    message: 'Error  buscado cv.'
                 });
                 }

                competencia.save(function(err,e){
                if(err) {
                 return res.status(500).json({
                    message: 'Error error guaradando competencia.', err
                 });
                        }
                        cv.competencias.push(e._id);
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

         competencias.findOne({_id:req.body._id},function(err,competencia){
     	 if(err){
     	       return res.status(500).json({
                    message: 'Error error modificando exp.', 
                 });
 
                }
                 if(!competencia){
            return res.status(404).json({messege:'competencia no encontrado'});
           }
     	       competencia.competencia = req.body.competencia;
     	      
     	     
     	          	       competencia.save(function(err,ex){
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

     	  	competencias.findByIdAndRemove(id,function(err,competencia){
				if(err){
     	       return res.status(500).json({
                   message: 'Error error eliminar competencia.', err
                 });
     	               }
                         if(!competencia){
            return res.status(404).json({messege:'competencia no encontrado'});
           }

 
     	       var index = cv.competencias.indexOf(id);
     	       if(index > -1){
     	       	cv.competencias.splice(index, 1);
     	       	cv.save(function(err,data){
               if(err){
               return res.status(500).json({
                   message: 'Error save cv.', err
                 });
                       }
                 return res.json(data);
                });
     	       

               }
                 
               
                

		})


		})
	
	}

}