import { createSlice } from "@reduxjs/toolkit";


export const loadingScreenSlice = createSlice({
    name: 'loadingScreen_showing',
    initialState: false,
    reducers: {
        showLoadingScreen: ()=> true,
        hideLoadingScreen: ()=> false
    }
});

export const { showLoadingScreen, hideLoadingScreen } = loadingScreenSlice.actions;
export default loadingScreenSlice.reducer;