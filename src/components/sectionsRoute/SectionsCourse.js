import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { sectionsActions } from '../../redux/slices/sectionsSlice';

import SectionsSection from './SectionsSection';

/**
 * @typedef {import('../../redux/slices/sectionsSlice').SectionsCourse } SectionsCourse
 */


function SectionsCourse(props) {
    const { id } = props;
    /** @type {SectionsCourse} */
    const course = props.course;
    const dispatch = useDispatch();
    

    // List of sections
    const sectionListJSX = [];
    for (let key in course.sections) {
        const section = course.sections[key];
        sectionListJSX.push(
            <SectionsSection key={key} name={course.name} code={course.code} section={section} />
        );
    }
    

    return (
    <li className={`sectionscourse ${course.isAnimatingDelete? 'removing': ''}`} >
        <div className='sectionscourse--meta'>
            <p className='sectionscourse--name'>{ course.name }</p>
            <p className='sectionscourse--code'>{ course.code }</p>

            <button type='button' className='sectionscourse--delete' aria-label='Remove this course from sections' title='Remove this course from sections'
                onClick={()=> dispatch(sectionsActions.removeCourseFromSections(id)) }>
                    <i className="fas fa-trash-alt"></i>
            </button>
        </div>

        <ul className='sectionscourse--sections'>
            { sectionListJSX }
        </ul>
    </li>
    );
}

export default memo(SectionsCourse);