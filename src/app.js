const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const postRoutes = require('./routes/postRoutes')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'My Blog API',
            description : 'Lab 6 SSJS',
            contact: {
                name: 'Luis Montenegro'
            },
            servers: ['https://localhost:3000']
        }
    },
    apis: ['src/routes/*.js']
}
const fs = require('fs')
const path = require('path')


const swaggerDocs = swaggerJsDoc(swaggerOptions)
const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('./posts', postRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something went wrong')
})

app.use((req, res, next) => {
    res.status(501).send('Method not implemented')
})

app.use((req, res, next) => {
    res.status(404).send("Error: Not found")
})

app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url} ${JSON.stringify(req.body)}\n`
    fs.appendFile(path.join(__dirname, 'log.txt'), log, err => {
        if (err) {
            console.error('Error writing to log file', err)
        }
    })
    next()
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`)
})

module.exports = app