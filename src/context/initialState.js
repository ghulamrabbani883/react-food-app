import { fetchData,fetchCart } from "../utils/fetchLocalstorageData";
const userData = fetchData();
const cartInfo = fetchCart();
export const initialState = { user: userData, foodItems: null, cartShow: false, cartItems: cartInfo };
