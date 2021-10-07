// ?? Logic used to check whether a clash occurred or not.
// ?? Pass in the timetable in the form same as in the state of setupCoursesSlice.js


/**
 * @typedef {import('../redux/slices/setupCoursesSlice').SetupCoursesSliceState} SetupCoursesSliceState
 */


/**
 * @typedef {Object} TimeslotReserver
 * A 'reserver' used to reserve a 1-hour timeframe in the virtual timetable when checking for clashes
 * 
 * @property {string} courseName The name of the course reserving this slot
 * @property {number} dayOfWeek Integer in range [0-6]. 0 is Sunday, 1 is Monday etc.
 * @property {number} time Integer in range [0-23]. Correspond to 24 hour format. The beginning time in which this course reserves
 */

/**
 * @typedef {Object} ClashReport
 * An object reporting whether clash had occurred in the timetable.
 * 
 * @property {boolean} isClashing Boolean. `true` if a clash had occurred. Detail of clash goes into `clashDetails`
 * @property {?TimeslotReserver[]} clashDetails If clashing occurred, this is an array of size 2 containing {@link TimeslotReserver}
 *      which is the 2 courses that clash against each other.
 */



/**
 * Checks whether the timetable has clashing courses
 * @param {SetupCoursesSliceState} setupCourses Redux state as defined in `src/components/redux/slices/setupCoursesSlice.js`. See {@link SetupCoursesSliceState}
 * @return {ClashReport} An object containing a boolean `isClashing`. If `true`, also contains `clashedCourses` which is an array
 *                  containing details of first clashing course detected.
 */
function checkClash(setupCourses) {
    // Step 1 - Initialize an 2D array of size 7 x 23. Rows represent dayOfWeek, Cols represent 1 hour timeframe.
    // First row is Sunday, Second is Monday...
    // First column is 00:00 to 01:00, second column is 01:00 to 02:00...
    let timetable = new Array(7).fill(null);
    timetable = timetable.map(()=> new Array(23).fill(null));

    // Step 2 - Iterate through the courses and fill in timetable.
    // If clash occurs, already can return the result
    for (let coursekey in setupCourses) {
        if (coursekey === 'nextID') continue;
        const course = setupCourses[coursekey];
        
        for (let timekey in course.timeslots) {
            if (timekey === 'nextID') continue;
            const timeslot = course.timeslots[timekey];

            for (let time = timeslot.startTime; time < timeslot.endTime; ++time) {

                // Construct a timeslotInfo object
                /** @type TimeslotReserver */
                const timeslotReserver = {
                    courseName: course.courseName,
                    dayOfWeek: timeslot.dayOfWeek,
                    time
                };

                // If the timetable slot is already occupied, report clash immediately
                if ( timetable[timeslot.dayOfWeek][time] )
                    return {
                        isClashing: true,
                        clashDetails: [timeslotReserver, timetable[timeslot.dayOfWeek][time] ]
                    };
                // Otherwise we can reserve this slot in timetable
                timetable[timeslot.dayOfWeek][time] = timeslotReserver;
            }
        }
    }

    // So far no problemo. Report no clashes
    return { isClashing: false, clashDetails: null };
}


export { checkClash };