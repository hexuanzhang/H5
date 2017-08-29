if (window.EventSource) {
	const eventSource = new EventSource('http://127.0.0.1:1337');
	
	eventSource.addEventListener('open', _ => {
		console.info('建立连接');
	}, false);
	
	eventSource.addEventListener('close', _ => {
		console.info('连接关闭');
	}, false);
	
	eventSource.addEventListener('error', error => {
		console.info('连接异常', error);
	}, false);
	
	eventSource.addEventListener('message', event => {
		console.dir(event);
		document.getElementById('message').innerHTML = event.data;
	}, false);
	
	eventSource.addEventListener('update', event => {
		const data = JSON.parse(event.data);
		
		console.dir(event);
		document.getElementById('result').innerHTML = data.count;
	}, false);
	
	document.getElementById('btn').addEventListener('click', _ => {
		console.info('准备关闭连接');
		eventSource.close();
		console.dir(eventSource);
	});
} else {
	// 使用 Polyfill 或其他兼容处理
}