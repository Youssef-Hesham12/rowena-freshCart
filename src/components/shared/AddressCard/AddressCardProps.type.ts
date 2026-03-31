import { Address } from "@/types/addresses.types"

export type AddressCardPropsType ={
    address: Address,
    isCheckOut: boolean,
    onSelect? : () => void,
    isSelected? : boolean
}