DOM = (function() {

	'use strict';
	
	function byId(id){
		return document.getElementById(id);
	}

	function byClass(className){
		return Util.toArray(document.getElementsByClassName(className));
	}
	function addClass(element, classToAdd) {
		var currentClassValue = element.className;

		if (currentClassValue.indexOf(classToAdd) == -1) {
			if ((currentClassValue == null) || (currentClassValue === "")) {
				element.className = classToAdd;
			} else {
				element.className += " " + classToAdd;
			}
		}
	}

	function removeClass(element, classToRemove) {
		var currentClassValue = element.className;

		if (currentClassValue == classToRemove) {
			element.className = "";
			return;
		}

		var classValues = currentClassValue.split(" ");
		var filteredList = [];

		for (var i = 0; i < classValues.length; i++) {
			if (classToRemove != classValues[i]) {
				filteredList.push(classValues[i]);
			}
		}

		element.className = filteredList.join(" ");
	}

    return {
    	byId: byId,
    	byClass: byClass,
        addClass: addClass,
        removeClass: removeClass
    }

}());