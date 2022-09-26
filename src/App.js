import { HashRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Balloon from './components/Balloon';
import Blindfold from './components/Blindfold';
import LoadScreen from './components/LoadScreen';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SectionsRoute from './components/sectionsRoute/SectionsRoute';

import AnnouncementRoute from './components/annoucementRoute/AnnouncementRoute';
import ClassRoute from './components/classRoute/ClassRoute';
import GenerateRoute from './components/generateRoute/GenerateRoute';
import TutorialRoute from './components/tutorialRoute/TutorialRoute';
import CourseRoute from './components/courseRoute/CourseRoute';
import VenueRoute from './components/venueRoute/VenueRoute.js';

import { setTypeAndMessage, showBalloon } from './redux/slices/balloonSlice';
import { useEffect } from 'react';


// Top level application React component.
function App() {

    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(setTypeAndMessage({ type:'primary', message:'Welcome! If you are new here, you can click tutorial button on top-right corner!'}));
        dispatch(showBalloon());
    }, [dispatch]);

    
    return (
    <HashRouter>
        <Blindfold />
        <Balloon />
        <LoadScreen />

        {/* The Header + Nav + Content will AT LEAST take up screen height */}
        <div className='min-height-screen-height'>
            <Header />
            <Nav />

            <Switch>
                <Route path='/courses'>
                    <CourseRoute />
                </Route>
                <Route path='/sections'>
                    <SectionsRoute />
                </Route>
                <Route path='/classes'>
                    <ClassRoute />
                </Route>
                <Route path='/generate'>
                    <GenerateRoute />
                </Route>
                <Route path='/tutorial'>
                    <TutorialRoute />
                </Route>
                <Route path='/venue'>
                    <VenueRoute />
                </Route>
                <Route path='/'>
                    <AnnouncementRoute />
                </Route>
            </Switch>
        </div>

        <Footer />
    </HashRouter>
    );
}

export default App;
