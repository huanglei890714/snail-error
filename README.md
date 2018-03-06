# snail-error
node project error handling
# 安装
```
npm install snail-error
```
### 使用
```
import error from 'snail-error'
```
### 设置错误语言包和app环境, 不设置默认为en。当前语言包就 cn 和 en
```
//error.language() //默认
error.language('cn', { version: '1.0.0', stage: 'testing' })
```
### 设置启用发送到fundebug，不发送则这段代码可以省略。程序会console.log错误信息到控制台
```
error.fundebug({
    key: 'fundebug注册后项目的appkey',
    user: {
        name: 'hsl',
        email: 'yahuhuang@163.com'
    },
    metaData: { name: '自定义头信息' }
})
```
#### 最后感谢大家使用和纠正错误，提出修改意见

