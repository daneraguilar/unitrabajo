var mongoose = require('mongoose');
 var Schema=mongoose.Schema;

var cvs = new Schema({
	experiencias :[{type: Schema.Types.ObjectId,ref:'experiencias'}],
	estudios :[{type: Schema.Types.ObjectId,ref:'formaciones'}],
	idiomas:[{type: Schema.Types.ObjectId,ref:'idiomas'}],
	competencias:[{type: Schema.Types.ObjectId,ref:'competencias'}]
});

module.exports = mongoose.model('cvs',cvs);