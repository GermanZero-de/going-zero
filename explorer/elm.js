(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}




// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Main$LocalStorageLoaded = function (a) {
	return {$: 'LocalStorageLoaded', a: a};
};
var $author$project$CollapseStatus$CollapseStatus = function (a) {
	return {$: 'CollapseStatus', a: a};
};
var $elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$empty = $elm$core$Set$Set_elm_builtin($elm$core$Dict$empty);
var $author$project$CollapseStatus$allCollapsed = $author$project$CollapseStatus$CollapseStatus($elm$core$Set$empty);
var $author$project$AllRuns$AllRuns = function (a) {
	return {$: 'AllRuns', a: a};
};
var $author$project$AllRuns$firstId = 1;
var $author$project$AllRuns$empty = $author$project$AllRuns$AllRuns(
	{nextId: $author$project$AllRuns$firstId, runs: $elm$core$Dict$empty});
var $author$project$Lens$Classic = function (a) {
	return {$: 'Classic', a: a};
};
var $author$project$Lens$Lens = function (a) {
	return {$: 'Lens', a: a};
};
var $author$project$Lens$empty = $author$project$Lens$Lens(
	{
		label: 'data',
		vkind: $author$project$Lens$Classic(
			{guessedShortLabels: $elm$core$Dict$empty, paths: $elm$core$Set$empty, showGraph: false})
	});
var $author$project$AgsIndex$AgsIndex = function (a) {
	return {$: 'AgsIndex', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$List$sortBy = _List_sortBy;
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$AgsIndex$init = function (agsDataList) {
	var add = F3(
		function (get, agsRecord, acc) {
			var _v1 = $elm$core$String$uncons(
				get(agsRecord.lower));
			if (_v1.$ === 'Nothing') {
				return acc;
			} else {
				var _v2 = _v1.a;
				var ch = _v2.a;
				return A3(
					$elm$core$Dict$update,
					ch,
					function (existing) {
						return $elm$core$Maybe$Just(
							A2(
								$elm$core$List$cons,
								agsRecord,
								A2($elm$core$Maybe$withDefault, _List_Nil, existing)));
					},
					acc);
			}
		});
	var byFirstChar = A2(
		$elm$core$Dict$map,
		F2(
			function (_v0, l) {
				return A2(
					$elm$core$List$sortBy,
					A2(
						$elm$core$Basics$composeR,
						function ($) {
							return $.lower;
						},
						function ($) {
							return $.desc;
						}),
					l);
			}),
		A3(
			$elm$core$List$foldl,
			F2(
				function (agsData, acc) {
					var agsRecord = {
						lower: {
							ags: $elm$core$String$toLower(agsData.ags),
							desc: $elm$core$String$toLower(agsData.desc),
							_short: $elm$core$String$toLower(agsData._short)
						},
						normal: agsData
					};
					return function (acc2) {
						return (agsRecord.normal.ags === 'DG000000') ? acc2 : A3(
							add,
							function ($) {
								return $.desc;
							},
							agsRecord,
							acc2);
					}(
						A3(
							add,
							function ($) {
								return $.ags;
							},
							agsRecord,
							acc));
				}),
			$elm$core$Dict$empty,
			agsDataList));
	return $author$project$AgsIndex$AgsIndex(
		{
			all: A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.desc;
				},
				agsDataList),
			byFirstChar: byFirstChar
		});
};
var $author$project$Html5$DragDrop$NotDragging = {$: 'NotDragging'};
var $author$project$Html5$DragDrop$init = $author$project$Html5$DragDrop$NotDragging;
var $yotamDvir$elm_pivot$Pivot$Types$Pivot = F2(
	function (a, b) {
		return {$: 'Pivot', a: a, b: b};
	});
var $yotamDvir$elm_pivot$Pivot$Create$fromCons = F2(
	function (x, xs) {
		return A2(
			$yotamDvir$elm_pivot$Pivot$Types$Pivot,
			x,
			_Utils_Tuple2(_List_Nil, xs));
	});
var $yotamDvir$elm_pivot$Pivot$Create$singleton = function (x) {
	return A2($yotamDvir$elm_pivot$Pivot$Create$fromCons, x, _List_Nil);
};
var $yotamDvir$elm_pivot$Pivot$singleton = $yotamDvir$elm_pivot$Pivot$Create$singleton;
var $author$project$Lens$All = {$: 'All'};
var $author$project$Lens$Cell = F2(
	function (a, b) {
		return {$: 'Cell', a: a, b: b};
	});
var $author$project$Main$EnterInputs = F3(
	function (a, b, c) {
		return {$: 'EnterInputs', a: a, b: b, c: c};
	});
var $author$project$Main$FileContentLoaded = function (a) {
	return {$: 'FileContentLoaded', a: a};
};
var $author$project$Main$FileUploaded = function (a) {
	return {$: 'FileUploaded', a: a};
};
var $author$project$Main$HighlightRemove = {$: 'HighlightRemove'};
var $author$project$Lens$CellContent$Label = function (a) {
	return {$: 'Label', a: a};
};
var $author$project$Main$ModalMsg = function (a) {
	return {$: 'ModalMsg', a: a};
};
var $author$project$Main$MoveIntoNewColumnRequested = F4(
	function (a, b, c, d) {
		return {$: 'MoveIntoNewColumnRequested', a: a, b: b, c: c, d: d};
	});
var $author$project$Main$MoveIntoNewRowRequested = F4(
	function (a, b, c, d) {
		return {$: 'MoveIntoNewRowRequested', a: a, b: b, c: c, d: d};
	});
var $author$project$Main$MoveToCellRequested = F4(
	function (a, b, c, d) {
		return {$: 'MoveToCellRequested', a: a, b: b, c: c, d: d};
	});
var $author$project$Main$Noop = {$: 'Noop'};
var $author$project$Main$ReMap = function (a) {
	return {$: 'ReMap', a: a};
};
var $author$project$Explorable$Run = function (a) {
	return {$: 'Run', a: a};
};
var $author$project$Main$ScrollIntoView = function (a) {
	return {$: 'ScrollIntoView', a: a};
};
var $author$project$Main$SwapCellsRequested = F6(
	function (a, b, c, d, e, f) {
		return {$: 'SwapCellsRequested', a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $author$project$Lens$CellContent$ValueAt = F2(
	function (a, b) {
		return {$: 'ValueAt', a: a, b: b};
	});
var $author$project$Run$WithoutOverrides = {$: 'WithoutOverrides'};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $yotamDvir$elm_pivot$Pivot$Position$goR = function (_v0) {
	var cx = _v0.a;
	var _v1 = _v0.b;
	var lt = _v1.a;
	var rt = _v1.b;
	if (!rt.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var hd = rt.a;
		var tl = rt.b;
		return $elm$core$Maybe$Just(
			A2(
				$yotamDvir$elm_pivot$Pivot$Types$Pivot,
				hd,
				_Utils_Tuple2(
					A2($elm$core$List$cons, cx, lt),
					tl)));
	}
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $yotamDvir$elm_pivot$Pivot$Utilities$reverse = function (_v0) {
	var c = _v0.a;
	var _v1 = _v0.b;
	var l = _v1.a;
	var r = _v1.b;
	return A2(
		$yotamDvir$elm_pivot$Pivot$Types$Pivot,
		c,
		_Utils_Tuple2(r, l));
};
var $yotamDvir$elm_pivot$Pivot$Utilities$mirrorM = function (f) {
	return A2(
		$elm$core$Basics$composeR,
		$yotamDvir$elm_pivot$Pivot$Utilities$reverse,
		A2(
			$elm$core$Basics$composeR,
			f,
			$elm$core$Maybe$map($yotamDvir$elm_pivot$Pivot$Utilities$reverse)));
};
var $yotamDvir$elm_pivot$Pivot$Position$goL = $yotamDvir$elm_pivot$Pivot$Utilities$mirrorM($yotamDvir$elm_pivot$Pivot$Position$goR);
var $yotamDvir$elm_pivot$Pivot$Position$goRelative = F2(
	function (steps, pvt) {
		return (!steps) ? $elm$core$Maybe$Just(pvt) : ((steps > 0) ? A2(
			$elm$core$Maybe$andThen,
			$yotamDvir$elm_pivot$Pivot$Position$goRelative(steps - 1),
			$yotamDvir$elm_pivot$Pivot$Position$goR(pvt)) : A2(
			$elm$core$Maybe$andThen,
			$yotamDvir$elm_pivot$Pivot$Position$goRelative(steps + 1),
			$yotamDvir$elm_pivot$Pivot$Position$goL(pvt)));
	});
var $yotamDvir$elm_pivot$Pivot$Position$goToStart = function (pvt) {
	goToStart:
	while (true) {
		var _v0 = $yotamDvir$elm_pivot$Pivot$Position$goL(pvt);
		if (_v0.$ === 'Nothing') {
			return pvt;
		} else {
			var pvt_ = _v0.a;
			var $temp$pvt = pvt_;
			pvt = $temp$pvt;
			continue goToStart;
		}
	}
};
var $yotamDvir$elm_pivot$Pivot$Position$goAbsolute = function (dest) {
	return A2(
		$elm$core$Basics$composeR,
		$yotamDvir$elm_pivot$Pivot$Position$goToStart,
		$yotamDvir$elm_pivot$Pivot$Position$goRelative(dest));
};
var $yotamDvir$elm_pivot$Pivot$goTo = $yotamDvir$elm_pivot$Pivot$Position$goAbsolute;
var $yotamDvir$elm_pivot$Pivot$Utilities$withRollback = F2(
	function (f, x) {
		return A2(
			$elm$core$Maybe$withDefault,
			x,
			f(x));
	});
var $yotamDvir$elm_pivot$Pivot$withRollback = $yotamDvir$elm_pivot$Pivot$Utilities$withRollback;
var $author$project$Main$activateLens = F2(
	function (id, model) {
		return _Utils_update(
			model,
			{
				lenses: A2(
					$yotamDvir$elm_pivot$Pivot$withRollback,
					$yotamDvir$elm_pivot$Pivot$goTo(id),
					model.lenses)
			});
	});
var $author$project$AllRuns$add = F2(
	function (ir, _v0) {
		var a = _v0.a;
		var newNextId = a.nextId + 1;
		var _new = A3($elm$core$Dict$insert, a.nextId, ir, a.runs);
		return $author$project$AllRuns$AllRuns(
			{nextId: newNextId, runs: _new});
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $Janiczek$cmd_extra$Cmd$Extra$addCmd = F2(
	function (cmd, _v0) {
		var model = _v0.a;
		var oldCmd = _v0.b;
		return _Utils_Tuple2(
			model,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[oldCmd, cmd])));
	});
var $author$project$Cells$columns = function (_v0) {
	var c = _v0.a;
	return c.columns;
};
var $author$project$Cells$emptyValue = function (_v0) {
	var c = _v0.a;
	return c.empty;
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $author$project$Cells$get = F2(
	function (pos, _v0) {
		var c = _v0.a;
		var startOfRow = c.columns * pos.row;
		return A2(
			$elm$core$Maybe$withDefault,
			c.empty,
			A2($elm$core$Array$get, startOfRow + pos.column, c.values));
	});
var $author$project$Cells$Cells = function (a) {
	return {$: 'Cells', a: a};
};
var $author$project$Cells$initialize = F4(
	function (empty, rowsNum, columnsNum, fn) {
		return $author$project$Cells$Cells(
			{
				columns: columnsNum,
				empty: empty,
				rows: rowsNum,
				values: A2(
					$elm$core$Array$initialize,
					rowsNum * columnsNum,
					function (off) {
						var row = (off / columnsNum) | 0;
						var column = off % columnsNum;
						return fn(
							{column: column, row: row});
					})
			});
	});
var $author$project$Cells$rows = function (_v0) {
	var c = _v0.a;
	return c.rows;
};
var $author$project$Cells$addColumn = F2(
	function (columnNum, cs) {
		return A4(
			$author$project$Cells$initialize,
			$author$project$Cells$emptyValue(cs),
			$author$project$Cells$rows(cs),
			$author$project$Cells$columns(cs) + 1,
			function (p) {
				return (_Utils_cmp(p.column, columnNum) < 0) ? A2($author$project$Cells$get, p, cs) : (_Utils_eq(p.column, columnNum) ? $author$project$Cells$emptyValue(cs) : A2(
					$author$project$Cells$get,
					_Utils_update(
						p,
						{column: p.column - 1}),
					cs));
			});
	});
var $author$project$Cells$addRow = F2(
	function (rowNum, cs) {
		return A4(
			$author$project$Cells$initialize,
			$author$project$Cells$emptyValue(cs),
			$author$project$Cells$rows(cs) + 1,
			$author$project$Cells$columns(cs),
			function (p) {
				return (_Utils_cmp(p.row, rowNum) < 0) ? A2($author$project$Cells$get, p, cs) : (_Utils_eq(p.row, rowNum) ? $author$project$Cells$emptyValue(cs) : A2(
					$author$project$Cells$get,
					_Utils_update(
						p,
						{row: p.row - 1}),
					cs));
			});
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $Janiczek$cmd_extra$Cmd$Extra$andThen = F2(
	function (fn, _v0) {
		var model = _v0.a;
		var cmd = _v0.b;
		var _v1 = fn(model);
		var newModel = _v1.a;
		var newCmd = _v1.b;
		return _Utils_Tuple2(
			newModel,
			$elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[cmd, newCmd])));
	});
var $yotamDvir$elm_pivot$Pivot$Modify$appendGoL = F2(
	function (val, _v0) {
		var c = _v0.a;
		var _v1 = _v0.b;
		var l = _v1.a;
		var r = _v1.b;
		return A2(
			$yotamDvir$elm_pivot$Pivot$Types$Pivot,
			val,
			_Utils_Tuple2(
				l,
				A2($elm$core$List$cons, c, r)));
	});
var $yotamDvir$elm_pivot$Pivot$Utilities$mirror = function (f) {
	return A2(
		$elm$core$Basics$composeR,
		$yotamDvir$elm_pivot$Pivot$Utilities$reverse,
		A2($elm$core$Basics$composeR, f, $yotamDvir$elm_pivot$Pivot$Utilities$reverse));
};
var $yotamDvir$elm_pivot$Pivot$Modify$appendGoR = function (val) {
	return $yotamDvir$elm_pivot$Pivot$Utilities$mirror(
		$yotamDvir$elm_pivot$Pivot$Modify$appendGoL(val));
};
var $yotamDvir$elm_pivot$Pivot$appendGoR = $yotamDvir$elm_pivot$Pivot$Modify$appendGoR;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $author$project$Main$callIf = F3(
	function (p, f, x) {
		return p ? f(x) : x;
	});
var $author$project$Main$callIfJust = F3(
	function (mb, fn, x) {
		if (mb.$ === 'Just') {
			var a = mb.a;
			return A2(fn, a, x);
		} else {
			return x;
		}
	});
var $author$project$Main$copyToClipboard = _Platform_outgoingPort('copyToClipboard', $elm$core$Basics$identity);
var $author$project$Run$Run = function (a) {
	return {$: 'Run', a: a};
};
var $author$project$Run$create = function (_v0) {
	var inputs = _v0.inputs;
	var entries = _v0.entries;
	var result = _v0.result;
	var overrides = _v0.overrides;
	return $author$project$Run$Run(
		{entries: entries, inputs: inputs, overrides: overrides, result: result});
};
var $author$project$Value$String = function (a) {
	return {$: 'String', a: a};
};
var $author$project$Run$WithOverrides = {$: 'WithOverrides'};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Set$insert = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A3($elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var $elm$core$Set$fromList = function (list) {
	return A3($elm$core$List$foldl, $elm$core$Set$insert, $elm$core$Set$empty, list);
};
var $author$project$AllRuns$get = F2(
	function (id, _v0) {
		var a = _v0.a;
		return A2($elm$core$Dict$get, id, a.runs);
	});
var $author$project$Tree$Tree = function (a) {
	return {$: 'Tree', a: a};
};
var $author$project$Tree$getHelper = F2(
	function (path, node) {
		if (!path.b) {
			return $elm$core$Maybe$Just(node);
		} else {
			var name = path.a;
			var pathRest = path.b;
			if (node.$ === 'Leaf') {
				return $elm$core$Maybe$Nothing;
			} else {
				var t = node.a;
				return A2(
					$elm$core$Maybe$andThen,
					$author$project$Tree$getHelper(pathRest),
					A2($elm$core$Dict$get, name, t));
			}
		}
	});
var $author$project$Tree$get = F2(
	function (p, t) {
		return A2(
			$author$project$Tree$getHelper,
			p,
			$author$project$Tree$Tree(t));
	});
var $author$project$Value$Float = function (a) {
	return {$: 'Float', a: a};
};
var $author$project$Tree$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $author$project$Tree$merge = F2(
	function (t1, t2) {
		return A2($elm$core$Dict$union, t1, t2);
	});
var $author$project$Tree$wrap = F2(
	function (name, tree) {
		return $elm$core$Dict$fromList(
			_List_fromArray(
				[
					_Utils_Tuple2(
					name,
					$author$project$Tree$Tree(tree))
				]));
	});
var $author$project$Run$getTree = F2(
	function (h, _v0) {
		var r = _v0.a;
		var entries = function () {
			if (h.$ === 'WithoutOverrides') {
				return A2(
					$elm$core$Dict$map,
					F2(
						function (_v2, v) {
							return $author$project$Tree$Leaf(v);
						}),
					r.entries);
			} else {
				return A2(
					$elm$core$Dict$map,
					F2(
						function (k, v) {
							var _v3 = A2($elm$core$Dict$get, k, r.overrides);
							if (_v3.$ === 'Nothing') {
								return $author$project$Tree$Leaf(v);
							} else {
								var o = _v3.a;
								return $author$project$Tree$Leaf(
									{
										trace: $elm$core$Maybe$Nothing,
										value: $author$project$Value$Float(o)
									});
							}
						}),
					r.entries);
			}
		}();
		return A2(
			$author$project$Tree$merge,
			A2($author$project$Tree$wrap, 'entries', entries),
			A2($author$project$Tree$wrap, 'result', r.result));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $author$project$Cells$foldRowMajor = F3(
	function (fn, init, cs) {
		var helper = F2(
			function (acc, pos) {
				helper:
				while (true) {
					if (_Utils_cmp(
						pos.row,
						$author$project$Cells$rows(cs)) > -1) {
						return acc;
					} else {
						if (_Utils_cmp(
							pos.column,
							$author$project$Cells$columns(cs)) > -1) {
							var $temp$acc = acc,
								$temp$pos = {column: 0, row: pos.row + 1};
							acc = $temp$acc;
							pos = $temp$pos;
							continue helper;
						} else {
							var $temp$acc = A3(
								fn,
								pos,
								A2($author$project$Cells$get, pos, cs),
								acc),
								$temp$pos = _Utils_update(
								pos,
								{column: pos.column + 1});
							acc = $temp$acc;
							pos = $temp$pos;
							continue helper;
						}
					}
				}
			});
		return A2(
			helper,
			init,
			{column: 0, row: 0});
	});
var $author$project$AllRuns$toList = function (_v0) {
	var a = _v0.a;
	return $elm$core$Dict$toList(a.runs);
};
var $author$project$Lens$toList = F2(
	function (runs, _v0) {
		var l = _v0.a;
		var _v1 = l.vkind;
		if (_v1.$ === 'Classic') {
			var c = _v1.a;
			var allPaths = $elm$core$Set$toList(c.paths);
			return A2(
				$elm$core$List$concatMap,
				function (_v2) {
					var ri = _v2.a;
					return A2(
						$elm$core$List$map,
						function (p) {
							return _Utils_Tuple2(ri, p);
						},
						allPaths);
				},
				$author$project$AllRuns$toList(runs));
		} else {
			var td = _v1.a;
			return A3(
				$author$project$Cells$foldRowMajor,
				F3(
					function (_v3, cell, acc) {
						if (cell.$ === 'ValueAt') {
							var ri = cell.a;
							var c = cell.b;
							return A2(
								$elm$core$List$cons,
								_Utils_Tuple2(ri, c),
								acc);
						} else {
							return acc;
						}
					}),
				_List_Nil,
				td.grid);
		}
	});
var $author$project$ValueSet$create = F2(
	function (lens, allRuns) {
		var runsAndPaths = A2($author$project$Lens$toList, allRuns, lens);
		var values = $elm$core$Dict$fromList(
			A2(
				$elm$core$List$map,
				function (_v0) {
					var runId = _v0.a;
					var path = _v0.b;
					var _v1 = A2($author$project$AllRuns$get, runId, allRuns);
					if (_v1.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_Tuple2(runId, path),
							{
								trace: $elm$core$Maybe$Nothing,
								value: $author$project$Value$String('')
							});
					} else {
						var run = _v1.a;
						var _v2 = A2(
							$author$project$Tree$get,
							path,
							A2($author$project$Run$getTree, $author$project$Run$WithOverrides, run));
						if (_v2.$ === 'Nothing') {
							return _Utils_Tuple2(
								_Utils_Tuple2(runId, path),
								{
									trace: $elm$core$Maybe$Nothing,
									value: $author$project$Value$String('')
								});
						} else {
							if (_v2.a.$ === 'Tree') {
								return _Utils_Tuple2(
									_Utils_Tuple2(runId, path),
									{
										trace: $elm$core$Maybe$Nothing,
										value: $author$project$Value$String('TREE')
									});
							} else {
								var v = _v2.a.a;
								return _Utils_Tuple2(
									_Utils_Tuple2(runId, path),
									v);
							}
						}
					}
				},
				runsAndPaths));
		var runs = $elm$core$Set$toList(
			$elm$core$Set$fromList(
				A2($elm$core$List$map, $elm$core$Tuple$first, runsAndPaths)));
		var paths = $elm$core$Set$toList(
			$elm$core$Set$fromList(
				A2($elm$core$List$map, $elm$core$Tuple$second, runsAndPaths)));
		return {paths: paths, runs: runs, values: values};
	});
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Lens$Table = function (a) {
	return {$: 'Table', a: a};
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Lens$classicDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (showGraph, paths) {
			return {guessedShortLabels: $elm$core$Dict$empty, paths: paths, showGraph: showGraph};
		}),
	A2($elm$json$Json$Decode$field, 'showGraph', $elm$json$Json$Decode$bool),
	A2(
		$elm$json$Json$Decode$field,
		'paths',
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Set$fromList,
			$elm$json$Json$Decode$list(
				$elm$json$Json$Decode$list($elm$json$Json$Decode$string)))));
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $author$project$Lens$cellDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$map, $author$project$Lens$CellContent$Label, $elm$json$Json$Decode$string),
			A2(
			$elm$json$Json$Decode$map,
			$author$project$Lens$CellContent$ValueAt($author$project$AllRuns$firstId),
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
			A3(
			$elm$json$Json$Decode$map2,
			$author$project$Lens$CellContent$ValueAt,
			A2($elm$json$Json$Decode$field, 'run', $elm$json$Json$Decode$int),
			A2(
				$elm$json$Json$Decode$field,
				'path',
				$elm$json$Json$Decode$list($elm$json$Json$Decode$string)))
		]));
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $author$project$Cells$repeat = F3(
	function (empty, rowNum, columnNum) {
		return $author$project$Cells$Cells(
			{
				columns: columnNum,
				empty: empty,
				rows: rowNum,
				values: A2($elm$core$Array$repeat, rowNum * columnNum, empty)
			});
	});
var $author$project$Cells$decoder = F2(
	function (empty, cellDecoder) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (listOfRows) {
				if (!listOfRows.b) {
					return $elm$json$Json$Decode$succeed(
						A3($author$project$Cells$repeat, empty, 0, 0));
				} else {
					var r1 = listOfRows.a;
					var rRest = listOfRows.b;
					var numRows = $elm$core$List$length(rRest) + 1;
					var numColumns = $elm$core$List$length(r1);
					return A2(
						$elm$core$List$all,
						function (l) {
							return _Utils_eq(
								$elm$core$List$length(l),
								numColumns);
						},
						rRest) ? $elm$json$Json$Decode$succeed(
						$author$project$Cells$Cells(
							{
								columns: numColumns,
								empty: empty,
								rows: numRows,
								values: $elm$core$Array$fromList(
									$elm$core$List$concat(listOfRows))
							})) : $elm$json$Json$Decode$fail('Irregular shaped cells');
				}
			},
			$elm$json$Json$Decode$list(
				$elm$json$Json$Decode$list(cellDecoder)));
	});
var $author$project$Lens$tableDecoder = A2(
	$elm$json$Json$Decode$map,
	function (g) {
		return {editing: $elm$core$Maybe$Nothing, grid: g};
	},
	A2(
		$author$project$Cells$decoder,
		$author$project$Lens$CellContent$Label(''),
		$author$project$Lens$cellDecoder));
var $elm_community$list_extra$List$Extra$last = function (items) {
	last:
	while (true) {
		if (!items.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!items.b.b) {
				var x = items.a;
				return $elm$core$Maybe$Just(x);
			} else {
				var rest = items.b;
				var $temp$items = rest;
				items = $temp$items;
				continue last;
			}
		}
	}
};
var $elm_community$list_extra$List$Extra$unconsLast = function (list) {
	var _v0 = $elm$core$List$reverse(list);
	if (!_v0.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var last_ = _v0.a;
		var rest = _v0.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(
				last_,
				$elm$core$List$reverse(rest)));
	}
};
var $author$project$Lens$mapLast = F2(
	function (f, l) {
		var _v0 = $elm_community$list_extra$List$Extra$unconsLast(l);
		if (_v0.$ === 'Nothing') {
			return _List_Nil;
		} else {
			var _v1 = _v0.a;
			var x = _v1.a;
			var prefix = _v1.b;
			return _Utils_ap(
				prefix,
				_List_fromArray(
					[
						f(x)
					]));
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Lens$Skip = function (a) {
	return {$: 'Skip', a: a};
};
var $author$project$Lens$Take = {$: 'Take'};
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $author$project$Lens$shorten = F2(
	function (delim, lists) {
		var makeShortener = F2(
			function (res, ps) {
				makeShortener:
				while (true) {
					if (A2($elm$core$List$any, $elm$core$List$isEmpty, ps)) {
						return $elm$core$List$reverse(res);
					} else {
						if (!ps.b) {
							return $elm$core$List$reverse(res);
						} else {
							var a = ps.a;
							var rest = ps.b;
							if (A2(
								$elm$core$List$all,
								function (p) {
									return _Utils_eq(
										$elm$core$List$head(p),
										$elm$core$List$head(a));
								},
								rest)) {
								var $temp$res = A2(
									$elm$core$List$cons,
									$author$project$Lens$Skip(
										A2(
											$elm$core$Maybe$withDefault,
											'',
											$elm$core$List$head(a))),
									res),
									$temp$ps = A2(
									$elm$core$List$map,
									$elm$core$List$drop(1),
									ps);
								res = $temp$res;
								ps = $temp$ps;
								continue makeShortener;
							} else {
								var $temp$res = A2($elm$core$List$cons, $author$project$Lens$Take, res),
									$temp$ps = A2(
									$elm$core$List$map,
									$elm$core$List$drop(1),
									ps);
								res = $temp$res;
								ps = $temp$ps;
								continue makeShortener;
							}
						}
					}
				}
			});
		var shortener = A2(makeShortener, _List_Nil, lists);
		var applyShortener = F3(
			function (ins, res, list) {
				applyShortener:
				while (true) {
					var _v1 = _Utils_Tuple2(ins, list);
					if (!_v1.a.b) {
						return A2(
							$elm$core$String$join,
							delim,
							_Utils_ap(
								$elm$core$List$reverse(res),
								list));
					} else {
						if (!_v1.b.b) {
							return 'CAN\'T HAPPEN BECAUSE OF THE WAY SHORTENER IS CONSTRUCTED';
						} else {
							if (_v1.a.a.$ === 'Skip') {
								var _v2 = _v1.a;
								var s = _v2.a.a;
								var insRest = _v2.b;
								var _v3 = _v1.b;
								var listRest = _v3.b;
								var $temp$ins = insRest,
									$temp$res = res,
									$temp$list = listRest;
								ins = $temp$ins;
								res = $temp$res;
								list = $temp$list;
								continue applyShortener;
							} else {
								var _v4 = _v1.a;
								var _v5 = _v4.a;
								var insRest = _v4.b;
								var _v6 = _v1.b;
								var l = _v6.a;
								var listRest = _v6.b;
								var $temp$ins = insRest,
									$temp$res = A2($elm$core$List$cons, l, res),
									$temp$list = listRest;
								ins = $temp$ins;
								res = $temp$res;
								list = $temp$list;
								continue applyShortener;
							}
						}
					}
				}
			});
		return A2(
			$elm$core$List$map,
			A2(applyShortener, shortener, _List_Nil),
			lists);
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $author$project$Lens$guessShortPathLabels = function (paths) {
	var _v0 = $elm$core$Set$toList(paths);
	if (_v0.b && (!_v0.b.b)) {
		var onlyOne = _v0.a;
		return A2(
			$elm$core$Dict$singleton,
			onlyOne,
			A2(
				$elm$core$Maybe$withDefault,
				'',
				$elm_community$list_extra$List$Extra$last(onlyOne)));
	} else {
		var pathList = _v0;
		var shortLabels = function () {
			var shortenedLastElements = A2(
				$author$project$Lens$shorten,
				'_',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$String$split('_'),
							$elm$core$Maybe$withDefault('')),
						$elm_community$list_extra$List$Extra$last),
					pathList));
			return A2(
				$author$project$Lens$shorten,
				'.',
				A3(
					$elm$core$List$map2,
					F2(
						function (l, e) {
							return A2(
								$author$project$Lens$mapLast,
								$elm$core$Basics$always(e),
								l);
						}),
					pathList,
					shortenedLastElements));
		}();
		return $elm$core$Dict$fromList(
			A3($elm$core$List$map2, $elm$core$Tuple$pair, pathList, shortLabels));
	}
};
var $author$project$Lens$mapClassic = F2(
	function (fn, _v0) {
		var i = _v0.a;
		var _v1 = i.vkind;
		if (_v1.$ === 'Table') {
			return $author$project$Lens$Lens(i);
		} else {
			var c = _v1.a;
			return $author$project$Lens$Lens(
				_Utils_update(
					i,
					{
						vkind: $author$project$Lens$Classic(
							fn(c))
					}));
		}
	});
var $author$project$Lens$updateShortPathLabels = $author$project$Lens$mapClassic(
	function (c) {
		return _Utils_update(
			c,
			{
				guessedShortLabels: $author$project$Lens$guessShortPathLabels(c.paths)
			});
	});
var $author$project$Lens$decoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (label, vkind) {
			return $author$project$Lens$updateShortPathLabels(
				$author$project$Lens$Lens(
					{label: label, vkind: vkind}));
		}),
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$andThen,
		function (kind) {
			switch (kind) {
				case 'classic':
					return A2($elm$json$Json$Decode$map, $author$project$Lens$Classic, $author$project$Lens$classicDecoder);
				case 'table':
					return A2(
						$elm$json$Json$Decode$map,
						$author$project$Lens$Table,
						A2($elm$json$Json$Decode$field, 'table', $author$project$Lens$tableDecoder));
				default:
					return $elm$json$Json$Decode$fail('Invalid kind');
			}
		},
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Maybe$withDefault('table'),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'kind', $elm$json$Json$Decode$string)))));
var $author$project$Storage$v1Decoder = A2(
	$elm$json$Json$Decode$map,
	function (l) {
		return {interestLists: l};
	},
	A2(
		$elm$json$Json$Decode$field,
		'interestLists',
		$elm$json$Json$Decode$list($author$project$Lens$decoder)));
var $author$project$Storage$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (v) {
		if (v === 1) {
			return $author$project$Storage$v1Decoder;
		} else {
			return $elm$json$Json$Decode$fail(
				'unknown version number ' + ($elm$core$String$fromInt(v) + ' encountered '));
		}
	},
	A2($elm$json$Json$Decode$field, 'version', $elm$json$Json$Decode$int));
var $author$project$Value$minimumTolerance = 1.0e-2;
var $author$project$Value$defaultTolerance = $author$project$Value$minimumTolerance;
var $author$project$Cells$deleteColumn = F2(
	function (columnNum, cs) {
		return A4(
			$author$project$Cells$initialize,
			$author$project$Cells$emptyValue(cs),
			$author$project$Cells$rows(cs),
			$author$project$Cells$columns(cs) - 1,
			function (p) {
				return (_Utils_cmp(p.column, columnNum) < 0) ? A2($author$project$Cells$get, p, cs) : A2(
					$author$project$Cells$get,
					_Utils_update(
						p,
						{column: p.column + 1}),
					cs);
			});
	});
var $author$project$Cells$deleteRow = F2(
	function (rowNum, cs) {
		return A4(
			$author$project$Cells$initialize,
			$author$project$Cells$emptyValue(cs),
			$author$project$Cells$rows(cs) - 1,
			$author$project$Cells$columns(cs),
			function (p) {
				return (_Utils_cmp(p.row, rowNum) < 0) ? A2($author$project$Cells$get, p, cs) : A2(
					$author$project$Cells$get,
					_Utils_update(
						p,
						{row: p.row + 1}),
					cs);
			});
	});
var $author$project$Diff$LeftOnly = function (a) {
	return {$: 'LeftOnly', a: a};
};
var $author$project$Diff$RightOnly = function (a) {
	return {$: 'RightOnly', a: a};
};
var $author$project$Diff$Unequal = F2(
	function (a, b) {
		return {$: 'Unequal', a: a, b: b};
	});
var $author$project$Tree$empty = $elm$core$Dict$empty;
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $author$project$Diff$diff = F3(
	function (valueIsEqual, a, b) {
		var insertRightOnlyTree = F3(
			function (key, rightOnlyTree, acc) {
				return A3(
					$elm$core$Dict$insert,
					key,
					$author$project$Tree$Tree(
						A3($author$project$Diff$diff, valueIsEqual, $author$project$Tree$empty, rightOnlyTree)),
					acc);
			});
		var insertLeftOnlyTree = F3(
			function (key, leftOnlyTree, acc) {
				return A3(
					$elm$core$Dict$insert,
					key,
					$author$project$Tree$Tree(
						A3($author$project$Diff$diff, valueIsEqual, leftOnlyTree, $author$project$Tree$empty)),
					acc);
			});
		return A6(
			$elm$core$Dict$merge,
			F3(
				function (key, value, acc) {
					if (value.$ === 'Tree') {
						var leftOnlyTree = value.a;
						return A3(insertLeftOnlyTree, key, leftOnlyTree, acc);
					} else {
						var leaf = value.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							$author$project$Tree$Leaf(
								$author$project$Diff$LeftOnly(leaf)),
							acc);
					}
				}),
			F4(
				function (key, value1, value2, acc) {
					var _v1 = _Utils_Tuple2(value1, value2);
					if (_v1.a.$ === 'Tree') {
						if (_v1.b.$ === 'Tree') {
							var t1 = _v1.a.a;
							var t2 = _v1.b.a;
							var t = A3($author$project$Diff$diff, valueIsEqual, t1, t2);
							return $elm$core$Dict$isEmpty(t) ? acc : A3(
								$elm$core$Dict$insert,
								key,
								$author$project$Tree$Tree(t),
								acc);
						} else {
							var leftOnlyTree = _v1.a.a;
							return A3(insertLeftOnlyTree, key, leftOnlyTree, acc);
						}
					} else {
						if (_v1.b.$ === 'Tree') {
							var rightOnlyTree = _v1.b.a;
							return A3(insertRightOnlyTree, key, rightOnlyTree, acc);
						} else {
							var l1 = _v1.a.a;
							var l2 = _v1.b.a;
							return A2(valueIsEqual, l1, l2) ? acc : A3(
								$elm$core$Dict$insert,
								key,
								$author$project$Tree$Leaf(
									A2($author$project$Diff$Unequal, l1, l2)),
								acc);
						}
					}
				}),
			F3(
				function (key, value, acc) {
					if (value.$ === 'Tree') {
						var rightOnlyTree = value.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							$author$project$Tree$Tree(
								A3($author$project$Diff$diff, valueIsEqual, $author$project$Tree$empty, rightOnlyTree)),
							acc);
					} else {
						var leaf = value.a;
						return A3(
							$elm$core$Dict$insert,
							key,
							$author$project$Tree$Leaf(
								$author$project$Diff$RightOnly(leaf)),
							acc);
					}
				}),
			a,
			b,
			$elm$core$Dict$empty);
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $author$project$Value$isEqual = F3(
	function (tolerance, a, b) {
		var _v0 = _Utils_Tuple2(a, b);
		switch (_v0.a.$) {
			case 'Float':
				switch (_v0.b.$) {
					case 'Float':
						var fa = _v0.a.a;
						var fb = _v0.b.a;
						var _v3 = _Utils_Tuple2(
							$elm$core$Basics$isNaN(fa),
							$elm$core$Basics$isNaN(fb));
						if (_v3.a) {
							if (_v3.b) {
								return true;
							} else {
								return false;
							}
						} else {
							if (_v3.b) {
								return false;
							} else {
								var d = $elm$core$Basics$abs(fb - fa);
								return _Utils_cmp(
									d,
									A2(
										$elm$core$Basics$max,
										tolerance * A2(
											$elm$core$Basics$max,
											$elm$core$Basics$abs(fa),
											$elm$core$Basics$abs(fb)),
										1.0e-12)) < 1;
							}
						}
					case 'Null':
						var _v4 = _v0.b;
						return false;
					default:
						return false;
				}
			case 'String':
				switch (_v0.b.$) {
					case 'String':
						var sa = _v0.a.a;
						var sb = _v0.b.a;
						return _Utils_eq(sa, sb);
					case 'Float':
						return false;
					default:
						var _v5 = _v0.b;
						return false;
				}
			default:
				switch (_v0.b.$) {
					case 'Null':
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return true;
					case 'Float':
						var _v6 = _v0.a;
						return false;
					default:
						var _v7 = _v0.a;
						return false;
				}
		}
	});
var $author$project$Value$isValueEqual = F3(
	function (tolerance, a, b) {
		return A3($author$project$Value$isEqual, tolerance, a.value, b.value);
	});
var $author$project$Main$diffRunsById = F4(
	function (idA, idB, tolerance, model) {
		var _v0 = _Utils_Tuple2(
			A2($author$project$AllRuns$get, idA, model.runs),
			A2($author$project$AllRuns$get, idB, model.runs));
		if (_v0.a.$ === 'Nothing') {
			var _v1 = _v0.a;
			return $elm$core$Maybe$Nothing;
		} else {
			if (_v0.b.$ === 'Nothing') {
				var _v2 = _v0.b;
				return $elm$core$Maybe$Nothing;
			} else {
				var runA = _v0.a.a;
				var runB = _v0.b.a;
				var diff = A3(
					$author$project$Diff$diff,
					$author$project$Value$isValueEqual(tolerance / 100.0),
					A2($author$project$Run$getTree, $author$project$Run$WithOverrides, runA),
					A2($author$project$Run$getTree, $author$project$Run$WithOverrides, runB));
				var diffData = {diff: diff, tolerance: tolerance};
				return $elm$core$Maybe$Just(diffData);
			}
		}
	});
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$json$Json$Encode$array = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$Array$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm_community$list_extra$List$Extra$initialize = F2(
	function (n, f) {
		var step = F2(
			function (i, acc) {
				step:
				while (true) {
					if (i < 0) {
						return acc;
					} else {
						var $temp$i = i - 1,
							$temp$acc = A2(
							$elm$core$List$cons,
							f(i),
							acc);
						i = $temp$i;
						acc = $temp$acc;
						continue step;
					}
				}
			});
		return A2(step, n - 1, _List_Nil);
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $author$project$Cells$toListOfArrays = function (_v0) {
	var c = _v0.a;
	return A2(
		$elm_community$list_extra$List$Extra$initialize,
		c.rows,
		function (row) {
			var start = row * c.columns;
			return A3($elm$core$Array$slice, start, start + c.columns, c.values);
		});
};
var $author$project$Cells$encode = F2(
	function (encodeCell, cs) {
		return A2(
			$elm$json$Json$Encode$list,
			$elm$json$Json$Encode$array(encodeCell),
			$author$project$Cells$toListOfArrays(cs));
	});
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$core$Set$foldl = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $elm$json$Json$Encode$set = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$Set$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Lens$encode = function (_v0) {
	var i = _v0.a;
	var kindFields = function () {
		var _v1 = i.vkind;
		if (_v1.$ === 'Classic') {
			var c = _v1.a;
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'kind',
					$elm$json$Json$Encode$string('classic')),
					_Utils_Tuple2(
					'showGraph',
					$elm$json$Json$Encode$bool(c.showGraph)),
					_Utils_Tuple2(
					'paths',
					A2(
						$elm$json$Json$Encode$set,
						$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
						c.paths))
				]);
		} else {
			var td = _v1.a;
			var encodeCell = function (mp) {
				if (mp.$ === 'ValueAt') {
					var ri = mp.a;
					var p = mp.b;
					return $elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'run',
								$elm$json$Json$Encode$int(ri)),
								_Utils_Tuple2(
								'path',
								A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, p))
							]));
				} else {
					var s = mp.a;
					return $elm$json$Json$Encode$string(s);
				}
			};
			return _List_fromArray(
				[
					_Utils_Tuple2(
					'kind',
					$elm$json$Json$Encode$string('table')),
					_Utils_Tuple2(
					'table',
					A2($author$project$Cells$encode, encodeCell, td.grid))
				]);
		}
	}();
	return $elm$json$Json$Encode$object(
		A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'label',
				$elm$json$Json$Encode$string(i.label)),
			kindFields));
};
var $author$project$Storage$encodeV1 = function (_v0) {
	var interestLists = _v0.interestLists;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'version',
				$elm$json$Json$Encode$int(1)),
				_Utils_Tuple2(
				'interestLists',
				A2($elm$json$Json$Encode$list, $author$project$Lens$encode, interestLists))
			]));
};
var $author$project$Storage$encode = function (s) {
	return $author$project$Storage$encodeV1(s);
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$file$File$Download$string = F3(
	function (name, mime, content) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$never,
			A3(_File_download, name, mime, content));
	});
var $yotamDvir$elm_pivot$Pivot$Utilities$reversePrependList = F2(
	function (l, r) {
		reversePrependList:
		while (true) {
			if (l.b) {
				var x = l.a;
				var xs = l.b;
				var $temp$l = xs,
					$temp$r = A2($elm$core$List$cons, x, r);
				l = $temp$l;
				r = $temp$r;
				continue reversePrependList;
			} else {
				return r;
			}
		}
	});
var $yotamDvir$elm_pivot$Pivot$Get$getA = function (_v0) {
	var c = _v0.a;
	var _v1 = _v0.b;
	var l = _v1.a;
	var r = _v1.b;
	return A2(
		$yotamDvir$elm_pivot$Pivot$Utilities$reversePrependList,
		l,
		A2($elm$core$List$cons, c, r));
};
var $yotamDvir$elm_pivot$Pivot$getA = $yotamDvir$elm_pivot$Pivot$Get$getA;
var $yotamDvir$elm_pivot$Pivot$toList = $yotamDvir$elm_pivot$Pivot$getA;
var $author$project$Main$downloadCmd = function (model) {
	var content = A2(
		$elm$json$Json$Encode$encode,
		0,
		$author$project$Storage$encode(
			{
				interestLists: $yotamDvir$elm_pivot$Pivot$toList(model.lenses)
			}));
	return A3($elm$file$File$Download$string, 'explorer.json', 'text/json', content);
};
var $author$project$Lens$emptyTable = $author$project$Lens$Lens(
	{
		label: 'data',
		vkind: $author$project$Lens$Table(
			{
				editing: $elm$core$Maybe$Nothing,
				grid: A3(
					$author$project$Cells$repeat,
					$author$project$Lens$CellContent$Label(''),
					2,
					2)
			})
	});
var $author$project$Tree$expandHelper = F2(
	function (path, t) {
		return A2(
			$elm$core$List$concatMap,
			function (_v0) {
				var name = _v0.a;
				var child = _v0.b;
				if (child.$ === 'Leaf') {
					return _List_fromArray(
						[
							_Utils_ap(
							path,
							_List_fromArray(
								[name]))
						]);
				} else {
					var childTree = child.a;
					return A2(
						$author$project$Tree$expandHelper,
						_Utils_ap(
							path,
							_List_fromArray(
								[name])),
						childTree);
				}
			},
			$elm$core$Dict$toList(t));
	});
var $author$project$Tree$expand = $author$project$Tree$expandHelper(_List_Nil);
var $elm$core$Bitwise$or = _Bitwise_or;
var $author$project$Explorable$toComparable = function (e) {
	if (e.$ === 'Run') {
		var r = e.a;
		return r;
	} else {
		var r1 = e.a;
		var r2 = e.b;
		return (r1 << 16) | r2;
	}
};
var $author$project$CollapseStatus$absolutePath = F2(
	function (i, p) {
		return _Utils_Tuple2(
			$author$project$Explorable$toComparable(i),
			p);
	});
var $author$project$CollapseStatus$expand = F3(
	function (i, p, _v0) {
		var s = _v0.a;
		return $author$project$CollapseStatus$CollapseStatus(
			A2(
				$elm$core$Set$insert,
				A2($author$project$CollapseStatus$absolutePath, i, p),
				s));
	});
var $elm_community$list_extra$List$Extra$inits = A2(
	$elm$core$List$foldr,
	F2(
		function (e, acc) {
			return A2(
				$elm$core$List$cons,
				_List_Nil,
				A2(
					$elm$core$List$map,
					$elm$core$List$cons(e),
					acc));
		}),
	_List_fromArray(
		[_List_Nil]));
var $author$project$CollapseStatus$expandUntil = F3(
	function (i, p, s) {
		return A3(
			$elm$core$List$foldl,
			$author$project$CollapseStatus$expand(i),
			s,
			$elm_community$list_extra$List$Extra$inits(p));
	});
var $elm$file$File$Select$file = F2(
	function (mimes, toMsg) {
		return A2(
			$elm$core$Task$perform,
			toMsg,
			_File_uploadOne(mimes));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $author$project$Glob$matchHelper = F2(
	function (pattern, text) {
		matchHelper:
		while (true) {
			var _v0 = _Utils_Tuple2(
				$elm$core$String$uncons(pattern),
				$elm$core$String$uncons(text));
			_v0$2:
			while (true) {
				if (_v0.a.$ === 'Nothing') {
					if (_v0.b.$ === 'Nothing') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return true;
					} else {
						var _v3 = _v0.a;
						return false;
					}
				} else {
					if (_v0.b.$ === 'Nothing') {
						if (('*' === _v0.a.a.a.valueOf()) && (_v0.a.a.b === '')) {
							break _v0$2;
						} else {
							var _v5 = _v0.b;
							return false;
						}
					} else {
						if (('*' === _v0.a.a.a.valueOf()) && (_v0.a.a.b === '')) {
							break _v0$2;
						} else {
							var _v6 = _v0.a.a;
							var p = _v6.a;
							var ps = _v6.b;
							var _v7 = _v0.b.a;
							var t = _v7.a;
							var ts = _v7.b;
							switch (p.valueOf()) {
								case '?':
									var $temp$pattern = ps,
										$temp$text = ts;
									pattern = $temp$pattern;
									text = $temp$text;
									continue matchHelper;
								case '*':
									return A2($author$project$Glob$matchHelper, pattern, ts) || A2($author$project$Glob$matchHelper, ps, text);
								default:
									return _Utils_eq(p, t) && A2($author$project$Glob$matchHelper, ps, ts);
							}
						}
					}
				}
			}
			var _v4 = _v0.a.a;
			return true;
		}
	});
var $author$project$Glob$match = F2(
	function (pattern, text) {
		var lowerText = $elm$core$String$toLower(text);
		var lowerPat = $elm$core$String$toLower(pattern);
		return (A2($elm$core$String$contains, '?', lowerPat) || A2($elm$core$String$contains, '*', lowerPat)) ? A2($author$project$Glob$matchHelper, lowerPat, lowerText) : _Utils_eq(lowerPat, lowerText);
	});
var $author$project$Filter$filterWord = F2(
	function (pattern, tree) {
		return $elm$core$Dict$fromList(
			A2(
				$elm$core$List$filterMap,
				function (_v0) {
					var name = _v0.a;
					var child = _v0.b;
					if (A2($author$project$Glob$match, pattern, name)) {
						return $elm$core$Maybe$Just(
							_Utils_Tuple2(name, child));
					} else {
						if (child.$ === 'Leaf') {
							return $elm$core$Maybe$Nothing;
						} else {
							var childTree = child.a;
							var newChildTree = A2($author$project$Filter$filterWord, pattern, childTree);
							return $elm$core$Dict$isEmpty(newChildTree) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
								_Utils_Tuple2(
									name,
									$author$project$Tree$Tree(newChildTree)));
						}
					}
				},
				$elm$core$Dict$toList(tree)));
	});
var $elm$core$String$words = _String_words;
var $author$project$Filter$filter = F2(
	function (pattern, tree) {
		var words = $elm$core$String$words(pattern);
		return $elm$core$List$isEmpty(words) ? $elm$core$Dict$empty : A3($elm$core$List$foldl, $author$project$Filter$filterWord, tree, words);
	});
var $elm_community$maybe_extra$Maybe$Extra$filter = F2(
	function (f, m) {
		if (m.$ === 'Just') {
			var a = m.a;
			return f(a) ? m : $elm$core$Maybe$Nothing;
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Main$filterFieldId = 'filter';
var $author$project$Html5$DragDrop$dragstart = _Platform_outgoingPort('dragstart', $elm$core$Basics$identity);
var $author$project$Html5$DragDrop$getDragstartEvent = function (msg) {
	if (msg.$ === 'DragStart') {
		var dragId = msg.a;
		var event = msg.b;
		return $elm$core$Maybe$Just(
			{dragId: dragId, event: event});
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Html5$DragDrop$fixFirefoxDragStartCmd = function (msg) {
	return A2(
		$elm$core$Maybe$withDefault,
		$elm$core$Platform$Cmd$none,
		A2(
			$elm$core$Maybe$map,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.event;
				},
				$author$project$Html5$DragDrop$dragstart),
			$author$project$Html5$DragDrop$getDragstartEvent(msg)));
};
var $liwenjun$elm_jsonrpc$JsonRpc$HttpErr = function (a) {
	return {$: 'HttpErr', a: a};
};
var $liwenjun$elm_jsonrpc$JsonRpc$RpcErr = function (a) {
	return {$: 'RpcErr', a: a};
};
var $liwenjun$elm_jsonrpc$JsonRpc$RpcResult = function (a) {
	return {$: 'RpcResult', a: a};
};
var $liwenjun$elm_jsonrpc$JsonRpc$flatResponse = function (rpc) {
	if (rpc.$ === 'InnerResult') {
		var v = rpc.a;
		return $liwenjun$elm_jsonrpc$JsonRpc$RpcResult(v);
	} else {
		var e = rpc.a;
		return $liwenjun$elm_jsonrpc$JsonRpc$RpcErr(e);
	}
};
var $liwenjun$elm_jsonrpc$JsonRpc$flat = function (rpc) {
	if (rpc.$ === 'Ok') {
		var d = rpc.a;
		return $liwenjun$elm_jsonrpc$JsonRpc$flatResponse(d);
	} else {
		var e = rpc.a;
		return $liwenjun$elm_jsonrpc$JsonRpc$HttpErr(e);
	}
};
var $elm$browser$Browser$Dom$focus = _Browser_call('focus');
var $yotamDvir$elm_pivot$Pivot$Create$fromList = function (l) {
	if (!l.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var hd = l.a;
		var tl = l.b;
		return $elm$core$Maybe$Just(
			A2($yotamDvir$elm_pivot$Pivot$Create$fromCons, hd, tl));
	}
};
var $yotamDvir$elm_pivot$Pivot$fromList = $yotamDvir$elm_pivot$Pivot$Create$fromList;
var $yotamDvir$elm_pivot$Pivot$Get$getC = function (_v0) {
	var c = _v0.a;
	return c;
};
var $yotamDvir$elm_pivot$Pivot$getC = $yotamDvir$elm_pivot$Pivot$Get$getC;
var $author$project$Main$getActiveLens = function (model) {
	return $yotamDvir$elm_pivot$Pivot$getC(model.lenses);
};
var $author$project$Run$getInputs = function (_v0) {
	var r = _v0.a;
	return r.inputs;
};
var $author$project$Run$getOverrides = function (_v0) {
	var r = _v0.a;
	return r.overrides;
};
var $author$project$Cells$ifHasAZeroDimensionReplaceByOneCell = function (cs) {
	return ((!$author$project$Cells$rows(cs)) || (!$author$project$Cells$columns(cs))) ? A3(
		$author$project$Cells$repeat,
		$author$project$Cells$emptyValue(cs),
		1,
		1) : cs;
};
var $yotamDvir$elm_pivot$Pivot$Position$lengthL = function (_v0) {
	var _v1 = _v0.b;
	var l = _v1.a;
	return $elm$core$List$length(l);
};
var $yotamDvir$elm_pivot$Pivot$Map$mapWholeCLR = F4(
	function (onC, onL, onR, _v0) {
		var c = _v0.a;
		var _v1 = _v0.b;
		var l = _v1.a;
		var r = _v1.b;
		return A2(
			$yotamDvir$elm_pivot$Pivot$Types$Pivot,
			onC(c),
			_Utils_Tuple2(
				onL(l),
				onR(r)));
	});
var $yotamDvir$elm_pivot$Pivot$Map$indexAbsolute = function (pvt) {
	var n = $yotamDvir$elm_pivot$Pivot$Position$lengthL(pvt);
	var onC = function (x) {
		return _Utils_Tuple2(n, x);
	};
	var onL = $elm$core$List$indexedMap(
		F2(
			function (i, x) {
				return _Utils_Tuple2((n - i) - 1, x);
			}));
	var onR = $elm$core$List$indexedMap(
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Basics$add(n + 1),
			F2(
				function (i, x) {
					return _Utils_Tuple2(i, x);
				})));
	return A4($yotamDvir$elm_pivot$Pivot$Map$mapWholeCLR, onC, onL, onR, pvt);
};
var $yotamDvir$elm_pivot$Pivot$indexAbsolute = $yotamDvir$elm_pivot$Pivot$Map$indexAbsolute;
var $author$project$AgsIndex$lookup = F2(
	function (filter, _v0) {
		var byFirstChar = _v0.a.byFirstChar;
		var all = _v0.a.all;
		var lFilter = $elm$core$String$toLower(filter);
		var _v1 = $elm$core$String$uncons(lFilter);
		if (_v1.$ === 'Nothing') {
			return all;
		} else {
			var _v2 = _v1.a;
			var firstChar = _v2.a;
			var _v3 = A2($elm$core$Dict$get, firstChar, byFirstChar);
			if (_v3.$ === 'Nothing') {
				return _List_Nil;
			} else {
				var candidates = _v3.a;
				return A2(
					$elm$core$List$filterMap,
					function (a) {
						return (A2($elm$core$String$startsWith, lFilter, a.lower.ags) || A2($elm$core$String$startsWith, lFilter, a.lower.desc)) ? $elm$core$Maybe$Just(a.normal) : $elm$core$Maybe$Nothing;
					},
					candidates);
			}
		}
	});
var $author$project$EnterInputsDialog$init = F3(
	function (year, agsFilter, agsIndex) {
		return {
			agsFilter: agsFilter,
			agsIndex: agsIndex,
			filteredAgs: A2($author$project$AgsIndex$lookup, agsFilter, agsIndex),
			year: year
		};
	});
var $author$project$Main$GotGeneratorResult = F5(
	function (a, b, c, d, e) {
		return {$: 'GotGeneratorResult', a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Main$Loading = {$: 'Loading'};
var $author$project$GeneratorRpc$apiUrl = '/localzero/api/v0/';
var $liwenjun$elm_jsonrpc$JsonRpc$InnerError = function (a) {
	return {$: 'InnerError', a: a};
};
var $liwenjun$elm_jsonrpc$JsonRpc$InnerResult = function (a) {
	return {$: 'InnerResult', a: a};
};
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $liwenjun$elm_jsonrpc$JsonRpc$RpcError = F3(
	function (code, message, data) {
		return {code: code, data: data, message: message};
	});
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (path, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2(
				$elm$json$Json$Decode$decodeValue,
				A2($elm$json$Json$Decode$at, path, $elm$json$Json$Decode$value),
				input);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_v1.$ === 'Ok') {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					return A2(
						$elm$json$Json$Decode$at,
						path,
						nullOr(valDecoder));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				_List_fromArray(
					[key]),
				valDecoder,
				fallback),
			decoder);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $liwenjun$elm_jsonrpc$JsonRpc$errorDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'data',
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
	$elm$core$Maybe$Nothing,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'message',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'code',
			$elm$json$Json$Decode$int,
			$elm$json$Json$Decode$succeed($liwenjun$elm_jsonrpc$JsonRpc$RpcError))));
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$jsonBody = function (value) {
	return A2(
		_Http_pair,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, value));
};
var $elm$http$Http$Header = F2(
	function (a, b) {
		return {$: 'Header', a: a, b: b};
	});
var $elm$http$Http$header = $elm$http$Http$Header;
var $liwenjun$elm_jsonrpc$JsonRpc$jsonrpc_header = function (token) {
	var json_header = A2($elm$http$Http$header, 'Accept', 'application/json');
	if (token.$ === 'Just') {
		var t = token.a;
		return _List_fromArray(
			[
				json_header,
				A2($elm$http$Http$header, 'Authorization', 'bearer ' + t)
			]);
	} else {
		return _List_fromArray(
			[json_header]);
	}
};
var $liwenjun$elm_jsonrpc$JsonRpc$jsonrpc_request = function (opts) {
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'id',
				$elm$json$Json$Encode$int(0)),
				_Utils_Tuple2(
				'jsonrpc',
				$elm$json$Json$Encode$string('2.0')),
				_Utils_Tuple2(
				'method',
				$elm$json$Json$Encode$string(opts.method)),
				_Utils_Tuple2(
				'params',
				$elm$json$Json$Encode$object(opts.params))
			]));
};
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $liwenjun$elm_jsonrpc$JsonRpc$call = F3(
	function (opts, dc, toMsg) {
		var dcX = $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$map,
					$liwenjun$elm_jsonrpc$JsonRpc$InnerResult,
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['result']),
						dc)),
					A2(
					$elm$json$Json$Decode$map,
					$liwenjun$elm_jsonrpc$JsonRpc$InnerError,
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['error']),
						$liwenjun$elm_jsonrpc$JsonRpc$errorDecoder))
				]));
		return $elm$http$Http$request(
			{
				body: $elm$http$Http$jsonBody(
					$liwenjun$elm_jsonrpc$JsonRpc$jsonrpc_request(opts)),
				expect: A2($elm$http$Http$expectJson, toMsg, dcX),
				headers: $liwenjun$elm_jsonrpc$JsonRpc$jsonrpc_header(opts.token),
				method: 'POST',
				timeout: $elm$core$Maybe$Nothing,
				tracker: $elm$core$Maybe$Nothing,
				url: opts.url
			});
	});
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$json$Json$Decode$lazy = function (thunk) {
	return A2(
		$elm$json$Json$Decode$andThen,
		thunk,
		$elm$json$Json$Decode$succeed(_Utils_Tuple0));
};
var $author$project$Tree$nodeDecoder = function (valueDecoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $author$project$Tree$Leaf, valueDecoder),
				A2(
				$elm$json$Json$Decode$map,
				$author$project$Tree$Tree,
				$elm$json$Json$Decode$dict(
					$elm$json$Json$Decode$lazy(
						function (_v0) {
							return $author$project$Tree$nodeDecoder(valueDecoder);
						})))
			]));
};
var $author$project$Tree$treeDecoder = function (valueDecoder) {
	return $elm$json$Json$Decode$dict(
		$author$project$Tree$nodeDecoder(valueDecoder));
};
var $author$project$Tree$decoder = function (valueDecoder) {
	return $author$project$Tree$treeDecoder(valueDecoder);
};
var $elm$json$Json$Encode$dict = F3(
	function (toKey, toValue, dictionary) {
		return _Json_wrap(
			A3(
				$elm$core$Dict$foldl,
				F3(
					function (key, value, obj) {
						return A3(
							_Json_addField,
							toKey(key),
							toValue(value),
							obj);
					}),
				_Json_emptyObject(_Utils_Tuple0),
				dictionary));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $author$project$Run$encodeOverrides = function (d) {
	return A3($elm$json$Json$Encode$dict, $elm$core$Basics$identity, $elm$json$Json$Encode$float, d);
};
var $author$project$Value$Null = {$: 'Null'};
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $author$project$Value$decoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$map, $author$project$Value$Float, $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$map, $author$project$Value$String, $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$null($author$project$Value$Null)
		]));
var $author$project$Value$BinaryTrace = function (a) {
	return {$: 'BinaryTrace', a: a};
};
var $author$project$Value$LiteralTrace = function (a) {
	return {$: 'LiteralTrace', a: a};
};
var $author$project$Value$UnaryTrace = function (a) {
	return {$: 'UnaryTrace', a: a};
};
var $author$project$Value$Divide = {$: 'Divide'};
var $author$project$Value$Minus = {$: 'Minus'};
var $author$project$Value$Plus = {$: 'Plus'};
var $author$project$Value$Times = {$: 'Times'};
var $author$project$Value$binaryOpDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		switch (s) {
			case '+':
				return $elm$json$Json$Decode$succeed($author$project$Value$Plus);
			case '-':
				return $elm$json$Json$Decode$succeed($author$project$Value$Minus);
			case '*':
				return $elm$json$Json$Decode$succeed($author$project$Value$Times);
			case '/':
				return $elm$json$Json$Decode$succeed($author$project$Value$Divide);
			default:
				return $elm$json$Json$Decode$fail('not a valid binary op');
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Value$DataTrace = function (a) {
	return {$: 'DataTrace', a: a};
};
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$Value$dataTraceDecoder = A5(
	$elm$json$Json$Decode$map4,
	F4(
		function (s, k, a, v) {
			return $author$project$Value$DataTrace(
				{attr: a, key: k, source: s, value: v});
		}),
	A2($elm$json$Json$Decode$field, 'source', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'key',
		$elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					$elm$json$Json$Decode$string,
					A2($elm$json$Json$Decode$map, $elm$core$String$fromInt, $elm$json$Json$Decode$int)
				]))),
	A2($elm$json$Json$Decode$field, 'attr', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$float));
var $author$project$Value$FactOrAssTrace = function (a) {
	return {$: 'FactOrAssTrace', a: a};
};
var $author$project$Value$factOrAssTraceDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (s, v) {
			return $author$project$Value$FactOrAssTrace(
				{fact_or_ass: s, value: v});
		}),
	A2($elm$json$Json$Decode$field, 'fact_or_ass', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$float));
var $author$project$Value$NameTrace = function (a) {
	return {$: 'NameTrace', a: a};
};
var $author$project$Value$nameTraceDecoder = function (namePrefix) {
	return A2(
		$elm$json$Json$Decode$map,
		function (s) {
			return $author$project$Value$NameTrace(
				{name: namePrefix + ('.' + s)});
		},
		A2($elm$json$Json$Decode$field, 'name', $elm$json$Json$Decode$string));
};
var $author$project$Value$UnaryMinus = {$: 'UnaryMinus'};
var $author$project$Value$UnaryPlus = {$: 'UnaryPlus'};
var $author$project$Value$unaryOpDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (s) {
		switch (s) {
			case '+':
				return $elm$json$Json$Decode$succeed($author$project$Value$UnaryPlus);
			case '-':
				return $elm$json$Json$Decode$succeed($author$project$Value$UnaryMinus);
			default:
				return $elm$json$Json$Decode$fail('not a valid unary op');
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Value$binaryTraceDecoder = function (namePrefix) {
	return A5(
		$elm$json$Json$Decode$map4,
		F4(
			function (o, a, b, v) {
				return $author$project$Value$BinaryTrace(
					{a: a, b: b, binary: o, value: v});
			}),
		A2($elm$json$Json$Decode$field, 'binary', $author$project$Value$binaryOpDecoder),
		A2(
			$elm$json$Json$Decode$field,
			'a',
			$author$project$Value$traceDecoder(namePrefix)),
		A2(
			$elm$json$Json$Decode$field,
			'b',
			$author$project$Value$traceDecoder(namePrefix)),
		A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$float));
};
var $author$project$Value$traceDecoder = function (namePrefix) {
	return $elm$json$Json$Decode$lazy(
		function (_v0) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$map, $author$project$Value$LiteralTrace, $elm$json$Json$Decode$float),
						$author$project$Value$dataTraceDecoder,
						$author$project$Value$factOrAssTraceDecoder,
						$author$project$Value$binaryTraceDecoder(namePrefix),
						$author$project$Value$nameTraceDecoder(namePrefix),
						$author$project$Value$unaryTraceDecoder(namePrefix)
					]));
		});
};
var $author$project$Value$unaryTraceDecoder = function (namePrefix) {
	return A3(
		$elm$json$Json$Decode$map2,
		F2(
			function (o, a) {
				return $author$project$Value$UnaryTrace(
					{a: a, unary: o});
			}),
		A2($elm$json$Json$Decode$field, 'unary', $author$project$Value$unaryOpDecoder),
		A2(
			$elm$json$Json$Decode$field,
			'a',
			$author$project$Value$traceDecoder(namePrefix)));
};
var $author$project$Value$maybeWithTraceDecoder = function (namePrefix) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				$elm$json$Json$Decode$map,
				function (v) {
					return {trace: $elm$core$Maybe$Nothing, value: v};
				},
				$author$project$Value$decoder),
				A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (v, t) {
						return {
							trace: $elm$core$Maybe$Just(t),
							value: v
						};
					}),
				A2($elm$json$Json$Decode$field, 'value', $author$project$Value$decoder),
				A2(
					$elm$json$Json$Decode$field,
					'trace',
					$author$project$Value$traceDecoder(namePrefix)))
			]));
};
var $author$project$GeneratorRpc$calculate = function (_v0) {
	var inputs = _v0.inputs;
	var overrides = _v0.overrides;
	var toMsg = _v0.toMsg;
	return A3(
		$liwenjun$elm_jsonrpc$JsonRpc$call,
		{
			method: 'calculate',
			params: _List_fromArray(
				[
					_Utils_Tuple2(
					'ags',
					$elm$json$Json$Encode$string(inputs.ags)),
					_Utils_Tuple2(
					'year',
					$elm$json$Json$Encode$int(inputs.year)),
					_Utils_Tuple2(
					'overrides',
					$author$project$Run$encodeOverrides(overrides)),
					_Utils_Tuple2(
					'trace',
					$elm$json$Json$Encode$bool(true))
				]),
			token: $elm$core$Maybe$Nothing,
			url: $author$project$GeneratorRpc$apiUrl
		},
		$author$project$Tree$decoder(
			$author$project$Value$maybeWithTraceDecoder('result')),
		toMsg);
};
var $author$project$Main$initiateCalculate = F5(
	function (maybeNdx, inputs, entries, overrides, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					showModal: $elm$core$Maybe$Just($author$project$Main$Loading)
				}),
			$author$project$GeneratorRpc$calculate(
				{
					inputs: inputs,
					overrides: overrides,
					toMsg: A4($author$project$Main$GotGeneratorResult, maybeNdx, inputs, entries, overrides)
				}));
	});
var $author$project$Main$GotInfo = function (a) {
	return {$: 'GotInfo', a: a};
};
var $author$project$GeneratorRpc$Info = F8(
	function (label, group, description, value, unit, rationale, reference, link) {
		return {description: description, group: group, label: label, link: link, rationale: rationale, reference: reference, unit: unit, value: value};
	});
var $elm$json$Json$Decode$map8 = _Json_map8;
var $author$project$GeneratorRpc$infoDecoder = A9(
	$elm$json$Json$Decode$map8,
	$author$project$GeneratorRpc$Info,
	A2($elm$json$Json$Decode$field, 'label', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'group', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'description', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'unit', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'rationale', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'reference', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'link', $elm$json$Json$Decode$string));
var $author$project$GeneratorRpc$info = function (_v0) {
	var name = _v0.name;
	var toMsg = _v0.toMsg;
	return A3(
		$liwenjun$elm_jsonrpc$JsonRpc$call,
		{
			method: 'info',
			params: _List_fromArray(
				[
					_Utils_Tuple2(
					'key',
					$elm$json$Json$Encode$string(name))
				]),
			token: $elm$core$Maybe$Nothing,
			url: $author$project$GeneratorRpc$apiUrl
		},
		$author$project$GeneratorRpc$infoDecoder,
		toMsg);
};
var $author$project$Main$initiateInfo = F2(
	function (name, model) {
		return _Utils_Tuple2(
			model,
			$author$project$GeneratorRpc$info(
				{name: name, toMsg: $author$project$Main$GotInfo}));
	});
var $author$project$Main$GotListAgs = function (a) {
	return {$: 'GotListAgs', a: a};
};
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$GeneratorRpc$agsDataDecoder = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (ags, desc, _short) {
			return {ags: ags, desc: desc, _short: _short};
		}),
	A2($elm$json$Json$Decode$field, 'ags', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'desc', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'short', $elm$json$Json$Decode$string));
var $author$project$GeneratorRpc$listAgs = function (_v0) {
	var toMsg = _v0.toMsg;
	return A3(
		$liwenjun$elm_jsonrpc$JsonRpc$call,
		{method: 'list-ags', params: _List_Nil, token: $elm$core$Maybe$Nothing, url: $author$project$GeneratorRpc$apiUrl},
		$elm$json$Json$Decode$list($author$project$GeneratorRpc$agsDataDecoder),
		toMsg);
};
var $author$project$Main$initiateListAgs = function (model) {
	return _Utils_Tuple2(
		_Utils_update(
			model,
			{
				showModal: $elm$core$Maybe$Just($author$project$Main$Loading)
			}),
		$author$project$GeneratorRpc$listAgs(
			{toMsg: $author$project$Main$GotListAgs}));
};
var $author$project$Main$GotEntries = F4(
	function (a, b, c, d) {
		return {$: 'GotEntries', a: a, b: b, c: c, d: d};
	});
var $author$project$Run$entriesDecoder = $elm$json$Json$Decode$dict(
	$author$project$Value$maybeWithTraceDecoder('entries'));
var $author$project$GeneratorRpc$makeEntries = function (_v0) {
	var inputs = _v0.inputs;
	var toMsg = _v0.toMsg;
	return A3(
		$liwenjun$elm_jsonrpc$JsonRpc$call,
		{
			method: 'make-entries',
			params: _List_fromArray(
				[
					_Utils_Tuple2(
					'ags',
					$elm$json$Json$Encode$string(inputs.ags)),
					_Utils_Tuple2(
					'year',
					$elm$json$Json$Encode$int(inputs.year)),
					_Utils_Tuple2(
					'trace',
					$elm$json$Json$Encode$bool(true))
				]),
			token: $elm$core$Maybe$Nothing,
			url: $author$project$GeneratorRpc$apiUrl
		},
		$author$project$Run$entriesDecoder,
		toMsg);
};
var $author$project$Main$initiateMakeEntries = F4(
	function (maybeNdx, inputs, overrides, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					showModal: $elm$core$Maybe$Just($author$project$Main$Loading)
				}),
			$author$project$GeneratorRpc$makeEntries(
				{
					inputs: inputs,
					toMsg: A3($author$project$Main$GotEntries, maybeNdx, inputs, overrides)
				}));
	});
var $author$project$Lens$findInCellsHelper = F4(
	function (row, column, fn, g) {
		findInCellsHelper:
		while (true) {
			if (_Utils_cmp(
				row,
				$author$project$Cells$rows(g)) > -1) {
				return $elm$core$Maybe$Nothing;
			} else {
				if (_Utils_cmp(
					column,
					$author$project$Cells$columns(g)) > -1) {
					var $temp$row = row + 1,
						$temp$column = 0,
						$temp$fn = fn,
						$temp$g = g;
					row = $temp$row;
					column = $temp$column;
					fn = $temp$fn;
					g = $temp$g;
					continue findInCellsHelper;
				} else {
					var pos = {column: column, row: row};
					var _v0 = A2(
						fn,
						pos,
						A2($author$project$Cells$get, pos, g));
					if (_v0.$ === 'Nothing') {
						var $temp$row = row,
							$temp$column = column + 1,
							$temp$fn = fn,
							$temp$g = g;
						row = $temp$row;
						column = $temp$column;
						fn = $temp$fn;
						g = $temp$g;
						continue findInCellsHelper;
					} else {
						var res = _v0.a;
						return $elm$core$Maybe$Just(res);
					}
				}
			}
		}
	});
var $author$project$Lens$findInCells = F2(
	function (fn, cells) {
		return A4($author$project$Lens$findInCellsHelper, 0, 0, fn, cells);
	});
var $author$project$Lens$findEmptySpot = function (g) {
	return A2(
		$author$project$Lens$findInCells,
		F2(
			function (pos, mp) {
				return _Utils_eq(
					mp,
					$author$project$Lens$CellContent$Label('')) ? $elm$core$Maybe$Just(pos) : $elm$core$Maybe$Nothing;
			}),
		g);
};
var $author$project$Lens$mapKind = F3(
	function (fnClassic, fnTable, _v0) {
		var i = _v0.a;
		var _v1 = i.vkind;
		if (_v1.$ === 'Table') {
			var t = _v1.a;
			return $author$project$Lens$Lens(
				_Utils_update(
					i,
					{
						vkind: $author$project$Lens$Table(
							fnTable(t))
					}));
		} else {
			var c = _v1.a;
			return $author$project$Lens$Lens(
				_Utils_update(
					i,
					{
						vkind: $author$project$Lens$Classic(
							fnClassic(c))
					}));
		}
	});
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_v0.$ === 'SubTree') {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $author$project$Cells$set = F3(
	function (pos, val, _v0) {
		var c = _v0.a;
		var startOfRow = c.columns * pos.row;
		return $author$project$Cells$Cells(
			_Utils_update(
				c,
				{
					values: A3($elm$core$Array$set, startOfRow + pos.column, val, c.values)
				}));
	});
var $author$project$Lens$insert = F3(
	function (ri, p, lens) {
		return $author$project$Lens$updateShortPathLabels(
			A3(
				$author$project$Lens$mapKind,
				function (c) {
					return _Utils_update(
						c,
						{
							paths: A2($elm$core$Set$insert, p, c.paths)
						});
				},
				function (td) {
					return _Utils_update(
						td,
						{
							grid: function () {
								var _v0 = $author$project$Lens$findEmptySpot(td.grid);
								if (_v0.$ === 'Nothing') {
									var r = $author$project$Cells$rows(td.grid);
									return A3(
										$author$project$Cells$set,
										{column: 0, row: r},
										A2($author$project$Lens$CellContent$ValueAt, ri, p),
										A2($author$project$Cells$addRow, r + 1, td.grid));
								} else {
									var spot = _v0.a;
									return A3(
										$author$project$Cells$set,
										spot,
										A2($author$project$Lens$CellContent$ValueAt, ri, p),
										td.grid);
								}
							}()
						});
				},
				lens));
	});
var $author$project$Main$insertDiff = F4(
	function (runA, runB, diffData, model) {
		return _Utils_update(
			model,
			{
				diffs: A3(
					$elm$core$Dict$insert,
					_Utils_Tuple2(runA, runB),
					diffData,
					model.diffs)
			});
	});
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $author$project$Cells$map = F2(
	function (fn, _v0) {
		var c = _v0.a;
		return $author$project$Cells$Cells(
			{
				columns: c.columns,
				empty: c.empty,
				rows: c.rows,
				values: A2($elm$core$Array$map, fn, c.values)
			});
	});
var $elm$core$Platform$Cmd$map = _Platform_map;
var $yotamDvir$elm_pivot$Pivot$Map$mapCLR = F4(
	function (onC, onL, onR, _v0) {
		var c = _v0.a;
		var _v1 = _v0.b;
		var l = _v1.a;
		var r = _v1.b;
		return A2(
			$yotamDvir$elm_pivot$Pivot$Types$Pivot,
			onC(c),
			_Utils_Tuple2(
				A2($elm$core$List$map, onL, l),
				A2($elm$core$List$map, onR, r)));
	});
var $yotamDvir$elm_pivot$Pivot$Map$mapCS = F2(
	function (onC, onS) {
		return A3($yotamDvir$elm_pivot$Pivot$Map$mapCLR, onC, onS, onS);
	});
var $yotamDvir$elm_pivot$Pivot$Map$mapA = function (onA) {
	return A2($yotamDvir$elm_pivot$Pivot$Map$mapCS, onA, onA);
};
var $yotamDvir$elm_pivot$Pivot$mapA = $yotamDvir$elm_pivot$Pivot$Map$mapA;
var $yotamDvir$elm_pivot$Pivot$Map$mapC = function (onC) {
	return A2($yotamDvir$elm_pivot$Pivot$Map$mapCS, onC, $elm$core$Basics$identity);
};
var $yotamDvir$elm_pivot$Pivot$mapC = $yotamDvir$elm_pivot$Pivot$Map$mapC;
var $author$project$Main$mapLenses = F2(
	function (f, m) {
		return _Utils_update(
			m,
			{
				lenses: f(m.lenses)
			});
	});
var $author$project$Main$mapActiveLens = function (f) {
	return $author$project$Main$mapLenses(
		$yotamDvir$elm_pivot$Pivot$mapC(f));
};
var $author$project$Lens$mapCells = F2(
	function (fn, l) {
		return A3(
			$author$project$Lens$mapKind,
			$elm$core$Basics$identity,
			function (td) {
				return _Utils_update(
					td,
					{
						grid: fn(td.grid)
					});
			},
			l);
	});
var $author$project$Main$mapExpanded = F2(
	function (fn, dt) {
		return _Utils_update(
			dt,
			{
				expanded: fn(dt.expanded)
			});
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $author$project$Main$mapHead = F2(
	function (fn, l) {
		if (!l.b) {
			return _List_Nil;
		} else {
			var x = l.a;
			var xs = l.b;
			return A2(
				$elm$core$List$cons,
				fn(x),
				xs);
		}
	});
var $author$project$Lens$mapLabel = F2(
	function (f, _v0) {
		var l = _v0.a;
		return $author$project$Lens$Lens(
			_Utils_update(
				l,
				{
					label: f(l.label)
				}));
	});
var $author$project$Run$mapOverrides = F2(
	function (f, _v0) {
		var r = _v0.a;
		return $author$project$Run$Run(
			_Utils_update(
				r,
				{
					overrides: f(r.overrides)
				}));
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Lens$mapTableEditMode = function (fn) {
	return A2(
		$author$project$Lens$mapKind,
		$elm$core$Basics$identity,
		function (t) {
			return _Utils_update(
				t,
				{
					editing: fn(t.editing)
				});
		});
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Styling$parseGermanNumber = function (s) {
	return $elm$core$String$toFloat(
		A3(
			$elm$core$String$replace,
			',',
			'.',
			A3($elm$core$String$replace, '.', '', s)));
};
var $elm$core$Set$remove = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return $elm$core$Set$Set_elm_builtin(
			A2($elm$core$Dict$remove, key, dict));
	});
var $author$project$Main$removeDiff = F3(
	function (aId, bId, model) {
		return _Utils_update(
			model,
			{
				diffs: A2(
					$elm$core$Dict$remove,
					_Utils_Tuple2(aId, bId),
					model.diffs)
			});
	});
var $yotamDvir$elm_pivot$Pivot$Modify$removeGoL = function (_v0) {
	var c = _v0.a;
	var _v1 = _v0.b;
	var l = _v1.a;
	var r = _v1.b;
	if (!l.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var hd = l.a;
		var tl = l.b;
		return $elm$core$Maybe$Just(
			A2(
				$yotamDvir$elm_pivot$Pivot$Types$Pivot,
				hd,
				_Utils_Tuple2(tl, r)));
	}
};
var $yotamDvir$elm_pivot$Pivot$removeGoL = $yotamDvir$elm_pivot$Pivot$Modify$removeGoL;
var $yotamDvir$elm_pivot$Pivot$Modify$removeGoR = $yotamDvir$elm_pivot$Pivot$Utilities$mirrorM($yotamDvir$elm_pivot$Pivot$Modify$removeGoL);
var $yotamDvir$elm_pivot$Pivot$removeGoR = $yotamDvir$elm_pivot$Pivot$Modify$removeGoR;
var $author$project$Lens$remove = F3(
	function (ri, p, il) {
		return $author$project$Lens$updateShortPathLabels(
			A3(
				$author$project$Lens$mapKind,
				function (c) {
					return _Utils_update(
						c,
						{
							paths: A2($elm$core$Set$remove, p, c.paths)
						});
				},
				function (td) {
					return _Utils_update(
						td,
						{
							grid: A2(
								$author$project$Cells$map,
								function (cell) {
									return _Utils_eq(
										cell,
										A2($author$project$Lens$CellContent$ValueAt, ri, p)) ? $author$project$Lens$CellContent$Label('') : cell;
								},
								td.grid)
						});
				},
				il));
	});
var $author$project$Lens$removeList = F2(
	function (list, lens) {
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, l) {
					var ri = _v0.a;
					var p = _v0.b;
					return A3($author$project$Lens$remove, ri, p, l);
				}),
			lens,
			list);
	});
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $author$project$AllRuns$remove = F2(
	function (id, _v0) {
		var a = _v0.a;
		return $author$project$AllRuns$AllRuns(
			_Utils_update(
				a,
				{
					runs: A2($elm$core$Dict$remove, id, a.runs)
				}));
	});
var $author$project$Main$removeRunAndDiffsThatDependOnIt = F2(
	function (runId, model) {
		var newDiffs = A2(
			$elm$core$Dict$filter,
			F2(
				function (_v0, _v1) {
					var runA = _v0.a;
					var runB = _v0.b;
					return (!_Utils_eq(runA, runId)) && (!_Utils_eq(runB, runId));
				}),
			model.diffs);
		return _Utils_update(
			model,
			{
				diffs: newDiffs,
				runs: A2($author$project$AllRuns$remove, runId, model.runs)
			});
	});
var $author$project$Main$scrollIntoView = _Platform_outgoingPort('scrollIntoView', $elm$json$Json$Encode$string);
var $author$project$AllRuns$set = F3(
	function (id, ir, _v0) {
		var a = _v0.a;
		return $author$project$AllRuns$AllRuns(
			_Utils_update(
				a,
				{
					runs: A3($elm$core$Dict$insert, id, ir, a.runs)
				}));
	});
var $author$project$Lens$setTableEditMode = function (mode) {
	return A2(
		$author$project$Lens$mapKind,
		$elm$core$Basics$identity,
		function (t) {
			return _Utils_update(
				t,
				{editing: mode});
		});
};
var $elm$core$Process$sleep = _Process_sleep;
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$Lens$getCells = function (_v0) {
	var l = _v0.a;
	var _v1 = l.vkind;
	if (_v1.$ === 'Table') {
		var grid = _v1.a.grid;
		return $elm$core$Maybe$Just(grid);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Cells$toList = function (cs) {
	return A2(
		$elm$core$List$map,
		$elm$core$Array$toList,
		$author$project$Cells$toListOfArrays(cs));
};
var $author$project$Main$toClipboardData = F2(
	function (lens, allRuns) {
		var valueSet = A2($author$project$ValueSet$create, lens, allRuns);
		var encodeCell = function (content) {
			if (content.$ === 'ValueAt') {
				var r = content.a;
				var p = content.b;
				var value = A2(
					$elm$core$Maybe$withDefault,
					$author$project$Value$Null,
					A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.value;
						},
						A2(
							$elm$core$Dict$get,
							_Utils_Tuple2(r, p),
							valueSet.values)));
				switch (value.$) {
					case 'Float':
						var f = value.a;
						return $elm$json$Json$Encode$string(
							$elm$core$String$fromFloat(f));
					case 'String':
						var s = value.a;
						return $elm$json$Json$Encode$string(s);
					default:
						return $elm$json$Json$Encode$string('');
				}
			} else {
				var s = content.a;
				return $elm$json$Json$Encode$string(s);
			}
		};
		var _v0 = $author$project$Lens$getCells(lens);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Encode$string('Copying classic lenses not supported yet');
		} else {
			var cells = _v0.a;
			return A2(
				$elm$json$Json$Encode$list,
				$elm$json$Json$Encode$list(encodeCell),
				$author$project$Cells$toList(cells));
		}
	});
var $elm$file$File$toString = _File_toString;
var $author$project$CollapseStatus$collapse = F3(
	function (i, p, _v0) {
		var s = _v0.a;
		return $author$project$CollapseStatus$CollapseStatus(
			A2(
				$elm$core$Set$remove,
				A2($author$project$CollapseStatus$absolutePath, i, p),
				s));
	});
var $elm$core$Dict$member = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$get, key, dict);
		if (_v0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var $elm$core$Set$member = F2(
	function (key, _v0) {
		var dict = _v0.a;
		return A2($elm$core$Dict$member, key, dict);
	});
var $author$project$CollapseStatus$isCollapsed = F3(
	function (i, p, _v0) {
		var s = _v0.a;
		return !A2(
			$elm$core$Set$member,
			A2($author$project$CollapseStatus$absolutePath, i, p),
			s);
	});
var $author$project$CollapseStatus$toggle = F3(
	function (i, p, s) {
		return A3($author$project$CollapseStatus$isCollapsed, i, p, s) ? A3($author$project$CollapseStatus$expand, i, p, s) : A3($author$project$CollapseStatus$collapse, i, p, s);
	});
var $author$project$Lens$toggleShowGraph = $author$project$Lens$mapClassic(
	function (c) {
		return _Utils_update(
			c,
			{showGraph: !c.showGraph});
	});
var $author$project$Main$treeItemId = F2(
	function (runId, path) {
		return $elm$core$String$fromInt(
			$author$project$Explorable$toComparable(runId)) + ('_' + A2($elm$core$String$join, '-', path));
	});
var $author$project$AllRuns$update = F3(
	function (id, f, _v0) {
		var a = _v0.a;
		var _v1 = A2($elm$core$Dict$get, id, a.runs);
		if (_v1.$ === 'Nothing') {
			return $author$project$AllRuns$AllRuns(a);
		} else {
			var r = _v1.a;
			return $author$project$AllRuns$AllRuns(
				_Utils_update(
					a,
					{
						runs: A3(
							$elm$core$Dict$insert,
							id,
							f(r),
							a.runs)
					}));
		}
	});
var $author$project$Html5$DragDrop$DraggedOver = F2(
	function (a, b) {
		return {$: 'DraggedOver', a: a, b: b};
	});
var $author$project$Html5$DragDrop$Dragging = function (a) {
	return {$: 'Dragging', a: a};
};
var $author$project$Html5$DragDrop$updateCommon = F3(
	function (sticky, msg, model) {
		var _v0 = _Utils_Tuple3(msg, model, sticky);
		switch (_v0.a.$) {
			case 'DragStart':
				var _v1 = _v0.a;
				var dragId = _v1.a;
				return _Utils_Tuple2(
					$author$project$Html5$DragDrop$Dragging(dragId),
					$elm$core$Maybe$Nothing);
			case 'DragEnd':
				var _v2 = _v0.a;
				return _Utils_Tuple2($author$project$Html5$DragDrop$NotDragging, $elm$core$Maybe$Nothing);
			case 'DragEnter':
				switch (_v0.b.$) {
					case 'Dragging':
						var dropId = _v0.a.a;
						var dragId = _v0.b.a;
						return _Utils_Tuple2(
							A2($author$project$Html5$DragDrop$DraggedOver, dragId, dropId),
							$elm$core$Maybe$Nothing);
					case 'DraggedOver':
						var dropId = _v0.a.a;
						var _v3 = _v0.b;
						var dragId = _v3.a;
						return _Utils_Tuple2(
							A2($author$project$Html5$DragDrop$DraggedOver, dragId, dropId),
							$elm$core$Maybe$Nothing);
					default:
						var _v8 = _v0.b;
						return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
				}
			case 'DragLeave':
				switch (_v0.b.$) {
					case 'DraggedOver':
						if (!_v0.c) {
							var dropId_ = _v0.a.a;
							var _v4 = _v0.b;
							var dragId = _v4.a;
							var dropId = _v4.b;
							return _Utils_eq(dropId_, dropId) ? _Utils_Tuple2(
								$author$project$Html5$DragDrop$Dragging(dragId),
								$elm$core$Maybe$Nothing) : _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
						} else {
							var _v5 = _v0.b;
							return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
						}
					case 'NotDragging':
						var _v9 = _v0.b;
						return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
					default:
						return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
				}
			case 'DragOver':
				switch (_v0.b.$) {
					case 'Dragging':
						var dropId = _v0.a.a;
						var dragId = _v0.b.a;
						return _Utils_Tuple2(
							A2($author$project$Html5$DragDrop$DraggedOver, dragId, dropId),
							$elm$core$Maybe$Nothing);
					case 'DraggedOver':
						var dropId = _v0.a.a;
						var _v6 = _v0.b;
						var dragId = _v6.a;
						var currentDropId = _v6.b;
						return _Utils_eq(
							model,
							A2($author$project$Html5$DragDrop$DraggedOver, dragId, dropId)) ? _Utils_Tuple2(model, $elm$core$Maybe$Nothing) : _Utils_Tuple2(
							A2($author$project$Html5$DragDrop$DraggedOver, dragId, dropId),
							$elm$core$Maybe$Nothing);
					default:
						var _v10 = _v0.b;
						return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
				}
			default:
				switch (_v0.b.$) {
					case 'Dragging':
						var dropId = _v0.a.a;
						var dragId = _v0.b.a;
						return _Utils_Tuple2(
							$author$project$Html5$DragDrop$NotDragging,
							$elm$core$Maybe$Just(
								_Utils_Tuple2(dragId, dropId)));
					case 'DraggedOver':
						var dropId = _v0.a.a;
						var _v7 = _v0.b;
						var dragId = _v7.a;
						return _Utils_Tuple2(
							$author$project$Html5$DragDrop$NotDragging,
							$elm$core$Maybe$Just(
								_Utils_Tuple2(dragId, dropId)));
					default:
						var _v11 = _v0.b;
						return _Utils_Tuple2(model, $elm$core$Maybe$Nothing);
				}
		}
	});
var $author$project$Html5$DragDrop$update = $author$project$Html5$DragDrop$updateCommon(false);
var $author$project$Main$ErrorMessage = F2(
	function (a, b) {
		return {$: 'ErrorMessage', a: a, b: b};
	});
var $Janiczek$cmd_extra$Cmd$Extra$withNoCmd = function (model) {
	return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
};
var $author$project$Main$updateModal = F3(
	function (msg, model, agsIndex) {
		if (model.$ === 'Nothing') {
			return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd($elm$core$Maybe$Nothing);
		} else {
			switch (model.a.$) {
				case 'EnterInputs':
					var _v1 = model.a;
					var ndx = _v1.a;
					var overrides = _v1.c;
					if (msg.$ === 'UpdateEnterInputs') {
						var ei = msg.a;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							$elm$core$Maybe$Just(
								A3($author$project$Main$EnterInputs, ndx, ei, overrides)));
					} else {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					}
				case 'ReMap':
					var reMapState = model.a.a;
					if (msg.$ === 'ReMapChangeMapping') {
						var a = msg.a;
						var b = msg.b;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							$elm$core$Maybe$Just(
								$author$project$Main$ReMap(
									_Utils_update(
										reMapState,
										{
											mapping: A3($elm$core$Dict$insert, a, b, reMapState.mapping)
										}))));
					} else {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
					}
				case 'Loading':
					var _v4 = model.a;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						$elm$core$Maybe$Just($author$project$Main$Loading));
				default:
					var _v5 = model.a;
					var title = _v5.a;
					var m = _v5.b;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						$elm$core$Maybe$Just(
							A2($author$project$Main$ErrorMessage, title, m)));
			}
		}
	});
var $Janiczek$cmd_extra$Cmd$Extra$withCmd = F2(
	function (cmd, model) {
		return _Utils_Tuple2(model, cmd);
	});
var $author$project$Main$withEditingActiveLensLabel = F2(
	function (b, m) {
		return _Utils_update(
			m,
			{editingActiveLensLabel: b});
	});
var $author$project$Main$withErrorMessage = F3(
	function (title, msg, model) {
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					showModal: $elm$core$Maybe$Just(
						A2($author$project$Main$ErrorMessage, title, msg))
				}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Main$save = _Platform_outgoingPort('save', $elm$core$Basics$identity);
var $author$project$Main$saveCmd = function (model) {
	var content = $author$project$Storage$encode(
		{
			interestLists: $yotamDvir$elm_pivot$Pivot$toList(model.lenses)
		});
	return $author$project$Main$save(content);
};
var $author$project$Main$withSaveCmd = function (model) {
	return A2(
		$Janiczek$cmd_extra$Cmd$Extra$withCmd,
		$author$project$Main$saveCmd(model),
		model);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Noop':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
			case 'Highlight':
				var r = msg.a;
				var p = msg.b;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								$elm$core$Task$perform,
								$elm$core$Basics$always(
									$author$project$Main$ScrollIntoView(
										A2(
											$author$project$Main$treeItemId,
											$author$project$Explorable$Run(r),
											p))),
								$elm$core$Process$sleep(50)),
								A2(
								$elm$core$Task$perform,
								$elm$core$Basics$always($author$project$Main$HighlightRemove),
								$elm$core$Process$sleep(3000.0))
							])),
					_Utils_update(
						model,
						{
							collapseStatus: A3(
								$author$project$CollapseStatus$expandUntil,
								$author$project$Explorable$Run(r),
								p,
								model.collapseStatus),
							temporaryHighlight: $elm$core$Maybe$Just(p)
						}));
			case 'ScrollIntoView':
				var id = msg.a;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$scrollIntoView(id),
					model);
			case 'HighlightRemove':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{temporaryHighlight: $elm$core$Maybe$Nothing}));
			case 'ToggleSidebar':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showingSidebar: !model.showingSidebar}));
			case 'DisplayTrace':
				var runId = msg.a;
				var path = msg.b;
				var value = msg.c;
				var trace = msg.d;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							displayedTrace: A2(
								$elm$core$List$cons,
								{expanded: $elm$core$Set$empty, path: path, runId: runId, showInfo: $elm$core$Maybe$Nothing, trace: trace, value: value},
								model.displayedTrace)
						}));
			case 'ExpandInTrace':
				var path = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							displayedTrace: A2(
								$author$project$Main$mapHead,
								$author$project$Main$mapExpanded(
									$elm$core$Set$insert(path)),
								model.displayedTrace)
						}));
			case 'CollapseInTrace':
				var path = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							displayedTrace: A2(
								$author$project$Main$mapHead,
								$author$project$Main$mapExpanded(
									$elm$core$Set$remove(path)),
								model.displayedTrace)
						}));
			case 'CloseTrace':
				var n = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							displayedTrace: A2($elm$core$List$drop, n, model.displayedTrace)
						}));
			case 'CloseInfo':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							displayedTrace: A2(
								$author$project$Main$mapHead,
								function (dt) {
									return _Utils_update(
										dt,
										{showInfo: $elm$core$Maybe$Nothing});
								},
								model.displayedTrace)
						}));
			case 'FactOrAssTraceInfoRequest':
				var name = msg.a;
				return A2($author$project$Main$initiateInfo, name, model);
			case 'AddRowToLensTableClicked':
				var id = msg.a;
				var num = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							$author$project$Cells$addRow(num)),
						A2($author$project$Main$activateLens, id, model)));
			case 'AddColumnToLensTableClicked':
				var id = msg.a;
				var num = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							$author$project$Cells$addColumn(num)),
						A2($author$project$Main$activateLens, id, model)));
			case 'DownloadClicked':
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$downloadCmd(model),
					model);
			case 'UploadClicked':
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2(
						$elm$file$File$Select$file,
						_List_fromArray(
							['text/json']),
						$author$project$Main$FileUploaded),
					model);
			case 'FileUploaded':
				var file = msg.a;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2(
						$elm$core$Task$perform,
						$author$project$Main$FileContentLoaded,
						$elm$file$File$toString(file)),
					model);
			case 'LocalStorageLoaded':
				var value = msg.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					$elm$json$Json$Decode$nullable($author$project$Storage$decoder),
					value);
				if (_v1.$ === 'Err') {
					var e = _v1.a;
					return A3(
						$author$project$Main$withErrorMessage,
						'Failed to load previous session',
						$elm$json$Json$Decode$errorToString(e),
						model);
				} else {
					if (_v1.a.$ === 'Nothing') {
						var _v2 = _v1.a;
						return $author$project$Main$initiateListAgs(model);
					} else {
						var storage = _v1.a.a;
						var ls = function () {
							var _v3 = $yotamDvir$elm_pivot$Pivot$fromList(storage.interestLists);
							if (_v3.$ === 'Nothing') {
								return model.lenses;
							} else {
								var i = _v3.a;
								return i;
							}
						}();
						return $author$project$Main$initiateListAgs(
							_Utils_update(
								model,
								{lenses: ls}));
					}
				}
			case 'FileContentLoaded':
				var content = msg.a;
				var _v4 = A2($elm$json$Json$Decode$decodeString, $author$project$Storage$decoder, content);
				if (_v4.$ === 'Err') {
					var e = _v4.a;
					return A3(
						$author$project$Main$withErrorMessage,
						'Failed to load file',
						$elm$json$Json$Decode$errorToString(e),
						model);
				} else {
					var storage = _v4.a;
					var ls = function () {
						var _v5 = $yotamDvir$elm_pivot$Pivot$fromList(storage.interestLists);
						if (_v5.$ === 'Nothing') {
							return model.lenses;
						} else {
							var i = _v5.a;
							return i;
						}
					}();
					return $author$project$Main$withSaveCmd(
						_Utils_update(
							model,
							{lenses: ls}));
				}
			case 'GotListAgs':
				var response = msg.a;
				var _v6 = $liwenjun$elm_jsonrpc$JsonRpc$flat(response);
				switch (_v6.$) {
					case 'RpcResult':
						var ad = _v6.a;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							_Utils_update(
								model,
								{
									agsIndex: $author$project$AgsIndex$init(ad),
									showModal: $elm$core$Maybe$Nothing
								}));
					case 'RpcErr':
						return A3($author$project$Main$withErrorMessage, 'Failed to call list-ags rpc', 'rpc failed', model);
					default:
						return A3($author$project$Main$withErrorMessage, 'Failed to call list-ags rpc', 'HTTP failed', model);
				}
			case 'GotInfo':
				var response = msg.a;
				var _v7 = $liwenjun$elm_jsonrpc$JsonRpc$flat(response);
				switch (_v7.$) {
					case 'RpcResult':
						var info = _v7.a;
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							_Utils_update(
								model,
								{
									displayedTrace: A2(
										$author$project$Main$mapHead,
										function (dt) {
											return _Utils_update(
												dt,
												{
													showInfo: $elm$core$Maybe$Just(info)
												});
										},
										model.displayedTrace)
								}));
					case 'RpcErr':
						return A3($author$project$Main$withErrorMessage, 'Failed to call info rpc', 'rpc failed', model);
					default:
						return A3($author$project$Main$withErrorMessage, 'Failed to call info rpc', 'HTTP failed', model);
				}
			case 'GotEntries':
				var maybeRunId = msg.a;
				var inputs = msg.b;
				var overrides = msg.c;
				var response = msg.d;
				var _v8 = $liwenjun$elm_jsonrpc$JsonRpc$flat(response);
				switch (_v8.$) {
					case 'RpcResult':
						var e = _v8.a;
						return A5($author$project$Main$initiateCalculate, maybeRunId, inputs, e, overrides, model);
					case 'RpcErr':
						return A3($author$project$Main$withErrorMessage, 'Failed to call make-entries rpc', 'rpc failed', model);
					default:
						return A3($author$project$Main$withErrorMessage, 'Failed to call make-entries rpc', 'HTTP failed', model);
				}
			case 'GotGeneratorResult':
				var maybeRunId = msg.a;
				var inputs = msg.b;
				var entries = msg.c;
				var overrides = msg.d;
				var response = msg.e;
				var _v9 = $liwenjun$elm_jsonrpc$JsonRpc$flat(response);
				switch (_v9.$) {
					case 'RpcErr':
						return A3($author$project$Main$withErrorMessage, 'Failed to call calculate rpc', 'rpc failed', model);
					case 'HttpErr':
						return A3($author$project$Main$withErrorMessage, 'Failed to call calculate rpc', 'HTTP failed', model);
					default:
						var result = _v9.a;
						var run = $author$project$Run$create(
							{entries: entries, inputs: inputs, overrides: overrides, result: result});
						var modelWithRun = _Utils_update(
							model,
							{
								runs: function () {
									if (maybeRunId.$ === 'Nothing') {
										return A2($author$project$AllRuns$add, run, model.runs);
									} else {
										var runId = maybeRunId.a;
										return A3($author$project$AllRuns$set, runId, run, model.runs);
									}
								}()
							});
						var newDiffs = function () {
							if (maybeRunId.$ === 'Nothing') {
								return modelWithRun.diffs;
							} else {
								var runId = maybeRunId.a;
								return A2(
									$elm$core$Dict$map,
									F2(
										function (_v11, diffData) {
											var runA = _v11.a;
											var runB = _v11.b;
											if (_Utils_eq(runA, runId) || _Utils_eq(runB, runId)) {
												var _v12 = A4($author$project$Main$diffRunsById, runA, runB, diffData.tolerance, modelWithRun);
												if (_v12.$ === 'Nothing') {
													return diffData;
												} else {
													var d = _v12.a;
													return d;
												}
											} else {
												return diffData;
											}
										}),
									modelWithRun.diffs);
							}
						}();
						return $author$project$Main$withSaveCmd(
							_Utils_update(
								modelWithRun,
								{diffs: newDiffs, showModal: $elm$core$Maybe$Nothing}));
				}
			case 'ToggleCollapseTreeClicked':
				var i = msg.a;
				var path = msg.b;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							collapseStatus: A3($author$project$CollapseStatus$toggle, i, path, model.collapseStatus)
						}));
			case 'RemoveExplorableClicked':
				var id = msg.a;
				if (id.$ === 'Run') {
					var runId = id.a;
					return $author$project$Main$withSaveCmd(
						A2($author$project$Main$removeRunAndDiffsThatDependOnIt, runId, model));
				} else {
					var runA = id.a;
					var runB = id.b;
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A3($author$project$Main$removeDiff, runA, runB, model));
				}
			case 'ModalMsg':
				var modalMsg = msg.a;
				return A2(
					$elm$core$Tuple$mapSecond,
					$elm$core$Platform$Cmd$map($author$project$Main$ModalMsg),
					A2(
						$elm$core$Tuple$mapFirst,
						function (md) {
							return _Utils_update(
								model,
								{showModal: md});
						},
						A3($author$project$Main$updateModal, modalMsg, model.showModal, model.agsIndex)));
			case 'ModalDismissed':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{showModal: $elm$core$Maybe$Nothing}));
			case 'DisplayCalculateModalClicked':
				var maybeNdx = msg.a;
				var agsFilter = msg.b.agsFilter;
				var year = msg.b.year;
				var overrides = msg.c;
				var modal = A3(
					$author$project$Main$EnterInputs,
					maybeNdx,
					A3($author$project$EnterInputsDialog$init, year, agsFilter, model.agsIndex),
					overrides);
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							showModal: $elm$core$Maybe$Just(modal)
						}));
			case 'DisplayReMapModalClicked':
				var lensId = msg.a;
				var newModel = A2($author$project$Main$activateLens, lensId, model);
				var lens = $author$project$Main$getActiveLens(newModel);
				var valueSet = A2($author$project$ValueSet$create, lens, model.runs);
				var mapping = $elm$core$Dict$fromList(
					A2(
						$elm$core$List$map,
						function (ri) {
							return _Utils_Tuple2(ri, ri);
						},
						valueSet.runs));
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{
							showModal: $elm$core$Maybe$Just(
								$author$project$Main$ReMap(
									{lensId: lensId, mapping: mapping}))
						}));
			case 'CalculateModalOkClicked':
				var maybeNdx = msg.a;
				var inputs = msg.b;
				var overrides = msg.c;
				return A4($author$project$Main$initiateMakeEntries, maybeNdx, inputs, overrides, model);
			case 'ReMapModalOkClicked':
				var lensId = msg.a;
				var mapping = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							$author$project$Cells$map(
								function (cc) {
									if (cc.$ === 'ValueAt') {
										var ri = cc.a;
										var p = cc.b;
										return A2(
											$author$project$Lens$CellContent$ValueAt,
											A2(
												$elm$core$Maybe$withDefault,
												ri,
												A2($elm$core$Dict$get, ri, mapping)),
											p);
									} else {
										return cc;
									}
								})),
						A2(
							$author$project$Main$activateLens,
							lensId,
							_Utils_update(
								model,
								{showModal: $elm$core$Maybe$Nothing}))));
			case 'AddOrUpdateOverrideClicked':
				var ndx = msg.a;
				var name = msg.b;
				var f = msg.c;
				return $author$project$Main$withSaveCmd(
					_Utils_update(
						model,
						{
							runs: A3(
								$author$project$AllRuns$update,
								ndx,
								$author$project$Run$mapOverrides(
									A2($elm$core$Dict$insert, name, f)),
								model.runs)
						}));
			case 'FilterEdited':
				var runId = msg.a;
				var pattern = msg.b;
				var newActiveSearch = function () {
					var _v17 = A2($author$project$AllRuns$get, runId, model.runs);
					if (_v17.$ === 'Nothing') {
						return model.activeSearch;
					} else {
						var run = _v17.a;
						var result = A2(
							$author$project$Filter$filter,
							pattern,
							A2($author$project$Run$getTree, $author$project$Run$WithoutOverrides, run));
						return $elm$core$Maybe$Just(
							{pattern: pattern, result: result, runId: runId});
					}
				}();
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2(
						$elm$core$Task$attempt,
						function (_v16) {
							return $author$project$Main$Noop;
						},
						$elm$browser$Browser$Dom$focus($author$project$Main$filterFieldId)),
					_Utils_update(
						model,
						{activeSearch: newActiveSearch}));
			case 'FilterQuickAddRequested':
				var run = msg.a;
				var _v18 = model.activeSearch;
				if (_v18.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var a = _v18.a;
					var paths = $author$project$Tree$expand(a.result);
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						A2(
							$author$project$Main$mapActiveLens,
							function (lens) {
								return A3(
									$elm$core$List$foldl,
									F2(
										function (p, i) {
											return A3($author$project$Lens$insert, run, p, i);
										}),
									lens,
									paths);
							},
							_Utils_update(
								model,
								{activeSearch: $elm$core$Maybe$Nothing})));
				}
			case 'FilterFinished':
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{activeSearch: $elm$core$Maybe$Nothing}));
			case 'OverrideEdited':
				var runId = msg.a;
				var name = msg.b;
				var newText = msg.c;
				var isFocusChanged = function () {
					var _v20 = model.activeOverrideEditor;
					if (_v20.$ === 'Nothing') {
						return true;
					} else {
						var e = _v20.a;
						return (!_Utils_eq(e.runId, runId)) || (!_Utils_eq(e.name, name));
					}
				}();
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							activeOverrideEditor: $elm$core$Maybe$Just(
								{
									asFloat: $author$project$Styling$parseGermanNumber(newText),
									name: name,
									runId: runId,
									value: newText
								})
						}),
					isFocusChanged ? A2(
						$elm$core$Task$attempt,
						function (_v19) {
							return $author$project$Main$Noop;
						},
						$elm$browser$Browser$Dom$focus('overrideEditor')) : $elm$core$Platform$Cmd$none);
			case 'OverrideEditFinished':
				var _v21 = model.activeOverrideEditor;
				if (_v21.$ === 'Nothing') {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var editor = _v21.a;
					var modelEditorClosed = _Utils_update(
						model,
						{activeOverrideEditor: $elm$core$Maybe$Nothing});
					var _v22 = editor.asFloat;
					if (_v22.$ === 'Nothing') {
						return _Utils_Tuple2(modelEditorClosed, $elm$core$Platform$Cmd$none);
					} else {
						var f = _v22.a;
						var _v23 = A2($author$project$AllRuns$get, editor.runId, model.runs);
						if (_v23.$ === 'Nothing') {
							return _Utils_Tuple2(modelEditorClosed, $elm$core$Platform$Cmd$none);
						} else {
							var run = _v23.a;
							return A4(
								$author$project$Main$initiateMakeEntries,
								$elm$core$Maybe$Just(editor.runId),
								$author$project$Run$getInputs(run),
								A3(
									$elm$core$Dict$insert,
									editor.name,
									f,
									$author$project$Run$getOverrides(run)),
								modelEditorClosed);
						}
					}
				}
			case 'RemoveOverrideClicked':
				var runId = msg.a;
				var name = msg.b;
				var _v24 = A2($author$project$AllRuns$get, runId, model.runs);
				if (_v24.$ === 'Nothing') {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var run = _v24.a;
					return A4(
						$author$project$Main$initiateMakeEntries,
						$elm$core$Maybe$Just(runId),
						$author$project$Run$getInputs(run),
						A2(
							$elm$core$Dict$remove,
							name,
							$author$project$Run$getOverrides(run)),
						_Utils_update(
							model,
							{
								activeOverrideEditor: A2(
									$elm_community$maybe_extra$Maybe$Extra$filter,
									function (e) {
										return (!_Utils_eq(e.runId, runId)) || (!_Utils_eq(e.name, name));
									},
									model.activeOverrideEditor)
							}));
				}
			case 'AddToLensClicked':
				var runId = msg.a;
				var path = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						A2($author$project$Lens$insert, runId, path),
						model));
			case 'RemoveFromLensClicked':
				var lensId = msg.a;
				var what = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$removeList(what),
						A2($author$project$Main$activateLens, lensId, model)));
			case 'ToggleShowGraphClicked':
				var lensId = msg.a;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$toggleShowGraph,
						A2($author$project$Main$activateLens, lensId, model)));
			case 'NewLensClicked':
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						$yotamDvir$elm_pivot$Pivot$appendGoR($author$project$Lens$empty),
						model));
			case 'NewTableClicked':
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						$yotamDvir$elm_pivot$Pivot$appendGoR($author$project$Lens$emptyTable),
						model));
			case 'DuplicateLensClicked':
				var id = msg.a;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						function (p) {
							return A2(
								$yotamDvir$elm_pivot$Pivot$appendGoR,
								A2(
									$author$project$Lens$mapLabel,
									function (l) {
										return l + ' Copy';
									},
									$yotamDvir$elm_pivot$Pivot$getC(p)),
								p);
						},
						A2($author$project$Main$activateLens, id, model)));
			case 'RemoveLensClicked':
				var id = msg.a;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						function (ils) {
							var _v25 = $yotamDvir$elm_pivot$Pivot$removeGoR(ils);
							if (_v25.$ === 'Nothing') {
								return A2(
									$elm$core$Maybe$withDefault,
									$yotamDvir$elm_pivot$Pivot$singleton($author$project$Lens$empty),
									$yotamDvir$elm_pivot$Pivot$removeGoL(ils));
							} else {
								var without = _v25.a;
								return without;
							}
						},
						A2($author$project$Main$activateLens, id, model)));
			case 'LensTableEditModeChanged':
				var id = msg.a;
				var mode = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$setTableEditMode(mode),
						A2($author$project$Main$activateLens, id, model)));
			case 'DeleteRowClicked':
				var id = msg.a;
				var row = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							A2(
								$elm$core$Basics$composeR,
								$author$project$Cells$deleteRow(row),
								$author$project$Cells$ifHasAZeroDimensionReplaceByOneCell)),
						A2($author$project$Main$activateLens, id, model)));
			case 'DeleteColumnClicked':
				var id = msg.a;
				var column = msg.b;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							A2(
								$elm$core$Basics$composeR,
								$author$project$Cells$deleteColumn(column),
								$author$project$Cells$ifHasAZeroDimensionReplaceByOneCell)),
						A2($author$project$Main$activateLens, id, model)));
			case 'MoveCellEditorRequested':
				var id = msg.a;
				var currentPos = msg.b;
				var currentValue = msg.c;
				var nextPos = msg.d;
				var nextValue = msg.e;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$addCmd,
					A2(
						$elm$core$Task$attempt,
						function (_v26) {
							return $author$project$Main$Noop;
						},
						$elm$browser$Browser$Dom$focus('cell')),
					$author$project$Main$withSaveCmd(
						A2(
							$author$project$Main$mapActiveLens,
							$author$project$Lens$setTableEditMode(
								$elm$core$Maybe$Just(
									A2($author$project$Lens$Cell, nextPos, nextValue))),
							A2(
								$author$project$Main$mapActiveLens,
								$author$project$Lens$mapCells(
									A2($author$project$Cells$set, currentPos, currentValue)),
								A2($author$project$Main$activateLens, id, model)))));
			case 'CellOfLensTableEditFinished':
				var id = msg.a;
				var pos = msg.b;
				var value = msg.c;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							A2($author$project$Cells$set, pos, value)),
						A2(
							$author$project$Main$mapActiveLens,
							$author$project$Lens$mapTableEditMode(
								$elm$core$Maybe$map(
									function (me) {
										if (me.$ === 'All') {
											return $author$project$Lens$All;
										} else {
											var p = me.a;
											return _Utils_eq(p, pos) ? $author$project$Lens$All : me;
										}
									})),
							model)));
			case 'CellOfLensTableEdited':
				var id = msg.a;
				var pos = msg.b;
				var value = msg.c;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$addCmd,
					A2(
						$elm$core$Task$attempt,
						function (_v28) {
							return $author$project$Main$Noop;
						},
						$elm$browser$Browser$Dom$focus('cell')),
					$author$project$Main$withSaveCmd(
						A2(
							$author$project$Main$mapActiveLens,
							$author$project$Lens$setTableEditMode(
								$elm$core$Maybe$Just(
									A2($author$project$Lens$Cell, pos, value))),
							A2($author$project$Main$activateLens, id, model))));
			case 'CopyToClipboardRequested':
				var id = msg.a;
				var lens = $author$project$Main$getActiveLens(model);
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					$author$project$Main$copyToClipboard(
						A2($author$project$Main$toClipboardData, lens, model.runs)),
					model);
			case 'ActivateLensClicked':
				var id = msg.a;
				return $author$project$Main$withSaveCmd(
					A2($author$project$Main$activateLens, id, model));
			case 'LensLabelEdited':
				var id = msg.a;
				var newLabel = msg.b;
				return A2(
					$Janiczek$cmd_extra$Cmd$Extra$withCmd,
					A2(
						$elm$core$Task$attempt,
						function (_v29) {
							return $author$project$Main$Noop;
						},
						$elm$browser$Browser$Dom$focus('interestlabel')),
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapLabel(
							$elm$core$Basics$always(newLabel)),
						A2(
							$author$project$Main$withEditingActiveLensLabel,
							true,
							A2($author$project$Main$activateLens, id, model))));
			case 'LensLabelEditFinished':
				return $author$project$Main$withSaveCmd(
					A2($author$project$Main$withEditingActiveLensLabel, false, model));
			case 'OnChartHover':
				var hovering = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{chartHovering: hovering}));
			case 'DiffToleranceUpdated':
				var aId = msg.a;
				var bId = msg.b;
				var newTolerance = msg.c;
				var _v30 = A4($author$project$Main$diffRunsById, aId, bId, newTolerance, model);
				if (_v30.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(model);
				} else {
					var d = _v30.a;
					return $author$project$Main$withSaveCmd(
						A4($author$project$Main$insertDiff, aId, bId, d, model));
				}
			case 'ToggleSelectForCompareClicked':
				var runId = msg.a;
				var _v31 = model.selectedForComparison;
				if (_v31.$ === 'Nothing') {
					return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
						_Utils_update(
							model,
							{
								selectedForComparison: $elm$core$Maybe$Just(runId)
							}));
				} else {
					var r = _v31.a;
					if (_Utils_eq(r, runId)) {
						return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
							_Utils_update(
								model,
								{selectedForComparison: $elm$core$Maybe$Nothing}));
					} else {
						var withoutComparison = _Utils_update(
							model,
							{selectedForComparison: $elm$core$Maybe$Nothing});
						var idB = runId;
						var idA = r;
						var _v32 = A4($author$project$Main$diffRunsById, idA, idB, $author$project$Value$defaultTolerance, withoutComparison);
						if (_v32.$ === 'Nothing') {
							return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(withoutComparison);
						} else {
							var d = _v32.a;
							return $author$project$Main$withSaveCmd(
								A4($author$project$Main$insertDiff, idA, idB, d, withoutComparison));
						}
					}
				}
			case 'LeftPaneMoved':
				var w = msg.a;
				return $Janiczek$cmd_extra$Cmd$Extra$withNoCmd(
					_Utils_update(
						model,
						{leftPaneWidth: w}));
			case 'MoveToCellRequested':
				var runId = msg.a;
				var path = msg.b;
				var lensId = msg.c;
				var cellPos = msg.d;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapActiveLens,
						$author$project$Lens$mapCells(
							A2(
								$author$project$Cells$set,
								cellPos,
								A2($author$project$Lens$CellContent$ValueAt, runId, path))),
						A2($author$project$Main$activateLens, lensId, model)));
			case 'MoveIntoNewRowRequested':
				var sourceCell = msg.a;
				var cv1 = msg.b;
				var l2 = msg.c;
				var p2 = msg.d;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						A2(
							$elm$core$Basics$composeR,
							$yotamDvir$elm_pivot$Pivot$indexAbsolute,
							$yotamDvir$elm_pivot$Pivot$mapA(
								function (_v33) {
									var lensId = _v33.a;
									var lens = _v33.b;
									return A3(
										$author$project$Main$callIf,
										_Utils_eq(lensId, l2),
										$author$project$Lens$mapCells(
											A2(
												$elm$core$Basics$composeR,
												$author$project$Cells$addRow(p2.row),
												A2($author$project$Cells$set, p2, cv1))),
										A3(
											$author$project$Main$callIfJust,
											sourceCell,
											function (_v34) {
												var l1 = _v34.a;
												var p1 = _v34.b;
												return A2(
													$author$project$Main$callIf,
													_Utils_eq(lensId, l1),
													$author$project$Lens$mapCells(
														A2(
															$author$project$Cells$set,
															p1,
															$author$project$Lens$CellContent$Label(''))));
											},
											lens));
								})),
						model));
			case 'MoveIntoNewColumnRequested':
				var sourceCell = msg.a;
				var cv1 = msg.b;
				var l2 = msg.c;
				var p2 = msg.d;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						A2(
							$elm$core$Basics$composeR,
							$yotamDvir$elm_pivot$Pivot$indexAbsolute,
							$yotamDvir$elm_pivot$Pivot$mapA(
								function (_v35) {
									var lensId = _v35.a;
									var lens = _v35.b;
									return A3(
										$author$project$Main$callIf,
										_Utils_eq(lensId, l2),
										$author$project$Lens$mapCells(
											A2(
												$elm$core$Basics$composeR,
												$author$project$Cells$addColumn(p2.column),
												A2($author$project$Cells$set, p2, cv1))),
										A3(
											$author$project$Main$callIfJust,
											sourceCell,
											function (_v36) {
												var l1 = _v36.a;
												var p1 = _v36.b;
												return A2(
													$author$project$Main$callIf,
													_Utils_eq(lensId, l1),
													$author$project$Lens$mapCells(
														A2(
															$author$project$Cells$set,
															p1,
															$author$project$Lens$CellContent$Label(''))));
											},
											lens));
								})),
						model));
			case 'SwapCellsRequested':
				var l1 = msg.a;
				var p1 = msg.b;
				var cv1 = msg.c;
				var l2 = msg.d;
				var p2 = msg.e;
				var cv2 = msg.f;
				return $author$project$Main$withSaveCmd(
					A2(
						$author$project$Main$mapLenses,
						A2(
							$elm$core$Basics$composeR,
							$yotamDvir$elm_pivot$Pivot$indexAbsolute,
							$yotamDvir$elm_pivot$Pivot$mapA(
								function (_v37) {
									var lensId = _v37.a;
									var lens = _v37.b;
									return A3(
										$author$project$Main$callIf,
										_Utils_eq(lensId, l2),
										$author$project$Lens$mapCells(
											A2($author$project$Cells$set, p2, cv1)),
										A3(
											$author$project$Main$callIf,
											_Utils_eq(lensId, l1),
											$author$project$Lens$mapCells(
												A2($author$project$Cells$set, p1, cv2)),
											lens));
								})),
						model));
			default:
				var dragMsg = msg.a;
				var _v38 = A2($author$project$Html5$DragDrop$update, dragMsg, model.dragDrop);
				var newDragDrop = _v38.a;
				var dropEvent = _v38.b;
				var applyDrop = function () {
					if (dropEvent.$ === 'Nothing') {
						return $elm$core$Basics$identity;
					} else {
						if (dropEvent.a.a.$ === 'DragFromRun') {
							switch (dropEvent.a.b.$) {
								case 'DropOnCell':
									var _v40 = dropEvent.a;
									var _v41 = _v40.a;
									var runId = _v41.a;
									var path = _v41.b;
									var _v42 = _v40.b;
									var lensId = _v42.a;
									var pos = _v42.b;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A4($author$project$Main$MoveToCellRequested, runId, path, lensId, pos)));
								case 'DropInNewRow':
									var _v49 = dropEvent.a;
									var _v50 = _v49.a;
									var runId = _v50.a;
									var path = _v50.b;
									var _v51 = _v49.b;
									var l2 = _v51.a;
									var p2 = _v51.b;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A4(
												$author$project$Main$MoveIntoNewRowRequested,
												$elm$core$Maybe$Nothing,
												A2($author$project$Lens$CellContent$ValueAt, runId, path),
												l2,
												p2)));
								default:
									var _v52 = dropEvent.a;
									var _v53 = _v52.a;
									var runId = _v53.a;
									var path = _v53.b;
									var _v54 = _v52.b;
									var l2 = _v54.a;
									var p2 = _v54.b;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A4(
												$author$project$Main$MoveIntoNewColumnRequested,
												$elm$core$Maybe$Nothing,
												A2($author$project$Lens$CellContent$ValueAt, runId, path),
												l2,
												p2)));
							}
						} else {
							switch (dropEvent.a.b.$) {
								case 'DropOnCell':
									var _v43 = dropEvent.a;
									var _v44 = _v43.a;
									var l1 = _v44.a;
									var p1 = _v44.b;
									var cv1 = _v44.c;
									var _v45 = _v43.b;
									var l2 = _v45.a;
									var p2 = _v45.b;
									var cv2 = _v45.c;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A6($author$project$Main$SwapCellsRequested, l1, p1, cv1, l2, p2, cv2)));
								case 'DropInNewRow':
									var _v46 = dropEvent.a;
									var _v47 = _v46.a;
									var l1 = _v47.a;
									var p1 = _v47.b;
									var cv1 = _v47.c;
									var _v48 = _v46.b;
									var l2 = _v48.a;
									var p2 = _v48.b;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A4(
												$author$project$Main$MoveIntoNewRowRequested,
												$elm$core$Maybe$Just(
													_Utils_Tuple2(l1, p1)),
												cv1,
												l2,
												p2)));
								default:
									var _v55 = dropEvent.a;
									var _v56 = _v55.a;
									var l1 = _v56.a;
									var p1 = _v56.b;
									var cv1 = _v56.c;
									var _v57 = _v55.b;
									var l2 = _v57.a;
									var p2 = _v57.b;
									return $Janiczek$cmd_extra$Cmd$Extra$andThen(
										$author$project$Main$update(
											A4(
												$author$project$Main$MoveIntoNewColumnRequested,
												$elm$core$Maybe$Just(
													_Utils_Tuple2(l1, p1)),
												cv1,
												l2,
												p2)));
							}
						}
					}
				}();
				return applyDrop(
					A2(
						$Janiczek$cmd_extra$Cmd$Extra$withCmd,
						$author$project$Html5$DragDrop$fixFirefoxDragStartCmd(dragMsg),
						_Utils_update(
							model,
							{dragDrop: newDragDrop})));
		}
	});
var $author$project$Main$init = function (storage) {
	return A2(
		$author$project$Main$update,
		$author$project$Main$LocalStorageLoaded(storage),
		{
			activeOverrideEditor: $elm$core$Maybe$Nothing,
			activeSearch: $elm$core$Maybe$Nothing,
			agsIndex: $author$project$AgsIndex$init(_List_Nil),
			chartHovering: _List_Nil,
			collapseStatus: $author$project$CollapseStatus$allCollapsed,
			diffs: $elm$core$Dict$empty,
			displayedTrace: _List_Nil,
			dragDrop: $author$project$Html5$DragDrop$init,
			editingActiveLensLabel: false,
			leftPaneWidth: 600,
			lenses: $yotamDvir$elm_pivot$Pivot$singleton($author$project$Lens$empty),
			runs: $author$project$AllRuns$empty,
			selectedForComparison: $elm$core$Maybe$Nothing,
			showModal: $elm$core$Maybe$Nothing,
			showingSidebar: true,
			temporaryHighlight: $elm$core$Maybe$Nothing
		});
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$none;
};
var $author$project$Main$CalculateModalOkClicked = F3(
	function (a, b, c) {
		return {$: 'CalculateModalOkClicked', a: a, b: b, c: c};
	});
var $author$project$Main$UpdateEnterInputs = function (a) {
	return {$: 'UpdateEnterInputs', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Fill = function (a) {
	return {$: 'Fill', a: a};
};
var $mdgriffith$elm_ui$Element$fill = $mdgriffith$elm_ui$Internal$Model$Fill(1);
var $mdgriffith$elm_ui$Internal$Model$Height = function (a) {
	return {$: 'Height', a: a};
};
var $mdgriffith$elm_ui$Element$height = $mdgriffith$elm_ui$Internal$Model$Height;
var $mdgriffith$elm_ui$Internal$Model$InFront = {$: 'InFront'};
var $mdgriffith$elm_ui$Internal$Model$Nearby = F2(
	function (a, b) {
		return {$: 'Nearby', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NoAttribute = {$: 'NoAttribute'};
var $mdgriffith$elm_ui$Element$createNearby = F2(
	function (loc, element) {
		if (element.$ === 'Empty') {
			return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
		} else {
			return A2($mdgriffith$elm_ui$Internal$Model$Nearby, loc, element);
		}
	});
var $mdgriffith$elm_ui$Element$inFront = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$InFront, element);
};
var $mdgriffith$elm_ui$Internal$Style$classes = {above: 'a', active: 'atv', alignBottom: 'ab', alignCenterX: 'cx', alignCenterY: 'cy', alignContainerBottom: 'acb', alignContainerCenterX: 'accx', alignContainerCenterY: 'accy', alignContainerRight: 'acr', alignLeft: 'al', alignRight: 'ar', alignTop: 'at', alignedHorizontally: 'ah', alignedVertically: 'av', any: 's', behind: 'bh', below: 'b', bold: 'w7', borderDashed: 'bd', borderDotted: 'bdt', borderNone: 'bn', borderSolid: 'bs', capturePointerEvents: 'cpe', clip: 'cp', clipX: 'cpx', clipY: 'cpy', column: 'c', container: 'ctr', contentBottom: 'cb', contentCenterX: 'ccx', contentCenterY: 'ccy', contentLeft: 'cl', contentRight: 'cr', contentTop: 'ct', cursorPointer: 'cptr', cursorText: 'ctxt', focus: 'fcs', focusedWithin: 'focus-within', fullSize: 'fs', grid: 'g', hasBehind: 'hbh', heightContent: 'hc', heightExact: 'he', heightFill: 'hf', heightFillPortion: 'hfp', hover: 'hv', imageContainer: 'ic', inFront: 'fr', inputLabel: 'lbl', inputMultiline: 'iml', inputMultilineFiller: 'imlf', inputMultilineParent: 'imlp', inputMultilineWrapper: 'implw', inputText: 'it', italic: 'i', link: 'lnk', nearby: 'nb', noTextSelection: 'notxt', onLeft: 'ol', onRight: 'or', opaque: 'oq', overflowHidden: 'oh', page: 'pg', paragraph: 'p', passPointerEvents: 'ppe', root: 'ui', row: 'r', scrollbars: 'sb', scrollbarsX: 'sbx', scrollbarsY: 'sby', seButton: 'sbt', single: 'e', sizeByCapital: 'cap', spaceEvenly: 'sev', strike: 'sk', text: 't', textCenter: 'tc', textExtraBold: 'w8', textExtraLight: 'w2', textHeavy: 'w9', textJustify: 'tj', textJustifyAll: 'tja', textLeft: 'tl', textLight: 'w3', textMedium: 'w5', textNormalWeight: 'w4', textRight: 'tr', textSemiBold: 'w6', textThin: 'w1', textUnitalicized: 'tun', transition: 'ts', transparent: 'clr', underline: 'u', widthContent: 'wc', widthExact: 'we', widthFill: 'wf', widthFillPortion: 'wfp', wrapped: 'wrp'};
var $mdgriffith$elm_ui$Internal$Model$Attr = function (a) {
	return {$: 'Attr', a: a};
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $mdgriffith$elm_ui$Internal$Model$htmlClass = function (cls) {
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		$elm$html$Html$Attributes$class(cls));
};
var $mdgriffith$elm_ui$Internal$Model$OnlyDynamic = F2(
	function (a, b) {
		return {$: 'OnlyDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic = F2(
	function (a, b) {
		return {$: 'StaticRootAndDynamic', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Unkeyed = function (a) {
	return {$: 'Unkeyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsEl = {$: 'AsEl'};
var $mdgriffith$elm_ui$Internal$Model$asEl = $mdgriffith$elm_ui$Internal$Model$AsEl;
var $mdgriffith$elm_ui$Internal$Model$Generic = {$: 'Generic'};
var $mdgriffith$elm_ui$Internal$Model$div = $mdgriffith$elm_ui$Internal$Model$Generic;
var $mdgriffith$elm_ui$Internal$Model$NoNearbyChildren = {$: 'NoNearbyChildren'};
var $mdgriffith$elm_ui$Internal$Model$columnClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.column);
var $mdgriffith$elm_ui$Internal$Model$gridClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.grid);
var $mdgriffith$elm_ui$Internal$Model$pageClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.page);
var $mdgriffith$elm_ui$Internal$Model$paragraphClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph);
var $mdgriffith$elm_ui$Internal$Model$rowClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.row);
var $mdgriffith$elm_ui$Internal$Model$singleClass = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single);
var $mdgriffith$elm_ui$Internal$Model$contextClasses = function (context) {
	switch (context.$) {
		case 'AsRow':
			return $mdgriffith$elm_ui$Internal$Model$rowClass;
		case 'AsColumn':
			return $mdgriffith$elm_ui$Internal$Model$columnClass;
		case 'AsEl':
			return $mdgriffith$elm_ui$Internal$Model$singleClass;
		case 'AsGrid':
			return $mdgriffith$elm_ui$Internal$Model$gridClass;
		case 'AsParagraph':
			return $mdgriffith$elm_ui$Internal$Model$paragraphClass;
		default:
			return $mdgriffith$elm_ui$Internal$Model$pageClass;
	}
};
var $mdgriffith$elm_ui$Internal$Model$Keyed = function (a) {
	return {$: 'Keyed', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$NoStyleSheet = {$: 'NoStyleSheet'};
var $mdgriffith$elm_ui$Internal$Model$Styled = function (a) {
	return {$: 'Styled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addChildren = F2(
	function (existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(behind, existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(existing, inFront);
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					behind,
					_Utils_ap(existing, inFront));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$addKeyedChildren = F3(
	function (key, existing, nearbyChildren) {
		switch (nearbyChildren.$) {
			case 'NoNearbyChildren':
				return existing;
			case 'ChildrenBehind':
				var behind = nearbyChildren.a;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					existing);
			case 'ChildrenInFront':
				var inFront = nearbyChildren.a;
				return _Utils_ap(
					existing,
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						inFront));
			default:
				var behind = nearbyChildren.a;
				var inFront = nearbyChildren.b;
				return _Utils_ap(
					A2(
						$elm$core$List$map,
						function (x) {
							return _Utils_Tuple2(key, x);
						},
						behind),
					_Utils_ap(
						existing,
						A2(
							$elm$core$List$map,
							function (x) {
								return _Utils_Tuple2(key, x);
							},
							inFront)));
		}
	});
var $mdgriffith$elm_ui$Internal$Model$AsParagraph = {$: 'AsParagraph'};
var $mdgriffith$elm_ui$Internal$Model$asParagraph = $mdgriffith$elm_ui$Internal$Model$AsParagraph;
var $mdgriffith$elm_ui$Internal$Flag$Flag = function (a) {
	return {$: 'Flag', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Second = function (a) {
	return {$: 'Second', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$flag = function (i) {
	return (i > 31) ? $mdgriffith$elm_ui$Internal$Flag$Second(1 << (i - 32)) : $mdgriffith$elm_ui$Internal$Flag$Flag(1 << i);
};
var $mdgriffith$elm_ui$Internal$Flag$alignBottom = $mdgriffith$elm_ui$Internal$Flag$flag(41);
var $mdgriffith$elm_ui$Internal$Flag$alignRight = $mdgriffith$elm_ui$Internal$Flag$flag(40);
var $mdgriffith$elm_ui$Internal$Flag$centerX = $mdgriffith$elm_ui$Internal$Flag$flag(42);
var $mdgriffith$elm_ui$Internal$Flag$centerY = $mdgriffith$elm_ui$Internal$Flag$flag(43);
var $elm$html$Html$div = _VirtualDom_node('div');
var $mdgriffith$elm_ui$Internal$Model$lengthClassName = function (x) {
	switch (x.$) {
		case 'Px':
			var px = x.a;
			return $elm$core$String$fromInt(px) + 'px';
		case 'Content':
			return 'auto';
		case 'Fill':
			var i = x.a;
			return $elm$core$String$fromInt(i) + 'fr';
		case 'Min':
			var min = x.a;
			var len = x.b;
			return 'min' + ($elm$core$String$fromInt(min) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
		default:
			var max = x.a;
			var len = x.b;
			return 'max' + ($elm$core$String$fromInt(max) + $mdgriffith$elm_ui$Internal$Model$lengthClassName(len));
	}
};
var $elm$core$Basics$round = _Basics_round;
var $mdgriffith$elm_ui$Internal$Model$floatClass = function (x) {
	return $elm$core$String$fromInt(
		$elm$core$Basics$round(x * 255));
};
var $mdgriffith$elm_ui$Internal$Model$transformClass = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'mv-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(x) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(y) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(z))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			return $elm$core$Maybe$Just(
				'tfrm-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ty) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(tz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sx) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(sz) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(ox) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oy) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(oz) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(angle))))))))))))))))))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$getStyleName = function (style) {
	switch (style.$) {
		case 'Shadows':
			var name = style.a;
			return name;
		case 'Transparency':
			var name = style.a;
			var o = style.b;
			return name;
		case 'Style':
			var _class = style.a;
			return _class;
		case 'FontFamily':
			var name = style.a;
			return name;
		case 'FontSize':
			var i = style.a;
			return 'font-size-' + $elm$core$String$fromInt(i);
		case 'Single':
			var _class = style.a;
			return _class;
		case 'Colored':
			var _class = style.a;
			return _class;
		case 'SpacingStyle':
			var cls = style.a;
			var x = style.b;
			var y = style.c;
			return cls;
		case 'PaddingStyle':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'BorderWidth':
			var cls = style.a;
			var top = style.b;
			var right = style.c;
			var bottom = style.d;
			var left = style.e;
			return cls;
		case 'GridTemplateStyle':
			var template = style.a;
			return 'grid-rows-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
				$elm$core$String$join,
				'-',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
		case 'GridPosition':
			var pos = style.a;
			return 'gp grid-pos-' + ($elm$core$String$fromInt(pos.row) + ('-' + ($elm$core$String$fromInt(pos.col) + ('-' + ($elm$core$String$fromInt(pos.width) + ('-' + $elm$core$String$fromInt(pos.height)))))));
		case 'PseudoSelector':
			var selector = style.a;
			var subStyle = style.b;
			var name = function () {
				switch (selector.$) {
					case 'Focus':
						return 'fs';
					case 'Hover':
						return 'hv';
					default:
						return 'act';
				}
			}();
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (sty) {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$getStyleName(sty);
						if (_v1 === '') {
							return '';
						} else {
							var styleName = _v1;
							return styleName + ('-' + name);
						}
					},
					subStyle));
		default:
			var x = style.a;
			return A2(
				$elm$core$Maybe$withDefault,
				'',
				$mdgriffith$elm_ui$Internal$Model$transformClass(x));
	}
};
var $mdgriffith$elm_ui$Internal$Model$reduceStyles = F2(
	function (style, nevermind) {
		var cache = nevermind.a;
		var existing = nevermind.b;
		var styleName = $mdgriffith$elm_ui$Internal$Model$getStyleName(style);
		return A2($elm$core$Set$member, styleName, cache) ? nevermind : _Utils_Tuple2(
			A2($elm$core$Set$insert, styleName, cache),
			A2($elm$core$List$cons, style, existing));
	});
var $mdgriffith$elm_ui$Internal$Model$Property = F2(
	function (a, b) {
		return {$: 'Property', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Style = F2(
	function (a, b) {
		return {$: 'Style', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$dot = function (c) {
	return '.' + c;
};
var $mdgriffith$elm_ui$Internal$Model$formatColor = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return 'rgba(' + ($elm$core$String$fromInt(
		$elm$core$Basics$round(red * 255)) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(green * 255))) + ((',' + $elm$core$String$fromInt(
		$elm$core$Basics$round(blue * 255))) + (',' + ($elm$core$String$fromFloat(alpha) + ')')))));
};
var $mdgriffith$elm_ui$Internal$Model$formatBoxShadow = function (shadow) {
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$filterMap,
			$elm$core$Basics$identity,
			_List_fromArray(
				[
					shadow.inset ? $elm$core$Maybe$Just('inset') : $elm$core$Maybe$Nothing,
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.a) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.offset.b) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.blur) + 'px'),
					$elm$core$Maybe$Just(
					$elm$core$String$fromFloat(shadow.size) + 'px'),
					$elm$core$Maybe$Just(
					$mdgriffith$elm_ui$Internal$Model$formatColor(shadow.color))
				])));
};
var $mdgriffith$elm_ui$Internal$Model$renderFocusStyle = function (focus) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin) + ':focus-within',
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					]))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$Style,
			($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus .focusable, ') + (($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + '.focusable:focus, ') + ('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ' .focusable-thumb'))),
			A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				_List_fromArray(
					[
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'border-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.borderColor),
						A2(
						$elm$core$Maybe$map,
						function (color) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'background-color',
								$mdgriffith$elm_ui$Internal$Model$formatColor(color));
						},
						focus.backgroundColor),
						A2(
						$elm$core$Maybe$map,
						function (shadow) {
							return A2(
								$mdgriffith$elm_ui$Internal$Model$Property,
								'box-shadow',
								$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(
									{
										blur: shadow.blur,
										color: shadow.color,
										inset: false,
										offset: A2(
											$elm$core$Tuple$mapSecond,
											$elm$core$Basics$toFloat,
											A2($elm$core$Tuple$mapFirst, $elm$core$Basics$toFloat, shadow.offset)),
										size: shadow.size
									}));
						},
						focus.shadow),
						$elm$core$Maybe$Just(
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'outline', 'none'))
					])))
		]);
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Style$AllChildren = F2(
	function (a, b) {
		return {$: 'AllChildren', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Batch = function (a) {
	return {$: 'Batch', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Child = F2(
	function (a, b) {
		return {$: 'Child', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Descriptor = F2(
	function (a, b) {
		return {$: 'Descriptor', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Internal$Style$Prop = F2(
	function (a, b) {
		return {$: 'Prop', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Internal$Style$Self = function (a) {
	return {$: 'Self', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Supports = F2(
	function (a, b) {
		return {$: 'Supports', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Style$Content = function (a) {
	return {$: 'Content', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Internal$Style$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Internal$Style$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Internal$Style$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Internal$Style$alignments = _List_fromArray(
	[$mdgriffith$elm_ui$Internal$Style$Top, $mdgriffith$elm_ui$Internal$Style$Bottom, $mdgriffith$elm_ui$Internal$Style$Right, $mdgriffith$elm_ui$Internal$Style$Left, $mdgriffith$elm_ui$Internal$Style$CenterX, $mdgriffith$elm_ui$Internal$Style$CenterY]);
var $mdgriffith$elm_ui$Internal$Style$contentName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$selfName = function (desc) {
	switch (desc.a.$) {
		case 'Top':
			var _v1 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			var _v2 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		case 'Right':
			var _v3 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		case 'Left':
			var _v4 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'CenterX':
			var _v5 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
		default:
			var _v6 = desc.a;
			return $mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $mdgriffith$elm_ui$Internal$Style$describeAlignment = function (values) {
	var createDescription = function (alignment) {
		var _v0 = values(alignment);
		var content = _v0.a;
		var indiv = _v0.b;
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$contentName(
					$mdgriffith$elm_ui$Internal$Style$Content(alignment)),
				content),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						indiv)
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$elDescription = _List_fromArray(
	[
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
		A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Descriptor,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.seButton),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'auto !important')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Child,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
			])),
		$mdgriffith$elm_ui$Internal$Style$describeAlignment(
		function (alignment) {
			switch (alignment.$) {
				case 'Top':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
							]));
				case 'Bottom':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
							]));
				case 'Right':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
							]));
				case 'Left':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							]));
				case 'CenterX':
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
							]));
				default:
					return _Utils_Tuple2(
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
									]))
							]),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
							]));
			}
		})
	]);
var $mdgriffith$elm_ui$Internal$Style$gridAlignments = function (values) {
	var createDescription = function (alignment) {
		return _List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$selfName(
							$mdgriffith$elm_ui$Internal$Style$Self(alignment)),
						values(alignment))
					]))
			]);
	};
	return $mdgriffith$elm_ui$Internal$Style$Batch(
		A2($elm$core$List$concatMap, createDescription, $mdgriffith$elm_ui$Internal$Style$alignments));
};
var $mdgriffith$elm_ui$Internal$Style$Above = {$: 'Above'};
var $mdgriffith$elm_ui$Internal$Style$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Internal$Style$Below = {$: 'Below'};
var $mdgriffith$elm_ui$Internal$Style$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Internal$Style$OnRight = {$: 'OnRight'};
var $mdgriffith$elm_ui$Internal$Style$Within = {$: 'Within'};
var $mdgriffith$elm_ui$Internal$Style$locations = function () {
	var loc = $mdgriffith$elm_ui$Internal$Style$Above;
	var _v0 = function () {
		switch (loc.$) {
			case 'Above':
				return _Utils_Tuple0;
			case 'Below':
				return _Utils_Tuple0;
			case 'OnRight':
				return _Utils_Tuple0;
			case 'OnLeft':
				return _Utils_Tuple0;
			case 'Within':
				return _Utils_Tuple0;
			default:
				return _Utils_Tuple0;
		}
	}();
	return _List_fromArray(
		[$mdgriffith$elm_ui$Internal$Style$Above, $mdgriffith$elm_ui$Internal$Style$Below, $mdgriffith$elm_ui$Internal$Style$OnRight, $mdgriffith$elm_ui$Internal$Style$OnLeft, $mdgriffith$elm_ui$Internal$Style$Within, $mdgriffith$elm_ui$Internal$Style$Behind]);
}();
var $mdgriffith$elm_ui$Internal$Style$baseSheet = _List_fromArray(
	[
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		'html,body',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		_Utils_ap(
			$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
			_Utils_ap(
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.imageContainer))),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-height', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'img',
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'max-width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'object-fit', 'cover')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ':focus',
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'outline', 'none')
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.root),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', '100%'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Child,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20')
							]))
					]))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.nearby),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				$mdgriffith$elm_ui$Internal$Style$Batch(
				function (fn) {
					return A2($elm$core$List$map, fn, $mdgriffith$elm_ui$Internal$Style$locations);
				}(
					function (loc) {
						switch (loc.$) {
							case 'Above':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
												])),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Below':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'bottom', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												])),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', 'auto')
												]))
										]));
							case 'OnRight':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'OnLeft':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'right', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '20'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							case 'Within':
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
							default:
								return A2(
									$mdgriffith$elm_ui$Internal$Style$Descriptor,
									$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'absolute'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none'),
											A2(
											$mdgriffith$elm_ui$Internal$Style$Child,
											'*',
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto')
												]))
										]));
						}
					}))
			])),
		A2(
		$mdgriffith$elm_ui$Internal$Style$Class,
		$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'relative'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'resize', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'box-sizing', 'border-box'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'padding', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-size', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-family', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', 'inherit'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'none'),
				A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'inherit'),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.wrapped),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-wrap', 'wrap')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-moz-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-webkit-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, '-ms-user-select', 'none'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'user-select', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorPointer),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'pointer')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.capturePointerEvents),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'auto !important')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transparent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.opaque),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.hover, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':hover',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.focus, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':focus',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.transparent)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot(
					_Utils_ap($mdgriffith$elm_ui$Internal$Style$classes.active, $mdgriffith$elm_ui$Internal$Style$classes.opaque)) + ':active',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'opacity', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.transition),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Prop,
						'transition',
						A2(
							$elm$core$String$join,
							', ',
							A2(
								$elm$core$List$map,
								function (x) {
									return x + ' 160ms';
								},
								_List_fromArray(
									['transform', 'opacity', 'filter', 'background-color', 'color', 'font-size']))))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbars),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'auto'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-shrink', '1')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clip),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipX),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-x', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.clipY),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-y', 'hidden')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', 'auto')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderNone),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-width', '0')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDashed),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dashed')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderDotted),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'dotted')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.borderSolid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'border-style', 'solid')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputText),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'line-height', '1.05'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background', 'transparent'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'inherit')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
				$mdgriffith$elm_ui$Internal$Style$elDescription),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'row'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0%'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.link),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-left', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterX),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-right', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_Nil);
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_Nil);
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'baseline')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-direction', 'column'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', '0px'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'min-height', 'min-content'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.heightFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '100000')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFill),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthContent),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:first-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', '0 !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:only-of-type.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '1'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.alignCenterY),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto !important'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto !important')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						's:last-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY + ' ~ u'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'u:first-of-type.' + ($mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom + (' ~ s.' + $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY)),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-bottom', 'auto')
											]));
								case 'Bottom':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin-top', 'auto')
											]));
								case 'Right':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-end')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'flex-start')
											]));
								case 'CenterX':
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
											]),
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'center')
											]));
								default:
									return _Utils_Tuple2(
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
											]),
										_List_Nil);
							}
						}),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-grow', '0'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-self', 'stretch !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.spaceEvenly),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'space-between')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', '-ms-grid'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						'.gp',
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Supports,
						_Utils_Tuple2('display', 'grid'),
						_List_fromArray(
							[
								_Utils_Tuple2('display', 'grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$gridAlignments(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-start')
										]);
								case 'Bottom':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'flex-end')
										]);
								case 'Right':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-end')
										]);
								case 'Left':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'flex-start')
										]);
								case 'CenterX':
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'align-items', 'center')
										]);
								default:
									return _List_fromArray(
										[
											A2($mdgriffith$elm_ui$Internal$Style$Prop, 'justify-content', 'center')
										]);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.page),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any + ':first-child'),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Left)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot(
							$mdgriffith$elm_ui$Internal$Style$classes.any + ($mdgriffith$elm_ui$Internal$Style$selfName(
								$mdgriffith$elm_ui$Internal$Style$Self($mdgriffith$elm_ui$Internal$Style$Right)) + (':first-child + .' + $mdgriffith$elm_ui$Internal$Style$classes.any))),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'margin', '0 !important')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left'),
												A2(
												$mdgriffith$elm_ui$Internal$Style$Descriptor,
												'::after',
												_List_fromArray(
													[
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', '\"\"'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'table'),
														A2($mdgriffith$elm_ui$Internal$Style$Prop, 'clear', 'both')
													]))
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'background-color', 'transparent')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper),
				_List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'flex-basis', 'auto')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'cursor', 'text'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'pre-wrap !important'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'color', 'transparent')
							]))
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'block'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'overflow-wrap', 'break-word'),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Descriptor,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.hasBehind),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '0'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'z-index', '-1')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.paragraph),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::after',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								'::before',
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'content', 'none')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$AllChildren,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.single),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal'),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.widthExact),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-block')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.inFront),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.behind),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.above),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.below),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onRight),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Descriptor,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.onLeft),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'flex')
									])),
								A2(
								$mdgriffith$elm_ui$Internal$Style$Child,
								$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.text),
								_List_fromArray(
									[
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline'),
										A2($mdgriffith$elm_ui$Internal$Style$Prop, 'white-space', 'normal')
									]))
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.column),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-flex')
							])),
						A2(
						$mdgriffith$elm_ui$Internal$Style$Child,
						$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.grid),
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'inline-grid')
							])),
						$mdgriffith$elm_ui$Internal$Style$describeAlignment(
						function (alignment) {
							switch (alignment.$) {
								case 'Top':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Bottom':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								case 'Right':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'right')
											]));
								case 'Left':
									return _Utils_Tuple2(
										_List_Nil,
										_List_fromArray(
											[
												A2($mdgriffith$elm_ui$Internal$Style$Prop, 'float', 'left')
											]));
								case 'CenterX':
									return _Utils_Tuple2(_List_Nil, _List_Nil);
								default:
									return _Utils_Tuple2(_List_Nil, _List_Nil);
							}
						})
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.hidden',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'display', 'none')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textThin),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '100')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '200')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '300')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textNormalWeight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '400')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textMedium),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '500')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textSemiBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '600')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.bold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '700')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textExtraBold),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '800')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textHeavy),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-weight', '900')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.italic),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'italic')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				_Utils_ap(
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.underline),
					$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.strike)),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration', 'line-through underline'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip-ink', 'auto'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-decoration-skip', 'ink')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textUnitalicized),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-style', 'normal')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustify),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textJustifyAll),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'justify-all')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textCenter),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'center')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textRight),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'right')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				$mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.textLeft),
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'text-align', 'left')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Descriptor,
				'.modal',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'position', 'fixed'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'left', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'top', '0'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'width', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'height', '100%'),
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'pointer-events', 'none')
					]))
			]))
	]);
var $mdgriffith$elm_ui$Internal$Style$fontVariant = function (_var) {
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + _var,
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\"'))
				])),
			A2(
			$mdgriffith$elm_ui$Internal$Style$Class,
			'.v-' + (_var + '-off'),
			_List_fromArray(
				[
					A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-feature-settings', '\"' + (_var + '\" 0'))
				]))
		]);
};
var $mdgriffith$elm_ui$Internal$Style$commonValues = $elm$core$List$concat(
	_List_fromArray(
		[
			A2(
			$elm$core$List$map,
			function (x) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.border-' + $elm$core$String$fromInt(x),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'border-width',
							$elm$core$String$fromInt(x) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 6)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 8, 32)),
			A2(
			$elm$core$List$map,
			function (i) {
				return A2(
					$mdgriffith$elm_ui$Internal$Style$Class,
					'.p-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Style$Prop,
							'padding',
							$elm$core$String$fromInt(i) + 'px')
						]));
			},
			A2($elm$core$List$range, 0, 24)),
			_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'small-caps')
					])),
				A2(
				$mdgriffith$elm_ui$Internal$Style$Class,
				'.v-smcp-off',
				_List_fromArray(
					[
						A2($mdgriffith$elm_ui$Internal$Style$Prop, 'font-variant', 'normal')
					]))
			]),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('zero'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('onum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('liga'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('dlig'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('ordn'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('tnum'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('afrc'),
			$mdgriffith$elm_ui$Internal$Style$fontVariant('frac')
		]));
var $mdgriffith$elm_ui$Internal$Style$explainer = '\n.explain {\n    border: 6px solid rgb(174, 121, 15) !important;\n}\n.explain > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n.ctr {\n    border: none !important;\n}\n.explain > .ctr > .' + ($mdgriffith$elm_ui$Internal$Style$classes.any + ' {\n    border: 4px dashed rgb(0, 151, 167) !important;\n}\n\n')));
var $mdgriffith$elm_ui$Internal$Style$inputTextReset = '\ninput[type="search"],\ninput[type="search"]::-webkit-search-decoration,\ninput[type="search"]::-webkit-search-cancel-button,\ninput[type="search"]::-webkit-search-results-button,\ninput[type="search"]::-webkit-search-results-decoration {\n  -webkit-appearance:none;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$sliderReset = '\ninput[type=range] {\n  -webkit-appearance: none; \n  background: transparent;\n  position:absolute;\n  left:0;\n  top:0;\n  z-index:10;\n  width: 100%;\n  outline: dashed 1px;\n  height: 100%;\n  opacity: 0;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$thumbReset = '\ninput[type=range]::-webkit-slider-thumb {\n    -webkit-appearance: none;\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-moz-range-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range]::-ms-thumb {\n    opacity: 0.5;\n    width: 80px;\n    height: 80px;\n    background-color: black;\n    border:none;\n    border-radius: 5px;\n}\ninput[type=range][orient=vertical]{\n    writing-mode: bt-lr; /* IE */\n    -webkit-appearance: slider-vertical;  /* WebKit */\n}\n';
var $mdgriffith$elm_ui$Internal$Style$trackReset = '\ninput[type=range]::-moz-range-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-ms-track {\n    background: transparent;\n    cursor: pointer;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n    background: transparent;\n    cursor: pointer;\n}\n';
var $mdgriffith$elm_ui$Internal$Style$overrides = '@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' { flex-basis: auto !important; } ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.row) + (' > ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.container) + (' { flex-basis: auto !important; }}' + ($mdgriffith$elm_ui$Internal$Style$inputTextReset + ($mdgriffith$elm_ui$Internal$Style$sliderReset + ($mdgriffith$elm_ui$Internal$Style$trackReset + ($mdgriffith$elm_ui$Internal$Style$thumbReset + $mdgriffith$elm_ui$Internal$Style$explainer)))))))))))))));
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $mdgriffith$elm_ui$Internal$Style$Intermediate = function (a) {
	return {$: 'Intermediate', a: a};
};
var $mdgriffith$elm_ui$Internal$Style$emptyIntermediate = F2(
	function (selector, closing) {
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			{closing: closing, others: _List_Nil, props: _List_Nil, selector: selector});
	});
var $mdgriffith$elm_ui$Internal$Style$renderRules = F2(
	function (_v0, rulesToRender) {
		var parent = _v0.a;
		var generateIntermediates = F2(
			function (rule, rendered) {
				switch (rule.$) {
					case 'Prop':
						var name = rule.a;
						var val = rule.b;
						return _Utils_update(
							rendered,
							{
								props: A2(
									$elm$core$List$cons,
									_Utils_Tuple2(name, val),
									rendered.props)
							});
					case 'Supports':
						var _v2 = rule.a;
						var prop = _v2.a;
						var value = _v2.b;
						var props = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Style$Intermediate(
										{closing: '\n}', others: _List_Nil, props: props, selector: '@supports (' + (prop + (':' + (value + (') {' + parent.selector))))}),
									rendered.others)
							});
					case 'Adjacent':
						var selector = rule.a;
						var adjRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' + ' + selector), ''),
										adjRules),
									rendered.others)
							});
					case 'Child':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' > ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'AllChildren':
						var child = rule.a;
						var childRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector + (' ' + child), ''),
										childRules),
									rendered.others)
							});
					case 'Descriptor':
						var descriptor = rule.a;
						var descriptorRules = rule.b;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2(
											$mdgriffith$elm_ui$Internal$Style$emptyIntermediate,
											_Utils_ap(parent.selector, descriptor),
											''),
										descriptorRules),
									rendered.others)
							});
					default:
						var batched = rule.a;
						return _Utils_update(
							rendered,
							{
								others: A2(
									$elm$core$List$cons,
									A2(
										$mdgriffith$elm_ui$Internal$Style$renderRules,
										A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, parent.selector, ''),
										batched),
									rendered.others)
							});
				}
			});
		return $mdgriffith$elm_ui$Internal$Style$Intermediate(
			A3($elm$core$List$foldr, generateIntermediates, parent, rulesToRender));
	});
var $mdgriffith$elm_ui$Internal$Style$renderCompact = function (styleClasses) {
	var renderValues = function (values) {
		return $elm$core$String$concat(
			A2(
				$elm$core$List$map,
				function (_v3) {
					var x = _v3.a;
					var y = _v3.b;
					return x + (':' + (y + ';'));
				},
				values));
	};
	var renderClass = function (rule) {
		var _v2 = rule.props;
		if (!_v2.b) {
			return '';
		} else {
			return rule.selector + ('{' + (renderValues(rule.props) + (rule.closing + '}')));
		}
	};
	var renderIntermediate = function (_v0) {
		var rule = _v0.a;
		return _Utils_ap(
			renderClass(rule),
			$elm$core$String$concat(
				A2($elm$core$List$map, renderIntermediate, rule.others)));
	};
	return $elm$core$String$concat(
		A2(
			$elm$core$List$map,
			renderIntermediate,
			A3(
				$elm$core$List$foldr,
				F2(
					function (_v1, existing) {
						var name = _v1.a;
						var styleRules = _v1.b;
						return A2(
							$elm$core$List$cons,
							A2(
								$mdgriffith$elm_ui$Internal$Style$renderRules,
								A2($mdgriffith$elm_ui$Internal$Style$emptyIntermediate, name, ''),
								styleRules),
							existing);
					}),
				_List_Nil,
				styleClasses)));
};
var $mdgriffith$elm_ui$Internal$Style$rules = _Utils_ap(
	$mdgriffith$elm_ui$Internal$Style$overrides,
	$mdgriffith$elm_ui$Internal$Style$renderCompact(
		_Utils_ap($mdgriffith$elm_ui$Internal$Style$baseSheet, $mdgriffith$elm_ui$Internal$Style$commonValues)));
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $mdgriffith$elm_ui$Internal$Model$staticRoot = function (opts) {
	var _v0 = opts.mode;
	switch (_v0.$) {
		case 'Layout':
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'div',
				_List_Nil,
				_List_fromArray(
					[
						A3(
						$elm$virtual_dom$VirtualDom$node,
						'style',
						_List_Nil,
						_List_fromArray(
							[
								$elm$virtual_dom$VirtualDom$text($mdgriffith$elm_ui$Internal$Style$rules)
							]))
					]));
		case 'NoStaticStyleSheet':
			return $elm$virtual_dom$VirtualDom$text('');
		default:
			return A3(
				$elm$virtual_dom$VirtualDom$node,
				'elm-ui-static-rules',
				_List_fromArray(
					[
						A2(
						$elm$virtual_dom$VirtualDom$property,
						'rules',
						$elm$json$Json$Encode$string($mdgriffith$elm_ui$Internal$Style$rules))
					]),
				_List_Nil);
	}
};
var $mdgriffith$elm_ui$Internal$Model$fontName = function (font) {
	switch (font.$) {
		case 'Serif':
			return 'serif';
		case 'SansSerif':
			return 'sans-serif';
		case 'Monospace':
			return 'monospace';
		case 'Typeface':
			var name = font.a;
			return '\"' + (name + '\"');
		case 'ImportFont':
			var name = font.a;
			var url = font.b;
			return '\"' + (name + '\"');
		default:
			var name = font.a.name;
			return '\"' + (name + '\"');
	}
};
var $mdgriffith$elm_ui$Internal$Model$isSmallCaps = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return name === 'smcp';
		case 'VariantOff':
			var name = _var.a;
			return false;
		default:
			var name = _var.a;
			var index = _var.b;
			return (name === 'smcp') && (index === 1);
	}
};
var $mdgriffith$elm_ui$Internal$Model$hasSmallCaps = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$isSmallCaps, font.variants);
	} else {
		return false;
	}
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $mdgriffith$elm_ui$Internal$Model$renderProps = F3(
	function (force, _v0, existing) {
		var key = _v0.a;
		var val = _v0.b;
		return force ? (existing + ('\n  ' + (key + (': ' + (val + ' !important;'))))) : (existing + ('\n  ' + (key + (': ' + (val + ';')))));
	});
var $mdgriffith$elm_ui$Internal$Model$renderStyle = F4(
	function (options, maybePseudo, selector, props) {
		if (maybePseudo.$ === 'Nothing') {
			return _List_fromArray(
				[
					selector + ('{' + (A3(
					$elm$core$List$foldl,
					$mdgriffith$elm_ui$Internal$Model$renderProps(false),
					'',
					props) + '\n}'))
				]);
		} else {
			var pseudo = maybePseudo.a;
			switch (pseudo.$) {
				case 'Hover':
					var _v2 = options.hover;
					switch (_v2.$) {
						case 'NoHover':
							return _List_Nil;
						case 'ForceHover':
							return _List_fromArray(
								[
									selector + ('-hv {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(true),
									'',
									props) + '\n}'))
								]);
						default:
							return _List_fromArray(
								[
									selector + ('-hv:hover {' + (A3(
									$elm$core$List$foldl,
									$mdgriffith$elm_ui$Internal$Model$renderProps(false),
									'',
									props) + '\n}'))
								]);
					}
				case 'Focus':
					var renderedProps = A3(
						$elm$core$List$foldl,
						$mdgriffith$elm_ui$Internal$Model$renderProps(false),
						'',
						props);
					return _List_fromArray(
						[
							selector + ('-fs:focus {' + (renderedProps + '\n}')),
							('.' + ($mdgriffith$elm_ui$Internal$Style$classes.any + (':focus ' + (selector + '-fs  {')))) + (renderedProps + '\n}'),
							(selector + '-fs:focus-within {') + (renderedProps + '\n}'),
							('.ui-slide-bar:focus + ' + ($mdgriffith$elm_ui$Internal$Style$dot($mdgriffith$elm_ui$Internal$Style$classes.any) + (' .focusable-thumb' + (selector + '-fs {')))) + (renderedProps + '\n}')
						]);
				default:
					return _List_fromArray(
						[
							selector + ('-act:active {' + (A3(
							$elm$core$List$foldl,
							$mdgriffith$elm_ui$Internal$Model$renderProps(false),
							'',
							props) + '\n}'))
						]);
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderVariant = function (_var) {
	switch (_var.$) {
		case 'VariantActive':
			var name = _var.a;
			return '\"' + (name + '\"');
		case 'VariantOff':
			var name = _var.a;
			return '\"' + (name + '\" 0');
		default:
			var name = _var.a;
			var index = _var.b;
			return '\"' + (name + ('\" ' + $elm$core$String$fromInt(index)));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderVariants = function (typeface) {
	if (typeface.$ === 'FontWith') {
		var font = typeface.a;
		return $elm$core$Maybe$Just(
			A2(
				$elm$core$String$join,
				', ',
				A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$renderVariant, font.variants)));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$transformValue = function (transform) {
	switch (transform.$) {
		case 'Untransformed':
			return $elm$core$Maybe$Nothing;
		case 'Moved':
			var _v1 = transform.a;
			var x = _v1.a;
			var y = _v1.b;
			var z = _v1.c;
			return $elm$core$Maybe$Just(
				'translate3d(' + ($elm$core$String$fromFloat(x) + ('px, ' + ($elm$core$String$fromFloat(y) + ('px, ' + ($elm$core$String$fromFloat(z) + 'px)'))))));
		default:
			var _v2 = transform.a;
			var tx = _v2.a;
			var ty = _v2.b;
			var tz = _v2.c;
			var _v3 = transform.b;
			var sx = _v3.a;
			var sy = _v3.b;
			var sz = _v3.c;
			var _v4 = transform.c;
			var ox = _v4.a;
			var oy = _v4.b;
			var oz = _v4.c;
			var angle = transform.d;
			var translate = 'translate3d(' + ($elm$core$String$fromFloat(tx) + ('px, ' + ($elm$core$String$fromFloat(ty) + ('px, ' + ($elm$core$String$fromFloat(tz) + 'px)')))));
			var scale = 'scale3d(' + ($elm$core$String$fromFloat(sx) + (', ' + ($elm$core$String$fromFloat(sy) + (', ' + ($elm$core$String$fromFloat(sz) + ')')))));
			var rotate = 'rotate3d(' + ($elm$core$String$fromFloat(ox) + (', ' + ($elm$core$String$fromFloat(oy) + (', ' + ($elm$core$String$fromFloat(oz) + (', ' + ($elm$core$String$fromFloat(angle) + 'rad)')))))));
			return $elm$core$Maybe$Just(translate + (' ' + (scale + (' ' + rotate))));
	}
};
var $mdgriffith$elm_ui$Internal$Model$renderStyleRule = F3(
	function (options, rule, maybePseudo) {
		switch (rule.$) {
			case 'Style':
				var selector = rule.a;
				var props = rule.b;
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, selector, props);
			case 'Shadows':
				var name = rule.a;
				var prop = rule.b;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, 'box-shadow', prop)
						]));
			case 'Transparency':
				var name = rule.a;
				var transparency = rule.b;
				var opacity = A2(
					$elm$core$Basics$max,
					0,
					A2($elm$core$Basics$min, 1, 1 - transparency));
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + name,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'opacity',
							$elm$core$String$fromFloat(opacity))
						]));
			case 'FontSize':
				var i = rule.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.font-size-' + $elm$core$String$fromInt(i),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'font-size',
							$elm$core$String$fromInt(i) + 'px')
						]));
			case 'FontFamily':
				var name = rule.a;
				var typefaces = rule.b;
				var features = A2(
					$elm$core$String$join,
					', ',
					A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Internal$Model$renderVariants, typefaces));
				var families = _List_fromArray(
					[
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-family',
						A2(
							$elm$core$String$join,
							', ',
							A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$fontName, typefaces))),
						A2($mdgriffith$elm_ui$Internal$Model$Property, 'font-feature-settings', features),
						A2(
						$mdgriffith$elm_ui$Internal$Model$Property,
						'font-variant',
						A2($elm$core$List$any, $mdgriffith$elm_ui$Internal$Model$hasSmallCaps, typefaces) ? 'small-caps' : 'normal')
					]);
				return A4($mdgriffith$elm_ui$Internal$Model$renderStyle, options, maybePseudo, '.' + name, families);
			case 'Single':
				var _class = rule.a;
				var prop = rule.b;
				var val = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2($mdgriffith$elm_ui$Internal$Model$Property, prop, val)
						]));
			case 'Colored':
				var _class = rule.a;
				var prop = rule.b;
				var color = rule.c;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					'.' + _class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							prop,
							$mdgriffith$elm_ui$Internal$Model$formatColor(color))
						]));
			case 'SpacingStyle':
				var cls = rule.a;
				var x = rule.b;
				var y = rule.c;
				var yPx = $elm$core$String$fromInt(y) + 'px';
				var xPx = $elm$core$String$fromInt(x) + 'px';
				var single = '.' + $mdgriffith$elm_ui$Internal$Style$classes.single;
				var row = '.' + $mdgriffith$elm_ui$Internal$Style$classes.row;
				var wrappedRow = '.' + ($mdgriffith$elm_ui$Internal$Style$classes.wrapped + row);
				var right = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight;
				var paragraph = '.' + $mdgriffith$elm_ui$Internal$Style$classes.paragraph;
				var page = '.' + $mdgriffith$elm_ui$Internal$Style$classes.page;
				var left = '.' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft;
				var halfY = $elm$core$String$fromFloat(y / 2) + 'px';
				var halfX = $elm$core$String$fromFloat(x / 2) + 'px';
				var column = '.' + $mdgriffith$elm_ui$Internal$Style$classes.column;
				var _class = '.' + cls;
				var any = '.' + $mdgriffith$elm_ui$Internal$Style$classes.any;
				return $elm$core$List$concat(
					_List_fromArray(
						[
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (row + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (wrappedRow + (' > ' + any)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin', halfY + (' ' + halfX))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (column + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + (any + (' + ' + any)))),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-top', yPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (page + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_Utils_ap(_class, paragraph),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							'textarea' + (any + _class),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'line-height',
									'calc(1em + ' + ($elm$core$String$fromInt(y) + 'px)')),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'height',
									'calc(100% + ' + ($elm$core$String$fromInt(y) + 'px)'))
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + left)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-right', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + (' > ' + right)),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'margin-left', xPx)
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::after'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-top',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								])),
							A4(
							$mdgriffith$elm_ui$Internal$Model$renderStyle,
							options,
							maybePseudo,
							_class + (paragraph + '::before'),
							_List_fromArray(
								[
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'content', '\'\''),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'display', 'block'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', '0'),
									A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', '0'),
									A2(
									$mdgriffith$elm_ui$Internal$Model$Property,
									'margin-bottom',
									$elm$core$String$fromInt((-1) * ((y / 2) | 0)) + 'px')
								]))
						]));
			case 'PaddingStyle':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'padding',
							$elm$core$String$fromFloat(top) + ('px ' + ($elm$core$String$fromFloat(right) + ('px ' + ($elm$core$String$fromFloat(bottom) + ('px ' + ($elm$core$String$fromFloat(left) + 'px')))))))
						]));
			case 'BorderWidth':
				var cls = rule.a;
				var top = rule.b;
				var right = rule.c;
				var bottom = rule.d;
				var left = rule.e;
				var _class = '.' + cls;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$renderStyle,
					options,
					maybePseudo,
					_class,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$Property,
							'border-width',
							$elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px')))))))
						]));
			case 'GridTemplateStyle':
				var template = rule.a;
				var toGridLengthHelper = F3(
					function (minimum, maximum, x) {
						toGridLengthHelper:
						while (true) {
							switch (x.$) {
								case 'Px':
									var px = x.a;
									return $elm$core$String$fromInt(px) + 'px';
								case 'Content':
									var _v2 = _Utils_Tuple2(minimum, maximum);
									if (_v2.a.$ === 'Nothing') {
										if (_v2.b.$ === 'Nothing') {
											var _v3 = _v2.a;
											var _v4 = _v2.b;
											return 'max-content';
										} else {
											var _v6 = _v2.a;
											var maxSize = _v2.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v2.b.$ === 'Nothing') {
											var minSize = _v2.a.a;
											var _v5 = _v2.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + 'max-content)'));
										} else {
											var minSize = _v2.a.a;
											var maxSize = _v2.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Fill':
									var i = x.a;
									var _v7 = _Utils_Tuple2(minimum, maximum);
									if (_v7.a.$ === 'Nothing') {
										if (_v7.b.$ === 'Nothing') {
											var _v8 = _v7.a;
											var _v9 = _v7.b;
											return $elm$core$String$fromInt(i) + 'fr';
										} else {
											var _v11 = _v7.a;
											var maxSize = _v7.b.a;
											return 'minmax(max-content, ' + ($elm$core$String$fromInt(maxSize) + 'px)');
										}
									} else {
										if (_v7.b.$ === 'Nothing') {
											var minSize = _v7.a.a;
											var _v10 = _v7.b;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(i) + ('fr' + 'fr)'))));
										} else {
											var minSize = _v7.a.a;
											var maxSize = _v7.b.a;
											return 'minmax(' + ($elm$core$String$fromInt(minSize) + ('px, ' + ($elm$core$String$fromInt(maxSize) + 'px)')));
										}
									}
								case 'Min':
									var m = x.a;
									var len = x.b;
									var $temp$minimum = $elm$core$Maybe$Just(m),
										$temp$maximum = maximum,
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
								default:
									var m = x.a;
									var len = x.b;
									var $temp$minimum = minimum,
										$temp$maximum = $elm$core$Maybe$Just(m),
										$temp$x = len;
									minimum = $temp$minimum;
									maximum = $temp$maximum;
									x = $temp$x;
									continue toGridLengthHelper;
							}
						}
					});
				var toGridLength = function (x) {
					return A3(toGridLengthHelper, $elm$core$Maybe$Nothing, $elm$core$Maybe$Nothing, x);
				};
				var xSpacing = toGridLength(template.spacing.a);
				var ySpacing = toGridLength(template.spacing.b);
				var rows = function (x) {
					return 'grid-template-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.rows)));
				var msRows = function (x) {
					return '-ms-grid-rows: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var msColumns = function (x) {
					return '-ms-grid-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						ySpacing,
						A2($elm$core$List$map, toGridLength, template.columns)));
				var gapY = 'grid-row-gap:' + (toGridLength(template.spacing.b) + ';');
				var gapX = 'grid-column-gap:' + (toGridLength(template.spacing.a) + ';');
				var columns = function (x) {
					return 'grid-template-columns: ' + (x + ';');
				}(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, toGridLength, template.columns)));
				var _class = '.grid-rows-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.rows)) + ('-cols-' + (A2(
					$elm$core$String$join,
					'-',
					A2($elm$core$List$map, $mdgriffith$elm_ui$Internal$Model$lengthClassName, template.columns)) + ('-space-x-' + ($mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.a) + ('-space-y-' + $mdgriffith$elm_ui$Internal$Model$lengthClassName(template.spacing.b)))))));
				var modernGrid = _class + ('{' + (columns + (rows + (gapX + (gapY + '}')))));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msColumns + (msRows + '}')));
				return _List_fromArray(
					[base, supports]);
			case 'GridPosition':
				var position = rule.a;
				var msPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'-ms-grid-row: ' + ($elm$core$String$fromInt(position.row) + ';'),
							'-ms-grid-row-span: ' + ($elm$core$String$fromInt(position.height) + ';'),
							'-ms-grid-column: ' + ($elm$core$String$fromInt(position.col) + ';'),
							'-ms-grid-column-span: ' + ($elm$core$String$fromInt(position.width) + ';')
						]));
				var modernPosition = A2(
					$elm$core$String$join,
					' ',
					_List_fromArray(
						[
							'grid-row: ' + ($elm$core$String$fromInt(position.row) + (' / ' + ($elm$core$String$fromInt(position.row + position.height) + ';'))),
							'grid-column: ' + ($elm$core$String$fromInt(position.col) + (' / ' + ($elm$core$String$fromInt(position.col + position.width) + ';')))
						]));
				var _class = '.grid-pos-' + ($elm$core$String$fromInt(position.row) + ('-' + ($elm$core$String$fromInt(position.col) + ('-' + ($elm$core$String$fromInt(position.width) + ('-' + $elm$core$String$fromInt(position.height)))))));
				var modernGrid = _class + ('{' + (modernPosition + '}'));
				var supports = '@supports (display:grid) {' + (modernGrid + '}');
				var base = _class + ('{' + (msPosition + '}'));
				return _List_fromArray(
					[base, supports]);
			case 'PseudoSelector':
				var _class = rule.a;
				var styles = rule.b;
				var renderPseudoRule = function (style) {
					return A3(
						$mdgriffith$elm_ui$Internal$Model$renderStyleRule,
						options,
						style,
						$elm$core$Maybe$Just(_class));
				};
				return A2($elm$core$List$concatMap, renderPseudoRule, styles);
			default:
				var transform = rule.a;
				var val = $mdgriffith$elm_ui$Internal$Model$transformValue(transform);
				var _class = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				var _v12 = _Utils_Tuple2(_class, val);
				if ((_v12.a.$ === 'Just') && (_v12.b.$ === 'Just')) {
					var cls = _v12.a.a;
					var v = _v12.b.a;
					return A4(
						$mdgriffith$elm_ui$Internal$Model$renderStyle,
						options,
						maybePseudo,
						'.' + cls,
						_List_fromArray(
							[
								A2($mdgriffith$elm_ui$Internal$Model$Property, 'transform', v)
							]));
				} else {
					return _List_Nil;
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$encodeStyles = F2(
	function (options, stylesheet) {
		return $elm$json$Json$Encode$object(
			A2(
				$elm$core$List$map,
				function (style) {
					var styled = A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing);
					return _Utils_Tuple2(
						$mdgriffith$elm_ui$Internal$Model$getStyleName(style),
						A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, styled));
				},
				stylesheet));
	});
var $mdgriffith$elm_ui$Internal$Model$bracket = F2(
	function (selector, rules) {
		var renderPair = function (_v0) {
			var name = _v0.a;
			var val = _v0.b;
			return name + (': ' + (val + ';'));
		};
		return selector + (' {' + (A2(
			$elm$core$String$join,
			'',
			A2($elm$core$List$map, renderPair, rules)) + '}'));
	});
var $mdgriffith$elm_ui$Internal$Model$fontRule = F3(
	function (name, modifier, _v0) {
		var parentAdj = _v0.a;
		var textAdjustment = _v0.b;
		return _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + (', ' + ('.' + (name + (' .' + modifier))))))), parentAdj),
				A2($mdgriffith$elm_ui$Internal$Model$bracket, '.' + (name + ('.' + (modifier + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + (modifier + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))), textAdjustment)
			]);
	});
var $mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule = F3(
	function (fontToAdjust, _v0, otherFontName) {
		var full = _v0.a;
		var capital = _v0.b;
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_Utils_ap(
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital, capital),
				A3($mdgriffith$elm_ui$Internal$Model$fontRule, name, $mdgriffith$elm_ui$Internal$Style$classes.fullSize, full)));
	});
var $mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule = F2(
	function (fontToAdjust, otherFontName) {
		var name = _Utils_eq(fontToAdjust, otherFontName) ? fontToAdjust : (otherFontName + (' .' + fontToAdjust));
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (', ' + ('.' + (name + (' .' + $mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('line-height', '1')
						])),
					A2(
					$mdgriffith$elm_ui$Internal$Model$bracket,
					'.' + (name + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + ('> .' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (', .' + (name + (' .' + ($mdgriffith$elm_ui$Internal$Style$classes.sizeByCapital + (' > .' + $mdgriffith$elm_ui$Internal$Style$classes.text)))))))))),
					_List_fromArray(
						[
							_Utils_Tuple2('vertical-align', '0'),
							_Utils_Tuple2('line-height', '1')
						]))
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$adjust = F3(
	function (size, height, vertical) {
		return {height: height / size, size: size, vertical: vertical};
	});
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$convertAdjustment = function (adjustment) {
	var lines = _List_fromArray(
		[adjustment.capital, adjustment.baseline, adjustment.descender, adjustment.lowercase]);
	var lineHeight = 1.5;
	var normalDescender = (lineHeight - 1) / 2;
	var oldMiddle = lineHeight / 2;
	var descender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.descender,
		$elm$core$List$minimum(lines));
	var newBaseline = A2(
		$elm$core$Maybe$withDefault,
		adjustment.baseline,
		$elm$core$List$minimum(
			A2(
				$elm$core$List$filter,
				function (x) {
					return !_Utils_eq(x, descender);
				},
				lines)));
	var base = lineHeight;
	var ascender = A2(
		$elm$core$Maybe$withDefault,
		adjustment.capital,
		$elm$core$List$maximum(lines));
	var capitalSize = 1 / (ascender - newBaseline);
	var capitalVertical = 1 - ascender;
	var fullSize = 1 / (ascender - descender);
	var fullVertical = 1 - ascender;
	var newCapitalMiddle = ((ascender - newBaseline) / 2) + newBaseline;
	var newFullMiddle = ((ascender - descender) / 2) + descender;
	return {
		capital: A3($mdgriffith$elm_ui$Internal$Model$adjust, capitalSize, ascender - newBaseline, capitalVertical),
		full: A3($mdgriffith$elm_ui$Internal$Model$adjust, fullSize, ascender - descender, fullVertical)
	};
};
var $mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules = function (converted) {
	return _Utils_Tuple2(
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'block')
			]),
		_List_fromArray(
			[
				_Utils_Tuple2('display', 'inline-block'),
				_Utils_Tuple2(
				'line-height',
				$elm$core$String$fromFloat(converted.height)),
				_Utils_Tuple2(
				'vertical-align',
				$elm$core$String$fromFloat(converted.vertical) + 'em'),
				_Utils_Tuple2(
				'font-size',
				$elm$core$String$fromFloat(converted.size) + 'em')
			]));
};
var $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment = function (typefaces) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (face, found) {
				if (found.$ === 'Nothing') {
					if (face.$ === 'FontWith') {
						var _with = face.a;
						var _v2 = _with.adjustment;
						if (_v2.$ === 'Nothing') {
							return found;
						} else {
							var adjustment = _v2.a;
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.full;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment))),
									$mdgriffith$elm_ui$Internal$Model$fontAdjustmentRules(
										function ($) {
											return $.capital;
										}(
											$mdgriffith$elm_ui$Internal$Model$convertAdjustment(adjustment)))));
						}
					} else {
						return found;
					}
				} else {
					return found;
				}
			}),
		$elm$core$Maybe$Nothing,
		typefaces);
};
var $mdgriffith$elm_ui$Internal$Model$renderTopLevelValues = function (rules) {
	var withImport = function (font) {
		if (font.$ === 'ImportFont') {
			var url = font.b;
			return $elm$core$Maybe$Just('@import url(\'' + (url + '\');'));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	};
	var fontImports = function (_v2) {
		var name = _v2.a;
		var typefaces = _v2.b;
		var imports = A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$filterMap, withImport, typefaces));
		return imports;
	};
	var allNames = A2($elm$core$List$map, $elm$core$Tuple$first, rules);
	var fontAdjustments = function (_v1) {
		var name = _v1.a;
		var typefaces = _v1.b;
		var _v0 = $mdgriffith$elm_ui$Internal$Model$typefaceAdjustment(typefaces);
		if (_v0.$ === 'Nothing') {
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					$mdgriffith$elm_ui$Internal$Model$renderNullAdjustmentRule(name),
					allNames));
		} else {
			var adjustment = _v0.a;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$map,
					A2($mdgriffith$elm_ui$Internal$Model$renderFontAdjustmentRule, name, adjustment),
					allNames));
		}
	};
	return _Utils_ap(
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontImports, rules)),
		A2(
			$elm$core$String$join,
			'\n',
			A2($elm$core$List$map, fontAdjustments, rules)));
};
var $mdgriffith$elm_ui$Internal$Model$topLevelValue = function (rule) {
	if (rule.$ === 'FontFamily') {
		var name = rule.a;
		var typefaces = rule.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(name, typefaces));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Internal$Model$toStyleSheetString = F2(
	function (options, stylesheet) {
		var combine = F2(
			function (style, rendered) {
				return {
					rules: _Utils_ap(
						rendered.rules,
						A3($mdgriffith$elm_ui$Internal$Model$renderStyleRule, options, style, $elm$core$Maybe$Nothing)),
					topLevel: function () {
						var _v1 = $mdgriffith$elm_ui$Internal$Model$topLevelValue(style);
						if (_v1.$ === 'Nothing') {
							return rendered.topLevel;
						} else {
							var topLevel = _v1.a;
							return A2($elm$core$List$cons, topLevel, rendered.topLevel);
						}
					}()
				};
			});
		var _v0 = A3(
			$elm$core$List$foldl,
			combine,
			{rules: _List_Nil, topLevel: _List_Nil},
			stylesheet);
		var topLevel = _v0.topLevel;
		var rules = _v0.rules;
		return _Utils_ap(
			$mdgriffith$elm_ui$Internal$Model$renderTopLevelValues(topLevel),
			$elm$core$String$concat(rules));
	});
var $mdgriffith$elm_ui$Internal$Model$toStyleSheet = F2(
	function (options, styleSheet) {
		var _v0 = options.mode;
		switch (_v0.$) {
			case 'Layout':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			case 'NoStaticStyleSheet':
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'div',
					_List_Nil,
					_List_fromArray(
						[
							A3(
							$elm$virtual_dom$VirtualDom$node,
							'style',
							_List_Nil,
							_List_fromArray(
								[
									$elm$virtual_dom$VirtualDom$text(
									A2($mdgriffith$elm_ui$Internal$Model$toStyleSheetString, options, styleSheet))
								]))
						]));
			default:
				return A3(
					$elm$virtual_dom$VirtualDom$node,
					'elm-ui-rules',
					_List_fromArray(
						[
							A2(
							$elm$virtual_dom$VirtualDom$property,
							'rules',
							A2($mdgriffith$elm_ui$Internal$Model$encodeStyles, options, styleSheet))
						]),
					_List_Nil);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$embedKeyed = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			_Utils_Tuple2(
				'static-stylesheet',
				$mdgriffith$elm_ui$Internal$Model$staticRoot(opts)),
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
				children)) : A2(
			$elm$core$List$cons,
			_Utils_Tuple2('dynamic-stylesheet', dynamicStyleSheet),
			children);
	});
var $mdgriffith$elm_ui$Internal$Model$embedWith = F4(
	function (_static, opts, styles, children) {
		var dynamicStyleSheet = A2(
			$mdgriffith$elm_ui$Internal$Model$toStyleSheet,
			opts,
			A3(
				$elm$core$List$foldl,
				$mdgriffith$elm_ui$Internal$Model$reduceStyles,
				_Utils_Tuple2(
					$elm$core$Set$empty,
					$mdgriffith$elm_ui$Internal$Model$renderFocusStyle(opts.focus)),
				styles).b);
		return _static ? A2(
			$elm$core$List$cons,
			$mdgriffith$elm_ui$Internal$Model$staticRoot(opts),
			A2($elm$core$List$cons, dynamicStyleSheet, children)) : A2($elm$core$List$cons, dynamicStyleSheet, children);
	});
var $mdgriffith$elm_ui$Internal$Flag$heightBetween = $mdgriffith$elm_ui$Internal$Flag$flag(45);
var $mdgriffith$elm_ui$Internal$Flag$heightFill = $mdgriffith$elm_ui$Internal$Flag$flag(37);
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $mdgriffith$elm_ui$Internal$Flag$present = F2(
	function (myFlag, _v0) {
		var fieldOne = _v0.a;
		var fieldTwo = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return _Utils_eq(first & fieldOne, first);
		} else {
			var second = myFlag.a;
			return _Utils_eq(second & fieldTwo, second);
		}
	});
var $elm$html$Html$s = _VirtualDom_node('s');
var $elm$html$Html$u = _VirtualDom_node('u');
var $mdgriffith$elm_ui$Internal$Flag$widthBetween = $mdgriffith$elm_ui$Internal$Flag$flag(44);
var $mdgriffith$elm_ui$Internal$Flag$widthFill = $mdgriffith$elm_ui$Internal$Flag$flag(39);
var $mdgriffith$elm_ui$Internal$Model$finalizeNode = F6(
	function (has, node, attributes, children, embedMode, parentContext) {
		var createNode = F2(
			function (nodeName, attrs) {
				if (children.$ === 'Keyed') {
					var keyed = children.a;
					return A3(
						$elm$virtual_dom$VirtualDom$keyedNode,
						nodeName,
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return keyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, false, opts, styles, keyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedKeyed, true, opts, styles, keyed);
							}
						}());
				} else {
					var unkeyed = children.a;
					return A2(
						function () {
							switch (nodeName) {
								case 'div':
									return $elm$html$Html$div;
								case 'p':
									return $elm$html$Html$p;
								default:
									return $elm$virtual_dom$VirtualDom$node(nodeName);
							}
						}(),
						attrs,
						function () {
							switch (embedMode.$) {
								case 'NoStyleSheet':
									return unkeyed;
								case 'OnlyDynamic':
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, false, opts, styles, unkeyed);
								default:
									var opts = embedMode.a;
									var styles = embedMode.b;
									return A4($mdgriffith$elm_ui$Internal$Model$embedWith, true, opts, styles, unkeyed);
							}
						}());
				}
			});
		var html = function () {
			switch (node.$) {
				case 'Generic':
					return A2(createNode, 'div', attributes);
				case 'NodeName':
					var nodeName = node.a;
					return A2(createNode, nodeName, attributes);
				default:
					var nodeName = node.a;
					var internal = node.b;
					return A3(
						$elm$virtual_dom$VirtualDom$node,
						nodeName,
						attributes,
						_List_fromArray(
							[
								A2(
								createNode,
								internal,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.single))
									]))
							]));
			}
		}();
		switch (parentContext.$) {
			case 'AsRow':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$widthBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignRight, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerRight])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerX, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterX])))
						]),
					_List_fromArray(
						[html])) : html));
			case 'AsColumn':
				return (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightFill, has) && (!A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$heightBetween, has))) ? html : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$centerY, has) ? A2(
					$elm$html$Html$s,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerCenterY])))
						]),
					_List_fromArray(
						[html])) : (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$alignBottom, has) ? A2(
					$elm$html$Html$u,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									[$mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.container, $mdgriffith$elm_ui$Internal$Style$classes.alignContainerBottom])))
						]),
					_List_fromArray(
						[html])) : html));
			default:
				return html;
		}
	});
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $mdgriffith$elm_ui$Internal$Model$textElementClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthContent + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightContent)))));
var $mdgriffith$elm_ui$Internal$Model$textElement = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$textElementFillClasses = $mdgriffith$elm_ui$Internal$Style$classes.any + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.text + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFill + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.heightFill)))));
var $mdgriffith$elm_ui$Internal$Model$textElementFill = function (str) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Model$textElementFillClasses)
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $mdgriffith$elm_ui$Internal$Model$createElement = F3(
	function (context, children, rendered) {
		var gatherKeyed = F2(
			function (_v8, _v9) {
				var key = _v8.a;
				var child = _v8.b;
				var htmls = _v9.a;
				var existingStyles = _v9.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									html(context)),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context)),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									key,
									_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str)),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		var gather = F2(
			function (child, _v6) {
				var htmls = _v6.a;
				var existingStyles = _v6.b;
				switch (child.$) {
					case 'Unstyled':
						var html = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								html(context),
								htmls),
							existingStyles);
					case 'Styled':
						var styled = child.a;
						return _Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asParagraph) ? _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles)) : _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, context),
								htmls),
							$elm$core$List$isEmpty(existingStyles) ? styled.styles : _Utils_ap(styled.styles, existingStyles));
					case 'Text':
						var str = child.a;
						return _Utils_Tuple2(
							A2(
								$elm$core$List$cons,
								_Utils_eq(context, $mdgriffith$elm_ui$Internal$Model$asEl) ? $mdgriffith$elm_ui$Internal$Model$textElementFill(str) : $mdgriffith$elm_ui$Internal$Model$textElement(str),
								htmls),
							existingStyles);
					default:
						return _Utils_Tuple2(htmls, existingStyles);
				}
			});
		if (children.$ === 'Keyed') {
			var keyedChildren = children.a;
			var _v1 = A3(
				$elm$core$List$foldr,
				gatherKeyed,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				keyedChildren);
			var keyed = _v1.a;
			var styles = _v1.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Keyed(
							A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Keyed(
								A3($mdgriffith$elm_ui$Internal$Model$addKeyedChildren, 'nearby-element-pls', keyed, rendered.children))),
						styles: allStyles
					});
			}
		} else {
			var unkeyedChildren = children.a;
			var _v3 = A3(
				$elm$core$List$foldr,
				gather,
				_Utils_Tuple2(_List_Nil, _List_Nil),
				unkeyedChildren);
			var unkeyed = _v3.a;
			var styles = _v3.b;
			var newStyles = $elm$core$List$isEmpty(styles) ? rendered.styles : _Utils_ap(rendered.styles, styles);
			if (!newStyles.b) {
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A5(
						$mdgriffith$elm_ui$Internal$Model$finalizeNode,
						rendered.has,
						rendered.node,
						rendered.attributes,
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children)),
						$mdgriffith$elm_ui$Internal$Model$NoStyleSheet));
			} else {
				var allStyles = newStyles;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: A4(
							$mdgriffith$elm_ui$Internal$Model$finalizeNode,
							rendered.has,
							rendered.node,
							rendered.attributes,
							$mdgriffith$elm_ui$Internal$Model$Unkeyed(
								A2($mdgriffith$elm_ui$Internal$Model$addChildren, unkeyed, rendered.children))),
						styles: allStyles
					});
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Single = F3(
	function (a, b, c) {
		return {$: 'Single', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$Transform = function (a) {
	return {$: 'Transform', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$add = F2(
	function (myFlag, _v0) {
		var one = _v0.a;
		var two = _v0.b;
		if (myFlag.$ === 'Flag') {
			var first = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, first | one, two);
		} else {
			var second = myFlag.a;
			return A2($mdgriffith$elm_ui$Internal$Flag$Field, one, second | two);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehind = function (a) {
	return {$: 'ChildrenBehind', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront = F2(
	function (a, b) {
		return {$: 'ChildrenBehindAndInFront', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$ChildrenInFront = function (a) {
	return {$: 'ChildrenInFront', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$nearbyElement = F2(
	function (location, elem) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					function () {
						switch (location.$) {
							case 'Above':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.above]));
							case 'Below':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.below]));
							case 'OnRight':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onRight]));
							case 'OnLeft':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.onLeft]));
							case 'InFront':
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.inFront]));
							default:
								return A2(
									$elm$core$String$join,
									' ',
									_List_fromArray(
										[$mdgriffith$elm_ui$Internal$Style$classes.nearby, $mdgriffith$elm_ui$Internal$Style$classes.single, $mdgriffith$elm_ui$Internal$Style$classes.behind]));
						}
					}())
				]),
			_List_fromArray(
				[
					function () {
					switch (elem.$) {
						case 'Empty':
							return $elm$virtual_dom$VirtualDom$text('');
						case 'Text':
							var str = elem.a;
							return $mdgriffith$elm_ui$Internal$Model$textElement(str);
						case 'Unstyled':
							var html = elem.a;
							return html($mdgriffith$elm_ui$Internal$Model$asEl);
						default:
							var styled = elem.a;
							return A2(styled.html, $mdgriffith$elm_ui$Internal$Model$NoStyleSheet, $mdgriffith$elm_ui$Internal$Model$asEl);
					}
				}()
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$addNearbyElement = F3(
	function (location, elem, existing) {
		var nearby = A2($mdgriffith$elm_ui$Internal$Model$nearbyElement, location, elem);
		switch (existing.$) {
			case 'NoNearbyChildren':
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						_List_fromArray(
							[nearby]));
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenBehind':
				var existingBehind = existing.a;
				if (location.$ === 'Behind') {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenBehind(
						A2($elm$core$List$cons, nearby, existingBehind));
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						_List_fromArray(
							[nearby]));
				}
			case 'ChildrenInFront':
				var existingInFront = existing.a;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						_List_fromArray(
							[nearby]),
						existingInFront);
				} else {
					return $mdgriffith$elm_ui$Internal$Model$ChildrenInFront(
						A2($elm$core$List$cons, nearby, existingInFront));
				}
			default:
				var existingBehind = existing.a;
				var existingInFront = existing.b;
				if (location.$ === 'Behind') {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						A2($elm$core$List$cons, nearby, existingBehind),
						existingInFront);
				} else {
					return A2(
						$mdgriffith$elm_ui$Internal$Model$ChildrenBehindAndInFront,
						existingBehind,
						A2($elm$core$List$cons, nearby, existingInFront));
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Embedded = F2(
	function (a, b) {
		return {$: 'Embedded', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$NodeName = function (a) {
	return {$: 'NodeName', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$addNodeName = F2(
	function (newNode, old) {
		switch (old.$) {
			case 'Generic':
				return $mdgriffith$elm_ui$Internal$Model$NodeName(newNode);
			case 'NodeName':
				var name = old.a;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, name, newNode);
			default:
				var x = old.a;
				var y = old.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Embedded, x, y);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$alignXName = function (align) {
	switch (align.$) {
		case 'Left':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignLeft);
		case 'Right':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignRight);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedHorizontally + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterX);
	}
};
var $mdgriffith$elm_ui$Internal$Model$alignYName = function (align) {
	switch (align.$) {
		case 'Top':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignTop);
		case 'Bottom':
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignBottom);
		default:
			return $mdgriffith$elm_ui$Internal$Style$classes.alignedVertically + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.alignCenterY);
	}
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $mdgriffith$elm_ui$Internal$Model$FullTransform = F4(
	function (a, b, c, d) {
		return {$: 'FullTransform', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$Moved = function (a) {
	return {$: 'Moved', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$composeTransformation = F2(
	function (transform, component) {
		switch (transform.$) {
			case 'Untransformed':
				switch (component.$) {
					case 'MoveX':
						var x = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, 0, 0));
					case 'MoveY':
						var y = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, y, 0));
					case 'MoveZ':
						var z = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(0, 0, z));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var xyz = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(0, 0, 0),
							xyz,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			case 'Moved':
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(newX, y, z));
					case 'MoveY':
						var newY = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, newY, z));
					case 'MoveZ':
						var newZ = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(
							_Utils_Tuple3(x, y, newZ));
					case 'MoveXYZ':
						var xyz = component.a;
						return $mdgriffith$elm_ui$Internal$Model$Moved(xyz);
					case 'Rotate':
						var xyz = component.a;
						var angle = component.b;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							_Utils_Tuple3(1, 1, 1),
							xyz,
							angle);
					default:
						var scale = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							moved,
							scale,
							_Utils_Tuple3(0, 0, 1),
							0);
				}
			default:
				var moved = transform.a;
				var x = moved.a;
				var y = moved.b;
				var z = moved.c;
				var scaled = transform.b;
				var origin = transform.c;
				var angle = transform.d;
				switch (component.$) {
					case 'MoveX':
						var newX = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(newX, y, z),
							scaled,
							origin,
							angle);
					case 'MoveY':
						var newY = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, newY, z),
							scaled,
							origin,
							angle);
					case 'MoveZ':
						var newZ = component.a;
						return A4(
							$mdgriffith$elm_ui$Internal$Model$FullTransform,
							_Utils_Tuple3(x, y, newZ),
							scaled,
							origin,
							angle);
					case 'MoveXYZ':
						var newMove = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, newMove, scaled, origin, angle);
					case 'Rotate':
						var newOrigin = component.a;
						var newAngle = component.b;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, scaled, newOrigin, newAngle);
					default:
						var newScale = component.a;
						return A4($mdgriffith$elm_ui$Internal$Model$FullTransform, moved, newScale, origin, angle);
				}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$height = $mdgriffith$elm_ui$Internal$Flag$flag(7);
var $mdgriffith$elm_ui$Internal$Flag$heightContent = $mdgriffith$elm_ui$Internal$Flag$flag(36);
var $mdgriffith$elm_ui$Internal$Flag$merge = F2(
	function (_v0, _v1) {
		var one = _v0.a;
		var two = _v0.b;
		var three = _v1.a;
		var four = _v1.b;
		return A2($mdgriffith$elm_ui$Internal$Flag$Field, one | three, two | four);
	});
var $mdgriffith$elm_ui$Internal$Flag$none = A2($mdgriffith$elm_ui$Internal$Flag$Field, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$renderHeight = function (h) {
	switch (h.$) {
		case 'Px':
			var px = h.a;
			var val = $elm$core$String$fromInt(px);
			var name = 'height-px-' + val;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + name),
				_List_fromArray(
					[
						A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height', val + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightContent,
				_List_Nil);
		case 'Fill':
			var portion = h.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'height-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = h.a;
			var len = h.b;
			var cls = 'min-height-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-height',
				$elm$core$String$fromInt(minSize) + 'px !important');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = h.a;
			var len = h.b;
			var cls = 'max-height-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-height',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderHeight(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$heightBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$widthContent = $mdgriffith$elm_ui$Internal$Flag$flag(38);
var $mdgriffith$elm_ui$Internal$Model$renderWidth = function (w) {
	switch (w.$) {
		case 'Px':
			var px = w.a;
			return _Utils_Tuple3(
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						'width-px-' + $elm$core$String$fromInt(px),
						'width',
						$elm$core$String$fromInt(px) + 'px')
					]));
		case 'Content':
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthContent, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthContent,
				_List_Nil);
		case 'Fill':
			var portion = w.a;
			return (portion === 1) ? _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFill,
				_List_Nil) : _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthFill, $mdgriffith$elm_ui$Internal$Flag$none),
				$mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)),
				_List_fromArray(
					[
						A3(
						$mdgriffith$elm_ui$Internal$Model$Single,
						$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
							'width-fill-' + $elm$core$String$fromInt(portion))))),
						'flex-grow',
						$elm$core$String$fromInt(portion * 100000))
					]));
		case 'Min':
			var minSize = w.a;
			var len = w.b;
			var cls = 'min-width-' + $elm$core$String$fromInt(minSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'min-width',
				$elm$core$String$fromInt(minSize) + 'px');
			var _v1 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v1.a;
			var newAttrs = _v1.b;
			var newStyle = _v1.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
		default:
			var maxSize = w.a;
			var len = w.b;
			var cls = 'max-width-' + $elm$core$String$fromInt(maxSize);
			var style = A3(
				$mdgriffith$elm_ui$Internal$Model$Single,
				cls,
				'max-width',
				$elm$core$String$fromInt(maxSize) + 'px');
			var _v2 = $mdgriffith$elm_ui$Internal$Model$renderWidth(len);
			var newFlag = _v2.a;
			var newAttrs = _v2.b;
			var newStyle = _v2.c;
			return _Utils_Tuple3(
				A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$widthBetween, newFlag),
				cls + (' ' + newAttrs),
				A2($elm$core$List$cons, style, newStyle));
	}
};
var $mdgriffith$elm_ui$Internal$Flag$borderWidth = $mdgriffith$elm_ui$Internal$Flag$flag(27);
var $mdgriffith$elm_ui$Internal$Model$skippable = F2(
	function (flag, style) {
		if (_Utils_eq(flag, $mdgriffith$elm_ui$Internal$Flag$borderWidth)) {
			if (style.$ === 'Single') {
				var val = style.c;
				switch (val) {
					case '0px':
						return true;
					case '1px':
						return true;
					case '2px':
						return true;
					case '3px':
						return true;
					case '4px':
						return true;
					case '5px':
						return true;
					case '6px':
						return true;
					default:
						return false;
				}
			} else {
				return false;
			}
		} else {
			switch (style.$) {
				case 'FontSize':
					var i = style.a;
					return (i >= 8) && (i <= 32);
				case 'PaddingStyle':
					var name = style.a;
					var t = style.b;
					var r = style.c;
					var b = style.d;
					var l = style.e;
					return _Utils_eq(t, b) && (_Utils_eq(t, r) && (_Utils_eq(t, l) && ((t >= 0) && (t <= 24))));
				default:
					return false;
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Flag$width = $mdgriffith$elm_ui$Internal$Flag$flag(6);
var $mdgriffith$elm_ui$Internal$Flag$xAlign = $mdgriffith$elm_ui$Internal$Flag$flag(30);
var $mdgriffith$elm_ui$Internal$Flag$yAlign = $mdgriffith$elm_ui$Internal$Flag$flag(29);
var $mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive = F8(
	function (classes, node, has, transform, styles, attrs, children, elementAttrs) {
		gatherAttrRecursive:
		while (true) {
			if (!elementAttrs.b) {
				var _v1 = $mdgriffith$elm_ui$Internal$Model$transformClass(transform);
				if (_v1.$ === 'Nothing') {
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: styles
					};
				} else {
					var _class = _v1.a;
					return {
						attributes: A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$class(classes + (' ' + _class)),
							attrs),
						children: children,
						has: has,
						node: node,
						styles: A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$Transform(transform),
							styles)
					};
				}
			} else {
				var attribute = elementAttrs.a;
				var remaining = elementAttrs.b;
				switch (attribute.$) {
					case 'NoAttribute':
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Class':
						var flag = attribute.a;
						var exactClassName = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = exactClassName + (' ' + classes),
								$temp$node = node,
								$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					case 'Attr':
						var actualAttribute = attribute.a;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = styles,
							$temp$attrs = A2($elm$core$List$cons, actualAttribute, attrs),
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'StyleClass':
						var flag = attribute.a;
						var style = attribute.b;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, flag, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							if (A2($mdgriffith$elm_ui$Internal$Model$skippable, flag, style)) {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							} else {
								var $temp$classes = $mdgriffith$elm_ui$Internal$Model$getStyleName(style) + (' ' + classes),
									$temp$node = node,
									$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
									$temp$transform = transform,
									$temp$styles = A2($elm$core$List$cons, style, styles),
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							}
						}
					case 'TransformComponent':
						var flag = attribute.a;
						var component = attribute.b;
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, flag, has),
							$temp$transform = A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, transform, component),
							$temp$styles = styles,
							$temp$attrs = attrs,
							$temp$children = children,
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'Width':
						var width = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$width, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (width.$) {
								case 'Px':
									var px = width.a;
									var $temp$classes = ($mdgriffith$elm_ui$Internal$Style$classes.widthExact + (' width-px-' + $elm$core$String$fromInt(px))) + (' ' + classes),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3(
											$mdgriffith$elm_ui$Internal$Model$Single,
											'width-px-' + $elm$core$String$fromInt(px),
											'width',
											$elm$core$String$fromInt(px) + 'px'),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthContent),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$widthContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = width.a;
									if (portion === 1) {
										var $temp$classes = classes + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.widthFill),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.widthFillPortion + (' width-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$widthFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.row + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'width-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v4 = $mdgriffith$elm_ui$Internal$Model$renderWidth(width);
									var addToFlags = _v4.a;
									var newClass = _v4.b;
									var newStyles = _v4.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$width, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Height':
						var height = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$height, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							switch (height.$) {
								case 'Px':
									var px = height.a;
									var val = $elm$core$String$fromInt(px) + 'px';
									var name = 'height-px-' + val;
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightExact + (' ' + (name + (' ' + classes))),
										$temp$node = node,
										$temp$has = A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has),
										$temp$transform = transform,
										$temp$styles = A2(
										$elm$core$List$cons,
										A3($mdgriffith$elm_ui$Internal$Model$Single, name, 'height ', val),
										styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Content':
									var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightContent + (' ' + classes),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$add,
										$mdgriffith$elm_ui$Internal$Flag$heightContent,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								case 'Fill':
									var portion = height.a;
									if (portion === 1) {
										var $temp$classes = $mdgriffith$elm_ui$Internal$Style$classes.heightFill + (' ' + classes),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.heightFillPortion + (' height-fill-' + $elm$core$String$fromInt(portion)))),
											$temp$node = node,
											$temp$has = A2(
											$mdgriffith$elm_ui$Internal$Flag$add,
											$mdgriffith$elm_ui$Internal$Flag$heightFill,
											A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
											$temp$transform = transform,
											$temp$styles = A2(
											$elm$core$List$cons,
											A3(
												$mdgriffith$elm_ui$Internal$Model$Single,
												$mdgriffith$elm_ui$Internal$Style$classes.any + ('.' + ($mdgriffith$elm_ui$Internal$Style$classes.column + (' > ' + $mdgriffith$elm_ui$Internal$Style$dot(
													'height-fill-' + $elm$core$String$fromInt(portion))))),
												'flex-grow',
												$elm$core$String$fromInt(portion * 100000)),
											styles),
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								default:
									var _v6 = $mdgriffith$elm_ui$Internal$Model$renderHeight(height);
									var addToFlags = _v6.a;
									var newClass = _v6.b;
									var newStyles = _v6.c;
									var $temp$classes = classes + (' ' + newClass),
										$temp$node = node,
										$temp$has = A2(
										$mdgriffith$elm_ui$Internal$Flag$merge,
										addToFlags,
										A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$height, has)),
										$temp$transform = transform,
										$temp$styles = _Utils_ap(newStyles, styles),
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
							}
						}
					case 'Describe':
						var description = attribute.a;
						switch (description.$) {
							case 'Main':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'main', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Navigation':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'nav', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'ContentInfo':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'footer', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Complementary':
								var $temp$classes = classes,
									$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'aside', node),
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Heading':
								var i = description.a;
								if (i <= 1) {
									var $temp$classes = classes,
										$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h1', node),
										$temp$has = has,
										$temp$transform = transform,
										$temp$styles = styles,
										$temp$attrs = attrs,
										$temp$children = children,
										$temp$elementAttrs = remaining;
									classes = $temp$classes;
									node = $temp$node;
									has = $temp$has;
									transform = $temp$transform;
									styles = $temp$styles;
									attrs = $temp$attrs;
									children = $temp$children;
									elementAttrs = $temp$elementAttrs;
									continue gatherAttrRecursive;
								} else {
									if (i < 7) {
										var $temp$classes = classes,
											$temp$node = A2(
											$mdgriffith$elm_ui$Internal$Model$addNodeName,
											'h' + $elm$core$String$fromInt(i),
											node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									} else {
										var $temp$classes = classes,
											$temp$node = A2($mdgriffith$elm_ui$Internal$Model$addNodeName, 'h6', node),
											$temp$has = has,
											$temp$transform = transform,
											$temp$styles = styles,
											$temp$attrs = attrs,
											$temp$children = children,
											$temp$elementAttrs = remaining;
										classes = $temp$classes;
										node = $temp$node;
										has = $temp$has;
										transform = $temp$transform;
										styles = $temp$styles;
										attrs = $temp$attrs;
										children = $temp$children;
										elementAttrs = $temp$elementAttrs;
										continue gatherAttrRecursive;
									}
								}
							case 'Paragraph':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = attrs,
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Button':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'role', 'button'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'Label':
								var label = description.a;
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-label', label),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							case 'LivePolite':
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'polite'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
							default:
								var $temp$classes = classes,
									$temp$node = node,
									$temp$has = has,
									$temp$transform = transform,
									$temp$styles = styles,
									$temp$attrs = A2(
									$elm$core$List$cons,
									A2($elm$virtual_dom$VirtualDom$attribute, 'aria-live', 'assertive'),
									attrs),
									$temp$children = children,
									$temp$elementAttrs = remaining;
								classes = $temp$classes;
								node = $temp$node;
								has = $temp$has;
								transform = $temp$transform;
								styles = $temp$styles;
								attrs = $temp$attrs;
								children = $temp$children;
								elementAttrs = $temp$elementAttrs;
								continue gatherAttrRecursive;
						}
					case 'Nearby':
						var location = attribute.a;
						var elem = attribute.b;
						var newStyles = function () {
							switch (elem.$) {
								case 'Empty':
									return styles;
								case 'Text':
									var str = elem.a;
									return styles;
								case 'Unstyled':
									var html = elem.a;
									return styles;
								default:
									var styled = elem.a;
									return _Utils_ap(styles, styled.styles);
							}
						}();
						var $temp$classes = classes,
							$temp$node = node,
							$temp$has = has,
							$temp$transform = transform,
							$temp$styles = newStyles,
							$temp$attrs = attrs,
							$temp$children = A3($mdgriffith$elm_ui$Internal$Model$addNearbyElement, location, elem, children),
							$temp$elementAttrs = remaining;
						classes = $temp$classes;
						node = $temp$node;
						has = $temp$has;
						transform = $temp$transform;
						styles = $temp$styles;
						attrs = $temp$attrs;
						children = $temp$children;
						elementAttrs = $temp$elementAttrs;
						continue gatherAttrRecursive;
					case 'AlignX':
						var x = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignXName(x) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (x.$) {
									case 'CenterX':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerX, flags);
									case 'Right':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignRight, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$xAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
					default:
						var y = attribute.a;
						if (A2($mdgriffith$elm_ui$Internal$Flag$present, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)) {
							var $temp$classes = classes,
								$temp$node = node,
								$temp$has = has,
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						} else {
							var $temp$classes = $mdgriffith$elm_ui$Internal$Model$alignYName(y) + (' ' + classes),
								$temp$node = node,
								$temp$has = function (flags) {
								switch (y.$) {
									case 'CenterY':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$centerY, flags);
									case 'Bottom':
										return A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$alignBottom, flags);
									default:
										return flags;
								}
							}(
								A2($mdgriffith$elm_ui$Internal$Flag$add, $mdgriffith$elm_ui$Internal$Flag$yAlign, has)),
								$temp$transform = transform,
								$temp$styles = styles,
								$temp$attrs = attrs,
								$temp$children = children,
								$temp$elementAttrs = remaining;
							classes = $temp$classes;
							node = $temp$node;
							has = $temp$has;
							transform = $temp$transform;
							styles = $temp$styles;
							attrs = $temp$attrs;
							children = $temp$children;
							elementAttrs = $temp$elementAttrs;
							continue gatherAttrRecursive;
						}
				}
			}
		}
	});
var $mdgriffith$elm_ui$Internal$Model$Untransformed = {$: 'Untransformed'};
var $mdgriffith$elm_ui$Internal$Model$untransformed = $mdgriffith$elm_ui$Internal$Model$Untransformed;
var $mdgriffith$elm_ui$Internal$Model$element = F4(
	function (context, node, attributes, children) {
		return A3(
			$mdgriffith$elm_ui$Internal$Model$createElement,
			context,
			children,
			A8(
				$mdgriffith$elm_ui$Internal$Model$gatherAttrRecursive,
				$mdgriffith$elm_ui$Internal$Model$contextClasses(context),
				node,
				$mdgriffith$elm_ui$Internal$Flag$none,
				$mdgriffith$elm_ui$Internal$Model$untransformed,
				_List_Nil,
				_List_Nil,
				$mdgriffith$elm_ui$Internal$Model$NoNearbyChildren,
				$elm$core$List$reverse(attributes)));
	});
var $mdgriffith$elm_ui$Internal$Model$AllowHover = {$: 'AllowHover'};
var $mdgriffith$elm_ui$Internal$Model$Layout = {$: 'Layout'};
var $mdgriffith$elm_ui$Internal$Model$Rgba = F4(
	function (a, b, c, d) {
		return {$: 'Rgba', a: a, b: b, c: c, d: d};
	});
var $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle = {
	backgroundColor: $elm$core$Maybe$Nothing,
	borderColor: $elm$core$Maybe$Nothing,
	shadow: $elm$core$Maybe$Just(
		{
			blur: 0,
			color: A4($mdgriffith$elm_ui$Internal$Model$Rgba, 155 / 255, 203 / 255, 1, 1),
			offset: _Utils_Tuple2(0, 0),
			size: 3
		})
};
var $mdgriffith$elm_ui$Internal$Model$optionsToRecord = function (options) {
	var combine = F2(
		function (opt, record) {
			switch (opt.$) {
				case 'HoverOption':
					var hoverable = opt.a;
					var _v4 = record.hover;
					if (_v4.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								hover: $elm$core$Maybe$Just(hoverable)
							});
					} else {
						return record;
					}
				case 'FocusStyleOption':
					var focusStyle = opt.a;
					var _v5 = record.focus;
					if (_v5.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								focus: $elm$core$Maybe$Just(focusStyle)
							});
					} else {
						return record;
					}
				default:
					var renderMode = opt.a;
					var _v6 = record.mode;
					if (_v6.$ === 'Nothing') {
						return _Utils_update(
							record,
							{
								mode: $elm$core$Maybe$Just(renderMode)
							});
					} else {
						return record;
					}
			}
		});
	var andFinally = function (record) {
		return {
			focus: function () {
				var _v0 = record.focus;
				if (_v0.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$focusDefaultStyle;
				} else {
					var focusable = _v0.a;
					return focusable;
				}
			}(),
			hover: function () {
				var _v1 = record.hover;
				if (_v1.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$AllowHover;
				} else {
					var hoverable = _v1.a;
					return hoverable;
				}
			}(),
			mode: function () {
				var _v2 = record.mode;
				if (_v2.$ === 'Nothing') {
					return $mdgriffith$elm_ui$Internal$Model$Layout;
				} else {
					var actualMode = _v2.a;
					return actualMode;
				}
			}()
		};
	};
	return andFinally(
		A3(
			$elm$core$List$foldr,
			combine,
			{focus: $elm$core$Maybe$Nothing, hover: $elm$core$Maybe$Nothing, mode: $elm$core$Maybe$Nothing},
			options));
};
var $mdgriffith$elm_ui$Internal$Model$toHtml = F2(
	function (mode, el) {
		switch (el.$) {
			case 'Unstyled':
				var html = el.a;
				return html($mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Styled':
				var styles = el.a.styles;
				var html = el.a.html;
				return A2(
					html,
					mode(styles),
					$mdgriffith$elm_ui$Internal$Model$asEl);
			case 'Text':
				var text = el.a;
				return $mdgriffith$elm_ui$Internal$Model$textElement(text);
			default:
				return $mdgriffith$elm_ui$Internal$Model$textElement('');
		}
	});
var $mdgriffith$elm_ui$Internal$Model$renderRoot = F3(
	function (optionList, attributes, child) {
		var options = $mdgriffith$elm_ui$Internal$Model$optionsToRecord(optionList);
		var embedStyle = function () {
			var _v0 = options.mode;
			if (_v0.$ === 'NoStaticStyleSheet') {
				return $mdgriffith$elm_ui$Internal$Model$OnlyDynamic(options);
			} else {
				return $mdgriffith$elm_ui$Internal$Model$StaticRootAndDynamic(options);
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Internal$Model$toHtml,
			embedStyle,
			A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				attributes,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[child]))));
	});
var $mdgriffith$elm_ui$Internal$Model$Colored = F3(
	function (a, b, c) {
		return {$: 'Colored', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Model$FontFamily = F2(
	function (a, b) {
		return {$: 'FontFamily', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$FontSize = function (a) {
	return {$: 'FontSize', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$SansSerif = {$: 'SansSerif'};
var $mdgriffith$elm_ui$Internal$Model$StyleClass = F2(
	function (a, b) {
		return {$: 'StyleClass', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Typeface = function (a) {
	return {$: 'Typeface', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$bgColor = $mdgriffith$elm_ui$Internal$Flag$flag(8);
var $mdgriffith$elm_ui$Internal$Flag$fontColor = $mdgriffith$elm_ui$Internal$Flag$flag(14);
var $mdgriffith$elm_ui$Internal$Flag$fontFamily = $mdgriffith$elm_ui$Internal$Flag$flag(5);
var $mdgriffith$elm_ui$Internal$Flag$fontSize = $mdgriffith$elm_ui$Internal$Flag$flag(4);
var $mdgriffith$elm_ui$Internal$Model$formatColorClass = function (_v0) {
	var red = _v0.a;
	var green = _v0.b;
	var blue = _v0.c;
	var alpha = _v0.d;
	return $mdgriffith$elm_ui$Internal$Model$floatClass(red) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(green) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(blue) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(alpha))))));
};
var $mdgriffith$elm_ui$Internal$Model$renderFontClassName = F2(
	function (font, current) {
		return _Utils_ap(
			current,
			function () {
				switch (font.$) {
					case 'Serif':
						return 'serif';
					case 'SansSerif':
						return 'sans-serif';
					case 'Monospace':
						return 'monospace';
					case 'Typeface':
						var name = font.a;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					case 'ImportFont':
						var name = font.a;
						var url = font.b;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
					default:
						var name = font.a.name;
						return A2(
							$elm$core$String$join,
							'-',
							$elm$core$String$words(
								$elm$core$String$toLower(name)));
				}
			}());
	});
var $mdgriffith$elm_ui$Internal$Model$rootStyle = function () {
	var families = _List_fromArray(
		[
			$mdgriffith$elm_ui$Internal$Model$Typeface('Open Sans'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Helvetica'),
			$mdgriffith$elm_ui$Internal$Model$Typeface('Verdana'),
			$mdgriffith$elm_ui$Internal$Model$SansSerif
		]);
	return _List_fromArray(
		[
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$bgColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0)),
				'background-color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 1, 1, 1, 0))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontColor,
			A3(
				$mdgriffith$elm_ui$Internal$Model$Colored,
				'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(
					A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1)),
				'color',
				A4($mdgriffith$elm_ui$Internal$Model$Rgba, 0, 0, 0, 1))),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontSize,
			$mdgriffith$elm_ui$Internal$Model$FontSize(20)),
			A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$fontFamily,
			A2(
				$mdgriffith$elm_ui$Internal$Model$FontFamily,
				A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'font-', families),
				families))
		]);
}();
var $mdgriffith$elm_ui$Element$layoutWith = F3(
	function (_v0, attrs, child) {
		var options = _v0.options;
		return A3(
			$mdgriffith$elm_ui$Internal$Model$renderRoot,
			options,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass(
					A2(
						$elm$core$String$join,
						' ',
						_List_fromArray(
							[$mdgriffith$elm_ui$Internal$Style$classes.root, $mdgriffith$elm_ui$Internal$Style$classes.any, $mdgriffith$elm_ui$Internal$Style$classes.single]))),
				_Utils_ap($mdgriffith$elm_ui$Internal$Model$rootStyle, attrs)),
			child);
	});
var $mdgriffith$elm_ui$Element$layout = $mdgriffith$elm_ui$Element$layoutWith(
	{options: _List_Nil});
var $mdgriffith$elm_ui$Internal$Model$Empty = {$: 'Empty'};
var $mdgriffith$elm_ui$Element$none = $mdgriffith$elm_ui$Internal$Model$Empty;
var $mdgriffith$elm_ui$Internal$Model$AsColumn = {$: 'AsColumn'};
var $mdgriffith$elm_ui$Internal$Model$asColumn = $mdgriffith$elm_ui$Internal$Model$AsColumn;
var $mdgriffith$elm_ui$Internal$Model$Content = {$: 'Content'};
var $mdgriffith$elm_ui$Element$shrink = $mdgriffith$elm_ui$Internal$Model$Content;
var $mdgriffith$elm_ui$Internal$Model$Width = function (a) {
	return {$: 'Width', a: a};
};
var $mdgriffith$elm_ui$Element$width = $mdgriffith$elm_ui$Internal$Model$Width;
var $mdgriffith$elm_ui$Element$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $elm$core$String$lines = _String_lines;
var $mdgriffith$elm_ui$Internal$Model$Describe = function (a) {
	return {$: 'Describe', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Paragraph = {$: 'Paragraph'};
var $mdgriffith$elm_ui$Internal$Model$SpacingStyle = F3(
	function (a, b, c) {
		return {$: 'SpacingStyle', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Internal$Flag$spacing = $mdgriffith$elm_ui$Internal$Flag$flag(3);
var $mdgriffith$elm_ui$Internal$Model$spacingName = F2(
	function (x, y) {
		return 'spacing-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y)));
	});
var $mdgriffith$elm_ui$Element$spacing = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$spacing,
		A3(
			$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
			A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, x),
			x,
			x));
};
var $mdgriffith$elm_ui$Element$paragraph = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asParagraph,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Paragraph),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$spacing(5),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Internal$Model$Class = F2(
	function (a, b) {
		return {$: 'Class', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$overflow = $mdgriffith$elm_ui$Internal$Flag$flag(20);
var $mdgriffith$elm_ui$Element$scrollbarY = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.scrollbarsY);
var $mdgriffith$elm_ui$Internal$Model$Text = function (a) {
	return {$: 'Text', a: a};
};
var $mdgriffith$elm_ui$Element$text = function (content) {
	return $mdgriffith$elm_ui$Internal$Model$Text(content);
};
var $author$project$Styling$scrollableText = function (s) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$scrollbarY
			]),
		A2(
			$elm$core$List$map,
			function (l) {
				return A2(
					$mdgriffith$elm_ui$Element$paragraph,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							A3($elm$core$String$replace, '  ', ' \u00A0', l))
						]));
			},
			$elm$core$String$lines(s)));
};
var $mdgriffith$elm_ui$Internal$Flag$fontAlignment = $mdgriffith$elm_ui$Internal$Flag$flag(12);
var $mdgriffith$elm_ui$Element$Font$alignRight = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.textRight);
var $mdgriffith$elm_ui$Internal$Model$Behind = {$: 'Behind'};
var $mdgriffith$elm_ui$Element$behindContent = function (element) {
	return A2($mdgriffith$elm_ui$Element$createNearby, $mdgriffith$elm_ui$Internal$Model$Behind, element);
};
var $mdgriffith$elm_ui$Element$rgb255 = F3(
	function (red, green, blue) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, 1);
	});
var $author$project$Styling$black = A3($mdgriffith$elm_ui$Element$rgb255, 0, 0, 0);
var $mdgriffith$elm_ui$Internal$Model$AlignY = function (a) {
	return {$: 'AlignY', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$CenterY = {$: 'CenterY'};
var $mdgriffith$elm_ui$Element$centerY = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$CenterY);
var $feathericons$elm_feather$FeatherIcons$Icon = function (a) {
	return {$: 'Icon', a: a};
};
var $feathericons$elm_feather$FeatherIcons$defaultAttributes = function (name) {
	return {
		_class: $elm$core$Maybe$Just('feather feather-' + name),
		size: 24,
		sizeUnit: '',
		strokeWidth: 2,
		viewBox: '0 0 24 24'
	};
};
var $feathericons$elm_feather$FeatherIcons$makeBuilder = F2(
	function (name, src) {
		return $feathericons$elm_feather$FeatherIcons$Icon(
			{
				attrs: $feathericons$elm_feather$FeatherIcons$defaultAttributes(name),
				src: src
			});
	});
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $feathericons$elm_feather$FeatherIcons$check = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'check',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('20 6 9 17 4 12')
				]),
			_List_Nil)
		]));
var $mdgriffith$elm_ui$Element$Background$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$bgColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bg-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'background-color',
			clr));
};
var $mdgriffith$elm_ui$Internal$Flag$borderColor = $mdgriffith$elm_ui$Internal$Flag$flag(28);
var $mdgriffith$elm_ui$Element$Border$color = function (clr) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'bc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(clr),
			'border-color',
			clr));
};
var $mdgriffith$elm_ui$Element$Font$color = function (fontColor) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontColor,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Colored,
			'fc-' + $mdgriffith$elm_ui$Internal$Model$formatColorClass(fontColor),
			'color',
			fontColor));
};
var $mdgriffith$elm_ui$Element$Input$Thumb = function (a) {
	return {$: 'Thumb', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Px = function (a) {
	return {$: 'Px', a: a};
};
var $mdgriffith$elm_ui$Element$px = $mdgriffith$elm_ui$Internal$Model$Px;
var $mdgriffith$elm_ui$Element$rgb = F3(
	function (r, g, b) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, r, g, b, 1);
	});
var $mdgriffith$elm_ui$Internal$Flag$borderRound = $mdgriffith$elm_ui$Internal$Flag$flag(17);
var $mdgriffith$elm_ui$Element$Border$rounded = function (radius) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderRound,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			'br-' + $elm$core$String$fromInt(radius),
			'border-radius',
			$elm$core$String$fromInt(radius) + 'px'));
};
var $mdgriffith$elm_ui$Internal$Model$BorderWidth = F5(
	function (a, b, c, d, e) {
		return {$: 'BorderWidth', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Element$Border$width = function (v) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + $elm$core$String$fromInt(v),
			v,
			v,
			v,
			v));
};
var $mdgriffith$elm_ui$Element$Input$defaultThumb = $mdgriffith$elm_ui$Element$Input$Thumb(
	_List_fromArray(
		[
			$mdgriffith$elm_ui$Element$width(
			$mdgriffith$elm_ui$Element$px(16)),
			$mdgriffith$elm_ui$Element$height(
			$mdgriffith$elm_ui$Element$px(16)),
			$mdgriffith$elm_ui$Element$Border$rounded(8),
			$mdgriffith$elm_ui$Element$Border$width(1),
			$mdgriffith$elm_ui$Element$Border$color(
			A3($mdgriffith$elm_ui$Element$rgb, 0.5, 0.5, 0.5)),
			$mdgriffith$elm_ui$Element$Background$color(
			A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1))
		]));
var $mdgriffith$elm_ui$Element$el = F2(
	function (attrs, child) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[child])));
	});
var $mdgriffith$elm_ui$Element$Font$family = function (families) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontFamily,
		A2(
			$mdgriffith$elm_ui$Internal$Model$FontFamily,
			A3($elm$core$List$foldl, $mdgriffith$elm_ui$Internal$Model$renderFontClassName, 'ff-', families),
			families));
};
var $author$project$Styling$germanZeroGreen = A3($mdgriffith$elm_ui$Element$rgb255, 148, 211, 86);
var $author$project$Styling$germanZeroYellow = A3($mdgriffith$elm_ui$Element$rgb255, 254, 189, 17);
var $mdgriffith$elm_ui$Internal$Model$Focus = {$: 'Focus'};
var $mdgriffith$elm_ui$Internal$Model$PseudoSelector = F2(
	function (a, b) {
		return {$: 'PseudoSelector', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$focus = $mdgriffith$elm_ui$Internal$Flag$flag(31);
var $mdgriffith$elm_ui$Internal$Model$AlignX = function (a) {
	return {$: 'AlignX', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$TransformComponent = F2(
	function (a, b) {
		return {$: 'TransformComponent', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $mdgriffith$elm_ui$Internal$Model$map = F2(
	function (fn, el) {
		switch (el.$) {
			case 'Styled':
				var styled = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Styled(
					{
						html: F2(
							function (add, context) {
								return A2(
									$elm$virtual_dom$VirtualDom$map,
									fn,
									A2(styled.html, add, context));
							}),
						styles: styled.styles
					});
			case 'Unstyled':
				var html = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Unstyled(
					A2(
						$elm$core$Basics$composeL,
						$elm$virtual_dom$VirtualDom$map(fn),
						html));
			case 'Text':
				var str = el.a;
				return $mdgriffith$elm_ui$Internal$Model$Text(str);
			default:
				return $mdgriffith$elm_ui$Internal$Model$Empty;
		}
	});
var $elm$virtual_dom$VirtualDom$mapAttribute = _VirtualDom_mapAttribute;
var $mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$removeNever = function (style) {
	return A2($mdgriffith$elm_ui$Internal$Model$mapAttrFromStyle, $elm$core$Basics$never, style);
};
var $mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper = F2(
	function (attr, _v0) {
		var styles = _v0.a;
		var trans = _v0.b;
		var _v1 = $mdgriffith$elm_ui$Internal$Model$removeNever(attr);
		switch (_v1.$) {
			case 'StyleClass':
				var style = _v1.b;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, style, styles),
					trans);
			case 'TransformComponent':
				var flag = _v1.a;
				var component = _v1.b;
				return _Utils_Tuple2(
					styles,
					A2($mdgriffith$elm_ui$Internal$Model$composeTransformation, trans, component));
			default:
				return _Utils_Tuple2(styles, trans);
		}
	});
var $mdgriffith$elm_ui$Internal$Model$unwrapDecorations = function (attrs) {
	var _v0 = A3(
		$elm$core$List$foldl,
		$mdgriffith$elm_ui$Internal$Model$unwrapDecsHelper,
		_Utils_Tuple2(_List_Nil, $mdgriffith$elm_ui$Internal$Model$Untransformed),
		attrs);
	var styles = _v0.a;
	var transform = _v0.b;
	return A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Internal$Model$Transform(transform),
		styles);
};
var $mdgriffith$elm_ui$Element$focused = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$focus,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			$mdgriffith$elm_ui$Internal$Model$Focus,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $mdgriffith$elm_ui$Internal$Model$Hover = {$: 'Hover'};
var $mdgriffith$elm_ui$Internal$Flag$hover = $mdgriffith$elm_ui$Internal$Flag$flag(33);
var $mdgriffith$elm_ui$Element$mouseOver = function (decs) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$hover,
		A2(
			$mdgriffith$elm_ui$Internal$Model$PseudoSelector,
			$mdgriffith$elm_ui$Internal$Model$Hover,
			$mdgriffith$elm_ui$Internal$Model$unwrapDecorations(decs)));
};
var $author$project$Styling$iconButtonStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroGreen),
		$mdgriffith$elm_ui$Element$mouseOver(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
			])),
		$mdgriffith$elm_ui$Element$focused(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$germanZeroYellow)
			])),
		$mdgriffith$elm_ui$Element$centerY
	]);
var $mdgriffith$elm_ui$Internal$Model$Button = {$: 'Button'};
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $mdgriffith$elm_ui$Element$Input$enter = 'Enter';
var $mdgriffith$elm_ui$Element$Input$hasFocusStyle = function (attr) {
	if (((attr.$ === 'StyleClass') && (attr.b.$ === 'PseudoSelector')) && (attr.b.a.$ === 'Focus')) {
		var _v1 = attr.b;
		var _v2 = _v1.a;
		return true;
	} else {
		return false;
	}
};
var $mdgriffith$elm_ui$Element$Input$focusDefault = function (attrs) {
	return A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, attrs) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onClick = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onClick);
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $mdgriffith$elm_ui$Element$Input$onKeyLookup = function (lookup) {
	var decode = function (code) {
		var _v0 = lookup(code);
		if (_v0.$ === 'Nothing') {
			return $elm$json$Json$Decode$fail('No key matched');
		} else {
			var msg = _v0.a;
			return $elm$json$Json$Decode$succeed(msg);
		}
	};
	var isKey = A2(
		$elm$json$Json$Decode$andThen,
		decode,
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
	return $mdgriffith$elm_ui$Internal$Model$Attr(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			A2(
				$elm$json$Json$Decode$map,
				function (fired) {
					return _Utils_Tuple2(fired, true);
				},
				isKey)));
};
var $mdgriffith$elm_ui$Internal$Flag$cursor = $mdgriffith$elm_ui$Internal$Flag$flag(21);
var $mdgriffith$elm_ui$Element$pointer = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorPointer);
var $mdgriffith$elm_ui$Element$Input$space = ' ';
var $elm$html$Html$Attributes$tabindex = function (n) {
	return A2(
		_VirtualDom_attribute,
		'tabIndex',
		$elm$core$String$fromInt(n));
};
var $mdgriffith$elm_ui$Element$Input$button = F2(
	function (attrs, _v0) {
		var onPress = _v0.onPress;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.seButton + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.noTextSelection)))))),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$pointer,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Input$focusDefault(attrs),
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$Button),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Internal$Model$Attr(
											$elm$html$Html$Attributes$tabindex(0)),
										function () {
											if (onPress.$ === 'Nothing') {
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$Attr(
														$elm$html$Html$Attributes$disabled(true)),
													attrs);
											} else {
												var msg = onPress.a;
												return A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Element$Events$onClick(msg),
													A2(
														$elm$core$List$cons,
														$mdgriffith$elm_ui$Element$Input$onKeyLookup(
															function (code) {
																return _Utils_eq(code, $mdgriffith$elm_ui$Element$Input$enter) ? $elm$core$Maybe$Just(msg) : (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space) ? $elm$core$Maybe$Just(msg) : $elm$core$Maybe$Nothing);
															}),
														attrs));
											}
										}()))))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $mdgriffith$elm_ui$Internal$Model$unstyled = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Unstyled, $elm$core$Basics$always);
var $mdgriffith$elm_ui$Element$html = $mdgriffith$elm_ui$Internal$Model$unstyled;
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$map = $elm$virtual_dom$VirtualDom$map;
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $feathericons$elm_feather$FeatherIcons$toHtml = F2(
	function (attributes, _v0) {
		var src = _v0.a.src;
		var attrs = _v0.a.attrs;
		var strSize = $elm$core$String$fromFloat(attrs.size);
		var baseAttributes = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$fill('none'),
				$elm$svg$Svg$Attributes$height(
				_Utils_ap(strSize, attrs.sizeUnit)),
				$elm$svg$Svg$Attributes$width(
				_Utils_ap(strSize, attrs.sizeUnit)),
				$elm$svg$Svg$Attributes$stroke('currentColor'),
				$elm$svg$Svg$Attributes$strokeLinecap('round'),
				$elm$svg$Svg$Attributes$strokeLinejoin('round'),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(attrs.strokeWidth)),
				$elm$svg$Svg$Attributes$viewBox(attrs.viewBox)
			]);
		var combinedAttributes = _Utils_ap(
			function () {
				var _v1 = attrs._class;
				if (_v1.$ === 'Just') {
					var c = _v1.a;
					return A2(
						$elm$core$List$cons,
						$elm$svg$Svg$Attributes$class(c),
						baseAttributes);
				} else {
					return baseAttributes;
				}
			}(),
			attributes);
		return A2(
			$elm$svg$Svg$svg,
			combinedAttributes,
			A2(
				$elm$core$List$map,
				$elm$svg$Svg$map($elm$core$Basics$never),
				src));
	});
var $author$project$Styling$icon = function (i) {
	return $mdgriffith$elm_ui$Element$html(
		A2($feathericons$elm_feather$FeatherIcons$toHtml, _List_Nil, i));
};
var $author$project$Styling$iconButtonWithStyle = F3(
	function (style, i, onPress) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$button,
			style,
			{
				label: $author$project$Styling$icon(i),
				onPress: $elm$core$Maybe$Just(onPress)
			});
	});
var $author$project$Styling$iconButton = F2(
	function (i, onPress) {
		return A3($author$project$Styling$iconButtonWithStyle, $author$project$Styling$iconButtonStyle, i, onPress);
	});
var $mdgriffith$elm_ui$Element$Input$Label = F3(
	function (a, b, c) {
		return {$: 'Label', a: a, b: b, c: c};
	});
var $mdgriffith$elm_ui$Element$Input$OnLeft = {$: 'OnLeft'};
var $mdgriffith$elm_ui$Element$Input$labelLeft = $mdgriffith$elm_ui$Element$Input$Label($mdgriffith$elm_ui$Element$Input$OnLeft);
var $mdgriffith$elm_ui$Internal$Model$Min = F2(
	function (a, b) {
		return {$: 'Min', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$minimum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Min, i, l);
	});
var $mdgriffith$elm_ui$Internal$Model$Monospace = {$: 'Monospace'};
var $mdgriffith$elm_ui$Element$Font$monospace = $mdgriffith$elm_ui$Internal$Model$Monospace;
var $mdgriffith$elm_ui$Internal$Model$PaddingStyle = F5(
	function (a, b, c, d, e) {
		return {$: 'PaddingStyle', a: a, b: b, c: c, d: d, e: e};
	});
var $mdgriffith$elm_ui$Internal$Flag$padding = $mdgriffith$elm_ui$Internal$Flag$flag(2);
var $mdgriffith$elm_ui$Element$padding = function (x) {
	var f = x;
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$padding,
		A5(
			$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
			'p-' + $elm$core$String$fromInt(x),
			f,
			f,
			f,
			f));
};
var $mdgriffith$elm_ui$Internal$Model$AsRow = {$: 'AsRow'};
var $mdgriffith$elm_ui$Internal$Model$asRow = $mdgriffith$elm_ui$Internal$Model$AsRow;
var $mdgriffith$elm_ui$Element$row = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentLeft + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentCenterY)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $feathericons$elm_feather$FeatherIcons$withSize = F2(
	function (size, _v0) {
		var attrs = _v0.a.attrs;
		var src = _v0.a.src;
		return $feathericons$elm_feather$FeatherIcons$Icon(
			{
				attrs: _Utils_update(
					attrs,
					{size: size}),
				src: src
			});
	});
var $author$project$Styling$size32 = $feathericons$elm_feather$FeatherIcons$withSize(32);
var $author$project$Styling$sizes = {fontSize: 24, large: 12, medium: 8, small: 4, tableFontSize: 14, tableGap: 5};
var $mdgriffith$elm_ui$Internal$Flag$active = $mdgriffith$elm_ui$Internal$Flag$flag(32);
var $mdgriffith$elm_ui$Internal$Model$LivePolite = {$: 'LivePolite'};
var $mdgriffith$elm_ui$Element$Region$announce = $mdgriffith$elm_ui$Internal$Model$Describe($mdgriffith$elm_ui$Internal$Model$LivePolite);
var $mdgriffith$elm_ui$Element$Input$applyLabel = F3(
	function (attrs, label, input) {
		if (label.$ === 'HiddenLabel') {
			var labelText = label.a;
			return A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asColumn,
				$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
				attrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[input])));
		} else {
			var position = label.a;
			var labelAttrs = label.b;
			var labelChild = label.c;
			var labelElement = A4(
				$mdgriffith$elm_ui$Internal$Model$element,
				$mdgriffith$elm_ui$Internal$Model$asEl,
				$mdgriffith$elm_ui$Internal$Model$div,
				labelAttrs,
				$mdgriffith$elm_ui$Internal$Model$Unkeyed(
					_List_fromArray(
						[labelChild])));
			switch (position.$) {
				case 'Above':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
				case 'Below':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asColumn,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				case 'OnRight':
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[input, labelElement])));
				default:
					return A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asRow,
						$mdgriffith$elm_ui$Internal$Model$NodeName('label'),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputLabel),
							attrs),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(
							_List_fromArray(
								[labelElement, input])));
			}
		}
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $mdgriffith$elm_ui$Internal$Model$getHeight = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, acc) {
				if (acc.$ === 'Just') {
					var x = acc.a;
					return $elm$core$Maybe$Just(x);
				} else {
					if (attr.$ === 'Height') {
						var len = attr.a;
						return $elm$core$Maybe$Just(len);
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			}),
		$elm$core$Maybe$Nothing,
		attrs);
};
var $mdgriffith$elm_ui$Internal$Model$getSpacing = F2(
	function (attrs, _default) {
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A3(
				$elm$core$List$foldr,
				F2(
					function (attr, acc) {
						if (acc.$ === 'Just') {
							var x = acc.a;
							return $elm$core$Maybe$Just(x);
						} else {
							if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
								var _v2 = attr.b;
								var x = _v2.b;
								var y = _v2.c;
								return $elm$core$Maybe$Just(
									_Utils_Tuple2(x, y));
							} else {
								return $elm$core$Maybe$Nothing;
							}
						}
					}),
				$elm$core$Maybe$Nothing,
				attrs));
	});
var $mdgriffith$elm_ui$Internal$Model$getWidth = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (attr, acc) {
				if (acc.$ === 'Just') {
					var x = acc.a;
					return $elm$core$Maybe$Just(x);
				} else {
					if (attr.$ === 'Width') {
						var len = attr.a;
						return $elm$core$Maybe$Just(len);
					} else {
						return $elm$core$Maybe$Nothing;
					}
				}
			}),
		$elm$core$Maybe$Nothing,
		attrs);
};
var $mdgriffith$elm_ui$Internal$Model$Label = function (a) {
	return {$: 'Label', a: a};
};
var $mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute = function (label) {
	if (label.$ === 'HiddenLabel') {
		var textLabel = label.a;
		return $mdgriffith$elm_ui$Internal$Model$Describe(
			$mdgriffith$elm_ui$Internal$Model$Label(textLabel));
	} else {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	}
};
var $mdgriffith$elm_ui$Element$Input$isHiddenLabel = function (label) {
	if (label.$ === 'HiddenLabel') {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $mdgriffith$elm_ui$Element$spacingXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$spacing,
			A3(
				$mdgriffith$elm_ui$Internal$Model$SpacingStyle,
				A2($mdgriffith$elm_ui$Internal$Model$spacingName, x, y),
				x,
				y));
	});
var $elm$html$Html$Attributes$step = function (n) {
	return A2($elm$html$Html$Attributes$stringProperty, 'step', n);
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $mdgriffith$elm_ui$Element$fillPortion = $mdgriffith$elm_ui$Internal$Model$Fill;
var $mdgriffith$elm_ui$Internal$Model$mapAttr = F2(
	function (fn, attr) {
		switch (attr.$) {
			case 'NoAttribute':
				return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
			case 'Describe':
				var description = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Describe(description);
			case 'AlignX':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignX(x);
			case 'AlignY':
				var y = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$AlignY(y);
			case 'Width':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Width(x);
			case 'Height':
				var x = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Height(x);
			case 'Class':
				var x = attr.a;
				var y = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$Class, x, y);
			case 'StyleClass':
				var flag = attr.a;
				var style = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$StyleClass, flag, style);
			case 'Nearby':
				var location = attr.a;
				var elem = attr.b;
				return A2(
					$mdgriffith$elm_ui$Internal$Model$Nearby,
					location,
					A2($mdgriffith$elm_ui$Internal$Model$map, fn, elem));
			case 'Attr':
				var htmlAttr = attr.a;
				return $mdgriffith$elm_ui$Internal$Model$Attr(
					A2($elm$virtual_dom$VirtualDom$mapAttribute, fn, htmlAttr));
			default:
				var fl = attr.a;
				var trans = attr.b;
				return A2($mdgriffith$elm_ui$Internal$Model$TransformComponent, fl, trans);
		}
	});
var $mdgriffith$elm_ui$Element$Input$viewHorizontalThumb = F3(
	function (factor, thumbAttributes, trackHeight) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height(
					A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackHeight)),
					$mdgriffith$elm_ui$Element$centerY
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(factor * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$centerY,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_ui$Internal$Model$mapAttr($elm$core$Basics$never),
							thumbAttributes)),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(
									$elm$core$Basics$abs(1 - factor) * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none)
				]));
	});
var $mdgriffith$elm_ui$Internal$Model$CenterX = {$: 'CenterX'};
var $mdgriffith$elm_ui$Element$centerX = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$CenterX);
var $mdgriffith$elm_ui$Element$Input$viewVerticalThumb = F3(
	function (factor, thumbAttributes, trackWidth) {
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$width(
					A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
					$mdgriffith$elm_ui$Element$centerX
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(
									$elm$core$Basics$abs(1 - factor) * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$centerX,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_ui$Internal$Model$mapAttr($elm$core$Basics$never),
							thumbAttributes)),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$fillPortion(
								$elm$core$Basics$round(factor * 10000)))
						]),
					$mdgriffith$elm_ui$Element$none)
				]));
	});
var $mdgriffith$elm_ui$Element$Input$slider = F2(
	function (attributes, input) {
		var trackWidth = $mdgriffith$elm_ui$Internal$Model$getWidth(attributes);
		var trackHeight = $mdgriffith$elm_ui$Internal$Model$getHeight(attributes);
		var vertical = function () {
			var _v8 = _Utils_Tuple2(trackWidth, trackHeight);
			_v8$3:
			while (true) {
				if (_v8.a.$ === 'Nothing') {
					if (_v8.b.$ === 'Nothing') {
						var _v9 = _v8.a;
						var _v10 = _v8.b;
						return false;
					} else {
						break _v8$3;
					}
				} else {
					if ((_v8.a.a.$ === 'Px') && (_v8.b.$ === 'Just')) {
						switch (_v8.b.a.$) {
							case 'Px':
								var w = _v8.a.a.a;
								var h = _v8.b.a.a;
								return _Utils_cmp(h, w) > 0;
							case 'Fill':
								return true;
							default:
								break _v8$3;
						}
					} else {
						break _v8$3;
					}
				}
			}
			return false;
		}();
		var factor = (input.value - input.min) / (input.max - input.min);
		var _v0 = input.thumb;
		var thumbAttributes = _v0.a;
		var height = $mdgriffith$elm_ui$Internal$Model$getHeight(thumbAttributes);
		var thumbHeightString = function () {
			if (height.$ === 'Nothing') {
				return '20px';
			} else {
				if (height.a.$ === 'Px') {
					var px = height.a.a;
					return $elm$core$String$fromInt(px) + 'px';
				} else {
					return '100%';
				}
			}
		}();
		var width = $mdgriffith$elm_ui$Internal$Model$getWidth(thumbAttributes);
		var thumbWidthString = function () {
			if (width.$ === 'Nothing') {
				return '20px';
			} else {
				if (width.a.$ === 'Px') {
					var px = width.a.a;
					return $elm$core$String$fromInt(px) + 'px';
				} else {
					return '100%';
				}
			}
		}();
		var className = 'thmb-' + (thumbWidthString + ('-' + thumbHeightString));
		var thumbShadowStyle = _List_fromArray(
			[
				A2($mdgriffith$elm_ui$Internal$Model$Property, 'width', thumbWidthString),
				A2($mdgriffith$elm_ui$Internal$Model$Property, 'height', thumbHeightString)
			]);
		var _v1 = A2(
			$mdgriffith$elm_ui$Internal$Model$getSpacing,
			attributes,
			_Utils_Tuple2(5, 5));
		var spacingX = _v1.a;
		var spacingY = _v1.b;
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(input.label) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : A2($mdgriffith$elm_ui$Element$spacingXY, spacingX, spacingY),
					$mdgriffith$elm_ui$Element$Region$announce,
					$mdgriffith$elm_ui$Element$width(
					function () {
						if (trackWidth.$ === 'Nothing') {
							return $mdgriffith$elm_ui$Element$fill;
						} else {
							if (trackWidth.a.$ === 'Px') {
								return $mdgriffith$elm_ui$Element$shrink;
							} else {
								var x = trackWidth.a;
								return x;
							}
						}
					}()),
					$mdgriffith$elm_ui$Element$height(
					function () {
						if (trackHeight.$ === 'Nothing') {
							return $mdgriffith$elm_ui$Element$shrink;
						} else {
							if (trackHeight.a.$ === 'Px') {
								return $mdgriffith$elm_ui$Element$shrink;
							} else {
								var x = trackHeight.a;
								return x;
							}
						}
					}())
				]),
			input.label,
			A2(
				$mdgriffith$elm_ui$Element$row,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width(
						A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
						$mdgriffith$elm_ui$Element$height(
						A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Element$px(20),
							trackHeight))
					]),
				_List_fromArray(
					[
						A4(
						$mdgriffith$elm_ui$Internal$Model$element,
						$mdgriffith$elm_ui$Internal$Model$asEl,
						$mdgriffith$elm_ui$Internal$Model$NodeName('input'),
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.label),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$active,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-moz-range-thumb'), thumbShadowStyle)),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$hover,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-webkit-slider-thumb'), thumbShadowStyle)),
								A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$focus,
								A2($mdgriffith$elm_ui$Internal$Model$Style, 'input[type=\"range\"].' + (className + '::-ms-thumb'), thumbShadowStyle)),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$class(className + ' ui-slide-bar focusable-parent')),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Events$onInput(
									function (str) {
										var _v4 = $elm$core$String$toFloat(str);
										if (_v4.$ === 'Nothing') {
											return input.onChange(0);
										} else {
											var val = _v4.a;
											return input.onChange(val);
										}
									})),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_('range')),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$step(
									function () {
										var _v5 = input.step;
										if (_v5.$ === 'Nothing') {
											return 'any';
										} else {
											var step = _v5.a;
											return $elm$core$String$fromFloat(step);
										}
									}())),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$min(
									$elm$core$String$fromFloat(input.min))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$max(
									$elm$core$String$fromFloat(input.max))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$value(
									$elm$core$String$fromFloat(input.value))),
								vertical ? $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'orient', 'vertical')) : $mdgriffith$elm_ui$Internal$Model$NoAttribute,
								$mdgriffith$elm_ui$Element$width(
								vertical ? A2(
									$elm$core$Maybe$withDefault,
									$mdgriffith$elm_ui$Element$px(20),
									trackHeight) : A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
								$mdgriffith$elm_ui$Element$height(
								vertical ? A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth) : A2(
									$elm$core$Maybe$withDefault,
									$mdgriffith$elm_ui$Element$px(20),
									trackHeight))
							]),
						$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil)),
						A2(
						$mdgriffith$elm_ui$Element$el,
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$width(
								A2($elm$core$Maybe$withDefault, $mdgriffith$elm_ui$Element$fill, trackWidth)),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$height(
									A2(
										$elm$core$Maybe$withDefault,
										$mdgriffith$elm_ui$Element$px(20),
										trackHeight)),
								_Utils_ap(
									attributes,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$behindContent(
											vertical ? A3(
												$mdgriffith$elm_ui$Element$Input$viewVerticalThumb,
												factor,
												A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$htmlClass('focusable-thumb'),
													thumbAttributes),
												trackWidth) : A3(
												$mdgriffith$elm_ui$Element$Input$viewHorizontalThumb,
												factor,
												A2(
													$elm$core$List$cons,
													$mdgriffith$elm_ui$Internal$Model$htmlClass('focusable-thumb'),
													thumbAttributes),
												trackHeight))
										])))),
						$mdgriffith$elm_ui$Element$none)
					])));
	});
var $mdgriffith$elm_ui$Internal$Flag$borderStyle = $mdgriffith$elm_ui$Internal$Flag$flag(11);
var $mdgriffith$elm_ui$Element$Border$solid = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$borderStyle, $mdgriffith$elm_ui$Internal$Style$classes.borderSolid);
var $mdgriffith$elm_ui$Element$Input$TextInputNode = function (a) {
	return {$: 'TextInputNode', a: a};
};
var $mdgriffith$elm_ui$Element$Input$TextArea = {$: 'TextArea'};
var $mdgriffith$elm_ui$Element$Input$autofill = A2(
	$elm$core$Basics$composeL,
	$mdgriffith$elm_ui$Internal$Model$Attr,
	$elm$html$Html$Attributes$attribute('autocomplete'));
var $mdgriffith$elm_ui$Internal$Model$MoveY = function (a) {
	return {$: 'MoveY', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveY = $mdgriffith$elm_ui$Internal$Flag$flag(26);
var $mdgriffith$elm_ui$Element$moveUp = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(-y));
};
var $mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding = function (attrs) {
	var gatherSpacing = F2(
		function (attr, found) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
				var _v2 = attr.b;
				var x = _v2.b;
				var y = _v2.c;
				if (found.$ === 'Nothing') {
					return $elm$core$Maybe$Just(y);
				} else {
					return found;
				}
			} else {
				return found;
			}
		});
	var _v0 = A3($elm$core$List$foldr, gatherSpacing, $elm$core$Maybe$Nothing, attrs);
	if (_v0.$ === 'Nothing') {
		return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
	} else {
		var vSpace = _v0.a;
		return $mdgriffith$elm_ui$Element$moveUp(
			$elm$core$Basics$floor(vSpace / 2));
	}
};
var $mdgriffith$elm_ui$Element$clip = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$overflow, $mdgriffith$elm_ui$Internal$Style$classes.clip);
var $mdgriffith$elm_ui$Element$Input$darkGrey = A3($mdgriffith$elm_ui$Element$rgb, 186 / 255, 189 / 255, 182 / 255);
var $mdgriffith$elm_ui$Element$paddingXY = F2(
	function (x, y) {
		if (_Utils_eq(x, y)) {
			var f = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + $elm$core$String$fromInt(x),
					f,
					f,
					f,
					f));
		} else {
			var yFloat = y;
			var xFloat = x;
			return A2(
				$mdgriffith$elm_ui$Internal$Model$StyleClass,
				$mdgriffith$elm_ui$Internal$Flag$padding,
				A5(
					$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
					'p-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
					yFloat,
					xFloat,
					yFloat,
					xFloat));
		}
	});
var $mdgriffith$elm_ui$Element$Input$defaultTextPadding = A2($mdgriffith$elm_ui$Element$paddingXY, 12, 12);
var $mdgriffith$elm_ui$Element$Input$white = A3($mdgriffith$elm_ui$Element$rgb, 1, 1, 1);
var $mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Input$defaultTextPadding,
		$mdgriffith$elm_ui$Element$Border$rounded(3),
		$mdgriffith$elm_ui$Element$Border$color($mdgriffith$elm_ui$Element$Input$darkGrey),
		$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
		$mdgriffith$elm_ui$Element$Border$width(1),
		$mdgriffith$elm_ui$Element$spacing(5),
		$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
		$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink)
	]);
var $mdgriffith$elm_ui$Element$Input$getHeight = function (attr) {
	if (attr.$ === 'Height') {
		var h = attr.a;
		return $elm$core$Maybe$Just(h);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Element$Input$isConstrained = function (len) {
	isConstrained:
	while (true) {
		switch (len.$) {
			case 'Content':
				return false;
			case 'Px':
				return true;
			case 'Fill':
				return true;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isConstrained;
			default:
				var l = len.b;
				return true;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isStacked = function (label) {
	if (label.$ === 'Label') {
		var loc = label.a;
		switch (loc.$) {
			case 'OnRight':
				return false;
			case 'OnLeft':
				return false;
			case 'Above':
				return true;
			default:
				return true;
		}
	} else {
		return true;
	}
};
var $mdgriffith$elm_ui$Element$Input$negateBox = function (box) {
	return {bottom: -box.bottom, left: -box.left, right: -box.right, top: -box.top};
};
var $mdgriffith$elm_ui$Internal$Model$paddingName = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left)))))));
	});
var $mdgriffith$elm_ui$Element$paddingEach = function (_v0) {
	var top = _v0.top;
	var right = _v0.right;
	var bottom = _v0.bottom;
	var left = _v0.left;
	if (_Utils_eq(top, right) && (_Utils_eq(top, bottom) && _Utils_eq(top, left))) {
		var topFloat = top;
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				'p-' + $elm$core$String$fromInt(top),
				topFloat,
				topFloat,
				topFloat,
				topFloat));
	} else {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$padding,
			A5(
				$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
				A4($mdgriffith$elm_ui$Internal$Model$paddingName, top, right, bottom, left),
				top,
				right,
				bottom,
				left));
	}
};
var $mdgriffith$elm_ui$Element$htmlAttribute = $mdgriffith$elm_ui$Internal$Model$Attr;
var $mdgriffith$elm_ui$Element$Input$isFill = function (len) {
	isFill:
	while (true) {
		switch (len.$) {
			case 'Fill':
				return true;
			case 'Content':
				return false;
			case 'Px':
				return false;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isFill;
		}
	}
};
var $mdgriffith$elm_ui$Element$Input$isPixel = function (len) {
	isPixel:
	while (true) {
		switch (len.$) {
			case 'Content':
				return false;
			case 'Px':
				return true;
			case 'Fill':
				return false;
			case 'Min':
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
			default:
				var l = len.b;
				var $temp$len = l;
				len = $temp$len;
				continue isPixel;
		}
	}
};
var $mdgriffith$elm_ui$Internal$Model$paddingNameFloat = F4(
	function (top, right, bottom, left) {
		return 'pad-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(top) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(right) + ('-' + ($mdgriffith$elm_ui$Internal$Model$floatClass(bottom) + ('-' + $mdgriffith$elm_ui$Internal$Model$floatClass(left)))))));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $mdgriffith$elm_ui$Element$Input$redistributeOver = F4(
	function (isMultiline, stacked, attr, els) {
		switch (attr.$) {
			case 'Nearby':
				return _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					});
			case 'Width':
				var width = attr.a;
				return $mdgriffith$elm_ui$Element$Input$isFill(width) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						input: A2($elm$core$List$cons, attr, els.input),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : (stacked ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					}) : _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					}));
			case 'Height':
				var height = attr.a;
				return (!stacked) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : ($mdgriffith$elm_ui$Element$Input$isFill(height) ? _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent),
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : ($mdgriffith$elm_ui$Element$Input$isPixel(height) ? _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					}) : _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					})));
			case 'AlignX':
				return _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					});
			case 'AlignY':
				return _Utils_update(
					els,
					{
						fullParent: A2($elm$core$List$cons, attr, els.fullParent)
					});
			case 'StyleClass':
				switch (attr.b.$) {
					case 'SpacingStyle':
						var _v1 = attr.b;
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent),
								input: A2($elm$core$List$cons, attr, els.input),
								parent: A2($elm$core$List$cons, attr, els.parent),
								wrapper: A2($elm$core$List$cons, attr, els.wrapper)
							});
					case 'PaddingStyle':
						var cls = attr.a;
						var _v2 = attr.b;
						var pad = _v2.a;
						var t = _v2.b;
						var r = _v2.c;
						var b = _v2.d;
						var l = _v2.e;
						if (isMultiline) {
							return _Utils_update(
								els,
								{
									cover: A2($elm$core$List$cons, attr, els.cover),
									parent: A2($elm$core$List$cons, attr, els.parent)
								});
						} else {
							var newTop = t - A2($elm$core$Basics$min, t, b);
							var newLineHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'line-height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newHeight = $mdgriffith$elm_ui$Element$htmlAttribute(
								A2(
									$elm$html$Html$Attributes$style,
									'height',
									'calc(1.0em + ' + ($elm$core$String$fromFloat(
										2 * A2($elm$core$Basics$min, t, b)) + 'px)')));
							var newBottom = b - A2($elm$core$Basics$min, t, b);
							var reducedVerticalPadding = A2(
								$mdgriffith$elm_ui$Internal$Model$StyleClass,
								$mdgriffith$elm_ui$Internal$Flag$padding,
								A5(
									$mdgriffith$elm_ui$Internal$Model$PaddingStyle,
									A4($mdgriffith$elm_ui$Internal$Model$paddingNameFloat, newTop, r, newBottom, l),
									newTop,
									r,
									newBottom,
									l));
							return _Utils_update(
								els,
								{
									cover: A2($elm$core$List$cons, attr, els.cover),
									input: A2(
										$elm$core$List$cons,
										newHeight,
										A2($elm$core$List$cons, newLineHeight, els.input)),
									parent: A2($elm$core$List$cons, reducedVerticalPadding, els.parent)
								});
						}
					case 'BorderWidth':
						var _v3 = attr.b;
						return _Utils_update(
							els,
							{
								cover: A2($elm$core$List$cons, attr, els.cover),
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
					case 'Transform':
						return _Utils_update(
							els,
							{
								cover: A2($elm$core$List$cons, attr, els.cover),
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
					case 'FontSize':
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent)
							});
					case 'FontFamily':
						var _v4 = attr.b;
						return _Utils_update(
							els,
							{
								fullParent: A2($elm$core$List$cons, attr, els.fullParent)
							});
					default:
						var flag = attr.a;
						var cls = attr.b;
						return _Utils_update(
							els,
							{
								parent: A2($elm$core$List$cons, attr, els.parent)
							});
				}
			case 'NoAttribute':
				return els;
			case 'Attr':
				var a = attr.a;
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
			case 'Describe':
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
			case 'Class':
				return _Utils_update(
					els,
					{
						parent: A2($elm$core$List$cons, attr, els.parent)
					});
			default:
				return _Utils_update(
					els,
					{
						input: A2($elm$core$List$cons, attr, els.input)
					});
		}
	});
var $mdgriffith$elm_ui$Element$Input$redistribute = F3(
	function (isMultiline, stacked, attrs) {
		return function (redist) {
			return {
				cover: $elm$core$List$reverse(redist.cover),
				fullParent: $elm$core$List$reverse(redist.fullParent),
				input: $elm$core$List$reverse(redist.input),
				parent: $elm$core$List$reverse(redist.parent),
				wrapper: $elm$core$List$reverse(redist.wrapper)
			};
		}(
			A3(
				$elm$core$List$foldl,
				A2($mdgriffith$elm_ui$Element$Input$redistributeOver, isMultiline, stacked),
				{cover: _List_Nil, fullParent: _List_Nil, input: _List_Nil, parent: _List_Nil, wrapper: _List_Nil},
				attrs));
	});
var $mdgriffith$elm_ui$Element$Input$renderBox = function (_v0) {
	var top = _v0.top;
	var right = _v0.right;
	var bottom = _v0.bottom;
	var left = _v0.left;
	return $elm$core$String$fromInt(top) + ('px ' + ($elm$core$String$fromInt(right) + ('px ' + ($elm$core$String$fromInt(bottom) + ('px ' + ($elm$core$String$fromInt(left) + 'px'))))));
};
var $mdgriffith$elm_ui$Internal$Model$Transparency = F2(
	function (a, b) {
		return {$: 'Transparency', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Flag$transparency = $mdgriffith$elm_ui$Internal$Flag$flag(0);
var $mdgriffith$elm_ui$Element$alpha = function (o) {
	var transparency = function (x) {
		return 1 - x;
	}(
		A2(
			$elm$core$Basics$min,
			1.0,
			A2($elm$core$Basics$max, 0.0, o)));
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$transparency,
		A2(
			$mdgriffith$elm_ui$Internal$Model$Transparency,
			'transparency-' + $mdgriffith$elm_ui$Internal$Model$floatClass(transparency),
			transparency));
};
var $mdgriffith$elm_ui$Element$Input$charcoal = A3($mdgriffith$elm_ui$Element$rgb, 136 / 255, 138 / 255, 133 / 255);
var $mdgriffith$elm_ui$Element$rgba = $mdgriffith$elm_ui$Internal$Model$Rgba;
var $mdgriffith$elm_ui$Element$Input$renderPlaceholder = F3(
	function (_v0, forPlaceholder, on) {
		var placeholderAttrs = _v0.a;
		var placeholderEl = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				forPlaceholder,
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$color($mdgriffith$elm_ui$Element$Input$charcoal),
							$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.noTextSelection + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.passPointerEvents)),
							$mdgriffith$elm_ui$Element$clip,
							$mdgriffith$elm_ui$Element$Border$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$Background$color(
							A4($mdgriffith$elm_ui$Element$rgba, 0, 0, 0, 0)),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$alpha(
							on ? 1 : 0)
						]),
					placeholderAttrs)),
			placeholderEl);
	});
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$spellcheck = $elm$html$Html$Attributes$boolProperty('spellcheck');
var $mdgriffith$elm_ui$Element$Input$spellcheck = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$spellcheck);
var $mdgriffith$elm_ui$Element$Input$value = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$value);
var $mdgriffith$elm_ui$Element$Input$textHelper = F3(
	function (textInput, attrs, textOptions) {
		var withDefaults = _Utils_ap($mdgriffith$elm_ui$Element$Input$defaultTextBoxStyle, attrs);
		var redistributed = A3(
			$mdgriffith$elm_ui$Element$Input$redistribute,
			_Utils_eq(textInput.type_, $mdgriffith$elm_ui$Element$Input$TextArea),
			$mdgriffith$elm_ui$Element$Input$isStacked(textOptions.label),
			withDefaults);
		var onlySpacing = function (attr) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'SpacingStyle')) {
				var _v9 = attr.b;
				return true;
			} else {
				return false;
			}
		};
		var heightConstrained = function () {
			var _v7 = textInput.type_;
			if (_v7.$ === 'TextInputNode') {
				var inputType = _v7.a;
				return false;
			} else {
				return A2(
					$elm$core$Maybe$withDefault,
					false,
					A2(
						$elm$core$Maybe$map,
						$mdgriffith$elm_ui$Element$Input$isConstrained,
						$elm$core$List$head(
							$elm$core$List$reverse(
								A2($elm$core$List$filterMap, $mdgriffith$elm_ui$Element$Input$getHeight, withDefaults)))));
			}
		}();
		var getPadding = function (attr) {
			if ((attr.$ === 'StyleClass') && (attr.b.$ === 'PaddingStyle')) {
				var cls = attr.a;
				var _v6 = attr.b;
				var pad = _v6.a;
				var t = _v6.b;
				var r = _v6.c;
				var b = _v6.d;
				var l = _v6.e;
				return $elm$core$Maybe$Just(
					{
						bottom: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(b - 3)),
						left: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(l - 3)),
						right: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(r - 3)),
						top: A2(
							$elm$core$Basics$max,
							0,
							$elm$core$Basics$floor(t - 3))
					});
			} else {
				return $elm$core$Maybe$Nothing;
			}
		};
		var parentPadding = A2(
			$elm$core$Maybe$withDefault,
			{bottom: 0, left: 0, right: 0, top: 0},
			$elm$core$List$head(
				$elm$core$List$reverse(
					A2($elm$core$List$filterMap, getPadding, withDefaults))));
		var inputElement = A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			function () {
				var _v3 = textInput.type_;
				if (_v3.$ === 'TextInputNode') {
					var inputType = _v3.a;
					return $mdgriffith$elm_ui$Internal$Model$NodeName('input');
				} else {
					return $mdgriffith$elm_ui$Internal$Model$NodeName('textarea');
				}
			}(),
			_Utils_ap(
				function () {
					var _v4 = textInput.type_;
					if (_v4.$ === 'TextInputNode') {
						var inputType = _v4.a;
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Internal$Model$Attr(
								$elm$html$Html$Attributes$type_(inputType)),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputText)
							]);
					} else {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$clip,
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultiline),
								$mdgriffith$elm_ui$Element$Input$calcMoveToCompensateForPadding(withDefaults),
								$mdgriffith$elm_ui$Element$paddingEach(parentPadding),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2(
									$elm$html$Html$Attributes$style,
									'margin',
									$mdgriffith$elm_ui$Element$Input$renderBox(
										$mdgriffith$elm_ui$Element$Input$negateBox(parentPadding)))),
								$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$style, 'box-sizing', 'content-box'))
							]);
					}
				}(),
				_Utils_ap(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Input$value(textOptions.text),
							$mdgriffith$elm_ui$Internal$Model$Attr(
							$elm$html$Html$Events$onInput(textOptions.onChange)),
							$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(textOptions.label),
							$mdgriffith$elm_ui$Element$Input$spellcheck(textInput.spellchecked),
							A2(
							$elm$core$Maybe$withDefault,
							$mdgriffith$elm_ui$Internal$Model$NoAttribute,
							A2($elm$core$Maybe$map, $mdgriffith$elm_ui$Element$Input$autofill, textInput.autofill))
						]),
					redistributed.input)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(_List_Nil));
		var wrappedInput = function () {
			var _v0 = textInput.type_;
			if (_v0.$ === 'TextArea') {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_Utils_ap(
						(heightConstrained ? $elm$core$List$cons($mdgriffith$elm_ui$Element$scrollbarY) : $elm$core$Basics$identity)(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin),
									$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineWrapper)
								])),
						redistributed.parent),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[
								A4(
								$mdgriffith$elm_ui$Internal$Model$element,
								$mdgriffith$elm_ui$Internal$Model$asParagraph,
								$mdgriffith$elm_ui$Internal$Model$div,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$inFront(inputElement),
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineParent),
												redistributed.wrapper)))),
								$mdgriffith$elm_ui$Internal$Model$Unkeyed(
									function () {
										if (textOptions.text === '') {
											var _v1 = textOptions.placeholder;
											if (_v1.$ === 'Nothing') {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$text('\u00A0')
													]);
											} else {
												var place = _v1.a;
												return _List_fromArray(
													[
														A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, _List_Nil, textOptions.text === '')
													]);
											}
										} else {
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Internal$Model$unstyled(
													A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class($mdgriffith$elm_ui$Internal$Style$classes.inputMultilineFiller)
															]),
														_List_fromArray(
															[
																$elm$html$Html$text(textOptions.text + '\u00A0')
															])))
												]);
										}
									}()))
							])));
			} else {
				var inputType = _v0.a;
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						A2(
							$elm$core$List$cons,
							A2($elm$core$List$any, $mdgriffith$elm_ui$Element$Input$hasFocusStyle, withDefaults) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.focusedWithin),
							$elm$core$List$concat(
								_List_fromArray(
									[
										redistributed.parent,
										function () {
										var _v2 = textOptions.placeholder;
										if (_v2.$ === 'Nothing') {
											return _List_Nil;
										} else {
											var place = _v2.a;
											return _List_fromArray(
												[
													$mdgriffith$elm_ui$Element$behindContent(
													A3($mdgriffith$elm_ui$Element$Input$renderPlaceholder, place, redistributed.cover, textOptions.text === ''))
												]);
										}
									}()
									])))),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[inputElement])));
			}
		}();
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			A2(
				$elm$core$List$cons,
				A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$cursor, $mdgriffith$elm_ui$Internal$Style$classes.cursorText),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Input$isHiddenLabel(textOptions.label) ? $mdgriffith$elm_ui$Internal$Model$NoAttribute : $mdgriffith$elm_ui$Element$spacing(5),
					A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Region$announce, redistributed.fullParent))),
			textOptions.label,
			wrappedInput);
	});
var $mdgriffith$elm_ui$Element$Input$text = $mdgriffith$elm_ui$Element$Input$textHelper(
	{
		autofill: $elm$core$Maybe$Nothing,
		spellchecked: false,
		type_: $mdgriffith$elm_ui$Element$Input$TextInputNode('text')
	});
var $author$project$Styling$white = A3($mdgriffith$elm_ui$Element$rgb255, 255, 255, 255);
var $author$project$EnterInputsDialog$view = F3(
	function (updateStateMsg, okClickedMsg, state) {
		var labelStyle = _List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$alignRight,
				$mdgriffith$elm_ui$Element$width(
				A2($mdgriffith$elm_ui$Element$minimum, 100, $mdgriffith$elm_ui$Element$shrink))
			]);
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$Input$text,
					_List_Nil,
					{
						label: A2(
							$mdgriffith$elm_ui$Element$Input$labelLeft,
							labelStyle,
							$mdgriffith$elm_ui$Element$text('AGS')),
						onChange: function (newFilter) {
							return updateStateMsg(
								A3($author$project$EnterInputsDialog$init, state.year, newFilter, state.agsIndex));
						},
						placeholder: $elm$core$Maybe$Nothing,
						text: state.agsFilter
					}),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height(
							A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$black),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium)
						]),
					($elm$core$List$length(state.filteredAgs) > 2000) ? $mdgriffith$elm_ui$Element$text('Enter a AGS (e.g. 08416041) or City name (e.g. Tübingen)') : A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
								$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
								$mdgriffith$elm_ui$Element$scrollbarY
							]),
						A2(
							$elm$core$List$map,
							function (a) {
								return A2(
									$mdgriffith$elm_ui$Element$row,
									_Utils_ap(
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
												$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
												$mdgriffith$elm_ui$Element$Events$onClick(
												updateStateMsg(
													A3($author$project$EnterInputsDialog$init, state.year, a.ags, state.agsIndex)))
											]),
										function () {
											var _v0 = state.filteredAgs;
											if (_v0.b && (!_v0.b.b)) {
												return _List_fromArray(
													[
														$mdgriffith$elm_ui$Element$Border$rounded(4),
														$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow),
														$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$white),
														$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small)
													]);
											} else {
												return _List_Nil;
											}
										}()),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$family(
													_List_fromArray(
														[$mdgriffith$elm_ui$Element$Font$monospace]))
												]),
											$mdgriffith$elm_ui$Element$text(a.ags)),
											$mdgriffith$elm_ui$Element$text(a.desc)
										]));
							},
							state.filteredAgs))),
					A2(
					$mdgriffith$elm_ui$Element$Input$slider,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$px(20)),
							$mdgriffith$elm_ui$Element$behindContent(
							A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$height(
										$mdgriffith$elm_ui$Element$px(2)),
										$mdgriffith$elm_ui$Element$centerY,
										$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroGreen),
										$mdgriffith$elm_ui$Element$Border$rounded(2)
									]),
								$mdgriffith$elm_ui$Element$none))
						]),
					{
						label: A2(
							$mdgriffith$elm_ui$Element$Input$labelLeft,
							labelStyle,
							$mdgriffith$elm_ui$Element$text(
								$elm$core$String$fromInt(state.year))),
						max: 2050,
						min: 2025,
						onChange: function (year) {
							return updateStateMsg(
								_Utils_update(
									state,
									{
										year: $elm$core$Basics$round(year)
									}));
						},
						step: $elm$core$Maybe$Just(1.0),
						thumb: $mdgriffith$elm_ui$Element$Input$defaultThumb,
						value: state.year
					}),
					function () {
					var _v1 = state.filteredAgs;
					if (_v1.b && (!_v1.b.b)) {
						var exactlyOne = _v1.a;
						return A2(
							$author$project$Styling$iconButton,
							$author$project$Styling$size32($feathericons$elm_feather$FeatherIcons$check),
							okClickedMsg(
								{ags: exactlyOne.ags, year: state.year}));
					} else {
						return $mdgriffith$elm_ui$Element$text('Enter a valid AGS first!');
					}
				}()
				]));
	});
var $author$project$Main$ModalDismissed = {$: 'ModalDismissed'};
var $mdgriffith$elm_ui$Element$rgba255 = F4(
	function (red, green, blue, a) {
		return A4($mdgriffith$elm_ui$Internal$Model$Rgba, red / 255, green / 255, blue / 255, a);
	});
var $author$project$Styling$modalDim = A4($mdgriffith$elm_ui$Element$rgba255, 128, 128, 128, 0.8);
var $mdgriffith$elm_ui$Element$Font$size = function (i) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$fontSize,
		$mdgriffith$elm_ui$Internal$Model$FontSize(i));
};
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $feathericons$elm_feather$FeatherIcons$x = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'x',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('18'),
					$elm$svg$Svg$Attributes$y1('6'),
					$elm$svg$Svg$Attributes$x2('6'),
					$elm$svg$Svg$Attributes$y2('18')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('6'),
					$elm$svg$Svg$Attributes$y1('6'),
					$elm$svg$Svg$Attributes$x2('18'),
					$elm$svg$Svg$Attributes$y2('18')
				]),
			_List_Nil)
		]));
var $author$project$Main$viewModalDialogBox = F2(
	function (title, content) {
		var filler = A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			$mdgriffith$elm_ui$Element$none);
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$modalDim)
				]),
			_List_fromArray(
				[
					filler,
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							filler,
							A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width(
									A2($mdgriffith$elm_ui$Element$minimum, 600, $mdgriffith$elm_ui$Element$fill)),
									$mdgriffith$elm_ui$Element$height(
									A2($mdgriffith$elm_ui$Element$minimum, 400, $mdgriffith$elm_ui$Element$fill)),
									$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$white),
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow),
											$mdgriffith$elm_ui$Element$Font$size(24),
											$mdgriffith$elm_ui$Element$padding(8)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											$mdgriffith$elm_ui$Element$text(title)),
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$padding(2),
													$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$white),
													$mdgriffith$elm_ui$Element$Border$rounded(5)
												]),
											A2($author$project$Styling$iconButton, $feathericons$elm_feather$FeatherIcons$x, $author$project$Main$ModalDismissed))
										])),
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$white),
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$height(
											A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
											$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium)
										]),
									content)
								])),
							filler
						])),
					filler
				]));
	});
var $author$project$Main$DownloadClicked = {$: 'DownloadClicked'};
var $author$project$Main$ToggleSidebar = {$: 'ToggleSidebar'};
var $author$project$Main$UploadClicked = {$: 'UploadClicked'};
var $author$project$Main$buttons = function (l) {
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				A2($mdgriffith$elm_ui$Element$spacingXY, $author$project$Styling$sizes.medium, 0)
			]),
		l);
};
var $author$project$Styling$red = A3($mdgriffith$elm_ui$Element$rgb255, 197, 40, 61);
var $author$project$Styling$dangerousIconButtonStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$red),
		$mdgriffith$elm_ui$Element$mouseOver(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
			])),
		$mdgriffith$elm_ui$Element$focused(
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$germanZeroYellow)
			])),
		$mdgriffith$elm_ui$Element$centerY
	]);
var $author$project$Styling$dangerousIconButton = F2(
	function (i, op) {
		return A3($author$project$Styling$iconButtonWithStyle, $author$project$Styling$dangerousIconButtonStyle, i, op);
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $feathericons$elm_feather$FeatherIcons$download = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'download',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('7 10 12 15 17 10')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('15'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('3')
				]),
			_List_Nil)
		]));
var $author$project$Styling$fonts = {
	explorer: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size($author$project$Styling$sizes.fontSize)
		]),
	explorerItems: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size(16)
		]),
	explorerNodeSize: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size(16)
		]),
	explorerValues: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size(16),
			$mdgriffith$elm_ui$Element$Font$family(
			_List_fromArray(
				[$mdgriffith$elm_ui$Element$Font$monospace]))
		]),
	smallTextButton: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size(12)
		]),
	table: _List_fromArray(
		[
			$mdgriffith$elm_ui$Element$Font$size($author$project$Styling$sizes.tableFontSize)
		])
};
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$ry = _VirtualDom_attribute('ry');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $feathericons$elm_feather$FeatherIcons$sidebar = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'sidebar',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('3'),
					$elm$svg$Svg$Attributes$y('3'),
					$elm$svg$Svg$Attributes$width('18'),
					$elm$svg$Svg$Attributes$height('18'),
					$elm$svg$Svg$Attributes$rx('2'),
					$elm$svg$Svg$Attributes$ry('2')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('9'),
					$elm$svg$Svg$Attributes$y1('3'),
					$elm$svg$Svg$Attributes$x2('9'),
					$elm$svg$Svg$Attributes$y2('21')
				]),
			_List_Nil)
		]));
var $feathericons$elm_feather$FeatherIcons$upload = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'upload',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('17 8 12 3 7 8')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('3'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('15')
				]),
			_List_Nil)
		]));
var $author$project$Main$CloseTrace = function (a) {
	return {$: 'CloseTrace', a: a};
};
var $feathericons$elm_feather$FeatherIcons$chevronRight = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-right',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('9 18 15 12 9 6')
				]),
			_List_Nil)
		]));
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $author$project$Main$CloseInfo = {$: 'CloseInfo'};
var $coinop_logan$elm_format_number$Parser$FormattedNumber = F5(
	function (original, integers, decimals, prefix, suffix) {
		return {decimals: decimals, integers: integers, original: original, prefix: prefix, suffix: suffix};
	});
var $coinop_logan$elm_format_number$Parser$Negative = {$: 'Negative'};
var $coinop_logan$elm_format_number$Parser$Positive = {$: 'Positive'};
var $coinop_logan$elm_format_number$Parser$Zero = {$: 'Zero'};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $coinop_logan$elm_format_number$Parser$classify = function (formatted) {
	var onlyZeros = A2(
		$elm$core$String$all,
		function (_char) {
			return _Utils_eq(
				_char,
				_Utils_chr('0'));
		},
		$elm$core$String$concat(
			A2(
				$elm$core$List$append,
				formatted.integers,
				$elm$core$List$singleton(formatted.decimals))));
	return onlyZeros ? $coinop_logan$elm_format_number$Parser$Zero : ((formatted.original < 0) ? $coinop_logan$elm_format_number$Parser$Negative : $coinop_logan$elm_format_number$Parser$Positive);
};
var $elm$core$String$filter = _String_filter;
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $coinop_logan$elm_format_number$Parser$splitThousands = function (integers) {
	var reversedSplitThousands = function (value) {
		return ($elm$core$String$length(value) > 3) ? A2(
			$elm$core$List$cons,
			A2($elm$core$String$right, 3, value),
			reversedSplitThousands(
				A2($elm$core$String$dropRight, 3, value))) : _List_fromArray(
			[value]);
	};
	return $elm$core$List$reverse(
		reversedSplitThousands(integers));
};
var $coinop_logan$elm_format_number$Parser$parse = F2(
	function (locale, original) {
		var parts = A2(
			$elm$core$String$split,
			'.',
			A2($myrho$elm_round$Round$round, locale.decimals, original));
		var integers = $coinop_logan$elm_format_number$Parser$splitThousands(
			A2(
				$elm$core$String$filter,
				$elm$core$Char$isDigit,
				A2(
					$elm$core$Maybe$withDefault,
					'0',
					$elm$core$List$head(parts))));
		var decimals = A2(
			$elm$core$Maybe$withDefault,
			'',
			$elm$core$List$head(
				A2($elm$core$List$drop, 1, parts)));
		var partial = A5($coinop_logan$elm_format_number$Parser$FormattedNumber, original, integers, decimals, '', '');
		var _v0 = $coinop_logan$elm_format_number$Parser$classify(partial);
		switch (_v0.$) {
			case 'Negative':
				return _Utils_update(
					partial,
					{prefix: locale.negativePrefix, suffix: locale.negativeSuffix});
			case 'Positive':
				return _Utils_update(
					partial,
					{prefix: locale.positivePrefix, suffix: locale.positiveSuffix});
			default:
				return partial;
		}
	});
var $coinop_logan$elm_format_number$Stringfy$formatDecimals = F2(
	function (locale, decimals) {
		return (decimals === '') ? '' : _Utils_ap(locale.decimalSeparator, decimals);
	});
var $coinop_logan$elm_format_number$Stringfy$removeZeros = function (decimals) {
	return (A2($elm$core$String$right, 1, decimals) !== '0') ? decimals : $coinop_logan$elm_format_number$Stringfy$removeZeros(
		A2($elm$core$String$dropRight, 1, decimals));
};
var $coinop_logan$elm_format_number$Stringfy$humanizeDecimals = F3(
	function (locale, strategy, decimals) {
		if ((decimals === '') || _Utils_eq(
			A2($elm$core$String$repeat, locale.decimals, '0'),
			decimals)) {
			return '';
		} else {
			if (strategy.$ === 'KeepZeros') {
				return _Utils_ap(locale.decimalSeparator, decimals);
			} else {
				return A2(
					$coinop_logan$elm_format_number$Stringfy$formatDecimals,
					locale,
					$coinop_logan$elm_format_number$Stringfy$removeZeros(decimals));
			}
		}
	});
var $coinop_logan$elm_format_number$Stringfy$stringfy = F3(
	function (locale, strategy, formatted) {
		var stringfyDecimals = function () {
			if (strategy.$ === 'Just') {
				var strategy_ = strategy.a;
				return A2($coinop_logan$elm_format_number$Stringfy$humanizeDecimals, locale, strategy_);
			} else {
				return $coinop_logan$elm_format_number$Stringfy$formatDecimals(locale);
			}
		}();
		var integers = A2($elm$core$String$join, locale.thousandSeparator, formatted.integers);
		var decimals = stringfyDecimals(formatted.decimals);
		return $elm$core$String$concat(
			_List_fromArray(
				[formatted.prefix, integers, decimals, formatted.suffix]));
	});
var $coinop_logan$elm_format_number$FormatNumber$format = F2(
	function (locale, number_) {
		return A3(
			$coinop_logan$elm_format_number$Stringfy$stringfy,
			locale,
			$elm$core$Maybe$Nothing,
			A2($coinop_logan$elm_format_number$Parser$parse, locale, number_));
	});
var $coinop_logan$elm_format_number$FormatNumber$Locales$Locale = F7(
	function (decimals, thousandSeparator, decimalSeparator, negativePrefix, negativeSuffix, positivePrefix, positiveSuffix) {
		return {decimalSeparator: decimalSeparator, decimals: decimals, negativePrefix: negativePrefix, negativeSuffix: negativeSuffix, positivePrefix: positivePrefix, positiveSuffix: positiveSuffix, thousandSeparator: thousandSeparator};
	});
var $coinop_logan$elm_format_number$FormatNumber$Locales$spanishLocale = A7($coinop_logan$elm_format_number$FormatNumber$Locales$Locale, 3, '.', ',', '−', '', '', '');
var $author$project$Styling$germanLocale = _Utils_update(
	$coinop_logan$elm_format_number$FormatNumber$Locales$spanishLocale,
	{decimals: 2});
var $author$project$Styling$formatGermanNumber = function (f) {
	return A2($coinop_logan$elm_format_number$FormatNumber$format, $author$project$Styling$germanLocale, f);
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$rel = _VirtualDom_attribute('rel');
var $mdgriffith$elm_ui$Element$link = F2(
	function (attrs, _v0) {
		var url = _v0.url;
		var label = _v0.label;
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asEl,
			$mdgriffith$elm_ui$Internal$Model$NodeName('a'),
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$Attr(
					$elm$html$Html$Attributes$href(url)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Internal$Model$Attr(
						$elm$html$Html$Attributes$rel('noopener noreferrer')),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						A2(
							$elm$core$List$cons,
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentCenterX + (' ' + ($mdgriffith$elm_ui$Internal$Style$classes.contentCenterY + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.link)))),
								attrs))))),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				_List_fromArray(
					[label])));
	});
var $author$project$Main$viewInfo = function (_v0) {
	var label = _v0.label;
	var description = _v0.description;
	var value = _v0.value;
	var unit = _v0.unit;
	var rationale = _v0.rationale;
	var reference = _v0.reference;
	var link = _v0.link;
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
				$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
				$mdgriffith$elm_ui$Element$Events$onClick($author$project$Main$CloseInfo)
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				$author$project$Styling$fonts.explorer,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(label),
						$mdgriffith$elm_ui$Element$text(' -- '),
						$mdgriffith$elm_ui$Element$text(description)
					])),
				A2(
				$mdgriffith$elm_ui$Element$row,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
					$author$project$Styling$fonts.explorerValues),
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(
						$author$project$Styling$formatGermanNumber(value)),
						$mdgriffith$elm_ui$Element$text(unit)
					])),
				A2(
				$mdgriffith$elm_ui$Element$paragraph,
				$author$project$Styling$fonts.explorerItems,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$text(rationale)
					])),
				A2(
				$mdgriffith$elm_ui$Element$el,
				$author$project$Styling$fonts.explorerItems,
				$mdgriffith$elm_ui$Element$text(reference)),
				A2(
				$mdgriffith$elm_ui$Element$link,
				$author$project$Styling$fonts.explorerItems,
				{
					label: $mdgriffith$elm_ui$Element$text(link),
					url: link
				})
			]));
};
var $author$project$Main$CollapseInTrace = function (a) {
	return {$: 'CollapseInTrace', a: a};
};
var $author$project$Main$DisplayTrace = F4(
	function (a, b, c, d) {
		return {$: 'DisplayTrace', a: a, b: b, c: c, d: d};
	});
var $author$project$Main$ExpandInTrace = function (a) {
	return {$: 'ExpandInTrace', a: a};
};
var $author$project$Main$FactOrAssTraceInfoRequest = function (a) {
	return {$: 'FactOrAssTraceInfoRequest', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$Right = {$: 'Right'};
var $mdgriffith$elm_ui$Element$alignRight = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Right);
var $mdgriffith$elm_ui$Internal$Model$Top = {$: 'Top'};
var $mdgriffith$elm_ui$Element$alignTop = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$Top);
var $author$project$Value$binaryTraceToList = function (_v0) {
	var binary = _v0.binary;
	var a = _v0.a;
	var b = _v0.b;
	var helper = F2(
		function (leftChild, acc) {
			helper:
			while (true) {
				if (leftChild.$ === 'BinaryTrace') {
					var bNested = leftChild.a;
					if (_Utils_eq(bNested.binary, binary)) {
						var $temp$leftChild = bNested.a,
							$temp$acc = A2($elm$core$List$cons, bNested.b, acc);
						leftChild = $temp$leftChild;
						acc = $temp$acc;
						continue helper;
					} else {
						return A2($elm$core$List$cons, leftChild, acc);
					}
				} else {
					return A2($elm$core$List$cons, leftChild, acc);
				}
			}
		});
	return A2(
		helper,
		a,
		_List_fromArray(
			[b]));
};
var $mdgriffith$elm_ui$Element$Font$center = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontAlignment, $mdgriffith$elm_ui$Internal$Style$classes.textCenter);
var $feathericons$elm_feather$FeatherIcons$chevronDown = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'chevron-down',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('6 9 12 15 18 9')
				]),
			_List_Nil)
		]));
var $author$project$AllRuns$getValue = F4(
	function (handling, ndx, path, _v0) {
		var a = _v0.a;
		return A2(
			$elm$core$Maybe$andThen,
			function (r) {
				return A2(
					$elm$core$Maybe$andThen,
					function (node) {
						if (node.$ === 'Tree') {
							return $elm$core$Maybe$Nothing;
						} else {
							var n = node.a;
							return $elm$core$Maybe$Just(n);
						}
					},
					A2(
						$author$project$Tree$get,
						path,
						A2($author$project$Run$getTree, handling, r)));
			},
			A2($elm$core$Dict$get, ndx, a.runs));
	});
var $mdgriffith$elm_ui$Internal$Flag$fontWeight = $mdgriffith$elm_ui$Internal$Flag$flag(13);
var $mdgriffith$elm_ui$Element$Font$bold = A2($mdgriffith$elm_ui$Internal$Model$Class, $mdgriffith$elm_ui$Internal$Flag$fontWeight, $mdgriffith$elm_ui$Internal$Style$classes.bold);
var $author$project$Main$nullValueElement = A2(
	$mdgriffith$elm_ui$Element$el,
	A2(
		$elm$core$List$cons,
		$mdgriffith$elm_ui$Element$Font$alignRight,
		A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$bold, $author$project$Styling$fonts.explorerValues)),
	$mdgriffith$elm_ui$Element$text('null'));
var $author$project$Main$viewFloatValue = function (f) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerValues),
		$mdgriffith$elm_ui$Element$text(
			$author$project$Styling$formatGermanNumber(f)));
};
var $author$project$Main$viewStringValue = function (s) {
	return A2(
		$mdgriffith$elm_ui$Element$el,
		A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerValues),
		$mdgriffith$elm_ui$Element$text(s));
};
var $author$project$Main$viewValue = function (v) {
	switch (v.$) {
		case 'Null':
			return $author$project$Main$nullValueElement;
		case 'String':
			var s = v.a;
			return $author$project$Main$viewStringValue(s);
		default:
			var f = v.a;
			return $author$project$Main$viewFloatValue(f);
	}
};
var $author$project$Main$viewTraceAsBlocks = F4(
	function (expanded, runId, allRuns, t) {
		var nameText = function (s) {
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$size($author$project$Styling$sizes.tableFontSize)
					]),
				$mdgriffith$elm_ui$Element$text(s));
		};
		switch (t.$) {
			case 'DataTrace':
				var source = t.a.source;
				var key = t.a.key;
				var attr = t.a.attr;
				var value = t.a.value;
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							nameText(source + ('[' + (key + ('].' + attr)))),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$author$project$Main$viewValue(
								$author$project$Value$Float(value)))
						]));
			case 'LiteralTrace':
				var f = t.a;
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					A2(
						$mdgriffith$elm_ui$Element$el,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$alignRight]),
						$author$project$Main$viewValue(
							$author$project$Value$Float(f))));
			case 'NameTrace':
				var name = t.a.name;
				var path = A2($elm$core$String$split, '.', name);
				var shorterPath = A2(
					$elm$core$String$join,
					'.',
					function () {
						if (path.b && (path.a === 'result')) {
							var rest = path.b;
							return rest;
						} else {
							return path;
						}
					}());
				var nameElement = nameText(shorterPath);
				var _v1 = A4($author$project$AllRuns$getValue, $author$project$Run$WithOverrides, runId, path, allRuns);
				if (_v1.$ === 'Just') {
					var leaf = _v1.a;
					var _v2 = leaf.trace;
					if (_v2.$ === 'Nothing') {
						return nameElement;
					} else {
						var nestedTrace = _v2.a;
						return A2($elm$core$Set$member, path, expanded) ? A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
									$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
									$mdgriffith$elm_ui$Element$Border$solid,
									$mdgriffith$elm_ui$Element$Border$width(1),
									$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$alignTop]),
											A2(
												$author$project$Styling$iconButton,
												$feathericons$elm_feather$FeatherIcons$chevronDown,
												$author$project$Main$CollapseInTrace(path))),
											A2(
											$mdgriffith$elm_ui$Element$column,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
															$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$Input$button,
															_List_Nil,
															{
																label: nameElement,
																onPress: $elm$core$Maybe$Just(
																	A4($author$project$Main$DisplayTrace, runId, path, leaf.value, nestedTrace))
															}),
															A2(
															$mdgriffith$elm_ui$Element$el,
															_List_fromArray(
																[$mdgriffith$elm_ui$Element$alignRight]),
															$author$project$Main$viewValue(leaf.value))
														])),
													A4($author$project$Main$viewTraceAsBlocks, expanded, runId, allRuns, nestedTrace)
												]))
										]))
								])) : A2(
							$mdgriffith$elm_ui$Element$column,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
									$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
									$mdgriffith$elm_ui$Element$Border$solid,
									$mdgriffith$elm_ui$Element$Border$width(1),
									$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
										]),
									_List_fromArray(
										[
											A2(
											$mdgriffith$elm_ui$Element$el,
											_List_fromArray(
												[$mdgriffith$elm_ui$Element$alignTop]),
											A2(
												$author$project$Styling$iconButton,
												$feathericons$elm_feather$FeatherIcons$chevronRight,
												$author$project$Main$ExpandInTrace(path))),
											A2(
											$mdgriffith$elm_ui$Element$column,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
													$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
												]),
											_List_fromArray(
												[
													A2(
													$mdgriffith$elm_ui$Element$row,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
															$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small)
														]),
													_List_fromArray(
														[
															A2(
															$mdgriffith$elm_ui$Element$Input$button,
															_List_Nil,
															{
																label: nameElement,
																onPress: $elm$core$Maybe$Just(
																	A4($author$project$Main$DisplayTrace, runId, path, leaf.value, nestedTrace))
															}),
															A2(
															$mdgriffith$elm_ui$Element$el,
															_List_fromArray(
																[$mdgriffith$elm_ui$Element$alignRight]),
															$author$project$Main$viewValue(leaf.value))
														]))
												]))
										]))
								]));
					}
				} else {
					return nameElement;
				}
			case 'FactOrAssTrace':
				var fact_or_ass = t.a.fact_or_ass;
				var value = t.a.value;
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									$author$project$Main$FactOrAssTraceInfoRequest(fact_or_ass))
								]),
							nameText(fact_or_ass)),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$author$project$Main$viewValue(
								$author$project$Value$Float(value)))
						]));
			case 'UnaryTrace':
				var unary = t.a.unary;
				var a = t.a.a;
				return A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$modalDim),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$center,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							function () {
								if (unary.$ === 'UnaryMinus') {
									return $mdgriffith$elm_ui$Element$text('-');
								} else {
									return $mdgriffith$elm_ui$Element$text('+');
								}
							}()),
							A4($author$project$Main$viewTraceAsBlocks, expanded, runId, allRuns, a)
						]));
			default:
				var bTrace = t.a;
				var _v5 = function () {
					var _v6 = bTrace.binary;
					switch (_v6.$) {
						case 'Plus':
							return _Utils_Tuple2(
								'+',
								A3($mdgriffith$elm_ui$Element$rgb255, 194, 255, 153));
						case 'Minus':
							return _Utils_Tuple2(
								'-',
								A3($mdgriffith$elm_ui$Element$rgb255, 255, 153, 153));
						case 'Times':
							return _Utils_Tuple2(
								'*',
								A3($mdgriffith$elm_ui$Element$rgb255, 153, 252, 255));
						default:
							return _Utils_Tuple2(
								'/',
								A3($mdgriffith$elm_ui$Element$rgb255, 255, 236, 173));
					}
				}();
				var op = _v5.a;
				var bgColor = _v5.b;
				return A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$Border$solid,
							$mdgriffith$elm_ui$Element$Border$width(1),
							$mdgriffith$elm_ui$Element$Border$color(bgColor),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[$mdgriffith$elm_ui$Element$alignRight]),
							$author$project$Main$viewValue(
								$author$project$Value$Float(bTrace.value))),
							A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							_List_fromArray(
								[
									A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$center,
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
										]),
									$mdgriffith$elm_ui$Element$text(op)),
									A2(
									$mdgriffith$elm_ui$Element$column,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
											$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small)
										]),
									A2(
										$elm$core$List$map,
										A3($author$project$Main$viewTraceAsBlocks, expanded, runId, allRuns),
										$author$project$Value$binaryTraceToList(bTrace)))
								]))
						]));
		}
	});
var $author$project$Main$viewDisplayedTrace = F3(
	function (allRuns, breadcrumbs, _v0) {
		var runId = _v0.runId;
		var path = _v0.path;
		var expanded = _v0.expanded;
		var value = _v0.value;
		var trace = _v0.trace;
		var showInfo = _v0.showInfo;
		var breadcrumbsWithCloseActions = $elm$core$List$reverse(
			A2(
				$elm$core$List$indexedMap,
				F2(
					function (n, b) {
						return _Utils_Tuple2(
							b,
							$author$project$Main$CloseTrace(n + 1));
					}),
				$elm$core$List$reverse(breadcrumbs)));
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$row,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium),
									$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
									$mdgriffith$elm_ui$Element$Font$size(12)
								]),
							A2(
								$elm$core$List$intersperse,
								$author$project$Styling$icon(
									A2($feathericons$elm_feather$FeatherIcons$withSize, 12, $feathericons$elm_feather$FeatherIcons$chevronRight)),
								A2(
									$elm$core$List$map,
									function (_v1) {
										var b = _v1.a;
										var a = _v1.b;
										return A2(
											$mdgriffith$elm_ui$Element$Input$button,
											_List_Nil,
											{
												label: $mdgriffith$elm_ui$Element$text(
													A2($elm$core$String$join, '.', b)),
												onPress: $elm$core$Maybe$Just(a)
											});
									},
									breadcrumbsWithCloseActions))),
							A2(
							$author$project$Styling$iconButton,
							$feathericons$elm_feather$FeatherIcons$x,
							$author$project$Main$CloseTrace(
								$elm$core$List$length(breadcrumbs) + 1))
						])),
					function () {
					if (showInfo.$ === 'Nothing') {
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_List_Nil,
							A4(
								$author$project$Main$viewTraceAsBlocks,
								A2($elm$core$Set$insert, path, expanded),
								runId,
								allRuns,
								$author$project$Value$NameTrace(
									{
										name: A2($elm$core$String$join, '.', path)
									})));
					} else {
						var info = showInfo.a;
						return $author$project$Main$viewInfo(info);
					}
				}()
				]));
	});
var $author$project$Main$NewLensClicked = {$: 'NewLensClicked'};
var $author$project$Main$NewTableClicked = {$: 'NewTableClicked'};
var $mdgriffith$elm_ui$Internal$Model$Bottom = {$: 'Bottom'};
var $mdgriffith$elm_ui$Element$alignBottom = $mdgriffith$elm_ui$Internal$Model$AlignY($mdgriffith$elm_ui$Internal$Model$Bottom);
var $mdgriffith$elm_ui$Internal$Model$MoveX = function (a) {
	return {$: 'MoveX', a: a};
};
var $mdgriffith$elm_ui$Internal$Flag$moveX = $mdgriffith$elm_ui$Internal$Flag$flag(25);
var $mdgriffith$elm_ui$Element$moveLeft = function (x) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveX,
		$mdgriffith$elm_ui$Internal$Model$MoveX(-x));
};
var $mdgriffith$elm_ui$Internal$Model$boxShadowClass = function (shadow) {
	return $elm$core$String$concat(
		_List_fromArray(
			[
				shadow.inset ? 'box-inset' : 'box-',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.offset.a) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.offset.b) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.blur) + 'px',
				$mdgriffith$elm_ui$Internal$Model$floatClass(shadow.size) + 'px',
				$mdgriffith$elm_ui$Internal$Model$formatColorClass(shadow.color)
			]));
};
var $mdgriffith$elm_ui$Internal$Flag$shadows = $mdgriffith$elm_ui$Internal$Flag$flag(19);
var $mdgriffith$elm_ui$Element$Border$shadow = function (almostShade) {
	var shade = {blur: almostShade.blur, color: almostShade.color, inset: false, offset: almostShade.offset, size: almostShade.size};
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$shadows,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			$mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade),
			'box-shadow',
			$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
};
var $author$project$Styling$shadowColor = A4($mdgriffith$elm_ui$Element$rgba255, 100, 100, 100, 0.6);
var $author$project$Styling$floatingActionButton = F2(
	function (i, onPress) {
		var size = 40;
		var paddingSize = (size / 8) | 0;
		var iconSize = size - (2 * paddingSize);
		return A3(
			$author$project$Styling$iconButtonWithStyle,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$white),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroGreen),
					$mdgriffith$elm_ui$Element$mouseOver(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow)
						])),
					$mdgriffith$elm_ui$Element$focused(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow)
						])),
					$mdgriffith$elm_ui$Element$Border$rounded((size / 2) | 0),
					$mdgriffith$elm_ui$Element$Border$shadow(
					{
						blur: 1,
						color: $author$project$Styling$shadowColor,
						offset: _Utils_Tuple2(1, 1),
						size: 2
					}),
					$mdgriffith$elm_ui$Element$alignBottom,
					$mdgriffith$elm_ui$Element$alignRight,
					$mdgriffith$elm_ui$Element$moveUp(10),
					$mdgriffith$elm_ui$Element$moveLeft(10),
					$mdgriffith$elm_ui$Element$padding(paddingSize)
				]),
			A2($feathericons$elm_feather$FeatherIcons$withSize, iconSize, i),
			onPress);
	});
var $feathericons$elm_feather$FeatherIcons$grid = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'grid',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('3'),
					$elm$svg$Svg$Attributes$y('3'),
					$elm$svg$Svg$Attributes$width('7'),
					$elm$svg$Svg$Attributes$height('7')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('14'),
					$elm$svg$Svg$Attributes$y('3'),
					$elm$svg$Svg$Attributes$width('7'),
					$elm$svg$Svg$Attributes$height('7')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('14'),
					$elm$svg$Svg$Attributes$y('14'),
					$elm$svg$Svg$Attributes$width('7'),
					$elm$svg$Svg$Attributes$height('7')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('3'),
					$elm$svg$Svg$Attributes$y('14'),
					$elm$svg$Svg$Attributes$width('7'),
					$elm$svg$Svg$Attributes$height('7')
				]),
			_List_Nil)
		]));
var $yotamDvir$elm_pivot$Pivot$lengthL = $yotamDvir$elm_pivot$Pivot$Position$lengthL;
var $feathericons$elm_feather$FeatherIcons$plus = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'plus',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('5'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('19')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('5'),
					$elm$svg$Svg$Attributes$y1('12'),
					$elm$svg$Svg$Attributes$x2('19'),
					$elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil)
		]));
var $author$project$Main$ActivateLensClicked = function (a) {
	return {$: 'ActivateLensClicked', a: a};
};
var $author$project$Main$CopyToClipboardRequested = function (a) {
	return {$: 'CopyToClipboardRequested', a: a};
};
var $author$project$Main$DuplicateLensClicked = function (a) {
	return {$: 'DuplicateLensClicked', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter = {$: 'Enter'};
var $author$project$Main$LensLabelEditFinished = {$: 'LensLabelEditFinished'};
var $author$project$Main$LensLabelEdited = F2(
	function (a, b) {
		return {$: 'LensLabelEdited', a: a, b: b};
	});
var $author$project$Main$LensTableEditModeChanged = F2(
	function (a, b) {
		return {$: 'LensTableEditModeChanged', a: a, b: b};
	});
var $author$project$Main$RemoveLensClicked = function (a) {
	return {$: 'RemoveLensClicked', a: a};
};
var $author$project$Main$ToggleShowGraphClicked = function (a) {
	return {$: 'ToggleShowGraphClicked', a: a};
};
var $author$project$Lens$asUserDefinedTable = function (_v0) {
	var l = _v0.a;
	var _v1 = l.vkind;
	if (_v1.$ === 'Classic') {
		return $elm$core$Maybe$Nothing;
	} else {
		var g = _v1.a;
		return $elm$core$Maybe$Just(g);
	}
};
var $author$project$KeyBindings$bind = F4(
	function (modifiers, key, msg, doc) {
		return {doc: doc, key: key, modifiers: modifiers, msg: msg};
	});
var $author$project$Main$bind = F3(
	function (m, k, msg) {
		return A4($author$project$KeyBindings$bind, m, k, msg, '');
	});
var $feathericons$elm_feather$FeatherIcons$clipboard = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'clipboard',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('8'),
					$elm$svg$Svg$Attributes$y('2'),
					$elm$svg$Svg$Attributes$width('8'),
					$elm$svg$Svg$Attributes$height('4'),
					$elm$svg$Svg$Attributes$rx('1'),
					$elm$svg$Svg$Attributes$ry('1')
				]),
			_List_Nil)
		]));
var $feathericons$elm_feather$FeatherIcons$copy = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'copy',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('9'),
					$elm$svg$Svg$Attributes$y('9'),
					$elm$svg$Svg$Attributes$width('13'),
					$elm$svg$Svg$Attributes$height('13'),
					$elm$svg$Svg$Attributes$rx('2'),
					$elm$svg$Svg$Attributes$ry('2')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1')
				]),
			_List_Nil)
		]));
var $feathericons$elm_feather$FeatherIcons$edit = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'edit',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z')
				]),
			_List_Nil)
		]));
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $feathericons$elm_feather$FeatherIcons$eye = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'eye',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('3')
				]),
			_List_Nil)
		]));
var $feathericons$elm_feather$FeatherIcons$eyeOff = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'eye-off',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('1'),
					$elm$svg$Svg$Attributes$y1('1'),
					$elm$svg$Svg$Attributes$x2('23'),
					$elm$svg$Svg$Attributes$y2('23')
				]),
			_List_Nil)
		]));
var $author$project$Lens$getLabel = function (_v0) {
	var l = _v0.a;
	return l.label;
};
var $author$project$Lens$getShortPathLabels = function (_v0) {
	var il = _v0.a;
	var _v1 = il.vkind;
	if (_v1.$ === 'Classic') {
		var guessedShortLabels = _v1.a.guessedShortLabels;
		return guessedShortLabels;
	} else {
		return $elm$core$Dict$empty;
	}
};
var $author$project$Lens$getShowGraph = function (_v0) {
	var il = _v0.a;
	var _v1 = il.vkind;
	if (_v1.$ === 'Classic') {
		var c = _v1.a;
		return c.showGraph;
	} else {
		return false;
	}
};
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $mdgriffith$elm_ui$Element$Input$HiddenLabel = function (a) {
	return {$: 'HiddenLabel', a: a};
};
var $mdgriffith$elm_ui$Element$Input$labelHidden = $mdgriffith$elm_ui$Element$Input$HiddenLabel;
var $author$project$KeyBindings$noModifiers = {alt: false, cmd: false, ctrl: false, shift: false};
var $Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent = F7(
	function (altKey, ctrlKey, key, keyCode, metaKey, repeat, shiftKey) {
		return {altKey: altKey, ctrlKey: ctrlKey, key: key, keyCode: keyCode, metaKey: metaKey, repeat: repeat, shiftKey: shiftKey};
	});
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKey = $elm$json$Json$Decode$maybe(
	A2(
		$elm$json$Json$Decode$andThen,
		function (key) {
			return $elm$core$String$isEmpty(key) ? $elm$json$Json$Decode$fail('empty key') : $elm$json$Json$Decode$succeed(key);
		},
		A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string)));
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero = A2(
	$elm$json$Json$Decode$andThen,
	function (code) {
		return (!code) ? $elm$json$Json$Decode$fail('code was zero') : $elm$json$Json$Decode$succeed(code);
	},
	$elm$json$Json$Decode$int);
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2($elm$json$Json$Decode$field, 'keyCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'which', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			A2($elm$json$Json$Decode$field, 'charCode', $Gizra$elm_keyboard_event$Keyboard$Event$decodeNonZero),
			$elm$json$Json$Decode$succeed(0)
		]));
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$A = {$: 'A'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add = {$: 'Add'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt = {$: 'Alt'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous = function (a) {
	return {$: 'Ambiguous', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$B = {$: 'B'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace = {$: 'Backspace'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$C = {$: 'C'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock = {$: 'CapsLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch = {$: 'ChromeSearch'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command = {$: 'Command'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl = function (a) {
	return {$: 'Ctrl', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$D = {$: 'D'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal = {$: 'Decimal'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete = {$: 'Delete'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide = {$: 'Divide'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down = {$: 'Down'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$E = {$: 'E'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight = {$: 'Eight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$End = {$: 'End'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape = {$: 'Escape'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F = {$: 'F'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1 = {$: 'F1'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10 = {$: 'F10'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11 = {$: 'F11'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12 = {$: 'F12'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2 = {$: 'F2'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3 = {$: 'F3'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4 = {$: 'F4'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5 = {$: 'F5'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6 = {$: 'F6'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7 = {$: 'F7'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8 = {$: 'F8'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9 = {$: 'F9'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five = {$: 'Five'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four = {$: 'Four'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$G = {$: 'G'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$H = {$: 'H'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home = {$: 'Home'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$I = {$: 'I'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert = {$: 'Insert'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$J = {$: 'J'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$K = {$: 'K'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$L = {$: 'L'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left = {$: 'Left'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$M = {$: 'M'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply = {$: 'Multiply'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$N = {$: 'N'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine = {$: 'Nine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock = {$: 'NumLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight = {$: 'NumpadEight'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive = {$: 'NumpadFive'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour = {$: 'NumpadFour'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine = {$: 'NumpadNine'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne = {$: 'NumpadOne'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven = {$: 'NumpadSeven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix = {$: 'NumpadSix'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree = {$: 'NumpadThree'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo = {$: 'NumpadTwo'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero = {$: 'NumpadZero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$O = {$: 'O'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$One = {$: 'One'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$P = {$: 'P'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown = {$: 'PageDown'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp = {$: 'PageUp'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak = {$: 'PauseBreak'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen = {$: 'PrintScreen'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q = {$: 'Q'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$R = {$: 'R'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right = {$: 'Right'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$S = {$: 'S'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock = {$: 'ScrollLock'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven = {$: 'Seven'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift = function (a) {
	return {$: 'Shift', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six = {$: 'Six'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar = {$: 'Spacebar'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract = {$: 'Subtract'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$T = {$: 'T'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab = {$: 'Tab'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three = {$: 'Three'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two = {$: 'Two'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$U = {$: 'U'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown = function (a) {
	return {$: 'Unknown', a: a};
};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up = {$: 'Up'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$V = {$: 'V'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$W = {$: 'W'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows = {$: 'Windows'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$X = {$: 'X'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y = {$: 'Y'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z = {$: 'Z'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero = {$: 'Zero'};
var $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode = function (keyCode) {
	switch (keyCode) {
		case 8:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Backspace;
		case 9:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab;
		case 13:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter;
		case 16:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Shift($elm$core$Maybe$Nothing);
		case 17:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ctrl($elm$core$Maybe$Nothing);
		case 18:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Alt;
		case 19:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PauseBreak;
		case 20:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$CapsLock;
		case 27:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape;
		case 32:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Spacebar;
		case 33:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageUp;
		case 34:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PageDown;
		case 35:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$End;
		case 36:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Home;
		case 37:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Left;
		case 38:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Up;
		case 39:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Right;
		case 40:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Down;
		case 44:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$PrintScreen;
		case 45:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Insert;
		case 46:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Delete;
		case 48:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Zero;
		case 49:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$One;
		case 50:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Two;
		case 51:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Three;
		case 52:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Four;
		case 53:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Five;
		case 54:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Six;
		case 55:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Seven;
		case 56:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Eight;
		case 57:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Nine;
		case 65:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$A;
		case 66:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$B;
		case 67:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$C;
		case 68:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$D;
		case 69:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$E;
		case 70:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F;
		case 71:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$G;
		case 72:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$H;
		case 73:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$I;
		case 74:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$J;
		case 75:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$K;
		case 76:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$L;
		case 77:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$M;
		case 78:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$N;
		case 79:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$O;
		case 80:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$P;
		case 81:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Q;
		case 82:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$R;
		case 83:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$S;
		case 84:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$T;
		case 85:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$U;
		case 86:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$V;
		case 87:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$W;
		case 88:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$X;
		case 89:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Y;
		case 90:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Z;
		case 91:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Ambiguous(
				_List_fromArray(
					[$SwiftsNamesake$proper_keyboard$Keyboard$Key$Windows, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Command, $SwiftsNamesake$proper_keyboard$Keyboard$Key$ChromeSearch]));
		case 96:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadZero;
		case 97:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadOne;
		case 98:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadTwo;
		case 99:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadThree;
		case 100:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFour;
		case 101:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadFive;
		case 102:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSix;
		case 103:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadSeven;
		case 104:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadEight;
		case 105:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumpadNine;
		case 106:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Multiply;
		case 107:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Add;
		case 109:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Subtract;
		case 110:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Decimal;
		case 111:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Divide;
		case 112:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F1;
		case 113:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F2;
		case 114:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F3;
		case 115:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F4;
		case 116:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F5;
		case 117:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F6;
		case 118:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F7;
		case 119:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F8;
		case 120:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F9;
		case 121:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F10;
		case 122:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F11;
		case 123:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$F12;
		case 144:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$NumLock;
		case 145:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$ScrollLock;
		default:
			return $SwiftsNamesake$proper_keyboard$Keyboard$Key$Unknown(keyCode);
	}
};
var $elm$json$Json$Decode$map7 = _Json_map7;
var $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent = A8(
	$elm$json$Json$Decode$map7,
	$Gizra$elm_keyboard_event$Keyboard$Event$KeyboardEvent,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	$Gizra$elm_keyboard_event$Keyboard$Event$decodeKey,
	A2($elm$json$Json$Decode$map, $SwiftsNamesake$proper_keyboard$Keyboard$Key$fromCode, $Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyCode),
	A2($elm$json$Json$Decode$field, 'metaKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'repeat', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $Gizra$elm_keyboard_event$Keyboard$Event$considerKeyboardEvent = function (func) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (event) {
			var _v0 = func(event);
			if (_v0.$ === 'Just') {
				var msg = _v0.a;
				return $elm$json$Json$Decode$succeed(msg);
			} else {
				return $elm$json$Json$Decode$fail('Ignoring keyboard event');
			}
		},
		$Gizra$elm_keyboard_event$Keyboard$Event$decodeKeyboardEvent);
};
var $elm_community$list_extra$List$Extra$findMap = F2(
	function (f, list) {
		findMap:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var a = list.a;
				var tail = list.b;
				var _v1 = f(a);
				if (_v1.$ === 'Just') {
					var b = _v1.a;
					return $elm$core$Maybe$Just(b);
				} else {
					var $temp$f = f,
						$temp$list = tail;
					f = $temp$f;
					list = $temp$list;
					continue findMap;
				}
			}
		}
	});
var $author$project$KeyBindings$matchesModifiers = F2(
	function (ev, mods) {
		return _Utils_eq(ev.altKey, mods.alt) && (_Utils_eq(ev.ctrlKey, mods.ctrl) && (_Utils_eq(ev.metaKey, mods.cmd) && _Utils_eq(ev.shiftKey, mods.shift)));
	});
var $author$project$KeyBindings$on = function (keys) {
	return $mdgriffith$elm_ui$Element$htmlAttribute(
		A2(
			$elm$html$Html$Events$preventDefaultOn,
			'keydown',
			$Gizra$elm_keyboard_event$Keyboard$Event$considerKeyboardEvent(
				function (ev) {
					return A2(
						$elm_community$list_extra$List$Extra$findMap,
						function (kb) {
							return (_Utils_eq(ev.keyCode, kb.key) && A2($author$project$KeyBindings$matchesModifiers, ev, kb.modifiers)) ? $elm$core$Maybe$Just(
								_Utils_Tuple2(kb.msg, true)) : $elm$core$Maybe$Nothing;
						},
						keys);
				})));
};
var $elm$html$Html$Events$onBlur = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'blur',
		$elm$json$Json$Decode$succeed(msg));
};
var $mdgriffith$elm_ui$Element$Events$onLoseFocus = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Events$onBlur);
var $mdgriffith$elm_ui$Element$Input$Placeholder = F2(
	function (a, b) {
		return {$: 'Placeholder', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$Input$placeholder = $mdgriffith$elm_ui$Element$Input$Placeholder;
var $feathericons$elm_feather$FeatherIcons$trash2 = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'trash-2',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('3 6 5 6 21 6')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('10'),
					$elm$svg$Svg$Attributes$y1('11'),
					$elm$svg$Svg$Attributes$x2('10'),
					$elm$svg$Svg$Attributes$y2('17')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('14'),
					$elm$svg$Svg$Attributes$y1('11'),
					$elm$svg$Svg$Attributes$x2('14'),
					$elm$svg$Svg$Attributes$y2('17')
				]),
			_List_Nil)
		]));
var $author$project$Main$OnChartHover = function (a) {
	return {$: 'OnChartHover', a: a};
};
var $terezka$elm_charts$Internal$Property$Property = function (a) {
	return {$: 'Property', a: a};
};
var $terezka$elm_charts$Internal$Property$property = F3(
	function (value, inter, attrs) {
		return $terezka$elm_charts$Internal$Property$Property(
			{
				attrs: attrs,
				extra: F5(
					function (_v0, _v1, _v2, _v3, _v4) {
						return _List_Nil;
					}),
				format: A2(
					$elm$core$Basics$composeR,
					value,
					A2(
						$elm$core$Basics$composeR,
						$elm$core$Maybe$map($elm$core$String$fromFloat),
						$elm$core$Maybe$withDefault('N/A'))),
				inter: inter,
				meta: $elm$core$Maybe$Nothing,
				value: value,
				visual: value
			});
	});
var $terezka$elm_charts$Chart$bar = function (y) {
	return A2(
		$terezka$elm_charts$Internal$Property$property,
		A2($elm$core$Basics$composeR, y, $elm$core$Maybe$Just),
		_List_Nil);
};
var $terezka$elm_charts$Chart$BarsElement = F5(
	function (a, b, c, d, e) {
		return {$: 'BarsElement', a: a, b: b, c: c, d: d, e: e};
	});
var $terezka$elm_charts$Chart$Indexed = function (a) {
	return {$: 'Indexed', a: a};
};
var $terezka$elm_charts$Internal$Many$apply = F2(
	function (_v0, items) {
		var func = _v0.b;
		return func(items);
	});
var $terezka$elm_charts$Chart$Item$apply = $terezka$elm_charts$Internal$Many$apply;
var $terezka$elm_charts$Internal$Helpers$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $terezka$elm_charts$Internal$Many$Remodel = F2(
	function (a, b) {
		return {$: 'Remodel', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Item$Rendered = function (a) {
	return {$: 'Rendered', a: a};
};
var $terezka$elm_charts$Internal$Many$editLimits = F2(
	function (edit, _v0) {
		var group_ = _v0.a;
		return $terezka$elm_charts$Internal$Item$Rendered(
			_Utils_update(
				group_,
				{
					toLimits: function (c) {
						return function (_v1) {
							var x = _v1.a;
							var xs = _v1.b;
							return A2(
								edit,
								x,
								group_.toLimits(c));
						}(c.items);
					}
				}));
	});
var $terezka$elm_charts$Internal$Item$getPosition = F2(
	function (plane, _v0) {
		var item = _v0.a;
		return A2(item.toPosition, plane, item.config);
	});
var $terezka$elm_charts$Internal$Item$getX1 = function (_v0) {
	var item = _v0.a;
	return item.config.values.x1;
};
var $terezka$elm_charts$Internal$Item$getX2 = function (_v0) {
	var item = _v0.a;
	return item.config.values.x2;
};
var $elm$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _v0) {
				var trues = _v0.a;
				var falses = _v0.b;
				return pred(x) ? _Utils_Tuple2(
					A2($elm$core$List$cons, x, trues),
					falses) : _Utils_Tuple2(
					trues,
					A2($elm$core$List$cons, x, falses));
			});
		return A3(
			$elm$core$List$foldr,
			step,
			_Utils_Tuple2(_List_Nil, _List_Nil),
			list);
	});
var $terezka$elm_charts$Internal$Helpers$gatherWith = F2(
	function (testFn, list) {
		var helper = F2(
			function (scattered, gathered) {
				if (!scattered.b) {
					return $elm$core$List$reverse(gathered);
				} else {
					var toGather = scattered.a;
					var population = scattered.b;
					var _v1 = A2(
						$elm$core$List$partition,
						testFn(toGather),
						population);
					var gathering = _v1.a;
					var remaining = _v1.b;
					return A2(
						helper,
						remaining,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(toGather, gathering),
							gathered));
				}
			});
		return A2(helper, list, _List_Nil);
	});
var $terezka$elm_charts$Internal$Coordinates$Position = F4(
	function (x1, x2, y1, y2) {
		return {x1: x1, x2: x2, y1: y1, y2: y2};
	});
var $terezka$elm_charts$Internal$Coordinates$foldPosition = F2(
	function (func, data) {
		var fold = F2(
			function (datum, posM) {
				if (posM.$ === 'Just') {
					var pos = posM.a;
					return $elm$core$Maybe$Just(
						{
							x1: A2(
								$elm$core$Basics$min,
								func(datum).x1,
								pos.x1),
							x2: A2(
								$elm$core$Basics$max,
								func(datum).x2,
								pos.x2),
							y1: A2(
								$elm$core$Basics$min,
								func(datum).y1,
								pos.y1),
							y2: A2(
								$elm$core$Basics$max,
								func(datum).y2,
								pos.y2)
						});
				} else {
					return $elm$core$Maybe$Just(
						func(datum));
				}
			});
		return A2(
			$elm$core$Maybe$withDefault,
			A4($terezka$elm_charts$Internal$Coordinates$Position, 0, 0, 0, 0),
			A3($elm$core$List$foldl, fold, $elm$core$Maybe$Nothing, data));
	});
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $terezka$elm_charts$Internal$Item$getLimits = function (_v0) {
	var item = _v0.a;
	return item.toLimits(item.config);
};
var $elm$html$Html$table = _VirtualDom_node('table');
var $terezka$elm_charts$Internal$Item$toHtml = function (_v0) {
	var item = _v0.a;
	return item.toHtml(item.config);
};
var $terezka$elm_charts$Internal$Item$toSvg = F2(
	function (plane, _v0) {
		var item = _v0.a;
		return A3(
			item.toSvg,
			plane,
			item.config,
			A2(item.toPosition, plane, item.config));
	});
var $terezka$elm_charts$Internal$Many$toGroup = F2(
	function (first, rest) {
		var concatTuple = function (_v1) {
			var x = _v1.a;
			var xs = _v1.b;
			return A2($elm$core$List$cons, x, xs);
		};
		return $terezka$elm_charts$Internal$Item$Rendered(
			{
				config: {
					items: _Utils_Tuple2(first, rest)
				},
				toHtml: function (c) {
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$table,
							_List_Nil,
							A2(
								$elm$core$List$concatMap,
								$terezka$elm_charts$Internal$Item$toHtml,
								concatTuple(c.items)))
						]);
				},
				toLimits: function (c) {
					return A2(
						$terezka$elm_charts$Internal$Coordinates$foldPosition,
						$terezka$elm_charts$Internal$Item$getLimits,
						concatTuple(c.items));
				},
				toPosition: F2(
					function (p, c) {
						return A2(
							$terezka$elm_charts$Internal$Coordinates$foldPosition,
							$terezka$elm_charts$Internal$Item$getPosition(p),
							concatTuple(c.items));
					}),
				toSvg: F3(
					function (p, c, _v0) {
						return A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__group')
								]),
							A2(
								$elm$core$List$map,
								$terezka$elm_charts$Internal$Item$toSvg(p),
								concatTuple(c.items)));
					})
			});
	});
var $terezka$elm_charts$Internal$Many$groupingHelp = F2(
	function (_v0, items) {
		var shared = _v0.shared;
		var equality = _v0.equality;
		var edits = _v0.edits;
		var toShared = function (_v2) {
			var item = _v2.a;
			return shared(item.config);
		};
		var toNewGroup = function (_v1) {
			var i = _v1.a;
			var is = _v1.b;
			return edits(
				A2($terezka$elm_charts$Internal$Many$toGroup, i, is));
		};
		var toEquality = F2(
			function (aO, bO) {
				return A2(
					equality,
					toShared(aO),
					toShared(bO));
			});
		return A2(
			$elm$core$List$map,
			toNewGroup,
			A2($terezka$elm_charts$Internal$Helpers$gatherWith, toEquality, items));
	});
var $terezka$elm_charts$Internal$Many$bins = A2(
	$terezka$elm_charts$Internal$Many$Remodel,
	$terezka$elm_charts$Internal$Item$getPosition,
	$terezka$elm_charts$Internal$Many$groupingHelp(
		{
			edits: $terezka$elm_charts$Internal$Many$editLimits(
				F2(
					function (item, pos) {
						return _Utils_update(
							pos,
							{
								x1: $terezka$elm_charts$Internal$Item$getX1(item),
								x2: $terezka$elm_charts$Internal$Item$getX2(item)
							});
					})),
			equality: F2(
				function (a, b) {
					return _Utils_eq(a.x1, b.x1) && (_Utils_eq(a.x2, b.x2) && (_Utils_eq(a.elIndex, b.elIndex) && _Utils_eq(a.dataIndex, b.dataIndex)));
				}),
			shared: function (config) {
				return {dataIndex: config.tooltipInfo.data, elIndex: config.tooltipInfo.elIndex, x1: config.values.x1, x2: config.values.x2};
			}
		}));
var $terezka$elm_charts$Chart$Item$bins = $terezka$elm_charts$Internal$Many$bins;
var $terezka$elm_charts$Internal$Produce$defaultBars = {grid: false, grouped: true, margin: 0.1, roundBottom: 0, roundTop: 0, spacing: 0.05, x1: $elm$core$Maybe$Nothing, x2: $elm$core$Maybe$Nothing};
var $terezka$elm_charts$Internal$Item$generalize = F2(
	function (toAny, _v0) {
		var item = _v0.a;
		return $terezka$elm_charts$Internal$Item$Rendered(
			{
				config: {
					product: toAny(item.config.product),
					toAny: $elm$core$Basics$identity,
					tooltipInfo: item.config.tooltipInfo,
					values: item.config.values
				},
				toHtml: function (c) {
					return $terezka$elm_charts$Internal$Item$toHtml(
						$terezka$elm_charts$Internal$Item$Rendered(item));
				},
				toLimits: function (_v1) {
					return item.toLimits(item.config);
				},
				toPosition: F2(
					function (plane, _v2) {
						return A2(item.toPosition, plane, item.config);
					}),
				toSvg: F3(
					function (plane, _v3, _v4) {
						return A2(
							$terezka$elm_charts$Internal$Item$toSvg,
							plane,
							$terezka$elm_charts$Internal$Item$Rendered(item));
					})
			});
	});
var $terezka$elm_charts$Internal$Many$getMembers = function (_v0) {
	var group_ = _v0.a;
	return function (_v1) {
		var x = _v1.a;
		var xs = _v1.b;
		return A2($elm$core$List$cons, x, xs);
	}(group_.config.items);
};
var $terezka$elm_charts$Internal$Many$getGenerals = function (group_) {
	var generalize = function (_v0) {
		var item = _v0.a;
		return A2(
			$terezka$elm_charts$Internal$Item$generalize,
			item.config.toAny,
			$terezka$elm_charts$Internal$Item$Rendered(item));
	};
	return A2(
		$elm$core$List$map,
		generalize,
		$terezka$elm_charts$Internal$Many$getMembers(group_));
};
var $terezka$elm_charts$Chart$Item$getLimits = $terezka$elm_charts$Internal$Item$getLimits;
var $terezka$elm_charts$Internal$Item$map = F2(
	function (func, _v0) {
		var item = _v0.a;
		return $terezka$elm_charts$Internal$Item$Rendered(
			{
				config: {
					product: item.config.product,
					toAny: item.config.toAny,
					tooltipInfo: item.config.tooltipInfo,
					values: {
						datum: func(item.config.values.datum),
						isReal: item.config.values.isReal,
						x1: item.config.values.x1,
						x2: item.config.values.x2,
						y: item.config.values.y
					}
				},
				toHtml: function (_v1) {
					return $terezka$elm_charts$Internal$Item$toHtml(
						$terezka$elm_charts$Internal$Item$Rendered(item));
				},
				toLimits: function (_v2) {
					return item.toLimits(item.config);
				},
				toPosition: F2(
					function (plane, _v3) {
						return A2(item.toPosition, plane, item.config);
					}),
				toSvg: F3(
					function (plane, _v4, _v5) {
						return A2(
							$terezka$elm_charts$Internal$Item$toSvg,
							plane,
							$terezka$elm_charts$Internal$Item$Rendered(item));
					})
			});
	});
var $terezka$elm_charts$Internal$Legend$BarLegend = F2(
	function (a, b) {
		return {$: 'BarLegend', a: a, b: b};
	});
var $terezka$elm_charts$Chart$Attributes$border = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{border: v});
	});
var $terezka$elm_charts$Chart$Attributes$color = F2(
	function (v, config) {
		return (v === '') ? config : _Utils_update(
			config,
			{color: v});
	});
var $terezka$elm_charts$Internal$Helpers$pink = '#ea60df';
var $terezka$elm_charts$Internal$Svg$defaultBar = {attrs: _List_Nil, border: 'white', borderWidth: 0, color: $terezka$elm_charts$Internal$Helpers$pink, design: $elm$core$Maybe$Nothing, highlight: 0, highlightColor: '', highlightWidth: 10, opacity: 1, roundBottom: 0, roundTop: 0};
var $terezka$elm_charts$Chart$Attributes$roundBottom = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{roundBottom: v});
	});
var $terezka$elm_charts$Chart$Attributes$roundTop = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{roundTop: v});
	});
var $terezka$elm_charts$Internal$Property$toConfigs = function (prop) {
	if (prop.$ === 'Property') {
		var config = prop.a;
		return _List_fromArray(
			[config]);
	} else {
		var configs = prop.a;
		return configs;
	}
};
var $terezka$elm_charts$Internal$Helpers$blue = '#12A5ED';
var $terezka$elm_charts$Internal$Helpers$brown = '#871c1c';
var $terezka$elm_charts$Internal$Helpers$green = '#71c614';
var $terezka$elm_charts$Internal$Helpers$moss = '#92b42c';
var $terezka$elm_charts$Internal$Helpers$orange = '#FF8400';
var $terezka$elm_charts$Internal$Helpers$purple = '#7b4dff';
var $terezka$elm_charts$Internal$Helpers$red = '#F5325B';
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $terezka$elm_charts$Internal$Helpers$toDefault = F3(
	function (_default, items, index) {
		var dict = $elm$core$Dict$fromList(
			A2($elm$core$List$indexedMap, $elm$core$Tuple$pair, items));
		var numOfItems = $elm$core$Dict$size(dict);
		var itemIndex = index % numOfItems;
		return A2(
			$elm$core$Maybe$withDefault,
			_default,
			A2($elm$core$Dict$get, itemIndex, dict));
	});
var $terezka$elm_charts$Internal$Helpers$turquoise = '#22d2ba';
var $terezka$elm_charts$Internal$Helpers$yellow = '#FFCA00';
var $terezka$elm_charts$Internal$Helpers$toDefaultColor = A2(
	$terezka$elm_charts$Internal$Helpers$toDefault,
	$terezka$elm_charts$Internal$Helpers$pink,
	_List_fromArray(
		[$terezka$elm_charts$Internal$Helpers$purple, $terezka$elm_charts$Internal$Helpers$pink, $terezka$elm_charts$Internal$Helpers$blue, $terezka$elm_charts$Internal$Helpers$green, $terezka$elm_charts$Internal$Helpers$red, $terezka$elm_charts$Internal$Helpers$yellow, $terezka$elm_charts$Internal$Helpers$turquoise, $terezka$elm_charts$Internal$Helpers$orange, $terezka$elm_charts$Internal$Helpers$moss, $terezka$elm_charts$Internal$Helpers$brown]));
var $terezka$elm_charts$Internal$Legend$toBarLegends = F3(
	function (elIndex, barsAttrs, properties) {
		var toBarConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultBar);
		};
		var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, barsAttrs, $terezka$elm_charts$Internal$Produce$defaultBars);
		var toBarLegend = F2(
			function (colorIndex, prop) {
				var rounding = A2($elm$core$Basics$max, barsConfig.roundTop, barsConfig.roundBottom);
				var defaultName = 'Property #' + $elm$core$String$fromInt(colorIndex + 1);
				var defaultColor = $terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$roundTop(rounding),
						$terezka$elm_charts$Chart$Attributes$roundBottom(rounding),
						$terezka$elm_charts$Chart$Attributes$color(defaultColor),
						$terezka$elm_charts$Chart$Attributes$border(defaultColor)
					]);
				var attrsOrg = _Utils_ap(defaultAttrs, prop.attrs);
				var productOrg = toBarConfig(attrsOrg);
				var attrs = _Utils_eq(productOrg.border, defaultColor) ? _Utils_ap(
					attrsOrg,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$border(productOrg.color)
						])) : attrsOrg;
				return A2(
					$terezka$elm_charts$Internal$Legend$BarLegend,
					A2($elm$core$Maybe$withDefault, defaultName, prop.meta),
					attrs);
			});
		return A2(
			$elm$core$List$indexedMap,
			function (propIndex) {
				return toBarLegend(elIndex + propIndex);
			},
			A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Property$toConfigs, properties));
	});
var $terezka$elm_charts$Internal$Item$Bar = function (a) {
	return {$: 'Bar', a: a};
};
var $terezka$elm_charts$Internal$Commands$Arc = F7(
	function (a, b, c, d, e, f, g) {
		return {$: 'Arc', a: a, b: b, c: c, d: d, e: e, f: f, g: g};
	});
var $terezka$elm_charts$Internal$Commands$Line = F2(
	function (a, b) {
		return {$: 'Line', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Commands$Move = F2(
	function (a, b) {
		return {$: 'Move', a: a, b: b};
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $terezka$elm_charts$Internal$Commands$joinCommands = function (commands) {
	return A2($elm$core$String$join, ' ', commands);
};
var $terezka$elm_charts$Internal$Commands$stringBoolInt = function (bool) {
	return bool ? '1' : '0';
};
var $terezka$elm_charts$Internal$Commands$stringPoint = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return $elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y));
};
var $terezka$elm_charts$Internal$Commands$stringPoints = function (points) {
	return A2(
		$elm$core$String$join,
		',',
		A2($elm$core$List$map, $terezka$elm_charts$Internal$Commands$stringPoint, points));
};
var $terezka$elm_charts$Internal$Commands$stringCommand = function (command) {
	switch (command.$) {
		case 'Move':
			var x = command.a;
			var y = command.b;
			return 'M' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'Line':
			var x = command.a;
			var y = command.b;
			return 'L' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'CubicBeziers':
			var cx1 = command.a;
			var cy1 = command.b;
			var cx2 = command.c;
			var cy2 = command.d;
			var x = command.e;
			var y = command.f;
			return 'C' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(cx2, cy2),
						_Utils_Tuple2(x, y)
					]));
		case 'CubicBeziersShort':
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 'QuadraticBeziers':
			var cx1 = command.a;
			var cy1 = command.b;
			var x = command.c;
			var y = command.d;
			return 'Q' + $terezka$elm_charts$Internal$Commands$stringPoints(
				_List_fromArray(
					[
						_Utils_Tuple2(cx1, cy1),
						_Utils_Tuple2(x, y)
					]));
		case 'QuadraticBeziersShort':
			var x = command.a;
			var y = command.b;
			return 'T' + $terezka$elm_charts$Internal$Commands$stringPoint(
				_Utils_Tuple2(x, y));
		case 'Arc':
			var rx = command.a;
			var ry = command.b;
			var xAxisRotation = command.c;
			var largeArcFlag = command.d;
			var sweepFlag = command.e;
			var x = command.f;
			var y = command.g;
			return 'A ' + $terezka$elm_charts$Internal$Commands$joinCommands(
				_List_fromArray(
					[
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(rx, ry)),
						$elm$core$String$fromInt(xAxisRotation),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(largeArcFlag),
						$terezka$elm_charts$Internal$Commands$stringBoolInt(sweepFlag),
						$terezka$elm_charts$Internal$Commands$stringPoint(
						_Utils_Tuple2(x, y))
					]));
		default:
			return 'Z';
	}
};
var $terezka$elm_charts$Internal$Commands$Close = {$: 'Close'};
var $terezka$elm_charts$Internal$Commands$CubicBeziers = F6(
	function (a, b, c, d, e, f) {
		return {$: 'CubicBeziers', a: a, b: b, c: c, d: d, e: e, f: f};
	});
var $terezka$elm_charts$Internal$Commands$CubicBeziersShort = F4(
	function (a, b, c, d) {
		return {$: 'CubicBeziersShort', a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziers = F4(
	function (a, b, c, d) {
		return {$: 'QuadraticBeziers', a: a, b: b, c: c, d: d};
	});
var $terezka$elm_charts$Internal$Commands$QuadraticBeziersShort = F2(
	function (a, b) {
		return {$: 'QuadraticBeziersShort', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Coordinates$innerLength = function (axis) {
	return A2($elm$core$Basics$max, 1, (axis.length - axis.marginMin) - axis.marginMax);
};
var $terezka$elm_charts$Internal$Coordinates$innerWidth = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.x);
};
var $terezka$elm_charts$Internal$Coordinates$range = function (axis) {
	var diff = axis.max - axis.min;
	return (diff > 0) ? diff : 1;
};
var $terezka$elm_charts$Internal$Coordinates$scaleSVGX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerWidth(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.x);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, value - plane.x.min) + plane.x.marginMin;
	});
var $terezka$elm_charts$Internal$Coordinates$innerHeight = function (plane) {
	return $terezka$elm_charts$Internal$Coordinates$innerLength(plane.y);
};
var $terezka$elm_charts$Internal$Coordinates$scaleSVGY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$innerHeight(plane)) / $terezka$elm_charts$Internal$Coordinates$range(plane.y);
	});
var $terezka$elm_charts$Internal$Coordinates$toSVGY = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleSVGY, plane, plane.y.max - value) + plane.y.marginMin;
	});
var $terezka$elm_charts$Internal$Commands$translate = F2(
	function (plane, command) {
		switch (command.$) {
			case 'Move':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Move,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'Line':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$Line,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'CubicBeziers':
				var cx1 = command.a;
				var cy1 = command.b;
				var cx2 = command.c;
				var cy2 = command.d;
				var x = command.e;
				var y = command.f;
				return A6(
					$terezka$elm_charts$Internal$Commands$CubicBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy2),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'CubicBeziersShort':
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$CubicBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'QuadraticBeziers':
				var cx1 = command.a;
				var cy1 = command.b;
				var x = command.c;
				var y = command.d;
				return A4(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziers,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, cx1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, cy1),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'QuadraticBeziersShort':
				var x = command.a;
				var y = command.b;
				return A2(
					$terezka$elm_charts$Internal$Commands$QuadraticBeziersShort,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			case 'Arc':
				var rx = command.a;
				var ry = command.b;
				var xAxisRotation = command.c;
				var largeArcFlag = command.d;
				var sweepFlag = command.e;
				var x = command.f;
				var y = command.g;
				return A7(
					$terezka$elm_charts$Internal$Commands$Arc,
					rx,
					ry,
					xAxisRotation,
					largeArcFlag,
					sweepFlag,
					A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x),
					A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y));
			default:
				return $terezka$elm_charts$Internal$Commands$Close;
		}
	});
var $terezka$elm_charts$Internal$Commands$description = F2(
	function (plane, commands) {
		return $terezka$elm_charts$Internal$Commands$joinCommands(
			A2(
				$elm$core$List$map,
				A2(
					$elm$core$Basics$composeR,
					$terezka$elm_charts$Internal$Commands$translate(plane),
					$terezka$elm_charts$Internal$Commands$stringCommand),
				commands));
	});
var $elm$svg$Svg$Attributes$fillOpacity = _VirtualDom_attribute('fill-opacity');
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianX = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.x)) / $terezka$elm_charts$Internal$Coordinates$innerWidth(plane);
	});
var $terezka$elm_charts$Internal$Coordinates$scaleCartesianY = F2(
	function (plane, value) {
		return (value * $terezka$elm_charts$Internal$Coordinates$range(plane.y)) / $terezka$elm_charts$Internal$Coordinates$innerHeight(plane);
	});
var $elm$svg$Svg$Attributes$strokeOpacity = _VirtualDom_attribute('stroke-opacity');
var $terezka$elm_charts$Internal$Svg$apply = F2(
	function (funcs, _default) {
		var apply_ = F2(
			function (f, a) {
				return f(a);
			});
		return A3($elm$core$List$foldl, apply_, _default, funcs);
	});
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $elm$svg$Svg$linearGradient = $elm$svg$Svg$trustedNode('linearGradient');
var $elm$svg$Svg$Attributes$offset = _VirtualDom_attribute('offset');
var $elm$svg$Svg$pattern = $elm$svg$Svg$trustedNode('pattern');
var $elm$svg$Svg$Attributes$patternTransform = _VirtualDom_attribute('patternTransform');
var $elm$svg$Svg$Attributes$patternUnits = _VirtualDom_attribute('patternUnits');
var $elm$svg$Svg$stop = $elm$svg$Svg$trustedNode('stop');
var $elm$svg$Svg$Attributes$stopColor = _VirtualDom_attribute('stop-color');
var $terezka$elm_charts$Internal$Svg$toPattern = F2(
	function (defaultColor, design) {
		var toPatternId = function (props) {
			return A3(
				$elm$core$String$replace,
				'(',
				'-',
				A3(
					$elm$core$String$replace,
					')',
					'-',
					A3(
						$elm$core$String$replace,
						'.',
						'-',
						A3(
							$elm$core$String$replace,
							',',
							'-',
							A3(
								$elm$core$String$replace,
								' ',
								'-',
								A2(
									$elm$core$String$join,
									'-',
									_Utils_ap(
										_List_fromArray(
											[
												'elm-charts__pattern',
												function () {
												switch (design.$) {
													case 'Striped':
														return 'striped';
													case 'Dotted':
														return 'dotted';
													default:
														return 'gradient';
												}
											}()
											]),
										props)))))));
		};
		var toPatternDefs = F4(
			function (id, spacing, rotate, inside) {
				return A2(
					$elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$pattern,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id(id),
									$elm$svg$Svg$Attributes$patternUnits('userSpaceOnUse'),
									$elm$svg$Svg$Attributes$width(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$height(
									$elm$core$String$fromFloat(spacing)),
									$elm$svg$Svg$Attributes$patternTransform(
									'rotate(' + ($elm$core$String$fromFloat(rotate) + ')'))
								]),
							_List_fromArray(
								[inside]))
						]));
			});
		var _v0 = function () {
			switch (design.$) {
				case 'Striped':
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{color: defaultColor, rotate: 45, spacing: 4, width: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.color,
								$elm$core$String$fromFloat(config.width),
								$elm$core$String$fromFloat(config.spacing),
								$elm$core$String$fromFloat(config.rotate)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.spacing,
							config.rotate,
							A2(
								$elm$svg$Svg$line,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$x1('0'),
										$elm$svg$Svg$Attributes$y('0'),
										$elm$svg$Svg$Attributes$x2('0'),
										$elm$svg$Svg$Attributes$y2(
										$elm$core$String$fromFloat(config.spacing)),
										$elm$svg$Svg$Attributes$stroke(config.color),
										$elm$svg$Svg$Attributes$strokeWidth(
										$elm$core$String$fromFloat(config.width))
									]),
								_List_Nil)),
						theId);
				case 'Dotted':
					var edits = design.a;
					var config = A2(
						$terezka$elm_charts$Internal$Svg$apply,
						edits,
						{color: defaultColor, rotate: 45, spacing: 4, width: 3});
					var theId = toPatternId(
						_List_fromArray(
							[
								config.color,
								$elm$core$String$fromFloat(config.width),
								$elm$core$String$fromFloat(config.spacing),
								$elm$core$String$fromFloat(config.rotate)
							]));
					return _Utils_Tuple2(
						A4(
							toPatternDefs,
							theId,
							config.spacing,
							config.rotate,
							A2(
								$elm$svg$Svg$circle,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$fill(config.color),
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(config.width / 3)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(config.width / 3)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(config.width / 3))
									]),
								_List_Nil)),
						theId);
				default:
					var edits = design.a;
					var colors = _Utils_eq(edits, _List_Nil) ? _List_fromArray(
						[defaultColor, 'white']) : edits;
					var theId = toPatternId(colors);
					var totalColors = $elm$core$List$length(colors);
					var toPercentage = function (i) {
						return (i * 100) / (totalColors - 1);
					};
					var toStop = F2(
						function (i, c) {
							return A2(
								$elm$svg$Svg$stop,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$offset(
										$elm$core$String$fromFloat(
											toPercentage(i)) + '%'),
										$elm$svg$Svg$Attributes$stopColor(c)
									]),
								_List_Nil);
						});
					return _Utils_Tuple2(
						A2(
							$elm$svg$Svg$defs,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$linearGradient,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id(theId),
											$elm$svg$Svg$Attributes$x1('0'),
											$elm$svg$Svg$Attributes$x2('0'),
											$elm$svg$Svg$Attributes$y1('0'),
											$elm$svg$Svg$Attributes$y2('1')
										]),
									A2($elm$core$List$indexedMap, toStop, colors))
								])),
						theId);
			}
		}();
		var patternDefs = _v0.a;
		var patternId = _v0.b;
		return _Utils_Tuple2(patternDefs, 'url(#' + (patternId + ')'));
	});
var $elm$html$Html$Attributes$map = $elm$virtual_dom$VirtualDom$mapAttribute;
var $terezka$elm_charts$Internal$Svg$withAttrs = F3(
	function (attrs, toEl, defaultAttrs) {
		return toEl(
			_Utils_ap(
				defaultAttrs,
				A2(
					$elm$core$List$map,
					$elm$html$Html$Attributes$map($elm$core$Basics$never),
					attrs)));
	});
var $elm$svg$Svg$Attributes$clipPath = _VirtualDom_attribute('clip-path');
var $terezka$elm_charts$Internal$Coordinates$toId = function (plane) {
	var numToStr = A2(
		$elm$core$Basics$composeR,
		$elm$core$String$fromFloat,
		A2($elm$core$String$replace, '.', '-'));
	return A2(
		$elm$core$String$join,
		'_',
		_List_fromArray(
			[
				'elm-charts__id',
				numToStr(plane.x.length),
				numToStr(plane.x.min),
				numToStr(plane.x.max),
				numToStr(plane.x.marginMin),
				numToStr(plane.x.marginMax),
				numToStr(plane.y.length),
				numToStr(plane.y.min),
				numToStr(plane.y.max),
				numToStr(plane.y.marginMin),
				numToStr(plane.y.marginMax)
			]));
};
var $terezka$elm_charts$Internal$Svg$withinChartArea = function (plane) {
	return $elm$svg$Svg$Attributes$clipPath(
		'url(#' + ($terezka$elm_charts$Internal$Coordinates$toId(plane) + ')'));
};
var $terezka$elm_charts$Internal$Svg$bar = F3(
	function (plane, config, point) {
		var viewBar = F6(
			function (fill, fillOpacity, border, borderWidth, strokeOpacity, cmds) {
				return A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__bar'),
							$elm$svg$Svg$Attributes$fill(fill),
							$elm$svg$Svg$Attributes$fillOpacity(
							$elm$core$String$fromFloat(fillOpacity)),
							$elm$svg$Svg$Attributes$stroke(border),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(borderWidth)),
							$elm$svg$Svg$Attributes$strokeOpacity(
							$elm$core$String$fromFloat(strokeOpacity)),
							$elm$svg$Svg$Attributes$d(
							A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_Nil);
			});
		var highlightColor = (config.highlightColor === '') ? config.color : config.highlightColor;
		var borderWidthCarY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.borderWidth / 2);
		var highlightWidthCarY = borderWidthCarY + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, config.highlightWidth / 2);
		var borderWidthCarX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.borderWidth / 2);
		var highlightWidthCarX = borderWidthCarX + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, config.highlightWidth / 2);
		var pos = {
			x1: A2($elm$core$Basics$min, point.x1, point.x2) + borderWidthCarX,
			x2: A2($elm$core$Basics$max, point.x1, point.x2) - borderWidthCarX,
			y1: A2($elm$core$Basics$min, point.y1, point.y2) + borderWidthCarY,
			y2: A2($elm$core$Basics$max, point.y1, point.y2) - borderWidthCarY
		};
		var height = $elm$core$Basics$abs(pos.y2 - pos.y1);
		var highlightPos = {x1: pos.x1 - highlightWidthCarX, x2: pos.x2 + highlightWidthCarX, y1: pos.y1 - highlightWidthCarY, y2: pos.y2 + highlightWidthCarY};
		var width = $elm$core$Basics$abs(pos.x2 - pos.x1);
		var roundingBottom = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.roundBottom);
		var radiusBottomX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingBottom);
		var radiusBottomY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingBottom);
		var roundingTop = (A2($terezka$elm_charts$Internal$Coordinates$scaleSVGX, plane, width) * 0.5) * A3($elm$core$Basics$clamp, 0, 1, config.roundTop);
		var radiusTopX = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, roundingTop);
		var radiusTopY = A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, roundingTop);
		var _v0 = ((((height - (radiusTopY * 0.8)) - (radiusBottomY * 0.8)) <= 0) || (((width - (radiusTopX * 0.8)) - (radiusBottomX * 0.8)) <= 0)) ? _Utils_Tuple2(0, 0) : _Utils_Tuple2(config.roundTop, config.roundBottom);
		var roundTop = _v0.a;
		var roundBottom = _v0.b;
		var _v1 = function () {
			if (_Utils_eq(pos.y1, pos.y2)) {
				return _Utils_Tuple2(_List_Nil, _List_Nil);
			} else {
				var _v2 = _Utils_Tuple2(roundTop > 0, roundBottom > 0);
				if (!_v2.a) {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1 + radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x2 - radiusBottomX, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusBottomX, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x1, highlightPos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x2 - radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.x2, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1)
								]));
					}
				} else {
					if (!_v2.b) {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x1 + radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x2, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x1 + radiusTopX, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2 - radiusTopX, highlightPos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x2, highlightPos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x2 - radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x1, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1)
								]));
					} else {
						return _Utils_Tuple2(
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, pos.x1 + radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x1 + radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, pos.x2, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, pos.x2 - radiusBottomX, pos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusBottomX, pos.y1)
								]),
							_List_fromArray(
								[
									A2($terezka$elm_charts$Internal$Commands$Move, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x1, highlightPos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1, highlightPos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x1 + radiusTopX, highlightPos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2 - radiusTopX, highlightPos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, true, highlightPos.x2, highlightPos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x2, highlightPos.y1 + radiusBottomY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, true, highlightPos.x2 - radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, highlightPos.x1 + radiusBottomX, highlightPos.y1),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2 - radiusBottomX, pos.y1),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingBottom, roundingBottom, -45, false, false, pos.x2, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y2 - radiusTopY),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x2 - radiusTopX, pos.y2),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1 + radiusTopX, pos.y2),
									A7($terezka$elm_charts$Internal$Commands$Arc, roundingTop, roundingTop, -45, false, false, pos.x1, pos.y2 - radiusTopY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x1, pos.y1 + radiusBottomY),
									A2($terezka$elm_charts$Internal$Commands$Line, pos.x2, pos.y1)
								]));
					}
				}
			}
		}();
		var commands = _v1.a;
		var highlightCommands = _v1.b;
		var viewAuraBar = function (fill) {
			return (!config.highlight) ? A6(viewBar, fill, config.opacity, config.border, config.borderWidth, 1, commands) : A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-highlight')
					]),
				_List_fromArray(
					[
						A6(viewBar, highlightColor, config.highlight, 'transparent', 0, 0, highlightCommands),
						A6(viewBar, fill, config.opacity, config.border, config.borderWidth, 1, commands)
					]));
		};
		var _v3 = config.design;
		if (_v3.$ === 'Nothing') {
			return viewAuraBar(config.color);
		} else {
			var design = _v3.a;
			var _v4 = A2($terezka$elm_charts$Internal$Svg$toPattern, config.color, design);
			var patternDefs = _v4.a;
			var fill = _v4.b;
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__bar-with-pattern')
					]),
				_List_fromArray(
					[
						patternDefs,
						viewAuraBar(fill)
					]));
		}
	});
var $terezka$elm_charts$Internal$Produce$toDefaultName = F2(
	function (index, name) {
		return A2(
			$elm$core$Maybe$withDefault,
			'Property #' + $elm$core$String$fromInt(index + 1),
			name);
	});
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $terezka$elm_charts$Internal$Produce$tooltipRow = F3(
	function (color, title, text) {
		return A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', color),
							A2($elm$html$Html$Attributes$style, 'padding', '0'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '3px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title + ':')
						])),
					A2(
					$elm$html$Html$td,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
							A2($elm$html$Html$Attributes$style, 'padding', '0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(text)
						]))
				]));
	});
var $terezka$elm_charts$Internal$Helpers$withSurround = F2(
	function (all, func) {
		var fold = F4(
			function (index, prev, acc, list) {
				fold:
				while (true) {
					if (list.b) {
						if (list.b.b) {
							var a = list.a;
							var _v1 = list.b;
							var b = _v1.a;
							var rest = _v1.b;
							var $temp$index = index + 1,
								$temp$prev = $elm$core$Maybe$Just(a),
								$temp$acc = _Utils_ap(
								acc,
								_List_fromArray(
									[
										A4(
										func,
										index,
										prev,
										a,
										$elm$core$Maybe$Just(b))
									])),
								$temp$list = A2($elm$core$List$cons, b, rest);
							index = $temp$index;
							prev = $temp$prev;
							acc = $temp$acc;
							list = $temp$list;
							continue fold;
						} else {
							var a = list.a;
							return _Utils_ap(
								acc,
								_List_fromArray(
									[
										A4(func, index, prev, a, $elm$core$Maybe$Nothing)
									]));
						}
					} else {
						return acc;
					}
				}
			});
		return A4(fold, 0, $elm$core$Maybe$Nothing, _List_Nil, all);
	});
var $terezka$elm_charts$Internal$Produce$toBarSeries = F4(
	function (elIndex, barsAttrs, properties, data) {
		var toBarConfig = function (attrs) {
			return A2($terezka$elm_charts$Internal$Helpers$apply, attrs, $terezka$elm_charts$Internal$Svg$defaultBar);
		};
		var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, barsAttrs, $terezka$elm_charts$Internal$Produce$defaultBars);
		var toBarItem = F7(
			function (sections, barIndex, sectionIndex, section, colorIndex, dataIndex, bin) {
				var visual = section.visual(bin.datum);
				var value = section.value(bin.datum);
				var start = bin.start;
				var numOfSections = $elm$core$List$length(sections);
				var numOfBars = barsConfig.grouped ? $elm$core$List$length(properties) : 1;
				var minY = (numOfSections > 1) ? $elm$core$Basics$max(0) : $elm$core$Basics$identity;
				var y1 = minY(
					A2($elm$core$Maybe$withDefault, 0, visual) - A2($elm$core$Maybe$withDefault, 0, value));
				var y2 = minY(
					A2($elm$core$Maybe$withDefault, 0, visual));
				var isSingle = numOfSections === 1;
				var isLast = _Utils_eq(sectionIndex, numOfSections - 1);
				var roundTop = (isSingle || isLast) ? barsConfig.roundTop : 0;
				var isFirst = !sectionIndex;
				var roundBottom = (isSingle || isFirst) ? barsConfig.roundBottom : 0;
				var end = bin.end;
				var length = end - start;
				var margin = length * barsConfig.margin;
				var spacing = length * barsConfig.spacing;
				var width = ((length - (margin * 2)) - ((numOfBars - 1) * spacing)) / numOfBars;
				var offset = barsConfig.grouped ? ((barIndex * width) + (barIndex * spacing)) : 0;
				var x1 = (start + margin) + offset;
				var x2 = ((start + margin) + offset) + width;
				var defaultColor = $terezka$elm_charts$Internal$Helpers$toDefaultColor(colorIndex);
				var defaultAttrs = _List_fromArray(
					[
						$terezka$elm_charts$Chart$Attributes$roundTop(roundTop),
						$terezka$elm_charts$Chart$Attributes$roundBottom(roundBottom),
						$terezka$elm_charts$Chart$Attributes$color(defaultColor),
						$terezka$elm_charts$Chart$Attributes$border(defaultColor)
					]);
				var attrs = _Utils_ap(
					defaultAttrs,
					_Utils_ap(
						section.attrs,
						A5(section.extra, barIndex, sectionIndex, dataIndex, section.meta, bin.datum)));
				var productOrg = toBarConfig(attrs);
				var product = function (p) {
					return _Utils_eq(p.border, defaultColor) ? _Utils_update(
						p,
						{border: p.color}) : p;
				}(
					function (p) {
						var _v21 = p.design;
						if (((_v21.$ === 'Just') && (_v21.a.$ === 'Gradient')) && _v21.a.a.b) {
							var _v22 = _v21.a.a;
							var color = _v22.a;
							return _Utils_eq(p.color, defaultColor) ? _Utils_update(
								p,
								{color: color}) : p;
						} else {
							return p;
						}
					}(productOrg));
				return $terezka$elm_charts$Internal$Item$Rendered(
					{
						config: {
							product: product,
							toAny: $terezka$elm_charts$Internal$Item$Bar,
							tooltipInfo: {
								border: product.border,
								borderWidth: product.borderWidth,
								color: product.color,
								data: dataIndex,
								elIndex: elIndex,
								formatted: section.format(bin.datum),
								index: colorIndex,
								name: section.meta,
								property: barIndex,
								stack: sectionIndex
							},
							values: {
								datum: bin.datum,
								isReal: function () {
									if (value.$ === 'Just') {
										return true;
									} else {
										return false;
									}
								}(),
								x1: start,
								x2: end,
								y: A2($elm$core$Maybe$withDefault, 0, value)
							}
						},
						toHtml: function (c) {
							return _List_fromArray(
								[
									A3(
									$terezka$elm_charts$Internal$Produce$tooltipRow,
									c.tooltipInfo.color,
									A2($terezka$elm_charts$Internal$Produce$toDefaultName, colorIndex, c.tooltipInfo.name),
									section.format(bin.datum))
								]);
						},
						toLimits: function (config) {
							return {
								x1: x1,
								x2: x2,
								y1: A2($elm$core$Basics$min, y1, y2),
								y2: A2($elm$core$Basics$max, y1, y2)
							};
						},
						toPosition: F2(
							function (_v20, config) {
								return {x1: x1, x2: x2, y1: y1, y2: y2};
							}),
						toSvg: F3(
							function (plane, config, position) {
								return A3($terezka$elm_charts$Internal$Svg$bar, plane, product, position);
							})
					});
			});
		var toSeriesItem = F6(
			function (bins, sections, barIndex, sectionIndex, section, colorIndex) {
				var _v13 = A2(
					$elm$core$List$indexedMap,
					A5(toBarItem, sections, barIndex, sectionIndex, section, colorIndex),
					bins);
				if (!_v13.b) {
					return $elm$core$Maybe$Nothing;
				} else {
					var first = _v13.a;
					var rest = _v13.b;
					return $elm$core$Maybe$Just(
						$terezka$elm_charts$Internal$Item$Rendered(
							{
								config: {
									items: _Utils_Tuple2(first, rest)
								},
								toHtml: function (c) {
									return _List_fromArray(
										[
											A2(
											$elm$html$Html$table,
											_List_fromArray(
												[
													A2($elm$html$Html$Attributes$style, 'margin', '0')
												]),
											A2(
												$elm$core$List$concatMap,
												$terezka$elm_charts$Internal$Item$toHtml,
												function (_v14) {
													var x = _v14.a;
													var xs = _v14.b;
													return A2($elm$core$List$cons, x, xs);
												}(c.items)))
										]);
								},
								toLimits: function (c) {
									return A2(
										$terezka$elm_charts$Internal$Coordinates$foldPosition,
										$terezka$elm_charts$Internal$Item$getLimits,
										function (_v15) {
											var x = _v15.a;
											var xs = _v15.b;
											return A2($elm$core$List$cons, x, xs);
										}(c.items));
								},
								toPosition: F2(
									function (plane, c) {
										return A2(
											$terezka$elm_charts$Internal$Coordinates$foldPosition,
											$terezka$elm_charts$Internal$Item$getPosition(plane),
											function (_v16) {
												var x = _v16.a;
												var xs = _v16.b;
												return A2($elm$core$List$cons, x, xs);
											}(c.items));
									}),
								toSvg: F3(
									function (plane, c, _v17) {
										return A2(
											$elm$svg$Svg$g,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$class('elm-charts__bar-series')
												]),
											A2(
												$elm$core$List$map,
												$terezka$elm_charts$Internal$Item$toSvg(plane),
												function (_v18) {
													var x = _v18.a;
													var xs = _v18.b;
													return A2($elm$core$List$cons, x, xs);
												}(c.items)));
									})
							}));
				}
			});
		var toBin = F4(
			function (index, prevM, curr, nextM) {
				var _v0 = _Utils_Tuple2(barsConfig.x1, barsConfig.x2);
				if (_v0.a.$ === 'Nothing') {
					if (_v0.b.$ === 'Nothing') {
						var _v1 = _v0.a;
						var _v2 = _v0.b;
						return {datum: curr, end: (index + 1) + 0.5, start: (index + 1) - 0.5};
					} else {
						var _v8 = _v0.a;
						var toEnd = _v0.b.a;
						var _v9 = _Utils_Tuple2(prevM, nextM);
						if (_v9.a.$ === 'Just') {
							var prev = _v9.a.a;
							return {
								datum: curr,
								end: toEnd(curr),
								start: toEnd(prev)
							};
						} else {
							if (_v9.b.$ === 'Just') {
								var _v10 = _v9.a;
								var next = _v9.b.a;
								return {
									datum: curr,
									end: toEnd(curr),
									start: toEnd(curr) - (toEnd(next) - toEnd(curr))
								};
							} else {
								var _v11 = _v9.a;
								var _v12 = _v9.b;
								return {
									datum: curr,
									end: toEnd(curr),
									start: toEnd(curr) - 1
								};
							}
						}
					}
				} else {
					if (_v0.b.$ === 'Nothing') {
						var toStart = _v0.a.a;
						var _v3 = _v0.b;
						var _v4 = _Utils_Tuple2(prevM, nextM);
						if (_v4.b.$ === 'Just') {
							var next = _v4.b.a;
							return {
								datum: curr,
								end: toStart(next),
								start: toStart(curr)
							};
						} else {
							if (_v4.a.$ === 'Just') {
								var prev = _v4.a.a;
								var _v5 = _v4.b;
								return {
									datum: curr,
									end: toStart(curr) + (toStart(curr) - toStart(prev)),
									start: toStart(curr)
								};
							} else {
								var _v6 = _v4.a;
								var _v7 = _v4.b;
								return {
									datum: curr,
									end: toStart(curr) + 1,
									start: toStart(curr)
								};
							}
						}
					} else {
						var toStart = _v0.a.a;
						var toEnd = _v0.b.a;
						return {
							datum: curr,
							end: toEnd(curr),
							start: toStart(curr)
						};
					}
				}
			});
		return function (bins) {
			return A2(
				$elm$core$List$filterMap,
				$elm$core$Basics$identity,
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (propIndex, f) {
							return f(elIndex + propIndex);
						}),
					$elm$core$List$concat(
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (barIndex, stacks) {
									return A2(
										$elm$core$List$indexedMap,
										A3(toSeriesItem, bins, stacks, barIndex),
										$elm$core$List$reverse(stacks));
								}),
							A2($elm$core$List$map, $terezka$elm_charts$Internal$Property$toConfigs, properties)))));
		}(
			A2($terezka$elm_charts$Internal$Helpers$withSurround, data, toBin));
	});
var $terezka$elm_charts$Chart$barsMap = F4(
	function (mapData, edits, properties, data) {
		return $terezka$elm_charts$Chart$Indexed(
			function (index) {
				var legends_ = A3($terezka$elm_charts$Internal$Legend$toBarLegends, index, edits, properties);
				var items = A4($terezka$elm_charts$Internal$Produce$toBarSeries, index, edits, properties, data);
				var generalized = A2(
					$elm$core$List$map,
					$terezka$elm_charts$Internal$Item$map(mapData),
					A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Many$getGenerals, items));
				var bins = A2($terezka$elm_charts$Chart$Item$apply, $terezka$elm_charts$Chart$Item$bins, generalized);
				var toLimits = A2($elm$core$List$map, $terezka$elm_charts$Internal$Item$getLimits, bins);
				var barsConfig = A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Produce$defaultBars);
				var toTicks = F2(
					function (plane, acc) {
						return _Utils_update(
							acc,
							{
								xs: _Utils_ap(
									acc.xs,
									barsConfig.grid ? A2(
										$elm$core$List$concatMap,
										A2(
											$elm$core$Basics$composeR,
											$terezka$elm_charts$Chart$Item$getLimits,
											function (pos) {
												return _List_fromArray(
													[pos.x1, pos.x2]);
											}),
										bins) : _List_Nil)
							});
					});
				return _Utils_Tuple2(
					A5(
						$terezka$elm_charts$Chart$BarsElement,
						toLimits,
						generalized,
						legends_,
						toTicks,
						function (plane) {
							return A2(
								$elm$svg$Svg$map,
								$elm$core$Basics$never,
								A2(
									$elm$svg$Svg$g,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$class('elm-charts__bar-series')
										]),
									A2(
										$elm$core$List$map,
										$terezka$elm_charts$Internal$Item$toSvg(plane),
										items)));
						}),
					index + $elm$core$List$length(
						A2($elm$core$List$concatMap, $terezka$elm_charts$Internal$Property$toConfigs, properties)));
			});
	});
var $terezka$elm_charts$Chart$bars = F3(
	function (edits, properties, data) {
		return A4($terezka$elm_charts$Chart$barsMap, $elm$core$Basics$identity, edits, properties, data);
	});
var $terezka$elm_charts$Internal$Many$andThen = F2(
	function (_v0, _v1) {
		var toPos2 = _v0.a;
		var func2 = _v0.b;
		var toPos1 = _v1.a;
		var func1 = _v1.b;
		return A2(
			$terezka$elm_charts$Internal$Many$Remodel,
			toPos2,
			function (items) {
				return func2(
					func1(items));
			});
	});
var $terezka$elm_charts$Chart$Item$andThen = $terezka$elm_charts$Internal$Many$andThen;
var $terezka$elm_charts$Internal$Item$isBar = function (_v0) {
	var item = _v0.a;
	var _v1 = item.config.product;
	if (_v1.$ === 'Bar') {
		var bar = _v1.a;
		return $elm$core$Maybe$Just(
			$terezka$elm_charts$Internal$Item$Rendered(
				{
					config: {product: bar, toAny: $terezka$elm_charts$Internal$Item$Bar, tooltipInfo: item.config.tooltipInfo, values: item.config.values},
					toHtml: function (c) {
						return item.toHtml(item.config);
					},
					toLimits: function (_v2) {
						return item.toLimits(item.config);
					},
					toPosition: F2(
						function (plane, _v3) {
							return A2(item.toPosition, plane, item.config);
						}),
					toSvg: F2(
						function (plane, config) {
							return A2($terezka$elm_charts$Internal$Svg$bar, plane, config.product);
						})
				}));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $terezka$elm_charts$Internal$Many$bars = A2(
	$terezka$elm_charts$Internal$Many$Remodel,
	$terezka$elm_charts$Internal$Item$getPosition,
	$elm$core$List$filterMap($terezka$elm_charts$Internal$Item$isBar));
var $terezka$elm_charts$Chart$Item$bars = $terezka$elm_charts$Internal$Many$bars;
var $terezka$elm_charts$Internal$Svg$defaultLabel = {anchor: $elm$core$Maybe$Nothing, attrs: _List_Nil, border: 'white', borderWidth: 0, color: '#808BAB', ellipsis: $elm$core$Maybe$Nothing, fontSize: $elm$core$Maybe$Nothing, hideOverflow: false, rotate: 0, uppercase: false, xOff: 0, yOff: 0};
var $terezka$elm_charts$Internal$Coordinates$bottom = function (pos) {
	return {x: pos.x1 + ((pos.x2 - pos.x1) / 2), y: pos.y1};
};
var $terezka$elm_charts$Chart$Item$getBottom = function (p) {
	return A2(
		$elm$core$Basics$composeR,
		$terezka$elm_charts$Internal$Item$getPosition(p),
		$terezka$elm_charts$Internal$Coordinates$bottom);
};
var $terezka$elm_charts$Chart$defaultLabel = {anchor: $terezka$elm_charts$Internal$Svg$defaultLabel.anchor, attrs: $terezka$elm_charts$Internal$Svg$defaultLabel.attrs, border: $terezka$elm_charts$Internal$Svg$defaultLabel.border, borderWidth: $terezka$elm_charts$Internal$Svg$defaultLabel.borderWidth, color: $terezka$elm_charts$Internal$Svg$defaultLabel.color, ellipsis: $terezka$elm_charts$Internal$Svg$defaultLabel.ellipsis, fontSize: $terezka$elm_charts$Internal$Svg$defaultLabel.fontSize, format: $elm$core$Maybe$Nothing, hideOverflow: $terezka$elm_charts$Internal$Svg$defaultLabel.hideOverflow, position: $terezka$elm_charts$Chart$Item$getBottom, rotate: $terezka$elm_charts$Internal$Svg$defaultLabel.rotate, uppercase: $terezka$elm_charts$Internal$Svg$defaultLabel.uppercase, xOff: $terezka$elm_charts$Internal$Svg$defaultLabel.xOff, yOff: $terezka$elm_charts$Internal$Svg$defaultLabel.yOff};
var $terezka$elm_charts$Chart$SubElements = function (a) {
	return {$: 'SubElements', a: a};
};
var $terezka$elm_charts$Chart$eachCustom = F2(
	function (grouping, func) {
		return $terezka$elm_charts$Chart$SubElements(
			F2(
				function (p, items) {
					var processed = A2($terezka$elm_charts$Chart$Item$apply, grouping, items);
					return A2(
						$elm$core$List$concatMap,
						func(p),
						processed);
				}));
	});
var $terezka$elm_charts$Internal$Item$getDatum = function (_v0) {
	var item = _v0.a;
	return item.config.values.datum;
};
var $terezka$elm_charts$Internal$Many$getData = function (_v0) {
	var group_ = _v0.a;
	return function (_v1) {
		var x = _v1.a;
		var xs = _v1.b;
		return $terezka$elm_charts$Internal$Item$getDatum(x);
	}(group_.config.items);
};
var $terezka$elm_charts$Chart$Item$getOneData = $terezka$elm_charts$Internal$Many$getData;
var $elm$svg$Svg$foreignObject = $elm$svg$Svg$trustedNode('foreignObject');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $terezka$elm_charts$Internal$Svg$position = F6(
	function (plane, rotation, x_, y_, xOff_, yOff_) {
		return $elm$svg$Svg$Attributes$transform(
			'translate(' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x_) + xOff_) + (',' + ($elm$core$String$fromFloat(
				A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y_) + yOff_) + (') rotate(' + ($elm$core$String$fromFloat(rotation) + ')'))))));
	});
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$tspan = $elm$svg$Svg$trustedNode('tspan');
var $terezka$elm_charts$Internal$Svg$label = F4(
	function (plane, config, inner, point) {
		var _v0 = config.ellipsis;
		if (_v0.$ === 'Nothing') {
			var withOverflowWrap = function (el) {
				return config.hideOverflow ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.uppercase ? 'text-transform: uppercase;' : '';
			var fontStyle = function () {
				var _v5 = config.fontSize;
				if (_v5.$ === 'Just') {
					var size_ = _v5.a;
					return 'font-size: ' + ($elm$core$String$fromInt(size_) + 'px;');
				} else {
					return '';
				}
			}();
			var anchorStyle = function () {
				var _v1 = config.anchor;
				if (_v1.$ === 'Nothing') {
					return 'text-anchor: middle;';
				} else {
					switch (_v1.a.$) {
						case 'End':
							var _v2 = _v1.a;
							return 'text-anchor: end;';
						case 'Start':
							var _v3 = _v1.a;
							return 'text-anchor: start;';
						default:
							var _v4 = _v1.a;
							return 'text-anchor: middle;';
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$text_,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$stroke(config.border),
							$elm$svg$Svg$Attributes$strokeWidth(
							$elm$core$String$fromFloat(config.borderWidth)),
							$elm$svg$Svg$Attributes$fill(config.color),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.rotate, point.x, point.y, config.xOff, config.yOff),
							$elm$svg$Svg$Attributes$style(
							A2(
								$elm$core$String$join,
								' ',
								_List_fromArray(
									['pointer-events: none;', fontStyle, anchorStyle, uppercaseStyle])))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$tspan, _List_Nil, inner)
						])));
		} else {
			var ellipsis = _v0.a;
			var xOffWithAnchor = function () {
				var _v11 = config.anchor;
				if (_v11.$ === 'Nothing') {
					return config.xOff - (ellipsis.width / 2);
				} else {
					switch (_v11.a.$) {
						case 'End':
							var _v12 = _v11.a;
							return config.xOff - ellipsis.width;
						case 'Start':
							var _v13 = _v11.a;
							return config.xOff;
						default:
							var _v14 = _v11.a;
							return config.xOff - (ellipsis.width / 2);
					}
				}
			}();
			var withOverflowWrap = function (el) {
				return config.hideOverflow ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$terezka$elm_charts$Internal$Svg$withinChartArea(plane)
						]),
					_List_fromArray(
						[el])) : el;
			};
			var uppercaseStyle = config.uppercase ? A2($elm$html$Html$Attributes$style, 'text-transform', 'uppercase') : A2($elm$html$Html$Attributes$style, '', '');
			var fontStyle = function () {
				var _v10 = config.fontSize;
				if (_v10.$ === 'Just') {
					var size_ = _v10.a;
					return A2(
						$elm$html$Html$Attributes$style,
						'font-size',
						$elm$core$String$fromInt(size_) + 'px');
				} else {
					return A2($elm$html$Html$Attributes$style, '', '');
				}
			}();
			var anchorStyle = function () {
				var _v6 = config.anchor;
				if (_v6.$ === 'Nothing') {
					return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
				} else {
					switch (_v6.a.$) {
						case 'End':
							var _v7 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'right');
						case 'Start':
							var _v8 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'left');
						default:
							var _v9 = _v6.a;
							return A2($elm$html$Html$Attributes$style, 'text-align', 'center');
					}
				}
			}();
			return withOverflowWrap(
				A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$foreignObject,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__label'),
							$elm$svg$Svg$Attributes$class('elm-charts__html-label'),
							$elm$svg$Svg$Attributes$width(
							$elm$core$String$fromFloat(ellipsis.width)),
							$elm$svg$Svg$Attributes$height(
							$elm$core$String$fromFloat(ellipsis.height)),
							A6($terezka$elm_charts$Internal$Svg$position, plane, -config.rotate, point.x, point.y, xOffWithAnchor, config.yOff - 10)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$attribute, 'xmlns', 'http://www.w3.org/1999/xhtml'),
									A2($elm$html$Html$Attributes$style, 'white-space', 'nowrap'),
									A2($elm$html$Html$Attributes$style, 'overflow', 'hidden'),
									A2($elm$html$Html$Attributes$style, 'text-overflow', 'ellipsis'),
									A2($elm$html$Html$Attributes$style, 'height', '100%'),
									A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
									A2($elm$html$Html$Attributes$style, 'color', config.color),
									fontStyle,
									uppercaseStyle,
									anchorStyle
								]),
							inner)
						])));
		}
	});
var $terezka$elm_charts$Chart$SvgElement = function (a) {
	return {$: 'SvgElement', a: a};
};
var $terezka$elm_charts$Chart$svg = function (func) {
	return $terezka$elm_charts$Chart$SvgElement(
		function (p) {
			return func(p);
		});
};
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $terezka$elm_charts$Chart$toLabelFromItemLabel = function (config) {
	return {anchor: config.anchor, attrs: config.attrs, border: config.border, borderWidth: config.borderWidth, color: config.color, ellipsis: config.ellipsis, fontSize: config.fontSize, hideOverflow: config.hideOverflow, rotate: config.rotate, uppercase: config.uppercase, xOff: config.xOff, yOff: config.yOff};
};
var $terezka$elm_charts$Chart$binLabels = F2(
	function (toLabel, edits) {
		return A2(
			$terezka$elm_charts$Chart$eachCustom,
			A2($terezka$elm_charts$Chart$Item$andThen, $terezka$elm_charts$Chart$Item$bins, $terezka$elm_charts$Chart$Item$bars),
			F2(
				function (p, item) {
					var config = A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Chart$defaultLabel);
					var text = function () {
						var _v1 = config.format;
						if (_v1.$ === 'Just') {
							var formatting = _v1.a;
							return formatting(item);
						} else {
							return toLabel(
								$terezka$elm_charts$Chart$Item$getOneData(item));
						}
					}();
					return _List_fromArray(
						[
							$terezka$elm_charts$Chart$svg(
							function (_v0) {
								return A4(
									$terezka$elm_charts$Internal$Svg$label,
									p,
									$terezka$elm_charts$Chart$toLabelFromItemLabel(config),
									_List_fromArray(
										[
											$elm$svg$Svg$text(text)
										]),
									A2(config.position, p, item));
							})
						]);
				}));
	});
var $terezka$elm_charts$Internal$Svg$Event = F2(
	function (name, handler) {
		return {handler: handler, name: name};
	});
var $elm$svg$Svg$clipPath = $elm$svg$Svg$trustedNode('clipPath');
var $debois$elm_dom$DOM$offsetHeight = A2($elm$json$Json$Decode$field, 'offsetHeight', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetWidth = A2($elm$json$Json$Decode$field, 'offsetWidth', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetLeft = A2($elm$json$Json$Decode$field, 'offsetLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return $elm$json$Json$Decode$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$json$Json$Decode$field,
					'offsetParent',
					$elm$json$Json$Decode$null(x)),
					A2($elm$json$Json$Decode$field, 'offsetParent', decoder)
				]));
	});
var $debois$elm_dom$DOM$offsetTop = A2($elm$json$Json$Decode$field, 'offsetTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollLeft = A2($elm$json$Json$Decode$field, 'scrollLeft', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$scrollTop = A2($elm$json$Json$Decode$field, 'scrollTop', $elm$json$Json$Decode$float);
var $debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			$elm$json$Json$Decode$andThen,
			function (_v0) {
				var x_ = _v0.a;
				var y_ = _v0.b;
				return A2(
					$debois$elm_dom$DOM$offsetParent,
					_Utils_Tuple2(x_, y_),
					A2($debois$elm_dom$DOM$position, x_, y_));
			},
			A5(
				$elm$json$Json$Decode$map4,
				F4(
					function (scrollLeftP, scrollTopP, offsetLeftP, offsetTopP) {
						return _Utils_Tuple2((x + offsetLeftP) - scrollLeftP, (y + offsetTopP) - scrollTopP);
					}),
				$debois$elm_dom$DOM$scrollLeft,
				$debois$elm_dom$DOM$scrollTop,
				$debois$elm_dom$DOM$offsetLeft,
				$debois$elm_dom$DOM$offsetTop));
	});
var $debois$elm_dom$DOM$boundingClientRect = A4(
	$elm$json$Json$Decode$map3,
	F3(
		function (_v0, width, height) {
			var x = _v0.a;
			var y = _v0.b;
			return {height: height, left: x, top: y, width: width};
		}),
	A2($debois$elm_dom$DOM$position, 0, 0),
	$debois$elm_dom$DOM$offsetWidth,
	$debois$elm_dom$DOM$offsetHeight);
var $debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'parentElement', decoder);
};
function $terezka$elm_charts$Internal$Svg$cyclic$decodePosition() {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$debois$elm_dom$DOM$boundingClientRect,
				$elm$json$Json$Decode$lazy(
				function (_v0) {
					return $debois$elm_dom$DOM$parentElement(
						$terezka$elm_charts$Internal$Svg$cyclic$decodePosition());
				})
			]));
}
try {
	var $terezka$elm_charts$Internal$Svg$decodePosition = $terezka$elm_charts$Internal$Svg$cyclic$decodePosition();
	$terezka$elm_charts$Internal$Svg$cyclic$decodePosition = function () {
		return $terezka$elm_charts$Internal$Svg$decodePosition;
	};
} catch ($) {
	throw 'Some top-level definitions from `Internal.Svg` are causing infinite recursion:\n\n  ┌─────┐\n  │    decodePosition\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.1/bad-recursion to learn how to fix it!';}
var $terezka$elm_charts$Internal$Coordinates$toCartesianX = F2(
	function (plane, value) {
		return A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, value - plane.x.marginMin) + plane.x.min;
	});
var $terezka$elm_charts$Internal$Coordinates$toCartesianY = F2(
	function (plane, value) {
		return ($terezka$elm_charts$Internal$Coordinates$range(plane.y) - A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, value - plane.y.marginMin)) + plane.y.min;
	});
var $terezka$elm_charts$Internal$Svg$fromSvg = F2(
	function (plane, point) {
		return {
			x: A2($terezka$elm_charts$Internal$Coordinates$toCartesianX, plane, point.x),
			y: A2($terezka$elm_charts$Internal$Coordinates$toCartesianY, plane, point.y)
		};
	});
var $debois$elm_dom$DOM$target = function (decoder) {
	return A2($elm$json$Json$Decode$field, 'target', decoder);
};
var $terezka$elm_charts$Internal$Svg$decoder = F2(
	function (plane, toMsg) {
		var handle = F3(
			function (mouseX, mouseY, box) {
				var yPrev = plane.y;
				var xPrev = plane.x;
				var widthPercent = box.width / plane.x.length;
				var heightPercent = box.height / plane.y.length;
				var newPlane = _Utils_update(
					plane,
					{
						x: _Utils_update(
							xPrev,
							{length: box.width, marginMax: plane.x.marginMax * widthPercent, marginMin: plane.x.marginMin * widthPercent}),
						y: _Utils_update(
							yPrev,
							{length: box.height, marginMax: plane.y.marginMax * heightPercent, marginMin: plane.y.marginMin * heightPercent})
					});
				var searched = A2(
					$terezka$elm_charts$Internal$Svg$fromSvg,
					newPlane,
					{x: mouseX - box.left, y: mouseY - box.top});
				return A2(toMsg, newPlane, searched);
			});
		return A4(
			$elm$json$Json$Decode$map3,
			handle,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			$debois$elm_dom$DOM$target($terezka$elm_charts$Internal$Svg$decodePosition));
	});
var $elm$svg$Svg$Events$on = $elm$html$Html$Events$on;
var $terezka$elm_charts$Internal$Svg$container = F5(
	function (plane, config, below, chartEls, above) {
		var toEvent = function (event) {
			return A2(
				$elm$svg$Svg$Events$on,
				event.name,
				A2($terezka$elm_charts$Internal$Svg$decoder, plane, event.handler));
		};
		var svgAttrsSize = config.responsive ? _List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox(
				'0 0 ' + ($elm$core$String$fromFloat(plane.x.length) + (' ' + $elm$core$String$fromFloat(plane.y.length)))),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]) : _List_fromArray(
			[
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(plane.x.length)),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(plane.y.length)),
				A2($elm$html$Html$Attributes$style, 'display', 'block')
			]);
		var htmlAttrsSize = config.responsive ? _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '100%')
			]) : _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				$elm$core$String$fromFloat(plane.x.length) + 'px'),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				$elm$core$String$fromFloat(plane.y.length) + 'px')
			]);
		var htmlAttrsDef = _List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-charts__container-inner')
			]);
		var htmlAttrs = _Utils_ap(
			config.htmlAttrs,
			_Utils_ap(htmlAttrsDef, htmlAttrsSize));
		var chartPosition = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$x(
				$elm$core$String$fromFloat(plane.x.marginMin)),
				$elm$svg$Svg$Attributes$y(
				$elm$core$String$fromFloat(plane.y.marginMin)),
				$elm$svg$Svg$Attributes$width(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerWidth(plane))),
				$elm$svg$Svg$Attributes$height(
				$elm$core$String$fromFloat(
					$terezka$elm_charts$Internal$Coordinates$innerHeight(plane))),
				$elm$svg$Svg$Attributes$fill('transparent')
			]);
		var clipPathDefs = A2(
			$elm$svg$Svg$defs,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$clipPath,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$id(
							$terezka$elm_charts$Internal$Coordinates$toId(plane))
						]),
					_List_fromArray(
						[
							A2($elm$svg$Svg$rect, chartPosition, _List_Nil)
						]))
				]));
		var catcher = A2(
			$elm$svg$Svg$rect,
			_Utils_ap(
				chartPosition,
				A2($elm$core$List$map, toEvent, config.events)),
			_List_Nil);
		var chart = A2(
			$elm$svg$Svg$svg,
			_Utils_ap(svgAttrsSize, config.attrs),
			_Utils_ap(
				_List_fromArray(
					[clipPathDefs]),
				_Utils_ap(
					chartEls,
					_List_fromArray(
						[catcher]))));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('elm-charts__container'),
					A2($elm$html$Html$Attributes$style, 'position', 'relative')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					htmlAttrs,
					_Utils_ap(
						below,
						_Utils_ap(
							_List_fromArray(
								[chart]),
							above)))
				]));
	});
var $terezka$elm_charts$Chart$Attributes$lowest = F3(
	function (v, edit, b) {
		return _Utils_update(
			b,
			{
				min: A3(edit, v, b.min, b.dataMin)
			});
	});
var $terezka$elm_charts$Chart$Attributes$orLower = F3(
	function (least, real, _v0) {
		return (_Utils_cmp(real, least) > 0) ? least : real;
	});
var $terezka$elm_charts$Chart$definePlane = F2(
	function (config, elements) {
		var width = A2($elm$core$Basics$max, 1, (config.width - config.padding.left) - config.padding.right);
		var toLimit = F5(
			function (length, marginMin, marginMax, min, max) {
				return {dataMax: max, dataMin: min, length: length, marginMax: marginMax, marginMin: marginMin, max: max, min: min};
			});
		var height = A2($elm$core$Basics$max, 1, (config.height - config.padding.bottom) - config.padding.top);
		var fixSingles = function (bs) {
			return _Utils_eq(bs.min, bs.max) ? _Utils_update(
				bs,
				{max: bs.min + 10}) : bs;
		};
		var collectLimits = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 'BarsElement':
						var lims = el.a;
						return _Utils_ap(acc, lims);
					case 'CustomElement':
						return acc;
					case 'AxisElement':
						return acc;
					case 'TicksElement':
						return acc;
					case 'TickElement':
						return acc;
					case 'LabelsElement':
						return acc;
					case 'LabelElement':
						return acc;
					case 'GridElement':
						return acc;
					case 'SubElements':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, collectLimits, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		var limits_ = function (pos) {
			return function (_v3) {
				var x = _v3.x;
				var y = _v3.y;
				return {
					x: fixSingles(x),
					y: fixSingles(y)
				};
			}(
				{
					x: A5(toLimit, width, config.margin.left, config.margin.right, pos.x1, pos.x2),
					y: A5(toLimit, height, config.margin.top, config.margin.bottom, pos.y1, pos.y2)
				});
		}(
			A2(
				$terezka$elm_charts$Internal$Coordinates$foldPosition,
				$elm$core$Basics$identity,
				A3($elm$core$List$foldl, collectLimits, _List_Nil, elements)));
		var calcRange = function () {
			var _v2 = config.range;
			if (!_v2.b) {
				return limits_.x;
			} else {
				var some = _v2;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.x,
					some);
			}
		}();
		var calcDomain = function () {
			var _v1 = config.domain;
			if (!_v1.b) {
				return A3($terezka$elm_charts$Chart$Attributes$lowest, 0, $terezka$elm_charts$Chart$Attributes$orLower, limits_.y);
			} else {
				var some = _v1;
				return A3(
					$elm$core$List$foldl,
					F2(
						function (f, b) {
							return f(b);
						}),
					limits_.y,
					some);
			}
		}();
		var unpadded = {x: calcRange, y: calcDomain};
		var scalePadX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX(unpadded);
		var xMax = calcRange.max + scalePadX(config.padding.right);
		var xMin = calcRange.min - scalePadX(config.padding.left);
		var scalePadY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY(unpadded);
		var yMax = calcDomain.max + scalePadY(config.padding.top);
		var yMin = calcDomain.min - scalePadY(config.padding.bottom);
		return {
			x: _Utils_update(
				calcRange,
				{
					length: config.width,
					max: A2($elm$core$Basics$max, xMin, xMax),
					min: A2($elm$core$Basics$min, xMin, xMax)
				}),
			y: _Utils_update(
				calcDomain,
				{
					length: config.height,
					max: A2($elm$core$Basics$max, yMin, yMax),
					min: A2($elm$core$Basics$min, yMin, yMax)
				})
		};
	});
var $terezka$elm_charts$Chart$getItems = F2(
	function (plane, elements) {
		var toItems = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						var items = el.b;
						return _Utils_ap(acc, items);
					case 'BarsElement':
						var items = el.b;
						return _Utils_ap(acc, items);
					case 'CustomElement':
						var item = el.a;
						return _Utils_ap(
							acc,
							_List_fromArray(
								[item]));
					case 'AxisElement':
						var func = el.a;
						return acc;
					case 'TicksElement':
						return acc;
					case 'TickElement':
						return acc;
					case 'LabelsElement':
						return acc;
					case 'LabelElement':
						return acc;
					case 'GridElement':
						return acc;
					case 'SubElements':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, toItems, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		return A3($elm$core$List$foldl, toItems, _List_Nil, elements);
	});
var $terezka$elm_charts$Chart$getLegends = function (elements) {
	var toLegends = F2(
		function (el, acc) {
			switch (el.$) {
				case 'Indexed':
					return acc;
				case 'SeriesElement':
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 'BarsElement':
					var legends_ = el.c;
					return _Utils_ap(acc, legends_);
				case 'CustomElement':
					return acc;
				case 'AxisElement':
					return acc;
				case 'TicksElement':
					return acc;
				case 'TickElement':
					return acc;
				case 'LabelsElement':
					return acc;
				case 'LabelElement':
					return acc;
				case 'GridElement':
					return acc;
				case 'SubElements':
					return acc;
				case 'ListOfElements':
					var subs = el.a;
					return A3($elm$core$List$foldl, toLegends, acc, subs);
				case 'SvgElement':
					return acc;
				default:
					return acc;
			}
		});
	return A3($elm$core$List$foldl, toLegends, _List_Nil, elements);
};
var $terezka$elm_charts$Chart$TickValues = F4(
	function (xAxis, yAxis, xs, ys) {
		return {xAxis: xAxis, xs: xs, yAxis: yAxis, ys: ys};
	});
var $terezka$elm_charts$Chart$getTickValues = F3(
	function (plane, items, elements) {
		var toValues = F2(
			function (el, acc) {
				switch (el.$) {
					case 'Indexed':
						return acc;
					case 'SeriesElement':
						return acc;
					case 'BarsElement':
						var func = el.d;
						return A2(func, plane, acc);
					case 'CustomElement':
						var func = el.b;
						return acc;
					case 'AxisElement':
						var func = el.a;
						return A2(func, plane, acc);
					case 'TicksElement':
						var func = el.a;
						return A2(func, plane, acc);
					case 'TickElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'LabelsElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'LabelElement':
						var toC = el.a;
						var func = el.b;
						return A3(
							func,
							plane,
							toC(plane),
							acc);
					case 'SubElements':
						var func = el.a;
						return A3(
							$elm$core$List$foldl,
							toValues,
							acc,
							A2(func, plane, items));
					case 'GridElement':
						return acc;
					case 'ListOfElements':
						var subs = el.a;
						return A3($elm$core$List$foldl, toValues, acc, subs);
					case 'SvgElement':
						return acc;
					default:
						return acc;
				}
			});
		return A3(
			$elm$core$List$foldl,
			toValues,
			A4($terezka$elm_charts$Chart$TickValues, _List_Nil, _List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$GridElement = function (a) {
	return {$: 'GridElement', a: a};
};
var $terezka$elm_charts$Internal$Svg$Circle = {$: 'Circle'};
var $terezka$elm_charts$Chart$Attributes$circle = function (config) {
	return _Utils_update(
		config,
		{
			shape: $elm$core$Maybe$Just($terezka$elm_charts$Internal$Svg$Circle)
		});
};
var $terezka$elm_charts$Internal$Helpers$darkGray = 'rgb(200 200 200)';
var $terezka$elm_charts$Chart$Attributes$dashed = F2(
	function (value, config) {
		return _Utils_update(
			config,
			{dashed: value});
	});
var $terezka$elm_charts$Internal$Svg$defaultDot = {border: '', borderWidth: 0, color: $terezka$elm_charts$Internal$Helpers$pink, hideOverflow: false, highlight: 0, highlightColor: '', highlightWidth: 5, opacity: 1, shape: $elm$core$Maybe$Nothing, size: 6};
var $terezka$elm_charts$Internal$Svg$isWithinPlane = F3(
	function (plane, x, y) {
		return _Utils_eq(
			A3($elm$core$Basics$clamp, plane.x.min, plane.x.max, x),
			x) && _Utils_eq(
			A3($elm$core$Basics$clamp, plane.y.min, plane.y.max, y),
			y);
	});
var $elm$core$Basics$pi = _Basics_pi;
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $terezka$elm_charts$Internal$Svg$plusPath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(area_ / 4) + off;
		var r6 = side / 2;
		var r3 = side;
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_ - r6) + (' ' + $elm$core$String$fromFloat(((y_ - r3) - r6) + off))),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat(r3),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(r3 - off),
					'h' + $elm$core$String$fromFloat(r3),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(r3 - off),
					'v' + $elm$core$String$fromFloat(-r3),
					'h' + $elm$core$String$fromFloat((-r3) + off),
					'v' + $elm$core$String$fromFloat((-r3) + off),
					'h' + $elm$core$String$fromFloat(-r3),
					'v' + $elm$core$String$fromFloat(r3 - off)
				]));
	});
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $elm$core$Basics$tan = _Basics_tan;
var $terezka$elm_charts$Internal$Svg$trianglePath = F4(
	function (area_, off, x_, y_) {
		var side = $elm$core$Basics$sqrt(
			(area_ * 4) / $elm$core$Basics$sqrt(3)) + (off * $elm$core$Basics$sqrt(3));
		var height = ($elm$core$Basics$sqrt(3) * side) / 2;
		var fromMiddle = height - (($elm$core$Basics$tan(
			$elm$core$Basics$degrees(30)) * side) / 2);
		return A2(
			$elm$core$String$join,
			' ',
			_List_fromArray(
				[
					'M' + ($elm$core$String$fromFloat(x_) + (' ' + $elm$core$String$fromFloat(y_ - fromMiddle))),
					'l' + ($elm$core$String$fromFloat((-side) / 2) + (' ' + $elm$core$String$fromFloat(height))),
					'h' + $elm$core$String$fromFloat(side),
					'z'
				]));
	});
var $terezka$elm_charts$Internal$Svg$dot = F5(
	function (plane, toX, toY, config, datum_) {
		var yOrg = toY(datum_);
		var y_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, yOrg);
		var xOrg = toX(datum_);
		var x_ = A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, xOrg);
		var styleAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(
				(config.border === '') ? config.color : config.border),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.borderWidth)),
				$elm$svg$Svg$Attributes$fillOpacity(
				$elm$core$String$fromFloat(config.opacity)),
				$elm$svg$Svg$Attributes$fill(config.color),
				$elm$svg$Svg$Attributes$class('elm-charts__dot'),
				config.hideOverflow ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
			]);
		var showDot = A3($terezka$elm_charts$Internal$Svg$isWithinPlane, plane, xOrg, yOrg) || config.hideOverflow;
		var highlightColor = (config.highlightColor === '') ? config.color : config.highlightColor;
		var highlightAttrs = _List_fromArray(
			[
				$elm$svg$Svg$Attributes$stroke(highlightColor),
				$elm$svg$Svg$Attributes$strokeWidth(
				$elm$core$String$fromFloat(config.highlightWidth)),
				$elm$svg$Svg$Attributes$strokeOpacity(
				$elm$core$String$fromFloat(config.highlight)),
				$elm$svg$Svg$Attributes$fill('transparent'),
				$elm$svg$Svg$Attributes$class('elm-charts__dot-highlight')
			]);
		var view = F3(
			function (toEl, highlightOff, toAttrs) {
				return (config.highlight > 0) ? A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__dot-container')
						]),
					_List_fromArray(
						[
							A2(
							toEl,
							_Utils_ap(
								toAttrs(highlightOff),
								highlightAttrs),
							_List_Nil),
							A2(
							toEl,
							_Utils_ap(
								toAttrs(0),
								styleAttrs),
							_List_Nil)
						])) : A2(
					toEl,
					_Utils_ap(
						toAttrs(0),
						styleAttrs),
					_List_Nil);
			});
		var area_ = (2 * $elm$core$Basics$pi) * config.size;
		if (!showDot) {
			return $elm$svg$Svg$text('');
		} else {
			var _v0 = config.shape;
			if (_v0.$ === 'Nothing') {
				return $elm$svg$Svg$text('');
			} else {
				switch (_v0.a.$) {
					case 'Circle':
						var _v1 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$circle,
							config.highlightWidth / 2,
							function (off) {
								var radius = $elm$core$Basics$sqrt(area_ / $elm$core$Basics$pi);
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$cx(
										$elm$core$String$fromFloat(x_)),
										$elm$svg$Svg$Attributes$cy(
										$elm$core$String$fromFloat(y_)),
										$elm$svg$Svg$Attributes$r(
										$elm$core$String$fromFloat(radius + off))
									]);
							});
					case 'Triangle':
						var _v2 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$trianglePath, area_, off, x_, y_))
									]);
							});
					case 'Square':
						var _v3 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.highlightWidth,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff))
									]);
							});
					case 'Diamond':
						var _v4 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$rect,
							config.highlightWidth,
							function (off) {
								var side = $elm$core$Basics$sqrt(area_);
								var sideOff = side + off;
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$x(
										$elm$core$String$fromFloat(x_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$y(
										$elm$core$String$fromFloat(y_ - (sideOff / 2))),
										$elm$svg$Svg$Attributes$width(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$height(
										$elm$core$String$fromFloat(sideOff)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					case 'Cross':
						var _v5 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_)),
										$elm$svg$Svg$Attributes$transform(
										'rotate(45 ' + ($elm$core$String$fromFloat(x_) + (' ' + ($elm$core$String$fromFloat(y_) + ')'))))
									]);
							});
					default:
						var _v6 = _v0.a;
						return A3(
							view,
							$elm$svg$Svg$path,
							config.highlightWidth,
							function (off) {
								return _List_fromArray(
									[
										$elm$svg$Svg$Attributes$d(
										A4($terezka$elm_charts$Internal$Svg$plusPath, area_, off, x_, y_))
									]);
							});
				}
			}
		}
	});
var $terezka$elm_charts$Chart$Svg$dot = F4(
	function (plane, toX, toY, edits) {
		return A4(
			$terezka$elm_charts$Internal$Svg$dot,
			plane,
			toX,
			toY,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultDot));
	});
var $terezka$elm_charts$Internal$Helpers$gray = '#EFF2FA';
var $terezka$elm_charts$Internal$Svg$defaultLine = {attrs: _List_Nil, _break: false, color: 'rgb(210, 210, 210)', dashed: _List_Nil, flip: false, hideOverflow: false, opacity: 1, tickDirection: -90, tickLength: 0, width: 1, x1: $elm$core$Maybe$Nothing, x2: $elm$core$Maybe$Nothing, x2Svg: $elm$core$Maybe$Nothing, xOff: 0, y1: $elm$core$Maybe$Nothing, y2: $elm$core$Maybe$Nothing, y2Svg: $elm$core$Maybe$Nothing, yOff: 0};
var $elm$core$Basics$cos = _Basics_cos;
var $terezka$elm_charts$Internal$Svg$lengthInCartesianX = $terezka$elm_charts$Internal$Coordinates$scaleCartesianX;
var $terezka$elm_charts$Internal$Svg$lengthInCartesianY = $terezka$elm_charts$Internal$Coordinates$scaleCartesianY;
var $elm$core$Basics$sin = _Basics_sin;
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $terezka$elm_charts$Internal$Svg$line = F2(
	function (plane, config) {
		var angle = $elm$core$Basics$degrees(config.tickDirection);
		var _v0 = function () {
			var _v3 = _Utils_Tuple3(
				_Utils_Tuple2(config.x1, config.x2),
				_Utils_Tuple2(config.y1, config.y2),
				_Utils_Tuple2(config.x2Svg, config.y2Svg));
			if (_v3.a.a.$ === 'Just') {
				if (_v3.a.b.$ === 'Just') {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v4 = _v3.a;
							var a = _v4.a.a;
							var b = _v4.b.a;
							var _v5 = _v3.b;
							var _v6 = _v5.a;
							var _v7 = _v5.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(plane.y.min, plane.y.min));
						} else {
							var _v38 = _v3.a;
							var a = _v38.a.a;
							var b = _v38.b.a;
							var _v39 = _v3.b;
							var _v40 = _v39.a;
							var c = _v39.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						}
					} else {
						if (_v3.b.b.$ === 'Nothing') {
							var _v41 = _v3.a;
							var a = _v41.a.a;
							var b = _v41.b.a;
							var _v42 = _v3.b;
							var c = _v42.a.a;
							var _v43 = _v42.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, b),
								_Utils_Tuple2(c, c));
						} else {
							return _Utils_Tuple2(
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.x.min, config.x1),
									A2($elm$core$Maybe$withDefault, plane.x.max, config.x2)),
								_Utils_Tuple2(
									A2($elm$core$Maybe$withDefault, plane.y.min, config.y1),
									A2($elm$core$Maybe$withDefault, plane.y.max, config.y2)));
						}
					}
				} else {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v8 = _v3.a;
							var a = _v8.a.a;
							var _v9 = _v8.b;
							var _v10 = _v3.b;
							var _v11 = _v10.a;
							var _v12 = _v10.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(a, a),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v51 = _v3.a;
									var a = _v51.a.a;
									var _v52 = _v51.b;
									var _v53 = _v3.b;
									var _v54 = _v53.a;
									var b = _v53.b.a;
									var _v55 = _v3.c;
									var xOff = _v55.a.a;
									var yOff = _v55.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v56 = _v3.a;
									var a = _v56.a.a;
									var _v57 = _v56.b;
									var _v58 = _v3.b;
									var _v59 = _v58.a;
									var b = _v58.b.a;
									var _v60 = _v3.c;
									var xOff = _v60.a.a;
									var _v61 = _v60.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v44 = _v3.a;
									var a = _v44.a.a;
									var _v45 = _v44.b;
									var _v46 = _v3.b;
									var _v47 = _v46.a;
									var b = _v46.b.a;
									var _v48 = _v3.c;
									var _v49 = _v48.a;
									var _v50 = _v48.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v62 = _v3.a;
									var a = _v62.a.a;
									var _v63 = _v62.b;
									var _v64 = _v3.b;
									var _v65 = _v64.a;
									var b = _v64.b.a;
									var _v66 = _v3.c;
									var _v67 = _v66.a;
									var yOff = _v66.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v35 = _v3.a;
							var c = _v35.a.a;
							var _v36 = _v35.b;
							var _v37 = _v3.b;
							var a = _v37.a.a;
							var b = _v37.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v75 = _v3.a;
									var a = _v75.a.a;
									var _v76 = _v75.b;
									var _v77 = _v3.b;
									var b = _v77.a.a;
									var _v78 = _v77.b;
									var _v79 = _v3.c;
									var xOff = _v79.a.a;
									var yOff = _v79.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v80 = _v3.a;
									var a = _v80.a.a;
									var _v81 = _v80.b;
									var _v82 = _v3.b;
									var b = _v82.a.a;
									var _v83 = _v82.b;
									var _v84 = _v3.c;
									var xOff = _v84.a.a;
									var _v85 = _v84.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v68 = _v3.a;
									var a = _v68.a.a;
									var _v69 = _v68.b;
									var _v70 = _v3.b;
									var b = _v70.a.a;
									var _v71 = _v70.b;
									var _v72 = _v3.c;
									var _v73 = _v72.a;
									var _v74 = _v72.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v86 = _v3.a;
									var a = _v86.a.a;
									var _v87 = _v86.b;
									var _v88 = _v3.b;
									var b = _v88.a.a;
									var _v89 = _v88.b;
									var _v90 = _v3.c;
									var _v91 = _v90.a;
									var yOff = _v90.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				}
			} else {
				if (_v3.a.b.$ === 'Just') {
					if (_v3.b.a.$ === 'Nothing') {
						if (_v3.b.b.$ === 'Nothing') {
							var _v13 = _v3.a;
							var _v14 = _v13.a;
							var b = _v13.b.a;
							var _v15 = _v3.b;
							var _v16 = _v15.a;
							var _v17 = _v15.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(b, b),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v99 = _v3.a;
									var _v100 = _v99.a;
									var a = _v99.b.a;
									var _v101 = _v3.b;
									var _v102 = _v101.a;
									var b = _v101.b.a;
									var _v103 = _v3.c;
									var xOff = _v103.a.a;
									var yOff = _v103.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v104 = _v3.a;
									var _v105 = _v104.a;
									var a = _v104.b.a;
									var _v106 = _v3.b;
									var _v107 = _v106.a;
									var b = _v106.b.a;
									var _v108 = _v3.c;
									var xOff = _v108.a.a;
									var _v109 = _v108.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v92 = _v3.a;
									var _v93 = _v92.a;
									var a = _v92.b.a;
									var _v94 = _v3.b;
									var _v95 = _v94.a;
									var b = _v94.b.a;
									var _v96 = _v3.c;
									var _v97 = _v96.a;
									var _v98 = _v96.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v110 = _v3.a;
									var _v111 = _v110.a;
									var a = _v110.b.a;
									var _v112 = _v3.b;
									var _v113 = _v112.a;
									var b = _v112.b.a;
									var _v114 = _v3.c;
									var _v115 = _v114.a;
									var yOff = _v114.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v32 = _v3.a;
							var _v33 = _v32.a;
							var c = _v32.b.a;
							var _v34 = _v3.b;
							var a = _v34.a.a;
							var b = _v34.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(c, c),
								_Utils_Tuple2(a, b));
						} else {
							if (_v3.c.a.$ === 'Just') {
								if (_v3.c.b.$ === 'Just') {
									var _v123 = _v3.a;
									var _v124 = _v123.a;
									var a = _v123.b.a;
									var _v125 = _v3.b;
									var b = _v125.a.a;
									var _v126 = _v125.b;
									var _v127 = _v3.c;
									var xOff = _v127.a.a;
									var yOff = _v127.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								} else {
									var _v128 = _v3.a;
									var _v129 = _v128.a;
									var a = _v128.b.a;
									var _v130 = _v3.b;
									var b = _v130.a.a;
									var _v131 = _v130.b;
									var _v132 = _v3.c;
									var xOff = _v132.a.a;
									var _v133 = _v132.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(
											a,
											a + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianX, plane, xOff)),
										_Utils_Tuple2(b, b));
								}
							} else {
								if (_v3.c.b.$ === 'Nothing') {
									var _v116 = _v3.a;
									var _v117 = _v116.a;
									var a = _v116.b.a;
									var _v118 = _v3.b;
									var b = _v118.a.a;
									var _v119 = _v118.b;
									var _v120 = _v3.c;
									var _v121 = _v120.a;
									var _v122 = _v120.b;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, plane.x.max),
										_Utils_Tuple2(b, b));
								} else {
									var _v134 = _v3.a;
									var _v135 = _v134.a;
									var a = _v134.b.a;
									var _v136 = _v3.b;
									var b = _v136.a.a;
									var _v137 = _v136.b;
									var _v138 = _v3.c;
									var _v139 = _v138.a;
									var yOff = _v138.b.a;
									return _Utils_Tuple2(
										_Utils_Tuple2(a, a),
										_Utils_Tuple2(
											b,
											b + A2($terezka$elm_charts$Internal$Coordinates$scaleCartesianY, plane, yOff)));
								}
							}
						}
					}
				} else {
					if (_v3.b.a.$ === 'Just') {
						if (_v3.b.b.$ === 'Just') {
							var _v18 = _v3.a;
							var _v19 = _v18.a;
							var _v20 = _v18.b;
							var _v21 = _v3.b;
							var a = _v21.a.a;
							var b = _v21.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.min),
								_Utils_Tuple2(a, b));
						} else {
							var _v22 = _v3.a;
							var _v23 = _v22.a;
							var _v24 = _v22.b;
							var _v25 = _v3.b;
							var a = _v25.a.a;
							var _v26 = _v25.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(a, a));
						}
					} else {
						if (_v3.b.b.$ === 'Just') {
							var _v27 = _v3.a;
							var _v28 = _v27.a;
							var _v29 = _v27.b;
							var _v30 = _v3.b;
							var _v31 = _v30.a;
							var b = _v30.b.a;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(b, b));
						} else {
							var _v140 = _v3.a;
							var _v141 = _v140.a;
							var _v142 = _v140.b;
							var _v143 = _v3.b;
							var _v144 = _v143.a;
							var _v145 = _v143.b;
							return _Utils_Tuple2(
								_Utils_Tuple2(plane.x.min, plane.x.max),
								_Utils_Tuple2(plane.y.min, plane.y.max));
						}
					}
				}
			}
		}();
		var _v1 = _v0.a;
		var x1 = _v1.a;
		var x2 = _v1.b;
		var _v2 = _v0.b;
		var y1 = _v2.a;
		var y2 = _v2.b;
		var x1_ = x1 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.xOff);
		var x2_ = x2 + A2($terezka$elm_charts$Internal$Svg$lengthInCartesianX, plane, config.xOff);
		var y1_ = y1 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.yOff);
		var y2_ = y2 - A2($terezka$elm_charts$Internal$Svg$lengthInCartesianY, plane, config.yOff);
		var _v146 = (config.tickLength > 0) ? _Utils_Tuple2(
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianX,
				plane,
				$elm$core$Basics$cos(angle) * config.tickLength),
			A2(
				$terezka$elm_charts$Internal$Svg$lengthInCartesianY,
				plane,
				$elm$core$Basics$sin(angle) * config.tickLength)) : _Utils_Tuple2(0, 0);
		var tickOffsetX = _v146.a;
		var tickOffsetY = _v146.b;
		var cmds = config.flip ? _Utils_ap(
			(config.tickLength > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_ + tickOffsetX, y2_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x2_, y2_)
				]),
			_Utils_ap(
				config._break ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y1_),
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
					]),
				(config.tickLength > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_ + tickOffsetX, y1_ + tickOffsetY)
					]) : _List_Nil)) : _Utils_ap(
			(config.tickLength > 0) ? _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_ + tickOffsetX, y1_ + tickOffsetY),
					A2($terezka$elm_charts$Internal$Commands$Line, x1_, y1_)
				]) : _List_fromArray(
				[
					A2($terezka$elm_charts$Internal$Commands$Move, x1_, y1_)
				]),
			_Utils_ap(
				config._break ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x1_, y2_),
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]) : _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_, y2_)
					]),
				(config.tickLength > 0) ? _List_fromArray(
					[
						A2($terezka$elm_charts$Internal$Commands$Line, x2_ + tickOffsetX, y2_ + tickOffsetY)
					]) : _List_Nil));
		return A4(
			$terezka$elm_charts$Internal$Svg$withAttrs,
			config.attrs,
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('elm-charts__line'),
					$elm$svg$Svg$Attributes$fill('transparent'),
					$elm$svg$Svg$Attributes$stroke(config.color),
					$elm$svg$Svg$Attributes$strokeWidth(
					$elm$core$String$fromFloat(config.width)),
					$elm$svg$Svg$Attributes$strokeOpacity(
					$elm$core$String$fromFloat(config.opacity)),
					$elm$svg$Svg$Attributes$strokeDasharray(
					A2(
						$elm$core$String$join,
						' ',
						A2($elm$core$List$map, $elm$core$String$fromFloat, config.dashed))),
					$elm$svg$Svg$Attributes$d(
					A2($terezka$elm_charts$Internal$Commands$description, plane, cmds)),
					config.hideOverflow ? $terezka$elm_charts$Internal$Svg$withinChartArea(plane) : $elm$svg$Svg$Attributes$class('')
				]),
			_List_Nil);
	});
var $terezka$elm_charts$Chart$Svg$line = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$line,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultLine));
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $terezka$elm_charts$Chart$Attributes$size = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{size: v});
	});
var $terezka$elm_charts$Chart$Attributes$width = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{width: v});
	});
var $terezka$elm_charts$Chart$Attributes$x1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				x1: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$Attributes$y1 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				y1: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$grid = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{color: '', dashed: _List_Nil, dotGrid: false, width: 0});
	var width = (!config.width) ? (config.dotGrid ? 0.5 : 1) : config.width;
	var color = $elm$core$String$isEmpty(config.color) ? (config.dotGrid ? $terezka$elm_charts$Internal$Helpers$darkGray : $terezka$elm_charts$Internal$Helpers$gray) : config.color;
	var toDot = F4(
		function (vs, p, x, y) {
			return (A2($elm$core$List$member, x, vs.xAxis) || A2($elm$core$List$member, y, vs.yAxis)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A5(
					$terezka$elm_charts$Chart$Svg$dot,
					p,
					function ($) {
						return $.x;
					},
					function ($) {
						return $.y;
					},
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$size(width),
							$terezka$elm_charts$Chart$Attributes$circle
						]),
					{x: x, y: y}));
		});
	var toXGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.xAxis) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$x1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.dashed)
						])));
		});
	var toYGrid = F3(
		function (vs, p, v) {
			return A2($elm$core$List$member, v, vs.yAxis) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$terezka$elm_charts$Chart$Svg$line,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(color),
							$terezka$elm_charts$Chart$Attributes$width(width),
							$terezka$elm_charts$Chart$Attributes$y1(v),
							$terezka$elm_charts$Chart$Attributes$dashed(config.dashed)
						])));
		});
	return $terezka$elm_charts$Chart$GridElement(
		F2(
			function (p, vs) {
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__grid')
						]),
					config.dotGrid ? A2(
						$elm$core$List$concatMap,
						function (x) {
							return A2(
								$elm$core$List$filterMap,
								A3(toDot, vs, p, x),
								vs.ys);
						},
						vs.xs) : _List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__x-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toXGrid, vs, p),
								vs.xs)),
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$class('elm-charts__y-grid')
								]),
							A2(
								$elm$core$List$filterMap,
								A2(toYGrid, vs, p),
								vs.ys))
						]));
			}));
};
var $terezka$elm_charts$Chart$viewElements = F6(
	function (config, plane, tickValues, allItems, allLegends, elements) {
		var viewOne = F2(
			function (el, _v0) {
				var before = _v0.a;
				var chart_ = _v0.b;
				var after = _v0.c;
				switch (el.$) {
					case 'Indexed':
						return _Utils_Tuple3(before, chart_, after);
					case 'SeriesElement':
						var view = el.d;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'BarsElement':
						var view = el.e;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'CustomElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'AxisElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'TicksElement':
						var view = el.b;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					case 'TickElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'LabelsElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'LabelElement':
						var toC = el.a;
						var view = el.c;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(
									view,
									plane,
									toC(plane)),
								chart_),
							after);
					case 'GridElement':
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								A2(view, plane, tickValues),
								chart_),
							after);
					case 'SubElements':
						var func = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							A2(func, plane, allItems));
					case 'ListOfElements':
						var els = el.a;
						return A3(
							$elm$core$List$foldr,
							viewOne,
							_Utils_Tuple3(before, chart_, after),
							els);
					case 'SvgElement':
						var view = el.a;
						return _Utils_Tuple3(
							before,
							A2(
								$elm$core$List$cons,
								view(plane),
								chart_),
							after);
					default:
						var view = el.a;
						return _Utils_Tuple3(
							($elm$core$List$length(chart_) > 0) ? A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								before) : before,
							chart_,
							($elm$core$List$length(chart_) > 0) ? after : A2(
								$elm$core$List$cons,
								A2(view, plane, allLegends),
								after));
				}
			});
		return A3(
			$elm$core$List$foldr,
			viewOne,
			_Utils_Tuple3(_List_Nil, _List_Nil, _List_Nil),
			elements);
	});
var $terezka$elm_charts$Chart$chart = F2(
	function (edits, unindexedElements) {
		var indexedElements = function () {
			var toIndexedEl = F2(
				function (el, _v4) {
					var acc = _v4.a;
					var index = _v4.b;
					switch (el.$) {
						case 'Indexed':
							var toElAndIndex = el.a;
							var _v6 = toElAndIndex(index);
							var newEl = _v6.a;
							var newIndex = _v6.b;
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[newEl])),
								newIndex);
						case 'ListOfElements':
							var els = el.a;
							return A3(
								$elm$core$List$foldl,
								toIndexedEl,
								_Utils_Tuple2(acc, index),
								els);
						default:
							return _Utils_Tuple2(
								_Utils_ap(
									acc,
									_List_fromArray(
										[el])),
								index);
					}
				});
			return A3(
				$elm$core$List$foldl,
				toIndexedEl,
				_Utils_Tuple2(_List_Nil, 0),
				unindexedElements).a;
		}();
		var elements = function () {
			var isGrid = function (el) {
				if (el.$ === 'GridElement') {
					return true;
				} else {
					return false;
				}
			};
			return A2($elm$core$List$any, isGrid, indexedElements) ? indexedElements : A2(
				$elm$core$List$cons,
				$terezka$elm_charts$Chart$grid(_List_Nil),
				indexedElements);
		}();
		var legends_ = $terezka$elm_charts$Chart$getLegends(elements);
		var config = A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{
				attrs: _List_fromArray(
					[
						$elm$svg$Svg$Attributes$style('overflow: visible;')
					]),
				domain: _List_Nil,
				events: _List_Nil,
				height: 300,
				htmlAttrs: _List_Nil,
				margin: {bottom: 0, left: 0, right: 0, top: 0},
				padding: {bottom: 0, left: 0, right: 0, top: 0},
				range: _List_Nil,
				responsive: true,
				width: 300
			});
		var plane = A2($terezka$elm_charts$Chart$definePlane, config, elements);
		var items = A2($terezka$elm_charts$Chart$getItems, plane, elements);
		var toEvent = function (_v2) {
			var event_ = _v2.a;
			var _v1 = event_.decoder;
			var decoder = _v1.a;
			return A2(
				$terezka$elm_charts$Internal$Svg$Event,
				event_.name,
				decoder(items));
		};
		var tickValues = A3($terezka$elm_charts$Chart$getTickValues, plane, items, elements);
		var _v0 = A6($terezka$elm_charts$Chart$viewElements, config, plane, tickValues, items, legends_, elements);
		var beforeEls = _v0.a;
		var chartEls = _v0.b;
		var afterEls = _v0.c;
		return A5(
			$terezka$elm_charts$Internal$Svg$container,
			plane,
			{
				attrs: config.attrs,
				events: A2($elm$core$List$map, toEvent, config.events),
				htmlAttrs: config.htmlAttrs,
				responsive: config.responsive
			},
			beforeEls,
			chartEls,
			afterEls);
	});
var $terezka$elm_charts$Chart$each = F2(
	function (items, func) {
		return $terezka$elm_charts$Chart$SubElements(
			F2(
				function (p, _v0) {
					return A2(
						$elm$core$List$concatMap,
						func(p),
						items);
				}));
	});
var $terezka$elm_charts$Internal$Property$Stacked = function (a) {
	return {$: 'Stacked', a: a};
};
var $terezka$elm_charts$Internal$Property$format = F2(
	function (value, prop) {
		if (prop.$ === 'Property') {
			var con = prop.a;
			return $terezka$elm_charts$Internal$Property$Property(
				_Utils_update(
					con,
					{
						format: A2($elm$core$Basics$composeR, con.value, value)
					}));
		} else {
			var cons = prop.a;
			return $terezka$elm_charts$Internal$Property$Stacked(
				A2(
					$elm$core$List$map,
					function (con) {
						return _Utils_update(
							con,
							{
								format: A2($elm$core$Basics$composeR, con.value, value)
							});
					},
					cons));
		}
	});
var $terezka$elm_charts$Chart$format = function (func) {
	return $terezka$elm_charts$Internal$Property$format(
		function (v) {
			if (v.$ === 'Just') {
				var v_ = v.a;
				return func(v_);
			} else {
				return 'N/A';
			}
		});
};
var $terezka$elm_charts$Internal$Events$Decoder = function (a) {
	return {$: 'Decoder', a: a};
};
var $terezka$elm_charts$Internal$Svg$closestPoint = F2(
	function (pos, searched) {
		return {
			x: A3($elm$core$Basics$clamp, pos.x1, pos.x2, searched.x),
			y: A3($elm$core$Basics$clamp, pos.y1, pos.y2, searched.y)
		};
	});
var $terezka$elm_charts$Internal$Svg$distanceX = F3(
	function (plane, searched, point) {
		return $elm$core$Basics$abs(
			A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, point.x) - A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, searched.x));
	});
var $terezka$elm_charts$Internal$Svg$distanceY = F3(
	function (plane, searched, point) {
		return $elm$core$Basics$abs(
			A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, point.y) - A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, searched.y));
	});
var $elm$core$Basics$pow = _Basics_pow;
var $terezka$elm_charts$Internal$Svg$distanceSquared = F3(
	function (plane, searched, point) {
		return A2(
			$elm$core$Basics$pow,
			A3($terezka$elm_charts$Internal$Svg$distanceX, plane, searched, point),
			2) + A2(
			$elm$core$Basics$pow,
			A3($terezka$elm_charts$Internal$Svg$distanceY, plane, searched, point),
			2);
	});
var $terezka$elm_charts$Internal$Svg$keepOne = function (toPosition) {
	var toArea = function (a) {
		return function (pos) {
			return (pos.x1 - pos.x2) * (pos.y1 - pos.y2);
		}(
			toPosition(a));
	};
	var func = F2(
		function (one, acc) {
			var _v0 = $elm$core$List$head(acc);
			if (_v0.$ === 'Nothing') {
				return _List_fromArray(
					[one]);
			} else {
				var other = _v0.a;
				return _Utils_eq(
					toPosition(other),
					toPosition(one)) ? A2($elm$core$List$cons, other, acc) : ((_Utils_cmp(
					toArea(other),
					toArea(one)) > 0) ? _List_fromArray(
					[one]) : acc);
			}
		});
	return A2($elm$core$List$foldr, func, _List_Nil);
};
var $terezka$elm_charts$Internal$Svg$getNearestHelp = F4(
	function (toPosition, items, plane, searched) {
		var toPoint = function (i) {
			return A2(
				$terezka$elm_charts$Internal$Svg$closestPoint,
				toPosition(i),
				searched);
		};
		var distanceSquared_ = A2($terezka$elm_charts$Internal$Svg$distanceSquared, plane, searched);
		var getClosest = F2(
			function (item, allClosest) {
				var _v0 = $elm$core$List$head(allClosest);
				if (_v0.$ === 'Just') {
					var closest = _v0.a;
					return _Utils_eq(
						toPoint(closest),
						toPoint(item)) ? A2($elm$core$List$cons, item, allClosest) : ((_Utils_cmp(
						distanceSquared_(
							toPoint(closest)),
						distanceSquared_(
							toPoint(item))) > 0) ? _List_fromArray(
						[item]) : allClosest);
				} else {
					return _List_fromArray(
						[item]);
				}
			});
		return A2(
			$terezka$elm_charts$Internal$Svg$keepOne,
			toPosition,
			A3($elm$core$List$foldl, getClosest, _List_Nil, items));
	});
var $terezka$elm_charts$Internal$Svg$getNearest = F4(
	function (toPosition, items, plane, searched) {
		return A4($terezka$elm_charts$Internal$Svg$getNearestHelp, toPosition, items, plane, searched);
	});
var $terezka$elm_charts$Internal$Events$getNearest = function (grouping) {
	var toPos = grouping.a;
	return $terezka$elm_charts$Internal$Events$Decoder(
		F2(
			function (items, plane) {
				var groups = A2($terezka$elm_charts$Internal$Many$apply, grouping, items);
				return A3(
					$terezka$elm_charts$Internal$Svg$getNearest,
					toPos(plane),
					groups,
					plane);
			}));
};
var $terezka$elm_charts$Chart$Events$getNearest = $terezka$elm_charts$Internal$Events$getNearest;
var $terezka$elm_charts$Chart$Attributes$height = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{height: v});
	});
var $terezka$elm_charts$Chart$Attributes$moveDown = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{yOff: config.yOff + v});
	});
var $terezka$elm_charts$Internal$Property$meta = F2(
	function (value, prop) {
		if (prop.$ === 'Property') {
			var con = prop.a;
			return $terezka$elm_charts$Internal$Property$Property(
				_Utils_update(
					con,
					{
						meta: $elm$core$Maybe$Just(value)
					}));
		} else {
			var cons = prop.a;
			return $terezka$elm_charts$Internal$Property$Stacked(
				A2(
					$elm$core$List$map,
					function (con) {
						return _Utils_update(
							con,
							{
								meta: $elm$core$Maybe$Just(value)
							});
					},
					cons));
		}
	});
var $terezka$elm_charts$Chart$named = function (name) {
	return $terezka$elm_charts$Internal$Property$meta(name);
};
var $terezka$elm_charts$Internal$Events$getCoords = $terezka$elm_charts$Internal$Events$Decoder(
	F3(
		function (_v0, plane, searched) {
			return searched;
		}));
var $terezka$elm_charts$Chart$Events$getCoords = $terezka$elm_charts$Internal$Events$getCoords;
var $terezka$elm_charts$Internal$Events$map = F2(
	function (f, _v0) {
		var a = _v0.a;
		return $terezka$elm_charts$Internal$Events$Decoder(
			F3(
				function (ps, s, p) {
					return f(
						A3(a, ps, s, p));
				}));
	});
var $terezka$elm_charts$Chart$Events$map = $terezka$elm_charts$Internal$Events$map;
var $terezka$elm_charts$Internal$Events$Event = function (a) {
	return {$: 'Event', a: a};
};
var $terezka$elm_charts$Internal$Events$on = F3(
	function (name, decoder, config) {
		return _Utils_update(
			config,
			{
				events: A2(
					$elm$core$List$cons,
					$terezka$elm_charts$Internal$Events$Event(
						{decoder: decoder, name: name}),
					config.events)
			});
	});
var $terezka$elm_charts$Chart$Events$on = $terezka$elm_charts$Internal$Events$on;
var $terezka$elm_charts$Chart$Events$onMouseLeave = function (onMsg) {
	return A2(
		$terezka$elm_charts$Chart$Events$on,
		'mouseleave',
		A2(
			$terezka$elm_charts$Chart$Events$map,
			$elm$core$Basics$always(onMsg),
			$terezka$elm_charts$Chart$Events$getCoords));
};
var $terezka$elm_charts$Chart$Events$onMouseMove = F2(
	function (onMsg, decoder) {
		return A2(
			$terezka$elm_charts$Chart$Events$on,
			'mousemove',
			A2($terezka$elm_charts$Chart$Events$map, onMsg, decoder));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $author$project$Styling$runColor = function () {
	var colors = $elm$core$Array$fromList(
		_List_fromArray(
			[
				_Utils_Tuple3(234, 96, 223),
				_Utils_Tuple3(123, 77, 255),
				_Utils_Tuple3(18, 165, 237),
				_Utils_Tuple3(146, 180, 44),
				_Utils_Tuple3(135, 28, 28),
				_Utils_Tuple3(109, 240, 210),
				_Utils_Tuple3(234, 115, 105),
				_Utils_Tuple3(34, 210, 186),
				_Utils_Tuple3(219, 76, 178)
			]));
	var numColors = $elm$core$Array$length(colors);
	return function (runId) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple3(0, 0, 0),
			A2($elm$core$Array$get, (runId - 1) % numColors, colors));
	};
}();
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $author$project$Styling$runColorForChart = function (ri) {
	var _v0 = $author$project$Styling$runColor(ri);
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return $elm$core$String$concat(
		_List_fromArray(
			[
				'#',
				$rtfeldman$elm_hex$Hex$toString(r),
				$rtfeldman$elm_hex$Hex$toString(g),
				$rtfeldman$elm_hex$Hex$toString(b)
			]));
};
var $terezka$elm_charts$Chart$HtmlElement = function (a) {
	return {$: 'HtmlElement', a: a};
};
var $terezka$elm_charts$Chart$html = function (func) {
	return $terezka$elm_charts$Chart$HtmlElement(
		F2(
			function (p, _v0) {
				return func(p);
			}));
};
var $terezka$elm_charts$Internal$Svg$defaultTooltip = {arrow: true, background: 'white', border: '#D8D8D8', direction: $elm$core$Maybe$Nothing, focal: $elm$core$Maybe$Nothing, height: 0, offset: 8, width: 0};
var $terezka$elm_charts$Internal$Svg$Bottom = {$: 'Bottom'};
var $terezka$elm_charts$Internal$Svg$Left = {$: 'Left'};
var $terezka$elm_charts$Internal$Svg$Right = {$: 'Right'};
var $terezka$elm_charts$Internal$Svg$Top = {$: 'Top'};
var $terezka$elm_charts$Internal$Coordinates$left = function (pos) {
	return {x: pos.x1, y: pos.y1 + ((pos.y2 - pos.y1) / 2)};
};
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $terezka$elm_charts$Internal$Svg$positionHtml = F7(
	function (plane, x, y, xOff, yOff, attrs, content) {
		var yPercentage = ((A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, y) - yOff) * 100) / plane.y.length;
		var xPercentage = ((A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, x) + xOff) * 100) / plane.x.length;
		var posititonStyles = _List_fromArray(
			[
				A2(
				$elm$html$Html$Attributes$style,
				'left',
				$elm$core$String$fromFloat(xPercentage) + '%'),
				A2(
				$elm$html$Html$Attributes$style,
				'top',
				$elm$core$String$fromFloat(yPercentage) + '%'),
				A2($elm$html$Html$Attributes$style, 'margin-right', '-400px'),
				A2($elm$html$Html$Attributes$style, 'position', 'absolute')
			]);
		return A2(
			$elm$html$Html$div,
			_Utils_ap(posititonStyles, attrs),
			content);
	});
var $terezka$elm_charts$Internal$Coordinates$right = function (pos) {
	return {x: pos.x2, y: pos.y1 + ((pos.y2 - pos.y1) / 2)};
};
var $terezka$elm_charts$Internal$Svg$tooltipPointerStyle = F4(
	function (direction, className, background, borderColor) {
		var config = function () {
			switch (direction.$) {
				case 'Top':
					return {a: 'right', b: 'top', c: 'left'};
				case 'Bottom':
					return {a: 'right', b: 'bottom', c: 'left'};
				case 'Left':
					return {a: 'bottom', b: 'left', c: 'top'};
				case 'Right':
					return {a: 'bottom', b: 'right', c: 'top'};
				case 'LeftOrRight':
					return {a: 'bottom', b: 'left', c: 'top'};
				default:
					return {a: 'right', b: 'top', c: 'left'};
			}
		}();
		return '\n  .' + (className + (':before, .' + (className + (':after {\n    content: "";\n    position: absolute;\n    border-' + (config.c + (': 5px solid transparent;\n    border-' + (config.a + (': 5px solid transparent;\n    ' + (config.b + (': 100%;\n    ' + (config.c + (': 50%;\n    margin-' + (config.c + (': -5px;\n  }\n\n  .' + (className + (':after {\n    border-' + (config.b + (': 5px solid ' + (background + (';\n    margin-' + (config.b + (': -1px;\n    z-index: 1;\n    height: 0px;\n  }\n\n  .' + (className + (':before {\n    border-' + (config.b + (': 5px solid ' + (borderColor + ';\n    height: 0px;\n  }\n  ')))))))))))))))))))))))))));
	});
var $terezka$elm_charts$Internal$Coordinates$top = function (pos) {
	return {x: pos.x1 + ((pos.x2 - pos.x1) / 2), y: pos.y2};
};
var $terezka$elm_charts$Internal$Svg$tooltip = F5(
	function (plane, pos, config, htmlAttrs, content) {
		var distanceTop = A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, pos.y2);
		var distanceRight = plane.x.length - A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, pos.x1);
		var distanceLeft = A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, pos.x2);
		var distanceBottom = plane.y.length - A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, pos.y1);
		var direction = function () {
			var _v5 = config.direction;
			if (_v5.$ === 'Just') {
				switch (_v5.a.$) {
					case 'LeftOrRight':
						var _v6 = _v5.a;
						return (config.width > 0) ? ((_Utils_cmp(distanceLeft, config.width + config.offset) > 0) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right) : ((_Utils_cmp(distanceLeft, distanceRight) > 0) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right);
					case 'TopOrBottom':
						var _v7 = _v5.a;
						return (config.height > 0) ? ((_Utils_cmp(distanceTop, config.height + config.offset) > 0) ? $terezka$elm_charts$Internal$Svg$Top : $terezka$elm_charts$Internal$Svg$Bottom) : ((_Utils_cmp(distanceTop, distanceBottom) > 0) ? $terezka$elm_charts$Internal$Svg$Top : $terezka$elm_charts$Internal$Svg$Bottom);
					default:
						var dir = _v5.a;
						return dir;
				}
			} else {
				var isLargest = function (a) {
					return $elm$core$List$all(
						function (b) {
							return _Utils_cmp(a, b) > -1;
						});
				};
				return A2(
					isLargest,
					distanceTop,
					_List_fromArray(
						[distanceBottom, distanceLeft, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Top : (A2(
					isLargest,
					distanceBottom,
					_List_fromArray(
						[distanceTop, distanceLeft, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Bottom : (A2(
					isLargest,
					distanceLeft,
					_List_fromArray(
						[distanceTop, distanceBottom, distanceRight])) ? $terezka$elm_charts$Internal$Svg$Left : $terezka$elm_charts$Internal$Svg$Right));
			}
		}();
		var focalPoint = function () {
			var _v2 = config.focal;
			if (_v2.$ === 'Just') {
				var focal = _v2.a;
				switch (direction.$) {
					case 'Top':
						return $terezka$elm_charts$Internal$Coordinates$top(
							focal(pos));
					case 'Bottom':
						return $terezka$elm_charts$Internal$Coordinates$bottom(
							focal(pos));
					case 'Left':
						return $terezka$elm_charts$Internal$Coordinates$left(
							focal(pos));
					case 'Right':
						return $terezka$elm_charts$Internal$Coordinates$right(
							focal(pos));
					case 'LeftOrRight':
						return $terezka$elm_charts$Internal$Coordinates$left(
							focal(pos));
					default:
						return $terezka$elm_charts$Internal$Coordinates$right(
							focal(pos));
				}
			} else {
				switch (direction.$) {
					case 'Top':
						return $terezka$elm_charts$Internal$Coordinates$top(pos);
					case 'Bottom':
						return $terezka$elm_charts$Internal$Coordinates$bottom(pos);
					case 'Left':
						return $terezka$elm_charts$Internal$Coordinates$left(pos);
					case 'Right':
						return $terezka$elm_charts$Internal$Coordinates$right(pos);
					case 'LeftOrRight':
						return $terezka$elm_charts$Internal$Coordinates$left(pos);
					default:
						return $terezka$elm_charts$Internal$Coordinates$right(pos);
				}
			}
		}();
		var arrowWidth = config.arrow ? 4 : 0;
		var _v0 = function () {
			switch (direction.$) {
				case 'Top':
					return {className: 'elm-charts__tooltip-top', transformation: 'translate(-50%, -100%)', xOff: 0, yOff: config.offset + arrowWidth};
				case 'Bottom':
					return {className: 'elm-charts__tooltip-bottom', transformation: 'translate(-50%, 0%)', xOff: 0, yOff: (-config.offset) - arrowWidth};
				case 'Left':
					return {className: 'elm-charts__tooltip-left', transformation: 'translate(-100%, -50%)', xOff: (-config.offset) - arrowWidth, yOff: 0};
				case 'Right':
					return {className: 'elm-charts__tooltip-right', transformation: 'translate(0, -50%)', xOff: config.offset + arrowWidth, yOff: 0};
				case 'LeftOrRight':
					return {className: 'elm-charts__tooltip-leftOrRight', transformation: 'translate(0, -50%)', xOff: (-config.offset) - arrowWidth, yOff: 0};
				default:
					return {className: 'elm-charts__tooltip-topOrBottom', transformation: 'translate(-50%, -100%)', xOff: 0, yOff: config.offset + arrowWidth};
			}
		}();
		var xOff = _v0.xOff;
		var yOff = _v0.yOff;
		var transformation = _v0.transformation;
		var className = _v0.className;
		var children = config.arrow ? A2(
			$elm$core$List$cons,
			A3(
				$elm$html$Html$node,
				'style',
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A4($terezka$elm_charts$Internal$Svg$tooltipPointerStyle, direction, className, config.background, config.border))
					])),
			content) : content;
		var attributes = _Utils_ap(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(className),
					A2($elm$html$Html$Attributes$style, 'transform', transformation),
					A2($elm$html$Html$Attributes$style, 'padding', '5px 8px'),
					A2($elm$html$Html$Attributes$style, 'background', config.background),
					A2($elm$html$Html$Attributes$style, 'border', '1px solid ' + config.border),
					A2($elm$html$Html$Attributes$style, 'border-radius', '3px'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
				]),
			htmlAttrs);
		return A2(
			$elm$html$Html$map,
			$elm$core$Basics$never,
			A7($terezka$elm_charts$Internal$Svg$positionHtml, plane, focalPoint.x, focalPoint.y, xOff, yOff, attributes, children));
	});
var $terezka$elm_charts$Chart$Svg$tooltip = F3(
	function (plane, pos, edits) {
		return A3(
			$terezka$elm_charts$Internal$Svg$tooltip,
			plane,
			pos,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultTooltip));
	});
var $terezka$elm_charts$Chart$tooltip = F4(
	function (i, edits, attrs_, content) {
		return $terezka$elm_charts$Chart$html(
			function (p) {
				var pos = $terezka$elm_charts$Internal$Item$getLimits(i);
				var content_ = _Utils_eq(content, _List_Nil) ? $terezka$elm_charts$Internal$Item$toHtml(i) : content;
				return A3($terezka$elm_charts$Internal$Svg$isWithinPlane, p, pos.x1, pos.y2) ? A5(
					$terezka$elm_charts$Chart$Svg$tooltip,
					p,
					A2($terezka$elm_charts$Internal$Item$getPosition, p, i),
					edits,
					attrs_,
					content_) : $elm$html$Html$text('');
			});
	});
var $terezka$elm_charts$Chart$AxisElement = F2(
	function (a, b) {
		return {$: 'AxisElement', a: a, b: b};
	});
var $elm$svg$Svg$polygon = $elm$svg$Svg$trustedNode('polygon');
var $terezka$elm_charts$Internal$Svg$arrow = F3(
	function (plane, config, point) {
		var points_ = '0,0 ' + ($elm$core$String$fromFloat(config.length) + (',' + ($elm$core$String$fromFloat(config.width) + (' 0, ' + $elm$core$String$fromFloat(config.width * 2)))));
		var commands = 'rotate(' + ($elm$core$String$fromFloat(config.rotate) + (') translate(0 ' + ($elm$core$String$fromFloat(-config.width) + ') ')));
		return A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('elm-charts__arrow'),
					A6($terezka$elm_charts$Internal$Svg$position, plane, 0, point.x, point.y, config.xOff, config.yOff)
				]),
			_List_fromArray(
				[
					A4(
					$terezka$elm_charts$Internal$Svg$withAttrs,
					config.attrs,
					$elm$svg$Svg$polygon,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill(config.color),
							$elm$svg$Svg$Attributes$points(points_),
							$elm$svg$Svg$Attributes$transform(commands)
						]),
					_List_Nil)
				]));
	});
var $terezka$elm_charts$Internal$Svg$defaultArrow = {attrs: _List_Nil, color: 'rgb(210, 210, 210)', length: 7, rotate: 0, width: 4, xOff: 0, yOff: 0};
var $terezka$elm_charts$Chart$Svg$arrow = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$arrow,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultArrow));
	});
var $terezka$elm_charts$Chart$Attributes$x2 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				x2: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$Attributes$zero = function (b) {
	return A3($elm$core$Basics$clamp, b.min, b.max, 0);
};
var $terezka$elm_charts$Chart$xAxis = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{arrow: true, color: '', limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, width: 1});
	var addTickValues = F2(
		function (p, ts) {
			return _Utils_update(
				ts,
				{
					yAxis: A2(
						$elm$core$List$cons,
						config.pinned(p.y),
						ts.yAxis)
				});
		});
	return A2(
		$terezka$elm_charts$Chart$AxisElement,
		addTickValues,
		function (p) {
			var xLimit = A3(
				$elm$core$List$foldl,
				F2(
					function (f, x) {
						return f(x);
					}),
				p.x,
				config.limits);
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__x-axis')
					]),
				_List_fromArray(
					[
						A2(
						$terezka$elm_charts$Chart$Svg$line,
						p,
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$color(config.color),
								$terezka$elm_charts$Chart$Attributes$width(config.width),
								$terezka$elm_charts$Chart$Attributes$y1(
								config.pinned(p.y)),
								$terezka$elm_charts$Chart$Attributes$x1(
								A2($elm$core$Basics$max, p.x.min, xLimit.min)),
								$terezka$elm_charts$Chart$Attributes$x2(
								A2($elm$core$Basics$min, p.x.max, xLimit.max))
							])),
						config.arrow ? A3(
						$terezka$elm_charts$Chart$Svg$arrow,
						p,
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$color(config.color)
							]),
						{
							x: xLimit.max,
							y: config.pinned(p.y)
						}) : $elm$svg$Svg$text('')
					]));
		});
};
var $terezka$elm_charts$Internal$Svg$Floats = {$: 'Floats'};
var $terezka$elm_charts$Chart$TicksElement = F2(
	function (a, b) {
		return {$: 'TicksElement', a: a, b: b};
	});
var $terezka$elm_charts$Internal$Svg$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $terezka$intervals$Intervals$Around = function (a) {
	return {$: 'Around', a: a};
};
var $terezka$intervals$Intervals$around = $terezka$intervals$Intervals$Around;
var $terezka$intervals$Intervals$ceilingTo = F2(
	function (prec, number) {
		return prec * $elm$core$Basics$ceiling(number / prec);
	});
var $terezka$intervals$Intervals$getBeginning = F2(
	function (min, interval) {
		var multiple = min / interval;
		return _Utils_eq(
			multiple,
			$elm$core$Basics$round(multiple)) ? min : A2($terezka$intervals$Intervals$ceilingTo, interval, min);
	});
var $terezka$intervals$Intervals$correctFloat = function (prec) {
	return A2(
		$elm$core$Basics$composeR,
		$myrho$elm_round$Round$round(prec),
		A2(
			$elm$core$Basics$composeR,
			$elm$core$String$toFloat,
			$elm$core$Maybe$withDefault(0)));
};
var $terezka$intervals$Intervals$getMultiples = F3(
	function (magnitude, allowDecimals, hasTickAmount) {
		var defaults = hasTickAmount ? _List_fromArray(
			[1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) : _List_fromArray(
			[1, 2, 2.5, 5, 10]);
		return allowDecimals ? defaults : ((magnitude === 1) ? A2(
			$elm$core$List$filter,
			function (n) {
				return _Utils_eq(
					$elm$core$Basics$round(n),
					n);
			},
			defaults) : ((magnitude <= 0.1) ? _List_fromArray(
			[1 / magnitude]) : defaults));
	});
var $terezka$intervals$Intervals$getPrecision = function (number) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(number));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var before = _v0.a;
		var _v1 = _v0.b;
		var after = _v1.a;
		return $elm$core$Basics$abs(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(after)));
	} else {
		var _v2 = A2(
			$elm$core$String$split,
			'.',
			$elm$core$String$fromFloat(number));
		if ((_v2.b && _v2.b.b) && (!_v2.b.b.b)) {
			var before = _v2.a;
			var _v3 = _v2.b;
			var after = _v3.a;
			return $elm$core$String$length(after);
		} else {
			return 0;
		}
	}
};
var $elm$core$Basics$e = _Basics_e;
var $terezka$intervals$Intervals$toMagnitude = function (num) {
	return A2(
		$elm$core$Basics$pow,
		10,
		$elm$core$Basics$floor(
			A2($elm$core$Basics$logBase, $elm$core$Basics$e, num) / A2($elm$core$Basics$logBase, $elm$core$Basics$e, 10)));
};
var $terezka$intervals$Intervals$getInterval = F3(
	function (intervalRaw, allowDecimals, hasTickAmount) {
		var magnitude = $terezka$intervals$Intervals$toMagnitude(intervalRaw);
		var multiples = A3($terezka$intervals$Intervals$getMultiples, magnitude, allowDecimals, hasTickAmount);
		var normalized = intervalRaw / magnitude;
		var findMultipleExact = function (multiples_) {
			findMultipleExact:
			while (true) {
				if (multiples_.b) {
					var m1 = multiples_.a;
					var rest = multiples_.b;
					if (_Utils_cmp(m1 * magnitude, intervalRaw) > -1) {
						return m1;
					} else {
						var $temp$multiples_ = rest;
						multiples_ = $temp$multiples_;
						continue findMultipleExact;
					}
				} else {
					return 1;
				}
			}
		};
		var findMultiple = function (multiples_) {
			findMultiple:
			while (true) {
				if (multiples_.b) {
					if (multiples_.b.b) {
						var m1 = multiples_.a;
						var _v2 = multiples_.b;
						var m2 = _v2.a;
						var rest = _v2.b;
						if (_Utils_cmp(normalized, (m1 + m2) / 2) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = A2($elm$core$List$cons, m2, rest);
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					} else {
						var m1 = multiples_.a;
						var rest = multiples_.b;
						if (_Utils_cmp(normalized, m1) < 1) {
							return m1;
						} else {
							var $temp$multiples_ = rest;
							multiples_ = $temp$multiples_;
							continue findMultiple;
						}
					}
				} else {
					return 1;
				}
			}
		};
		var multiple = hasTickAmount ? findMultipleExact(multiples) : findMultiple(multiples);
		var precision = $terezka$intervals$Intervals$getPrecision(magnitude) + $terezka$intervals$Intervals$getPrecision(multiple);
		return A2($terezka$intervals$Intervals$correctFloat, precision, multiple * magnitude);
	});
var $terezka$intervals$Intervals$positions = F5(
	function (range, beginning, interval, m, acc) {
		positions:
		while (true) {
			var nextPosition = A2(
				$terezka$intervals$Intervals$correctFloat,
				$terezka$intervals$Intervals$getPrecision(interval),
				beginning + (m * interval));
			if (_Utils_cmp(nextPosition, range.max) > 0) {
				return acc;
			} else {
				var $temp$range = range,
					$temp$beginning = beginning,
					$temp$interval = interval,
					$temp$m = m + 1,
					$temp$acc = _Utils_ap(
					acc,
					_List_fromArray(
						[nextPosition]));
				range = $temp$range;
				beginning = $temp$beginning;
				interval = $temp$interval;
				m = $temp$m;
				acc = $temp$acc;
				continue positions;
			}
		}
	});
var $terezka$intervals$Intervals$values = F4(
	function (allowDecimals, exact, amountRough, range) {
		var intervalRough = (range.max - range.min) / amountRough;
		var interval = A3($terezka$intervals$Intervals$getInterval, intervalRough, allowDecimals, exact);
		var intervalSafe = (!interval) ? 1 : interval;
		var beginning = A2($terezka$intervals$Intervals$getBeginning, range.min, intervalSafe);
		var amountRoughSafe = (!amountRough) ? 1 : amountRough;
		return A5($terezka$intervals$Intervals$positions, range, beginning, intervalSafe, 0, _List_Nil);
	});
var $terezka$intervals$Intervals$floats = function (amount) {
	if (amount.$ === 'Exactly') {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, true, number);
	} else {
		var number = amount.a;
		return A3($terezka$intervals$Intervals$values, true, false, number);
	}
};
var $terezka$elm_charts$Internal$Svg$floats = $terezka$elm_charts$Internal$Svg$Generator(
	F2(
		function (i, b) {
			return A2(
				$terezka$intervals$Intervals$floats,
				$terezka$intervals$Intervals$around(i),
				{max: b.max, min: b.min});
		}));
var $terezka$elm_charts$Chart$Svg$floats = $terezka$elm_charts$Internal$Svg$floats;
var $ryannhg$date_format$DateFormat$Language$Language = F6(
	function (toMonthName, toMonthAbbreviation, toWeekdayName, toWeekdayAbbreviation, toAmPm, toOrdinalSuffix) {
		return {toAmPm: toAmPm, toMonthAbbreviation: toMonthAbbreviation, toMonthName: toMonthName, toOrdinalSuffix: toOrdinalSuffix, toWeekdayAbbreviation: toWeekdayAbbreviation, toWeekdayName: toWeekdayName};
	});
var $ryannhg$date_format$DateFormat$Language$toEnglishAmPm = function (hour) {
	return (hour > 11) ? 'pm' : 'am';
};
var $ryannhg$date_format$DateFormat$Language$toEnglishMonthName = function (month) {
	switch (month.$) {
		case 'Jan':
			return 'January';
		case 'Feb':
			return 'February';
		case 'Mar':
			return 'March';
		case 'Apr':
			return 'April';
		case 'May':
			return 'May';
		case 'Jun':
			return 'June';
		case 'Jul':
			return 'July';
		case 'Aug':
			return 'August';
		case 'Sep':
			return 'September';
		case 'Oct':
			return 'October';
		case 'Nov':
			return 'November';
		default:
			return 'December';
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishSuffix = function (num) {
	var _v0 = A2($elm$core$Basics$modBy, 100, num);
	switch (_v0) {
		case 11:
			return 'th';
		case 12:
			return 'th';
		case 13:
			return 'th';
		default:
			var _v1 = A2($elm$core$Basics$modBy, 10, num);
			switch (_v1) {
				case 1:
					return 'st';
				case 2:
					return 'nd';
				case 3:
					return 'rd';
				default:
					return 'th';
			}
	}
};
var $ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName = function (weekday) {
	switch (weekday.$) {
		case 'Mon':
			return 'Monday';
		case 'Tue':
			return 'Tuesday';
		case 'Wed':
			return 'Wednesday';
		case 'Thu':
			return 'Thursday';
		case 'Fri':
			return 'Friday';
		case 'Sat':
			return 'Saturday';
		default:
			return 'Sunday';
	}
};
var $ryannhg$date_format$DateFormat$Language$english = A6(
	$ryannhg$date_format$DateFormat$Language$Language,
	$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishMonthName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
	A2(
		$elm$core$Basics$composeR,
		$ryannhg$date_format$DateFormat$Language$toEnglishWeekdayName,
		$elm$core$String$left(3)),
	$ryannhg$date_format$DateFormat$Language$toEnglishAmPm,
	$ryannhg$date_format$DateFormat$Language$toEnglishSuffix);
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $ryannhg$date_format$DateFormat$amPm = F3(
	function (language, zone, posix) {
		return language.toAmPm(
			A2($elm$time$Time$toHour, zone, posix));
	});
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $ryannhg$date_format$DateFormat$dayOfMonth = $elm$time$Time$toDay;
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $ryannhg$date_format$DateFormat$days = _List_fromArray(
	[$elm$time$Time$Sun, $elm$time$Time$Mon, $elm$time$Time$Tue, $elm$time$Time$Wed, $elm$time$Time$Thu, $elm$time$Time$Fri, $elm$time$Time$Sat]);
var $elm$time$Time$toWeekday = F2(
	function (zone, time) {
		var _v0 = A2(
			$elm$core$Basics$modBy,
			7,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60 * 24));
		switch (_v0) {
			case 0:
				return $elm$time$Time$Thu;
			case 1:
				return $elm$time$Time$Fri;
			case 2:
				return $elm$time$Time$Sat;
			case 3:
				return $elm$time$Time$Sun;
			case 4:
				return $elm$time$Time$Mon;
			case 5:
				return $elm$time$Time$Tue;
			default:
				return $elm$time$Time$Wed;
		}
	});
var $ryannhg$date_format$DateFormat$dayOfWeek = F2(
	function (zone, posix) {
		return function (_v1) {
			var i = _v1.a;
			return i;
		}(
			A2(
				$elm$core$Maybe$withDefault,
				_Utils_Tuple2(0, $elm$time$Time$Sun),
				$elm$core$List$head(
					A2(
						$elm$core$List$filter,
						function (_v0) {
							var day = _v0.b;
							return _Utils_eq(
								day,
								A2($elm$time$Time$toWeekday, zone, posix));
						},
						A2(
							$elm$core$List$indexedMap,
							F2(
								function (i, day) {
									return _Utils_Tuple2(i, day);
								}),
							$ryannhg$date_format$DateFormat$days)))));
	});
var $ryannhg$date_format$DateFormat$isLeapYear = function (year_) {
	return (!(!A2($elm$core$Basics$modBy, 4, year_))) ? false : ((!(!A2($elm$core$Basics$modBy, 100, year_))) ? true : ((!(!A2($elm$core$Basics$modBy, 400, year_))) ? false : true));
};
var $ryannhg$date_format$DateFormat$daysInMonth = F2(
	function (year_, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $ryannhg$date_format$DateFormat$isLeapYear(year_) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $ryannhg$date_format$DateFormat$months = _List_fromArray(
	[$elm$time$Time$Jan, $elm$time$Time$Feb, $elm$time$Time$Mar, $elm$time$Time$Apr, $elm$time$Time$May, $elm$time$Time$Jun, $elm$time$Time$Jul, $elm$time$Time$Aug, $elm$time$Time$Sep, $elm$time$Time$Oct, $elm$time$Time$Nov, $elm$time$Time$Dec]);
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $ryannhg$date_format$DateFormat$monthPair = F2(
	function (zone, posix) {
		return A2(
			$elm$core$Maybe$withDefault,
			_Utils_Tuple2(0, $elm$time$Time$Jan),
			$elm$core$List$head(
				A2(
					$elm$core$List$filter,
					function (_v0) {
						var i = _v0.a;
						var m = _v0.b;
						return _Utils_eq(
							m,
							A2($elm$time$Time$toMonth, zone, posix));
					},
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (a, b) {
								return _Utils_Tuple2(a, b);
							}),
						$ryannhg$date_format$DateFormat$months))));
	});
var $ryannhg$date_format$DateFormat$monthNumber_ = F2(
	function (zone, posix) {
		return 1 + function (_v0) {
			var i = _v0.a;
			var m = _v0.b;
			return i;
		}(
			A2($ryannhg$date_format$DateFormat$monthPair, zone, posix));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $ryannhg$date_format$DateFormat$dayOfYear = F2(
	function (zone, posix) {
		var monthsBeforeThisOne = A2(
			$elm$core$List$take,
			A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) - 1,
			$ryannhg$date_format$DateFormat$months);
		var daysBeforeThisMonth = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				$ryannhg$date_format$DateFormat$daysInMonth(
					A2($elm$time$Time$toYear, zone, posix)),
				monthsBeforeThisOne));
		return daysBeforeThisMonth + A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix);
	});
var $ryannhg$date_format$DateFormat$quarter = F2(
	function (zone, posix) {
		return (A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix) / 4) | 0;
	});
var $ryannhg$date_format$DateFormat$toFixedLength = F2(
	function (totalChars, num) {
		var numStr = $elm$core$String$fromInt(num);
		var numZerosNeeded = totalChars - $elm$core$String$length(numStr);
		var zeros = A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				function (_v0) {
					return '0';
				},
				A2($elm$core$List$range, 1, numZerosNeeded)));
		return _Utils_ap(zeros, numStr);
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $ryannhg$date_format$DateFormat$toNonMilitary = function (num) {
	return (!num) ? 12 : ((num <= 12) ? num : (num - 12));
};
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $elm$core$String$toUpper = _String_toUpper;
var $ryannhg$date_format$DateFormat$millisecondsPerYear = $elm$core$Basics$round((((1000 * 60) * 60) * 24) * 365.25);
var $ryannhg$date_format$DateFormat$firstDayOfYear = F2(
	function (zone, time) {
		return $elm$time$Time$millisToPosix(
			$ryannhg$date_format$DateFormat$millisecondsPerYear * A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$weekOfYear = F2(
	function (zone, posix) {
		var firstDay = A2($ryannhg$date_format$DateFormat$firstDayOfYear, zone, posix);
		var firstDayOffset = A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, firstDay);
		var daysSoFar = A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix);
		return (((daysSoFar + firstDayOffset) / 7) | 0) + 1;
	});
var $ryannhg$date_format$DateFormat$year = F2(
	function (zone, time) {
		return $elm$core$String$fromInt(
			A2($elm$time$Time$toYear, zone, time));
	});
var $ryannhg$date_format$DateFormat$piece = F4(
	function (language, zone, posix, token) {
		switch (token.$) {
			case 'MonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$monthNumber_, zone, posix));
			case 'MonthNameAbbreviated':
				return language.toMonthAbbreviation(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'MonthNameFull':
				return language.toMonthName(
					A2($elm$time$Time$toMonth, zone, posix));
			case 'QuarterNumber':
				return $elm$core$String$fromInt(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'QuarterSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					1 + A2($ryannhg$date_format$DateFormat$quarter, zone, posix));
			case 'DayOfMonthNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfMonthFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$dayOfMonth, zone, posix));
			case 'DayOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($ryannhg$date_format$DateFormat$dayOfYear, zone, posix));
			case 'DayOfWeekNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$dayOfWeek, zone, posix));
			case 'DayOfWeekNameAbbreviated':
				return language.toWeekdayAbbreviation(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'DayOfWeekNameFull':
				return language.toWeekdayName(
					A2($elm$time$Time$toWeekday, zone, posix));
			case 'WeekOfYearNumber':
				return $elm$core$String$fromInt(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearSuffix':
				return function (num) {
					return _Utils_ap(
						$elm$core$String$fromInt(num),
						language.toOrdinalSuffix(num));
				}(
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'WeekOfYearFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($ryannhg$date_format$DateFormat$weekOfYear, zone, posix));
			case 'YearNumberLastTwo':
				return A2(
					$elm$core$String$right,
					2,
					A2($ryannhg$date_format$DateFormat$year, zone, posix));
			case 'YearNumber':
				return A2($ryannhg$date_format$DateFormat$year, zone, posix);
			case 'AmPmUppercase':
				return $elm$core$String$toUpper(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'AmPmLowercase':
				return $elm$core$String$toLower(
					A3($ryannhg$date_format$DateFormat$amPm, language, zone, posix));
			case 'HourMilitaryNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toHour, zone, posix));
			case 'HourNumber':
				return $elm$core$String$fromInt(
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					$ryannhg$date_format$DateFormat$toNonMilitary(
						A2($elm$time$Time$toHour, zone, posix)));
			case 'HourMilitaryFromOneNumber':
				return $elm$core$String$fromInt(
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'HourMilitaryFromOneFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					1 + A2($elm$time$Time$toHour, zone, posix));
			case 'MinuteNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMinute, zone, posix));
			case 'MinuteFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toMinute, zone, posix));
			case 'SecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toSecond, zone, posix));
			case 'SecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					2,
					A2($elm$time$Time$toSecond, zone, posix));
			case 'MillisecondNumber':
				return $elm$core$String$fromInt(
					A2($elm$time$Time$toMillis, zone, posix));
			case 'MillisecondFixed':
				return A2(
					$ryannhg$date_format$DateFormat$toFixedLength,
					3,
					A2($elm$time$Time$toMillis, zone, posix));
			default:
				var string = token.a;
				return string;
		}
	});
var $ryannhg$date_format$DateFormat$formatWithLanguage = F4(
	function (language, tokens, zone, time) {
		return A2(
			$elm$core$String$join,
			'',
			A2(
				$elm$core$List$map,
				A3($ryannhg$date_format$DateFormat$piece, language, zone, time),
				tokens));
	});
var $ryannhg$date_format$DateFormat$format = $ryannhg$date_format$DateFormat$formatWithLanguage($ryannhg$date_format$DateFormat$Language$english);
var $ryannhg$date_format$DateFormat$HourMilitaryFixed = {$: 'HourMilitaryFixed'};
var $ryannhg$date_format$DateFormat$hourMilitaryFixed = $ryannhg$date_format$DateFormat$HourMilitaryFixed;
var $ryannhg$date_format$DateFormat$MinuteFixed = {$: 'MinuteFixed'};
var $ryannhg$date_format$DateFormat$minuteFixed = $ryannhg$date_format$DateFormat$MinuteFixed;
var $ryannhg$date_format$DateFormat$Text = function (a) {
	return {$: 'Text', a: a};
};
var $ryannhg$date_format$DateFormat$text = $ryannhg$date_format$DateFormat$Text;
var $terezka$elm_charts$Internal$Svg$formatClock = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed
		]));
var $ryannhg$date_format$DateFormat$MillisecondFixed = {$: 'MillisecondFixed'};
var $ryannhg$date_format$DateFormat$millisecondFixed = $ryannhg$date_format$DateFormat$MillisecondFixed;
var $ryannhg$date_format$DateFormat$SecondFixed = {$: 'SecondFixed'};
var $ryannhg$date_format$DateFormat$secondFixed = $ryannhg$date_format$DateFormat$SecondFixed;
var $terezka$elm_charts$Internal$Svg$formatClockMillis = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$millisecondFixed
		]));
var $terezka$elm_charts$Internal$Svg$formatClockSecond = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$hourMilitaryFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$minuteFixed,
			$ryannhg$date_format$DateFormat$text(':'),
			$ryannhg$date_format$DateFormat$secondFixed
		]));
var $ryannhg$date_format$DateFormat$DayOfMonthNumber = {$: 'DayOfMonthNumber'};
var $ryannhg$date_format$DateFormat$dayOfMonthNumber = $ryannhg$date_format$DateFormat$DayOfMonthNumber;
var $ryannhg$date_format$DateFormat$MonthNumber = {$: 'MonthNumber'};
var $ryannhg$date_format$DateFormat$monthNumber = $ryannhg$date_format$DateFormat$MonthNumber;
var $terezka$elm_charts$Internal$Svg$formatDate = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[
			$ryannhg$date_format$DateFormat$monthNumber,
			$ryannhg$date_format$DateFormat$text('/'),
			$ryannhg$date_format$DateFormat$dayOfMonthNumber
		]));
var $ryannhg$date_format$DateFormat$MonthNameAbbreviated = {$: 'MonthNameAbbreviated'};
var $ryannhg$date_format$DateFormat$monthNameAbbreviated = $ryannhg$date_format$DateFormat$MonthNameAbbreviated;
var $terezka$elm_charts$Internal$Svg$formatMonth = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$monthNameAbbreviated]));
var $ryannhg$date_format$DateFormat$DayOfWeekNameFull = {$: 'DayOfWeekNameFull'};
var $ryannhg$date_format$DateFormat$dayOfWeekNameFull = $ryannhg$date_format$DateFormat$DayOfWeekNameFull;
var $terezka$elm_charts$Internal$Svg$formatWeekday = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$dayOfWeekNameFull]));
var $ryannhg$date_format$DateFormat$YearNumber = {$: 'YearNumber'};
var $ryannhg$date_format$DateFormat$yearNumber = $ryannhg$date_format$DateFormat$YearNumber;
var $terezka$elm_charts$Internal$Svg$formatYear = $ryannhg$date_format$DateFormat$format(
	_List_fromArray(
		[$ryannhg$date_format$DateFormat$yearNumber]));
var $terezka$elm_charts$Internal$Svg$formatTime = F2(
	function (zone, time) {
		var _v0 = A2($elm$core$Maybe$withDefault, time.unit, time.change);
		switch (_v0.$) {
			case 'Millisecond':
				return A2($terezka$elm_charts$Internal$Svg$formatClockMillis, zone, time.timestamp);
			case 'Second':
				return A2($terezka$elm_charts$Internal$Svg$formatClockSecond, zone, time.timestamp);
			case 'Minute':
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.timestamp);
			case 'Hour':
				return A2($terezka$elm_charts$Internal$Svg$formatClock, zone, time.timestamp);
			case 'Day':
				return (time.multiple === 7) ? A2($terezka$elm_charts$Internal$Svg$formatWeekday, zone, time.timestamp) : A2($terezka$elm_charts$Internal$Svg$formatDate, zone, time.timestamp);
			case 'Month':
				return A2($terezka$elm_charts$Internal$Svg$formatMonth, zone, time.timestamp);
			default:
				return A2($terezka$elm_charts$Internal$Svg$formatYear, zone, time.timestamp);
		}
	});
var $terezka$elm_charts$Chart$Svg$formatTime = $terezka$elm_charts$Internal$Svg$formatTime;
var $terezka$elm_charts$Internal$Svg$generate = F3(
	function (amount, _v0, limits) {
		var func = _v0.a;
		return A2(func, amount, limits);
	});
var $terezka$elm_charts$Chart$Svg$generate = $terezka$elm_charts$Internal$Svg$generate;
var $terezka$intervals$Intervals$ints = F2(
	function (amount, range) {
		return A2(
			$elm$core$List$map,
			$elm$core$Basics$round,
			function () {
				if (amount.$ === 'Exactly') {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, true, number, range);
				} else {
					var number = amount.a;
					return A4($terezka$intervals$Intervals$values, false, false, number, range);
				}
			}());
	});
var $terezka$elm_charts$Internal$Svg$ints = $terezka$elm_charts$Internal$Svg$Generator(
	F2(
		function (i, b) {
			return A2(
				$terezka$intervals$Intervals$ints,
				$terezka$intervals$Intervals$around(i),
				{max: b.max, min: b.min});
		}));
var $terezka$elm_charts$Chart$Svg$ints = $terezka$elm_charts$Internal$Svg$ints;
var $terezka$intervals$Intervals$Day = {$: 'Day'};
var $terezka$intervals$Intervals$Hour = {$: 'Hour'};
var $terezka$intervals$Intervals$Millisecond = {$: 'Millisecond'};
var $terezka$intervals$Intervals$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Month = {$: 'Month'};
var $terezka$intervals$Intervals$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Year = {$: 'Year'};
var $justinmimbs$time_extra$Time$Extra$Day = {$: 'Day'};
var $justinmimbs$date$Date$Days = {$: 'Days'};
var $justinmimbs$time_extra$Time$Extra$Millisecond = {$: 'Millisecond'};
var $justinmimbs$time_extra$Time$Extra$Month = {$: 'Month'};
var $justinmimbs$date$Date$Months = {$: 'Months'};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$add = F3(
	function (unit, n, _v0) {
		var rd = _v0.a;
		switch (unit.$) {
			case 'Years':
				return A3(
					$justinmimbs$date$Date$add,
					$justinmimbs$date$Date$Months,
					12 * n,
					$justinmimbs$date$Date$RD(rd));
			case 'Months':
				var date = $justinmimbs$date$Date$toCalendarDate(
					$justinmimbs$date$Date$RD(rd));
				var wholeMonths = ((12 * (date.year - 1)) + ($justinmimbs$date$Date$monthToNumber(date.month) - 1)) + n;
				var m = $justinmimbs$date$Date$numberToMonth(
					A2($elm$core$Basics$modBy, 12, wholeMonths) + 1);
				var y = A2($justinmimbs$date$Date$floorDiv, wholeMonths, 12) + 1;
				return $justinmimbs$date$Date$RD(
					($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A2(
						$elm$core$Basics$min,
						date.day,
						A2($justinmimbs$date$Date$daysInMonth, y, m)));
			case 'Weeks':
				return $justinmimbs$date$Date$RD(rd + (7 * n));
			default:
				return $justinmimbs$date$Date$RD(rd + n);
		}
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$add = F4(
	function (interval, n, zone, posix) {
		add:
		while (true) {
			switch (interval.$) {
				case 'Millisecond':
					return $elm$time$Time$millisToPosix(
						$elm$time$Time$posixToMillis(posix) + n);
				case 'Second':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 1000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Minute':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 60000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Hour':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Millisecond,
						$temp$n = n * 3600000,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Day':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Days,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Month':
					return A3(
						$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
						zone,
						A3(
							$justinmimbs$date$Date$add,
							$justinmimbs$date$Date$Months,
							n,
							A2($justinmimbs$date$Date$fromPosix, zone, posix)),
						A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix));
				case 'Year':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 12,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Quarter':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Month,
						$temp$n = n * 3,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				case 'Week':
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
				default:
					var weekday = interval;
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Day,
						$temp$n = n * 7,
						$temp$zone = zone,
						$temp$posix = posix;
					interval = $temp$interval;
					n = $temp$n;
					zone = $temp$zone;
					posix = $temp$posix;
					continue add;
			}
		}
	});
var $justinmimbs$time_extra$Time$Extra$Week = {$: 'Week'};
var $justinmimbs$date$Date$Day = {$: 'Day'};
var $justinmimbs$date$Date$Friday = {$: 'Friday'};
var $justinmimbs$date$Date$Monday = {$: 'Monday'};
var $justinmimbs$date$Date$Month = {$: 'Month'};
var $justinmimbs$date$Date$Quarter = {$: 'Quarter'};
var $justinmimbs$date$Date$Saturday = {$: 'Saturday'};
var $justinmimbs$date$Date$Sunday = {$: 'Sunday'};
var $justinmimbs$date$Date$Thursday = {$: 'Thursday'};
var $justinmimbs$date$Date$Tuesday = {$: 'Tuesday'};
var $justinmimbs$date$Date$Wednesday = {$: 'Wednesday'};
var $justinmimbs$date$Date$Week = {$: 'Week'};
var $justinmimbs$date$Date$Year = {$: 'Year'};
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1);
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$RD(
		$justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date.a;
		switch (interval.$) {
			case 'Year':
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 'Quarter':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 'Month':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 'Week':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Monday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Tuesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Tue, date));
			case 'Wednesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Wed, date));
			case 'Thursday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Thu, date));
			case 'Friday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Fri, date));
			case 'Saturday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sat, date));
			case 'Sunday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sun, date));
			default:
				return date;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval.$) {
			case 'Millisecond':
				return posix;
			case 'Second':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 'Minute':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 'Hour':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 'Day':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Day, zone, posix);
			case 'Month':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Month, zone, posix);
			case 'Year':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Year, zone, posix);
			case 'Quarter':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Quarter, zone, posix);
			case 'Week':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Week, zone, posix);
			case 'Monday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Monday, zone, posix);
			case 'Tuesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Tuesday, zone, posix);
			case 'Wednesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Wednesday, zone, posix);
			case 'Thursday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Thursday, zone, posix);
			case 'Friday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Friday, zone, posix);
			case 'Saturday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Saturday, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Sunday, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$ceiling = F3(
	function (interval, zone, posix) {
		var floored = A3($justinmimbs$time_extra$Time$Extra$floor, interval, zone, posix);
		return _Utils_eq(floored, posix) ? posix : A4($justinmimbs$time_extra$Time$Extra$add, interval, 1, zone, floored);
	});
var $terezka$intervals$Intervals$Time$ceilingDay = F3(
	function (zone, mult, stamp) {
		return (mult === 7) ? A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Week, zone, stamp) : A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Day, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Hour = {$: 'Hour'};
var $justinmimbs$time_extra$Time$Extra$partsToPosix = F2(
	function (zone, _v0) {
		var year = _v0.year;
		var month = _v0.month;
		var day = _v0.day;
		var hour = _v0.hour;
		var minute = _v0.minute;
		var second = _v0.second;
		var millisecond = _v0.millisecond;
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A3($justinmimbs$date$Date$fromCalendarDate, year, month, day),
			A4(
				$justinmimbs$time_extra$Time$Extra$timeFromClock,
				A3($elm$core$Basics$clamp, 0, 23, hour),
				A3($elm$core$Basics$clamp, 0, 59, minute),
				A3($elm$core$Basics$clamp, 0, 59, second),
				A3($elm$core$Basics$clamp, 0, 999, millisecond)));
	});
var $justinmimbs$time_extra$Time$Extra$posixToParts = F2(
	function (zone, posix) {
		return {
			day: A2($elm$time$Time$toDay, zone, posix),
			hour: A2($elm$time$Time$toHour, zone, posix),
			millisecond: A2($elm$time$Time$toMillis, zone, posix),
			minute: A2($elm$time$Time$toMinute, zone, posix),
			month: A2($elm$time$Time$toMonth, zone, posix),
			second: A2($elm$time$Time$toSecond, zone, posix),
			year: A2($elm$time$Time$toYear, zone, posix)
		};
	});
var $terezka$intervals$Intervals$Time$ceilingHour = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Hour, zone, stamp));
		var rem = parts.hour % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Hour, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Time$ceilingMinute = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Minute, zone, stamp));
		var rem = parts.minute % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Minute, mult - rem, zone, _new);
	});
var $terezka$intervals$Intervals$Time$intAsMonth = function (_int) {
	switch (_int) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		case 12:
			return $elm$time$Time$Dec;
		default:
			return $elm$time$Time$Dec;
	}
};
var $terezka$intervals$Intervals$Time$monthAsInt = function (month) {
	switch (month.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $terezka$intervals$Intervals$Time$ceilingMonth = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Month, zone, stamp));
		var monthInt = $terezka$intervals$Intervals$Time$monthAsInt(parts.month);
		var rem = (monthInt - 1) % mult;
		var newMonth = (!rem) ? monthInt : ((monthInt - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			(newMonth > 12) ? _Utils_update(
				parts,
				{
					month: $terezka$intervals$Intervals$Time$intAsMonth(newMonth - 12),
					year: parts.year + 1
				}) : _Utils_update(
				parts,
				{
					month: $terezka$intervals$Intervals$Time$intAsMonth(newMonth)
				}));
	});
var $terezka$intervals$Intervals$Time$ceilingMs = F3(
	function (zone, mult, stamp) {
		var parts = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, stamp);
		var rem = parts.millisecond % mult;
		return (!rem) ? A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts) : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Millisecond, mult - rem, zone, stamp);
	});
var $justinmimbs$time_extra$Time$Extra$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Time$ceilingSecond = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Second, zone, stamp));
		var rem = parts.second % mult;
		var _new = A2($justinmimbs$time_extra$Time$Extra$partsToPosix, zone, parts);
		return (!rem) ? _new : A4($justinmimbs$time_extra$Time$Extra$add, $justinmimbs$time_extra$Time$Extra$Second, mult - rem, zone, _new);
	});
var $justinmimbs$time_extra$Time$Extra$Year = {$: 'Year'};
var $terezka$intervals$Intervals$Time$ceilingYear = F3(
	function (zone, mult, stamp) {
		var parts = A2(
			$justinmimbs$time_extra$Time$Extra$posixToParts,
			zone,
			A3($justinmimbs$time_extra$Time$Extra$ceiling, $justinmimbs$time_extra$Time$Extra$Year, zone, stamp));
		var rem = parts.year % mult;
		var newYear = (!rem) ? parts.year : ((parts.year - rem) + mult);
		return A2(
			$justinmimbs$time_extra$Time$Extra$partsToPosix,
			zone,
			_Utils_update(
				parts,
				{year: newYear}));
	});
var $terezka$intervals$Intervals$Time$ceilingUnit = F3(
	function (zone, unit, mult) {
		switch (unit.$) {
			case 'Millisecond':
				return A2($terezka$intervals$Intervals$Time$ceilingMs, zone, mult);
			case 'Second':
				return A2($terezka$intervals$Intervals$Time$ceilingSecond, zone, mult);
			case 'Minute':
				return A2($terezka$intervals$Intervals$Time$ceilingMinute, zone, mult);
			case 'Hour':
				return A2($terezka$intervals$Intervals$Time$ceilingHour, zone, mult);
			case 'Day':
				return A2($terezka$intervals$Intervals$Time$ceilingDay, zone, mult);
			case 'Month':
				return A2($terezka$intervals$Intervals$Time$ceilingMonth, zone, mult);
			default:
				return A2($terezka$intervals$Intervals$Time$ceilingYear, zone, mult);
		}
	});
var $terezka$intervals$Intervals$Time$Day = {$: 'Day'};
var $terezka$intervals$Intervals$Time$Hour = {$: 'Hour'};
var $terezka$intervals$Intervals$Time$Millisecond = {$: 'Millisecond'};
var $terezka$intervals$Intervals$Time$Minute = {$: 'Minute'};
var $terezka$intervals$Intervals$Time$Month = {$: 'Month'};
var $terezka$intervals$Intervals$Time$Second = {$: 'Second'};
var $terezka$intervals$Intervals$Time$Year = {$: 'Year'};
var $terezka$intervals$Intervals$Time$getChange = F3(
	function (zone, a, b) {
		var bP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b);
		var aP = A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a);
		return (!_Utils_eq(aP.year, bP.year)) ? $terezka$intervals$Intervals$Time$Year : ((!_Utils_eq(aP.month, bP.month)) ? $terezka$intervals$Intervals$Time$Month : ((!_Utils_eq(aP.day, bP.day)) ? $terezka$intervals$Intervals$Time$Day : ((!_Utils_eq(aP.hour, bP.hour)) ? $terezka$intervals$Intervals$Time$Hour : ((!_Utils_eq(aP.minute, bP.minute)) ? $terezka$intervals$Intervals$Time$Minute : ((!_Utils_eq(aP.second, bP.second)) ? $terezka$intervals$Intervals$Time$Second : $terezka$intervals$Intervals$Time$Millisecond)))));
	});
var $danhandrea$elm_time_extra$Util$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 400, year)) || ((!(!A2($elm$core$Basics$modBy, 100, year))) && (!A2($elm$core$Basics$modBy, 4, year)));
};
var $danhandrea$elm_time_extra$Month$days = F2(
	function (year, month) {
		switch (month.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $danhandrea$elm_time_extra$Util$isLeapYear(year) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $danhandrea$elm_time_extra$TimeExtra$daysInMonth = $danhandrea$elm_time_extra$Month$days;
var $terezka$intervals$Intervals$Time$toMs = $elm$time$Time$posixToMillis;
var $terezka$intervals$Intervals$Time$getDiff = F3(
	function (zone, a, b) {
		var _v0 = (_Utils_cmp(
			$terezka$intervals$Intervals$Time$toMs(a),
			$terezka$intervals$Intervals$Time$toMs(b)) < 0) ? _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b)) : _Utils_Tuple2(
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, b),
			A2($justinmimbs$time_extra$Time$Extra$posixToParts, zone, a));
		var aP = _v0.a;
		var bP = _v0.b;
		var dMsX = bP.millisecond - aP.millisecond;
		var dMs = (dMsX < 0) ? (1000 + dMsX) : dMsX;
		var dSecondX = (bP.second - aP.second) + ((dMsX < 0) ? (-1) : 0);
		var dMinuteX = (bP.minute - aP.minute) + ((dSecondX < 0) ? (-1) : 0);
		var dHourX = (bP.hour - aP.hour) + ((dMinuteX < 0) ? (-1) : 0);
		var dDayX = (bP.day - aP.day) + ((dHourX < 0) ? (-1) : 0);
		var dDay = (dDayX < 0) ? (A2($danhandrea$elm_time_extra$TimeExtra$daysInMonth, bP.year, bP.month) + dDayX) : dDayX;
		var dMonthX = ($terezka$intervals$Intervals$Time$monthAsInt(bP.month) - $terezka$intervals$Intervals$Time$monthAsInt(aP.month)) + ((dDayX < 0) ? (-1) : 0);
		var dMonth = (dMonthX < 0) ? (12 + dMonthX) : dMonthX;
		var dHour = (dHourX < 0) ? (24 + dHourX) : dHourX;
		var dMinute = (dMinuteX < 0) ? (60 + dMinuteX) : dMinuteX;
		var dSecond = (dSecondX < 0) ? (60 + dSecondX) : dSecondX;
		var dYearX = (bP.year - aP.year) + ((dMonthX < 0) ? (-1) : 0);
		var dYear = (dYearX < 0) ? ($terezka$intervals$Intervals$Time$monthAsInt(bP.month) + dYearX) : dYearX;
		return {day: dDay, hour: dHour, millisecond: dMs, minute: dMinute, month: dMonth, second: dSecond, year: dYear};
	});
var $terezka$intervals$Intervals$Time$oneSecond = 1000;
var $terezka$intervals$Intervals$Time$oneMinute = $terezka$intervals$Intervals$Time$oneSecond * 60;
var $terezka$intervals$Intervals$Time$oneHour = $terezka$intervals$Intervals$Time$oneMinute * 60;
var $terezka$intervals$Intervals$Time$oneDay = $terezka$intervals$Intervals$Time$oneHour * 24;
var $terezka$intervals$Intervals$Time$oneMs = 1;
var $terezka$intervals$Intervals$Time$getNumOfTicks = F5(
	function (zone, unit, mult, a, b) {
		var div = F2(
			function (n1, n2) {
				return $elm$core$Basics$floor(n1 / n2);
			});
		var timeDiff = function (ms) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				A2(
					div,
					$terezka$intervals$Intervals$Time$toMs(b) - $terezka$intervals$Intervals$Time$toMs(ceiled),
					ms),
				mult);
		};
		var diff = function (property) {
			var ceiled = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, a);
			return (_Utils_cmp(
				$terezka$intervals$Intervals$Time$toMs(ceiled),
				$terezka$intervals$Intervals$Time$toMs(b)) > 0) ? (-1) : A2(
				div,
				property(
					A3($terezka$intervals$Intervals$Time$getDiff, zone, ceiled, b)),
				mult);
		};
		switch (unit.$) {
			case 'Millisecond':
				return timeDiff($terezka$intervals$Intervals$Time$oneMs) + 1;
			case 'Second':
				return timeDiff($terezka$intervals$Intervals$Time$oneSecond) + 1;
			case 'Minute':
				return timeDiff($terezka$intervals$Intervals$Time$oneMinute) + 1;
			case 'Hour':
				return timeDiff($terezka$intervals$Intervals$Time$oneHour) + 1;
			case 'Day':
				return timeDiff($terezka$intervals$Intervals$Time$oneDay) + 1;
			case 'Month':
				return diff(
					function (d) {
						return d.month + (d.year * 12);
					}) + 1;
			default:
				return diff(
					function ($) {
						return $.year;
					}) + 1;
		}
	});
var $terezka$intervals$Intervals$Time$largerUnit = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Second);
		case 'Second':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Minute);
		case 'Minute':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Hour);
		case 'Hour':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Day);
		case 'Day':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Month);
		case 'Month':
			return $elm$core$Maybe$Just($terezka$intervals$Intervals$Time$Year);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $terezka$intervals$Intervals$Time$niceMultiples = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500]);
		case 'Second':
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 'Minute':
			return _List_fromArray(
				[1, 2, 5, 10, 15, 30]);
		case 'Hour':
			return _List_fromArray(
				[1, 2, 3, 4, 6, 8, 12]);
		case 'Day':
			return _List_fromArray(
				[1, 2, 3, 7, 14]);
		case 'Month':
			return _List_fromArray(
				[1, 2, 3, 4, 6]);
		default:
			return _List_fromArray(
				[1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 10000, 1000000, 10000000]);
	}
};
var $terezka$intervals$Intervals$Time$toBestUnit = F4(
	function (zone, amount, min, max) {
		var toNice = function (unit) {
			toNice:
			while (true) {
				var niceNums = $terezka$intervals$Intervals$Time$niceMultiples(unit);
				var maybeNiceNum = A2(
					$elm$core$List$filter,
					function (n) {
						return _Utils_cmp(
							A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, n, min, max),
							amount) < 1;
					},
					niceNums);
				var div = F2(
					function (n1, n2) {
						return $elm$core$Basics$ceiling(n1 / n2);
					});
				var _v0 = $elm$core$List$head(maybeNiceNum);
				if (_v0.$ === 'Just') {
					var niceNum = _v0.a;
					return _Utils_Tuple2(unit, niceNum);
				} else {
					var _v1 = $terezka$intervals$Intervals$Time$largerUnit(unit);
					if (_v1.$ === 'Just') {
						var larger = _v1.a;
						var $temp$unit = larger;
						unit = $temp$unit;
						continue toNice;
					} else {
						return _Utils_Tuple2($terezka$intervals$Intervals$Time$Year, 100000000);
					}
				}
			}
		};
		return toNice($terezka$intervals$Intervals$Time$Millisecond);
	});
var $terezka$intervals$Intervals$Time$toExtraUnit = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return $justinmimbs$time_extra$Time$Extra$Millisecond;
		case 'Second':
			return $justinmimbs$time_extra$Time$Extra$Second;
		case 'Minute':
			return $justinmimbs$time_extra$Time$Extra$Minute;
		case 'Hour':
			return $justinmimbs$time_extra$Time$Extra$Hour;
		case 'Day':
			return $justinmimbs$time_extra$Time$Extra$Day;
		case 'Month':
			return $justinmimbs$time_extra$Time$Extra$Month;
		default:
			return $justinmimbs$time_extra$Time$Extra$Year;
	}
};
var $terezka$intervals$Intervals$Time$unitToInt = function (unit) {
	switch (unit.$) {
		case 'Millisecond':
			return 0;
		case 'Second':
			return 1;
		case 'Minute':
			return 2;
		case 'Hour':
			return 3;
		case 'Day':
			return 4;
		case 'Month':
			return 5;
		default:
			return 6;
	}
};
var $terezka$intervals$Intervals$Time$values = F4(
	function (zone, maxMmount, min, max) {
		var _v0 = A4($terezka$intervals$Intervals$Time$toBestUnit, zone, maxMmount, min, max);
		var unit = _v0.a;
		var mult = _v0.b;
		var amount = A5($terezka$intervals$Intervals$Time$getNumOfTicks, zone, unit, mult, min, max);
		var initial = A4($terezka$intervals$Intervals$Time$ceilingUnit, zone, unit, mult, min);
		var tUnit = $terezka$intervals$Intervals$Time$toExtraUnit(unit);
		var toTick = F3(
			function (x, timestamp, change) {
				return {
					change: (_Utils_cmp(
						$terezka$intervals$Intervals$Time$unitToInt(change),
						$terezka$intervals$Intervals$Time$unitToInt(unit)) > 0) ? $elm$core$Maybe$Just(change) : $elm$core$Maybe$Nothing,
					isFirst: !x,
					multiple: mult,
					timestamp: timestamp,
					unit: unit,
					zone: zone
				};
			});
		var toTicks = F2(
			function (xs, acc) {
				toTicks:
				while (true) {
					if (xs.b) {
						var x = xs.a;
						var rest = xs.b;
						var prev = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, (x - 1) * mult, zone, initial);
						var curr = A4($justinmimbs$time_extra$Time$Extra$add, tUnit, x * mult, zone, initial);
						var change = A3($terezka$intervals$Intervals$Time$getChange, zone, prev, curr);
						var $temp$xs = rest,
							$temp$acc = A2(
							$elm$core$List$cons,
							A3(toTick, x, curr, change),
							acc);
						xs = $temp$xs;
						acc = $temp$acc;
						continue toTicks;
					} else {
						return acc;
					}
				}
			});
		return $elm$core$List$reverse(
			A2(
				toTicks,
				A2($elm$core$List$range, 0, amount - 1),
				_List_Nil));
	});
var $terezka$intervals$Intervals$times = F3(
	function (zone, amount, range) {
		var toUnit = function (unit) {
			switch (unit.$) {
				case 'Millisecond':
					return $terezka$intervals$Intervals$Millisecond;
				case 'Second':
					return $terezka$intervals$Intervals$Second;
				case 'Minute':
					return $terezka$intervals$Intervals$Minute;
				case 'Hour':
					return $terezka$intervals$Intervals$Hour;
				case 'Day':
					return $terezka$intervals$Intervals$Day;
				case 'Month':
					return $terezka$intervals$Intervals$Month;
				default:
					return $terezka$intervals$Intervals$Year;
			}
		};
		var translateUnit = function (time) {
			return {
				change: A2($elm$core$Maybe$map, toUnit, time.change),
				isFirst: time.isFirst,
				multiple: time.multiple,
				timestamp: time.timestamp,
				unit: toUnit(time.unit),
				zone: time.zone
			};
		};
		var fromMs = function (ts) {
			return $elm$time$Time$millisToPosix(
				$elm$core$Basics$round(ts));
		};
		return A2(
			$elm$core$List$map,
			translateUnit,
			A4(
				$terezka$intervals$Intervals$Time$values,
				zone,
				amount,
				fromMs(range.min),
				fromMs(range.max)));
	});
var $terezka$elm_charts$Internal$Svg$times = function (zone) {
	return $terezka$elm_charts$Internal$Svg$Generator(
		F2(
			function (i, b) {
				return A3(
					$terezka$intervals$Intervals$times,
					zone,
					i,
					{max: b.max, min: b.min});
			}));
};
var $terezka$elm_charts$Chart$Svg$times = $terezka$elm_charts$Internal$Svg$times;
var $terezka$elm_charts$Chart$generateValues = F4(
	function (amount, tick, maybeFormat, axis) {
		var toTickValues = F2(
			function (toValue, toString) {
				return $elm$core$List$map(
					function (i) {
						return {
							label: function () {
								if (maybeFormat.$ === 'Just') {
									var formatter = maybeFormat.a;
									return formatter(
										toValue(i));
								} else {
									return toString(i);
								}
							}(),
							value: toValue(i)
						};
					});
			});
		switch (tick.$) {
			case 'Floats':
				return A3(
					toTickValues,
					$elm$core$Basics$identity,
					$elm$core$String$fromFloat,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$floats, axis));
			case 'Ints':
				return A3(
					toTickValues,
					$elm$core$Basics$toFloat,
					$elm$core$String$fromInt,
					A3($terezka$elm_charts$Chart$Svg$generate, amount, $terezka$elm_charts$Chart$Svg$ints, axis));
			default:
				var zone = tick.a;
				return A3(
					toTickValues,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Basics$toFloat, $elm$time$Time$posixToMillis),
						function ($) {
							return $.timestamp;
						}),
					$terezka$elm_charts$Chart$Svg$formatTime(zone),
					A3(
						$terezka$elm_charts$Chart$Svg$generate,
						amount,
						$terezka$elm_charts$Chart$Svg$times(zone),
						axis));
		}
	});
var $terezka$elm_charts$Chart$Attributes$length = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{length: v});
	});
var $terezka$elm_charts$Internal$Svg$defaultTick = {attrs: _List_Nil, color: 'rgb(210, 210, 210)', length: 5, width: 1};
var $terezka$elm_charts$Internal$Svg$tick = F4(
	function (plane, config, isX, point) {
		return A4(
			$terezka$elm_charts$Internal$Svg$withAttrs,
			config.attrs,
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$class('elm-charts__tick'),
					$elm$svg$Svg$Attributes$stroke(config.color),
					$elm$svg$Svg$Attributes$strokeWidth(
					$elm$core$String$fromFloat(config.width)),
					$elm$svg$Svg$Attributes$x1(
					$elm$core$String$fromFloat(
						A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, point.x))),
					$elm$svg$Svg$Attributes$x2(
					$elm$core$String$fromFloat(
						A2($terezka$elm_charts$Internal$Coordinates$toSVGX, plane, point.x) + (isX ? 0 : (-config.length)))),
					$elm$svg$Svg$Attributes$y1(
					$elm$core$String$fromFloat(
						A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, point.y))),
					$elm$svg$Svg$Attributes$y2(
					$elm$core$String$fromFloat(
						A2($terezka$elm_charts$Internal$Coordinates$toSVGY, plane, point.y) + (isX ? config.length : 0)))
				]),
			_List_Nil);
	});
var $terezka$elm_charts$Internal$Svg$xTick = F3(
	function (plane, config, point) {
		return A4($terezka$elm_charts$Internal$Svg$tick, plane, config, true, point);
	});
var $terezka$elm_charts$Chart$Svg$xTick = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$xTick,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultTick));
	});
var $terezka$elm_charts$Chart$xTicks = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{amount: 5, color: '', flip: false, generate: $terezka$elm_charts$Internal$Svg$Floats, grid: true, height: 5, limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, width: 1});
	var toTicks = function (p) {
		return A2(
			$elm$core$List$map,
			function ($) {
				return $.value;
			},
			A4(
				$terezka$elm_charts$Chart$generateValues,
				config.amount,
				config.generate,
				$elm$core$Maybe$Nothing,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, x) {
							return f(x);
						}),
					p.x,
					config.limits)));
	};
	var addTickValues = F2(
		function (p, ts) {
			return (!config.grid) ? ts : _Utils_update(
				ts,
				{
					xs: _Utils_ap(
						ts.xs,
						toTicks(p))
				});
		});
	return A2(
		$terezka$elm_charts$Chart$TicksElement,
		addTickValues,
		function (p) {
			var toTick = function (x) {
				return A3(
					$terezka$elm_charts$Chart$Svg$xTick,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(config.color),
							$terezka$elm_charts$Chart$Attributes$length(
							config.flip ? (-config.height) : config.height),
							$terezka$elm_charts$Chart$Attributes$width(config.width)
						]),
					{
						x: x,
						y: config.pinned(p.y)
					});
			};
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__x-ticks')
					]),
				A2(
					$elm$core$List$map,
					toTick,
					toTicks(p)));
		});
};
var $terezka$elm_charts$Chart$Attributes$rotate = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{rotate: config.rotate + v});
	});
var $terezka$elm_charts$Chart$Attributes$y2 = F2(
	function (v, config) {
		return _Utils_update(
			config,
			{
				y2: $elm$core$Maybe$Just(v)
			});
	});
var $terezka$elm_charts$Chart$yAxis = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{arrow: true, color: '', limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, width: 1});
	var addTickValues = F2(
		function (p, ts) {
			return _Utils_update(
				ts,
				{
					xAxis: A2(
						$elm$core$List$cons,
						config.pinned(p.x),
						ts.xAxis)
				});
		});
	return A2(
		$terezka$elm_charts$Chart$AxisElement,
		addTickValues,
		function (p) {
			var yLimit = A3(
				$elm$core$List$foldl,
				F2(
					function (f, y) {
						return f(y);
					}),
				p.y,
				config.limits);
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__y-axis')
					]),
				_List_fromArray(
					[
						A2(
						$terezka$elm_charts$Chart$Svg$line,
						p,
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$color(config.color),
								$terezka$elm_charts$Chart$Attributes$width(config.width),
								$terezka$elm_charts$Chart$Attributes$x1(
								config.pinned(p.x)),
								$terezka$elm_charts$Chart$Attributes$y1(
								A2($elm$core$Basics$max, p.y.min, yLimit.min)),
								$terezka$elm_charts$Chart$Attributes$y2(
								A2($elm$core$Basics$min, p.y.max, yLimit.max))
							])),
						config.arrow ? A3(
						$terezka$elm_charts$Chart$Svg$arrow,
						p,
						_List_fromArray(
							[
								$terezka$elm_charts$Chart$Attributes$color(config.color),
								$terezka$elm_charts$Chart$Attributes$rotate(-90)
							]),
						{
							x: config.pinned(p.x),
							y: yLimit.max
						}) : $elm$svg$Svg$text('')
					]));
		});
};
var $terezka$elm_charts$Internal$Svg$End = {$: 'End'};
var $terezka$elm_charts$Chart$LabelsElement = F3(
	function (a, b, c) {
		return {$: 'LabelsElement', a: a, b: b, c: c};
	});
var $terezka$elm_charts$Internal$Svg$Start = {$: 'Start'};
var $terezka$elm_charts$Chart$yLabels = function (edits) {
	var toTicks = F2(
		function (p, config) {
			return A4(
				$terezka$elm_charts$Chart$generateValues,
				config.amount,
				config.generate,
				config.format,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, y) {
							return f(y);
						}),
					p.y,
					config.limits));
		});
	var toTickValues = F3(
		function (p, config, ts) {
			return (!config.grid) ? ts : _Utils_update(
				ts,
				{
					ys: _Utils_ap(
						ts.ys,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.value;
							},
							A2(toTicks, p, config)))
				});
		});
	var toConfig = function (p) {
		return A2(
			$terezka$elm_charts$Internal$Helpers$apply,
			edits,
			{amount: 5, anchor: $elm$core$Maybe$Nothing, attrs: _List_Nil, color: '#808BAB', ellipsis: $elm$core$Maybe$Nothing, flip: false, fontSize: $elm$core$Maybe$Nothing, format: $elm$core$Maybe$Nothing, generate: $terezka$elm_charts$Internal$Svg$Floats, grid: false, hideOverflow: false, limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, rotate: 0, uppercase: false, xOff: -10, yOff: 3});
	};
	return A3(
		$terezka$elm_charts$Chart$LabelsElement,
		toConfig,
		toTickValues,
		F2(
			function (p, config) {
				var _default = $terezka$elm_charts$Internal$Svg$defaultLabel;
				var toLabel = function (item) {
					return A4(
						$terezka$elm_charts$Internal$Svg$label,
						p,
						_Utils_update(
							_default,
							{
								anchor: function () {
									var _v0 = config.anchor;
									if (_v0.$ === 'Nothing') {
										return $elm$core$Maybe$Just(
											config.flip ? $terezka$elm_charts$Internal$Svg$Start : $terezka$elm_charts$Internal$Svg$End);
									} else {
										var anchor = _v0.a;
										return $elm$core$Maybe$Just(anchor);
									}
								}(),
								attrs: config.attrs,
								color: config.color,
								ellipsis: config.ellipsis,
								fontSize: config.fontSize,
								hideOverflow: config.hideOverflow,
								rotate: config.rotate,
								uppercase: config.uppercase,
								xOff: config.flip ? (-config.xOff) : config.xOff,
								yOff: config.yOff
							}),
						_List_fromArray(
							[
								$elm$svg$Svg$text(item.label)
							]),
						{
							x: config.pinned(p.x),
							y: item.value
						});
				};
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('elm-charts__y-labels')
						]),
					A2(
						$elm$core$List$map,
						toLabel,
						A2(toTicks, p, config)));
			}));
};
var $terezka$elm_charts$Internal$Svg$yTick = F3(
	function (plane, config, point) {
		return A4($terezka$elm_charts$Internal$Svg$tick, plane, config, false, point);
	});
var $terezka$elm_charts$Chart$Svg$yTick = F2(
	function (plane, edits) {
		return A2(
			$terezka$elm_charts$Internal$Svg$yTick,
			plane,
			A2($terezka$elm_charts$Internal$Helpers$apply, edits, $terezka$elm_charts$Internal$Svg$defaultTick));
	});
var $terezka$elm_charts$Chart$yTicks = function (edits) {
	var config = A2(
		$terezka$elm_charts$Internal$Helpers$apply,
		edits,
		{amount: 5, color: '', flip: false, generate: $terezka$elm_charts$Internal$Svg$Floats, grid: true, height: 5, limits: _List_Nil, pinned: $terezka$elm_charts$Chart$Attributes$zero, width: 1});
	var toTicks = function (p) {
		return A2(
			$elm$core$List$map,
			function ($) {
				return $.value;
			},
			A4(
				$terezka$elm_charts$Chart$generateValues,
				config.amount,
				config.generate,
				$elm$core$Maybe$Nothing,
				A3(
					$elm$core$List$foldl,
					F2(
						function (f, y) {
							return f(y);
						}),
					p.y,
					config.limits)));
	};
	var addTickValues = F2(
		function (p, ts) {
			return _Utils_update(
				ts,
				{
					ys: _Utils_ap(
						ts.ys,
						toTicks(p))
				});
		});
	return A2(
		$terezka$elm_charts$Chart$TicksElement,
		addTickValues,
		function (p) {
			var toTick = function (y) {
				return A3(
					$terezka$elm_charts$Chart$Svg$yTick,
					p,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$color(config.color),
							$terezka$elm_charts$Chart$Attributes$length(
							config.flip ? (-config.height) : config.height),
							$terezka$elm_charts$Chart$Attributes$width(config.width)
						]),
					{
						x: config.pinned(p.x),
						y: y
					});
			};
			return A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$class('elm-charts__y-ticks')
					]),
				A2(
					$elm$core$List$map,
					toTick,
					toTicks(p)));
		});
};
var $author$project$Main$viewChart = F3(
	function (chartHovering, shortPathLabels, interestListTable) {
		var widthChart = 800;
		var heightChart = 400;
		var getLabel = function (p) {
			var _v2 = A2($elm$core$Dict$get, p, shortPathLabels);
			if (_v2.$ === 'Just') {
				var s = _v2.a;
				return s;
			} else {
				return A2($elm$core$String$join, '.', p);
			}
		};
		var bars = A2(
			$elm$core$List$map,
			function (runId) {
				var get = function (path) {
					var _v0 = A2(
						$elm$core$Maybe$map,
						function ($) {
							return $.value;
						},
						A2(
							$elm$core$Dict$get,
							_Utils_Tuple2(runId, path),
							interestListTable.values));
					if (_v0.$ === 'Just') {
						switch (_v0.a.$) {
							case 'Float':
								var f = _v0.a.a;
								return f;
							case 'String':
								return 0.0;
							default:
								var _v1 = _v0.a;
								return 0.0;
						}
					} else {
						return 0.0;
					}
				};
				return A2(
					$terezka$elm_charts$Chart$format,
					function (v) {
						return $author$project$Styling$formatGermanNumber(v);
					},
					A2(
						$terezka$elm_charts$Chart$named,
						$elm$core$String$fromInt(runId),
						A2(
							$terezka$elm_charts$Chart$bar,
							get,
							_List_fromArray(
								[
									$terezka$elm_charts$Chart$Attributes$color(
									$author$project$Styling$runColorForChart(runId))
								]))));
			},
			interestListTable.runs);
		var chart = A2(
			$terezka$elm_charts$Chart$chart,
			_List_fromArray(
				[
					$terezka$elm_charts$Chart$Attributes$height(heightChart),
					$terezka$elm_charts$Chart$Attributes$width(widthChart),
					A2(
					$terezka$elm_charts$Chart$Events$onMouseMove,
					$author$project$Main$OnChartHover,
					$terezka$elm_charts$Chart$Events$getNearest($terezka$elm_charts$Chart$Item$bins)),
					$terezka$elm_charts$Chart$Events$onMouseLeave(
					$author$project$Main$OnChartHover(_List_Nil))
				]),
			_List_fromArray(
				[
					$terezka$elm_charts$Chart$xTicks(_List_Nil),
					$terezka$elm_charts$Chart$yTicks(_List_Nil),
					$terezka$elm_charts$Chart$yLabels(_List_Nil),
					$terezka$elm_charts$Chart$xAxis(_List_Nil),
					$terezka$elm_charts$Chart$yAxis(_List_Nil),
					A3($terezka$elm_charts$Chart$bars, _List_Nil, bars, interestListTable.paths),
					A2(
					$terezka$elm_charts$Chart$binLabels,
					getLabel,
					_List_fromArray(
						[
							$terezka$elm_charts$Chart$Attributes$moveDown(40)
						])),
					A2(
					$terezka$elm_charts$Chart$each,
					chartHovering,
					F2(
						function (p, item) {
							return _List_fromArray(
								[
									A4($terezka$elm_charts$Chart$tooltip, item, _List_Nil, _List_Nil, _List_Nil)
								]);
						}))
				]));
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(widthChart)),
					$mdgriffith$elm_ui$Element$height(
					$mdgriffith$elm_ui$Element$px(heightChart)),
					$mdgriffith$elm_ui$Element$padding(2 * $author$project$Styling$sizes.large),
					$mdgriffith$elm_ui$Element$alignTop,
					$mdgriffith$elm_ui$Element$centerX
				]),
			$mdgriffith$elm_ui$Element$html(chart));
	});
var $author$project$Main$RemoveFromLensClicked = F2(
	function (a, b) {
		return {$: 'RemoveFromLensClicked', a: a, b: b};
	});
var $author$project$Styling$size16 = $feathericons$elm_feather$FeatherIcons$withSize(16);
var $mdgriffith$elm_ui$Element$InternalColumn = function (a) {
	return {$: 'InternalColumn', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$GridTemplateStyle = function (a) {
	return {$: 'GridTemplateStyle', a: a};
};
var $mdgriffith$elm_ui$Internal$Model$AsGrid = {$: 'AsGrid'};
var $mdgriffith$elm_ui$Internal$Model$asGrid = $mdgriffith$elm_ui$Internal$Model$AsGrid;
var $mdgriffith$elm_ui$Internal$Flag$gridPosition = $mdgriffith$elm_ui$Internal$Flag$flag(35);
var $mdgriffith$elm_ui$Internal$Flag$gridTemplate = $mdgriffith$elm_ui$Internal$Flag$flag(34);
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $mdgriffith$elm_ui$Element$tableHelper = F2(
	function (attrs, config) {
		var onGrid = F3(
			function (rowLevel, columnLevel, elem) {
				return A4(
					$mdgriffith$elm_ui$Internal$Model$element,
					$mdgriffith$elm_ui$Internal$Model$asEl,
					$mdgriffith$elm_ui$Internal$Model$div,
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Internal$Model$StyleClass,
							$mdgriffith$elm_ui$Internal$Flag$gridPosition,
							$mdgriffith$elm_ui$Internal$Model$GridPosition(
								{col: columnLevel, height: 1, row: rowLevel, width: 1}))
						]),
					$mdgriffith$elm_ui$Internal$Model$Unkeyed(
						_List_fromArray(
							[elem])));
			});
		var columnWidth = function (col) {
			if (col.$ === 'InternalIndexedColumn') {
				var colConfig = col.a;
				return colConfig.width;
			} else {
				var colConfig = col.a;
				return colConfig.width;
			}
		};
		var columnHeader = function (col) {
			if (col.$ === 'InternalIndexedColumn') {
				var colConfig = col.a;
				return colConfig.header;
			} else {
				var colConfig = col.a;
				return colConfig.header;
			}
		};
		var maybeHeaders = function (headers) {
			return A2(
				$elm$core$List$all,
				$elm$core$Basics$eq($mdgriffith$elm_ui$Internal$Model$Empty),
				headers) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (col, header) {
							return A3(onGrid, 1, col + 1, header);
						}),
					headers));
		}(
			A2($elm$core$List$map, columnHeader, config.columns));
		var add = F3(
			function (cell, columnConfig, cursor) {
				if (columnConfig.$ === 'InternalIndexedColumn') {
					var col = columnConfig.a;
					return _Utils_update(
						cursor,
						{
							column: cursor.column + 1,
							elements: A2(
								$elm$core$List$cons,
								A3(
									onGrid,
									cursor.row,
									cursor.column,
									A2(
										col.view,
										_Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? (cursor.row - 1) : (cursor.row - 2),
										cell)),
								cursor.elements)
						});
				} else {
					var col = columnConfig.a;
					return {
						column: cursor.column + 1,
						elements: A2(
							$elm$core$List$cons,
							A3(
								onGrid,
								cursor.row,
								cursor.column,
								col.view(cell)),
							cursor.elements),
						row: cursor.row
					};
				}
			});
		var build = F3(
			function (columns, rowData, cursor) {
				var newCursor = A3(
					$elm$core$List$foldl,
					add(rowData),
					cursor,
					columns);
				return {column: 1, elements: newCursor.elements, row: cursor.row + 1};
			});
		var children = A3(
			$elm$core$List$foldl,
			build(config.columns),
			{
				column: 1,
				elements: _List_Nil,
				row: _Utils_eq(maybeHeaders, $elm$core$Maybe$Nothing) ? 1 : 2
			},
			config.data);
		var _v0 = A2(
			$mdgriffith$elm_ui$Internal$Model$getSpacing,
			attrs,
			_Utils_Tuple2(0, 0));
		var sX = _v0.a;
		var sY = _v0.b;
		var template = A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$gridTemplate,
			$mdgriffith$elm_ui$Internal$Model$GridTemplateStyle(
				{
					columns: A2($elm$core$List$map, columnWidth, config.columns),
					rows: A2(
						$elm$core$List$repeat,
						$elm$core$List$length(config.data),
						$mdgriffith$elm_ui$Internal$Model$Content),
					spacing: _Utils_Tuple2(
						$mdgriffith$elm_ui$Element$px(sX),
						$mdgriffith$elm_ui$Element$px(sY))
				}));
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asGrid,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				A2($elm$core$List$cons, template, attrs)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(
				function () {
					if (maybeHeaders.$ === 'Nothing') {
						return children.elements;
					} else {
						var renderedHeaders = maybeHeaders.a;
						return _Utils_ap(
							renderedHeaders,
							$elm$core$List$reverse(children.elements));
					}
				}()));
	});
var $mdgriffith$elm_ui$Element$table = F2(
	function (attrs, config) {
		return A2(
			$mdgriffith$elm_ui$Element$tableHelper,
			attrs,
			{
				columns: A2($elm$core$List$map, $mdgriffith$elm_ui$Element$InternalColumn, config.columns),
				data: config.data
			});
	});
var $author$project$Styling$runColorForUI = function (ri) {
	var _v0 = $author$project$Styling$runColor(ri);
	var r = _v0.a;
	var g = _v0.b;
	var b = _v0.c;
	return A3($mdgriffith$elm_ui$Element$rgb255, r, g, b);
};
var $author$project$Main$viewRunId = F2(
	function (attrs, runId) {
		return A2(
			$mdgriffith$elm_ui$Element$el,
			_Utils_ap(
				attrs,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$Font$bold,
						$mdgriffith$elm_ui$Element$Font$color(
						$author$project$Styling$runColorForUI(runId))
					])),
			$mdgriffith$elm_ui$Element$text(
				$elm$core$String$fromInt(runId)));
	});
var $author$project$Main$viewValueSetAsClassicTable = F3(
	function (shortPathLabels, lensId, valueSet) {
		var shortPathLabelColumn = {
			header: $mdgriffith$elm_ui$Element$none,
			view: function (path) {
				return A2(
					$mdgriffith$elm_ui$Element$column,
					_List_Nil,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text(
							A2(
								$elm$core$Maybe$withDefault,
								'CAN\'T HAPPEN',
								A2($elm$core$Dict$get, path, shortPathLabels))),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$size(12)
								]),
							$mdgriffith$elm_ui$Element$text(
								A2($elm$core$String$join, '.', path)))
						]));
			},
			width: $mdgriffith$elm_ui$Element$shrink
		};
		var deleteColumn = {
			header: $mdgriffith$elm_ui$Element$none,
			view: function (path) {
				var removeMsg = A2(
					$author$project$Main$RemoveFromLensClicked,
					lensId,
					A2(
						$elm$core$List$map,
						function (runId) {
							return _Utils_Tuple2(runId, path);
						},
						valueSet.runs));
				return A2(
					$author$project$Styling$dangerousIconButton,
					$author$project$Styling$size16($feathericons$elm_feather$FeatherIcons$trash2),
					removeMsg);
			},
			width: $mdgriffith$elm_ui$Element$shrink
		};
		var dataColumns = A2(
			$elm$core$List$map,
			function (runId) {
				return {
					header: A2(
						$author$project$Main$viewRunId,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$alignRight]),
						runId),
					view: function (path) {
						var value = function () {
							var _v0 = A2(
								$elm$core$Maybe$map,
								function ($) {
									return $.value;
								},
								A2(
									$elm$core$Dict$get,
									_Utils_Tuple2(runId, path),
									valueSet.values));
							if (_v0.$ === 'Just') {
								switch (_v0.a.$) {
									case 'Float':
										var f = _v0.a.a;
										return A2(
											$mdgriffith$elm_ui$Element$el,
											A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerValues),
											$mdgriffith$elm_ui$Element$text(
												$author$project$Styling$formatGermanNumber(f)));
									case 'String':
										var s = _v0.a.a;
										return A2(
											$mdgriffith$elm_ui$Element$el,
											A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerValues),
											$mdgriffith$elm_ui$Element$text(s));
									default:
										var _v1 = _v0.a;
										return A2(
											$mdgriffith$elm_ui$Element$el,
											A2(
												$elm$core$List$cons,
												$mdgriffith$elm_ui$Element$Font$alignRight,
												A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$bold, $author$project$Styling$fonts.explorerValues)),
											$mdgriffith$elm_ui$Element$text('bold'));
								}
							} else {
								return $mdgriffith$elm_ui$Element$none;
							}
						}();
						return value;
					},
					width: $mdgriffith$elm_ui$Element$shrink
				};
			},
			valueSet.runs);
		return A2(
			$mdgriffith$elm_ui$Element$table,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.large),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large)
				]),
			{
				columns: A2(
					$elm$core$List$cons,
					shortPathLabelColumn,
					_Utils_ap(
						dataColumns,
						_List_fromArray(
							[deleteColumn]))),
				data: valueSet.paths
			});
	});
var $author$project$Main$AddColumnToLensTableClicked = F2(
	function (a, b) {
		return {$: 'AddColumnToLensTableClicked', a: a, b: b};
	});
var $author$project$Main$AddRowToLensTableClicked = F2(
	function (a, b) {
		return {$: 'AddRowToLensTableClicked', a: a, b: b};
	});
var $author$project$Main$CellOfLensTableEditFinished = F3(
	function (a, b, c) {
		return {$: 'CellOfLensTableEditFinished', a: a, b: b, c: c};
	});
var $author$project$Main$CellOfLensTableEdited = F3(
	function (a, b, c) {
		return {$: 'CellOfLensTableEdited', a: a, b: b, c: c};
	});
var $author$project$Main$DeleteColumnClicked = F2(
	function (a, b) {
		return {$: 'DeleteColumnClicked', a: a, b: b};
	});
var $author$project$Main$DeleteRowClicked = F2(
	function (a, b) {
		return {$: 'DeleteRowClicked', a: a, b: b};
	});
var $author$project$Main$DisplayReMapModalClicked = function (a) {
	return {$: 'DisplayReMapModalClicked', a: a};
};
var $author$project$Main$DragDropMsg = function (a) {
	return {$: 'DragDropMsg', a: a};
};
var $author$project$Main$DragFromCell = F3(
	function (a, b, c) {
		return {$: 'DragFromCell', a: a, b: b, c: c};
	});
var $author$project$Main$DropInNewColumn = F2(
	function (a, b) {
		return {$: 'DropInNewColumn', a: a, b: b};
	});
var $author$project$Main$DropInNewRow = F2(
	function (a, b) {
		return {$: 'DropInNewRow', a: a, b: b};
	});
var $author$project$Main$DropOnCell = F3(
	function (a, b, c) {
		return {$: 'DropOnCell', a: a, b: b, c: c};
	});
var $author$project$Main$Highlight = F2(
	function (a, b) {
		return {$: 'Highlight', a: a, b: b};
	});
var $author$project$Main$MoveCellEditorRequested = F5(
	function (a, b, c, d, e) {
		return {$: 'MoveCellEditorRequested', a: a, b: b, c: c, d: d, e: e};
	});
var $author$project$Html5$DragDrop$DragEnd = {$: 'DragEnd'};
var $author$project$Html5$DragDrop$DragStart = F2(
	function (a, b) {
		return {$: 'DragStart', a: a, b: b};
	});
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 'Custom', a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $author$project$Html5$DragDrop$onWithOptions = F3(
	function (name, _v0, decoder) {
		var stopPropagation = _v0.stopPropagation;
		var preventDefault = _v0.preventDefault;
		return A2(
			$elm$html$Html$Events$custom,
			name,
			A2(
				$elm$json$Json$Decode$map,
				function (msg) {
					return {message: msg, preventDefault: preventDefault, stopPropagation: stopPropagation};
				},
				decoder));
	});
var $author$project$Html5$DragDrop$draggable = F2(
	function (wrap, drag) {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$attribute, 'draggable', 'true'),
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'dragstart',
				{preventDefault: false, stopPropagation: true},
				A2(
					$elm$json$Json$Decode$map,
					A2(
						$elm$core$Basics$composeL,
						wrap,
						$author$project$Html5$DragDrop$DragStart(drag)),
					$elm$json$Json$Decode$value)),
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'dragend',
				{preventDefault: false, stopPropagation: true},
				$elm$json$Json$Decode$succeed(
					wrap($author$project$Html5$DragDrop$DragEnd)))
			]);
	});
var $author$project$Html5$DragDrop$DragEnter = function (a) {
	return {$: 'DragEnter', a: a};
};
var $author$project$Html5$DragDrop$DragLeave = function (a) {
	return {$: 'DragLeave', a: a};
};
var $author$project$Html5$DragDrop$DragOver = function (a) {
	return {$: 'DragOver', a: a};
};
var $author$project$Html5$DragDrop$Drop = function (a) {
	return {$: 'Drop', a: a};
};
var $author$project$Html5$DragDrop$droppable = F2(
	function (wrap, dropId) {
		return _List_fromArray(
			[
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'dragenter',
				{preventDefault: true, stopPropagation: true},
				$elm$json$Json$Decode$succeed(
					wrap(
						$author$project$Html5$DragDrop$DragEnter(dropId)))),
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'dragleave',
				{preventDefault: true, stopPropagation: true},
				$elm$json$Json$Decode$succeed(
					wrap(
						$author$project$Html5$DragDrop$DragLeave(dropId)))),
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'dragover',
				{preventDefault: true, stopPropagation: false},
				$elm$json$Json$Decode$succeed(
					wrap(
						$author$project$Html5$DragDrop$DragOver(dropId)))),
				A3(
				$author$project$Html5$DragDrop$onWithOptions,
				'drop',
				{preventDefault: true, stopPropagation: true},
				$elm$json$Json$Decode$succeed(
					wrap(
						$author$project$Html5$DragDrop$Drop(dropId))))
			]);
	});
var $author$project$Styling$emptyCellColor = A3($mdgriffith$elm_ui$Element$rgb255, 240, 240, 240);
var $author$project$Html5$DragDrop$getDropId = function (model) {
	switch (model.$) {
		case 'NotDragging':
			return $elm$core$Maybe$Nothing;
		case 'Dragging':
			var dragId = model.a;
			return $elm$core$Maybe$Nothing;
		default:
			var dragId = model.a;
			var dropId = model.b;
			return $elm$core$Maybe$Just(dropId);
	}
};
var $author$project$Lens$CellContent$getLabel = function (cc) {
	if (cc.$ === 'ValueAt') {
		return $elm$core$Maybe$Nothing;
	} else {
		var l = cc.a;
		return $elm$core$Maybe$Just(l);
	}
};
var $author$project$Lens$CellContent$getValueAt = function (cc) {
	if (cc.$ === 'ValueAt') {
		var ri = cc.a;
		var p = cc.b;
		return $elm$core$Maybe$Just(
			_Utils_Tuple2(ri, p));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $mdgriffith$elm_ui$Element$Border$glow = F2(
	function (clr, size) {
		return $mdgriffith$elm_ui$Element$Border$shadow(
			{
				blur: size * 2,
				color: clr,
				offset: _Utils_Tuple2(0, 0),
				size: size
			});
	});
var $mdgriffith$elm_ui$Element$Border$innerShadow = function (almostShade) {
	var shade = {blur: almostShade.blur, color: almostShade.color, inset: true, offset: almostShade.offset, size: almostShade.size};
	return A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$shadows,
		A3(
			$mdgriffith$elm_ui$Internal$Model$Single,
			$mdgriffith$elm_ui$Internal$Model$boxShadowClass(shade),
			'box-shadow',
			$mdgriffith$elm_ui$Internal$Model$formatBoxShadow(shade)));
};
var $mdgriffith$elm_ui$Element$Border$innerGlow = F2(
	function (clr, size) {
		return $mdgriffith$elm_ui$Element$Border$innerShadow(
			{
				blur: size * 2,
				color: clr,
				offset: _Utils_Tuple2(0, 0),
				size: size
			});
	});
var $mdgriffith$elm_ui$Internal$Model$Max = F2(
	function (a, b) {
		return {$: 'Max', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$maximum = F2(
	function (i, l) {
		return A2($mdgriffith$elm_ui$Internal$Model$Max, i, l);
	});
var $author$project$Cells$nextPos = F2(
	function (p, cs) {
		return (_Utils_cmp(
			p.column,
			$author$project$Cells$columns(cs) - 1) > -1) ? ((_Utils_cmp(
			p.row,
			$author$project$Cells$rows(cs) - 1) > -1) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			{column: 0, row: p.row + 1})) : $elm$core$Maybe$Just(
			_Utils_update(
				p,
				{column: p.column + 1}));
	});
var $author$project$Cells$prevPos = F2(
	function (p, cs) {
		return (!p.column) ? ((!p.row) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(
			{
				column: $author$project$Cells$columns(cs) - 1,
				row: p.row - 1
			})) : $elm$core$Maybe$Just(
			_Utils_update(
				p,
				{column: p.column - 1}));
	});
var $author$project$KeyBindings$shift = _Utils_update(
	$author$project$KeyBindings$noModifiers,
	{shift: true});
var $author$project$Main$Data = function (a) {
	return {$: 'Data', a: a};
};
var $author$project$Main$GapBefore = function (a) {
	return {$: 'GapBefore', a: a};
};
var $author$project$Main$tableElementFromIndex = function (ndx) {
	var element = (ndx / 2) | 0;
	return (!(ndx % 2)) ? $author$project$Main$GapBefore(element) : $author$project$Main$Data(element);
};
var $author$project$Main$viewValueSetAsUserDefinedTable = F4(
	function (lensId, dragDrop, td, valueSet) {
		var ifEditing = (!_Utils_eq(td.editing, $elm$core$Maybe$Nothing)) ? $elm$core$Basics$identity : $elm$core$Basics$always(_List_Nil);
		var separator = F2(
			function (isColumn, pos) {
				var highlight = ifEditing(
					function () {
						var background = $mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroGreen);
						var _v19 = $author$project$Html5$DragDrop$getDropId(dragDrop);
						if (_v19.$ === 'Nothing') {
							return _List_fromArray(
								[
									background,
									$mdgriffith$elm_ui$Element$Events$onClick(
									isColumn ? A2($author$project$Main$AddColumnToLensTableClicked, lensId, pos.column) : A2($author$project$Main$AddRowToLensTableClicked, lensId, pos.row)),
									$mdgriffith$elm_ui$Element$mouseOver(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow)
										]))
								]);
						} else {
							switch (_v19.a.$) {
								case 'DropInNewRow':
									var _v20 = _v19.a;
									var li = _v20.a;
									var p = _v20.b;
									return (_Utils_eq(lensId, li) && (_Utils_eq(pos, p) && (!isColumn))) ? _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow),
											A2($mdgriffith$elm_ui$Element$Border$glow, $author$project$Styling$germanZeroYellow, 2)
										]) : _List_fromArray(
										[background]);
								case 'DropOnCell':
									var _v21 = _v19.a;
									return _List_fromArray(
										[background]);
								default:
									var _v22 = _v19.a;
									var li = _v22.a;
									var p = _v22.b;
									return (_Utils_eq(lensId, li) && (_Utils_eq(pos, p) && isColumn)) ? _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow),
											A2($mdgriffith$elm_ui$Element$Border$glow, $author$project$Styling$germanZeroYellow, 2)
										]) : _List_fromArray(
										[background]);
							}
						}
					}());
				var droppable = ifEditing(
					(!_Utils_eq(
						$author$project$Html5$DragDrop$getDropId(dragDrop),
						$elm$core$Maybe$Nothing)) ? A2(
						$elm$core$List$map,
						$mdgriffith$elm_ui$Element$htmlAttribute,
						A2(
							$author$project$Html5$DragDrop$droppable,
							$author$project$Main$DragDropMsg,
							isColumn ? A2($author$project$Main$DropInNewColumn, lensId, pos) : A2($author$project$Main$DropInNewRow, lensId, pos))) : _List_Nil);
				return A2(
					$mdgriffith$elm_ui$Element$el,
					_Utils_ap(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width(
								isColumn ? $mdgriffith$elm_ui$Element$px($author$project$Styling$sizes.tableGap) : $mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$height(
								isColumn ? $mdgriffith$elm_ui$Element$fill : $mdgriffith$elm_ui$Element$px($author$project$Styling$sizes.tableGap)),
								$mdgriffith$elm_ui$Element$Border$rounded(2)
							]),
						_Utils_ap(highlight, droppable)),
					$mdgriffith$elm_ui$Element$none);
			});
		var viewCell = F2(
			function (cell, pos) {
				var viewPath = function (p) {
					return A2(
						$mdgriffith$elm_ui$Element$paragraph,
						_List_Nil,
						A2(
							$elm$core$List$map,
							$mdgriffith$elm_ui$Element$text,
							A2($elm$core$List$intersperse, '.', p)));
				};
				var viewAbsolutePath = function (_v18) {
					var runId = _v18.a;
					var path = _v18.b;
					return A2(
						$mdgriffith$elm_ui$Element$row,
						_List_Nil,
						_List_fromArray(
							[
								A2($author$project$Main$viewRunId, _List_Nil, runId),
								$mdgriffith$elm_ui$Element$text(' '),
								viewPath(path)
							]));
				};
				var onClick = ifEditing(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Events$onClick(
							A3($author$project$Main$CellOfLensTableEdited, lensId, pos, cell))
						]));
				var highlight = ifEditing(
					function () {
						var _v14 = $author$project$Html5$DragDrop$getDropId(dragDrop);
						if (_v14.$ === 'Nothing') {
							return _List_Nil;
						} else {
							switch (_v14.a.$) {
								case 'DropOnCell':
									var _v15 = _v14.a;
									var li = _v15.a;
									var p = _v15.b;
									return (_Utils_eq(lensId, li) && _Utils_eq(p, pos)) ? _List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroYellow),
											A2($mdgriffith$elm_ui$Element$Border$glow, $author$project$Styling$germanZeroYellow, 2)
										]) : _List_Nil;
								case 'DropInNewColumn':
									var _v16 = _v14.a;
									return _List_Nil;
								default:
									var _v17 = _v14.a;
									return _List_Nil;
							}
						}
					}());
				var dropTarget = ifEditing(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_ui$Element$htmlAttribute,
						A2(
							$author$project$Html5$DragDrop$droppable,
							$author$project$Main$DragDropMsg,
							A3($author$project$Main$DropOnCell, lensId, pos, cell))));
				var draggable = ifEditing(
					A2(
						$elm$core$List$map,
						$mdgriffith$elm_ui$Element$htmlAttribute,
						A2(
							$author$project$Html5$DragDrop$draggable,
							$author$project$Main$DragDropMsg,
							A3($author$project$Main$DragFromCell, lensId, pos, cell))));
				var cellElement = F2(
					function (attrs, v) {
						return A2(
							$mdgriffith$elm_ui$Element$el,
							_Utils_ap(
								_Utils_ap(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$emptyCellColor),
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$padding(3),
											$mdgriffith$elm_ui$Element$htmlAttribute(
											$elm$html$Html$Attributes$tabindex(0))
										]),
									_Utils_ap(
										onClick,
										_Utils_ap(
											$author$project$Styling$fonts.table,
											_Utils_ap(
												dropTarget,
												_Utils_ap(highlight, draggable))))),
								attrs),
							v);
					});
				var displayLabel = function (l) {
					return (l === '') ? A2(
						cellElement,
						_List_Nil,
						$mdgriffith$elm_ui$Element$text(' ')) : A2(
						cellElement,
						_List_fromArray(
							[$mdgriffith$elm_ui$Element$Font$bold]),
						A2(
							$mdgriffith$elm_ui$Element$paragraph,
							_List_Nil,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$text(l)
								])));
				};
				var displayCell = function () {
					if (cell.$ === 'Label') {
						var l = cell.a;
						return displayLabel(l);
					} else {
						var r = cell.a;
						var p = cell.b;
						var value = A2(
							$elm$core$Dict$get,
							_Utils_Tuple2(r, p),
							valueSet.values);
						if (!_Utils_eq(td.editing, $elm$core$Maybe$Nothing)) {
							return A2(
								cellElement,
								_List_Nil,
								viewAbsolutePath(
									_Utils_Tuple2(r, p)));
						} else {
							if (value.$ === 'Nothing') {
								return A2(
									cellElement,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$Font$alignRight]),
									$mdgriffith$elm_ui$Element$text('INTERNAL ERROR'));
							} else {
								var valueAndTrace = value.a;
								var onValueClick = $mdgriffith$elm_ui$Element$Events$onClick(
									A2($author$project$Main$Highlight, r, p));
								var _v13 = valueAndTrace.value;
								switch (_v13.$) {
									case 'Float':
										var f = _v13.a;
										return A2(
											cellElement,
											_List_fromArray(
												[onValueClick, $mdgriffith$elm_ui$Element$Font$alignRight]),
											$mdgriffith$elm_ui$Element$text(
												$author$project$Styling$formatGermanNumber(f)));
									case 'Null':
										return A2(
											cellElement,
											_List_fromArray(
												[onValueClick, $mdgriffith$elm_ui$Element$Font$alignRight, $mdgriffith$elm_ui$Element$Font$bold]),
											$mdgriffith$elm_ui$Element$text('null'));
									default:
										var s = _v13.a;
										return A2(
											cellElement,
											_List_fromArray(
												[
													onValueClick,
													$mdgriffith$elm_ui$Element$Font$alignRight,
													$mdgriffith$elm_ui$Element$Font$family(
													_List_fromArray(
														[$mdgriffith$elm_ui$Element$Font$monospace]))
												]),
											$mdgriffith$elm_ui$Element$text(
												(s === '') ? ' ' : s));
								}
							}
						}
					}
				}();
				var _v6 = td.editing;
				if (_v6.$ === 'Nothing') {
					return displayCell;
				} else {
					if (_v6.a.$ === 'All') {
						var _v7 = _v6.a;
						return displayCell;
					} else {
						var _v8 = _v6.a;
						var p = _v8.a;
						var editValue = _v8.b;
						if (_Utils_eq(p, pos)) {
							var tabKey = function () {
								var _v10 = A2($author$project$Cells$nextPos, pos, td.grid);
								if (_v10.$ === 'Nothing') {
									return _List_Nil;
								} else {
									var nextPos = _v10.a;
									return _List_fromArray(
										[
											A3(
											$author$project$Main$bind,
											$author$project$KeyBindings$noModifiers,
											$SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab,
											A5(
												$author$project$Main$MoveCellEditorRequested,
												lensId,
												pos,
												editValue,
												nextPos,
												A2($author$project$Cells$get, nextPos, td.grid)))
										]);
								}
							}();
							var shiftTabKey = function () {
								var _v9 = A2($author$project$Cells$prevPos, pos, td.grid);
								if (_v9.$ === 'Nothing') {
									return _List_Nil;
								} else {
									var prevPos = _v9.a;
									return _List_fromArray(
										[
											A3(
											$author$project$Main$bind,
											$author$project$KeyBindings$shift,
											$SwiftsNamesake$proper_keyboard$Keyboard$Key$Tab,
											A5(
												$author$project$Main$MoveCellEditorRequested,
												lensId,
												pos,
												editValue,
												prevPos,
												A2($author$project$Cells$get, prevPos, td.grid)))
										]);
								}
							}();
							return A2(
								$mdgriffith$elm_ui$Element$Input$text,
								_Utils_ap(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$Font$bold,
											$mdgriffith$elm_ui$Element$padding(3),
											$mdgriffith$elm_ui$Element$Events$onLoseFocus(
											A3($author$project$Main$CellOfLensTableEditFinished, lensId, pos, editValue)),
											$author$project$KeyBindings$on(
											_Utils_ap(
												_List_fromArray(
													[
														A3(
														$author$project$Main$bind,
														$author$project$KeyBindings$noModifiers,
														$SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter,
														A3($author$project$Main$CellOfLensTableEditFinished, lensId, pos, editValue)),
														A3(
														$author$project$Main$bind,
														$author$project$KeyBindings$noModifiers,
														$SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape,
														A2(
															$author$project$Main$LensTableEditModeChanged,
															lensId,
															$elm$core$Maybe$Just($author$project$Lens$All)))
													]),
												_Utils_ap(tabKey, shiftTabKey))),
											$mdgriffith$elm_ui$Element$htmlAttribute(
											$elm$html$Html$Attributes$id('cell')),
											$mdgriffith$elm_ui$Element$focused(
											_List_fromArray(
												[
													A2($mdgriffith$elm_ui$Element$Border$innerGlow, $author$project$Styling$germanZeroYellow, 1.0)
												]))
										]),
									$author$project$Styling$fonts.table),
								{
									label: $mdgriffith$elm_ui$Element$Input$labelHidden('label'),
									onChange: A2(
										$elm$core$Basics$composeL,
										A2($author$project$Main$CellOfLensTableEdited, lensId, pos),
										$author$project$Lens$CellContent$Label),
									placeholder: A2(
										$elm$core$Maybe$map,
										A2(
											$elm$core$Basics$composeR,
											viewAbsolutePath,
											$mdgriffith$elm_ui$Element$Input$placeholder(_List_Nil)),
										$author$project$Lens$CellContent$getValueAt(cell)),
									text: A2(
										$elm$core$Maybe$withDefault,
										'',
										$author$project$Lens$CellContent$getLabel(editValue))
								});
						} else {
							return displayCell;
						}
					}
				}
			});
		var deleteRowButtonColumn = {
			header: $mdgriffith$elm_ui$Element$none,
			view: function (rowNdx) {
				var _v5 = $author$project$Main$tableElementFromIndex(rowNdx);
				if (_v5.$ === 'GapBefore') {
					return $mdgriffith$elm_ui$Element$none;
				} else {
					var row = _v5.a;
					return A2(
						$author$project$Styling$dangerousIconButton,
						A2($feathericons$elm_feather$FeatherIcons$withSize, $author$project$Styling$sizes.tableFontSize, $feathericons$elm_feather$FeatherIcons$trash2),
						A2($author$project$Main$DeleteRowClicked, lensId, row));
				}
			},
			width: $mdgriffith$elm_ui$Element$shrink
		};
		var columnDefs = A2(
			$elm_community$list_extra$List$Extra$initialize,
			($author$project$Cells$columns(td.grid) * 2) + 1,
			function (columnNdx) {
				var columnElement = $author$project$Main$tableElementFromIndex(columnNdx);
				return {
					header: function () {
						if (_Utils_eq(td.editing, $elm$core$Maybe$Nothing)) {
							return $mdgriffith$elm_ui$Element$none;
						} else {
							if (columnElement.$ === 'GapBefore') {
								return $mdgriffith$elm_ui$Element$none;
							} else {
								var column = columnElement.a;
								return A2(
									$mdgriffith$elm_ui$Element$el,
									_List_fromArray(
										[$mdgriffith$elm_ui$Element$centerX]),
									A2(
										$author$project$Styling$dangerousIconButton,
										A2($feathericons$elm_feather$FeatherIcons$withSize, $author$project$Styling$sizes.tableFontSize, $feathericons$elm_feather$FeatherIcons$trash2),
										A2($author$project$Main$DeleteColumnClicked, lensId, column)));
							}
						}
					}(),
					view: function (rowNdx) {
						var _v3 = _Utils_Tuple2(
							$author$project$Main$tableElementFromIndex(rowNdx),
							columnElement);
						if (_v3.a.$ === 'GapBefore') {
							if (_v3.b.$ === 'GapBefore') {
								return $mdgriffith$elm_ui$Element$none;
							} else {
								var row = _v3.a.a;
								var column = _v3.b.a;
								return A2(
									separator,
									false,
									{column: column, row: row});
							}
						} else {
							if (_v3.b.$ === 'GapBefore') {
								var row = _v3.a.a;
								var column = _v3.b.a;
								return A2(
									separator,
									true,
									{column: column, row: row});
							} else {
								var row = _v3.a.a;
								var column = _v3.b.a;
								var pos = {column: column, row: row};
								return A2(
									viewCell,
									A2($author$project$Cells$get, pos, td.grid),
									pos);
							}
						}
					},
					width: function () {
						if (columnElement.$ === 'GapBefore') {
							return $mdgriffith$elm_ui$Element$px($author$project$Styling$sizes.tableGap);
						} else {
							return A2(
								$mdgriffith$elm_ui$Element$maximum,
								300,
								A2($mdgriffith$elm_ui$Element$minimum, 60, $mdgriffith$elm_ui$Element$shrink));
						}
					}()
				};
			});
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
							$mdgriffith$elm_ui$Element$Font$size($author$project$Styling$sizes.tableFontSize)
						]),
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$text('Showing values of '),
							function () {
							var _v0 = valueSet.runs;
							if (!_v0.b) {
								return $mdgriffith$elm_ui$Element$text('nothing');
							} else {
								return A2(
									$mdgriffith$elm_ui$Element$Input$button,
									_List_Nil,
									{
										label: A2(
											$mdgriffith$elm_ui$Element$row,
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small)
												]),
											A2(
												$elm$core$List$map,
												$author$project$Main$viewRunId(_List_Nil),
												valueSet.runs)),
										onPress: $elm$core$Maybe$Just(
											$author$project$Main$DisplayReMapModalClicked(lensId))
									});
							}
						}()
						])),
					A2(
					$mdgriffith$elm_ui$Element$table,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large)
						]),
					{
						columns: function () {
							var _v1 = td.editing;
							if (_v1.$ === 'Nothing') {
								return columnDefs;
							} else {
								return A2($elm$core$List$cons, deleteRowButtonColumn, columnDefs);
							}
						}(),
						data: A2(
							$elm$core$List$range,
							0,
							$author$project$Cells$rows(td.grid) * 2)
					})
				]));
	});
var $author$project$Main$viewLens = F7(
	function (id, dragDrop, editingActiveLensLabel, isActive, lens, chartHovering, allRuns) {
		var valueSet = A2($author$project$ValueSet$create, lens, allRuns);
		var showGraph = $author$project$Lens$getShowGraph(lens);
		var shortPathLabels = $author$project$Lens$getShortPathLabels(lens);
		var maybeShowGraphButton = function () {
			var _v4 = $author$project$Lens$asUserDefinedTable(lens);
			if (_v4.$ === 'Nothing') {
				return A2(
					$author$project$Styling$iconButton,
					showGraph ? $feathericons$elm_feather$FeatherIcons$eye : $feathericons$elm_feather$FeatherIcons$eyeOff,
					$author$project$Main$ToggleShowGraphClicked(id));
			} else {
				return $mdgriffith$elm_ui$Element$none;
			}
		}();
		var maybeEditTableButton = function () {
			var _v3 = $author$project$Lens$asUserDefinedTable(lens);
			if (_v3.$ === 'Nothing') {
				return $mdgriffith$elm_ui$Element$none;
			} else {
				var t = _v3.a;
				return _Utils_eq(t.editing, $elm$core$Maybe$Nothing) ? A2(
					$author$project$Styling$iconButton,
					$feathericons$elm_feather$FeatherIcons$edit,
					A2(
						$author$project$Main$LensTableEditModeChanged,
						id,
						$elm$core$Maybe$Just($author$project$Lens$All))) : A2(
					$author$project$Styling$iconButton,
					$feathericons$elm_feather$FeatherIcons$check,
					A2($author$project$Main$LensTableEditModeChanged, id, $elm$core$Maybe$Nothing));
			}
		}();
		var maybeCopyToClipboardButton = function () {
			var _v2 = $author$project$Lens$asUserDefinedTable(lens);
			if (_v2.$ === 'Nothing') {
				return $mdgriffith$elm_ui$Element$none;
			} else {
				var t = _v2.a;
				return A2(
					$author$project$Styling$iconButton,
					$feathericons$elm_feather$FeatherIcons$clipboard,
					$author$project$Main$CopyToClipboardRequested(id));
			}
		}();
		var labelText = $author$project$Lens$getLabel(lens);
		var _v0 = isActive ? _Utils_Tuple2($author$project$Styling$germanZeroYellow, 2) : _Utils_Tuple2($author$project$Styling$germanZeroGreen, 1);
		var borderColor = _v0.a;
		var borderWidth = _v0.b;
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$Events$onClick(
					$author$project$Main$ActivateLensClicked(id)),
					$mdgriffith$elm_ui$Element$mouseOver(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$germanZeroYellow)
						])),
					$mdgriffith$elm_ui$Element$Border$color(borderColor),
					$mdgriffith$elm_ui$Element$Border$width(borderWidth),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$Font$size(24),
							A2($mdgriffith$elm_ui$Element$paddingXY, $author$project$Styling$sizes.large, $author$project$Styling$sizes.medium)
						]),
					_List_fromArray(
						[
							(editingActiveLensLabel && isActive) ? A2(
							$mdgriffith$elm_ui$Element$Input$text,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onLoseFocus($author$project$Main$LensLabelEditFinished),
									$author$project$KeyBindings$on(
									_List_fromArray(
										[
											A3($author$project$Main$bind, $author$project$KeyBindings$noModifiers, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter, $author$project$Main$LensLabelEditFinished)
										])),
									$mdgriffith$elm_ui$Element$htmlAttribute(
									$elm$html$Html$Attributes$id('interestlabel')),
									$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small)
								]),
							{
								label: $mdgriffith$elm_ui$Element$Input$labelHidden('interest list'),
								onChange: $author$project$Main$LensLabelEdited(id),
								placeholder: $elm$core$Maybe$Just(
									A2(
										$mdgriffith$elm_ui$Element$Input$placeholder,
										_List_Nil,
										$mdgriffith$elm_ui$Element$text('label'))),
								text: labelText
							}) : A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Events$onClick(
									A2($author$project$Main$LensLabelEdited, id, labelText)),
									$mdgriffith$elm_ui$Element$Font$color(
									(labelText === '') ? $author$project$Styling$modalDim : $author$project$Styling$black),
									$mdgriffith$elm_ui$Element$mouseOver(
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
										]))
								]),
							$mdgriffith$elm_ui$Element$text(
								(labelText === '') ? 'label' : labelText)),
							A2(
							$mdgriffith$elm_ui$Element$el,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
								]),
							$mdgriffith$elm_ui$Element$none),
							$author$project$Main$buttons(
							_List_fromArray(
								[
									maybeEditTableButton,
									maybeShowGraphButton,
									maybeCopyToClipboardButton,
									A2(
									$author$project$Styling$iconButton,
									$feathericons$elm_feather$FeatherIcons$copy,
									$author$project$Main$DuplicateLensClicked(id)),
									A2(
									$author$project$Styling$dangerousIconButton,
									$feathericons$elm_feather$FeatherIcons$trash2,
									$author$project$Main$RemoveLensClicked(id))
								]))
						])),
					A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$spacing(40),
							$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large)
						]),
					_List_fromArray(
						[
							showGraph ? A3($author$project$Main$viewChart, chartHovering, shortPathLabels, valueSet) : $mdgriffith$elm_ui$Element$none,
							function () {
							var _v1 = $author$project$Lens$asUserDefinedTable(lens);
							if (_v1.$ === 'Nothing') {
								return A3($author$project$Main$viewValueSetAsClassicTable, shortPathLabels, id, valueSet);
							} else {
								var g = _v1.a;
								return A4($author$project$Main$viewValueSetAsUserDefinedTable, id, dragDrop, g, valueSet);
							}
						}()
						]))
				]));
	});
var $author$project$Main$DisplayCalculateModalClicked = F3(
	function (a, b, c) {
		return {$: 'DisplayCalculateModalClicked', a: a, b: b, c: c};
	});
var $author$project$Main$defaultInputs = {agsFilter: '', year: 2035};
var $author$project$Main$runsAndComparisonsViewPortId = 'runs-and-comparisons';
var $author$project$Explorable$Diff = F2(
	function (a, b) {
		return {$: 'Diff', a: a, b: b};
	});
var $author$project$Main$DiffToleranceUpdated = F3(
	function (a, b, c) {
		return {$: 'DiffToleranceUpdated', a: a, b: b, c: c};
	});
var $author$project$Main$RemoveExplorableClicked = function (a) {
	return {$: 'RemoveExplorableClicked', a: a};
};
var $author$project$Main$ToggleCollapseTreeClicked = F2(
	function (a, b) {
		return {$: 'ToggleCollapseTreeClicked', a: a, b: b};
	});
var $author$project$Main$collapsedStatusIcon = function (collapsed) {
	var i = collapsed ? $feathericons$elm_feather$FeatherIcons$chevronRight : $feathericons$elm_feather$FeatherIcons$chevronDown;
	return A2(
		$mdgriffith$elm_ui$Element$el,
		$author$project$Styling$iconButtonStyle,
		$author$project$Styling$icon(
			$author$project$Styling$size16(i)));
};
var $author$project$Styling$treeElementStyle = _List_fromArray(
	[
		$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small),
		$mdgriffith$elm_ui$Element$focused(_List_Nil),
		$mdgriffith$elm_ui$Element$mouseOver(_List_Nil)
	]);
var $mdgriffith$elm_ui$Element$Keyed$column = F2(
	function (attrs, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.contentTop + (' ' + $mdgriffith$elm_ui$Internal$Style$classes.contentLeft)),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink),
						attrs))),
			$mdgriffith$elm_ui$Internal$Model$Keyed(children));
	});
var $author$project$Styling$highlightColor = $author$project$Styling$germanZeroYellow;
var $mdgriffith$elm_ui$Element$Font$italic = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.italic);
var $author$project$Main$viewTree = F3(
	function (cfg, path, tree) {
		return cfg.isCollapsed(path) ? $mdgriffith$elm_ui$Element$none : A2(
			$mdgriffith$elm_ui$Element$Keyed$column,
			_Utils_ap(
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$paddingEach(
						{bottom: $author$project$Styling$sizes.medium, left: $author$project$Styling$sizes.medium, right: 0, top: $author$project$Styling$sizes.medium}),
						$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.small),
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				$author$project$Styling$fonts.explorerItems),
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var val = _v0.b;
					var childPath = _Utils_ap(
						path,
						_List_fromArray(
							[name]));
					var maybeHighlight = _Utils_eq(
						$elm$core$Maybe$Just(childPath),
						cfg.temporaryHighlight) ? _List_fromArray(
						[
							A2($mdgriffith$elm_ui$Element$Border$glow, $author$project$Styling$highlightColor, 1.0)
						]) : _List_Nil;
					var itemRow = function (content) {
						return A2(
							$mdgriffith$elm_ui$Element$row,
							_Utils_ap(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.large),
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$htmlAttribute(
										$elm$html$Html$Attributes$id(
											cfg.itemId(childPath)))
									]),
								_Utils_ap(maybeHighlight, $author$project$Styling$treeElementStyle)),
							content);
					};
					var element = function () {
						if (val.$ === 'Tree') {
							var child = val.a;
							return A2(
								$mdgriffith$elm_ui$Element$column,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								_List_fromArray(
									[
										A2(
										$mdgriffith$elm_ui$Element$Input$button,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
												$mdgriffith$elm_ui$Element$focused(_List_Nil)
											]),
										{
											label: itemRow(
												_List_fromArray(
													[
														$author$project$Main$collapsedStatusIcon(
														cfg.isCollapsed(childPath)),
														A2(
														$mdgriffith$elm_ui$Element$el,
														_List_fromArray(
															[
																$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
															]),
														$mdgriffith$elm_ui$Element$text(name)),
														A2(
														$mdgriffith$elm_ui$Element$el,
														A2(
															$elm$core$List$cons,
															$mdgriffith$elm_ui$Element$Font$italic,
															A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerNodeSize)),
														$mdgriffith$elm_ui$Element$text(
															$elm$core$String$fromInt(
																$elm$core$Dict$size(child))))
													])),
											onPress: $elm$core$Maybe$Just(
												cfg.collapsedToggledMsg(childPath))
										}),
										A3($author$project$Main$viewTree, cfg, childPath, child)
									]));
						} else {
							var leaf = val.a;
							return itemRow(
								A3(cfg.viewLeaf, path, name, leaf));
						}
					}();
					return _Utils_Tuple2(name, element);
				},
				$elm$core$Dict$toList(tree)));
	});
var $author$project$Main$viewDiffTree = F4(
	function (id, temporaryHighlight, collapseStatus, tree) {
		var missingElement = A2(
			$mdgriffith$elm_ui$Element$el,
			A2($elm$core$List$cons, $mdgriffith$elm_ui$Element$Font$alignRight, $author$project$Styling$fonts.explorerValues),
			$mdgriffith$elm_ui$Element$text('∅'));
		var viewLeaf = F3(
			function (pathToParent, name, leaf) {
				switch (leaf.$) {
					case 'LeftOnly':
						var v = leaf.a;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(name)),
								$author$project$Main$viewValue(v.value),
								missingElement
							]);
					case 'Unequal':
						var a = leaf.a;
						var b = leaf.b;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(name)),
								$author$project$Main$viewValue(a.value),
								$author$project$Main$viewValue(b.value)
							]);
					default:
						var v = leaf.a;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(name)),
								missingElement,
								$author$project$Main$viewValue(v.value)
							]);
				}
			});
		return A3(
			$author$project$Main$viewTree,
			{
				collapsedToggledMsg: $author$project$Main$ToggleCollapseTreeClicked(id),
				isCollapsed: function (p) {
					return A3($author$project$CollapseStatus$isCollapsed, id, p, collapseStatus);
				},
				itemId: $author$project$Main$treeItemId(id),
				temporaryHighlight: temporaryHighlight,
				viewLeaf: viewLeaf
			},
			_List_Nil,
			tree);
	});
var $author$project$Main$viewComparison = F5(
	function (aId, bId, temporaryHighlight, collapseStatus, diffData) {
		var id = A2($author$project$Explorable$Diff, aId, bId);
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small),
					$mdgriffith$elm_ui$Element$Border$width(1),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$black),
					$mdgriffith$elm_ui$Element$Border$rounded(4)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$Input$button,
							$author$project$Styling$treeElementStyle,
							{
								label: A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium)
										]),
									_List_fromArray(
										[
											$author$project$Main$collapsedStatusIcon(
											A3($author$project$CollapseStatus$isCollapsed, id, _List_Nil, collapseStatus)),
											A2(
											$mdgriffith$elm_ui$Element$row,
											_List_Nil,
											_List_fromArray(
												[
													A2($author$project$Main$viewRunId, _List_Nil, aId),
													$mdgriffith$elm_ui$Element$text(' ≈ '),
													A2($author$project$Main$viewRunId, _List_Nil, bId)
												]))
										])),
								onPress: $elm$core$Maybe$Just(
									A2($author$project$Main$ToggleCollapseTreeClicked, id, _List_Nil))
							}),
							A2(
							$mdgriffith$elm_ui$Element$Input$slider,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$height(
									$mdgriffith$elm_ui$Element$px(20)),
									$mdgriffith$elm_ui$Element$behindContent(
									A2(
										$mdgriffith$elm_ui$Element$el,
										_List_fromArray(
											[
												$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
												$mdgriffith$elm_ui$Element$Font$center,
												$mdgriffith$elm_ui$Element$behindContent(
												A2(
													$mdgriffith$elm_ui$Element$el,
													_List_fromArray(
														[
															$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
															$mdgriffith$elm_ui$Element$height(
															$mdgriffith$elm_ui$Element$px(2)),
															$mdgriffith$elm_ui$Element$centerY,
															$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$germanZeroGreen),
															$mdgriffith$elm_ui$Element$Border$rounded(2)
														]),
													$mdgriffith$elm_ui$Element$none))
											]),
										$mdgriffith$elm_ui$Element$text(
											'>' + ($author$project$Styling$formatGermanNumber(diffData.tolerance) + '%'))))
								]),
							{
								label: $mdgriffith$elm_ui$Element$Input$labelHidden('tolerance'),
								max: 100.0,
								min: 0.001,
								onChange: A2($author$project$Main$DiffToleranceUpdated, aId, bId),
								step: $elm$core$Maybe$Just(0.001),
								thumb: $mdgriffith$elm_ui$Element$Input$defaultThumb,
								value: diffData.tolerance
							}),
							$author$project$Main$buttons(
							_List_fromArray(
								[
									A2(
									$author$project$Styling$dangerousIconButton,
									$feathericons$elm_feather$FeatherIcons$trash2,
									$author$project$Main$RemoveExplorableClicked(id))
								]))
						])),
					A4($author$project$Main$viewDiffTree, id, temporaryHighlight, collapseStatus, diffData.diff)
				]));
	});
var $author$project$Main$FilterEdited = F2(
	function (a, b) {
		return {$: 'FilterEdited', a: a, b: b};
	});
var $author$project$Main$FilterFinished = {$: 'FilterFinished'};
var $author$project$Main$FilterQuickAddRequested = function (a) {
	return {$: 'FilterQuickAddRequested', a: a};
};
var $author$project$Main$ToggleSelectForCompareClicked = function (a) {
	return {$: 'ToggleSelectForCompareClicked', a: a};
};
var $feathericons$elm_feather$FeatherIcons$filter = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'filter',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$polygon,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3')
				]),
			_List_Nil)
		]));
var $feathericons$elm_feather$FeatherIcons$trello = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'trello',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('3'),
					$elm$svg$Svg$Attributes$y('3'),
					$elm$svg$Svg$Attributes$width('18'),
					$elm$svg$Svg$Attributes$height('18'),
					$elm$svg$Svg$Attributes$rx('2'),
					$elm$svg$Svg$Attributes$ry('2')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('7'),
					$elm$svg$Svg$Attributes$y('7'),
					$elm$svg$Svg$Attributes$width('3'),
					$elm$svg$Svg$Attributes$height('9')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$rect,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x('14'),
					$elm$svg$Svg$Attributes$y('7'),
					$elm$svg$Svg$Attributes$width('3'),
					$elm$svg$Svg$Attributes$height('5')
				]),
			_List_Nil)
		]));
var $author$project$Main$AddToLensClicked = F2(
	function (a, b) {
		return {$: 'AddToLensClicked', a: a, b: b};
	});
var $author$project$Main$DragFromRun = F2(
	function (a, b) {
		return {$: 'DragFromRun', a: a, b: b};
	});
var $feathericons$elm_feather$FeatherIcons$info = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'info',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('10')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('16'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('8'),
					$elm$svg$Svg$Attributes$x2('12.01'),
					$elm$svg$Svg$Attributes$y2('8')
				]),
			_List_Nil)
		]));
var $author$project$Lens$member = F3(
	function (ri, p, _v0) {
		var l = _v0.a;
		var _v1 = l.vkind;
		if (_v1.$ === 'Classic') {
			var c = _v1.a;
			return A2($elm$core$Set$member, p, c.paths);
		} else {
			var td = _v1.a;
			return !_Utils_eq(
				A2(
					$author$project$Lens$findInCells,
					F2(
						function (_v2, mp) {
							return _Utils_eq(
								mp,
								A2($author$project$Lens$CellContent$ValueAt, ri, p)) ? $elm$core$Maybe$Just(_Utils_Tuple0) : $elm$core$Maybe$Nothing;
						}),
					td.grid),
				$elm$core$Maybe$Nothing);
		}
	});
var $author$project$Main$OverrideEditFinished = {$: 'OverrideEditFinished'};
var $author$project$Main$OverrideEdited = F3(
	function (a, b, c) {
		return {$: 'OverrideEdited', a: a, b: b, c: c};
	});
var $author$project$Main$RemoveOverrideClicked = F2(
	function (a, b) {
		return {$: 'RemoveOverrideClicked', a: a, b: b};
	});
var $mdgriffith$elm_ui$Element$Font$strike = $mdgriffith$elm_ui$Internal$Model$htmlClass($mdgriffith$elm_ui$Internal$Style$classes.strike);
var $author$project$Main$viewEntryAndOverride = F5(
	function (runId, name, overrides, activeOverrideEditor, f) {
		var thisOverrideEditor = A2(
			$elm_community$maybe_extra$Maybe$Extra$filter,
			function (e) {
				return _Utils_eq(e.runId, runId) && _Utils_eq(e.name, name);
			},
			activeOverrideEditor);
		var override = A2($elm$core$Dict$get, name, overrides);
		var formattedF = $author$project$Styling$formatGermanNumber(f);
		var _v0 = function () {
			if (thisOverrideEditor.$ === 'Nothing') {
				if (override.$ === 'Nothing') {
					return _Utils_Tuple3(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroGreen),
								$mdgriffith$elm_ui$Element$mouseOver(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
									]))
							]),
						A3($author$project$Main$OverrideEdited, runId, name, formattedF),
						$mdgriffith$elm_ui$Element$none);
				} else {
					var newF = override.a;
					var newFormattedF = $author$project$Styling$formatGermanNumber(newF);
					return _Utils_Tuple3(
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Font$strike,
								$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$red),
								$mdgriffith$elm_ui$Element$mouseOver(
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
									]))
							]),
						A2($author$project$Main$RemoveOverrideClicked, runId, name),
						A2(
							$mdgriffith$elm_ui$Element$Input$button,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$Font$alignRight,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroGreen),
									A2(
										$elm$core$List$cons,
										$mdgriffith$elm_ui$Element$mouseOver(
											_List_fromArray(
												[
													$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
												])),
										$author$project$Styling$fonts.explorerValues))),
							{
								label: $mdgriffith$elm_ui$Element$text(newFormattedF),
								onPress: $elm$core$Maybe$Just(
									A3($author$project$Main$OverrideEdited, runId, name, newFormattedF))
							}));
				}
			} else {
				var editor = thisOverrideEditor.a;
				var textStyle = function () {
					var _v3 = editor.asFloat;
					if (_v3.$ === 'Nothing') {
						return _List_fromArray(
							[
								$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$red),
								$mdgriffith$elm_ui$Element$Border$width(1)
							]);
					} else {
						return _List_fromArray(
							[
								$author$project$KeyBindings$on(
								_List_fromArray(
									[
										A3($author$project$Main$bind, $author$project$KeyBindings$noModifiers, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter, $author$project$Main$OverrideEditFinished)
									]))
							]);
					}
				}();
				var textAttributes = A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Events$onLoseFocus($author$project$Main$OverrideEditFinished),
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$htmlAttribute(
							$elm$html$Html$Attributes$id('overrideEditor')),
						textStyle));
				return _Utils_Tuple3(
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$Font$strike,
							$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$red),
							$mdgriffith$elm_ui$Element$mouseOver(
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$Font$color($author$project$Styling$germanZeroYellow)
								]))
						]),
					A2($author$project$Main$RemoveOverrideClicked, runId, name),
					A2(
						$mdgriffith$elm_ui$Element$Input$text,
						textAttributes,
						{
							label: $mdgriffith$elm_ui$Element$Input$labelHidden('override'),
							onChange: A2($author$project$Main$OverrideEdited, runId, name),
							placeholder: $elm$core$Maybe$Nothing,
							text: editor.value
						}));
			}
		}();
		var originalStyle = _v0.a;
		var action = _v0.b;
		var o = _v0.c;
		return _Utils_Tuple2(
			A2(
				$mdgriffith$elm_ui$Element$Input$button,
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$Font$alignRight,
					_Utils_ap($author$project$Styling$fonts.explorerValues, originalStyle)),
				{
					label: $mdgriffith$elm_ui$Element$text(formattedF),
					onPress: $elm$core$Maybe$Just(action)
				}),
			o);
	});
var $author$project$Main$viewValueTree = F9(
	function (runId, lensId, path, temporaryHighlight, checkIsCollapsed, lens, overrides, activeOverrideEditor, tree) {
		var viewLeaf = F3(
			function (pathToParent, name, valueWithTrace) {
				var _v0 = valueWithTrace.value;
				switch (_v0.$) {
					case 'Null':
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width(
										$mdgriffith$elm_ui$Element$px(16))
									]),
								$mdgriffith$elm_ui$Element$none),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(name)),
								$author$project$Main$nullValueElement
							]);
					case 'String':
						var s = _v0.a;
						return _List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width(
										$mdgriffith$elm_ui$Element$px(16))
									]),
								$mdgriffith$elm_ui$Element$none),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
									]),
								$mdgriffith$elm_ui$Element$text(name)),
								$author$project$Main$viewStringValue(s)
							]);
					default:
						var f = _v0.a;
						var thisPath = _Utils_ap(
							pathToParent,
							_List_fromArray(
								[name]));
						var isEntry = _Utils_eq(
							pathToParent,
							_List_fromArray(
								['entries']));
						var button = A3($author$project$Lens$member, runId, thisPath, lens) ? A2(
							$author$project$Styling$dangerousIconButton,
							$author$project$Styling$size16($feathericons$elm_feather$FeatherIcons$trash2),
							A2(
								$author$project$Main$RemoveFromLensClicked,
								lensId,
								_List_fromArray(
									[
										_Utils_Tuple2(runId, thisPath)
									]))) : A2(
							$author$project$Styling$iconButton,
							$author$project$Styling$size16($feathericons$elm_feather$FeatherIcons$plus),
							A2($author$project$Main$AddToLensClicked, runId, thisPath));
						var _v1 = isEntry ? A5($author$project$Main$viewEntryAndOverride, runId, name, overrides, activeOverrideEditor, f) : _Utils_Tuple2(
							$author$project$Main$viewFloatValue(f),
							$mdgriffith$elm_ui$Element$none);
						var originalValue = _v1.a;
						var maybeOverride = _v1.b;
						return _List_fromArray(
							[
								button,
								function () {
								var _v2 = valueWithTrace.trace;
								if (_v2.$ === 'Nothing') {
									return A2(
										$author$project$Styling$iconButton,
										$author$project$Styling$size16($feathericons$elm_feather$FeatherIcons$info),
										$author$project$Main$Noop);
								} else {
									var t = _v2.a;
									return A2(
										$author$project$Styling$iconButton,
										$author$project$Styling$size16($feathericons$elm_feather$FeatherIcons$info),
										A4($author$project$Main$DisplayTrace, runId, thisPath, valueWithTrace.value, t));
								}
							}(),
								A2(
								$mdgriffith$elm_ui$Element$el,
								A2(
									$elm$core$List$cons,
									$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
									A2(
										$elm$core$List$map,
										$mdgriffith$elm_ui$Element$htmlAttribute,
										A2(
											$author$project$Html5$DragDrop$draggable,
											$author$project$Main$DragDropMsg,
											A2($author$project$Main$DragFromRun, runId, thisPath)))),
								$mdgriffith$elm_ui$Element$text(name)),
								originalValue,
								maybeOverride
							]);
				}
			});
		return A3(
			$author$project$Main$viewTree,
			{
				collapsedToggledMsg: $author$project$Main$ToggleCollapseTreeClicked(
					$author$project$Explorable$Run(runId)),
				isCollapsed: checkIsCollapsed(runId),
				itemId: $author$project$Main$treeItemId(
					$author$project$Explorable$Run(runId)),
				temporaryHighlight: temporaryHighlight,
				viewLeaf: viewLeaf
			},
			path,
			tree);
	});
var $author$project$Main$viewRun = F9(
	function (runId, lensId, temporaryHighlight, lens, collapseStatus, activeOverrideEditor, activeSearch, selectedForComparison, run) {
		var overrides = $author$project$Run$getOverrides(run);
		var isSelectedForComparison = function () {
			if (selectedForComparison.$ === 'Nothing') {
				return false;
			} else {
				var ri = selectedForComparison.a;
				return _Utils_eq(ri, runId);
			}
		}();
		var selectForComparisonButton = isSelectedForComparison ? A2(
			$author$project$Styling$dangerousIconButton,
			$feathericons$elm_feather$FeatherIcons$trello,
			$author$project$Main$ToggleSelectForCompareClicked(runId)) : A2(
			$author$project$Styling$iconButton,
			$feathericons$elm_feather$FeatherIcons$trello,
			$author$project$Main$ToggleSelectForCompareClicked(runId));
		var inputs = $author$project$Run$getInputs(run);
		var differentIfFilterActive = function () {
			var _v0 = A2(
				$elm_community$maybe_extra$Maybe$Extra$filter,
				function (s) {
					return _Utils_eq(s.runId, runId);
				},
				activeSearch);
			if (_v0.$ === 'Nothing') {
				return {
					filterButton: A2(
						$author$project$Styling$iconButton,
						$feathericons$elm_feather$FeatherIcons$filter,
						A2($author$project$Main$FilterEdited, runId, '')),
					filterPatternField: $mdgriffith$elm_ui$Element$none,
					isCollapsed: F2(
						function (r, p) {
							return A3(
								$author$project$CollapseStatus$isCollapsed,
								$author$project$Explorable$Run(r),
								p,
								collapseStatus);
						}),
					treeToDisplay: A2($author$project$Run$getTree, $author$project$Run$WithoutOverrides, run)
				};
			} else {
				var s = _v0.a;
				return {
					filterButton: A2($author$project$Styling$dangerousIconButton, $feathericons$elm_feather$FeatherIcons$filter, $author$project$Main$FilterFinished),
					filterPatternField: A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$spacing(8)
							]),
						_List_fromArray(
							[
								A2(
								$mdgriffith$elm_ui$Element$Input$text,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
										$mdgriffith$elm_ui$Element$Font$size(18),
										$mdgriffith$elm_ui$Element$htmlAttribute(
										$elm$html$Html$Attributes$id($author$project$Main$filterFieldId)),
										$author$project$KeyBindings$on(
										_List_fromArray(
											[
												A3($author$project$Main$bind, $author$project$KeyBindings$noModifiers, $SwiftsNamesake$proper_keyboard$Keyboard$Key$Escape, $author$project$Main$FilterFinished),
												A3(
												$author$project$Main$bind,
												$author$project$KeyBindings$noModifiers,
												$SwiftsNamesake$proper_keyboard$Keyboard$Key$Enter,
												$author$project$Main$FilterQuickAddRequested(runId))
											]))
									]),
								{
									label: $mdgriffith$elm_ui$Element$Input$labelHidden('search'),
									onChange: $author$project$Main$FilterEdited(runId),
									placeholder: $elm$core$Maybe$Just(
										A2(
											$mdgriffith$elm_ui$Element$Input$placeholder,
											_List_Nil,
											$mdgriffith$elm_ui$Element$text('Pattern, e.g: a18 CO2e_total'))),
									text: s.pattern
								}),
								A2(
								$mdgriffith$elm_ui$Element$el,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$Font$size(12)
									]),
								$mdgriffith$elm_ui$Element$text('Escape to cancel, Enter to add all'))
							])),
					isCollapsed: F2(
						function (_v1, _v2) {
							return false;
						}),
					treeToDisplay: s.result
				};
			}
		}();
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.small),
					$mdgriffith$elm_ui$Element$Border$width(1),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$black),
					$mdgriffith$elm_ui$Element$Border$rounded(4)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$row,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
						]),
					_List_fromArray(
						[
							A2(
							$mdgriffith$elm_ui$Element$Input$button,
							A2(
								$elm$core$List$cons,
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$author$project$Styling$treeElementStyle),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$row,
									_List_fromArray(
										[
											$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium)
										]),
									_List_fromArray(
										[
											$author$project$Main$collapsedStatusIcon(
											A2(differentIfFilterActive.isCollapsed, runId, _List_Nil)),
											A2($author$project$Main$viewRunId, _List_Nil, runId),
											$mdgriffith$elm_ui$Element$text(
											inputs.ags + (' ' + $elm$core$String$fromInt(inputs.year)))
										])),
								onPress: $elm$core$Maybe$Just(
									A2(
										$author$project$Main$ToggleCollapseTreeClicked,
										$author$project$Explorable$Run(runId),
										_List_Nil))
							}),
							$author$project$Main$buttons(
							_List_fromArray(
								[
									differentIfFilterActive.filterButton,
									selectForComparisonButton,
									A2(
									$author$project$Styling$iconButton,
									$feathericons$elm_feather$FeatherIcons$edit,
									A3(
										$author$project$Main$DisplayCalculateModalClicked,
										$elm$core$Maybe$Just(runId),
										{agsFilter: inputs.ags, year: inputs.year},
										overrides)),
									A2(
									$author$project$Styling$iconButton,
									$feathericons$elm_feather$FeatherIcons$copy,
									A3(
										$author$project$Main$DisplayCalculateModalClicked,
										$elm$core$Maybe$Nothing,
										{agsFilter: inputs.ags, year: inputs.year},
										overrides)),
									A2(
									$author$project$Styling$dangerousIconButton,
									$feathericons$elm_feather$FeatherIcons$trash2,
									$author$project$Main$RemoveExplorableClicked(
										$author$project$Explorable$Run(runId)))
								]))
						])),
					differentIfFilterActive.filterPatternField,
					A9($author$project$Main$viewValueTree, runId, lensId, _List_Nil, temporaryHighlight, differentIfFilterActive.isCollapsed, lens, overrides, activeOverrideEditor, differentIfFilterActive.treeToDisplay)
				]));
	});
var $author$project$Main$viewRunsAndComparisons = function (model) {
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.large),
				$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large),
				$mdgriffith$elm_ui$Element$height(
				A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
				$mdgriffith$elm_ui$Element$width(
				$mdgriffith$elm_ui$Element$px(model.leftPaneWidth)),
				$mdgriffith$elm_ui$Element$inFront(
				A2(
					$author$project$Styling$floatingActionButton,
					$feathericons$elm_feather$FeatherIcons$plus,
					A3($author$project$Main$DisplayCalculateModalClicked, $elm$core$Maybe$Nothing, $author$project$Main$defaultInputs, $elm$core$Dict$empty)))
			]),
		_List_fromArray(
			[
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$scrollbarY,
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
						$mdgriffith$elm_ui$Element$htmlAttribute(
						$elm$html$Html$Attributes$id($author$project$Main$runsAndComparisonsViewPortId))
					]),
				A2(
					$mdgriffith$elm_ui$Element$column,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.large),
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
						]),
					_Utils_ap(
						A2(
							$elm$core$List$map,
							function (_v0) {
								var resultNdx = _v0.a;
								var ir = _v0.b;
								return A9(
									$author$project$Main$viewRun,
									resultNdx,
									$yotamDvir$elm_pivot$Pivot$lengthL(model.lenses),
									model.temporaryHighlight,
									$author$project$Main$getActiveLens(model),
									model.collapseStatus,
									model.activeOverrideEditor,
									model.activeSearch,
									model.selectedForComparison,
									ir);
							},
							$author$project$AllRuns$toList(model.runs)),
						A2(
							$elm$core$List$map,
							function (_v1) {
								var _v2 = _v1.a;
								var a = _v2.a;
								var b = _v2.b;
								var diffData = _v1.b;
								return A5($author$project$Main$viewComparison, a, b, model.temporaryHighlight, model.collapseStatus, diffData);
							},
							$elm$core$Dict$toList(model.diffs)))))
			]));
};
var $author$project$Main$viewRunsAndInterestLists = function (model) {
	var sidebar = model.showingSidebar ? _List_fromArray(
		[
			$author$project$Main$viewRunsAndComparisons(model),
			A2(
			$mdgriffith$elm_ui$Element$el,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width(
					$mdgriffith$elm_ui$Element$px(2)),
					$mdgriffith$elm_ui$Element$Background$color($author$project$Styling$black),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill)
				]),
			$mdgriffith$elm_ui$Element$none)
		]) : _List_Nil;
	var interestLists = A2(
		$elm$core$List$map,
		function (_v0) {
			var pos = _v0.a;
			var il = _v0.b;
			var activePos = $yotamDvir$elm_pivot$Pivot$lengthL(model.lenses);
			return A7(
				$author$project$Main$viewLens,
				pos,
				model.dragDrop,
				model.editingActiveLensLabel,
				_Utils_eq(pos, activePos),
				il,
				model.chartHovering,
				model.runs);
		},
		$yotamDvir$elm_pivot$Pivot$toList(
			$yotamDvir$elm_pivot$Pivot$indexAbsolute(model.lenses)));
	return A2(
		$mdgriffith$elm_ui$Element$row,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
				$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.large)
			]),
		_Utils_ap(
			sidebar,
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Element$height(
							A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
							$mdgriffith$elm_ui$Element$inFront(
							A2(
								$mdgriffith$elm_ui$Element$row,
								_List_fromArray(
									[
										$mdgriffith$elm_ui$Element$spacing(10),
										$mdgriffith$elm_ui$Element$alignBottom,
										$mdgriffith$elm_ui$Element$moveUp(10),
										$mdgriffith$elm_ui$Element$alignRight,
										$mdgriffith$elm_ui$Element$padding(0)
									]),
								_List_fromArray(
									[
										A2($author$project$Styling$floatingActionButton, $feathericons$elm_feather$FeatherIcons$plus, $author$project$Main$NewLensClicked),
										A2($author$project$Styling$floatingActionButton, $feathericons$elm_feather$FeatherIcons$grid, $author$project$Main$NewTableClicked)
									])))
						]),
					A2(
						$mdgriffith$elm_ui$Element$column,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
								$mdgriffith$elm_ui$Element$height(
								A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill)),
								$mdgriffith$elm_ui$Element$scrollbarY,
								$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
								$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.medium)
							]),
						interestLists))
				])));
};
var $mdgriffith$elm_ui$Element$Border$widthXY = F2(
	function (x, y) {
		return A2(
			$mdgriffith$elm_ui$Internal$Model$StyleClass,
			$mdgriffith$elm_ui$Internal$Flag$borderWidth,
			A5(
				$mdgriffith$elm_ui$Internal$Model$BorderWidth,
				'b-' + ($elm$core$String$fromInt(x) + ('-' + $elm$core$String$fromInt(y))),
				y,
				x,
				y,
				x));
	});
var $mdgriffith$elm_ui$Element$Border$widthEach = function (_v0) {
	var bottom = _v0.bottom;
	var top = _v0.top;
	var left = _v0.left;
	var right = _v0.right;
	return (_Utils_eq(top, bottom) && _Utils_eq(left, right)) ? (_Utils_eq(top, right) ? $mdgriffith$elm_ui$Element$Border$width(top) : A2($mdgriffith$elm_ui$Element$Border$widthXY, left, top)) : A2(
		$mdgriffith$elm_ui$Internal$Model$StyleClass,
		$mdgriffith$elm_ui$Internal$Flag$borderWidth,
		A5(
			$mdgriffith$elm_ui$Internal$Model$BorderWidth,
			'b-' + ($elm$core$String$fromInt(top) + ('-' + ($elm$core$String$fromInt(right) + ('-' + ($elm$core$String$fromInt(bottom) + ('-' + $elm$core$String$fromInt(left))))))),
			top,
			right,
			bottom,
			left));
};
var $author$project$Main$viewModel = function (model) {
	var topBar = A2(
		$mdgriffith$elm_ui$Element$row,
		_Utils_ap(
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$padding($author$project$Styling$sizes.large),
					$mdgriffith$elm_ui$Element$Border$color($author$project$Styling$black),
					$mdgriffith$elm_ui$Element$Border$widthEach(
					{bottom: 2, left: 0, right: 0, top: 0})
				]),
			$author$project$Styling$fonts.explorer),
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$text('LocalZero Explorer'),
				A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill)
					]),
				$mdgriffith$elm_ui$Element$none),
				$author$project$Main$buttons(
				_List_fromArray(
					[
						A2(
						model.showingSidebar ? $author$project$Styling$dangerousIconButton : $author$project$Styling$iconButton,
						$feathericons$elm_feather$FeatherIcons$sidebar,
						$author$project$Main$ToggleSidebar),
						A2($author$project$Styling$iconButton, $feathericons$elm_feather$FeatherIcons$download, $author$project$Main$DownloadClicked),
						A2($author$project$Styling$iconButton, $feathericons$elm_feather$FeatherIcons$upload, $author$project$Main$UploadClicked)
					]))
			]));
	return A2(
		$mdgriffith$elm_ui$Element$column,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height(
				A2($mdgriffith$elm_ui$Element$minimum, 0, $mdgriffith$elm_ui$Element$fill))
			]),
		_List_fromArray(
			[
				topBar,
				function () {
				var _v0 = model.displayedTrace;
				if (!_v0.b) {
					return $author$project$Main$viewRunsAndInterestLists(model);
				} else {
					var dt = _v0.a;
					var dts = _v0.b;
					return A3(
						$author$project$Main$viewDisplayedTrace,
						model.runs,
						A2(
							$elm$core$List$map,
							function ($) {
								return $.path;
							},
							dts),
						dt);
				}
			}()
			]));
};
var $author$project$Main$ReMapChangeMapping = F2(
	function (a, b) {
		return {$: 'ReMapChangeMapping', a: a, b: b};
	});
var $author$project$Main$ReMapModalOkClicked = F2(
	function (a, b) {
		return {$: 'ReMapModalOkClicked', a: a, b: b};
	});
var $feathericons$elm_feather$FeatherIcons$arrowRight = A2(
	$feathericons$elm_feather$FeatherIcons$makeBuilder,
	'arrow-right',
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('5'),
					$elm$svg$Svg$Attributes$y1('12'),
					$elm$svg$Svg$Attributes$x2('19'),
					$elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('12 5 19 12 12 19')
				]),
			_List_Nil)
		]));
var $mdgriffith$elm_ui$Element$moveDown = function (y) {
	return A2(
		$mdgriffith$elm_ui$Internal$Model$TransformComponent,
		$mdgriffith$elm_ui$Internal$Flag$moveY,
		$mdgriffith$elm_ui$Internal$Model$MoveY(y));
};
var $mdgriffith$elm_ui$Element$Input$Option = F2(
	function (a, b) {
		return {$: 'Option', a: a, b: b};
	});
var $mdgriffith$elm_ui$Internal$Model$Left = {$: 'Left'};
var $mdgriffith$elm_ui$Element$alignLeft = $mdgriffith$elm_ui$Internal$Model$AlignX($mdgriffith$elm_ui$Internal$Model$Left);
var $mdgriffith$elm_ui$Element$Input$defaultRadioOption = F2(
	function (optionLabel, status) {
		return A2(
			$mdgriffith$elm_ui$Element$row,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$spacing(10),
					$mdgriffith$elm_ui$Element$alignLeft,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink)
				]),
			_List_fromArray(
				[
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width(
							$mdgriffith$elm_ui$Element$px(14)),
							$mdgriffith$elm_ui$Element$height(
							$mdgriffith$elm_ui$Element$px(14)),
							$mdgriffith$elm_ui$Element$Background$color($mdgriffith$elm_ui$Element$Input$white),
							$mdgriffith$elm_ui$Element$Border$rounded(7),
							function () {
							if (status.$ === 'Selected') {
								return $mdgriffith$elm_ui$Internal$Model$htmlClass('focusable');
							} else {
								return $mdgriffith$elm_ui$Internal$Model$NoAttribute;
							}
						}(),
							$mdgriffith$elm_ui$Element$Border$width(
							function () {
								switch (status.$) {
									case 'Idle':
										return 1;
									case 'Focused':
										return 1;
									default:
										return 5;
								}
							}()),
							$mdgriffith$elm_ui$Element$Border$color(
							function () {
								switch (status.$) {
									case 'Idle':
										return A3($mdgriffith$elm_ui$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									case 'Focused':
										return A3($mdgriffith$elm_ui$Element$rgb, 208 / 255, 208 / 255, 208 / 255);
									default:
										return A3($mdgriffith$elm_ui$Element$rgb, 59 / 255, 153 / 255, 252 / 255);
								}
							}())
						]),
					$mdgriffith$elm_ui$Element$none),
					A2(
					$mdgriffith$elm_ui$Element$el,
					_List_fromArray(
						[
							$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
							$mdgriffith$elm_ui$Internal$Model$htmlClass('unfocusable')
						]),
					optionLabel)
				]));
	});
var $mdgriffith$elm_ui$Element$Input$option = F2(
	function (val, txt) {
		return A2(
			$mdgriffith$elm_ui$Element$Input$Option,
			val,
			$mdgriffith$elm_ui$Element$Input$defaultRadioOption(txt));
	});
var $mdgriffith$elm_ui$Element$Input$Row = {$: 'Row'};
var $mdgriffith$elm_ui$Element$Input$AfterFound = {$: 'AfterFound'};
var $mdgriffith$elm_ui$Element$Input$BeforeFound = {$: 'BeforeFound'};
var $mdgriffith$elm_ui$Element$Input$Idle = {$: 'Idle'};
var $mdgriffith$elm_ui$Element$Input$NotFound = {$: 'NotFound'};
var $mdgriffith$elm_ui$Element$Input$Selected = {$: 'Selected'};
var $mdgriffith$elm_ui$Element$Input$column = F2(
	function (attributes, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asColumn,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$shrink),
				A2(
					$elm$core$List$cons,
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					attributes)),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Input$downArrow = 'ArrowDown';
var $mdgriffith$elm_ui$Internal$Model$filter = function (attrs) {
	return A3(
		$elm$core$List$foldr,
		F2(
			function (x, _v0) {
				var found = _v0.a;
				var has = _v0.b;
				switch (x.$) {
					case 'NoAttribute':
						return _Utils_Tuple2(found, has);
					case 'Class':
						var key = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'Attr':
						var attr = x.a;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'StyleClass':
						var style = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'Width':
						var width = x.a;
						return A2($elm$core$Set$member, 'width', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'width', has));
					case 'Height':
						var height = x.a;
						return A2($elm$core$Set$member, 'height', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'height', has));
					case 'Describe':
						var description = x.a;
						return A2($elm$core$Set$member, 'described', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'described', has));
					case 'Nearby':
						var location = x.a;
						var elem = x.b;
						return _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							has);
					case 'AlignX':
						return A2($elm$core$Set$member, 'align-x', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'align-x', has));
					case 'AlignY':
						return A2($elm$core$Set$member, 'align-y', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'align-y', has));
					default:
						return A2($elm$core$Set$member, 'transform', has) ? _Utils_Tuple2(found, has) : _Utils_Tuple2(
							A2($elm$core$List$cons, x, found),
							A2($elm$core$Set$insert, 'transform', has));
				}
			}),
		_Utils_Tuple2(_List_Nil, $elm$core$Set$empty),
		attrs).a;
};
var $mdgriffith$elm_ui$Internal$Model$get = F2(
	function (attrs, isAttr) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, found) {
					return isAttr(x) ? A2($elm$core$List$cons, x, found) : found;
				}),
			_List_Nil,
			$mdgriffith$elm_ui$Internal$Model$filter(attrs));
	});
var $mdgriffith$elm_ui$Element$Input$leftArrow = 'ArrowLeft';
var $mdgriffith$elm_ui$Element$Input$rightArrow = 'ArrowRight';
var $mdgriffith$elm_ui$Element$Input$row = F2(
	function (attributes, children) {
		return A4(
			$mdgriffith$elm_ui$Internal$Model$element,
			$mdgriffith$elm_ui$Internal$Model$asRow,
			$mdgriffith$elm_ui$Internal$Model$div,
			A2(
				$elm$core$List$cons,
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				attributes),
			$mdgriffith$elm_ui$Internal$Model$Unkeyed(children));
	});
var $mdgriffith$elm_ui$Element$Input$tabindex = A2($elm$core$Basics$composeL, $mdgriffith$elm_ui$Internal$Model$Attr, $elm$html$Html$Attributes$tabindex);
var $mdgriffith$elm_ui$Element$Input$upArrow = 'ArrowUp';
var $mdgriffith$elm_ui$Element$Input$radioHelper = F3(
	function (orientation, attrs, input) {
		var track = F2(
			function (opt, _v14) {
				var found = _v14.a;
				var prev = _v14.b;
				var nxt = _v14.c;
				var val = opt.a;
				switch (found.$) {
					case 'NotFound':
						return _Utils_eq(
							$elm$core$Maybe$Just(val),
							input.selected) ? _Utils_Tuple3($mdgriffith$elm_ui$Element$Input$BeforeFound, prev, nxt) : _Utils_Tuple3(found, val, nxt);
					case 'BeforeFound':
						return _Utils_Tuple3($mdgriffith$elm_ui$Element$Input$AfterFound, prev, val);
					default:
						return _Utils_Tuple3(found, prev, nxt);
				}
			});
		var renderOption = function (_v11) {
			var val = _v11.a;
			var view = _v11.b;
			var status = _Utils_eq(
				$elm$core$Maybe$Just(val),
				input.selected) ? $mdgriffith$elm_ui$Element$Input$Selected : $mdgriffith$elm_ui$Element$Input$Idle;
			return A2(
				$mdgriffith$elm_ui$Element$el,
				_List_fromArray(
					[
						$mdgriffith$elm_ui$Element$pointer,
						function () {
						if (orientation.$ === 'Row') {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$shrink);
						} else {
							return $mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill);
						}
					}(),
						$mdgriffith$elm_ui$Element$Events$onClick(
						input.onChange(val)),
						function () {
						if (status.$ === 'Selected') {
							return $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'aria-checked', 'true'));
						} else {
							return $mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'aria-checked', 'false'));
						}
					}(),
						$mdgriffith$elm_ui$Internal$Model$Attr(
						A2($elm$html$Html$Attributes$attribute, 'role', 'radio'))
					]),
				view(status));
		};
		var prevNext = function () {
			var _v5 = input.options;
			if (!_v5.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var _v6 = _v5.a;
				var val = _v6.a;
				return function (_v7) {
					var found = _v7.a;
					var b = _v7.b;
					var a = _v7.c;
					switch (found.$) {
						case 'NotFound':
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						case 'BeforeFound':
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, val));
						default:
							return $elm$core$Maybe$Just(
								_Utils_Tuple2(b, a));
					}
				}(
					A3(
						$elm$core$List$foldl,
						track,
						_Utils_Tuple3($mdgriffith$elm_ui$Element$Input$NotFound, val, val),
						input.options));
			}
		}();
		var optionArea = function () {
			if (orientation.$ === 'Row') {
				return A2(
					$mdgriffith$elm_ui$Element$Input$row,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.label),
						attrs),
					A2($elm$core$List$map, renderOption, input.options));
			} else {
				return A2(
					$mdgriffith$elm_ui$Element$Input$column,
					A2(
						$elm$core$List$cons,
						$mdgriffith$elm_ui$Element$Input$hiddenLabelAttribute(input.label),
						attrs),
					A2($elm$core$List$map, renderOption, input.options));
			}
		}();
		var events = A2(
			$mdgriffith$elm_ui$Internal$Model$get,
			attrs,
			function (attr) {
				_v3$3:
				while (true) {
					switch (attr.$) {
						case 'Width':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _v3$3;
							}
						case 'Height':
							if (attr.a.$ === 'Fill') {
								return true;
							} else {
								break _v3$3;
							}
						case 'Attr':
							return true;
						default:
							break _v3$3;
					}
				}
				return false;
			});
		return A3(
			$mdgriffith$elm_ui$Element$Input$applyLabel,
			_Utils_ap(
				A2(
					$elm$core$List$filterMap,
					$elm$core$Basics$identity,
					_List_fromArray(
						[
							$elm$core$Maybe$Just($mdgriffith$elm_ui$Element$alignLeft),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Element$Input$tabindex(0)),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Internal$Model$htmlClass('focus')),
							$elm$core$Maybe$Just($mdgriffith$elm_ui$Element$Region$announce),
							$elm$core$Maybe$Just(
							$mdgriffith$elm_ui$Internal$Model$Attr(
								A2($elm$html$Html$Attributes$attribute, 'role', 'radiogroup'))),
							function () {
							if (prevNext.$ === 'Nothing') {
								return $elm$core$Maybe$Nothing;
							} else {
								var _v1 = prevNext.a;
								var prev = _v1.a;
								var next = _v1.b;
								return $elm$core$Maybe$Just(
									$mdgriffith$elm_ui$Element$Input$onKeyLookup(
										function (code) {
											if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$leftArrow)) {
												return $elm$core$Maybe$Just(
													input.onChange(prev));
											} else {
												if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$upArrow)) {
													return $elm$core$Maybe$Just(
														input.onChange(prev));
												} else {
													if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$rightArrow)) {
														return $elm$core$Maybe$Just(
															input.onChange(next));
													} else {
														if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$downArrow)) {
															return $elm$core$Maybe$Just(
																input.onChange(next));
														} else {
															if (_Utils_eq(code, $mdgriffith$elm_ui$Element$Input$space)) {
																var _v2 = input.selected;
																if (_v2.$ === 'Nothing') {
																	return $elm$core$Maybe$Just(
																		input.onChange(prev));
																} else {
																	return $elm$core$Maybe$Nothing;
																}
															} else {
																return $elm$core$Maybe$Nothing;
															}
														}
													}
												}
											}
										}));
							}
						}()
						])),
				events),
			input.label,
			optionArea);
	});
var $mdgriffith$elm_ui$Element$Input$radioRow = $mdgriffith$elm_ui$Element$Input$radioHelper($mdgriffith$elm_ui$Element$Input$Row);
var $author$project$Main$viewRunReMapModal = F2(
	function (_v0, allRuns) {
		var lensId = _v0.lensId;
		var mapping = _v0.mapping;
		var listOfMappings = $elm$core$Dict$toList(mapping);
		var allMissingRuns = A2(
			$elm$core$List$filter,
			function (ri) {
				return _Utils_eq(
					A2($author$project$AllRuns$get, ri, allRuns),
					$elm$core$Maybe$Nothing);
			},
			$elm$core$Dict$keys(mapping));
		var allActualRuns = A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			$author$project$AllRuns$toList(allRuns));
		var options = A2(
			$elm$core$List$map,
			function (ri) {
				return A2(
					$mdgriffith$elm_ui$Element$Input$option,
					ri,
					A2(
						$author$project$Main$viewRunId,
						_List_fromArray(
							[
								$mdgriffith$elm_ui$Element$moveDown(1)
							]),
						ri));
			},
			$elm$core$Set$toList(
				$elm$core$Set$fromList(
					_Utils_ap(allActualRuns, allMissingRuns))));
		return A2(
			$mdgriffith$elm_ui$Element$column,
			_List_fromArray(
				[
					$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
					$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium)
				]),
			_Utils_ap(
				A2(
					$elm$core$List$map,
					function (_v1) {
						var fromRunId = _v1.a;
						var toRunId = _v1.b;
						return A2(
							$mdgriffith$elm_ui$Element$Input$radioRow,
							_List_fromArray(
								[
									$mdgriffith$elm_ui$Element$spacing(2 * $author$project$Styling$sizes.large)
								]),
							{
								label: A2(
									$mdgriffith$elm_ui$Element$Input$labelLeft,
									_List_fromArray(
										[
											A2($mdgriffith$elm_ui$Element$paddingXY, $author$project$Styling$sizes.large, 0)
										]),
									A2(
										$mdgriffith$elm_ui$Element$row,
										A2(
											$elm$core$List$cons,
											$mdgriffith$elm_ui$Element$spacing($author$project$Styling$sizes.medium),
											$author$project$Styling$fonts.explorer),
										_List_fromArray(
											[
												A2(
												$author$project$Main$viewRunId,
												_List_fromArray(
													[
														$mdgriffith$elm_ui$Element$moveDown(1)
													]),
												fromRunId),
												$author$project$Styling$icon(
												A2($feathericons$elm_feather$FeatherIcons$withSize, $author$project$Styling$sizes.fontSize, $feathericons$elm_feather$FeatherIcons$arrowRight))
											]))),
								onChange: A2(
									$elm$core$Basics$composeL,
									$author$project$Main$ModalMsg,
									$author$project$Main$ReMapChangeMapping(fromRunId)),
								options: options,
								selected: $elm$core$Maybe$Just(toRunId)
							});
					},
					listOfMappings),
				_List_fromArray(
					[
						A2(
						$author$project$Styling$iconButton,
						$author$project$Styling$size32($feathericons$elm_feather$FeatherIcons$check),
						A2($author$project$Main$ReMapModalOkClicked, lensId, mapping))
					])));
	});
var $author$project$Main$view = function (model) {
	var dialog = function () {
		var _v0 = model.showModal;
		if (_v0.$ === 'Nothing') {
			return $mdgriffith$elm_ui$Element$none;
		} else {
			var modalState = _v0.a;
			var _v1 = function () {
				switch (modalState.$) {
					case 'EnterInputs':
						var maybeNdx = modalState.a;
						var state = modalState.b;
						var overrides = modalState.c;
						return _Utils_Tuple2(
							function () {
								if (maybeNdx.$ === 'Nothing') {
									return 'Add new generator run';
								} else {
									var ndx = maybeNdx.a;
									return 'Change generator run ' + $elm$core$String$fromInt(ndx);
								}
							}(),
							A3(
								$author$project$EnterInputsDialog$view,
								A2($elm$core$Basics$composeL, $author$project$Main$ModalMsg, $author$project$Main$UpdateEnterInputs),
								function (i) {
									return A3($author$project$Main$CalculateModalOkClicked, maybeNdx, i, overrides);
								},
								state));
					case 'Loading':
						return _Utils_Tuple2(
							'Loading',
							$author$project$Styling$scrollableText('This should be done immediately. If it doesn\'t go away something is probably broken.'));
					case 'ErrorMessage':
						var t = modalState.a;
						var m = modalState.b;
						return _Utils_Tuple2(
							t,
							$author$project$Styling$scrollableText(m));
					default:
						var reMapState = modalState.a;
						return _Utils_Tuple2(
							'Change which runs are shown',
							A2($author$project$Main$viewRunReMapModal, reMapState, model.runs));
				}
			}();
			var title = _v1.a;
			var content = _v1.b;
			return A2($author$project$Main$viewModalDialogBox, title, content);
		}
	}();
	return A2(
		$mdgriffith$elm_ui$Element$layout,
		_List_fromArray(
			[
				$mdgriffith$elm_ui$Element$width($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$height($mdgriffith$elm_ui$Element$fill),
				$mdgriffith$elm_ui$Element$inFront(dialog)
			]),
		$author$project$Main$viewModel(model));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{init: $author$project$Main$init, subscriptions: $author$project$Main$subscriptions, update: $author$project$Main$update, view: $author$project$Main$view});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$value)(0)}});}(this));