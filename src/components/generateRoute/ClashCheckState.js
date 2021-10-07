import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';

/**
 * @typedef {import('../../logic/timetable_clash_checker').ClashReport} ClashReport
 */

// Logic
import { checkClash } from '../../logic/timetable_clash_checker';
import { getDayOfWeekName, getTimeString, scrollMainContainerTo } from '../../logic/utils';






/**
 * Outputs a div that displays the result of clash check nicely.
 * @param {?ClashReport} clashCheckResult Result of clash checking.
 */
function getOutputDisplay(clashCheckResult) {
    if (clashCheckResult === null) return null;
    if (!clashCheckResult.isClashing)
        return (
        <div className='clashcheck__output'>
            <strong className='clashcheck__output__title'>✅ No Clash Found ✅</strong>
        </div>
        );

    const [ course1, course2 ] = clashCheckResult.clashDetails;

    return (
    <div className='clashcheck__output'>
        <strong className='clashcheck__output__title'>⛔️ Clash Detected ⛔️</strong>
        <div className='clashcheck__output__detail'>
            Clash occur between
            <strong className='clashcheck__output__detail--info'>
                {`"${course1.courseName}" on ${getDayOfWeekName(course1.dayOfWeek)}`}
            </strong>
            and
            <strong className='clashcheck__output__detail--info'>
                {`"${course2.courseName}" on ${getDayOfWeekName(course2.dayOfWeek)}`}
            </strong>
            at
            <strong className='clashcheck__output__detail--info'>
                { `${getTimeString(course1.time)} - ${getTimeString(course1.time + 1)}` }
            </strong>
        </div>
    </div>
    );
}


// Performs checking whether there is a clash in the timetable. Shows balloon messages, or set state to 1 - Scrolling to
// Configure state.
function performClashCheck( courses, setClashCheckResult, setState, dispatch ) {
    const res = checkClash( courses );
    setClashCheckResult(res);
    if (!res.isClashing) {
        setState(1);
        scrollMainContainerTo('.configure');
    }
    else {
        dispatch(setTypeAndMessage({ type:'danger', message: 'There is a clash in your timetable. Go back to Setup page to fix the clash.'} ));
        dispatch(showBalloon());
    }
}


// ? Step 1 - Check if there is any clashes in the timetable.
// ? If there is, then display nicely to inform the user.
function ClashCheckState(props) {
    const setupCourses = useSelector((state)=> state.setupCourses);
    const { setState } = props;
    const [clashCheckResult, setClashCheckResult] = useState(null);
    const dispatch = useDispatch();

    return (
    <section className='generate__section clashcheck'>
        <h4 className='generate__title'>Step 1: Clash Check 💣</h4>
        <p className='generate__desc'>Check your timetable for any clashes</p>

        <button className='clashcheck__btn' type='button' aria-label='Trigger check the timetable for clashes'
            label='Trigger check the timetable for clashes' disabled={clashCheckResult !== null}
            onClick={ ()=> performClashCheck(setupCourses, setClashCheckResult, setState, dispatch) } >
                Check Clash
        </button>

        { getOutputDisplay(clashCheckResult) }
    </section>
    );
}

export default ClashCheckState;