/**
 * @typedef {import('../../redux/slices/configurationSlice').CustomConfig} CustomConfig
 * @typedef {import('../../redux/slices/classCoursesSlice').ClassCoursesSliceState} ClassCoursesSliceState
 * @typedef {import('./themeMapper').Theme} Theme
 * @typedef {import('./reduceCoursesToTimeslotProperties').TimeslotProperty} TimeslotProperty
 */



/** Step 1 executor - Map theme to {@link Theme} */ 
import { mapToTheme } from './themeMapper'; 
/** Step 2 executor - Reduce timeslots into {@link TimeslotProperty} */ 
import { reduceCoursesToTimeslotArray } from './reduceCoursesToTimeslotProperties';
/** Step 3 executor - Initialize the Konva.Stage to draw in */
import { initializeStage } from './initializeStage';
/** Step 4 executor - Get layer with background color, evenrow and oddrows drawn */
import { getBackgroundLayer } from './getBackgroundLayer';
/** Step 5 executor - Get layer with time grid and label grid */
import { getLabelAndTimeLayer } from './getLabelAndTimeLayer';
/** Step 6 executor - Get layer with courses grid drawn */
import { getCoursesLayer } from './getCoursesLayer';
/** Step 7 executor - Get DataURL from canvas with only visible portion */
import { dataURLExtractor } from './dataURLExtractor';



// 
/**
 * This is the main function called when user clicks the 'Create' button.
 * The process of creating timetable is broken down into a series of steps
 * 
 * @param {HTMLImageElement} img The image HTML element to contain the timetable 
 * @param {ClassCoursesSliceState} courses The classCourses state straight from redux state. 
 * @param {Object} config The config state straight from redux state.
 */
export function drawTimetable(img, courses, config) {
    
    // We won't actually draw out the canvas. Instead, draw it virtually first
    const fakeDiv = document.createElement('div');

    /** ==================================================================================================================
    * Step 1 - Obtaining {@link Theme} object that contains information on how the timetable should be styled based on the
    *            config's theme property
    ================================================================================================================== */
    const theme = mapToTheme(config);

    /** ==================================================================================================================
    * Step 2 - Reduce the courses into an array of {@link TimeslotProperty} objects that can be iterated when drawing the timetable
    ================================================================================================================== */
    const timeslots = reduceCoursesToTimeslotArray(courses, theme);

    /** ==================================================================================================================
    * Step 3 - Initalize the {@link Konva.Stage} to draw timetable on. The stage size will initialize based on orientation
    * and other properties. Pass in the `config` object. The stage will always be 24x8 or 8x24 grids (Every hour in a week)
    ================================================================================================================== */
    const stage = initializeStage(fakeDiv, config);

    /** ==================================================================================================================
    * Step 4 - Draw the background and even / odd rows of the timetable. Obtain the Konva.Layer and add to stage.
    ================================================================================================================== */
    stage.add( getBackgroundLayer(config, theme) );

    /** ==================================================================================================================
    * Step 5 - Draw the time grid and label grid. Obtain the Konva.Layer and add to stage.
    ================================================================================================================== */
    stage.add( getLabelAndTimeLayer(config, theme) );

    /** ==================================================================================================================
    * Step 6 - Draw the courses. Obtain the Konva layer and add to stage
    ================================================================================================================== */
    stage.add( getCoursesLayer(config, theme, timeslots) );

    const dataURL = dataURLExtractor(stage, config);
    img.src = dataURL;
}