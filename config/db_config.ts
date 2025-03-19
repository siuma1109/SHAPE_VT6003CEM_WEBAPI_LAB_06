require('dotenv').config()

export const config = {
    host: "127.0.0.1",
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    connection_limit: 100
}