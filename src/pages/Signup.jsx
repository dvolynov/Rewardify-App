// src/pages/Signup.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authenticate } from '../api/auth';
import Countries from '../features/landing/components/Countries';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await authenticate('register', form);
            Cookies.set('auth_token', data.access_token, { expires: data.expires });
            navigate('/app');
        } catch (err) {
            setError(err.response?.data?.detail || 'Registration failed');
        }
    };

    return (
        <div className="signup-wrapper d-flex flex-column flex-md-row bg-body-secondary min-vh-100">
            <div className="form-container d-flex flex-column align-items-center justify-content-center w-100 w-md-50 p-4 position-relative">
                {/* Back Button */}
                <div className="position-absolute top-0 start-0 m-3">
                    <button
                        className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 p-0 rounded-5 shadow-sm px-3 py-2"
                        style={{ backgroundColor: 'white', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                        onClick={() => navigate('/')}
                    >
                        <i className="bi bi-arrow-left" />
                        Back
                    </button>
                </div>

                {/* Signup Form */}
                <div
                    className="form-content w-100 bg-white rounded-4 py-4 px-5 shadow-sm mx-auto"
                    style={{ maxWidth: '450px' }}
                >
                    <h3 className="text-center mb-4">Create account</h3>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                <span className="text-danger">*</span> Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <span className="text-danger">*</span> Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <span className="text-danger">*</span> Password
                            </label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                                <span className="input-group-text bg-white border-start-0">
                  <i
                      className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                <span className="text-danger">*</span> Country
                            </label>
                            <Countries form={form} setForm={setForm} />
                        </div>

                        <div className="form-check my-4">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="agree"
                                required
                            />
                            <label className="form-check-label" htmlFor="agree">
                                I agree to the Terms and Conditions
                            </label>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign up
                            </button>
                        </div>

                        <p className="text-center mt-3">
                            Already have an account?{' '}
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => navigate('/login')}
                            >
                                Sign in
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;