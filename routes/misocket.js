
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
       var data ={name:d,ap:"desde socket"};
		io.emit('daner',data);
	});
	})



}
exports.io=ioapp;