import { v4 as uuidv4 } from 'uuid'

export class Product {
  static id = uuidv4()
  constructor (title, description, code, price, status, stock, category, thumbnails) {
    this.id = Product.id
    this.title = title
    this.description = description
    this.code = code
    this.price = price
    this.status = status
    this.stock = stock
    this.category = category
    this.thumbnails = thumbnails
  }
}
