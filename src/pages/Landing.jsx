import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Landing.css';

import Navbar from '../features/landing/components/Navbar.jsx';
import heroImage from '../assets/hero-image.png';
import dev1 from '../assets/dvolynov.png';
import dev2 from '../assets/aostrikov.png';
import dev3 from '../assets/vpinchuk.png';
import dev4 from '../assets/yknyazev.png';

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-wrapper d-flex flex-column min-vh-100">
            <Navbar />

            <div className="flex-grow-1 pt-5">
                {/* Hero Section */}
                <div className="container py-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
                    <div className="text-center text-md-start">
                        <h1 className="fw-bold mb-3">Turn Best Habits<br />Into Daily Rewards</h1>
                        <p className="text-muted mb-4">
                            Build lasting habits through AI-powered challenges and earn real-life rewards.
                        </p>
                        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                            <button className="btn btn-primary rounded-3 px-4" onClick={() => navigate('/signup')}>Get Started</button>
                            <a className="btn btn-outline-primary rounded-3 px-4" href="https://github.com/dvolynov/Rewardify" target="_blank" rel="noreferrer">GitHub</a>
                        </div>
                    </div>
                    <div className="text-center d-none d-md-block">
                        <img src={heroImage} alt="Rewardify Hero" className="img-fluid rounded-4 shadow-sm" style={{ maxHeight: '380px' }} />
                    </div>
                </div>

                {/* Main Features */}
                <div className="py-5">
                    <div className="container text-center">
                        <h2 className="fw-bold mb-5">Rewardify’s Technology Edge</h2>
                        <div className="row g-4">
                            {[
                                { icon: "🎯", title: "AI Challenge Generator", desc: "Generate smart, personalized daily tasks based on your goals." },
                                { icon: "🏆", title: "Reward System", desc: "Earn points by completing challenges and redeem them for your custom rewards." },
                                { icon: "🧙‍♂️", title: "AI Wizard Onboarding", desc: "Get personalized recommendations powered by OpenAI GPT-4." },
                                { icon: "📈", title: "Motivation Mechanics", desc: "Maintain chain streaks, unlock bonuses, and experience progressive loading." },
                                { icon: "⏰", title: "Time Context Engine", desc: "Tasks adapt to your day: morning, afternoon, evening." },
                                { icon: "🔒", title: "Private & Secure", desc: "Your data remains protected, encrypted, and private." },
                            ].map((feature, idx) => (
                                <div className="col-md-4" key={idx}>
                                    <div className="p-4 rounded-4 shadow-sm bg-white h-100 d-flex flex-column align-items-center">
                                        <div style={{ fontSize: '2.5rem' }}>{feature.icon}</div>
                                        <h5 className="fw-bold mt-3">{feature.title}</h5>
                                        <p className="text-muted small">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Developers Section */}
                <div className="container py-5 mb-5">
                    <h2 className="fw-bold text-center mb-5">Meet the Team</h2>
                    <div className="row g-4 justify-content-center">
                        {[
                            { name: "Dmitriy Volynov", role: "AI Developer", img: dev1 },
                            { name: "Artyom Ostrikov", role: "Web Developer", img: dev2 },
                            { name: "Victor Pinchuk", role: "Backend Developer", img: dev3 },
                            { name: "Yaroslav Knyazev", role: "Database Developer", img: dev4 },
                        ].map((dev, idx) => (
                            <div className="col-md-3" key={idx}>
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
            </div>

            {/* Footer */}
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