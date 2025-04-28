// src/pages/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authenticate } from '../api/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const data = await authenticate('login', form);
            Cookies.set('auth_token', data.access_token, { expires: data.expires });
            navigate('/app');
        } catch (err) {
            setError(err.response?.data?.detail || 'Authentication failed');
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

                {/* Login Form */}
                <div
                    className="form-content w-100 bg-white rounded-4 py-4 shadow-sm px-5 mx-auto"
                    style={{ maxWidth: '450px' }}
                >
                    <h3 className="text-center mb-4">Sign in</h3>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-5">
                            <label className="form-label">Password</label>
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
                      className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                      role="button"
                      onClick={() => setShowPassword(!showPassword)}
                  />
                </span>
                            </div>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Sign in
                            </button>
                        </div>

                        <p className="text-center mt-3">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => navigate('/signup')}
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;