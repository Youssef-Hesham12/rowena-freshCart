import { ProductType } from "./product.types"

export interface CartType {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartDetails
}

export interface CartDetails {
  _id: string
  cartOwner: string
  products: ProductCart[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface ProductCart {
  count: number
  _id: string
  product: ProductType
  price: number
}

