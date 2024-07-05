import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, pet } = action.payload
    const tempItem = state.cart.find((i) => i.id === id)
    if (tempItem) {
      return state; // Do nothing if the item is already in the cart
    } else {
      const newItem = {
        id,
        name: pet.name,
        image: pet.thumbnail,
      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const total_items = state.cart.length;
    return { ...state, total_items }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
