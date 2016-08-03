;
(function() {
	"use strict";

	console.log("worker.js loaded", new Date().toLocaleString());
	importScripts("/webWorker/extra.js", "/webWorker/new.js");

	// 方式一
	// onmessage = function(event) {
	// 	let data = event.data;
	// 	data.message = "hello from worker.js";
	// 	data.updateTime = new Date().toLocaleString();
	// 	postMessage(data);
	// }

	// 方式二
	// self.addEventListener("message", function(event) {
	// 	let data = event.data;
	// 	data.message = "hello from worker.js";
	// 	data.updateTime = new Date().toLocaleString();
	// 	postMessage(data);
	// 	self.close(); // 终止线程运行
	// });


	// 方式三
	addEventListener("message", function(event) {
		let data = event.data;
		data.message = "hello from worker.js";
		data.updateTime = new Date().toLocaleString();
		postMessage(data);
		this.close(); // 终止线程运行
	});

})();