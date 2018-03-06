'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 英文包
 */
var en = {
    101: 'Internal Server Error', // 内部错误
    102: 'Not Found',
    103: 'Method Not Allowed', // 不允许的 Method
    104: 'Gone',
    105: 'Remote Service Unavailable', // 远程服务不可用
    105.1: 'Remote Database Service Unavailable', // 远程服务不可用
    105.2: 'Remote Cache Service Unavailable', // 远程服务不可用
    105.3: 'Remote File Service Unavailable', // 远程服务不可用
    105.4: 'Remote Message Service Unavailable', // 远程服务不可用
    105.5: 'Remote SMS Service Unavailable', // 远程服务不可用
    105.6: 'Remote Email Service Unavailable', // 远程服务不可用
    105.7: 'Remote Wechat Service Unavailable', // 远程服务不可用
    105.8: 'Remote Push Service Unavailable', // 远程服务不可用

    121: 'Unauthorized/Authentication failure',
    122: 'Invalid or expired session',
    123: 'Invalid or expired token',
    124: 'Unsupported signature mothod', // 不支持的签名方法
    125: 'Incorrect signature', // 签名不正确
    126: 'Invalid/Used timestamp',
    127: 'Invalid username or password',

    160: 'Need sign in',
    161: 'Forbidden', // 没有权限, 针对路由
    162: 'Your account is is not permitted to access this feature', // 帐户不允许访问此功能
    163: 'Your account is suspended', // 帐户被暂停使用
    164: 'Your account is disabled', // 账户被禁用
    165: 'Purchase service has expired', // 服务已到期
    166: 'Enhance your calm', // 请求过于频繁
    167: 'Exceed quota', // 超出资源配额
    168: 'Rate limit exceeded', // 超出请求(次数)限制
    169: 'No data manipulation privileges, or part of the fields are read-only', // 没有数据操作权限, 或部分字段为只读, 针对有部分权限的 APIs
    170: 'Single operation records limit exceeded', // 超出单次操作数据条数限额

    201: 'Bad Request', // 错误的请求
    202: 'Missing required header', // 未指定所需的 HTTP 标头
    203: 'Invalid header value', // 为 HTTP 标头之一提供的值的格式不正确
    204: 'Malformed json',
    205: 'Malformed raw',
    206: 'Missing/Invalid parameter', // 缺少/无效的参数
    207: 'Contains forbid world', // 包含敏感词
    208: 'Requested Range Not Satisfiable', // 请求的范围无法满足
    209: 'Failed Dependency',

    301: 'Database read/write failure', // 数据库读写失败
    302: 'Invalid/Incomplete data', // 无效或不完整的数据
    303: 'Repetitive data creation request', // 重复的数据创建请求
    304: 'Expected to be unique', // 违反数据唯一性
    305: 'Did not submit valid data', // 未提交有效的数据
    306: 'Record(s) does not exist', // 数据记录存在
    307: 'Invalid record id', // 无效的 id
    308: 'Has been used', // 已被使用
    309: 'Bad request in pagination', // 错误的分页请求
    310: 'Invalid limit of pagination', // 分页每页条数的无效限制

    400: 'Bad Request',
    401: 'Upload file failed', // 上传文件失败
    402: 'Unsupported file type', // 不支持的文件类型
    403: 'File size too large', // 文件超出大小限制
    404: 'Resource does not exist'

    /**
     * 中文包
     */
};var cn = {
    101: '内部错误', // 内部错误
    102: '没有找到',
    103: 'Method 无效',
    104: '消失了',
    105: '远程服务不可用',
    105.1: '远程数据服务不可用',
    105.2: '远程缓存服务不可用',
    105.3: '远程文件服务不可用',
    105.4: '远程消息服务不可用',
    105.5: '远程短信服务不可用',
    105.6: '远程邮件服务不可用',
    105.7: '远程微信服务不可用',
    105.8: '远程推送服务不可用',

    121: '授权失败',
    122: '无效的、过期的session',
    123: '无效的、过期的token',
    124: '不支持的签名方法', // 不支持的签名方法
    125: '签名不正确', // 签名不正确
    126: '无效的时间戳',
    127: '无效的用户名和密码',

    160: '没有登录',
    161: '没有权限', // 没有权限, 针对路由
    162: '当前账户不允许访问', // 帐户不允许访问此功能
    163: '账户被暂停使用', // 帐户被暂停使用
    164: '账户被禁用', // 账户被禁用
    165: '服务已到期', // 服务已到期
    166: '请求太过频繁', // 请求过于频繁
    167: '资源超标', // 超出资源配额
    168: '超出请求次数限制', // 超出请求(次数)限制
    169: '没有数据操作权限，或部分字段只读', // 没有数据操作权限, 或部分字段为只读, 针对有部分权限的 APIs

    201: '错误的请求', // 错误的请求
    202: '丢失http header', // 未指定所需的 HTTP 标头
    203: '无效的http header', // 为 HTTP 标头之一提供的值的格式不正确
    204: '错误的json格式',
    205: '错误的raw格式',
    206: '缺少无效的参数', // 缺少/无效的参数
    207: '包含敏感词', // 包含敏感词
    208: '该请求无法满足', // 请求的范围无法满足
    209: '错误的依赖项',

    301: '数据库读写失败', // 数据库读写失败
    302: '无效或不完整的数据', // 无效或不完整的数据
    303: '重复的请求无效', // 重复的数据创建请求
    304: '违反唯一约束', // 违反数据唯一性
    305: '未提交有效数据', // 未提交有效的数据
    306: '数据已存在', // 数据记录存在
    307: '无效的id', // 无效的 id
    308: '资源正在使用', // 已被使用
    309: '错误的分页请求', // 错误的分页请求
    310: '无效的分页条数', // 分页每页条数的无效限制

    400: '请求不存在',
    401: '上传文件失败', // 上传文件失败
    402: '不支持的文件类型', // 不支持的文件类型
    403: '超出大小限制', // 文件超出大小限制
    404: '资源不存在'
};

var conf = {
    basicError: { //基础错误信息
        Error: { // 与 eval() 有关
            code: 101,
            message: 'Internal error'
        },
        EvalError: { // 与 eval() 有关
            code: 500,
            message: 'Internal error'
        },
        InternalError: { // 创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多"
            code: 500,
            message: 'Internal error'
        },
        RangeError: { // 数值变量或参数超出其有效范围
            code: 500,
            message: 'Internal error'
        },
        ReferenceError: { // 无效引用
            code: 500,
            message: 'Internal error'
        },
        SyntaxError: { // eval() 在解析代码的过程中发生的语法错误
            code: 204,
            message: 'Malformed json'
        },
        TypeError: { // 变量或参数不属于有效类型
            code: 500,
            message: 'Internal error'
        },
        URIError: { // 给 encodeURI()或  decodeURl()传递的参数无效
            code: 500,
            message: 'Internal error'
        }
    },
    en: {
        name: 'GeneralError',
        custom: en
    },
    cn: {
        name: '常规错误',
        custom: cn
    }
};

exports.default = conf;