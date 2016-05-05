/**
 * firefox 1-9:unsupport, 10-17:需添加moz前缀
 * chrome 1-13:unsupport, 14-32:需添加webkit前缀
 * opera 15-19:需添加webkit前缀
 * android 4.4-4.4.4:需添加webkit前缀
 */
;
(function(window, document, undefined) {
	"use strict";

	w.pageVisibility = (function() {
		var sPrefixSupport = ""; //前缀

		function keyWithPrefix(prefix, key) {
			if (prefix !== "") {
				// 首字母大写
				return prefix + key.slice(0, 1).toUpperCase() + key.slice(1);
			}
			return key;
		};
		var isPageVisibilitySupport = (function() {
			var bSupport = false;
			if (typeof window.screenX === "number") {
				["webkit", "moz", ""].forEach(function(prefix) {
					if (bSupport == false && document[keyWithPrefix(prefix, "hidden")] != undefined) {
						sPrefixSupport = prefix;
						bSupport = true;
					}
				});
			}
			return bSupport;
		})();

		function isHidden() {
			if (isPageVisibilitySupport) {
				return document[keyWithPrefix(sPrefixSupport, "hidden")];
			}
			return undefined;
		};

		function getVisibilityState() {
			if (isPageVisibilitySupport) {
				return document[keyWithPrefix(sPrefixSupport, "visibilityState")];
			}
			return undefined;
		};

		return {
			hidden: isHidden(),
			visibilityState: getVisibilityState(),
			visibilitychange: function(fn, usecapture) {
				usecapture = usecapture || false;
				if (isPageVisibilitySupport && typeof fn === "function") {
					return document.addEventListener(sPrefixSupport + "visibilitychange", function(e) {
						this.hidden = isHidden();
						this.visibilityState = getVisibilityState();
						fn.call(this, e);
					}.bind(this), usecapture);
				}
				return undefined;
			}
		};
	})();
})(window, document);