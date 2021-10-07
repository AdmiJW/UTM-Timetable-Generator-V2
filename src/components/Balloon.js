import { useSelector } from 'react-redux';


// Balloon notification. Sits fixed on the screen.
function Balloon() {
    const { shownCount, type, message } = useSelector((state)=> state.balloon);

    return (
    <div className={`balloon ${type} ${shownCount? 'shown': ''}`}>
        { message }
    </div>    
    );
}

export default Balloon;