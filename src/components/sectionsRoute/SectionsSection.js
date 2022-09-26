import { useDispatch } from 'react-redux';

import { showBalloon, setTypeAndMessage } from '../../redux/slices/balloonSlice';
import { classActions } from '../../redux/slices/classCoursesSlice';

import { getDayOfWeekName, getTimeString } from '../../logic/utils';

/**
 * @typedef {import('../../redux/slices/sectionsSlice').SectionsSection } SectionsSection
 * @typedef {import('../../redux/slices/sectionsSlice').SectionsEnrollingInterface } SectionsEnrollingInterface
 */



/**
 * 
 * @param {*} dispatch 
 * @param {*} name 
 * @param {*} code 
 * @param {SectionsSection} section 
 */
function enrollCourseSection(dispatch, name, code, section) {
    /** @type {SectionsEnrollingInterface} */
    const sectionEnrollment = {
        name, 
        code,
        section: section.section,
        lecturer: section.lecturer,
        times: section.times,
    }
    dispatch( classActions.addCourseFromSections(sectionEnrollment) );
    dispatch(setTypeAndMessage({ type: 'success', message: `Added ${code} - Section ${section.section} to Classes 3️⃣!`}));
    dispatch(showBalloon());
}



function SectionsSection(props) {
    const { name, code } = props;
    /** @type {SectionsSection} */
    const section = props.section;
    const dispatch = useDispatch();


    // List of class times
    const timeListJSX = [];
    for (let key in section.times) {
        const time = section.times[key];
        timeListJSX.push(
            <li key={key} className='sectionstime'>
                👉 <strong>{ getDayOfWeekName(time.dayOfWeek, false)}</strong> From&nbsp;
                <strong>{ getTimeString(time.beginTime) }</strong> To&nbsp;
                <strong>{ getTimeString(time.endTime) }</strong>&nbsp;
                { time.venue? <strong>({time.venue})</strong>: null }
            </li>
        );
    }


    return (
    <li className='sectionssection'>
        <div className='sectionssection--meta'>
            <p className='sectionssection--section'>
                Sec { section.section } { section.program? `(${section.program})` : '' }
            </p>
            <p className='sectionssection--lecturer'>
                { section.lecturer }
            </p>
            <p className='sectionssection--capacity'>
                { (section.capacity && section.capacity !== 0)? `Capacity: ${section.capacity}` : '' }
            </p>
        </div>

        <ol className='sectionssection--times'>
            { timeListJSX }
        </ol>

        
        <button 
            type='button' 
            className='sectionssection--enroll' 
            aria-label='Select this section of course' 
            title='Select this section'
            onClick={()=> enrollCourseSection(dispatch, name, code, section)} 
        >
            Add to Classes
        </button>
    </li>
    );
}

export default SectionsSection;