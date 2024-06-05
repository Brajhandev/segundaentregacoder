import fs from 'fs/promises'
import { Cart } from '../models/cart.model.js'

export class CartManager {
  constructor () {
    this.path = './database/carts.json'
    this.carts = []
  }

  async createCart () {
    const json = await fs.readFile(this.path, 'utf-8')
    this.carts = JSON.parse(json)

    const newCart = new Cart()
    this.carts.push(newCart)
    const jsonp = JSON.stringify(this.carts)
    await fs.writeFile('./database/carts.json', jsonp)
  }

  async getProductCartById (id) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.carts = JSON.parse(json)
    const getProduct = this.carts.find(cart => cart.id === id)
    if (getProduct) {
      return getProduct
    }
    return ('Id Cart Not Found')
  }

  async addCart (id, idproduct) {
    const json = await fs.readFile(this.path, 'utf-8')
    this.carts = JSON.parse(json)

    const index = this.carts.findIndex((cart) => cart.id === id)
    if (index === -1) {
      return 'the cart not exists'
    }
    const productRepet = this.carts[index].products.findIndex(
      (p) => p.product === idproduct)

    if (productRepet !== -1) {
      this.carts[index].products[productRepet].quantity += 1
    } else {
      this.carts[index].products.push({
        product: idproduct,
        quantity: 1
      })
    }

    const newjson = JSON.stringify(this.carts)
    await fs.writeFile(this.path, newjson)
  }
}
