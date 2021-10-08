import { useState } from 'react';

import ClashCheckState from './ClashCheckState';
import ConfigureState from './ConfigureState';
import CreationState from './CreationState';


// The content shown on Generate Route.
function GenerateRoute() {
    // To generate a timetable, a user needs to go through 3 states:
    // State 0 - Check for clashes
    // State 1 - Configure / Customize timetable
    // State 2 - Actual generation of timetable
    const [state, setState] = useState(0);

    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h2 className='main__title'>Generate Timetable 🏭</h2>
        <p className='main__desc'>Here, you check clashes, customize, and finally generate your timetable</p>
        
        { state >= 0? <ClashCheckState setState={setState} />: null }
        { state >= 1? <ConfigureState setState={setState} />: null }
        { state >= 2? <CreationState />: null }
    </div>
    </main>
    );
}

export default GenerateRoute;