var empresas = require('../models/empresas');
var ofertas = require('../models/ofertas');
var egresados = require('../models/egresados');
var mongoose = require('mongoose');
module.exports = {
    todos: function(req, res, next) {

        // e =lsita de ofertas   ev = lista de egresado con 
        //hoja de vda integrada
        ofertas.find(function(err, e) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error error listando  egreados.',
                        err
                    });
                }



            })
            .populate([{
                path: 'aplicados',
                model: 'ofertas'
            }, ])
            .exec(function(err, ev) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encontro la cv.',
                        err
                    });
                }



                return res.json(ev);
            })


    },
    guardar: function(req, res, next) {
        var id = req.body._idcv;
        if (req.body._id) {
            return res.json({ message: "id no valido" });
        }
        if (!id) {
            return res.json({ message: "idcv no valido" });
        }

        var oferta = new ofertas(req.body);
        empresas.findOne({ _id: id }, function(err, empresa) {

                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encuentra empresa .',
                        err
                    });
                }
                if (!empresa) {
                    return res.status(404).json({ message: 'empresa no encontrado' });
                }

                //////////////////////////////////////
                oferta.save(function(err, e) {
                    if (err) {

                        return res.status(500).json({
                            message: 'Error guaradando la oferta laboral.',
                            err
                        });

                    }
                    empresa.ofertas.push(e._id);
                    empresa.save();



                })

            }).populate([{
                    path: 'ofertas',
                    model: 'ofertas'
                },
                { path: 'competencias', model: 'competencias' },
                { path: 'estudios', model: 'estudios' },
                { path: 'ofertas', model: 'ofertas' }

            ])
            .exec(function(err, ev) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encontro la empresa.',
                        err
                    });
                }



                return res.json(ev);
            })

    },
    buscarID: function(req, res, next) {

        var _id = req.params._id;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.json({ message: "id no valido" });
        }



        ofertas.findById({ _id: _id }, function(err, e) {
                if (err) {

                    return res.status(404).json({
                        message: 'Error no se encuentra al  egresado .',
                        err
                    });


                }
                if (!e) {
                    return res.json({
                        message: 'Error no se encuent egresado .'
                    });
                }


            }).populate([{
                    path: 'aplicados',
                    model: 'egresados'
                },


            ])
            .exec(function(err, ev) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encontro la cv.',
                        err
                    });
                }



                return res.json(ev);
            })
    },
    modificar: function(req, res, next) {
        if (!req.params._id) {
            return res.json({ message: "id no valido" });
        }
        var id = req.params._id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: "id no valido" });
        }
        if (!req.body._idcv) {
            return res.json({ message: "idcv no valido" });
        }

        ofertas.findOne({ _id: id }, function(err, oferta) {
            if (err) {
                return res.status(500).json({
                    message: 'Error error modificando oferta laboral.',
                    err
                });

            }
            if (!oferta) {
                return res.status(404).json({ message: 'oferta no encontrada' });
            }
            /////////////////////// modificar estos campos////
            oferta.inicio = req.body.inicio;
            oferta.final = req.body.final;
            oferta.perfil = req.body.perfil;
            oferta.descripcion = req.body.descripcion;
            oferta.vacantes = req.body.vacantes;
            oferta.salario = req.body.salario;
            oferta.contracto = req.body.contracto;
            oferta.jornada = req.body.jornada;
            oferta.pais = req.body.pais;
            oferta.departamento = req.body.departamento;
            oferta.cuidad = req.body.cuidad;
            oferta.educacion = req.body.educacion;
            oferta.experiencia = req.body.experiencia;
            oferta.residencia = req.body.residencia;
            oferta.viajar = req.body.viajar;
            oferta.estado = req.body.estado;


            ///////////////////////////// 
            oferta.save(function(err, ex) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error error modficando oferta laboral.',
                        err
                    });
                }
                return res.json(ex);

            })
        })


    },
    eliminar: function(req, res, next) {

        if (!req.params._id) {
            return res.json({ message: "id no valido" });
        }

        if (!req.body._idcv) {
            return res.json({ message: "idcv no valido" });
        }

        var id = req.params._id;
        var idcv = req.body._idcv;



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: "id no valido" });
        }
        if (!mongoose.Types.ObjectId.isValid(idcv)) {
            return res.json({ message: "idcv no valido" });
        }


        empresas.findOne({ _id: idcv }, function(err, empresa) {
            if (err) {
                return res.status(500).json({
                    message: 'Error no se encuentra  empresa.',
                    err
                });
            }
            if (!empresa) {
                return res.json({ message: 'no se encontro empresa' })
            }
            ofertas.findByIdAndRemove(id, function(err, data) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error al eliminar oferta.',
                        err
                    });
                }
                if (!data) {
                    return res.status(404).json({ message: 'no se encontro oferta' })
                }

                var index = empresa.ofertas.indexOf(id);
                if (index > -1) {
                    empresa.ofertas.splice(index, 1);
                    empresa.save(function(err, data) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error actualizando  empresa.',
                                err
                            });
                        }
                        return res.json(data);

                    });


                }
                return res.json(data);

            })


        })

    },
    aplicar: function(req, res, next) {
        if (!req.params._id) {
            return res.json({ message: "id no valido" });
        }

        if (!req.body._idcv) {
            return res.json({ message: "idcv no valido" });
        }

        var id = req.params._id;
        var idcv = req.body._idcv;



        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({ message: "id no valido" });
        }
        if (!mongoose.Types.ObjectId.isValid(idcv)) {
            return res.json({ message: "idcv no valido" });
        }
        ofertas.findById({ _id: id },
            function(err, oferta) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error no se encuentra  oferta.',
                        err
                    });
                }
                if (!oferta) {
                    return res.json({ message: 'no se encontro oferta' })
                }




                egresados.findOne({ _id: idcv },
                    function(err, egresado) {
                        if (err) {
                            return res.status(500).json({
                                message: 'Error no se encuentra  egresadoo.',
                                err
                            });
                        }
                        if (!egresado) {
                            return res.json({ message: 'no se encontro egresado' })
                        }
                        var index = oferta.aplicados.indexOf(egresado._id);
                        if (index > -1) {
                            return res.json({ message: 'egresado ya se encuentra aplicado' })
                        }

                        oferta.aplicados.push(egresado._id);
                        egresado.aplicaciones.push(oferta._id);
                        oferta.save();
                        egresado.save();

                        return res.json(oferta);

                        //  next();
                    })



            })

    }


}
