import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Balloon dissapears after 5 seconds
const BALLOON_TIMEOUT = 5000;

// A show balloon thunk that simply resolves after 
const showBalloon = createAsyncThunk(
    'balloon/showBalloon',
    (arg, thunkapi)=> new Promise((resolve)=> window.setTimeout(resolve, BALLOON_TIMEOUT))
);


export const balloonSlice = createSlice({
    name: 'balloon',
    initialState: {
        shownCount: 0,
        type: 'primary',
        message: ''
    },
    reducers: {
        setTypeAndMessage: (state, action)=> {
            const { type, message } = action.payload;
            state.type = type;
            state.message = message;
        }
    },
    extraReducers: (builder)=> {
        builder.addCase( showBalloon.pending, (state)=> {
            ++state.shownCount;
        });
        builder.addCase( showBalloon.fulfilled, (state)=> {
            --state.shownCount;
        });
        builder.addCase( showBalloon.rejected, (state, action)=> console.log(action));
    }
});

export const { setTypeAndMessage } = balloonSlice.actions;
export { showBalloon };

export default balloonSlice.reducer;