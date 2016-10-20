var empresas = require('../models/empresas');

var mongoose= require('mongoose');

module.exports={
   todos: function(req, res,next) {
       
      // e =lsita de empresas   ev = lista de empresa con 
       //hoja de vda integrada
        empresas.find(function(err, e){
            if(err) {
                return res.status(500).json({
                    message: 'Error error listando  egreados.',err
                });
            }
            
           
             
            
        }).populate({path:'ofertas' ,model:'ofertas' }) .exec(function(err, ev) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encontro la empresa.',
                        err
                    });
                }



                return res.json(ev);
            })
      

         
    },
    guardar : function(req,res,next){
         
        if(req.body._id){
        return res.json({message:"id no valido"});
         }
    
      	var empresa = new empresas(req.body);
      	empresa.save(function(err,user){
    		if(err){
    			 return res.status(500).json({
                    message: 'Error guardando empresa.',err
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


      
    	empresas.findById({_id : _id },function(err,e){
    			if(err ){

    				   return res.status(404).json({
                       message: 'Error no se encuentra al  empresa .',err
                       });

                       
        				}  
            if(!e){
                return res.json({
                       message: 'Error no se encuent empresa .'
                       });
            }    
           				

    	})  .populate({path:'ofertas' ,model:'ofertas' }) .exec(function(err, ev) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encontro la empresa.',
                        err
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
           empresas.findOne({_id : id},function(err,e){
    			if(err){
    				   return res.status(500).json({
                       message: 'Error  empresa no encontrado.',err
                       });
                       
        				} 
                 if(!e){
            return res.json({message:'empresa no encontrado'});
           } 
        				e.email = req.body.email;
        				e.nombre = req.body.nombre;
        				e.nit = req.body.nit;
        				e.password = req.body.password;
                e.telefono= req.body.telefono;
                e.razon = req.body.razon;
                e.representante= req.body.representante;
                e.direccion = req.body.direccion;
                e.pais = req.body.pais;
                e.departamento = req.body.departamento;
                e.cuidad = req.body.cuidad;
                e.sector = req.body.sector;
                e.pagina = req.body.pagina;
                e.tipo = req.body.tipo;
                e.relefono = req.body.telefono;

        				e.save(function(err,m){
        					if(err){
        					 return res.status(500).json({
        					
                  message: 'Error al modificar empresa.',err
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
           
           // 	cvs.findByIdAndRemove(id,function(err,r){
           //    		if(err){
           //              return res.status(500).json({
                					
           //              message: 'Error al buscar cv.',err
           //                           });
           //      		}
           //           if(!r){
           //  return res.status(404).json({messege:'cv no encontrado'});
           // }
              
              //   for(e in r.estudios){
              //   competencias.findByIdAndRemove(e);
              // }


           	empresas.findByIdAndRemove(id,function(err,re){
           		if(err){
                		return res.status(500).json({
                				
                        message: 'Error empresa no encontrado .',err
                           });
                		}
           
                		return res.json(re);
        		
   	})
        		
   

   },
   auth: function(req,res,next){
  
     if(!req.body.email || !req.body.password ){
      return res.status(500).json({message:"no valido"});
     }
     empresas.findOne({email:req.body.email,password:req.body.password},function(err,data){
       if(err){
   return res.status(500).json({message:'error al autenticar empresa'});
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
 
