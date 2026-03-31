import { ShippingAddressDataType } from "@/components/Checkout/shipping-address.type"
import { ProductCart } from "./cart.types"

export interface OrderCashType {
  status: string
  message: string
  user: User
  pricing: Pricing
  data: Data
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Pricing {
  cartPrice: number
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
}

export interface Data {
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User2
  cartItems: ProductCart[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface User2 {
  _id: string
  name: string
  email: string
  phone: string
}

export interface OrderCardType {
  status: string
  session: Session
  message?: string
}

export interface Session {
  url: string
  success_url: string
  cancel_url: string
}

export type OrdersType = Order[]

export interface Order {
  shippingAddress?: ShippingAddressDataType
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: ProductCart[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
  paidAt?: string
}
