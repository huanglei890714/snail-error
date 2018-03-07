import _ from 'lodash'
import fundebug from 'fundebug-nodejs'

import conf from './errInfoConf'

let errInfo = {} //设置错误提示包
let app = {
    version: '1.0.0',
    stage: 'development'
} //设置app信息
let onFundebug = false //设置是否启用fundebug

const selfPath = 'node_modules/snail-error/lib'
const projectPath = __dirname.replace(selfPath, '')

/**
 * 格式化栈信息，去掉本栈的路径提示
 * @param {*} stack 栈错误信息
 */
const formatStack = function (stack) {
    let arr = stack.split('\n')
    arr = arr.filter((val) => {
        return val.indexOf(selfPath) < 0
    })
    arr = arr.map((val) => {
        return val.replace(projectPath, '')
    })

    return arr.join('\n')
}

const printOutErr = function (title, err) {
    console.log(title, err, '请联系开发者或提交issue, 开发者邮箱: yahuhuang@163.com')
}

/**
 * 设置提示语言, 及提示版本号
 * @param {*} lang 语言种类
 * @param {*} appInfo 语言种类 { version: '版本', stage: '版本模式' }。可默认
 */
const cnfErrInfo = function (lang, appInfo) {
    try {
        if (appInfo) {
            app = appInfo
        }
        const _conf = conf[lang] || conf.en
        for(const item of Object.keys(_conf.custom)) {
            if (item < 500) {
                errInfo[item] = function (details) { //details为细节错误
                    let denfMessage = ''
                    if (!onFundebug) { //fundebug不启用时拼接到message
                        if (_.isPlainObject(details)) {
                            denfMessage = ':' + JSON.stringify(details)
                        } else if (!_.isEmpty(details)){
                            denfMessage = '-' + details
                        }
                    }
                    return {
                        name: _conf.name,
                        code: item,
                        message: _conf.custom[item] + denfMessage,
                        stack: formatStack(new Error().stack)
                    }
                }
            } else {
                errInfo[item] = _conf.custom[item]
            }
        }
    } catch (err) {
        printOutErr('errinfo配置异常：', err)
    }
}

/**
 * fundebug配置
 * @param {*} key 秘钥
 * @param {*} user 用户信息 默认
 * @param {*} metaData 自定义信息头 默认为空
 * @param {*} silent 是否开启错误报警, 默认开启
 */
const cnfFundebug = function (options) {
    try {
        onFundebug = true
        fundebug.config({
            silent: options.silent || false,
            apikey: options.key,
            appVersion: app.version,
            releaseStage: app.stage,
            user: options.user || {
                name: 'hsl',
                email: 'yahuhuang@163.com'
            },
            metaData: options.metaData || null
        })
    } catch (err) {
        printOutErr('fundebug配置异常：', err)
    }
}

/**
 * 记录异常消息
 * @param {*} errMessage 日志消息
 * @param {*} title 日志title, 默认为严重错误日志，否则为一般错误日志
 * @param {*} metaData 自定义错误细节信息
 */
const recordErr = function (errMessage, title, metaData) {
    try {
        if (onFundebug) {
            if (title) {
                fundebug.notify(title, errMessage, metaData)
            } else {
                fundebug.notifyError(errMessage, metaData)
            }
        } else {
            console.log(errMessage)
        }
    } catch (err) {
        printOutErr('fundebug发送异常：', err)
    }
}

/**
 * 错误处理
 * @param {*} err 错误信息
 * @param {*} params 自定义便于调试的错误信息, 可传空
 */
const foo = function (err, params) {
    try {
        if (!isNaN(err)) {//是数字
            err = (errInfo[err] || errInfo[101])(params)
        }
        if (_.isPlainObject(params)) {
            params = {
                metaData: params
            }
        }
        recordErr(err, null, params)
        return err
    } catch (_err) {
        printOutErr('错误处理异常：', _err)
    }
}

/**
 * err处理机制
 * @param {*} callback 回调方法, 可以自定记录log方法
 */
 const errHandle = function (callback) {
    return (err, req, res, next) => {
        try {
            const basicCode = errInfo[500][err.name]
            if (basicCode) { //基础错误
                err = {
                    name: err.name,
                    code: basicCode.code,
                    message: basicCode.message,
                    stack: formatStack(err.stack || new Error().stack)
                }
            }
            else if (!isNaN(err) && errInfo[parseInt(err)]) { //自定义错误
                err = errInfo[err]()
            }
            else if (!errInfo[err.code]) { //其它错误
                err = {
                    name: err.name,
                    code: 888,
                    message: '解析失败，当前程序不认识这个错误，需更新',
                    stack: formatStack(err.stack || new Error().stack)
                }
            }
            if (_.isFunction(callback)) {
                callback(err)
            }
            res.json(err)
        } catch (_err) {
            printOutErr('handle错误处理异常：', _err)
        }
    }
}

foo.language = cnfErrInfo
foo.fundebug = cnfFundebug
foo.errHandle = errHandle

export default foo
