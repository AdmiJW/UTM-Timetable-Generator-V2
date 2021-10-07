import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/** 
 * A timeslot object format inside a cart / fetched from CDN. Not to be confused with the one in `setupCoursesSlice.js'
 * @typedef {Object} CartTimeslot
 * @property {number} id ID of the timeslot respective to the Section
 * @property {number} dayOfWeek Integer [0-6]. 0 represents Sunday, 1 represents Monday etc.
 * @property {number} beginTime Integer [0-23]. 0 represents 12AM, 1 represents 1AM etc.
 * @property {number} endTime Integer [0-23]. 0 represents 12AM, 1 represents 1AM etc.
 */

/**
 * A section object format inside a cart / fetched from CDN. Not to be confused with the one in `setupCourseSlice.js`
 * @typedef {Object} CartSection
 * @property {number} id ID of the timeslot respective to the Course
 * @property {string} section A string representing the section, usually something like 01, 02...
 * @property {string} lecturer A string representing the lecturer teaching this section
 * @property {Object.<number, CartTimeslot>} times Object mapping id to {@link CartTimeslot} objects.
 */

/**
 * A course object format inside a cart / fetched from CDN. Not to be confused with the one in `setupCourseSlice.js`
 * @typedef {Object} CartCourse
 * @property {number} id ID of the course
 * @property {string} name A string representing the course name. Eg: Ethics and Civilization
 * @property {string} code A string representing the course code. Eg: SECT 1234
 * @property {boolean} isAnimatingDelete A boolean used for animation purposes only.
 * @property {Object.<number, CartSection>} sections Object mapping id to {@link CartSection} objects.
 */

/**
 * The state of cartSlice. 
 * @typedef {Object.<number, CartCourse>} Cart
 * @property {Object} meta Contains `nextID` to indicate the next ID of cart object added. This ID assigned is independent
 *      of CartCourse.id, as it still may collide across different schools. Also contains `isWindowOpen` to indicate whether
 *      the cart is shown
 */

/**
 * The format that is sent to the setupCoursesReducer when user click enroll in a section from `Courses` page
 * @typedef {Object} CartEnrollingInterface
 * @property {string} name Course name
 * @property {string} code Course code
 * @property {string} section Section Number
 * @property {string} lecturer Section lecturer
 * @property {Object.<number, CartTimeslot>} times An object mapping id to {@link CartTimeslot}, like how it originally was
 */


const SLICE_NAME = 'cart';
const FADE_TIMER = 1000;        // ? Animation fade out duration

//  Async Thunkss
const removeCourseFromCart = createAsyncThunk(
    SLICE_NAME + '/removeCourseFromCart',
    (id)=> new Promise((resolve)=> window.setTimeout(()=> resolve(id), FADE_TIMER))
);



const cartSlice = createSlice({
    name: 'cart',
    /** @type Cart */
    initialState: {
        meta: {
            nextID: 0,
            isWindowOpen: false
        },
    },
    reducers: {
        addCourseToCart: (state, action)=> {
            state[ state.meta.nextID++ ] = Object.assign({ isAnimatingDelete: false }, action.payload );
        },
        openCart: (state)=> {
            state.meta.isWindowOpen = true;
        },
        closeCart: (state)=> {
            state.meta.isWindowOpen = false;
        },
    },
    extraReducers: (builder)=> {
        // Remove Couse from cart
        builder.addCase(removeCourseFromCart.pending, (state, action)=> {
            const id = action.meta.arg;
            state[id].isAnimatingDelete = true;
        });
        builder.addCase(removeCourseFromCart.fulfilled, (state, action)=> {
            const id = action.payload;
            delete state[id];
        });
    },
});


// Export as one object for namespaced access
export const cartActions = {
    ...cartSlice.actions,
    removeCourseFromCart,
};

export default cartSlice.reducer;