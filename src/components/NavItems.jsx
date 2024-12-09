import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from "../assets/images/logo/logo.png";

export const NavItems = () => {
    const [menuToggle, setMenuToggle] = useState(false);
    const [socialToggle, setSocialToggle] = useState(false);
    const [headerFixed, setHeaderFixed] = useState(false);

    // Add scroll event listener inside useEffect to avoid adding it multiple times
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setHeaderFixed(true);
            } else {
                setHeaderFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header-section style-4 ${headerFixed ? "header-fixed fadeInUp" : ""}`}>
            {/* Header top start */}
            <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
                <div className="container">
                    <div className="header-top-area">
                        {/* Use Link from react-router-dom */}
                        <Link to="/signup" className="lab-btn me-3"><span>Create an user Account</span></Link>
                        <Link to="/login" className="lab-btn me-3"><span>Log in with us</span></Link>
                    </div>
                </div>
            </div>

            {/* Header bottom */}
            <div>
                <div className="container">
                    <div className="header-wrapper">
                        {/* Logo */}
                        <div className="logo-search-acte">
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        {/* menu area */}
                        <div className="menu-area">
                            <div className="menu">
                                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/shop">Shop</Link></li>
                                    <li><Link to="/blog">Blog</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </div>

                            {/* sign in and login */}
                            <Link to="/sign-up" className="lab-btn me-3 d-none d-md-block">Create Account</Link>
                            <Link to="/log-in" className="lab-btn me-3 d-none d-md-block">Log In</Link>

                            {/* menu toggler */}
                            <div onClick={() => setMenuToggle(!menuToggle)} className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>

                            {/* social toggler */}
                            <div className="ellepsis-bar d-md-none" onClick={() => setSocialToggle(!socialToggle)}>
                                <i className="icofont-info-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
