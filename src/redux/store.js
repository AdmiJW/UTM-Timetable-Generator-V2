import { configureStore } from '@reduxjs/toolkit';

// Reducer from slices
import balloonSliceReducer from './slices/balloonSlice';
import blindfoldSliceReducer from './slices/blindfoldSlice';
import loadingScreenSliceReducer from './slices/loadingScreenSlice';
import cartSliceReducer from './slices/cartSlice';
import setupCoursesSliceReducer from './slices/setupCoursesSlice';
import configurationSliceReducer from './slices/configurationSlice';

const store = configureStore({
    reducer: {
        balloon: balloonSliceReducer,
        blindfold_showing: blindfoldSliceReducer,
        loadingScreen_showing: loadingScreenSliceReducer,
        setupCourses: setupCoursesSliceReducer,
        config: configurationSliceReducer,
        cart: cartSliceReducer,
    }
});

export default store;