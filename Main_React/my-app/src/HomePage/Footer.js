import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Us</h2>
                            <Link to='/login'>How it works</Link>
                            <Link to='/'>Testimonials</Link>
                            <Link to='/'>Careers</Link>
                            <Link to='/'>Investors</Link>
                            <Link to='/'>Terms of Service</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Support</h2>
                            <Link to='/'>Contact</Link>
                            <Link to='/'>FAQ</Link>
                            <Link to='/'>Booking Policy</Link>
                            <Link to='/'>Cancellation Policy</Link>
                        </div>
                    </div>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>Discover</h2>
                            <Link to='/'>Destinations</Link>
                            <Link to='/'>Our Fleet</Link>
                            <Link to='/'>Special Offers</Link>
                            <Link to='/'>Blog</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Connect</h2>
                            <Link to='/'>Instagram</Link>
                            <Link to='/'>Facebook</Link>
                            <Link to='/'>Youtube</Link>
                            <Link to='/'>X</Link>
                            <Link to='/'>LinkedIn</Link>
                        </div>
                    </div>
                </div>
                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <Link to='/' className='social-logo'>
                                <img src="/Images/FullLogoBright.png" alt="Royal Car Rental Logo" style={{width: '90px', height: 'auto'}} />
                            </Link>
                        </div>
                        <small className='website-rights'>Royal Car Rental © 2024</small>
                        <div className='social-icons'>
                            <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'>
                                <i className='fab fa-facebook-f'/>
                            </Link>
                            <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
                                <i className='fab fa-instagram'/>
                            </Link>
                            <Link className='social-icon-link youtube' to='/' target='_blank' aria-label='Youtube'>
                                <i className='fab fa-youtube'/>
                            </Link>
                            <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='Twitter'>
                                <i className="fa-brands fa-x-twitter"></i>
                            </Link>
                            <Link className='social-icon-link linkedin' to='/' target='_blank' aria-label='LinkedIn'>
                                <i className='fab fa-linkedin'/>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

export default Footer;
