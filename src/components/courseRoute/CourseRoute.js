import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { showBlindfold, hideBlindfold } from '../../redux/slices/blindfoldSlice';
import { showLoadingScreen, hideLoadingScreen } from '../../redux/slices/loadingScreenSlice';
import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';


import Catalog from './Catalog';


function CourseRoute() {

    const [ schools, setSchools ] = useState([]);
    const [ selectedSchool, setSelectedSchool ] = useState('');
    const dispatch = useDispatch();
    
    // Fetch a list of available schools.
    useEffect(()=> {
        dispatch(showBlindfold());
        dispatch(showLoadingScreen());

        fetch( process.env.REACT_APP_SCHOOL_LIST_FETCH_URL )
        .then((res)=> res.json())
        .then((data)=> {
            // Sort school name lexicographically
            data = data.sort((x,y)=> x.name < y.name? -1: 1 );
            setSchools(data);
            dispatch(setTypeAndMessage({ type:'success', message: `Succesfully fetched ${data.length} school(s)`} ));
        })
        .catch((err)=> {
            if (err.message === 'Unexpected token < in JSON at position 0')
                console.error("JSON parsing failed. Most likely the resource is not found and responded with 404 not found page. See Network tab in devtools for verification");
            console.error(err);

            dispatch(setTypeAndMessage({ type:'danger', message: "Error occurred while fetching list of schools. See console for more info"} ));
        })
        .finally(()=> {
            dispatch(showBalloon());
            dispatch(hideBlindfold());
            dispatch(hideLoadingScreen());
        });
    }, [dispatch]);


    return (
    <main>
    <div className='main--scrollable-wrapper courses'>
        <h2 className='main__title'>UTM Courses 📚</h2>
        <p className='main__desc'>Select from readily available UTM courses, which you can choose your section later in <strong><Link to='/sections'>Sections 2️⃣</Link></strong> page</p>
    
        {/* Step 1 - Select school */}
        <h4 className='courses--title'>
            Step 1: Select School/Faculty
        </h4>
        <p className='courses--desc'>
            Doesn't see your school/faculty listed? Incorrect course information?
            <a href='https://forms.gle/YhgPcBSBCoiDipQk6' target="_blank" rel='noopener noreferrer'> Send Feedback</a>
        </p>

        <select aria-label='Select school/faculty' value={selectedSchool} className='courses--select'
            onChange={(e)=> setSelectedSchool(e.target.value)} >
                <option disabled={true} value=''> -- select an option -- </option>
                { schools.map((e)=> <option value={e.url} key={e.name}>{e.name}</option> ) }
        </select>

        { selectedSchool !== ''? <Catalog url={selectedSchool} />: null }
    
    </div>
    </main>    
    );
}

export default CourseRoute;