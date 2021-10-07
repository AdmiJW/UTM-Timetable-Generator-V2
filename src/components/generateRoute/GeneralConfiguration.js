
import { useSelector, useDispatch } from 'react-redux';

import { configurationActions } from '../../redux/slices/configurationSlice';


function GeneralConfiguration() {

    const {
        theme, orientation, weekends, timeframeBegin, timeframeEnd
    } = useSelector((state)=> state.config.general);
    const dispatch = useDispatch();


    return (
    <section className='configure__section'>
        <h4 className='configure__grptitle'>General Configurations</h4>
        <ul className='configure__grp'>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Theme 🎨</span> 
                <select className='configure__iteminput' aria-label='Select the theme for the timetable generated'
                    value={theme} onChange={(e)=> dispatch(configurationActions.setTheme(e.target.value)) }>
                        <option value='default'>Default</option>
                        <option value='futuristic'>Futuristic</option>
                        <option value='cuteness'>Cuteness</option>
                        <option value='spidey'>Spidey</option>
                        <option value='nature'>Nature</option>
                        <option value='custom'>Custom</option>
                </select>
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Orientation 🔍</span>
                <select className='configure__iteminput' aria-label='Select timetable orientation'
                    title='Select timetable orientation'
                    value={orientation} onChange={(e)=> dispatch(configurationActions.setOrientation(e.target.value)) }>
                        <option value='horizontal'>Horizontal</option>
                        <option value='vertical'>Vertical</option>
                </select>
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Weekends 📆</span>
                <select className='configure__iteminput' aria-label='Select to exclude/include the weekends on timetable'
                    title='Select to exclude/include the weekends on timetable'
                    value={weekends} onChange={(e)=> dispatch(configurationActions.setWeekends(e.target.value)) }>
                        <option value='fri/sat'>Hide Fri/Sat</option>
                        <option value='sat/sun'>Hide Sat/Sun</option>
                        <option value='all'>i want all</option>
                </select>
            </li>
            <li className='configure__item'>
                <span className='configure__itemtitle'>Visible Timeframe ⌚️</span>
                <select className='configure__iteminput' aria-label='Select the starting timeframe for the timetable generated'
                    title='Select the starting timeframe for the timetable generated'
                    value={timeframeBegin} onChange={(e)=> dispatch(configurationActions.setTimeframeBegin(e.target.value)) }>
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
                to
                <select className='configure__iteminput' aria-label='Select the ending timeframe for the timetable generated'
                    title='Select the ending timeframe for the timetable generated'
                    value={timeframeEnd} onChange={(e)=> dispatch(configurationActions.setTimeframeEnd(e.target.value)) }>
                        <option value='9' disabled={ timeframeBegin > 8 } >03 (9:00 AM)</option>
                        <option value='10' disabled={ timeframeBegin > 9 } >04 (10:00 AM)</option>
                        <option value='11' disabled={ timeframeBegin > 10 } >05 (11:00 AM)</option>
                        <option value='12' disabled={ timeframeBegin > 11 } >06 (12:00 AM)</option>
                        <option value='13' disabled={ timeframeBegin > 12 } >07 (1:00 PM)</option>
                        <option value='14' disabled={ timeframeBegin > 13 } >08 (2:00 PM)</option>
                        <option value='15' disabled={ timeframeBegin > 14 } >09 (3:00 PM)</option>
                        <option value='16' disabled={ timeframeBegin > 15 } >10 (4:00 PM)</option>
                        <option value='17' disabled={ timeframeBegin > 16 } >11 (5:00 PM)</option>
                        <option value='18' disabled={ timeframeBegin > 17 } >12 (6:00 PM)</option>
                        <option value='19' disabled={ timeframeBegin > 18 } >13 (7:00 PM)</option>
                        <option value='20' disabled={ timeframeBegin > 19 } >14 (8:00 PM)</option>
                </select>
            </li>
        </ul>
    </section>
    );
}

export default GeneralConfiguration;