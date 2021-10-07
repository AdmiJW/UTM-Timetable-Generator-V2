import { useSelector } from 'react-redux';


// A blindfold is simply a div that lies on top of components, darken when there is an overlay showing.
function Blindfold() {
    const blindfold_showing = useSelector((state)=> state.blindfold_showing);

    return (
    <div className={`blindfold ${blindfold_showing? 'shown': ''}`}></div>
    )
}

export default Blindfold;