	//$0.setAttributeNS(null,"transform","matrix(1.25 0 0 1.25 10 0)") === translate(10) && scale(1.25){where 1.25 is 25%.}

	Editor = (function() {

		'use strict';
		var transMatrix = [1, 0, 0, 1, 0, 0];
		var currentGroup, graphEditor;

		var height, width;
		var groups = [];

		var selectedImage;
		var selectedColor;
		var selectedGroup;

		var IMAGE_WIDTH = 28;
		var IMAGE_HEIGHT = 30;



		function init(event) {

			graphEditor = DOM.byId("graph-editor");
			width = graphEditor.getAttribute("width");
			height = graphEditor.getAttribute("height");

			bindUIActions();
		}

		function bindUIActions() {
			//Images Control
			var images = DOM.byClass('editor-choice-img');

			images.forEach(function(image) {
				image.addEventListener('click', function(event) {
					selectedImage = event.target;
					selectElement(images, selectedImage, 'editor-choice-img-selected');

				});
			});

			//Colors Control
			var colors = DOM.byClass('editor-choice-color');
			colors.forEach(function(color) {
				color.addEventListener('click', function(event) {
					selectedColor = event.target;
					selectElement(colors, selectedColor, 'editor-choice-color-selected');

				});
			});


			//Buttons
			DOM.byId('i_b_draw').onclick = drawGraph;
			DOM.byId('i_b_update').onclick = updateGraph;
		}


		function selectElement(elements, selected, className) {
			elements.forEach(function(element) {
				DOM.removeClass(element, className);
			});
			DOM.addClass(selected, className);
		}

		function setColor(value) {
			var element = DOM.firstByClass(value);
			var colors = DOM.byClass('editor-choice-color');
			var targetColor;

			colors.forEach(function(colorElement) {
				var rdbValue = window.getComputedStyle(colorElement).getPropertyValue("background-color");
				if (rdbValue === value) {
					targetColor = colorElement;
				}
			})
			selectElement(colors, targetColor, 'editor-choice-color-selected');
		}

		function getColor() {
			var colorElement = window.getComputedStyle(DOM.firstByClass('editor-choice-color-selected'))
			if (colorElement) {
				return colorElement.getPropertyValue("background-color");
			}
			return "rgb(26, 188, 156)"; //return first color from list

		}

		function setImage(image) {
			var images = DOM.byClass('editor-choice-img');
			var targetImage;


			//TODO - may be remove
			images.forEach(function(imageElement) {
				if (imageElement.src === image.src) {
					targetImage = image;
				}
			});
			selectElement(images, targetImage, 'editor-choice-img-selected');
		}

		function getImage() {
			return DOM.firstByClass('editor-choice-img-selected')
		}

		function setX(value) {
			DOM.byId('x-axis').value = value;
		}

		function getX() {
			return DOM.byId('x-axis').value;
		}

		function setY(value) {
			DOM.byId('y-axis').value = value;
		}

		function getY() {
			return DOM.byId('y-axis').value;
		}

		function setZoom(value) {
			DOM.byId('zoom-axis').value = value;
		}

		function getZoom() {
			return DOM.byId('zoom-axis').value;
		}

		function getRatio() {
			return DOM.byId('i_txt_ratio').value;
		}

		function setRatio(value) {
			DOM.byId('i_txt_ratio').value = value;
		}

		function setTotal(value) {
			DOM.byId('i_txt_total').value = value;
		}

		function getTotal() {
			return DOM.byId('i_txt_total').value;
		}

		function getControls() {
			var controls = {};

			controls.image = getImage();
			//TODO null handling
			controls.color = getColor();

			controls.ratio = getRatio();
			controls.total = getTotal();
			controls.x = getX();
			controls.y = getY();
			controls.zoom = getZoom();

			return controls;

		}

		function setControls(controls) {
			setImage(controls.image);
			setColor(controls.color);
			setRatio(controls.ratio);
			setTotal(controls.total);
			setX(controls.x);
			setY(controls.y);
			setZoom(controls.zoom);
		}


		function updateGroup(controls, selectedGroup) {

			var group = createGroup(controls.x, controls.y, controls.zoom, selectedGroup);
			updateCache(controls);


			group = insertImages(group, controls);

			if (!group) {
				return;
			}
			bindUIActionWithGroup(group);

			return group;


		}

		function updateCache(controls) {
			if (selectedGroup) {
				groups[selectedGroup.id.substring(6)] = controls;
			}
			groups.push(controls);
		}

		function getControlsFromCache(group) {
			return groups[group.id.substring(6)]; //if "group-0" then "group-".length === 6
		}



		function insertImages(group, controls) {
			DOM.empty(group);
			if (!controls.image) {
				return;
			}

			Util.fetchXML(controls.image.src, function(svgDocument) {
				var totalImages = controls.total / controls.ratio;
				var path = svgDocument.getElementsByTagName('svg')[0].children[0];

				for (var i = 1; i <= (totalImages); i += 1) {
					group.appendChild(getDuplicatePath(path, i, controls.color));
				}
			});

			return group;
		}

		function drawGraph() {

			var group = updateGroup(getControls());
			graphEditor.appendChild(group);
		}

		function updateGraph() {
			var group = updateGroup(getControls(), selectedGroup);
			if (group) {
				graphEditor.appendChild(group);
			}

		}

		function getDuplicatePath(path, index, color) {
			var temp = path.cloneNode(true);
			temp.setAttribute('fill', color);
			temp.setAttribute('transform', 'translate(' + index * IMAGE_WIDTH + ')');
			return temp;
		}

		function bindUIActionWithGroup(group) {
			group.addEventListener('click', function(event) {
				selectedGroup = event.currentTarget;
				selectElement(Util.toArray(graphEditor.children), selectedGroup, 'editor-group-selected');
				setControls(getControlsFromCache(selectedGroup));

			});
		}


		function createGroup(x, y, zoom, group) {
			x = x || (1 + groups.length) * IMAGE_WIDTH;
			y = y || (1 + groups.length) * IMAGE_HEIGHT;

			var options = {
				id: (group) ? group.id : 'group-' + groups.length,
				x: x,
				y: y,
				zoom: zoom
			};

			return SVG.createGroup(options, group);

		}


		return {
			init: init
		}

	}());

	window.onload = Editor.init;