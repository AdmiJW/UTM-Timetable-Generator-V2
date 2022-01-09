
import GeneralConfiguration from './GeneralConfiguration';
import GridConfiguration from './GridConfiguration';
import CustomConfiguration from './CustomConfiguration';

import { scrollMainContainerTo } from '../../logic/utils';



// Simply set state to 2, and scrolls to the next container: creation
function proceedToNextState(setState) {
    setState(2);
    scrollMainContainerTo('.creation');
}



function ConfigureState(props) {
    const { setState } = props;
    
    return (
    <section className='generate__section configure'>
        <h4 className='generate__title'>Step 2: Configurations ⚙️</h4>
        <p className='generate__desc'>Try changing the theme, and set how the timetable is rendered.</p>

        {/* For lazy people that just want a timetable */}
        <button type='button' aria-label='Proceed to Step 3 - Generate Timetable' title='Proceed to Step 3 - Create Timetable'
            className='configure__btn configure__btnskip' onClick={()=> proceedToNextState(setState)}>
                Skip 💨
        </button>


        {/* General Configurations */}
        <GeneralConfiguration />

        {/* Grid Configuration */}
        <GridConfiguration />

        {/* Custom Configuration */}
        <CustomConfiguration />

        {/* Previewer */}

        {/* Go to step 3 */}
        <button type='button' aria-label='Proceed to Step 3' title='Proceed to Step 3'
            className='configure__btn configure__btnproceed' onClick={()=> proceedToNextState(setState)}>
                Proceed 💪
        </button>
    </section>
    );
}

export default ConfigureState;