import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as article_model from "../models/article";

// Since we are handling articles use a URI that begins with an appropriate path
const router = new Router({ prefix: '/api/v1/articles' });

// Now we define the handler functions
const getAll = async (ctx: RouterContext, next: any) => {
    // Use the response body to send the articles as JSON.
    ctx.body = await article_model.getAll()
    await next();
}
const getById = async (ctx: RouterContext, next: any) => {
    // Get the ID from the route parameters.
    let id = +ctx.params.id
    // If it exists then return the article as JSON.
    // Otherwise return a 404 Not Found status code
    const articles = await article_model.getById(id);

    if (Object.keys(articles).length > 0) {
        ctx.body = articles[0]
    } else {
        ctx.status = 404;
    }
    await next();
}
const createArticle = async (ctx: RouterContext, next: any) => {
    // The body parser gives us access to the request body on ctx.request.body.
    // Use this to extract the title and fullText we were sent.
    let { title, alltext } = ctx.request.body as { title: string, alltext: string };
    // In turn, define a new article for addition to the array.
    let newArticle = { title: title, alltext: alltext };
    let insertData = await article_model.add(newArticle)
    let createdArticle = await article_model.getById(insertData.id)
    // Finally send back appropriate JSON and status code.
    // Once we move to a DB store, the newArticle sent back will now have its ID.
    ctx.status = 201;
    ctx.body = createdArticle[0];
    await next();
}
const updateArticle = async (ctx: RouterContext, next: any) => {
    //TODO: edit an article
    // Get the ID from the route parameters.
    let id = +ctx.params.id
    let articles = await article_model.getById(id)
    if (Object.keys(articles).length > 0) {
        let updateData = ctx.request.body as { title: string, alltext: string };
        const article = article_model.update(updateData, id);
        ctx.body = article;
        ctx.status = 200;
    } else {
        ctx.status = 404;
    }

    await next();
}
const deleteArticle = async (ctx: RouterContext, next: any) => {
    //TODO: delete an article
    let id = +ctx.params.id
    let articles = await article_model.getById(id)

    if (Object.keys(articles).length > 0) {
        await article_model.deleteById(id)

        const articles = await article_model.getAll()
        ctx.body = articles;
        ctx.status = 200;
    } else {
        ctx.status = 404;
    }

    await next();
}
/* Routes are needed to connect path endpoints to handler functions.
 When an Article id needs to be matched we use a pattern to match
 a named route parameter. Here the name of the parameter will be 'id'
 and we will define the pattern to match at least 1 numeral. */
router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);
// Finally, define the exported object when import from other scripts.
export { router };