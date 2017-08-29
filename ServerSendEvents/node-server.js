const http = require("http");

http.createServer((req, res) => {
	let count = 0;
	
	// 设置 HTTP Status Code 与 HTTP Headers
	res.writeHead(200, {
		"Content-Type":"text/event-stream",
		"Cache-Control":"no-cache",
		"Connection":"keep-alive",
		"Access-Control-Allow-Origin": '*',
	});
	
	// 设定浏览器在连接断开后延迟多长时间重新建立连接，单位为 ms
	res.write("retry: 10000\n");
	
	// 通过 data 字段发送所要传输的数据，冒号后面的空格字符被忽略，必须以 \n\n 结束
	res.write(`data: ${new Date().toLocaleString()}\n\n`);
	
	const interval = setInterval(function () {
		res.write(`event: update\n`);
		res.write(`data: ${JSON.stringify({count: count++})}\n\n`);
	}, 1000);
	
	req.connection.addListener("close", function () {
		console.info('关闭连接');
		clearInterval(interval);
	}, false);
}).listen(1337, "127.0.0.1");