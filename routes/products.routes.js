import { Router } from 'express'
import { createProduct, deletesProduct, getAllProducts, getProductByPid, updatesProduct } from '../controllers/producto.controller.js'

export const productRouter = Router()

productRouter.get('/', getAllProducts)
productRouter.get('/:pid', getProductByPid)
productRouter.post('/', createProduct)
productRouter.put('/:pid', updatesProduct)
productRouter.delete('/:pid', deletesProduct)
