import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return [...state, action.item];
      case "REMOVE":
        let newArr = [...state];
        newArr.splice(action.index, 1);
        return newArr;
      case "DROP":
        let empArray = [];
        return empArray;
      case "UPDATE":
        let updatedArr = [...state];
        updatedArr[action.index] = action.item;
        return updatedArr;
      default:
        console.log("Error in Reducer");
    }
  };
  

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);