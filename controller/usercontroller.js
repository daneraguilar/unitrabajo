var egresados = require('../models/egresados');
var cvs = require('../models/cvs');
var experiencias = require('../models/experiencias');
var estudios = require('../models/estudios');
var idiomas= require('../models/idiomas');
var competencias = require('../models/competencias');
var mongoose= require('mongoose');

module.exports={
   todos: function(req, res,next) {
       
      // e =lsita de egresados   ev = lista de egresado con 
       //hoja de vda integrada
        egresados.find(function(err, e){
            if(err) {
                return res.status(500).json({
                    message: 'Error error listando  egreados.',err
                });
            }
            
           
            
        })
         .populate([{
          path:'idiomas',model:'idiomas'},
          {path:'competencias',model:'competencias'},
          {path:'estudios',model:'estudios'},
          {path:'experiencias',model:'experiencias'}

          ])
        .exec(function(err,ev){
            	  if(err) {
                return res.status(500).json({
                       message: 'Error no se encontro la cv.',err
                       });
                }
              
              

             return res.json(ev);
            })

         
    },
    guardar : function(req,res,next){
         
        if(req.body._id){
        return res.json({message:"id no valido"});
         }
    
      	var egresado = new egresados(req.body);
      	egresado.save(function(err,user){
    		if(err){
    			 return res.status(500).json({
                    message: 'Error guardando egresado.',err
                });
             

    		}

    		
           
           return res.json(user);
    		});
 
   		   		
        
     },
    buscarID : function(req,res,next){

      var _id =req.params._id;
     if(!mongoose.Types.ObjectId.isValid(_id)){
      return res.json({message:"id no valido"});
     }


      
    	egresados.findById({_id : _id },function(err,e){
    			if(err ){

    				   return res.status(404).json({
                       message: 'Error no se encuentra al  egresado .',err
                       });

                       
        				}  
            if(!e){
                return res.json({
                       message: 'Error no se encuent egresado .'
                       });
            }    
           				

    	})    .populate([{
          path:'idiomas',model:'idiomas'},
          {path:'competencias',model:'competencias'},
          {path:'estudios',model:'estudios'},
          {path:'experiencias',model:'experiencias'}

          ])
        .exec(function(err,ev){
                if(err) {
                return res.status(500).json({
                       message: 'Error no se encontro la cv.',err
                       });
                }
              
              

             return res.json(ev);
            })
    },
    modificar : function(req,res){
         var id =req.params._id;
          if(!mongoose.Types.ObjectId.isValid(id)){
          return res.json({message:"id no valido"});
           }
           egresados.findOne({_id : id},function(err,e){
    			if(err){
    				   return res.status(500).json({
                       message: 'Error  egresado no encontrado.',err
                       });
                       
        				} 
                 if(!e){
            return res.json({message:'egresado no encontrado'});
           } 
        				e.email = req.body.email;
        				e.nombres = req.body.nombres;
        				e.apellidos = req.body.apellidos;
        				e.password = req.body.password;
                e.telefono= req.body.telefono;
                e.sexo = req.body.sexo;
        				e.save(function(err,m){
        					if(err){
        					 return res.status(500).json({
        					
                  message: 'Error al modificar egresado.',err
                             });
        					}
        					return res.json(e);



        				});
           				

           });    
   },
    eliminar : function(req,res){
       var id =req.params._id;
          if(!mongoose.Types.ObjectId.isValid(id)){
          return res.json({message:"id no valido"});
                   }
           
           	cvs.findByIdAndRemove(id,function(err,r){
              		if(err){
                        return res.status(500).json({
                					
                        message: 'Error al buscar cv.',err
                                     });
                		}
                     if(!r){
            return res.status(404).json({messege:'cv no encontrado'});
           }
              for(e in r.empresas){
                experiencias.findByIdAndRemove(e);
              }
                for(e in r.estudios){
                estudios.findByIdAndRemove(e);
              }
                for(e in r.estudios){
                idiomas.findByIdAndRemove(e);
              }
                for(e in r.estudios){
                competencias.findByIdAndRemove(e);
              }


           	egresados.findByIdAndRemove(id,function(err,re){
           		if(err){
                		return res.status(500).json({
                				
                        message: 'Error egresado no encontrado .',err
                           });
                		}
                     if(!idioma){

            return res.json({message:'usuario no encontrado'});
           }
                		return res.json(re);
        		
   	})
        		
   	})

   },
   auth: function(req,res,next){
  console.log(req.body);
     if(!req.body.email || !req.body.password ){
      return res.status(500).json({message:"no valido"});
     }
     egresados.findOne({email:req.body.email,password:req.body.password},function(err,data){
       if(err){
   return res.status(500).json({message:'error al autenticar egresado'});
               }
                if(!data){

                 
               }

                       
     })   .populate([{
          path:'idiomas',model:'idiomas'},
          {path:'competencias',model:'competencias'},
          {path:'estudios',model:'estudios'},
          {path:'experiencias',model:'experiencias'}

          ])
        .exec(function(err,ev){
                if(err) {
                return res.status(500).json({
                       message: 'Error no se encontro la cv.',err
                       });
                }
              
              

             return res.json(ev);
            })

   }


}
 

