import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

const CartReducer = (state, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS' :
          return {
              ...state,
              products : action.products
          }
        case 'SET_CART_ITEMS' : {
          const totalAmount = getTotalCartAmount(action.cartItems, state.products)
          return {
            ...state,
            cartItems : action.cartItems,
            totalAmount
          }
        }
        case 'ADD_TO_CART' : {
          const updatedCartItems = {
              ...state.cartItems,
              [action.itemId] : state.cartItems[action.itemId] ? state.cartItems[action.itemId] + 1 : 1
          }
          const totalAmount = getTotalCartAmount(updatedCartItems, state.products);
          return {
              ...state,
              cartItems : updatedCartItems,
              totalAmount
          }
        }
        case 'REMOVE_FROM_CART' : {
          const updatedCartItems = {
              ...state.cartItems,
              [action.itemId] : state.cartItems[action.itemId] > 1 ? state.cartItems[action.itemId] - 1 : 0
          }
          const totalAmount = getTotalCartAmount(updatedCartItems, state.products);
          return {
              ...state,
              cartItems : updatedCartItems,
              totalAmount
          }  
        }   
        default :
          return state;    
    }
}

const getTotalCartAmount = (cartItems, products) => {
    let totalAmount = 0;
    for(const itemId in cartItems) {
        if(cartItems[itemId] > 0) {
            const itemInfo = products.find(product => product._id === itemId);
            if(itemInfo) {
              totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
    }
    return totalAmount;
}


const CartContextProvider = ({ children }) => {

    let { user } = useContext(AuthContext);
    const [state, dispatch] = useReducer(CartReducer, { cartItems: {}, products: [], totalAmount: 0 });
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchProductsAndCart = async() => {
        try {
          const productRes = await axios.get('/api/products');
          if(productRes.status === 200) {
            dispatch({ type : 'SET_PRODUCTS', products : productRes.data.data});
          }
          if(user) {
            const cartRes = await axios.post('/api/carts/get', { userId : user._id});
            if(cartRes.status === 200) {
              dispatch({ type : 'SET_CART_ITEMS', cartItems : cartRes.data})
            }
          }
          setLoading(false);
        } catch (e) {
          console.error("Error fetching products or cart items:", error);
          setLoading(false);
        }
      }
      fetchProductsAndCart();
    }, [user])

  
    const addToCart = async (itemId) => { 
      let res = await axios.post('/api/carts/add', {
        userId : user._id,
        itemId
      }
      )
      if(res.status === 200) {
        dispatch({ type : 'ADD_TO_CART', itemId})
      }
    }
  
    const removeFromCart = async (itemId) => {
      let res = await axios.post('/api/carts/remove', {
        userId : user._id,
        itemId
      }
      )
      if(res.status === 200) {
        dispatch({ type : 'REMOVE_FROM_CART', itemId})
      }
    }

  
    const contextValue = {
      cartItems: state.cartItems,
      products: state.products,
      totalAmount: state.totalAmount,
      addToCart,
      removeFromCart,
      loading
    }
  
    return (
      <CartContext.Provider value={contextValue}>
        {children}
      </CartContext.Provider>
    )
  }
  
  export { CartContext, CartContextProvider }