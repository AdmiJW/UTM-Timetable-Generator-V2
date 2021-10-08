import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { sectionsActions } from '../../redux/slices/sectionsSlice';
import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';


// Handles add to Sections button
function addToSections(dispatch, course) {
    dispatch(sectionsActions.addCourseToSections(course));
    dispatch(setTypeAndMessage({ type: 'success', message: `Successfully added "${course.name}" - ${course.code} into Sections 2️⃣!`}));
    dispatch(showBalloon());
}



function CatalogItem(props) {
    const { course } = props;
    const dispatch = useDispatch();

    return (
    <li className='catalog--item'>
        <h4 className='catalog--item--name'>
            { course.name }
        </h4>

        <p className='catalog--item--code'>
            { course.code }
        </p>

        <button className='catalog--item--addtocart'
            onClick={()=> addToSections(dispatch, course)}>
                <i className="fas fa-plus"></i>
        </button>
    </li>
    );
}


export default memo(CatalogItem);