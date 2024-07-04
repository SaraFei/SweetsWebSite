//זהו דף לכל מה שקשור לסטייט של הממתקים
import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    sweetsArr: [],
    sweetsAmount: 0,
    filter:false
}

const sweetSlice = createSlice({
    name: 'sweetState',//לבדוק מה משמעות השם
    initialState: initialState,
    reducers: {
        saveSweetsInClient: (state, action) => {
            state.sweetsArr = action.payload;
        },
        addSweetToClient: (state, action) => {
            state.sweetsArr.push(action.payload);
        },
        saveAmountSweetsInClient: (state, action) => {
            state.sweetsAmount = action.payload;
        },
        deleteSweetFromClient:(state,action)=>{
            let newArr = state.sweetsArr.filter(item => item._id !== action.payload)
            state.sweetsArr = newArr;
        },
        setFilter:(state,action)=>{
            state.filter=action.payload;
        }
    }

})

export const { saveSweetsInClient, addSweetToClient ,saveAmountSweetsInClient,deleteSweetFromClient,setFilter} = sweetSlice.actions;
export default sweetSlice.reducer;
