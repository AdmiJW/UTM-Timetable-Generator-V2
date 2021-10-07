// ?=====================================================
// ? Utility functions that are used in multiple places
// ?=====================================================



const _dayOfWeekFullNames = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
const _dayOfWeekShortNames = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];



function getDayOfWeekName(dayOfWeek, isFullForm = true) {
    return isFullForm? _dayOfWeekFullNames[dayOfWeek]: _dayOfWeekShortNames[dayOfWeek];
}


function getTimeString(time, is12HourFormat = true) {
    if (!is12HourFormat) return `${time.padStart(2, '0')}:00`;

    const mod = time % 12;
    const div = time / 12;
    return `${ mod === 0? '12': mod } ${ div >= 1? ':00PM': ':00AM'}`;
}

function getTimeCode(time) {
    if (time < 7 ) return '-';
    return `${time - 6}`.padStart(2, '0');
}


/**
 * Controls the scrolling inside of the '.main--scrollable-wrapper' container.
 * @param {?string} selectorOfDivInMainContainer The query selector for the div inside of the container to scroll to (top).
 *      If left null, then scroll to the bottom of the container.
 */
const scrollMainContainerTo = (selectorOfDivInMainContainer = null)=> {
    const div = document.querySelector('.main--scrollable-wrapper');
    // Set some timeout so that the document has time to render new course
    window.setTimeout(()=> {
        if (!selectorOfDivInMainContainer)
            div.scrollTop = div.scrollHeight;
        else {
            const ref = document.querySelector(selectorOfDivInMainContainer);
            div.scrollTop = ref.offsetTop;
        }
    }, 100);
}




export { getDayOfWeekName, getTimeString, getTimeCode, scrollMainContainerTo }