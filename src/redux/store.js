import { configureStore } from '@reduxjs/toolkit';

// Reducer from slices
import balloonSliceReducer from './slices/balloonSlice';
import blindfoldSliceReducer from './slices/blindfoldSlice';
import loadingScreenSliceReducer from './slices/loadingScreenSlice';
import sectionSliceReducer from './slices/sectionsSlice';
import classCoursesSliceReducer from './slices/classCoursesSlice';
import configurationSliceReducer from './slices/configurationSlice';

const store = configureStore({
    reducer: {
        balloon: balloonSliceReducer,
        blindfold_showing: blindfoldSliceReducer,
        loadingScreen_showing: loadingScreenSliceReducer,
        config: configurationSliceReducer,
        classCourses: classCoursesSliceReducer,
        sections: sectionSliceReducer,
    }
});

export default store;