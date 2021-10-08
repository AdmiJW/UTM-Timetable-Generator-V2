import { useSelector, useDispatch } from 'react-redux';

import { configurationActions } from '../../redux/slices/configurationSlice';


function GridConfiguration() {

    const {
        gridWidth, gridHeight, courseNameFontSize, lecturerNameFontSize, courseCodeFontSize, gap
    } = useSelector((state)=> state.config.grid);
    const dispatch = useDispatch();


    return (
    <section className='configure__section'>
        <h4 className='configure__grptitle'>Grid Configurations 📐</h4>

        <img alt='guide to customization timetable' src='./img/grid_guide.jpg' className='configure__guidepic'/>

        <ul className='configure__grp'>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Grid Width</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the width for each grid in timetable'
                    title='Select the width for each grid in timetable'
                    value={gridWidth} onChange={(e)=> dispatch(configurationActions.setGridWidth(e.target.value))} />
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Grid Height</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the height for each grid in timetable'
                    title='Select the height for each grid in timetable'
                    value={gridHeight} onChange={(e)=> dispatch(configurationActions.setGridHeight(e.target.value))} />
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Grid Gap</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the gap size (spacing between grids) in timetable'
                    title='Select the gap size (spacing between grids) in timetable'
                    value={gap} onChange={(e)=> dispatch(configurationActions.setGap(e.target.value))} />
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Course Name Font Size</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the font size for course names in timetable'
                    title='Select the font size for course names in timetable'
                    value={courseNameFontSize} onChange={(e)=> dispatch(configurationActions.setCourseNameFontSize(e.target.value))} />
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Lecturer Name Font Size</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the font size for lecturer name in timetable'
                    title='Select the font size for lecturer name in timetable'
                    value={lecturerNameFontSize} onChange={(e)=> dispatch(configurationActions.setLecturerNameFontSize(e.target.value))} />
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Course Code Font Size</span>
                <input type='number' min='0' step='1' className='configure__iteminput' aria-label='Select the font size for course code in timetable'
                    title='Select the font size for course code in timetable'
                    value={courseCodeFontSize} onChange={(e)=> dispatch(configurationActions.setCourseCodeFontSize(e.target.value))} />
            </li>
        </ul>
    </section>
    );
}

export default GridConfiguration;