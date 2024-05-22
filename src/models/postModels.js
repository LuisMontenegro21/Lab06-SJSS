const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234user',
    database: 'my_blog'
})

db.connect(err => {
    if (err) {
        console.error('Error connecting to the databse: ', err)
    }
    else {
        console.log('Connected to the database')
    }
})

const Post = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts', (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve(results)
            })
        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve(results[0])
            })
        })
    },
    create: (post) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO posts SET ?', post, (err, results) =>{
                if (err) {
                    return reject(err)
                }
                resolve({id: results.insertId, ...post})
            })
        })
    },
    update: (id, post) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE posts SET ? WHERE id = ?'), [post, id], (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve({id, ...post})
            }
        })
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {
                if (err) {
                    return reject(err)
                }
                resolve(results.affectedRows > 0)
            })
        })
    }
}

module.exports = Post