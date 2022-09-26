/**
 * @typedef {import('./themeMapper').Theme} Theme
 * @typedef {import('./reduceCoursesToTimeslotProperties').TimeslotProperty} TimeslotProperty
 */

import Konva from 'konva';
import { appendRect, appendText } from './KonvaUtils';


/**
 * @param {Object} config The config object from the `configurationSlice.js`, used to deduce information like
 *      `gridWidth`, `gap` etc
 * @param {Theme} theme Theme object to deduce information on font family to use
 * @param {TimeslotProperty[]} timeslots Array of {@link TimeslotProperty} returned from step 2
 */
export function getCoursesLayer(config, theme, timeslots) {
    const { orientation } = config.general;
    if (orientation === 'horizontal')
        return horizontalGetCoursesLayer(config, theme, timeslots);
    return verticalGetCoursesLayer(config, theme, timeslots);
}


/**
 * @param {Object} config The config object from the `configurationSlice.js`, used to deduce information like
 *      `gridWidth`, `gap` etc
 * @param {Theme} theme Theme object to deduce information on font family to use
 * @param {TimeslotProperty[]} timeslots Array of {@link TimeslotProperty} returned from step 2
 */
function horizontalGetCoursesLayer(config, theme, timeslots) {
    const layer = new Konva.Layer();
    const { gridWidth, gridHeight, gap } = config.grid;

    for (let timeslot of timeslots) {
        const { dayOfWeek, startTime, endTime } = timeslot;
        const y = gap + (dayOfWeek + 1) * (gap + gridHeight);
        const x = gap + (startTime + 1) * (gap + gridWidth);
        const width = (endTime - startTime) * (gridWidth + gap) - gap;
        appendCourse(layer, timeslot, theme, config, x, y, width, gridHeight);
    }
    return layer;
}




/**
 * @param {Object} config The config object from the `configurationSlice.js`, used to deduce information like
 *      `gridWidth`, `gap` etc
 * @param {Theme} theme Theme object to deduce information on font family to use
 * @param {TimeslotProperty[]} timeslots Array of {@link TimeslotProperty} returned from step 2
 */
function verticalGetCoursesLayer(config, theme, timeslots) {
    const layer = new Konva.Layer();
    const { gridWidth, gridHeight, gap } = config.grid;

    for (let timeslot of timeslots) {
        const { dayOfWeek, startTime, endTime } = timeslot;
        const x = gap + (dayOfWeek + 1) * (gap + gridWidth);
        const y = gap + (startTime + 1) * (gap + gridHeight);
        const height = (endTime - startTime) * (gridHeight + gap) - gap;
        appendCourse(layer, timeslot, theme, config, x, y, gridWidth, height);
    }
    return layer;
}


/**
 * Draws a timeslot on the provided layer.
 * ! Here, the courseName:lecturerName:courseCode ratio is 60:20:20
 * ! If the lecturer name is absent, then the ratio goes to 75:25
 * ! The same goes if 
 * 
 * @param {Konva.Layer} layer Layer to draw course on
 * @param {TimeslotProperty} property The {@link TimeslotProperty} that contains information how to draw the course
 * @param {Theme} theme Theme object to deduce information on font family to use
 * @param {Object} config Config object from `configurationSlice.js`. Grid width, course font sizes etc obtainedd from it.
 * @param {number} x X offset to draw on the layer
 * @param {number} y Y offset to draw on layer
 * @param {number} width width of the grid
 * @param {number} height height of the grid
 */
function appendCourse(layer, property, theme, config, x, y, width, height) {
    const ratio = 
        (property.lecturer && property.code)? [0.6, 0.2, 0.2]:
        (property.lecturer)? [0.75, 0.25, 0]:
        (property.code)? [0.8, 0, 0.2]:
        [1, 0, 0];

    const { courseNameFontSize, lecturerNameFontSize, courseCodeFontSize, venueFontSize } = config.grid;

    
    // If venue is present, it will take from name's height
    const nameHeight = height * (ratio[0] - (property.venue? 0.15: 0) );
    const venueHeight = height * (property.venue? 0.15: 0);
    const lecturerHeight = height * ratio[1];
    const codeHeight = height * ratio[2];

    // Background
    appendRect(layer, {
        x, y, width, height,
        fill: property.backgroundColor
    });

    // Course name
    appendText(layer, {
        x, y,
        width,
        height: nameHeight,
        fill: property.fontColor,
        fontFamily: theme.fontFamily,
        fontSize: courseNameFontSize,
        text: property.name,
        fontStyle: 'bold',
    });

    // Venue
    appendText(layer, {
        x, 
        y: y + nameHeight,
        width,
        height: venueHeight,
        fill: property.fontColor,
        fontFamily: theme.fontFamily,
        fontSize: venueFontSize,
        text: property.venue,
        fontStyle: 'bold',
    });

    // Lecturer name
    appendText(layer, {
        x, 
        y: y + nameHeight + venueHeight,
        width,
        height: lecturerHeight,
        fill: property.fontColor,
        fontFamily: theme.fontFamily,
        fontSize: lecturerNameFontSize,
        text: property.lecturer
    });

    // Course code
    appendText(layer, {
        x, 
        y: y + nameHeight + venueHeight + lecturerHeight,
        width,
        height: codeHeight,
        fill: property.fontColor,
        fontFamily: theme.fontFamily,
        fontSize: courseCodeFontSize,
        text: property.code,
    });
}