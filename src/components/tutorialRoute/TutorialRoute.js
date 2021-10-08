import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { showBalloon, setTypeAndMessage } from '../../redux/slices/balloonSlice';
import { showBlindfold, hideBlindfold } from '../../redux/slices/blindfoldSlice';
import { showLoadingScreen, hideLoadingScreen } from '../../redux/slices/loadingScreenSlice';


function TutorialRoute() {

    const [ guides, setGuides ] = useState([{
        page: 0,
        content: ''
    }]);
    const [ pageNo, setPageNo ] = useState(0);
    const dispatch = useDispatch();


    useEffect(()=> {
        dispatch(showBlindfold());
        dispatch(showLoadingScreen());

        fetch( process.env.REACT_APP_TUTORIAL_FETCH_URL )
        .then((res)=> res.json())
        .then((guides)=> {
            setGuides(guides);
        })
        .catch((err)=> {
            if (err.message === 'Unexpected token < in JSON at position 0')
                console.error("JSON parsing failed. Most likely the resource is not found and responded with 404 not found page. See Network tab in devtools for verification");
            console.error(err);

            dispatch(setTypeAndMessage({ type:'danger', message: "Error occurred while fetching tutorials. See console for more info"} ));
            dispatch(showBalloon());
        })
        .finally(()=> {
            dispatch(hideBlindfold());
            dispatch(hideLoadingScreen());
        });
    }, [dispatch]);


    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h2 className='main__title'>Tutorial 📚</h2>

        <div className='tutorial__btngrp'>
            <button type='button' className='tutorial__btn tutorial__prev'
                onClick={ ()=> setPageNo( Math.max(0, pageNo-1) ) }>
                    <i className="fas fa-angle-left"></i>
            </button>
            Page { pageNo + 1 } of { guides.length }
            <button type='button' className='tutorial__btn tutorial__next'
                onClick={ ()=> setPageNo( Math.min(pageNo+1, guides.length - 1) ) }>
                    <i className="fas fa-angle-right"></i>
            </button>
        </div>

        <ReactMarkdown className='tutorial__markdown'
            children={ guides[pageNo].content }
            rehypePlugins={[rehypeRaw]}
        />
    </div>
    </main>
    );
}


export default TutorialRoute;