import _ from 'lodash'
import fundebug from 'fundebug-nodejs'

/**
 * fundebug配置
 * @param {*} key 秘钥
 * @param {*} version 版本号
 * @param {*} stage 项目模式
 * @param {*} metaData 自定义信息头
 * @param {*} silent 是否开启错误报警, 默认开启
 */
const cnfFundebug = function (key, version, stage, user, metaData, silent) {
    try {
        return fundebug.config({
            silent: silent || false,
            apikey: key,
            appVersion: version,
            releaseStage: stage,
            user: user || {
                name: 'hsl',
                email: 'yahuhuang@163.com'
            },
            metaData: metaData || null
        })
    } catch (err) {
        console.log(err)
    }
}

/**
 * 记录异常消息
 * @param {*} errMessage 日志消息
 * @param {*} title 日志title, 默认为严重错误日志，否则为一般错误日志
 */
const sendErr = function (errMessage, title) {
    try {
        if (title) {
            return fundebug.notify(title, errMessage)
        } else {
            return fundebug.notifyError(errMessage)
        }
    } catch (err) {
        console.log(err)
    }
}

/**
 * err处理机制
 * @param {*} fn 自定方法执行
 */
const errHandle = function (fn) {
    return (err, req, res, next) => {
        if (_.isFunction(fn)) {
            fn(err)
        }
        fundebug.notify("Test-snail-err", "Hello, Fundebug")
        sendErr('fuck, Fundebug', "Test-snail-err2")
        if (err) {
            sendErr(err)
        }
        return res.json(err)
    }
}

const foo = {
    fundebug: cnfFundebug,
    errHandle
}

export default foo
