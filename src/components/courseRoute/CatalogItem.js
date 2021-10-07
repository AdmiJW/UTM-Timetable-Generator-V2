import { memo } from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../redux/slices/cartSlice';
import { setTypeAndMessage, showBalloon } from '../../redux/slices/balloonSlice';


// Handles add to cart button
function addToCart(dispatch, course) {
    dispatch(cartActions.addCourseToCart(course));
    dispatch(setTypeAndMessage({ type: 'success', message: `Successfully added "${course.name}" - ${course.code} into the cart!`}));
    dispatch(showBalloon());
}



function CatalogItem(props) {
    const { course } = props;
    const dispatch = useDispatch();

    return (
    <li className='catalog--item'>
        <h4 className='catalog--item--name'>
            { course.name }
        </h4>

        <p className='catalog--item--code'>
            { course.code }
        </p>

        <button className='catalog--item--addtocart'
            onClick={()=> addToCart(dispatch, course)}>
                <i className="fas fa-cart-plus"></i>
        </button>
    </li>
    );
}


export default memo(CatalogItem);