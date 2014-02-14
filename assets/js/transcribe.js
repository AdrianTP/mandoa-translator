var canvas;

var proceduralUpdate = function() {
	ctx = canvas.getContext("2d");
	var padding = parseInt(t["canvas-padding"].value, 10),
		width = parseInt(t["canvas-width"].value, 10),
		height = parseInt(t["canvas-height"].value, 10),
		y = padding + parseInt(t["text-size"].value, 10) - 2,
		maxW = width - (2 * padding);
	canvas.width = width;
	canvas.height = height;
	ctx.fillStyle = t["canvas-background"].value;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	switch(t["text-align"].value) {
		case "center":
			var x = width / 2;
			break;
		case "right":
			var x = width - padding;
			break;
		default:
			var x = padding;
			break;
	}
	var size = t["text-size"].value + t["text-size"].getAttribute("data-unit");
	var font = t["text-font"].value;
	var color = t["text-color"].value;
	
	ctx.font = size + ' "' + font + '"';
	ctx.fillStyle = color;
	ctx.textAlign = t["text-align"].value;
	
	var words = t["auto-text"].value.split(" "),
		line = "";
	
	for (var i = 0; i < words.length; i ++) {
		var testLine = line + words[i] + " ",
			metrics = ctx.measureText(testLine);
		if (metrics.width > maxW && i > 0) {
			ctx.fillText(line, x, y);
			line = words[i] + " ";
			y = y + parseInt(t["text-size"].value, 10) + 6;
		} else {
			line = testLine;
		}
	}
	ctx.fillText(line, x, y);
};

Util.on("click.close", document, "button.close", function(e) {
	Util.addClass(e.target.parentNode, "hidden");
});

var myForm, t;
window.onload = window.onresize = function() {
	
	Util.removeClass(document.querySelector("#font"), "hidden");
	
	t = document.transcriber;
	
	t["auto-text"].style.width = t["canvas-width"].value + t["canvas-width"].getAttribute("data-unit");
	t["auto-text"].style.height = t["canvas-height"].value + t["canvas-height"].getAttribute("data-unit");
	t["auto-text"].style.backgroundColor = t["canvas-background"].value;
	t["auto-text"].style.color = t["text-color"].value;
	
	if (Util.browser("size").width < 980) {
		t["auto-text"].style.width = "100%";
	}
	
	Util.addEvent(t, "submit", function(e) { e.preventDefault(); return false; });
	
	Util.on("change, blur", document, 'input[type="number"]', function(e) {
		if (!e) var e = window.event;
		
		e.target.value = e.target.value.replace(/\D+/, "");
		var min = parseInt(e.target.getAttribute("min"), 10) || null,
			max = parseInt(e.target.getAttribute("max"), 10) || null,
			step = parseInt(e.target.getAttribute("step"), 10) || 1,
			value = parseInt(e.target.value, 10) || 0;
		
		if (min && value < min) e.target.value = min;
		if (max && value > max) e.target.value = max;
		if (step) while (e.target.value % step > 0) { e.target.value += 1; }
	});
	
	Util.on("change, blur", document, "input, select", function(e) {
		var prop = e.target.getAttribute("data-property"),
			unit = e.target.getAttribute("data-unit") || "";
		t["auto-text"].style[prop] = e.target.value + unit;
	});
	
	if (Util.support("canvas") && Util.support("canvas.fillText")){
		
		Util.removeClass(t.configure, "hidden");
		
		Util.on("keyup, change, blur", document, "input, select", function(e) {
			var prop = e.target.getAttribute("data-property"),
				unit = e.target.getAttribute("data-unit") || "";
			proceduralUpdate();
		});

		Util.on("click", document, t.configure, function(e) {
			Util.removeClass(document.getElementById("exporter"), "hidden");
			Util.addClass(e.target, "hidden");
			var val = t["auto-text"].value;
			document.querySelector("#text").removeChild(t["auto-text"]);
			var autoText = document.createElement("input");
			autoText.id = "auto-text";
			autoText.name = "auto-text";
			autoText.value = val;
			Util.addClass(autoText, "transcription-source");
			t["auto-text"].style.width = t["canvas-width"].value + t["canvas-width"].getAttribute("data-unit");
			canvas = document.createElement("canvas");
			canvas.id = "transcription-canvas";
			Util.addClass(canvas, "transcription");
			canvas.width = t["canvas-width"].value;
			canvas.height = t["canvas-height"].value;
			var text = document.getElementById("text");
			text.appendChild(canvas);
			var ctx = canvas.getContext("2d");
			proceduralUpdate();
		});
		
		Util.on("click", document, t["save"], function(e) {
			var data = canvas.toDataURL("image/png");
			data = data.substr(data.indexOf(',') + 1).toString();
			
			var fname = t["filename"].value;
			
			var dataInput = document.createElement("input") ;
			dataInput.setAttribute("name", "imgdata") ;
			dataInput.setAttribute("value", data);
			
			var nameInput = document.createElement("input") ;
			nameInput.setAttribute("name", "name");
			nameInput.setAttribute("value", fname + ".png");
			
			myForm = document.createElement("form");
			Util.addClass(myForm, "hidden");
			myForm.method = 'post';
			myForm.action = "/saveimage.png";
			myForm.appendChild(dataInput);
			myForm.appendChild(nameInput);
			
			document.body.appendChild(myForm) ;
			myForm.submit() ;
			document.body.removeChild(myForm) ;
		});
		
	}
};


