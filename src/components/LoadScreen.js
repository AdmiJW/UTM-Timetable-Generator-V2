import { useState, useEffect } from "react";
import { useSelector } from "react-redux";



function LoadScreen() {
    const loadingScreen_showing = useSelector((state)=> state.loadingScreen_showing);
    const [ loadingQuotes, setLoadingQuotes ] = useState(["Loading..."]);
    const randomIndex = Math.floor( Math.random() * loadingQuotes.length );

    // On component mount, attempt to load in custom loading quotes from CDN.
    useEffect(()=> {
        fetch( process.env.REACT_APP_LOAD_SCREEN_QUOTE_FETCH_URL )
        .then((res)=> res.json())
        .then((quotes)=> setLoadingQuotes(quotes))
        .catch((err)=> {
            console.error("Failed to fetch loading screen quotes from " + process.env.REACT_APP_LOAD_SCREEN_QUOTE_FETCH_URL);
        });
    },[]);


    return (
    <div className={`loadScreen ${loadingScreen_showing? 'shown': ''}`}>
        <h4 className='loadScreen__title'>Loading ⌛️</h4>
        <p className='loadScreen__quote'> { loadingQuotes[randomIndex] } </p>
        <i className="fab fa-github-alt loadScreen__logo"></i>
    </div>
    );
}

export default LoadScreen;