import Koa from 'koa'
import ip from 'ip'
import conf from './config'
import router from './router'
import middleware from './middleware'
import './mongodb'
//const cors = require('koa-cors')
//import cors from 'koa-cors'
const app = new Koa()
//app.use(cors())

const cors = require('koa2-cors');

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        //if (ctx.url === '/test') {
            //return "*"; // 允许来自所有域名请求
        //}
        return 'http://120.79.86.138'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))





middleware(app)
router(app)
app.listen(conf.port, '0.0.0.0', () => {
    console.log(`server is running at http://${ip.address()}:${conf.port}`)
})