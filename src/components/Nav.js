import { useLocation, Link } from 'react-router-dom';

function Nav() {
    const { pathname } = useLocation();

    return (
    <nav className='nav container'>
        <Link className='nav-link' data-selected={ pathname === '/courses' } to='/courses'>Courses 📚</Link>
        <Link className='nav-link' data-selected={ pathname === '/setup' } to='/setup'>Setup 🔨</Link>
        <Link className='nav-link' data-selected={ pathname === '/generate' } to='/generate'>Generate 🏭</Link>
    </nav>
    );
}

export default Nav;