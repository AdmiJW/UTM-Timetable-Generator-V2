import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { setupActions } from '../../redux/slices/setupCoursesSlice';


// Timeslots for a course - Controls the course's
// - Day of the week
// - Start time
// - End time
function TimeSlot(props) {

    const dispatch = useDispatch();
    
    const { courseID } = props;
    const { id, dayOfWeek, startTime, endTime, isAnimatingDelete } = props.timeslot;

    return (
    <li className={`setup__timeslotitem ${isAnimatingDelete? 'deleting': ''}`} >
        {/* Button to discard this timeslot */}
        <button type='button' aria-label='Discard this timeslot' label='Discard this timeslot' className='setup__timeslotitem--discardbtn'
            onClick={ ()=> dispatch(setupActions.deleteTimeslot({ courseID, timeslotID: id })) } >
            <i className="fas fa-times"></i>
        </button>

        <select className='setup__timeslot--select setup__timeslot--dayOfWeek' value={dayOfWeek} 
            onChange={ (e)=> dispatch(setupActions.changeTimeslotDayOfWeek({
                courseID, timeslotID: id, dayOfWeek: e.target.value
            })) } >
                <option value='0'>Sunday</option>
                <option value='1'>Monday</option>
                <option value='2'>Tuesday</option>
                <option value='3'>Wednesday</option>
                <option value='4'>Thursday</option>
                <option value='5'>Friday</option>
                <option value='6'>Saturday</option>
        </select>

        <div className='setup__timeslot--timegrp'>
            <select className='setup__timeslot--select setup__timeslot--startTime' value={startTime}
                onChange={ (e)=> dispatch(setupActions.changeTimeslotStartTime({
                    courseID, timeslotID: id, startTime: e.target.value
                })) } >
                    <option value='8'>02 (8:00 AM)</option>
                    <option value='9'>03 (9:00 AM)</option>
                    <option value='10'>04 (10:00 AM)</option>
                    <option value='11'>05 (11:00 AM)</option>
                    <option value='12'>06 (12:00 AM)</option>
                    <option value='13'>07 (1:00 PM)</option>
                    <option value='14'>08 (2:00 PM)</option>
                    <option value='15'>09 (3:00 PM)</option>
                    <option value='16'>10 (4:00 PM)</option>
                    <option value='17'>11 (5:00 PM)</option>
                    <option value='18'>12 (6:00 PM)</option>
                    <option value='19'>13 (7:00 PM)</option>
            </select>

            To

            <select className='setup__timeslot--select setup__timeslot--endTime' value={endTime}
                onChange={ (e)=> dispatch(setupActions.changeTimeslotEndTime({
                    courseID, timeslotID: id, endTime: e.target.value
                })) } >
                    <option value='9' disabled={ startTime > 8 } >03 (9:00 AM)</option>
                    <option value='10' disabled={ startTime > 9 } >04 (10:00 AM)</option>
                    <option value='11' disabled={ startTime > 10 } >05 (11:00 AM)</option>
                    <option value='12' disabled={ startTime > 11 } >06 (12:00 AM)</option>
                    <option value='13' disabled={ startTime > 12 } >07 (1:00 PM)</option>
                    <option value='14' disabled={ startTime > 13 } >08 (2:00 PM)</option>
                    <option value='15' disabled={ startTime > 14 } >09 (3:00 PM)</option>
                    <option value='16' disabled={ startTime > 15 } >10 (4:00 PM)</option>
                    <option value='17' disabled={ startTime > 16 } >11 (5:00 PM)</option>
                    <option value='18' disabled={ startTime > 17 } >12 (6:00 PM)</option>
                    <option value='19' disabled={ startTime > 18 } >13 (7:00 PM)</option>
                    <option value='20' disabled={ startTime > 19 } >14 (8:00 PM)</option>
            </select>
        </div>
    </li>
    );
}

export default memo(TimeSlot);