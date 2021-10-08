import { useSelector } from 'react-redux';

import CourseItem from './CourseItem';

// Contain a list of Course items
function CourseList() {
    const classCourses = useSelector((state)=> state.classCourses);

    // JSX CourseItems - Inside contains a nextID, we don't want that
    const courseItems = [];
    for (let key in classCourses) {
        if (key === 'nextID') continue;
        const course = classCourses[key];
        courseItems.push(
            <CourseItem key={course.id} course={course} />
        );
    }

    return (
    <ul className='class__list'>
        { courseItems }
    </ul>
    );
}

export default CourseList;