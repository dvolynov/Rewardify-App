// src/features/landing/components/Navbar.jsx

import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
            <div className="container">
                {/* Logo and Brand */}
                <div className="d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <img src={logo} alt="Rewardify Logo" width="25" className="me-2" />
                    <span className="navbar-brand fw-bold mb-0 h1">Rewardify</span>
                </div>

                {/* Center Menu */}
                <div className="collapse navbar-collapse justify-content-center">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Auth Buttons */}
                <div className="d-flex gap-2">
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
        </nav>
    );
}

export default Navbar;