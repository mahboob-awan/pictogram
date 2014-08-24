	//$0.setAttributeNS(null,"transform","matrix(1.25 0 0 1.25 10 0)") === translate(10) && scale(1.25){where 1.25 is 25%.}

Editor = (function(){

	var transMatrix = [1, 0, 0, 1, 0, 0];
	var currentGroup, graphEditor;

	var height, width;
	var groups = [];
	var selectedImage;

	function init(event) {
		// if (window.svgDocument == null) {
		// 	svgDoc = event.target.ownerDocument;
		// }

		graphEditor = DOM.byId("graph-editor");
		width = graphEditor.getAttribute("width");
		height = graphEditor.getAttribute("height");

		bindUIActions();
	}

	function bindUIActions() {
		var images = DOM.byClass('editor-choice-img');

		images.forEach(function(image) {
			image.onclick = function(event) {
				selectedImage = event.target;
				selectImage(images, selectedImage);

			};
		});

		DOM.byId('i_b_draw').onclick = drawGraph;
	}


	function selectImage(images, selectedImage) {

		images.forEach(function(image) {
			DOM.removeClass(image, 'editor-choice-img-selected');
		});
		DOM.addClass(selectedImage, 'editor-choice-img-selected');
	}



	function pan(dx, dy) {
		var currentTarget = currentGroup || graphEditor;
		transMatrix[4] += dx;
		transMatrix[5] += dy;

		newMatrix = "matrix(" + transMatrix.join(' ') + ")";
		currentTarget.setAttributeNS(null, "transform", newMatrix);
	}

	function zoom(scale) {
		var currentTarget = currentGroup || graphEditor;

		for (var i = 0; i < transMatrix.length; i++) {
			transMatrix[i] *= scale;
		}

		transMatrix[4] += (1 - scale) * width / 2;
		transMatrix[5] += (1 - scale) * height / 2;

		newMatrix = "matrix(" + transMatrix.join(' ') + ")";
		currentTarget.setAttributeNS(null, "transform", newMatrix);
	}


	function createImage(name, position) {
		var size = 50;
		var options = {
			width: size,
			id: name +'-'+position,
			x: size * position,
			y: size * (groups.length + 1),
			name: 'svg/' + name + '.svg'
		};



		groups[groups.length-1]['images'].push(options);

		return SVG.createImage(options);
	}



	function getImageName(image) {
		var src = image.src;
		return src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
	}

	function drawGraph() {
		var ratio = DOM.byId('i_txt_ratio').value;
		var total = DOM.byId('i_txt_total').value;
		var image = DOM.byClass('editor-choice-img-selected')[0];

		//TODO: validation
		var totalImage = total / ratio;
		var imageName = getImageName(image);
		var group = createGroupElement(imageName, graphEditor);

		// for (var i = 1; i <= totalImage; i += 1) {
			// group.appendChild(createImage(imageName, i));
		Util.fetchXML(image.src, function(newSVGDoc) {
			for (var i = 1; i <= totalImage; i += 1) {
				group.innerHTML += getPath(newSVGDoc);
			}
		});

		// }
	}

	function getPath(svgDocument){
		return svgDocument.getElementsByTagName('svg')[0].innerHTML;
	}

	function createGroupElement(name, editor) {
		var options = {
			id: name + '-group-' + groups.length,
			images: []
		}

		var g = SVG.createGroup(options);
		groups.push(options);
		editor.appendChild(g);

		g.onclick = function(event) {
			currentGroup = event.currentTarget;

			Util.toArray(graphEditor.getElementsByClassName('group-rect-selected')).forEach(function(element){element.parentElement.removeChild(element);})

			//Workaround - can't apply border on group tag
			var images = Util.toArray(currentGroup.children);
			images.forEach(function(image){
				var options = {
					width: image.getAttribute('width'),
					height: image.getAttribute('height'),
					x: image.getAttribute('x'),
					y: image.getAttribute('y'),
					className: 'group-rect-selected'
				};

				g.appendChild(SVG.createRectangle(options));

			});

		};

		return g;
	}

	return {
		init: init
	}

}());

	window.onload= Editor.init;