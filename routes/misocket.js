
var i =0;
var ioapp;
exports.connection= function(io){
	ioapp=io;
	
	io.on('connect',function(s){
		console.log("conetado")
       s.on('daner',function(data){
       	io.emit('daner',data);
       });
       s.on('d',function(d){

		io.emit('daner',d);
	});
	})



}
exports.io=ioapp;