import { memo } from 'react';
import { useDispatch } from 'react-redux'

import { cartActions } from '../../redux/slices/cartSlice';

import CartSection from './CartSection';

/**
 * @typedef {import('../../redux/slices/cartSlice').CartCourse } CartCourse
 */


function CartCourse(props) {
    const { id } = props;
    /** @type CartCourse */
    const course = props.course;
    const dispatch = useDispatch();
    

    // List of sections
    const sectionListJSX = [];
    for (let key in course.sections) {
        const section = course.sections[key];
        sectionListJSX.push(
            <CartSection key={key} name={course.name} code={course.code} section={section} />
        );
    }
    

    return (
    <li className={`cartcourse ${course.isAnimatingDelete? 'removing': ''}`} >
        <div className='cartcourse--meta'>
            <p className='cartcourse--name'>{ course.name }</p>
            <p className='cartcourse--code'>{ course.code }</p>

            <button type='button' className='cartcourse--delete' aria-label='Remove this course from cart' title='Remove this course from cart'
                onClick={()=> dispatch(cartActions.removeCourseFromCart(id)) }>
                    <i className="fas fa-trash-alt"></i>
            </button>
        </div>

        <ul className='cartcourse--sections'>
            { sectionListJSX }
        </ul>
    </li>
    );
}

export default memo(CartCourse);