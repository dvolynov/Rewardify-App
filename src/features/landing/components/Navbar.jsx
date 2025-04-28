import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleAnchorClick = (anchor) => {
        const el = document.getElementById(anchor);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light shadow-sm fixed-top">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <button
                            type="button"
                            className="btn btn-light border me-2 d-flex align-items-center justify-content-center d-lg-none"
                            style={{ width: 36, height: 36, borderRadius: '10px' }}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <i className="bi bi-list" style={{ fontSize: '1.2rem' }}></i>
                        </button>

                        <div
                            className="d-flex align-items-center"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            <img src={logo} alt="Rewardify Logo" width="25" className="me-2" />
                            <span className="navbar-brand fw-bold mb-0 h1">Rewardify</span>
                        </div>
                    </div>
                    <div className="d-none d-lg-flex align-items-center gap-4">
                        <a className="nav-link" href="#features">Features</a>
                        <a className="nav-link" href="#api">API</a>
                        <a className="nav-link" href="#database">Database</a>
                        <a className="nav-link" href="#about">Team</a>
                        <a className="nav-link" href="#contact">Contact</a>
                    </div>
                    <div className="d-flex align-items-center gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-outline-primary rounded-3"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button
                                className="btn btn-primary rounded-3"
                                onClick={() => navigate('/signup')}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '250px',
                        height: '100vh',
                        background: '#fff',
                        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
                        zIndex: 3000,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        padding: '1rem'
                    }}
                >
                    <button
                        type="button"
                        className="btn-close position-absolute"
                        style={{ top: '1rem', right: '1rem' }}
                        onClick={() => setIsMenuOpen(false)}
                    />

                    <div className="d-flex flex-column align-items-left">
                        <button
                            className="btn btn-link text-start text-black text-decoration-none"
                            onClick={() => handleAnchorClick('features')}
                        >
                            Features
                        </button>
                        <button
                            className="btn btn-link text-start text-black text-decoration-none"
                            onClick={() => handleAnchorClick('api')}
                        >
                            API
                        </button>
                        <button
                            className="btn btn-link text-start text-black text-decoration-none"
                            onClick={() => handleAnchorClick('database')}
                        >
                            Database
                        </button>
                        <button
                            className="btn btn-link text-start text-black text-decoration-none"
                            onClick={() => handleAnchorClick('about')}
                        >
                            Team
                        </button>
                        <button
                            className="btn btn-link text-start text-black text-decoration-none"
                            onClick={() => handleAnchorClick('contact')}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;