import { Sequelize, QueryTypes } from 'sequelize';
import { Sequelize as CoreSequelize } from '@sequelize/core';
import { config } from '../config/db_config';
import { PostgresDialect } from '@sequelize/postgres';
import { Article } from '../models/article_model';
// define an async utility function to get a connection
// // run an SQL query then end the connection

export const sequelize = new CoreSequelize({
    dialect: PostgresDialect,
    database: config.database,
    user: config.user,
    password: config.password,
    host: config.host,
    port: 5432,
    ssl: false,
    clientMinMessages: 'notice',
    models: [
        Article
    ]
})

export const run_query = async (query: string, values: any, ) => {
    try {
        const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
        await sequelize.authenticate();
        let data = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.SELECT,
        });
        await sequelize.close();
        return data;
    } catch (err: any) {
        console.error(err, query, values);
        throw 'Database query error';
    }
}

export const run_insert = async function run_insert(sql: string, values: any) {
    try {
        const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
        await sequelize.authenticate();
        let data = await sequelize.query(sql, {
            replacements: values,
            type: QueryTypes.INSERT
        });
        await sequelize.close();
        return data;
    } catch (err: any) {
        console.error(err, sql, values);
        throw 'Database query error';
    }
}

export const update_query = async (query: string, values: any, ) => {
    try {
        const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
        await sequelize.authenticate();
        let data = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.UPDATE,
        });
        await sequelize.close();
        return data;
    } catch (err: any) {
        console.error(err, query, values);
        throw 'Database query error';
    }
}

export const delete_query = async (query: string, values: any, ) => {
    try {
        const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
        await sequelize.authenticate();
        let data = await sequelize.query(query, {
            replacements: values,
            type: QueryTypes.DELETE,
        });
        await sequelize.close();
        return data;
    } catch (err: any) {
        console.error(err, query, values);
        throw 'Database query error';
    }
}