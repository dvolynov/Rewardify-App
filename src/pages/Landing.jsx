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
            <Navbar mobileMenuLeft />

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
                        <img src={heroImage} alt="Rewardify Hero" className="img-fluid rounded-4 shadow-sm" style={{ maxHeight: '380px' }} />
                    </div>
                </div>

                <div id="features" className="py-5">
                    <div className="container px-3">
                        <h2 className="fw-bold mb-5 text-center">Rewardify’s Technology Edge</h2>
                        <div className="row g-4">
                            {[
                                { icon: "🎯", title: "AI Challenge Generator", desc: "Generate smart, personalized daily tasks based on your goals." },
                                { icon: "🏆", title: "Reward System", desc: "Earn points by completing challenges and redeem them for your custom rewards." },
                                { icon: "🧙‍♂️", title: "AI Wizard Onboarding", desc: "Get personalized recommendations powered by OpenAI GPT-4." },
                                { icon: "📈", title: "Motivation Mechanics", desc: "Maintain chain streaks, unlock bonuses, and experience progressive loading." },
                                { icon: "⏰", title: "Time Context Engine", desc: "Tasks adapt to your day: morning, afternoon, evening." },
                                { icon: "🔒", title: "Private & Secure", desc: "Your data remains protected, encrypted, and private." },
                            ].map((feature, idx) => (
                                <div className="col-12 col-md-6" key={idx}>
                                    <div className="card p-3 rounded-4 shadow-sm d-flex flex-row align-items-center gap-3 w-100">
                                        <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-light" style={{ width: 56, height: 56, fontSize: '1.8rem' }}>{feature.icon}</div>
                                        <div>
                                            <h6 className="fw-bold mb-1">{feature.title}</h6>
                                            <p className="text-muted small mb-0">{feature.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="api" className="py-5">
                    <div className="container d-flex flex-column flex-md-row align-items-center gap-5 px-3">
                        <div className="flex-grow-1 text-center text-md-start order-2 order-md-1" style={{ minWidth: '300px' }}>
                            <h2 className="fw-bold text-center text-md-start">Powerful API Access</h2>
                            <p className="text-muted fs-5 text-center text-md-start">
                                Rewardify provides a flexible REST API built with FastAPI and PostgreSQL for seamless integrations and automation.
                            </p>
                            <ul className="list-unstyled d-flex flex-column gap-2">
                                {[
                                    "Authentication: OAuth2, JWT-based login for secure sessions.",
                                    "Challenges: AI-powered dynamic generation and tracking.",
                                    "Rewards: Manage and redeem your XP points effortlessly.",
                                    "Wizard: Smart onboarding using OpenAI technologies.",
                                    "Statistics: Live tracking of streaks, XP, and level progressions."
                                ].map((item, idx) => (
                                    <li key={idx} className="d-flex align-items-start gap-2 bg-light rounded-3 p-2 shadow-sm w-100">
                                        <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>✅</span>
                                        <span className="text-muted small">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3">
                                <button className="btn btn-primary rounded-3 px-4">Explore API</button>
                            </div>
                        </div>
                        <div className="flex-shrink-1 text-center order-1 order-md-2" style={{ minWidth: '300px' }}>
                            <img src={apiImage} alt="Rewardify API" className="img-fluid rounded-4 shadow-sm img-api-db" />
                        </div>
                    </div>
                </div>

                <div id="database" className="py-5">
                    <div className="container d-flex flex-column flex-md-row align-items-center gap-5 px-3">
                        <div className="flex-shrink-1 text-center order-1" style={{ minWidth: '300px' }}>
                            <img
                                src={dbImage}
                                alt="Rewardify Database"
                                className="img-fluid rounded-4 shadow-sm"
                                style={{ width: '100%', maxWidth: '550px', height: 'auto', objectFit: 'contain' }}
                            />
                        </div>
                        <div className="flex-grow-1 text-center text-md-start order-2" style={{ minWidth: '300px' }}>
                            <h2 className="fw-bold text-center text-md-start">Robust Database Architecture</h2>
                            <p className="text-muted fs-5 text-center text-md-start">
                                Our PostgreSQL database is designed for efficiency, providing fast, scalable, and secure storage of all user, challenge, and reward data.
                            </p>
                            <ul className="list-unstyled d-flex flex-column gap-2">
                                {[
                                    "Users: Email, OAuth2 authentication, personal profiles.",
                                    "Challenges: Customizable and AI-generated tasks tracking.",
                                    "Rewards: XP-driven rewards and point redemption system.",
                                    "Statistics: Real-time tracking of achievements, streaks, levels."
                                ].map((item, idx) => (
                                    <li key={idx} className="d-flex align-items-start gap-2 bg-light rounded-3 p-2 shadow-sm w-100">
                                        <span style={{ fontSize: '1.5rem', lineHeight: '1' }}>✅</span>
                                        <span className="text-muted small">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="about" className="container py-5 mb-5 px-3">
                    <h2 className="fw-bold text-center mb-5">Meet the Team</h2>
                    <div className="row g-4 justify-content-center">
                        {[
                            { name: "Dmitriy Volynov", role: "AI Developer", img: dev1 },
                            { name: "Artyom Ostrikov", role: "Web Developer", img: dev2 },
                            { name: "Victor Pinchuk", role: "Backend Developer", img: dev3 },
                            { name: "Yaroslav Knyazev", role: "Database Developer", img: dev4 },
                        ].map((dev, idx) => (
                            <div className="col-6 col-md-3" key={idx}>
                                <div className="card p-3 rounded-4 shadow-sm text-center h-100">
                                    <img
                                        src={dev.img}
                                        alt={dev.name}
                                        className="rounded-circle mx-auto mb-3"
                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                    />
                                    <h6 className="fw-bold mb-1">{dev.name}</h6>
                                    <p className="text-muted small mb-0">{dev.role}</p>
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