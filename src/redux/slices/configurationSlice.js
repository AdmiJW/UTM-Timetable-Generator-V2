import { createSlice } from '@reduxjs/toolkit';
import FontFaceObserver from 'fontfaceobserver';


/**
 * @typedef {Object} CustomCourseColors
 * @property {string} id
 * @property {string} name Course name
 * @property {string} fontColor Font color for this course
 * @property {string} backgroundColor Background color for this course
 */

/**
 * The custom configuration object.
 * @typedef {Object} CustomConfig
 * @property {boolean} isCustom Boolean, indicates whether the user chooses custom theme or not. Decides whether <CustomConfiguration /> is shown
 *      or not
 * @property {string} backgroundColor Base color of the timetable
 * @property {string} fontFamily Font name to be used in the timetable
 * @property {string} labelGridColor The background color for the topleft most grid - Label grid
 * @property {string} labelGridFontColor The font color for the topleft most grid - Label grid
 * @property {string} timeGridColor The background color for the day of week and time grids
 * @property {string} timeGridFontColor The font color for the day of week and time grids
 * @property {string} evenRowColor The background color for every even rows
 * @property {string} oddRowColor The background color for every odd rows
 * @property {Object.<number, CustomCourseColors>} courseColors An object mapping id of courses to {@link CustomCourseColors}
 *      deciding what color they'll be drawn.
 * @property {{ fontColor: string, backgroundColor: string }} defaultCustomCourseColors An object containing default 
 *      background color / font color to use if the course is not in `courseColors`
 */


// Properties
const defaultCustomCourseColors = {
    fontColor: "#ffffff",
    backgroundColor: "#3498db"
};


// ! Fonts are added in `main.scss`
// List of allowed font families. Will be shown as possible options in dropdown list
// during configuration
export const allowedFontFamilies = [
    "Roboto",
    "Orbitron",
    "Grandstander",
    "Marvel",
    "Cantora One",
];

// ? Loads in the webfonts - Initially the font are not loaded, until it is used in HTML
// ? DOM elements will update automatically once loaded, but not for canvas.
allowedFontFamilies.forEach((font)=> {
    (new FontFaceObserver(font)).load().then(()=> {
        console.log(`Loaded webfont ${font}`);
    }).catch((err)=> {
        console.log(`Failed loading webfont ${font}`);
    });
})




// Slice
export const configurationSlice = createSlice({
    name: 'config',
    initialState: {
        general: {
            theme: 'default',
            orientation: 'horizontal',
            weekends: 'fri/sat',
            timeframeBegin: 8,
            timeframeEnd: 17,
        },
        grid: {
            gridWidth: 200,
            gridHeight: 150,
            gap: 5,
            courseNameFontSize: 25,
            lecturerNameFontSize: 15,
            courseCodeFontSize: 13,
        },
        custom: {
            isCustom: false,
            backgroundColor: '#ffffff',
            fontFamily: 'Roboto',
            labelGridColor: '#7f8082',
            labelGridFontColor: "#ffffff", 
            timeGridColor: '#70ad46',
            timeGridFontColor: "#ffffff",
            evenRowColor: '#c6e0b3',
            oddRowColor: '#a9d08f',
            courseColors: {},
            // The default Custom Course Color used if not set
            defaultCustomCourseColors,
        },
    },
    reducers: {
        // General Config
        setTheme: (state, action)=> {
            state.general.theme = action.payload;
            state.custom.isCustom = (action.payload === 'custom');
        },
        setOrientation: (state, action)=> {
            state.general.orientation = action.payload;
        },
        setWeekends: (state, action)=> {
            state.general.weekends = action.payload;
        },
        setTimeframeBegin: (state, action)=> {
            state.general.timeframeBegin = Number(action.payload);
            state.general.timeframeEnd = Math.max( Number(action.payload) + 1, state.general.timeframeEnd );
        },
        setTimeframeEnd: (state, action)=> {
            state.general.timeframeEnd = Number(action.payload);
        },
        
        // Grid Config
        setGridWidth: (state, action)=> {
            state.grid.gridWidth = Math.max(0, Number(action.payload) );
        },
        setGridHeight: (state, action)=> {
            state.grid.gridHeight = Math.max(0, Number(action.payload) );
        },
        setGap: (state, action)=> {
            state.grid.gap = Math.max(0, Number(action.payload) );
        },
        setCourseNameFontSize: (state, action)=> {
            state.grid.courseNameFontSize = Math.max(0, Number(action.payload) );
        },
        setLecturerNameFontSize: (state, action)=> {
            state.grid.lecturerNameFontSize = Math.max(0, Number(action.payload) );
        },
        setCourseCodeFontSize: (state, action)=> {
            state.grid.courseCodeFontSize = Math.max(0, Number(action.payload) );
        },

        // Custom Configuration
        // action.payload contains an object with the properties to change - AKA will overwrite properties while keeping
        // others unchanged
        modifyCustomConfiguration: (state, action)=> {
            state.custom = Object.assign({}, state.custom, action.payload);
        },
        // Modifying `courseColors` with `modifyCustomConfiguration` above is too messy, use these instead 
        changeCourseBackgroundColor: (state, action)=> {
            const {id, color} = action.payload;
            if (!state.custom.courseColors[id]) return;
            state.custom.courseColors[id].backgroundColor = color;
        },
        changeCourseFontColor: (state, action)=> {
            const {id, color} = action.payload;
            if (!state.custom.courseColors[id]) return;
            state.custom.courseColors[id].fontColor = color;
        },
    },
});

export const configurationActions = { 
    ...configurationSlice.actions,  
};

export default configurationSlice.reducer;