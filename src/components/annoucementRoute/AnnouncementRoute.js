import ReactMarkdown from 'react-markdown';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import rehypeRaw from 'rehype-raw';

import { showBlindfold, hideBlindfold } from '../../redux/slices/blindfoldSlice';
import { showLoadingScreen, hideLoadingScreen } from '../../redux/slices/loadingScreenSlice';
import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';


function AnnouncementRoute() {

    const [annoucements, setAnnouncements] = useState([]);
    const dispatch = useDispatch();

    // Once mounted, attempt to fetch annoucements from /data/announcements.json
    useEffect(()=> {
        dispatch(showBlindfold());
        dispatch(showLoadingScreen());

        fetch( process.env.REACT_APP_ANNOUCEMENT_FETCH_URL )
        .then((res)=> res.json())
        .then((announcementLinks)=> Promise.all( [...announcementLinks.map(link => fetch(link) )] ))
        .then((annoucementsResponse)=> Promise.all( [...annoucementsResponse.map(a => a.text() ) ] ))
        .then((annoucements)=> setAnnouncements(annoucements) )
        .catch((err)=> {
            if (err.message === 'Unexpected token < in JSON at position 0')
                console.error("JSON parsing failed. Most likely the resource is not found and responded with 404 not found page. See Network tab in devtools for verification");
            console.error(err);

            dispatch(setTypeAndMessage({ type:'danger', message: "Error occurred while fetching announcements. See console for more info"} ));
            dispatch(showBalloon());
        })
        .finally(()=> {
            dispatch(hideBlindfold());
            dispatch(hideLoadingScreen());
        });
    }, [dispatch]);


    const annoucementListJSX = annoucements.map((e, i)=> {
        return (
        <article className='announcement' key={i} >
            {/* <h4 className='annoucement--title'>{e.title}</h4>
            <p className='announcement--date'>{e.date}</p> */}
            <ReactMarkdown 
                className='announcement--content'
                children={e}
                rehypePlugins={[rehypeRaw]} 
            />
        </article>
        );
    });

    return (
    <main>
    <div className='main--scrollable-wrapper'>
        <h2 className='main__title'>Announcements 📡</h2>
        <h4 className='main__subtitle'>( Tutorial is on the top right corner ↗️ )</h4>

        { annoucementListJSX }
    </div>
    </main>
    );
}

export default AnnouncementRoute;