
function Footer() {
    return (
    <footer className='footer'>
        <a aria-label='Link to github account' href='https://github.com/AdmiJW/UTM-Timetable-Generator-V2/issues' target='_blank'
            rel='noreferrer noopener' className='footer__card'>
            <p className='footer__card__text'>Support</p>
            <i className="fab fa-github-alt footer__card__logo"></i>
        </a>
        <p className='footer__desc'>An open source project</p>
    </footer>
    );
}

export default Footer;