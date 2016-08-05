;
(() => {
	"use strict";

	let ports = [];
	self.addEventListener("connect", (e) => {
		let port = e.ports[0];
		ports.push(port);
		self.console.log("connect");

		port.addEventListener("message", (e) => {
			for (let i in ports) {
				ports[i].postMessage(e.data);
			}
		}, false);
		port.start(); //当使用addEventListener绑定onmessage事件时，需要显示的调用start()方法

		/* 绑定onmessage事件时，会隐式的调用post.start()方法 */
		// port.onmessage = (e) => { 
		// 	for (let i in ports) {
		// 		ports[i].postMessage(e.data);
		// 	}
		// };

	}, false);
})();