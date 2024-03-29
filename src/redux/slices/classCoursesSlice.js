
// ? The slice of state that is responsible for every course item inside /classes route.
// ? The state will be an Object of courses. This allow easy access if we have a lot of courses with id as key.
// ? Javascript object keeps keys in order: If key is number, then it is guaranteed order. If string, then it is insertion order
// ? Due to this reason, ensure the id is always increasing


/**
 * A single Timeslot object
 * @typedef {Object} Timeslot
 * @property {number} id ID number for said timeslot in respective course
 * @property {number} dayOfWeek Integer in range [0-6]. 0 represents Sunday, 1 represents Monday and so on. Think chinese (1 - 星期一)
 * @property {number} startTime Integer in range [0-23]. 24 hour format. Indicates beginning time for this timeslot
 * @property {number} endTime Integer in range [0-23]. 24 hour format. Indicates ending time for this timeslot. Should always be later than `startTime`
 * @property {string} venue Where the class is held. Optional
 * @property {boolean} isAnimatingDelete Boolean, used to provide deletion animation
 */

/**
 * Timeslot list. Contains `nextID` key and other integer keys mapping to {@link Timeslot}.
 * @typedef TimeslotList
 * @type {Object.<number, Timeslot>}
 */

/**
 * A single Course object
 * @typedef {Object} Course
 * @property {number} id ID number for said course
 * @property {string} courseName A string representing the course's name
 * @property {string} lecturerName A string representing the lecturer's name for this course
 * @property {string} courseCode A string representing the course's code
 * @property {string} isAnimatingDelete Boolean, used to provide deletion animation
 * @property {TimeslotList} timeslots An object containing mappings from `id` (number) to {@link Timeslot} objects. 
 *      Contains unique key `nextID` which maps to a number.
 */

/**
 * classCoursesSlice State structure
 * @typedef ClassCoursesSliceState
 * @type {Object.<number, Course>}
 */

// ?? For example, see `initialState` below. Remember any changes shall be carefully done


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setTypeAndMessage, showBalloon } from './balloonSlice';
import { scrollMainContainerTo } from "../../logic/utils";



const sliceName = 'classCourses';
const fadeOutTime = 500;                // !! IF YOU CHANGE THIS, THE CSS VALUE FOR ANIMATION DURATION MAY ALSO NEED TO CHANGE
                                        // !! REFER TO FADEOUT TIME IN CSS ANIMATIONS (INSIDE _courseItem.scss)

//=======================================================================
// Default state that the user will see when first use this application
//=======================================================================
const initialState = {
    nextID: 0,
};


//=======================================================================
// Some utilities
//=======================================================================
const generateEmptyCourse = (id)=> {
    return {
        id,
        courseName: 'Course Name Here',
        lecturerName: 'Lecturer Name Here',
        courseCode: 'Course Code Here',
        isAnimatingDelete: false,
        timeslots: {
            nextID: 0
        }
    }
}

const generateEmptyTimeslot = (id)=> {
    return {
        id,
        dayOfWeek: 0,
        startTime: 8,
        endTime: 9,
        venue: '',
        isAnimatingDelete: false
    }
}

/**
 * @typedef {import('./sectionsSlice').SectionsEnrollingInterface} SectionsEnrollingInterface
 */
/**
 * Adapter pattern. Will convert from {@link SectionsEnrollingInterface} into {@link Course} which can be 
 * directly inserted into the state.
 * 
 * @param {SectionsEnrollingInterface} sectionEnrollObject The object sent from the Sections when user clicks the enroll button on
 *      a section
 * @param {number} nextCourseID The ID number to be set on `{@link Course}.id`. Usually retrieved from `classCoursesSlice`'s state
 * @returns {Course} The converted course object ready to be inserted into state
 */
function adapterFromSectionEnrollingInterfaceToClassCourseObject(sectionEnrollObject, nextCourseID) {
    const course = generateEmptyCourse(nextCourseID);
    course.courseName = sectionEnrollObject.name;
    course.lecturerName = sectionEnrollObject.lecturer;
    course.courseCode = sectionEnrollObject.code + " - Section " + sectionEnrollObject.section;
    
    for (let key in sectionEnrollObject.times) {
        const sectiontime = sectionEnrollObject.times[key];
        const timeID = course.timeslots.nextID++;
        const time = generateEmptyTimeslot( timeID );

        time.dayOfWeek = sectiontime.dayOfWeek;
        time.startTime = sectiontime.beginTime;
        time.endTime = sectiontime.endTime;
        time.venue = sectiontime.venue || '';
        // Insert into Course.
        course.timeslots[ timeID ] = time;
    }
    return course;
}



//===========================
// Async Reducers
//===========================
const deleteCourse = createAsyncThunk(
    sliceName + '/deleteCourse',
    (id)=> new Promise((resolve)=> window.setTimeout(()=> resolve(id), fadeOutTime))
);

const deleteTimeslot = createAsyncThunk(
    sliceName + '/deleteTimeslot',
    (arg)=> new Promise((resolve)=> window.setTimeout(()=> resolve(arg), fadeOutTime))
);

// Not really async process, but I want to use dispatch to show balloons
const saveCoursesToLocalStorage = createAsyncThunk(
    sliceName + '/saveCoursesToLocalStorage',
    async (arg, thunkAPI)=> {
        try {
            window.localStorage.setItem('app-version', process.env.REACT_APP_VERSION_NUMBER );
            window.localStorage.setItem('saved-state', JSON.stringify( thunkAPI.getState().classCourses ) );
            thunkAPI.dispatch( setTypeAndMessage({ type: 'success', message: 'Successfully saved courses into local storage!'} ));
            thunkAPI.dispatch( showBalloon() );
        } catch (err) {
            thunkAPI.dispatch( setTypeAndMessage({ type: 'danger', message: 'Failed to save courses into local storage. See console for more info!'} ));
            thunkAPI.dispatch( showBalloon() );
            console.error(err);
        }
    }
);

const loadCoursesFromLocalStorage = createAsyncThunk(
    sliceName + '/loadCoursesFromLocalStorage',
    async (arg, thunkAPI)=> {
        try {
            if (!window.localStorage.getItem('saved-state')) throw new Error('not-found');

            // * APPLICATION VERSION MISMATCH. SO FAR ONLY WARNING
            if (window.localStorage.getItem('app-version') !== process.env.REACT_APP_VERSION_NUMBER )
                console.warn('The saved data in local storage has different application version number' + 
                             ' than the current application version')
            
            const res = JSON.parse( localStorage.getItem('saved-state') );
            thunkAPI.dispatch( setTypeAndMessage({ type: 'success', message: 'Successfully loaded courses from local storage!'} ));
            thunkAPI.dispatch( showBalloon() );
            return res;
        } catch (err) {
            if (err.message === 'not-found') {
                thunkAPI.dispatch( setTypeAndMessage({ type: 'warning', message: 'No previous save data found in local storage.'}))
                thunkAPI.dispatch( showBalloon() );
            } 
            else {
                thunkAPI.dispatch( setTypeAndMessage({ type: 'danger', message: 'Failed to load courses from local storage. See console for more info!'} ));
                thunkAPI.dispatch( showBalloon() );
                console.error(err);
            }
        }
    }
);




//=============================
// Sync Reducers - (Non thunk)
//=============================
const reducers = {
    //=========================
    // Course + Meta Info
    //=========================
    addBlankCourse: (state)=> {
        const id = state.nextID++;
        state[id] = generateEmptyCourse(id);
        scrollMainContainerTo();
    },
    addCourseFromSections: (state, action)=> {
        /** @type {SectionsEnrollingInterface} */
        const sectionEnrollment = action.payload;
        const nextID = state.nextID++;
        const convertedCourse = adapterFromSectionEnrollingInterfaceToClassCourseObject(sectionEnrollment, nextID);
        state[nextID] = convertedCourse;
    },
    changeCourseName: (state, action)=> {
        const { id, newCourseName } = action.payload;
        state[id].courseName = newCourseName;
    },
    changeLecturerName: (state, action)=> {
        const { id, newLecturerName } = action.payload;
        state[id].lecturerName = newLecturerName;
    },
    changeCourseCode: (state, action)=> {
        const { id, newCourseCode } = action.payload;
        state[id].courseCode = newCourseCode;
    },
    //=========================
    // Timeslot
    //=========================
    addTimeslot: (state, action)=> {
        const courseID = action.payload;
        const newTimeslotID = state[courseID].timeslots.nextID++;
        state[courseID].timeslots[newTimeslotID] = generateEmptyTimeslot(newTimeslotID);
    },
    changeTimeslotDayOfWeek: (state, action)=> {
        const { courseID, timeslotID, dayOfWeek } = action.payload;
        state[courseID].timeslots[timeslotID].dayOfWeek = Number(dayOfWeek);
    },
    changeTimeslotStartTime: (state, action)=> {
        const { courseID, timeslotID, startTime } = action.payload;
        state[courseID].timeslots[timeslotID].startTime = Number(startTime);
        // Adjust so that endtime doesn't go before starttime!
        state[courseID].timeslots[timeslotID].endTime = Math.max( Number(startTime)+1, 
                                                                  state[courseID].timeslots[timeslotID].endTime );
    },
    changeTimeslotEndTime: (state, action)=> {
        const { courseID, timeslotID, endTime } = action.payload;
        state[courseID].timeslots[timeslotID].endTime = Number(endTime);
    },
    changeTimeslotVenue: (state, action)=> {
        const { courseID, timeslotID, venue } = action.payload;
        state[courseID].timeslots[timeslotID].venue = venue;
    },
}




//===============================================
// Creation of slice + Adding in Async Thunks
//===============================================
export const classCoursesSlice = createSlice({
    name: 'classCourses',
    initialState,
    reducers,
    extraReducers: (builder)=> {
        // Delete Course
        // In pending state, the ID of course passed in is in action.meta.arg
        builder.addCase( deleteCourse.pending, (state, action)=> {
            const id = action.meta.arg;
            state[id].isAnimatingDelete = true;
        });
        builder.addCase( deleteCourse.fulfilled, (state, action)=> {
            const id = action.payload;
            delete state[id];
        });
        builder.addCase( deleteTimeslot.pending, (state, action)=> {
            const { courseID, timeslotID } = action.meta.arg;
            state[courseID].timeslots[timeslotID].isAnimatingDelete = true;
        });
        builder.addCase( deleteTimeslot.fulfilled, (state, action)=> {
            const { courseID, timeslotID } = action.payload;
            delete state[courseID].timeslots[timeslotID];
        });
        builder.addCase( loadCoursesFromLocalStorage.fulfilled, (state, action)=> {
            const loadedState = action.payload;
            return loadedState;
        });
    }
});


// Export one large action object to be namespaced
export const classActions = { 
    ...classCoursesSlice.actions,
    deleteCourse,
    deleteTimeslot,
    saveCoursesToLocalStorage,
    loadCoursesFromLocalStorage
};
export default classCoursesSlice.reducer;