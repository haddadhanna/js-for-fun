var manager, testcase, canvasContainer, ctx;
var speed = 30;
var radius = 3;
(function () {
    canvasContainer = document.getElementById("myCanvas");
    ctx = canvasContainer.getContext("2d");

    document.getElementById('btnClear').addEventListener('click', function () {
        clearCanvas();
        clearSolution();
    });
    document.getElementById('btnResolve').addEventListener('click', function () {
        clearSolution();
        if (manager) {
            manager.Run();
            var retval = manager.GetResults();
            var container = document.getElementById('solutions');
            if (retval.length === 0) {
                var span = document.createElement("span");
                span.className = "item-no-solution";
                span.innerText = "No Solution Found";
                container.appendChild(span);
            }
            else {
                for (index in retval) {
                    var span = document.createElement("span");
                    span.className = "item-solution";
                    span.innerText = "(" + index + ") -";
                    for (i in retval[index]) {
                        span.innerText += retval[index][i].start + "" + retval[index][i].end + "-";
                    }
                    (function (index) {
                        span.addEventListener("click", function () {
                            showSolution(retval[index]);
                        });
                    })(index);
                    container.appendChild(span);
                }
            }
        }
    });
    document.getElementById('btnStar').addEventListener('click', function () {
        clearCanvas();
        clearSolution();
        testcase = APP.TestCase.Star;
        manager = new APP.Manager(
            testcase.Points,
            testcase.Routes,
            testcase.Depth
        );
        initPoints(testcase.PointsDraw);
    });
    document.getElementById('btnTriangle').addEventListener('click', function () {
        clearCanvas();
        clearSolution();
        testcase = APP.TestCase.Triangle;
        manager = new APP.Manager(
            testcase.Points,
            testcase.Routes,
            testcase.Depth
        );
        initPoints(testcase.PointsDraw);
    });
    document.getElementById('btnHouse').addEventListener('click', function () {
        clearCanvas();
        clearSolution();
        testcase = APP.TestCase.House;
        manager = new APP.Manager(
            testcase.Points,
            testcase.Routes,
            testcase.Depth
        );
        initPoints(testcase.PointsDraw);
    });

})();

function drawPts(x, y, text, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color || "red";
    ctx.fill();

    if (text) {
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(text, x - radius, y - radius - 4);
    }
}

function drawLine(start, end) {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
}

function initPoints(pts) {
    for (index in pts) {
        drawPts(pts[index].x, pts[index].y, pts[index].pts);
    }
}

function clearSolution() {
    var solution = document.getElementById('solutions');
    while (solution.lastElementChild) {
        solution.removeChild(solution.lastElementChild);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasContainer.width, canvasContainer.height);
}

function showSolution(solution) {
    var pts = [];

    for (var i = 0; i < solution.length; i++) {
        var pt1 = testcase.PointsDraw.find(element => element.pts === solution[i].start);
        var pt2 = testcase.PointsDraw.find(element => element.pts === solution[i].end);

        for (var j = 0; j <= speed; j++) {
            pts.push({
                x: j * (pt2.x - pt1.x) / speed + pt1.x,
                y: j * (pt2.y - pt1.y) / speed + pt1.y
            });
        }
    }
    animate(pts);
}

function animate(pts){
    if(pts.length > 1){
        drawLine(pts[0], pts[1]);
        pts.shift();
        window.requestAnimationFrame(function() {animate(pts)});
    }
}