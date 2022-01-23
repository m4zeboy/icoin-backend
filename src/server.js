import express from "express";
import AuthRouter from './routes/auth/index.js'
const server = express();
server.use(express.json())

server.get('/', (req, res) => {
   res.send('Hello world')
})

server.use('/api/auth', AuthRouter)

export default server;