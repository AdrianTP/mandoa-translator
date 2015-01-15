var Util = (function () {

    // returns the actual type of the tested item
    var _typeof = function (item) {
        return Object.prototype.toString.call(item).replace("[object ","").replace("]","").toLowerCase();
    };

    // determines whether the passed object has the specified property
    var hasProperty = function(obj, prop) {
	if (!!obj.hasOwnProperty) {
		return obj.hasOwnProperty(prop);
	} else {
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}
    };

    // rounds a float to a specific number of decimal places
    var decRound = function (input, digits) {
        var dec = Math.pow(10, digits);
        return (Math.round(input * dec) / dec).toFixed(digits);
    };

    // truncates a float to a specific number of decimal places
    var decTruncate = function (input, digits) {
        var output = (input.toString.substr(0, 1 + input.indexOf(".") + digits)).toFixed(digits);
        if (isNaN(output)) output = 0;
        return parseFloat(output);
    };

    // returns an object representing the character types found within the tested string
    var strType = function (input) {
        var ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            SPECIAL = "~!@#$%^&*()_+{}|:\"<>?`-=[]\\;',./ ",
            NUMERIC = "0123456789",
            isAlpha = false,
            isSpecial = false,
            isNumeric = false,
            isAlphaNumeric = false,
            isMixed = false,
            kind = "blank";
        if (_typeof(input) === "string") {
            var test = input.toUpperCase().split("");
            while (test.length > 0) {
                var current = test.shift();
                isAlpha = (!isAlpha) ? (ALPHA.indexOf(current) !== -1) : isAlpha;
                isSpecial = (!isSpecial) ? (SPECIAL.indexOf(current) !== -1) : isSpecial;
                isNumeric = (!isNumeric) ? (NUMERIC.indexOf(current) !== -1) : isNumeric;
                isAlphaNumeric = (isAlpha && isNumeric);
                isMixed = (isAlpha && isNumeric && isSpecial);
                kind = (isMixed) ? "mixed" : (isAlphaNumeric) ? "alphanumeric" : (isNumeric) ? "numeric" : (isSpecial) ? "special" : (isAlpha) ? "alpha" : "blank";
            }
        }
        return {
            alpha: isAlpha,
            numeric: isNumeric,
            special: isSpecial,
            alphaNumeric: isAlphaNumeric,
            mixed: isMixed,
            kind: kind
        };
    };

	// returns a dom node of the specified type; if text is specified, it is inserted into the node
	var domNode = function(type, text) {
		var node = document.createElement(type);
		if (text) node.appendChild(document.createTextNode(text));
		return node;
	};

	// safely removes a node and all event handlers and all children recursively to prevent memory leaks -- thanks Douglas Crockford (modified for my personal style)
	var purgeNode = function(node) {
		var attr = node.attributes, l, n;
		if (attr) {
			for (var i = attr.length - 1; i >= 0; i -= 1) {
				var name = attr[i].name;
				if (_typeof(node[name] === "function")) {
					node[name] = null;
				}
			}
		}
		var children = node.childNodes;
		if (children) {
			for (var i = 0; i < attr.length; i ++) {
				purgeNode(node.childNodes[i]);
			}
		}
	};

	// helper object for element handler -- lookup table for nodeTypes
	var NODE_TYPES = {
		"ELEMENT_NODE": 1,
		"ATTRIBUTE_NODE": 2,
		"TEXT_NODE": 3,
		"CDATA_SECTION_NODE": 4,
		"ENTITY_REFERENCE_NODE": 5,
		"ENTITY_NODE": 6,
		"PROCESSING_INSTRUCTION_NODE": 7,
		"COMMENT_NODE": 8,
		"DOCUMENT_NODE": 9,
		"DOCUMENT_TYPE_NODE": 10,
		"DOCUMENT_FRAGMENT_NODE": 11,
		"NOTATION_NODE": 12
	};

	// helper function for element handler -- converts a NodeList to a plain Array
	var arrayFromNodeList = function(nodeList, nodeType) {
		var array = [];
		var length = nodeList.length;
		var filter = (_typeof(nodeType) !== "undefined" && nodeType !== null);
		var type = (filter) ? nodeType.toUpperCase() : null;
		var cleanNodeList = (type === "CLEAN");
		var NODE_TYPE = (filter) ? NODE_TYPES[nodeType.toUpperCase()] : null;

		for (var i = length >>> 0; i --;) {
			var node = nodeList[i];
			var hasNodeType = (_typeof(node.nodeType) !== "undefined" && node.nodeType !== null && !isNaN(node.nodeType));

			if (!filter) {																	// if nodeType not specified
				array[i] = node;																// convert all
			} else if (hasNodeType && cleanNodeList) {										// if nodeType === "CLEAN"
				array.push(node);																// convert only nodes
			} else if (hasNodeType && !!NODE_TYPE && nodeList[i].nodeType === NODE_TYPE) {	// if NODE_TYPE is defined
				array.push(node);																// convert only nodes which satisfy (node.nodeType === NODE_TYPE)
			}
		}
		return array;
	};

	// helper function for element handler -- determines if passed object contains *only* nodes
	var containsOnlyNodes = function(nodeList) {
		var array = arrayFromNodeList(nodeList);
		for (var i = 0; i < array.length; i ++) {
			if (!array[i].nodeType) return false;
		}
		return true;
	};

	// helper function for element handler -- determines if passed object contains *any* nodes
	var containsAnyNodes = function(nodeList) {
		var array = arrayFromNodeList(nodeList);
		for (var i = 0; i < array.length; i ++) {
			if (array[i].nodeType) return true;
		}
		return false;
	};

	// helper function for element handler -- determines if passed object is a live list
	var isLive = function(item) {
		var type = _typeof(item);
		return (type === "nodelist" || type === "htmlcollection");
	};

	// basic element handler
	var element = function(el, filter) {
		var type = _typeof(el);
		var onlyEls = filter || false;

		if (el.nodeType) { // if single node, return single node in array to standardize output format
			return [el];
		} else if (type === "string" && el.replace(/\s+/, "").length > 0) { // if string, process as selector and return results as array of elements
			return (onlyEls) ? arrayFromNodeList(window.document.querySelectorAll(el), "ELEMENT_NODE") : arrayFromNodeList(window.document.querySelectorAll(el));
		} else if (type !== "number" && type !== "undefined" && el !== null) { // if not an invalid type, process as array, nodelist, or htmlcollection and return array of elements
			return (onlyEls) ? arrayFromNodeList(el, "ELEMENT_NODE") : arrayFromNodeList(el);
		} else { // otherwise return false (ERROR STATE)
			throw new Error("Please enter a valid selector string, HTML node, array of HTML nodes, NodeList, or HTMLCollection");
			return false;
		}
	};

	// basic cross-browser event listener
	var addEvent = function(element, type, fn) {
		var types = type.replace(/[.][a-z]+[^,]/gi, "").replace(/\s+/g, "").split(",");
		for (var i = 0; i < types.length; i ++) {
			var capture = (types[i] === "focus" || types[i] === "blur");
			if (element.addEventListener) element.addEventListener(types[i], fn, capture);
			else if (element.attachEvent) {
				types[i] = (types[i] === "focus") ? "focusin" : types[i];
				types[i] = (types[i] === "blur") ? "focusout" : types[i];
				element.attachEvent("on"+types[i], fn);
			}
			else element.setAttribute("on"+types[i], fn);
		}
	};

	// basic cross-browser event remover
	var removeEvent = function(element, type, fn) {
		var types = type.replace(/[.][a-z]+[^,]/gi, "").replace(/\s+/g, "").split(",");
		for (var i = 0; i < types.length; i ++) {
			var capture = (types[i] === "focus" || types[i] === "blur");
			if (element.removeEventListener) element.removeEventListener(types[i], fn);
			else if (element.detachEvent) {
				types[i] = (types[i] === "focus") ? "focusin" : types[i];
				types[i] = (types[i] === "blur") ? "focusout" : types[i];
				element.detachEvent("on"+types[i], fn);
			}
			else element.removeAttribute("on"+types[i]);
		}
	}

	var callbacks = {};

	// basic cross-browser event delegation
	var on = function(type, parentEl, childEls, fn) {
		var parent = element(parentEl, false);
		if (!parent.length > 0) {
			throw new Error("Util.on() Error: Specified delegation parent not found. Cannot delegate event.");
		}
		var something = function(e) {
			var e = e || window.event;
			var recipient = e.target || e.srcElement;
			var children = element(childEls, true);
			for (var i = 0; i < children.length; i ++) {
				if (children[i] == recipient) { fn(e); }
			}
		};
		var types = type.replace(/\s+/g, "").split(",");
		for (var i = 0; i < types.length; i ++) {
			callbacks[types[i]] = callbacks[types[i]] || [];
			callbacks[types[i]].push(something);
		}
		addEvent(parent[0], type, something);
	}

	// basic cross-browser event delegation removal
	/* Doesn't work yet, just a placeholder for proof-of-concept and future modification/experimentation */
	var off = function(type, selector) {
		var types = type.replace(/\s+/g, "").split(",");
		for(var i = 0; i < types.length; i ++) {
			var something = callbacks[types[i]];
			var current = types[i].replace(/[.][a-z]+/gi, "");
			removeEvent(window.document, current, something);
		}
	}

	// basic cross-browser classList implementations
	var _classList = function(element) {
		return element.classList() || element.className.split(/\s+/);
	};

	/*
	function hasClass(ele,cls) {
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	}

	function addClass(ele,cls) {
		if (!this.hasClass(ele,cls)) ele.className += " "+cls;
	}

	function removeClass(ele,cls) {
		if (hasClass(ele,cls)) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			ele.className=ele.className.replace(reg,' ');
		}
	}
	*/

	var hasClass = function(element, classToCheck) {
		//return (element.className.indexOf(classToCheck) > -1);
		return element.className.match(new RegExp('(\\s|^)' + classToCheck + '(\\s|$)'));
	};

	var addClass = function(element, classToAdd) {
		if (!hasClass(element, classToAdd)) {
			if (hasProperty(element, "classList")) {
				element.classList.add(classToAdd);
			} else {
				element.className += " " + classToAdd;
			}
		}
		/*if (!hasClass(element, classToAdd)) {
			if (!hasProperty(element, "classList")) {// && _typeof(element.classList.remove) !== "function") {
				element.className += " " + classToAdd;
			} else {
				element.classList.add(classToAdd);
			}
//			return (element.hasOwnProperty("classList") && _typeof(element.classList.add) !== "function") ? (element.className += " " + classToAdd) : (element.classList.add(classToAdd));
		}*/
	};

	var removeClass = function(element, classToRemove) {
		if (hasClass(element, classToRemove)) {
			if (hasProperty(element, "classList")) {
				element.classList.remove(classToRemove);
			} else {
				element.className = element.className.replace(new RegExp('(\\s|^)' + classToRemove + '(\\s|$)'),' ');
			}
		}
		/*if (hasClass(element, classToRemove)) {
			if (!hasProperty(element, "classList")) {// && _typeof(element.classList.remove) !== "function") {
				console.log("removing ' " + classToRemove + " ' from className: ' " + element.className + " '");
				(" " + element.className + " ").replace(" " + classToRemove + " ", " ");
			} else {
				element.classList.remove(classToRemove);
			}
//			return (element.hasOwnProperty("classList") && _typeof(element.classList.remove) !== "function") ? (" " + element.className + " ").replace(" " + classToRemove + " ", " ") : element.classList.remove(classToRemove);
		}*/
	};

	var toggleClass = function(element, classToToggle) {
		if (!hasProperty(element, "classList")) {// && _typeof(element.classList.toggle) !== "function") {
			if (hasClass(element, classToToggle)) {
				removeClass(element, classToToggle);
			} else {
				addClass(element, classToToggle);
			}
		} else {
			element.classList.toggle(classToToggle);
		}
//		return (element.hasOwnProperty("classList") && _typeof(element.classList.toggle) !== "function") ? ((hasClass(classToToggle)) ? removeClass : addClass)(element, classToToggle) : element.classList.toggle(classToToggle);
	};

	// basic browser statistics method
	var browser = function(feature) {
		switch (feature) {
			case "size":
				return {
					width: (window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth),
					height: (window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight)
				};
				break;
		}
	};

	// test for feature support
	var support = function(feature) {
		switch (feature) {
			case "canvas":
				return !!document.createElement("canvas").getContext;
				break;
			case "canvas.fillText":
				if (!support("canvas")) { return false; }
				return (_typeof(document.createElement("canvas").getContext("2d").fillText) === "function");
				break;
			case "classList":
				return (_typeof(document.body.classList) === "DOMTokenList");
				break;
            case 'localStorage':
                try {
                    if (window['localStorage'] !== null) {
                        try {
                            localStorage.setItem('mandoaTest', '1');
                            localStorage.removeItem('mandoaTest');
                            return true;
                        } catch(e) {
                            return false;
                        }
                    }
                } catch(e) {
                    return false;
                }
                break;
            case 'Array.prototype.filter':
                return typeof Array.prototype.filter == 'function';
                break;
			default:
				return false;
				break;
		}
	};

	// test if event is supported
	var supportEvent = (function() {
		var TAGNAMES = {
			"select": "input",
			"change": "input",
			"submit": "form",
			"reset": "form",
			"error": "img",
			"load": "img",
			"abort": "img"
		};

		var supportEvent = function(name) {
			var el = document.createElement(TAGNAMES[name] || "div");
			eName = "on" + name;
			var isSupported = (eName in el);
			if (!isSupported) {
				el.setAttribute(eName, "return;");
				isSupported = typeof el[eName] == "function";
			}
			el = null;
			return isSupported;
		};
		return supportEvent;
	})();

    return {
		callbacks: callbacks,
        _typeof: _typeof,
        hasProperty: hasProperty,
        decRound: decRound,
        decTruncate: decTruncate,
		arrayFromNodeList: arrayFromNodeList,
        strType: strType,
		domNode: domNode,
		purgeNode: purgeNode,
		element: element,
		addEvent: addEvent,
		removeEvent: removeEvent,
		on: on,
		off: off,
		classList: _classList,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		browser: browser,
		support: support,
		supportEvent: supportEvent
    };

})();
