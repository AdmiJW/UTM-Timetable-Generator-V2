/**
 * @typedef {import('../../redux/slices/setupCoursesSlice').SetupCoursesSliceState} SetupCoursesSliceState
 * @typedef {import('../../redux/slices/configurationSlice').CustomConfig} CustomConfig
 * @typedef {import('./themeMapper').Theme} Theme
 */



/**
 * @typedef {Object} TimeslotProperty
 * @property {string} name Course name
 * @property {string} lecturer Lecturer name
 * @property {string} code Course code
 * @property {number} dayOfWeek Day of week - Integer [0-6]
 * @property {number} startTime Starting time - Integer [0-23] 
 * @property {number} endTime Ending time - Integer [0-23]
 * @property {string} theme The name of theme applied
 * @property {string} backgroundColor Background color of the grid of said timeslot
 * @property {string} fontColor Font color of the grid of said timeslot
 */


/**
 * @param {SetupCoursesSliceState} courses The courses straight from the redux state.
 * @param {(Theme | CustomConfig)} theme The {@link Theme} or {@link CustomConfig} object returned from 
 *      `mapToTheme` function (Step 1). Used to deduce the rendering information in the courses
 *      (IE: Background color and font color)
 * @returns {TimeslotProperty[]} An array of {@link TimeslotProperty} ready to be pass into the timeslot drawer
 */
export function reduceCoursesToTimeslotArray(courses, theme) {
    if (theme.isCustom)
        return customReduceCourseToTimeslotArrayStrategy(courses, theme);
    return presetReduceCourseToTimeslotArrayStrategy(courses, theme);
}



/**
 * Strategy pattern 1 - Custom Theme - To get background color and font color straight from `theme` 
 * which is {@link CustomConfig} itself.
 * 
 * @param {SetupCoursesSliceState} courses 
 * @param {CustomConfig} customConfig 
 * @returns {TimeslotProperty[]} An array of {@link TimeslotProperty} ready to be pass into the timeslot drawer
 */
function customReduceCourseToTimeslotArrayStrategy(courses, customConfig) {
    /** @type {TimeslotProperty[]} */
    const res = [];

    // Nest iteration to obtain every timeslot object
    for (let courseKey in courses) {
        if (isNaN(courseKey)) continue;
        const course = courses[courseKey];
        const { id, courseName, lecturerName, courseCode } = course;

        // * Obtains the course's custom set background color and font color from customConfig.courseColors
        // * If the said id is not found from customConfig (Which shouldn't even happen, fallback to defaultCustomCourseColors)
        const { fontColor, backgroundColor } = customConfig.courseColors[id] || customConfig.defaultCustomCourseColors;
        
        for (let timeKey in course.timeslots) {
            if (isNaN(timeKey)) continue;
            const time = course.timeslots[timeKey];
            const { dayOfWeek, startTime, endTime } = time;

            res.push({
                name: courseName,
                lecturer: lecturerName,
                code: courseCode,
                dayOfWeek,
                startTime,
                endTime,
                theme: 'custom',
                backgroundColor,
                fontColor,
            });
        }
    }
    return res;
}



/**
 * Strategy pattern 2 - Preset Theme - To get background color and font color from
 * {@link Theme}'s `courseBackgroundColors` and `courseFontColors` array. Involves counting
 * 
 * 
 * @param {SetupCoursesSliceState} courses 
 * @param {Theme} theme 
 * @returns {TimeslotProperty[]} An array of {@link TimeslotProperty} ready to be pass into the timeslot drawer
 */
function presetReduceCourseToTimeslotArrayStrategy(courses, theme) {
    /** @type {TimeslotProperty[]} */
    const res = [];
    // Counts the timeslot
    let counter = 0;        
    const { theme: themeName, courseBackgroundColors, courseFontColors } = theme;

    // Nest iteration to obtain every timeslot object
    for (let courseKey in courses) {
        if (isNaN(courseKey)) continue;
        const course = courses[courseKey];
        const { courseName, lecturerName, courseCode } = course;

        for (let timeKey in course.timeslots) {
            if (isNaN(timeKey)) continue;
            const time = course.timeslots[timeKey];
            const { dayOfWeek, startTime, endTime } = time;

            res.push({
                name: courseName,
                lecturer: lecturerName,
                code: courseCode,
                dayOfWeek,
                startTime,
                endTime,
                theme: themeName,
                backgroundColor: courseBackgroundColors[ counter % courseBackgroundColors.length ], 
                fontColor: courseFontColors[ counter % courseFontColors.length ],
            });
        }
        ++counter;  // Don't forget to update counter.
    }
    return res;
}