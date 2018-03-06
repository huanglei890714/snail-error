'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fundebugNodejs = require('fundebug-nodejs');

var _fundebugNodejs2 = _interopRequireDefault(_fundebugNodejs);

var _errInfoConf = require('./errInfoConf');

var _errInfoConf2 = _interopRequireDefault(_errInfoConf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errInfo = {}; //设置错误提示包
var app = {
    version: '1.0.0',
    stage: 'development' //设置app信息
};var onFundebug = false; //设置是否启用fundebug

/**
 * 格式化栈信息，去掉本栈的路径提示
 * @param {*} stack 栈错误信息
 */
var formatStack = function formatStack(stack) {
    var info = '';
    if (stack) {
        var _stack = stack.split('\n');
        var start_stack = _stack[0];
        _stack = _stack.splice(3); //外部错误文件所在位置
        _stack.unshift(start_stack);
        info = _stack.join('\n');
    }
    return info;
};

/**
 * 设置提示语言, 及提示版本号
 * @param {*} lang 语言种类
 * @param {*} appInfo 语言种类 { version: '版本', stage: '版本模式' }。可默认
 */
var cnfErrInfo = function cnfErrInfo(lang, appInfo) {
    if (appInfo) {
        app = appInfo;
    }
    var _conf = _errInfoConf2.default[lang] || _errInfoConf2.default.en;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        var _loop = function _loop() {
            var item = _step.value;

            errInfo[item] = function () {
                return {
                    name: _conf.name,
                    code: item,
                    message: _conf.custom[item],
                    stack: formatStack(new Error().stack)
                };
            };
        };

        for (var _iterator = Object.keys(_conf.custom)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
};

/**
 * fundebug配置
 * @param {*} key 秘钥
 * @param {*} user 用户信息 默认
 * @param {*} metaData 自定义信息头 默认为空
 * @param {*} silent 是否开启错误报警, 默认开启
 */
var cnfFundebug = function cnfFundebug(options) {
    try {
        onFundebug = true;
        _fundebugNodejs2.default.config({
            silent: options.silent || false,
            apikey: options.key,
            appVersion: app.version,
            releaseStage: app.stage,
            user: options.user || {
                name: 'hsl',
                email: 'yahuhuang@163.com'
            },
            metaData: options.metaData || null
        });
    } catch (err) {
        console.log('fundebug配置异常：', err);
    }
};

/**
 * 记录异常消息
 * @param {*} errMessage 日志消息
 * @param {*} title 日志title, 默认为严重错误日志，否则为一般错误日志
 */
var recordErr = function recordErr(errMessage, title) {
    try {
        if (onFundebug) {
            if (title) {
                _fundebugNodejs2.default.notify(title, errMessage);
            } else {
                _fundebugNodejs2.default.notifyError(errMessage);
            }
        } else {
            console.log(errMessage);
        }
    } catch (err) {
        console.log('fundebug发送异常：', err);
    }
};

/**
 * 错误处理
 * @param {*} err 错误信息
 */
var foo = function foo(err) {
    if (!isNaN(err)) {
        //是数字
        err = (errInfo[err] || errInfo[101])();
        recordErr(err);
    } else {
        recordErr(err);
    }
    return err;
};

/**
 * err处理机制
 * @param {*} callback 回调方法, 可以自定记录log方法
 */
var errHandle = function errHandle(callback) {
    return function (err, req, res, next) {
        var basicCode = _errInfoConf2.default.basicError[err.name];
        if (basicCode) {
            err = {
                name: err.name,
                code: basicCode.code,
                message: basicCode.message,
                stack: formatStack(new Error().stack)
            };
        } else {
            err = {
                name: err.name,
                code: 888,
                message: '解析失败，当前程序不认识这个错误，需更新',
                stack: formatStack(new Error().stack)
            };
        }
        if (_lodash2.default.isFunction(callback)) {
            callback(err);
        }
        res.json(err);
    };
};

foo.language = cnfErrInfo;
foo.fundebug = cnfFundebug;
foo.errHandle = errHandle;

exports.default = foo;