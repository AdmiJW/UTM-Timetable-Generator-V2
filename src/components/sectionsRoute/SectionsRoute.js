import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SectionsCourse from './SectionsCourse';


/**
 * @typedef {import('../../redux/slices/sectionsSlice').Sections } Sections
 */


function SectionsRoute() {
    /** @type {Sections} */
    const sections = useSelector((state)=> state.sections);

    
    const sectionsCourseListJSX = [];
    for (let key in sections) {
        if (isNaN(key)) continue;
        sectionsCourseListJSX.push(
            <SectionsCourse key={key} id={key} course={ sections[key] } />
        );
    }


    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h4 className='main__title'>Sections 🗄️</h4>
        <p className='main__desc'>
            From the courses you've added from <Link to='/courses'>Courses 1️⃣</Link>, select your section.<br/>
            The section will be added to <Link to='/classes'>Classes 3️⃣</Link> page.
        </p>

        <ul className='sections--list'>
            { sectionsCourseListJSX }
        </ul>
    </div>
    </main>
    );
}

export default SectionsRoute;