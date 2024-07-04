//זהו דף לכל מה שקשור לסטייט של סל הקניות
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    basketProductArr: [],
    customerAddress: null,

}

const basketSlice = createSlice({
    name: 'basketState',//לבדוק מה משמעות השם
    initialState: initialState,
    reducers: {
        addProductToClient: (state, action) => {
            const existingProductIndex = state.basketProductArr.findIndex(item => item.product._id === action.payload._id);

            if (existingProductIndex !== -1) {
                state.basketProductArr[existingProductIndex].amount += 1;
            } else {
                state.basketProductArr.push({ product: action.payload, amount: 1 });
            }

        },
        deleteProductFromBasket: (state, action) => {
            let newArr = state.basketProductArr.filter(item => item.product._id !== action.payload)
            state.basketProductArr = newArr;
        },
        decrementProductQuantity: (state, action) => {
            const existingProductIndex = state.basketProductArr.findIndex(item => item.product._id === action.payload._id);

            if (existingProductIndex !== -1) {
                state.basketProductArr[existingProductIndex].amount -= 1;
            }
        },
        setCustomerAddress: (state, action) => {
            state.customerAddress = action.payload;
        }
    }

})

export const { addProductToClient, deleteProductFromBasket, decrementProductQuantity,setCustomerAddress } = basketSlice.actions;
export default basketSlice.reducer;
