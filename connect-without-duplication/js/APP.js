var APP = APP || {};

APP.Manager = function (points, routes, depth)
{
    var _points = points;
    var _routes = routes;
    var _depth = depth;
    var _result = [];

    this.GetResult = function ()
    {
        if (_result.length > 0)
            return _result[0];
        return null;
    };
    this.GetResults = () => _result;
    this.Run = function ()
    {
        for (index in _points)
        {
            _GetRoute(_points[index], []);
        }
    };

    _GetRoute = function (start, path)
    {
        var next = _getNextPoints(start);
        for (index in next)
        {
            if (path.filter(x => x.IsEqualTo(next[index])).length === 0)
            {
                var newPath = path.slice();
                newPath.push(next[index]);
                if (newPath.length === _depth)
                {
                    _result.push(newPath);
                }
                else
                {
                    _GetRoute(next[index].end, newPath);
                }
            }
        }
    };
    _getNextPoints = function (start)
    {
        return _routes.filter(x => x.start === start);
    };
};
APP.Path = function (start, end)
{
    this.start = start;
    this.end = end;

    this.IsEqualTo = function (path)
    {
        return (this.start === path.start && this.end === path.end)
            || (this.start === path.end && this.end === path.start);
    };
};
APP.TestCase = {};
APP.TestCase.Triangle = {
    Points: ["A", "B", "C"],
    Routes: [
        new APP.Path("A", "B"),
        new APP.Path("A", "C"),
        new APP.Path("B", "A"),
        new APP.Path("B", "C"),
        new APP.Path("C", "A"),
        new APP.Path("C", "B")
    ],
    Depth: 3
};
APP.TestCase.House = {
    Points: ["A", "B", "C", "D", "E"],
    Routes: [
        new APP.Path("A", "B"),
        new APP.Path("A", "E"),
        new APP.Path("B", "A"),
        new APP.Path("B", "E"),
        new APP.Path("B", "D"),
        new APP.Path("B", "C"),
        new APP.Path("C", "B"),
        new APP.Path("C", "E"),
        new APP.Path("C", "D"),
        new APP.Path("D", "E"),
        new APP.Path("D", "B"),
        new APP.Path("D", "C"),
        new APP.Path("E", "C"),
        new APP.Path("E", "D"),
        new APP.Path("E", "B"),
        new APP.Path("E", "A")
    ],
    Depth: 8
};
APP.TestCase.Star = {
    Points: ["A", "B", "C", "D", "E", "F", "G", "H"],
    Routes: [
        new APP.Path("A", "B"),
        new APP.Path("A", "C"),
        new APP.Path("A", "E"),
        new APP.Path("A", "G"),
        new APP.Path("A", "H"),
        new APP.Path("B", "A"),
        new APP.Path("B", "C"),
        new APP.Path("C", "A"),
        new APP.Path("C", "D"),
        new APP.Path("C", "E"),
        new APP.Path("C", "G"),
        new APP.Path("C", "B"),
        new APP.Path("D", "C"),
        new APP.Path("D", "E"),
        new APP.Path("E", "D"),
        new APP.Path("E", "C"),
        new APP.Path("E", "G"),
        new APP.Path("E", "F"),
        new APP.Path("E", "A"),
        new APP.Path("F", "E"),
        new APP.Path("F", "G"),
        new APP.Path("G", "F"),
        new APP.Path("G", "E"),
        new APP.Path("G", "C"),
        new APP.Path("G", "A"),
        new APP.Path("G", "H"),
        new APP.Path("H", "A"),
        new APP.Path("H", "G")
    ],
    Depth: 14
};
