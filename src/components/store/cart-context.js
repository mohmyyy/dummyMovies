import { createContext } from "react"
const cartContext = createContext(
  {
    items : [],
    addItems : () => {},
    removeItem : () => {}
  }
)

export default cartContext