var APP = APP || {};
APP.UI = function ()
{
    var _container;
    var _poolContainer;
    var _isGameOnUI = false;
    var _dragTheBall = {
        IsDoingDrag: false,
        Item: null
    };

    var _animate = function (ctx, speedX, speedY, direction)
    {
        return function ()
        {
            if (_isGameOnUI === true)
            {
                var radius = parseFloat(ctx.getAttributeNS(null, 'r'));
                if (direction === APP.DIRECTION_HORIZONTAL || direction === APP.DIRECTION_DIAGONAL)
                {
                    var nx = parseInt(ctx.getAttributeNS(null, 'cx'));
                    //iza l position t5ata l 7doud then reverse movement (x-axis)
                    speedX = _poolContainer.clientWidth < nx + speedX + radius || nx + speedX - radius <= 0 ? -1 * speedX : speedX;
                    ctx.setAttributeNS(null, 'cx', nx + speedX);
                }
                if (direction === APP.DIRECTION_VERTICAL || direction === APP.DIRECTION_DIAGONAL)
                {
                    var ny = parseInt(ctx.getAttributeNS(null, 'cy'));
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
            _dragTheBall.Item.setAttributeNS(null, 'cx', point.x);
            _dragTheBall.Item.setAttributeNS(null, 'cy', point.y);
        }
    };
    var _endDrag = function (e)
    {
        _dragTheBall.IsDoingDrag = false;
        _dragTheBall.Item = null;
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
            circle.setAttributeNS(null, 'style', 'fill:' + ball.color());
            _container.appendChild(circle);
           // setInterval(_animate(circle, ball.speed(), ball.speed(), ball.direction()), 10);
            this.feed('circle is added');
        }
    };

    this.feed = function (message)
    {
        console.log(message);
    };
};