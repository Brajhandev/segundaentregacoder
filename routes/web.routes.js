import { Router } from 'express'
import { ProductManager } from '../src/ProductManager.js'
const productMan = new ProductManager()
export const webRouter = Router()

webRouter.get('/', async (req, res) => {
  const products = await productMan.getProducts()
  res.render('home.handlebars', { listado: products })
})

webRouter.get('/realtimeproducts', async (req, res) => {
  const products = await productMan.getProducts()
  res.render('realTimeProducts.handlebars', { listado: products, titulo: 'Agregar Productos' })
})
