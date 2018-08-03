const router = require('koa-router')()
const db = require("../commons/DBHelper");

router.get('/', async(ctx, next) => {
    await next();
    await ctx.render('index', {
        title: 'We are getting married!'
    })
})

router.post('/addGuest', async(ctx, next) => {
    await next();
    let res = {
        code: 200,
        success: true,
        message: "登记成功"
    };
    let params = ctx.request.body;
    if(!params.name || !params.number || !params.arrivaltime) {
        res.code = 1008;
        res.success = false;
        res.message = "请填写正确数据";
        ctx.body = res;
        return;
    }
    let result = await db.insert(`INSERT INTO guest (name, number, arrivaltime) VALUES (?, ?, ?)`, [params.name, params.number, params.arrivaltime]);
    if (!(result.affectedRows > 0)) {
        res.code = 1007;
        res.success = false;
        res.message = "登记失败，请重试";
    }
    ctx.body = res;
})

module.exports = router;
