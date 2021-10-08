import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/** 
 * A timeslot object format inside a Sections page / fetched from CDN. Not to be confused with the one in `classCoursesSlice.js'
 * @typedef {Object} SectionsTimeslot
 * @property {number} id ID of the timeslot respective to the Section
 * @property {number} dayOfWeek Integer [0-6]. 0 represents Sunday, 1 represents Monday etc.
 * @property {number} beginTime Integer [0-23]. 0 represents 12AM, 1 represents 1AM etc.
 * @property {number} endTime Integer [0-23]. 0 represents 12AM, 1 represents 1AM etc.
 */

/**
 * A section object format inside a Sections / fetched from CDN. Not to be confused with the one in `setupCourseSlice.js`
 * @typedef {Object} SectionsSection
 * @property {number} id ID of the timeslot respective to the Course
 * @property {string} section A string representing the section, usually something like 01, 02...
 * @property {string} lecturer A string representing the lecturer teaching this section
 * @property {Object.<number, SectionsTimeslot>} times Object mapping id to {@link SectionsTimeslot} objects.
 */

/**
 * A course object format inside a Sections / fetched from CDN. Not to be confused with the one in `setupCourseSlice.js`
 * @typedef {Object} SectionsCourse
 * @property {number} id ID of the course
 * @property {string} name A string representing the course name. Eg: Ethics and Civilization
 * @property {string} code A string representing the course code. Eg: SECT 1234
 * @property {boolean} isAnimatingDelete A boolean used for animation purposes only.
 * @property {Object.<number, SectionsSection>} sections Object mapping id to {@link SectionsSection} objects.
 */

/**
 * The state of SectionsSlice. 
 * @typedef {Object.<number, SectionsCourse>} Sections
 * @property {Object} meta Contains `nextID` to indicate the next ID of Sections object added. This ID assigned is independent
 *      of SectionsCourse.id, as it still may collide across different schools.
 */

/**
 * The format that is sent to the setupCoursesReducer when user click enroll in a section from `Courses` page
 * @typedef {Object} SectionsEnrollingInterface
 * @property {string} name Course name
 * @property {string} code Course code
 * @property {string} section Section Number
 * @property {string} lecturer Section lecturer
 * @property {Object.<number, SectionsTimeslot>} times An object mapping id to {@link SectionsTimeslot}, like how it originally was
 */


const SLICE_NAME = 'sections';
const FADE_TIMER = 1000;        // ? Animation fade out duration

//  Async Thunkss
const removeCourseFromSections = createAsyncThunk(
    SLICE_NAME + '/removeCourseFromSections',
    (id)=> new Promise((resolve)=> window.setTimeout(()=> resolve(id), FADE_TIMER))
);



const sectionsSlice = createSlice({
    name: 'sections',
    /** @type {Sections} */
    initialState: {
        meta: {
            nextID: 0
        },
    },
    reducers: {
        addCourseToSections: (state, action)=> {
            state[ state.meta.nextID++ ] = Object.assign({ isAnimatingDelete: false }, action.payload );
        }
    },
    extraReducers: (builder)=> {
        // Remove Couse from sections - Includes animation
        builder.addCase(removeCourseFromSections.pending, (state, action)=> {
            const id = action.meta.arg;
            state[id].isAnimatingDelete = true;
        });
        builder.addCase(removeCourseFromSections.fulfilled, (state, action)=> {
            const id = action.payload;
            delete state[id];
        });
    },
});


// Export as one object for namespaced access
export const sectionsActions = {
    ...sectionsSlice.actions,
    removeCourseFromSections,
};

export default sectionsSlice.reducer;