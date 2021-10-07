import { createSlice } from '@reduxjs/toolkit';


export const blindfoldSlice = createSlice({
    name: 'blindfold_showing',
    initialState: false,    // True means show blindfold, false means to hide it.
    reducers: {
        showBlindfold: ()=> true,
        hideBlindfold: ()=> false
    }
});

export const { showBlindfold, hideBlindfold } = blindfoldSlice.actions;
export default blindfoldSlice.reducer;