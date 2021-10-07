import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// Components
import CourseList from './CourseList';

// Actions
import { setupActions } from '../../redux/slices/setupCoursesSlice';
import { cartActions } from '../../redux/slices/cartSlice';


// The content shown on Setup Route.
function SetupRoute() {
    const dispatch = useDispatch();

    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h2 className='main__title'>Setup 🧾</h2>
        <p className='main__desc'>
            Add courses here from the cart, or manually add courses yourself.<br />
            These courses will appear in your timetable. Go to <strong><Link to='/generate'>Generate</Link></strong> page to generate your timetable
        </p>

        <CourseList />
    </div>

    {/* Two buttons for loading and saving courses from/to local storage */}
    <div className='setup__savingbtn-grp'>
        <button type='button' aria-label='Save courses into local storage' title='Save courses into local storage' className='setup__btn setup_save-course'
            onClick={ ()=> dispatch(setupActions.saveCoursesToLocalStorage()) } >
                <i className="fas fa-save"></i>
        </button>
        <button type='button' aria-label='Load saved courses from local storage' title='Load saved courses from local storage' className='setup__btn setup__load-course'
            onClick={ ()=> dispatch(setupActions.loadCoursesFromLocalStorage()) } >
                <i className="fas fa-file-upload"></i>
        </button>
    </div>

    {/* Two buttons for Adding courses, one adds a blank course, one opens a window for selected courses */}
    <div className='setup__addbtn-grp'>
        <button type='button' aria-label='Add new blank course' title='Add new blank course' className='setup__btn setup__add-blank-course'
            onClick={ ()=> dispatch(setupActions.addBlankCourse()) } >
                <i className="fas fa-sticky-note"></i>
        </button>
        <button type='button' aria-label='Open shopping cart' title='Open shopping cart' className='setup__btn setup__cart'
            onClick={ ()=> dispatch(cartActions.openCart()) }>
                <i className="fas fa-shopping-cart"></i>
        </button>
    </div>
    </main>
    );
}

export default SetupRoute;