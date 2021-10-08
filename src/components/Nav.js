import { useLocation, Link } from 'react-router-dom';

function Nav() {
    const { pathname } = useLocation();

    return (
    <nav className='nav container'>
        <Link className='nav-link' data-selected={ pathname === '/courses' } to='/courses'>Courses 1️⃣</Link>
        <Link className='nav-link' data-selected={ pathname === '/sections' } to='/sections'>Sections 2️⃣</Link>
        <Link className='nav-link' data-selected={ pathname === '/classes' } to='/classes'>Classes 3️⃣</Link>
        <Link className='nav-link' data-selected={ pathname === '/generate' } to='/generate'>Generate 4️⃣</Link>
    </nav>
    );
}

export default Nav;