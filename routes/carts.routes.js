import { Router } from 'express'
import { addProductCart, createCart, getCartById } from '../controllers/cart.controller.js'

export const cartsRouter = Router()

cartsRouter.post('/', createCart)
cartsRouter.get('/:cid', getCartById)
cartsRouter.post('/:cid/product/:pid', addProductCart)
