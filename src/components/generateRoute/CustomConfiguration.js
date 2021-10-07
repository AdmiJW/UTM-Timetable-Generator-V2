
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { configurationActions, allowedFontFamilies } from '../../redux/slices/configurationSlice';

/**
 * @typedef {import('../../redux/slices/configurationSlice').CustomConfig} CustomConfig
 * @typedef {import('../../redux/slices/configurationSlice').CustomCourseColors} CustomCourseColors
 */


function CustomConfiguration() {

    /** @type CustomConfig */
    const customConfig = useSelector((state)=> state.config.custom);
    const courses = useSelector((state)=> state.setupCourses);
    const dispatch = useDispatch();
    

    const defConfigCourseColors = customConfig.defaultCustomCourseColors;
    // When component mounts / course list in Setup page updates, we need to update the customCourseColors
    useEffect(()=> {
        const configCourseColors = {};

        Object.values(courses).forEach((course)=> {
            if ( typeof(course) !== 'object' ) return;  // SKip the 'nextID' property
            configCourseColors[ course.id ] = {
                id: course.id,
                name: course.courseName,
                ...defConfigCourseColors
            };
        });

        dispatch(configurationActions.modifyCustomConfiguration({ courseColors: configCourseColors }));
    }, [dispatch, courses, defConfigCourseColors]);


    // The user didn't choose custom as theme option. Return nothing.
    if (!customConfig.isCustom) return <Fragment></Fragment>;


    // For each of the courses, provide with option to change background color and font color
    const courseColorsListJSX = Object.values(customConfig.courseColors).map((course)=> {
        return (
        <li key={course.id} className='configure__item'>
            <strong className='configure__itemtitle configure__coursename'>{ course.name }</strong>

            {/* Background Color */}
            <small className='configure__itemtitle'>Background Color</small>
            <input type='color' className='configure__iteminput' aria-label='Select background color' title='Select background color' 
                value={ course.backgroundColor } 
                onChange={(e)=> dispatch(configurationActions.changeCourseBackgroundColor({
                    id: course.id, color: e.target.value
                }))} />

            {/* Font Color */}
            <small className='configure__itemtitle'>Font Color</small>
            <input type='color' className='configure__iteminput' aria-label='Select font color' title='Select font color' 
                value={ course.fontColor } 
                onChange={(e)=> dispatch(configurationActions.changeCourseFontColor({
                    id: course.id, color: e.target.value
                }))} />
        </li>
        );
    });


    return (
    <section className='configure__section'>
        <h4 className='configure__grptitle'>Customization 🧐</h4>

        <img alt='guide to customization timetable' src='/img/custom_guide.png' className='configure__guidepic'/>

        <ul className='configure__grp'>

            {/* Background color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Background Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select background color' title='Select background color' 
                    value={customConfig.backgroundColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        backgroundColor: e.target.value
                    }))} />
            </li>

            {/* Font Family */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Font</span> 
                <select className='configure__iteminput' aria-label='Select font style for timetable' title='Select font style for timetable'
                    value={customConfig.fontFamily} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        fontFamily: e.target.value
                    }))} >
                        { allowedFontFamilies.map(e=> <option key={e} value={e}>{e}</option>) }
                </select>
            </li>

            {/* Label grid color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Label Grid Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select Label Grid Color' title='Select Label Grid Color' 
                    value={customConfig.labelGridColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        labelGridColor: e.target.value
                    }))} />
            </li>

            {/* Time Grid Color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Time Grid Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select Timegrid Color' title='Select Timegrid Color' 
                    value={customConfig.timeGridColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        timeGridColor: e.target.value
                    }))} />
            </li>

            {/* Label Grid Font Color*/}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Label Grid Font Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select Label Grid Font Color' title='Select Label Grid Font Color' 
                    value={customConfig.labelGridFontColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        labelGridFontColor: e.target.value
                    }))} />
            </li>

            {/* Time Grid Font Color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Time Grid Font Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select Timegrid font color 2' title='Select Timegrid font color 2' 
                    value={customConfig.timeGridFontColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        timeGridFontColor: e.target.value
                    }))} />
            </li>

            {/* Odd row Color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Odd Row Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select odd row colors' title='Select odd row colors'
                    value={customConfig.oddRowColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        oddRowColor: e.target.value
                    }))} />
            </li>

            {/* Even row Color */}
            <li className='configure__item'>
                <span className='configure__itemtitle'>Even Row Color</span>
                <input type='color' className='configure__iteminput' aria-label='Select even row colors' title='Select even row colors'
                    value={customConfig.evenRowColor} 
                    onChange={(e)=> dispatch(configurationActions.modifyCustomConfiguration({
                        evenRowColor: e.target.value
                    }))} />
            </li>
            
        </ul>

        {/* Provide user a way to choose their own color */}
        <ul className='configure__grp'>
            { courseColorsListJSX }
        </ul>
    </section>
    );
}

export default CustomConfiguration;