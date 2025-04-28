import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Landing.css';

import Navbar from '../features/landing/components/Navbar.jsx';
import heroImage from '../assets/hero-image.png';
import apiImage from '../assets/api.png';
import dbImage from '../assets/db.png';
import dev1 from '../assets/dvolynov.png';
import dev2 from '../assets/aostrikov.png';
import dev3 from '../assets/vpinchuk.png';
import dev4 from '../assets/yknyazev.png';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper d-flex flex-column min-vh-100">
            <Navbar/>

            <div className="flex-grow-1 pt-5">
                <div className="container py-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 px-3">
                    <div className="text-center text-md-start">
                        <h1 className="fw-bold mb-3">Turn Best Habits<br />Into Daily Rewards</h1>
                        <p className="text-muted mb-4 fs-5">
                            Build lasting habits through AI-powered challenges and earn real-life rewards.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/signup')}>
                                Get Started
                            </button>
                            <a className="btn btn-outline-primary rounded-3 px-4" href="https://github.com/dvolynov/Rewardify" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                        </div>
                    </div>
                    <div className="text-center d-none d-md-block">
                        <img src={heroImage} alt="Rewardify Hero" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '380px' }} />
                    </div>
                </div>

                <div id="features" className="py-5">
                    <div className="container px-3">
                        <h2 className="fw-bold mb-5 text-center">Technology Features</h2>
                        <div className="row g-4">
                            {["\ud83c\udf1f", "\ud83c\udfc6", "\ud83e\uddd9\u200d\u2642\ufe0f", "\ud83d\udcc8", "\u23f0", "\ud83d\udd12"].map((icon, idx) => (
                                <div className="col-12 col-md-6" key={idx}>
                                    <div className="card p-3 rounded-4 shadow-sm d-flex flex-row align-items-center gap-3 w-100">
                                        <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-light" style={{ width: 56, height: 56, fontSize: '1.8rem' }}>{icon}</div>
                                        <div>
                                            <h6 className="fw-bold mb-1">{['AI Challenge Generator', 'Reward System', 'AI Wizard Onboarding', 'Motivation Mechanics', 'Time Context Engine', 'Private & Secure'][idx]}</h6>
                                            <p className="text-muted small mb-0">{['Generate smart, personalized daily tasks based on your goals.', 'Earn points by completing challenges and redeem them for your custom rewards.', 'Get personalized recommendations powered by OpenAI GPT-4.', 'Maintain chain streaks, unlock bonuses, and experience progressive loading.', 'Tasks adapt to your day: morning, afternoon, evening.', 'Your data remains protected, encrypted, and private.'][idx]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="api" className="py-5">
                    <div className="container d-flex flex-column flex-md-row align-items-center gap-5 px-3">
                        <div className="flex-grow-1 text-center text-md-start order-2 order-md-1">
                            <h2 className="fw-bold text-center text-md-start">Powerful API</h2>
                            <p className="text-muted fs-5 text-center text-md-start">
                                Rewardify provides a flexible REST API built with FastAPI and PostgreSQL for seamless integrations and automation.
                            </p>
                            <div className="d-block d-md-none mb-3">
                                <img src={apiImage} alt="Rewardify API" className="img-fluid rounded-3 shadow-sm" />
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-start">
                                <ul className="list-unstyled d-flex flex-column gap-2 text-start">
                                    {["AI-powered dynamic generation and tracking", "Manage and redeem your XP points effortlessly", "Smart onboarding using OpenAI technologies", "Live tracking of streaks, XP, and level progressions"].map((item, idx) => (
                                        <li key={idx} className="d-flex align-items-start gap-2">
                                            <span className="text-muted small">✅ {item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-primary rounded-3 px-4">Explore API</button>
                            </div>
                        </div>
                        <div className="flex-shrink-1 text-center order-1 order-md-2 d-none d-md-block">
                            <img src={apiImage} alt="Rewardify API" className="img-fluid rounded-4 shadow-sm img-api-db" />
                        </div>
                    </div>
                </div>

                <div id="database" className="py-5">
                    <div className="container d-flex flex-column flex-md-row align-items-center gap-5 px-3">
                        <div className="flex-grow-1 text-center text-md-start order-2 order-md-2">
                            <h2 className="fw-bold text-center text-md-start">Database Architecture</h2>
                            <p className="text-muted fs-5 text-center text-md-start">
                                Our PostgreSQL database is designed for efficiency, providing fast, scalable, and secure storage of all user, challenge, and reward data.
                            </p>
                            <div className="d-block d-md-none mb-3">
                                <img src={dbImage} alt="Rewardify Database" className="img-fluid rounded-4 shadow-sm" />
                            </div>
                            <div className="d-flex justify-content-center justify-content-md-start">
                                <ul className="list-unstyled d-flex flex-column gap-2 text-start">
                                    {["OAuth2 & JWT-based authentication securing user sessions", "Encrypted personal data and rewards storage", "Regular database backups and recovery snapshots", "Role-based access control and permission layers", "Real-time monitoring of database integrity and uptime", "GDPR and privacy compliance for all user information"].map((item, idx) => (
                                        <li key={idx} className="d-flex align-items-start gap-2">
                                            <span className="text-muted small">✅ {item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex-shrink-1 text-center order-1 order-md-1 d-none d-md-block">
                            <img src={dbImage} alt="Rewardify Database" className="img-fluid rounded-4 shadow-sm img-api-db" />
                        </div>
                    </div>
                </div>

                <div id="about" className="container py-5 mb-5 px-3">
                    <h2 className="fw-bold text-center mb-5">Meet the Team</h2>
                    <div className="row g-4 justify-content-center">
                        {[dev1, dev2, dev3, dev4].map((img, idx) => (
                            <div className="col-6 col-md-3" key={idx}>
                                <div className="card p-3 rounded-4 shadow-sm text-center h-100">
                                    <img src={img} alt="Developer" className="rounded-circle mx-auto mb-3" style={{ width: 100, height: 100, objectFit: 'cover' }} />
                                    <h6 className="fw-bold mb-1">{['Dmitriy Volynov', 'Artyom Ostrikov', 'Victor Pinchuk', 'Yaroslav Knyazev'][idx]}</h6>
                                    <p className="text-muted small mb-0">{['AI Developer', 'Web Developer', 'Backend Developer', 'Database Developer'][idx]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="contact" className="container pb-5 px-3">
                    <h2 className="fw-bold text-center mb-4">Get in Touch</h2>
                    <p className="text-muted text-center mb-0">
                        Questions? Feedback? Collaboration? — <a href="mailto:dvolynov@gmail.com" className="text-decoration-none">Email us</a> anytime.
                    </p>
                </div>
            </div>

            <footer className="bg-dark-subtle py-4 mt-4">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center small">
                    <div className="text-center text-md-start mb-2 mb-md-0">
                        © {new Date().getFullYear()} Rewardify. All rights reserved.
                    </div>
                    <div className="text-center text-md-end">
                        Contact: <a href="mailto:dvolynov@gmail.com" className="text-decoration-none">dvolynov@gmail.com</a> | GitHub: <a href="https://github.com/dvolynov" target="_blank" rel="noreferrer" className="text-decoration-none">dvolynov</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;