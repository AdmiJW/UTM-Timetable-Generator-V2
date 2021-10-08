import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// Components
import CourseList from './CourseList';

// Actions
import { classActions } from '../../redux/slices/classCoursesSlice';


// The content shown on Class Route.
function ClassRoute() {
    const dispatch = useDispatch();

    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h2 className='main__title'>Classes 🧾</h2>
        <p className='main__desc'>
            Add classes here from <Link to='/sections'>Sections 2️⃣</Link> page, or <strong>manually add classes yourself using ➕ button.</strong><br />
            These classes will appear in your timetable. Go to <strong><Link to='/generate'>Generate 4️⃣</Link></strong> page to generate your timetable
        </p>

        <CourseList />
    </div>

    {/* Two buttons for loading and saving courses from/to local storage */}
    <div className='class__savingbtn-grp'>
        <button type='button' aria-label='Save courses into local storage' title='Save courses into local storage' className='class__btn class_save-course'
            onClick={ ()=> dispatch(classActions.saveCoursesToLocalStorage()) } >
                <i className="fas fa-save"></i>
        </button>
        <button type='button' aria-label='Load saved courses from local storage' title='Load saved courses from local storage' className='class__btn class__load-course'
            onClick={ ()=> dispatch(classActions.loadCoursesFromLocalStorage()) } >
                <i className="fas fa-file-upload"></i>
        </button>
    </div>

    {/* Two buttons for Adding courses, one adds a blank course, one opens a window for selected courses */}
    <div className='class__addbtn-grp'>
        <button type='button' aria-label='Add new blank course' title='Add new blank course' className='class__btn class__add-blank-course'
            onClick={ ()=> dispatch(classActions.addBlankCourse()) } >
                <i className="fas fa-plus"></i>
        </button>
    </div>
    </main>
    );
}

export default ClassRoute;