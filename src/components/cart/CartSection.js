import { useDispatch } from 'react-redux';

import { showBalloon, setTypeAndMessage } from '../../redux/slices/balloonSlice';
import { setupActions } from '../../redux/slices/setupCoursesSlice';

import { getDayOfWeekName, getTimeString } from '../../logic/utils';

/**
 * @typedef {import('../../redux/slices/cartSlice').CartSection } CartSection
 * @typedef {import('../../redux/slices/cartSlice').CartEnrollingInterface } CartEnrollingInterface
 */



/**
 * 
 * @param {*} dispatch 
 * @param {*} name 
 * @param {*} code 
 * @param {CartSection} section 
 */
function enrollCourseSection(dispatch, name, code, section) {
    /** @type CartEnrollingInterface */
    const cartEnrollment = {
        name, code,
        section: section.section,
        lecturer: section.lecturer,
        times: section.times
    }
    dispatch( setupActions.addCourseFromCart(cartEnrollment) );
    dispatch(setTypeAndMessage({ type: 'success', message: `Added ${code} - Section ${section.section} to Setup page!`}));
    dispatch(showBalloon());
}



function CartSection(props) {
    const { name, code } = props;
    /** @type CartSection */
    const section = props.section;
    const dispatch = useDispatch();


    // List of class times
    const timeListJSX = [];
    for (let key in section.times) {
        const time = section.times[key];
        timeListJSX.push(
            <li key={key} className='carttime'>
                👉 <strong>{ getDayOfWeekName(time.dayOfWeek, false)}</strong> From <strong>{ getTimeString(time.beginTime) }</strong> To <strong>{ getTimeString(time.endTime) }</strong>
            </li>
        );
    }


    return (
    <li className='cartsection'>
        <div className='cartsection--meta'>
            <p className='cartsection--section'>
                Sec { section.section }
            </p>
            <p className='cartsection--lecturer'>
                { section.lecturer }
            </p>

            <button type='button' className='cartsection--enroll' aria-label='Select this section of course' title='Select this section'
                onClick={()=> enrollCourseSection(dispatch, name, code, section)} >
                    Enroll
            </button>
        </div>

        <ol className='cartsection--times'>
            { timeListJSX }
        </ol>
    </li>
    );
}

export default CartSection;