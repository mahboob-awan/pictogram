Util = (function() {
	'use strict';

	function toArray(noneArrayObject) {
		return Array.prototype.slice.apply(noneArrayObject);
	}

	function fetchXML(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);
		xhr.onreadystatechange = function(evt) {
			//Do not explicitly handle errors, those should be
			//visible via console output in the browser.
			if (xhr.readyState === 4) {
				callback(xhr.responseXML);
			}
		};
		xhr.send(null);
	};

	return {
		fetchXML: fetchXML,
		toArray: toArray
	};

}());