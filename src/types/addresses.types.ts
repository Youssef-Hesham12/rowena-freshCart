export interface UserAddressesType {
  results: number
  status: string
  data: Address[]
}

export interface Address {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
