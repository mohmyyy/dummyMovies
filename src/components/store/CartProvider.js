import { useState } from "react";
import cartContext from "./cart-context";

const cartProvider = (props) => {
  const [items,setItems] = useState();

  const addItemHandler = (item) => {
    setItems((prevValue) => (...prevValue,item))
  }

  cartObject = {
    items : items,
    addItem : addItemHandler,
    removeItem : () => {}
  }
  return (
    <cartContext.Provider value={cartObject} >{props.children}</cartContext.Provider>
  )
}