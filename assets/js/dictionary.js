var Dictionary = (function(headers, colDefs) {
	
	var domNode = Util.domNode;
	var util = Util;
	
	var makeQueryString = function(form) {
		var kvpairs = [];
		for (var i = 0; i < form.elements.type.length; i ++) {
			if (form.elements.type[i].checked) {
				kvpairs.push("type=" + form.elements.type[i].value);
			}
		}
		kvpairs.push("query=" + form.elements.query.value);
		return kvpairs.join("&");
	};
	
	var appendOutput = function(target, data) {
		if (data.length > 0) {
			var output = domNode("table"); // table
			output.className = "clearfix";
			var tHead = domNode("thead");
			var hRow = domNode("tr"); // row
			hRow.className = "clearfix";
			for (var i = 0; i < headers.length; i ++) {
				var hCell = domNode("th", headers[i]);
				hCell.className = "col" + (i + 1);
				hRow.appendChild(hCell);
			}
			tHead.appendChild(hRow)
			output.appendChild(tHead);
			tBody = domNode("tbody");
			for (var i = 0; i < data.length; i ++) {
				var tRow = domNode("tr");
				tRow.className = "clearfix";
				tRow.id = "row" + data[i]["ID"];
				tRow.setAttribute("data-id", data[i]["ID"]);
				for (var j = 0; j < colDefs.length; j ++) {
					var tCell = domNode("td");
					tCell.className = "col" + (j + 1);
					/*if (j === 0) {
						var expander = domNode("div");
						expander.className = "expand-icon";
						tCell.appendChild(expander);
					}*/
					var tCellText = (j === 1) ? domNode("span", "[" + data[i][colDefs[j]] + "]") : domNode("span", data[i][colDefs[j]]);
					tCell.appendChild(tCellText);
					tRow.appendChild(tCell);
				}
				tBody.appendChild(tRow);
			}
			output.appendChild(tBody);
		} else {
			var output = domNode("div");
			var noResults = domNode("span", "No results found.");
			output.appendChild(noResults);
			output.className = "no-results";
		}
		
		for (var i = 0; i < target.children.length; i ++) {
			target.removeChild(target.children[i]);
		}
		target.appendChild(output);
	};
	
	var updateResults = function(element, querystring, callback) {
		var xhr = new XMLHttpRequest();
		var verb = "POST";
		var noun = document.translator.getAttribute("data-action");
		xhr.open(verb, noun, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function() {
			if (this.readyState === xhr.DONE) {
				var data = JSON.parse(this.responseText);
				callback(element, data);	
			}
		};
		xhr.send(querystring);
	};
	
	var query = function(formId, outputId) {
		var translator = document.getElementById(formId);
		var queryString = makeQueryString(translator);
		var resultsContainer = document.getElementById(outputId);
		updateResults(resultsContainer, queryString, appendOutput);
	};
	
	return {
		query: query
	};
})([
	"Mando'a",
	"[Pronunciation]",
	"English"
],[
	"mandoa",
	"pronunciation",
	"english"
]);

var run = function(e) {
	Dictionary.query("translator", "resultsContainer");
};

var timer;

var up = function(e) {
	var key = e.keyCode;
	if ((key >= 65 && key <= 90) || (key >= 48 && key <= 57) || key === 222 || key === 8 || key === 46) {
		timer = setTimeout(run, 500);
	}
};

var down = function(e) {
	clearTimeout(timer);
};

window.onload = function() {
	Util.addEvent(document.translator, "submit", function(e) { e.preventDefault(); return false; });
	Util.addEvent(document.translator.query, "keyup", up);
	Util.addEvent(document.translator.query, "keydown", down);
	Util.addEvent(document.translator.query, "focus, change, blur, click, tap", run);
	var prev = null;
	for (var i = 0; i < document.translator.type.length; i ++) {
		Util.addEvent(document.translator.type[i], "click", run);
	}
};

