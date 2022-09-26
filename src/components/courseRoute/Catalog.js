import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { showBlindfold, hideBlindfold } from '../../redux/slices/blindfoldSlice';
import { showLoadingScreen, hideLoadingScreen } from '../../redux/slices/loadingScreenSlice';
import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';

import CatalogItem from './CatalogItem';


function Catalog(props) {
    const { url } = props;
    const dispatch = useDispatch();

    const [ search, setSearch ] = useState('');
    const [ courses, setCourses ] = useState({});
    const [ searchResult, setSearchResult ] = useState([]);


    // Fetch the list of courses
    useEffect(()=> {
        dispatch(showBlindfold());
        dispatch(showLoadingScreen());

        fetch( url )
        .then((res)=> res.json())
        .then((data)=> {
            setCourses(data);
            dispatch(setTypeAndMessage({ type:'success', message: `Succesfully fetched ${Object.keys(data).length} course(s)`} ));
        })
        .catch((err)=> {
            if (err.message === 'Unexpected token < in JSON at position 0')
                console.error("JSON parsing failed. Most likely the resource is not found and responded with 404 not found page. See Network tab in devtools for verification");
            console.error(err);

            dispatch(setTypeAndMessage({ type:'danger', message: "Error occurred while fetching courses. See console for more info"} ));
        })
        .finally(()=> {
            dispatch(showBalloon());
            dispatch(hideBlindfold());
            dispatch(hideLoadingScreen());
        });
    }, [url, dispatch]);



    // Update displayed catalog items based on search input
    useEffect(()=> {
        // Filtered CourseItem using Regular Expressions
        const res = [];
        const regexp = new RegExp( search, 'gi');

        for (let key in courses) {
            const course = courses[key];

            if (
                (search === '') ||
                (course.name.match(regexp)) ||
                (course.code.match(regexp))
            ) 
                res.push( <CatalogItem key={key} course={course} /> );
        }
        setSearchResult(res);

    }, [search, courses]);




    return (
    <div className='catalog'>
        <h4 className='courses--title'>
            Step 2: Select Courses
        </h4>

        {/* Search bar */}
        <input type='text' aria-label='search/filter bar' value={search} className='catalog--search' placeholder='Search...'
            onChange={(e)=> setSearch(e.target.value)} 
        />

        {/* List of courses */}
        <ul className='catalog--list'>
            { searchResult }
        </ul>
    </div>
    );
}


export default Catalog;