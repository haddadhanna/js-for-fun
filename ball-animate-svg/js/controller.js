var APP = APP || {};

//define the constants in the game
APP.DIRECTION_HORIZONTAL = 'horizontal';
APP.DIRECTION_VERTICAL = 'vertical';
APP.DIRECTION_DIAGONAL = 'diagonal';
APP.MAX_POOL = 10;

APP.Controller = {};
(function (ctx)
{
    var _pool = 0; //number of existing balls
    var _isGameOn = false; //game status (started or paused)
    var _ui = new APP.UI(); //ui
    _ui.init();

    ctx.addBall = function (stats)
    {
        if (_isGameOn === true)
        {
            if (_pool < APP.MAX_POOL)
            {
                var ball = new APP.Ball();
                ball.init(stats);
                _pool++;
                _ui.add(ball);
            }
            else
            {
                _ui.feed('the pool is full, you cannot add more balls');
            }
        }
    };

    ctx.removeBall = function ()
    {
        //#todo
    };

    ctx.startGame = function ()
    {
        _isGameOn = true;
        _ui.updateStatus(true);
        _ui.feed('game is started');
    };

    ctx.stopGame = function ()
    {
        _isGameOn = false;
        _ui.updateStatus(false);
        _ui.feed('game is stopped');
    };

})(APP.Controller);