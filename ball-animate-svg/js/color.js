var APP = APP || {};

APP.Color = {};
(function (ctx)
{
    ctx.rgb_to_hsl = function (r, g, b)
    {
        /* how to convert rgb to hsl https://en.wikipedia.org/wiki/HSL_and_HSV#RGB_to_HSL_and_HSV */
        var max, min, h, s, l;
        //Value must be in range R,G,B in [0,1]
        r = r / 255;
        g = g / 255;
        b = b / 255;
        min = Math.min(r, g, b);
        max = Math.max(r, g, b);
        if (max === min) h = 0;
        else if (max === r) h = 60 * ((g - b) / (max - min));
        else if (max === g) h = 60 * (2 + (b - r) / (max - min));
        else if (max === b) h = 60 * (4 + (r - g) / (max - min));
        if (h < 0) h = h + 360;
        if (max === 0 || min === 1) s = 0;
        else s = (max - min) / (1 - Math.abs(max + min - 1));
        l = (max + min) / 2;
        //convert to %;
        return { h: h, s: s * 100, l: l * 100 };
    };
    ctx.hsl_to_rgb = function (h, s, l)
    {
        /* how to convert hsl to rgb https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB */
        /* H in [0, 360], S in [0,1], L in [0,1] */
        var c, h1, x, m, rgb = {};
        s = s / 100;
        l = l / 100;
        c = (1 - Math.abs(2 * l - 1)) * s;
        h1 = h / 60;
        x = c * (1 - Math.abs(h1 % 2 - 1));
        if (0 <= h1 && h1 <= 1) rgb = { r: c, g: x, b: 0 };
        else if (1 <= h1 && h1 <= 2) rgb = { r: x, g: c, b: 0 };
        else if (2 <= h1 && h1 <= 3) rgb = { r: 0, g: c, b: x };
        else if (3 <= h1 && h1 <= 4) rgb = { r: 0, g: x, b: c };
        else if (4 <= h1 && h1 <= 5) rgb = { r: x, g: 0, b: c };
        else if (5 <= h1 && h1 <= 6) rgb = { r: c, g: 0, b: x };
        m = l - c / 2;
        //move from [0,1] to [0, 255]
        return { r: Math.floor((rgb.r + m) * 255), g: Math.floor((rgb.g + m) * 255), b: Math.floor((rgb.b + m) * 255) };
    };

    ctx.rgb_to_hex = function (r, g, b)
    {
        var r1 = r.toString(16);
        var g1 = g.toString(16);
        var b1 = b.toString(16);

        return (r1.length === 1 ? '0' + r1 : r1)
            + (g1.length === 1 ? '0' + g1 : g1)
            + (b1.length === 1 ? '0' + b1 : b1);
    };
    ctx.hex_to_rgb = function (hex)
    {
        var arr = [];
        if (hex.length === 3)
        {
            arr = hex.match(/.{1}/g);
        }
        if (hex.length === 6)
        {
            arr = hex.match(/.{2}/g);
        }
        return arr.length === 3
            ? { r: Math.floor(parseInt(arr[0], 16)), g: Math.floor(parseInt(arr[1], 16)), b: Math.floor(parseInt(arr[2], 16)) }
            : { r: 0, g: 0, b: 0 };
    };

    ctx.darken_hsl = function (h, s, l)
    {
        return { h: h, s: s, l: l / 1.5 };
    };
    ctx.darken_hex = function (hex)
    {
        var rgb = ctx.hex_to_rgb(hex);
        var hsl = ctx.rgb_to_hsl(rgb.r, rgb.g, rgb.b);
        hsl = ctx.darken_hsl(hsl.h, hsl.s, hsl.l);
        rgb = ctx.hsl_to_rgb(hsl.h, hsl.s, hsl.l);
        return ctx.rgb_to_hex(rgb.r, rgb.g, rgb.b);
    };

})(APP.Color);