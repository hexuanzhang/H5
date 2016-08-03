;
(function() {
	"use strict";
	let post = document.getElementById("post"),
		worker = new Worker("/webWorker/worker.js");

	post.addEventListener("click", () => {
		worker.postMessage({
			id: "1",
			createTime: new Date().toLocaleString(),
			updateTime: new Date().toLocaleString(),
			message: "hello world"
		})
	}, false);

	worker.addEventListener("message", (event) => {
		let data = event.data;
		console.dir(data);
		worker.terminate(); // 终止线程运行
	}, false);

	worker.addEventListener("error", (error) => {
		console.log(error.filename, error.lineno, error.message);
	});
})();