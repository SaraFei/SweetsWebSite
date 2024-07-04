import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        saveUserLoginInState: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser))
        },
        userExitFromState: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
})

export const { saveUserLoginInState, userExitFromState } = userSlice.actions;
export default userSlice.reducer;