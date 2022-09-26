import { Link } from 'react-router-dom'


function Header() {
    return (
    <header className='header container-padded'>
        <img className='header__logo' alt='Logo Universiti Tekonologi Malaysia' src='./img/utm_logo.png' />
        <h1 className='header__title'>UTM Timetable Generator V2</h1>
        
        <Link role='button' title='Venue' to='/venue' className='header__button' >
            <i className="fas fa-map-marker-alt"></i>
        </Link>
        <Link role='button' title='Announcements' to='/' className='header__button' >
            <i className="fas fa-bullhorn"></i>
        </Link>
        <Link role='button' title='View Tutorial' to='/tutorial' className='header__button' >
            <i className="fas fa-question"></i>
        </Link>
    </header>
    );
}

export default Header;