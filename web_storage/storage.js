"use strict";
const {
	localStorage,
	JSON
} = window;
const storage = {
	isSupported: (function() {
		let _isSupport = true;
		try {
			localStorage.setItem("__storage__", 1);
			localStorage.removeItem("__storage__");
		} catch (e) {
			// 1.不支持
			// 2.隐私模式
			// 3.localstorage已写满
			_isSupport = false;
		}
		return _isSupport;
	})(),

	set(key, val = {}) {
		let _value = JSON.stringify(val);
		storage.isSupported && localStorage.setItem(key, _value);
	},

	get(key) {
		const _value = storage.isSupported ? localStorage.getItem(key) : null;
		return _value === null ? {} : JSON.parse(_value);
	},

	remove(...keys) {
		storage.isSupported && keys.forEach((key) => localStorage.removeItem(key));
	},

	clear() {
		storage.isSupported && localStorage.clear();
	}
}