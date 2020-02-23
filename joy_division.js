const WAVE_HEIGHT_FACTOR = 1.12;
const WAVE_OFFSET_FACTOR = 300;
const LINE_WIDTH =  10;
const TOP_LINES_OFFSET = 8;


var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

var size = window.innerWidth;
var dpr = window.devicePixelRatio;
canvas.width = size * dpr;
canvas.height = size * dpr;
context.scale(dpr, dpr);
context.lineWidth = LINE_WIDTH;
var step = 50;
var lines = [];


// create the lines.
for (var i = step; i <= size - step; i += step) {
    var line = [];
    for (var j = step; j <= size - step; j += step) {
        var distanceToCenter = Math.abs(j - (size / 2))
        var variance = Math.max((size / 2) - WAVE_OFFSET_FACTOR - distanceToCenter, 0) ** WAVE_HEIGHT_FACTOR;

        var random = Math.random() * variance / 2 * (-1);
        var point = {x: j, y: i + random};

        line.push(point);
    }
    lines.push(line);
}

// do the drawing.
for (var i = TOP_LINES_OFFSET; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);
    for (var j = 0; j < lines[i].length - 2; j++) {
        var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
        var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
        context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc)
    }
    context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.fill()
    context.restore()
    context.stroke();
}

// Fill background with white.
context.save();
context.globalCompositeOperation = 'destination-over';
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);
context.restore();
