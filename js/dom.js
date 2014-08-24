DOM = (function() {

	'use strict';

	function byId(id) {
		return document.getElementById(id);
	}

	function byClass(className) {
		return Util.toArray(document.getElementsByClassName(className));
	}

	function firstByClass(className) {
		return byClass(className)[0];
	}

	function addClass(element, classToAdd) {
		var currentClassValue = element.getAttribute('class') || '';

		if (currentClassValue.indexOf(classToAdd) == -1) {
			element.setAttribute('class', currentClassValue + " " + classToAdd);
		}

	}

	function removeClass(element, classToRemove) {
		var currentClassValue = element.getAttribute('class') || '';

		if (currentClassValue == classToRemove) {
			element.setAttribute('class', '');
			return;
		}

		var classValues = currentClassValue.split(" ");
		var filteredList = [];

		for (var i = 0; i < classValues.length; i++) {
			if (classToRemove != classValues[i]) {
				filteredList.push(classValues[i]);
			}
		}

		element.setAttribute('class', filteredList.join(" "));
	}

	function empty(selector) {
		var element = (typeof selector === 'string') ? document.getElementById(selector) : selector;
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}

	return {
		byId: byId,
		firstByClass: firstByClass,
		byClass: byClass,
		addClass: addClass,
		removeClass: removeClass,
		empty: empty

	}

}());