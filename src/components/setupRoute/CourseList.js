import { useSelector } from 'react-redux';

import CourseItem from './CourseItem';

// Contain a list of Course items
function CourseList() {
    const setupCourses = useSelector((state)=> state.setupCourses);

    // JSX CourseItems - Inside contains a nextID, we don't want that
    const courseItems = [];
    for (let key in setupCourses) {
        if (key === 'nextID') continue;
        const course = setupCourses[key];
        courseItems.push(
            <CourseItem key={course.id} course={course} />
        );
    }

    return (
    <ul className='setup__list'>
        { courseItems }
    </ul>
    );
}

export default CourseList;