import fs from 'fs/promises'
import { Product } from '../models/product.model.js'
export class ProductManager {
  constructor () {
    this.path = './database/products.json'
    this.products = []
  }

  async getProducts () {
    const json = await fs.readFile(this.path, 'utf-8')
    if (!json) {
      this.products = []
      return this.products
    }
    this.products = JSON.parse(json)
    return this.products
  }

  async addProduct ({ title, description, code, price, status = true, stock, category, thumbnails }) {
    if (!category || !stock || !title || !description || !code || !price) {
      return 'The name, description, code, price, stock, and category are required to create a product.'
    }
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)

    const newProduct = new Product(title, description, code, price, status, stock, category, thumbnails)
    const findProductDuplicate = this.products.filter(prod => prod.code === newProduct.code)

    if (findProductDuplicate.length > 0) {
      return (`No se puede guardar, el codigo del producto ${newProduct.title} ya esta ingresado`)
    }

    this.products.push(newProduct)
    const jsonp = JSON.stringify(this.products)
    await fs.writeFile(this.path, jsonp)
  }

  async getProductById (id) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const getProduct = this.products.find(prod => prod.id === id)
    if (getProduct) {
      return getProduct
    }
    return ('Product Not Found')
  }

  async updateProduct (id, { title, description, code, price, status, stock, category, thumbnails }) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const index = this.products.findIndex(prod => prod.id === id)
    if (index === -1) {
      return ('el producto que desea actualizar no existe')
    }
    const productUpdate = {
      id: this.products[index].id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    }
    this.products[index] = productUpdate
    const newjson = JSON.stringify(this.products)
    await fs.writeFile(this.path, newjson)
  }

  async deleteProduct (id) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.products = JSON.parse(json)
    const index = this.products.findIndex(prod => prod.id === id)
    if (index === -1) {
      return ('el producto que desea eliminar no existe')
    }
    this.products.splice(index, 1)
    const newjson = JSON.stringify(this.products)
    await fs.writeFile(this.path, newjson)
  }
}
