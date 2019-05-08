var APP = APP || {};

APP.Ball = function ()
{
    //set default value
    var _color = '#000';
    var _direction = 'horizontal';
    var _speed = 1;
    var _xpos = 0;
    var _ypos = 0;
    var _radius = 20;

    //initialise ball
    this.init = function (stats)
    {
        if (stats !== undefined)
        {
            _speed = parseInt(stats.speed) || _speed;
            _radius = parseInt(stats.radius) || _radius;
            _xpos = parseInt(stats.x_pos) || _xpos;
            _ypos = parseInt(stats.y_pos) || _ypos;
            _color = stats.color || _color;
            _direction = stats.direction || _direction;
        }
    };

    //getter and setter for radius
    this.radius = function (r)
    {
        if (r === undefined)
            return _radius;
        _radius = parseInt(r);
    };

    //getter and setter for speed
    this.speed = function (s)
    {
        if (s === undefined)
            return _speed;
        _speed = parseInt(s);
    };

    //getter and setter for color
    this.color = function (c)
    {
        if (c === undefined)
            return _color;
        _color = c;
    };

    //getter and setter for position (x,y)
    this.position = function (x, y)
    {
        if (x === undefined || y === undefined)
            return { x: _xpos, y: _ypos };
        _xpos = parseInt(x);
        _ypos = parseInt(y);
    };

    //getter and setter for direction
    this.direction = function (d)
    {
        if (d === undefined)
            return _direction;
        _direction = d;
    };
};