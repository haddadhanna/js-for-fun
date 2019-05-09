var APP = APP || {};
APP.UI = function ()
{
    var _container;
    var _poolContainer;
    var _isGameOnUI = false;
    var _ballMovement = {
        IsHoldingTheBall: false,
        StartX: 0,
        StartY: 0
    };


    var _animate = function (ctx, speedX, speedY, direction)
    {
        return function ()
        {
            if (_isGameOnUI === true && _ballMovement.IsHoldingTheBall === false)
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
    var _lockTheBall = function (e)
    {
        _ballMovement.IsHoldingTheBall = true;
        _ballMovement.StartX = e.clientX;
        _ballMovement.StartY = e.clientY;
    };
    var _releaseTheBall = function ()
    {
        _ballMovement.IsHoldingTheBall = false;
        _ballMovement.StartX = 0;
        _ballMovement.StartY = 0;
    };
    var _moveTheBall = function (e)
    {
      //todo
    };

    this.init = function ()
    {
        _container = document.getElementById('svgPool');
        _poolContainer = document.getElementById('pool');
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
            circle.addEventListener('mousedown', _lockTheBall);
            circle.addEventListener('mouseup', _releaseTheBall);
            circle.addEventListener('mousemove', _moveTheBall);
            _container.appendChild(circle);
          //  setInterval(_animate(circle, ball.speed(), ball.speed(), ball.direction()), 10);
            this.feed('circle is added');
        }
    };

    this.feed = function (message)
    {
        console.log(message);
    };

};