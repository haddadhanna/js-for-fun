var APP = APP || {};
APP.UI = function ()
{
    var _container;
    var _poolContainer;
    var _isGameOnUI = false;
    var _dragTheBall = {
        IsDoingDrag: false,
        Item: null,
        StartPosition: {
            X:0,
            Y:0
        }
    };

    var _animate = function (ctx, speedX, speedY, direction)
    {
        return function ()
        {
            if (_isGameOnUI === true && (_dragTheBall.Item === null || _dragTheBall.Item.id !== ctx.id))
            {
                var radius = parseFloat(ctx.getAttributeNS(null, 'r'));
                if (direction === APP.DIRECTION_HORIZONTAL || direction === APP.DIRECTION_DIAGONAL)
                {
                    var nx = parseFloat(ctx.getAttributeNS(null, 'cx'));
                    //iza l position t5ata l 7doud then reverse movement (x-axis)
                    speedX = _poolContainer.clientWidth < nx + speedX + radius || nx + speedX - radius <= 0 ? -1 * speedX : speedX;
                    ctx.setAttributeNS(null, 'cx', nx + speedX);
                }
                if (direction === APP.DIRECTION_VERTICAL || direction === APP.DIRECTION_DIAGONAL)
                {
                    var ny = parseFloat(ctx.getAttributeNS(null, 'cy'));
                    //iza l position t5ata l 7doud then reverse movement (y-axis)
                    speedY = _poolContainer.clientHeight < ny + speedY + radius || ny + speedY - radius <= 0 ? -1 * speedY : speedY;
                    ctx.setAttributeNS(null, 'cy', ny + speedY);
                }
            }
        };
    };
    var _startDrag = function (e)
    {
        if (e.target.tagName === 'circle')
        {
            var matrix = _container.getScreenCTM().inverse();
            var point = _container.createSVGPoint();
            point.x = e.clientX;
            point.y = e.clientY;
            point = point.matrixTransform(matrix);

            _dragTheBall.StartPosition.X = point.x - parseFloat(e.target.getAttributeNS(null, "cx"));
            _dragTheBall.StartPosition.Y = point.y - parseFloat(e.target.getAttributeNS(null, "cy"));
            _dragTheBall.Item = e.target;
            _dragTheBall.IsDoingDrag = true;
        }
    };
    var _drag = function (e)
    {
        if (_dragTheBall.IsDoingDrag === true && _dragTheBall.Item !== null)
        {
            //Returns a DOMMatrix representing the matrix that transforms the current element's coordinate system
            //to the coordinate system of the SVG viewport for the SVG document fragment.
            var matrix = _container.getScreenCTM()
            //inverse the matrix object
                .inverse();
            var point = _container.createSVGPoint();
            point.x = e.clientX;
            point.y = e.clientY;
            point = point.matrixTransform(matrix);

            //prevent drag outside svg boundaries
            var radius = parseFloat(_dragTheBall.Item.getAttributeNS(null, 'r'));
            var newX = point.x - _dragTheBall.StartPosition.X - radius < 0 ? radius
                    : _poolContainer.clientWidth < point.x - _dragTheBall.StartPosition.X + radius ? _poolContainer.clientWidth - radius
                    : point.x - _dragTheBall.StartPosition.X;
            var newY = point.y - _dragTheBall.StartPosition.Y - radius < 0 ? radius
                : _poolContainer.clientHeight < point.y - _dragTheBall.StartPosition.Y + radius ? _poolContainer.clientHeight - radius
                    : point.y - _dragTheBall.StartPosition.Y;

            _dragTheBall.Item.setAttributeNS(null, 'cx', newX);
            _dragTheBall.Item.setAttributeNS(null, 'cy', newY);
        }
    };
    var _endDrag = function ()
    {
        _dragTheBall = {
            IsDoingDrag: false,
            Item: null,
            StartPosition: {
                X: 0,
                Y: 0
            }
        };
    };
    var _generateGradient = function (id, color)
    {
        var grad = document.createElementNS("http://www.w3.org/2000/svg", 'radialGradient');
        grad.setAttributeNS(null, 'id', "g_" + id);
        grad.setAttributeNS(null, 'fx', "30%");
        grad.setAttributeNS(null, 'fy', "30%");
        var stop1 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        stop1.setAttributeNS(null, 'offset', "0%");
        stop1.setAttributeNS(null, 'style', "stop-color:#FFFFFF");
        var stop2 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        stop2.setAttributeNS(null, 'offset', "40%");
        stop2.setAttributeNS(null, 'style', "stop-color:" + color);
        var stop3 = document.createElementNS("http://www.w3.org/2000/svg", 'stop');
        stop3.setAttributeNS(null, 'offset', "100%");
        stop3.setAttributeNS(null, 'style', "stop-color:#" + APP.Color.darken_hex(color.replace('#', '')));
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        grad.appendChild(stop3);
        return grad;
    };
    var _generateBall = function (id, ball)
    {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        var theX = ball.position().x;
        var theY = ball.position().y;
        var theR = ball.radius();
        //adjust the position of the ball if the ball is outside the container
        theX = theX - theR < 0 ? theR : theX + theR > _poolContainer.clientWidth ? _poolContainer.clientHeight - theR : theX;
        theY = theY - theR < 0 ? theR : theY + theR > _poolContainer.clientHeight ? _poolContainer.clientHeight - theR : theY;
        circle.setAttributeNS(null, 'cx', theX);
        circle.setAttributeNS(null, 'cy', theY);
        circle.setAttributeNS(null, 'r', theR);
        circle.setAttributeNS(null, 'style', 'fill:url(#g_' + id + ')');
        circle.setAttributeNS(null, 'id', "c_" + id);
        return circle;
    };

    this.init = function ()
    {
        _container = document.getElementById('svgPool');
        _poolContainer = document.getElementById('pool');

        _container.addEventListener('mousedown', _startDrag);
        _container.addEventListener('mousemove', _drag);
        _container.addEventListener('mouseup', _endDrag);
        _container.addEventListener('mouseleave', _endDrag);
    };

    this.updateStatus = function (status)
    {
        _isGameOnUI = status;
    };

    this.add = function (ball)
    {
        if (ball !== undefined)
        {
            var generId = Math.random().toString(20).substring(2, 10);
            var circle = _generateBall(generId, ball);
            var gradiant = _generateGradient(generId, ball.color());

            _container.appendChild(circle);
            document.getElementById('def1').appendChild(gradiant);

            setInterval(_animate(circle, ball.speed(), ball.speed(), ball.direction()), 10);
            this.feed('circle is added');
        }
    };

    this.feed = function (message)
    {
        console.log(message);
    };
};