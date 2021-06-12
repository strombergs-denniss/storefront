import express from 'express'
import cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import Database from './base/Database'
import buildSchema from './base/Schema'

const database = new Database()
const app = express()
app.use(cors())
app.use(express.json({limit: '25mb'}))
app.use(express.urlencoded({limit: '25mb'}))
app.use(express.static('public'))
app.use('/graphql', graphqlHTTP(async (req) => {
    const role = req.header('Role') || 'PUBLIC'
    const token = req.header('Authentication') || ''

    return {
        schema: buildSchema(database.models),
        context: {
            models: database.models,
            sequelize: database.sequelize,
            role,
            token,
            rootDir: __dirname.replace('\\dist', '')
        },
        graphiql: true
    }
}))
app.listen(3001)
