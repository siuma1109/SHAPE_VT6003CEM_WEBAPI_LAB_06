import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";

import { router as ArticleRouter } from "./routes/article_router";

const app: Koa = new Koa();

app.use(json());
app.use(logger());
app.use(bodyParser());

const router: Router = new Router();
const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
        message: "Welcome to the blog API!"
    };
    await next();
}
router.get('/api/v1', welcomeAPI);

app.use(ArticleRouter.routes()).use(ArticleRouter.allowedMethods());

app.use(async (ctx: RouterContext, next: any) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { err: "No such endpoint existed" };
        }
    } catch (err: any) {
        ctx.body = { err: err };
    }
})

app.listen(10888, () => {
    console.log("Koa Started");
})