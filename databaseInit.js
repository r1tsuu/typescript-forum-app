const config = require('./src/config.json')

const { Pool } = require('pg')

const pool = new Pool({
    database: config.DB_NAME
})

// TIME IN UTC MS FROM Date.Now().toString() like  '1613831852000'

const usersTableQuery =
'CREATE TABLE IF NOT EXISTS USERS' +
'(' +
'id serial primary key,' +
'username varchar(255) NOT NULL,' +
'email varchar(255) NOT NULL,' +
'password varchar(255) NOT NULL,' +
'registerDate varchar(64) NOT NULL,' +
'rating integer DEFAULT 0,' +
'isSuperuser boolean NOT NULL DEFAULT FALSE' +
');'

const categoriesTableQuery =
'CREATE TABLE IF NOT EXISTS CATEGORIES' +
'(' +
'id serial primary key,' +
'title varchar(255) NOT NULL' +
');'

const sectionsTableQuery =
'CREATE TABLE IF NOT EXISTS SECTIONS' +
'(' +
'id serial primary key,' +
'title varchar(255) NOT NULL,' +
'categoryId integer NOT NULL' +
');'

const topicsTableQuery =
'CREATE TABLE IF NOT EXISTS TOPICS' +
'(' +
'id serial primary key,' +
'title varchar(255) NOT NULL,' +
'createdDate varchar(64) NOT NULL,' +
'categoryId integer NOT NULL,' +
'authorId integer NOT NULL' +
');'

const postsTableQuery =
'CREATE TABLE IF NOT EXISTS POSTS' +
'(' +
'id serial primary key,' +
'createdDate varchar(64) NOT NULL,' +
'content text NOT NULL,' +
'likesCount integer DEFAULT 0,' +
'topicId integer NOT NULL,' +
'authorId integer NOT NULL' +
');'

const wallPostsTableQuery =
'CREATE TABLE IF NOT EXISTS WALLPOSTS' +
'(' +
'id serial primary key,' +
'createdDate varchar(64) NOT NULL,' +
'content text NOT NULL,' +
'likesCount integer DEFAULT 0,' +
'wallOwnerId integer NOT NULL,' +
'authorId integer NOT NULL' +
');'

const requests =
[
    usersTableQuery,
    categoriesTableQuery,
    sectionsTableQuery,
    topicsTableQuery,
    postsTableQuery,
    wallPostsTableQuery
]

// const testQuery = 'SELECT id FROM USERS ORDER BY id DESC LIMIT 1;'
async function databaseInit() {
    const client = await pool.connect()
    try {
        for (const i in requests) {
            await client.query(requests[i])
        }
    } catch (error) {
        console.log(error)
    } finally {
        client.release()
    }
}

(async () => {
    databaseInit()
})()
