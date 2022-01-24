import express from "express";
import restrictedMiddleware from './routes/auth/restrictedMiddleware.js'
import AuthRouter from './routes/auth/index.js'
import OrderRouter from './routes/order/index.js'
import WalletRouter from './routes/wallet/index.js'

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
   res.send('Hello world')
})

server.use('/api/auth', AuthRouter)
server.use('/api/order', restrictedMiddleware, OrderRouter)
server.use('/api/wallet', restrictedMiddleware, WalletRouter)
export default server;