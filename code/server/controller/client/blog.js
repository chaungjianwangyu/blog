import blogModel from '../../models/blog'
import path from 'path'

module.exports = {
    async list(ctx, next) {
        console.log('----------------获取博客列表 client_demo_api/blog/list-----------------------');
        let { type = null, pageindex = 1, pagesize = 5} = ctx.request.query;
        console.log('tx.request.query',ctx.request.query,'type:'+type+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)


        try {
            

            if (type == '全部') {
                console.log('+++++++')
                // let all = ['简历','HTML','CSS','JavaScript','Vue','Webpack','Node','MongoDB','算法','工具','黑科技']

                // let data = await ctx.find(blogModelAll)
                // let data = await ctx.find(blogModelAll, { isVisible: true, source: 1}, null, {limit: pagesize*1, skip: (pageindex-1)*pagesize, sort: {level: -1, createTime: -1}});

                
                let data = await ctx.find(blogModel, { isVisible: true, source: 1}, null, {limit: pagesize*1, skip: (pageindex-1)*pagesize, sort: {level: -1, createTime: -1}});
                return ctx.send(data)

            } else {
                let data = await ctx.find(blogModel, {type, isVisible: true, source: 1}, null, {limit: pagesize*1, skip: (pageindex-1)*pagesize, sort: {level: -1, createTime: -1}});

                return ctx.send(data)
            }
            

        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }

    },
    async info(ctx, next) {
        console.log('----------------获取博客信息 client_demo_api/blog/info-----------------------');
        let _id = ctx.request.query._id;
        try {
            let data = await ctx.findOne(blogModel, { _id });
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    }
}