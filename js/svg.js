SVG = (function() {
	'use strict';
	// Default namespaces
	var ns = "http://www.w3.org/2000/svg";
	var xlink = 'http://www.w3.org/1999/xlink';


	function createElement(tagName) {
		return document.createElementNS(ns, tagName);
	}


	function createImage(options) {
		var img = createElement('image');
		img.setAttribute('height', options.width);
		img.setAttribute('width', options.height || options.width);
		img.setAttribute('id', options.id);
		img.setAttribute('x', options.x);
		img.setAttribute('y', options.y);
		img.setAttributeNS(xlink, 'href', options.name);

		return img;
	}

	function createGroup(options, g) {
		var transform = '';
		g = g || createElement('g')

		g.setAttribute('id', options.id || '');
		g.setAttribute('shape-rendering', 'inherit');
		g.setAttribute('pointer-events', 'all');

		if (options.x) {
			transform += 'translate(' + options.x + ' ' + (options.y || options.x) + ')';
		}

		if (options.zoom) {
			transform += ' scale(' + options.zoom + ')';
		}

		g.setAttribute('transform', transform);


		return g;
	}

	function createRectangle(options) {
		var rect = createElement('rect');
		rect.setAttribute('x', options.x);
		rect.setAttribute('y', options.y);
		rect.setAttribute('height', options.width);
		rect.setAttribute('width', options.height);
		rect.setAttribute('class', options.className || ''); //'#' + Math.round(0xffffff * Math.random()).toString(16));
		return rect;
	}

	return {
		createImage: createImage,
		createRectangle: createRectangle,
		createGroup: createGroup
	};


}());