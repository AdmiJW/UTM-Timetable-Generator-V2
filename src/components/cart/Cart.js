
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { cartActions } from '../../redux/slices/cartSlice';
import { showBlindfold, hideBlindfold } from '../../redux/slices/blindfoldSlice';

import CartCourse from './CartCourse';


/**
 * @typedef {import('../../redux/slices/cartSlice').Cart } Cart
 */


function Cart() {
    /** @type Cart */
    const cart = useSelector((state)=> state.cart);
    const { isWindowOpen } = cart.meta;
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch( (isWindowOpen? showBlindfold: hideBlindfold)() );
    }, [dispatch, isWindowOpen]);

    
    const cartCourseListJSX = [];
    for (let key in cart) {
        if (isNaN(key)) continue;
        cartCourseListJSX.push(
            <CartCourse key={key} id={key} course={ cart[key] } />
        );
    }


    return (
    <div className={`cart ${isWindowOpen? 'show': ''}`} >
        {/* Close button */}
        <button type='button' aria-label='Close cart' title='Close cart' className='cart--close'
            onClick={()=> dispatch(cartActions.closeCart())} >
                <i className="fas fa-times"></i>
        </button>

        <h4 className='cart--title'>Cart 🛒</h4>
        <p className='cart--desc'>Wait are we shopping or what?</p>

        <ul className='cart--list'>
            { cartCourseListJSX }
        </ul>
    </div>
    );
}

export default Cart;