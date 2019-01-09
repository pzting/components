var http=require("http");//引入一个模块
var fs=require('fs');//引入文件系统模块
var ws=require('socket.io');//
const path = require('path')

var server=http.createServer(function(req,res){//请求，发送
	var html=fs.readFileSync("./chat.html");//
	res.end(html);
	var css=fs.readFileSync(path.resolve(__dirname, 'web'));//
	res.end(css);
}).listen(3000);//创建服务器

var io=ws(server);//websocket服务器

io.on('connection',function(socket){//socket可以看成客户端
	
	console.log('进来了')
	
	socket.on('message',function(obj){//obj 所有已经建立连接的对象
		console.log(obj)
		io.emit('message',obj);//发送消息
	})
});//监听事件