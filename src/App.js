import { HashRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Balloon from './components/Balloon';
import Blindfold from './components/Blindfold';
import LoadScreen from './components/LoadScreen';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Cart from './components/cart/Cart';

import AnnouncementRoute from './components/annoucementRoute/AnnouncementRoute';
import SetupRoute from './components/setupRoute/SetupRoute';
import GenerateRoute from './components/generateRoute/GenerateRoute';
import TutorialRoute from './components/tutorialRoute/TutorialRoute';
import CourseRoute from './components/courseRoute/CourseRoute';

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
        <Cart />

        {/* The Header + Nav + Content will AT LEAST take up screen height */}
        <div className='min-height-screen-height'>
            <Header />
            <Nav />

            <Switch>
                <Route path='/setup'>
                    <SetupRoute />
                </Route>
                <Route path='/generate'>
                    <GenerateRoute />
                </Route>
                <Route path='/courses'>
                    <CourseRoute />
                </Route>
                <Route path='/tutorial'>
                    <TutorialRoute />
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
