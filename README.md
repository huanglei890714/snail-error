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
### 自定义错误使用, 自行查看errinfoConf配置文件，还可扩展配置到错误信息栈
```
//error(306)
error(306, {details: '这里是扩展配置测试', data: { name: 'hsl' } })

```
### 输出
```
{ name: '常规错误',
  code: '306',
  message: '数据已存在',
  stack: 'Error\n    at /Users/huangshenglei/nodejs/das-data-daily/control/daily-rank.js:19:9\n    at next (native)\n    at step (/Users/huangshenglei/nodejs/das-data-daily/control/daily-rank.js:17:191)\n    at 
  ......
```
### 系统错误捕捉
```
try {
        const a = hsl
    } catch (err) {
        error(err)
    }
```
### 输出
```
ReferenceError: hsl is not defined
    at /Users/huangshenglei/nodejs/das-data-daily/control/daily-rank.js:18:17
    at next (native)
    ......
```
### api异常捕捉, 如果关闭fundebug则这里可以自定方法记录你的错误日志
```
app.use(error.errHandle(callback))
```

### 关于fundebug的错误信息图
![](https://github.com/huanglei890714/snail-error/blob/master/demo/1.png)
![](https://github.com/huanglei890714/snail-error/blob/master/demo/2.png)

#### 最后感谢大家使用和纠正错误，提出修改意见

