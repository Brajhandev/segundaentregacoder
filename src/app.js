import express from 'express'
import { engine } from 'express-handlebars'
import { Server as SocketIOServer } from 'socket.io'
import { cartsRouter } from '../routes/carts.routes.js'
import { productRouter } from '../routes/products.routes.js'
import { webRouter } from '../routes/web.routes.js'
import { ProductManager } from './ProductManager.js'

const app = express()
const PORT = 8080
app.use(express.json())
const productMan = new ProductManager()

app.use('/static', express.static('./static'))
app.engine('handlebars', engine())
app.set('views', './views')

app.use('/', webRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)

const httpServer = app.listen(PORT, () => {
  console.log(`server running port ${PORT} `)
})

// sockets io
const io = new SocketIOServer(httpServer)

io.on('connection', async (clientSocket) => {
  console.log('nuevo cliente conectado', clientSocket.id)
  clientSocket.on('newProduct', datos => {
    console.log(datos)
  })
  // sirve para avisar a todos los sockets
  io.sockets.emit('actualizarproducts', await productMan.getProducts())
})
