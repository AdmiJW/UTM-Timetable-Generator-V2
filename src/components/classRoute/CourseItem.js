import { useRef, useEffect, memo } from "react";
import { useDispatch } from "react-redux";

// Components
import TimeSlot from "./TimeSlot";

// Actions
import { classActions } from '../../redux/slices/classCoursesSlice';

function CourseItem(props) {

    const { id, courseName, lecturerName, courseCode, timeslots, isAnimatingDelete } = props.course;
    const dispatch = useDispatch();

    // There has been problems with ContentEditable on React. Here's why:
    // Using <input>, it is unable to span multiple lines.
    // Using <textarea>, I forgot why but is also not desired
    // With ContentEditable, if we use it in React's controlled component way, it will keep resetting the caret position
    // Therefore, I have no choice but to use Uncontrolled component
    const courseNameRef = useRef();
    const lecturerNameRef = useRef();
    const courseCodeRef = useRef();

    // We cannot put directly the values into the JSX as it triggers rerender and reset caret position.
    // We only want to set initial value on mount, and subsequent edit is handled by DOM, only to be updated to Redux
    // ? On component initial mount, set the courseName etc to the initial value. Anything after that is handled by the DOM.
    useEffect(()=> {
        courseNameRef.current.innerText = courseName;
        lecturerNameRef.current.innerText = lecturerName;
        courseCodeRef.current.innerText = courseCode;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // Generate Timeslots
    const timeslotJSXList = [];
    for (let key in timeslots) {
        if (key === 'nextID') continue;
        const timeslot = timeslots[key];
        timeslotJSXList.push(
            <TimeSlot key={timeslot.id} courseID={id} timeslot={timeslot} />
        );
    }


    // JSX
    return (
    <li className={`class__courseitem ${isAnimatingDelete? 'deleting': ''}`} data-nth={ id % 10 }>

        {/* Left side: Contains meta information and control on the course */}
        <div className='class__courseitem--meta'>
            {/* Course Name */}
            <div role='textbox' contentEditable className='class__courseitem--input class__courseitem--coursename'
                onInput={ ()=> dispatch(classActions.changeCourseName({ id, newCourseName: courseNameRef.current.innerText})) } 
                ref={courseNameRef} suppressContentEditableWarning>
            </div>
            {/* Lecturer Name */}
            <div role='textbox' contentEditable className='class__courseitem--input class__courseitem--lecturername'
                onInput={ ()=> dispatch(classActions.changeLecturerName({ id, newLecturerName: lecturerNameRef.current.innerText})) } 
                ref={lecturerNameRef} suppressContentEditableWarning >
            </div>
            {/* Course Code */}
            <div role='textbox' contentEditable className='class__courseitem--input class__courseitem--coursecode'
                onInput={ ()=> dispatch(classActions.changeCourseCode({ id, newCourseCode: courseCodeRef.current.innerText })) } 
                ref={courseCodeRef} suppressContentEditableWarning >
            </div>

            <div className='class__courseitem--btn-grp'>
                <button type='button' aria-label='Add new time slot' title='Add new time slot' 
                    className='class__courseitem--btn class__courseitem--addtime'
                    onClick={ ()=> dispatch(classActions.addTimeslot( id )) } >
                        <i className="far fa-clock"></i>
                </button>

                <button type='button' aria-label='Discard course' title='Discard course' 
                    className='class__courseitem--btn class__courseitem--delcourse'
                    onClick={ ()=> dispatch(classActions.deleteCourse( id )) } >
                        <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>


        {/* Right side: Contains time slots for the course */}
        <ul className='class__timeslots'>
            { timeslotJSXList }
        </ul>
    </li>
    );
}

// Use memoization to optimize rendering - Expensive
export default memo(CourseItem);