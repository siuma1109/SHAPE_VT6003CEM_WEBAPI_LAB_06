import * as db from '../helpers/database';
import { Article } from './article_model';

//get a single article by its id
export const getById = async (id: any) => {
    const article = await Article.findOne({
        where: {id: id},
        rejectOnEmpty: true
    })

    return article
    
    let query = "SELECT * FROM articles WHERE ID = ?"
    let values = [id]
    let data = await db.run_query(query, values);
    return data;
}
//list all the articles in the database
export const getAll = async () => {
    // TODO: use page, limit, order to give pagination
    let query = "SELECT * FROM articles;"
    const articles = (await db.run_query(query, null))
    return articles;
}
//create a new article in the database
export const add = async (article: any) => {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let key = keys.join(',');
    let param = '';
    for (let i: number = 0; i < values.length; i++) { param += '?,' }
    param = param.slice(0, -1);
    let query = `INSERT INTO articles (${key}) VALUES (${param}) RETURNING id`;
    try {
        const [data, result] = await db.run_insert(query, values);
        const [article] = data;
        return article;
    } catch (err: any) {
        return err;
    }
}

//update article in the database
export const update = async (article: any, id: number) => {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let key = keys.join(',');
    let param = '';
    for (let i: number = 0; i < values.length; i++) { param += `${keys[i]} = ?,` }
    param = param.slice(0, -1);
    let query = `UPDATE articles SET ${param} WHERE id = ?`;
    try {
        const [data, result] = await db.update_query(query, [...values, id]);
        const [article] = data;
        return article;
    } catch (err: any) {
        return err;
    }
}

//delete a single article by its id
export const deleteById = async (id: any) => {
    let query = "DELETE FROM articles WHERE ID = ?"
    let values = [id]
    let data = await db.delete_query(query, values);
    return data;
}