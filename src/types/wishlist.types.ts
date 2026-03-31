import { ProductType } from "./product.types"

export interface WishlistType {
  status: string
  count: number
  data: ProductType[]
}
