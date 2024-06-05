import { ProductManager } from '../src/ProductManager.js'
const productMan = new ProductManager()

export const createProduct = async (req, res) => {
  const newProduct = await productMan.addProduct(req.body)

  if (!newProduct) {
    return res.status(201).json({
      status: true,
      msg: 'Product created success'
    })
  }
  res.status(400).json({
    status: false,
    msg: newProduct
  })
}

export const getAllProducts = async (req, res) => {
  const { limit } = req.query
  const newProduct = await productMan.getProducts()

  if (limit) {
    const queryValue = newProduct.splice(0, limit)
    return res.status(200).json({
      status: true,
      data: queryValue
    })
  }

  res.status(200).json({
    status: true,
    data: newProduct
  })
}

export const getProductByPid = async (req, res) => {
  const { pid } = req.params
  const newProduct = await productMan.getProductById(pid)

  if (!newProduct) {
    res.json({
      status: true,
      msg: 'id product not found'
    })
  }
  res.status(200).json({
    status: true,
    data: newProduct
  })
}

export const updatesProduct = async (req, res) => {
  const { pid } = req.params
  const newProduct = await productMan.updateProduct(pid, req.body)

  res.status(202).json({
    status: true,
    data: newProduct
  })
}

export const deletesProduct = async (req, res) => {
  const { pid } = req.params
  const newProduct = await productMan.deleteProduct(pid)

  res.status(202).json({
    status: true,
    msg: newProduct
  })
}
