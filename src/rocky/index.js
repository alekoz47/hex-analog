var rocky = require("rocky");
var settings = null;

function draw(ctx) {
	var d = new Date();
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;
	var cx = w / 2;
	var cy = h / 2;
	var days = d.getDate();
	var minutes = d.getMinutes();
	var hours = d.getHours();
	var maxLength = (Math.min(w, h) - 10) / 2;
	var minuteFraction = minutes / 60;
	var minuteAngle = fractionToRadian(minuteFraction);
	var hourFraction = (hours % 12 + minuteFraction) / 12;
	var hourAngle = fractionToRadian(hourFraction);
	
	ctx.clearRect(0, 0, w, h);
	
	var color = dateToHex(days, hours, minutes);
	drawBackground(ctx, color, w, h);
	
	var colorString = hexStringToColor(color);
	var overlayColor = setColor(ctx, colorString);
	ctx.strokeStyle = overlayColor;
	ctx.fillStyle = overlayColor;
	drawTicks(ctx, cx, cy, maxLength);
	drawHand(ctx, cx, cy, minuteAngle, maxLength * 0.8, 7, color);
	drawHand(ctx, cx, cy, hourAngle, maxLength * 0.5, 10, color);
	drawCenter(ctx, cx, cy);
	
	ctx.textAlign = "left";
	var textString = d.getDate().toString();
	if (settings)
		if (settings.showHex) {
			colorString.red = extendString(colorString.red.toString(16), 2);
			colorString.green = extendString(colorString.green.toString(16), 2);
			colorString.blue = extendString(colorString.blue.toString(16), 2);
			textString = colorString.red + colorString.green + colorString.blue;
		}
	var centerAdjust = ctx.measureText(textString).width / 2;
	drawText(ctx, cx - centerAdjust, h - (ctx.measureText("0").height * 3.5), textString);
}

function dateToHex(d, h, m) {
	d = Math.round(convertRange(d, 0, 31, 0, 255));
	h = Math.round(convertRange(h, 0, 24, 0, 255));
	m = Math.round(convertRange(m, 0, 60, 0, 255));
	
	d = extendString(d.toString(16), 2);
	h = extendString(h.toString(16), 2);
	m = extendString(m.toString(16), 2);
	
	var dateHexString = d.toString(16) + h.toString(16) + m.toString(16);
	console.log("hex color: " + dateHexString);
	return dateHexString;
}

function hexStringToColor(hex) {
	hex = parseInt(hex, 16);
	var red = (hex & 0xFF0000) >> 16;
	var green = (hex & 0xFF00) >> 8;
	var blue = hex & 0xFF;
	console.log("split color: " + red + " : " + green + " : " + blue);
	
	var color = {
		red: red,
		green: green,
		blue: blue,
	};
	
	return color;
}

function drawHand(ctx, cx, cy, angle, length, width, color) {
	var x = cx + Math.sin(angle) * length;
	var y = cy - Math.cos(angle) * length;
	
	ctx.lineWidth = width;
	drawLine(ctx, cx, cy, x, y);
	
	if (width === 10) {
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#" + color;
		drawLine(ctx, cx, cy, x, y);
	}
}

function drawTick(ctx, ex, ey, angle, length) {
	var x = ex - Math.sin(angle) * length;
	var y = ey + Math.cos(angle) * length;
	
	ctx.lineWidth = 4;
	drawLine(ctx, ex, ey, x, y);
}

function drawTicks(ctx, cx, cy, maxLength) {
	for (var ii = 0; ii < 360; ii += 6) {
		var angle = fractionToRadian(ii / 360);
		var x = cx + Math.sin(angle) * maxLength;
		var y = cy - Math.cos(angle) * maxLength;
		
		if (ii % 30 === 0)
			drawTick(ctx, x, y, angle, maxLength * 0.1);
	}
}

function setColor(ctx, color) {
	var redMap = color.red * 0.299;
	var greenMap = color.green * 0.587;
	var blueMap = color.blue * 0.114;
	
	if ((redMap + greenMap + blueMap) > 127.5)
		return "black";
	else return "white";
}

function drawBackground(ctx, color, x, y) {
	ctx.fillStyle = "#" + color;
	ctx.fillRect(0, 0, x, y);
}

function drawText(ctx, x, y, text) {
	ctx.font = "18px bold Gothic";
	ctx.fillText(text, x, y);
}

function drawLine(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function drawCenter(ctx, cx, cy) {
	ctx.rockyFillRadial(cx, cy, 0, 4, 0, 2 * Math.PI);
}

function extendString(string, length) {
	if (string.length < length)
		return extendString("0".concat(string), length);
	else return string;
}

function fractionToRadian(fraction) {
	return fraction * 2 * Math.PI;
}

function convertRange(x, xMin, xMax, yMin, yMax) {
	var percent = (yMax - yMin) / (xMax - xMin);
	return percent * (x - xMin) + yMin;
}

rocky.on("draw", function(event) {
	draw(event.context);
});

rocky.on("minutechange", function(event) {
	rocky.requestDraw();
});

rocky.on("message", function(event) {
  	settings = event.data;
  	rocky.requestDraw();
});

rocky.postMessage({command: "settings"});
