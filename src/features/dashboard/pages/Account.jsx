import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { fetchUserData, updateUser, deleteUser } from '../../../api/user';
import { deleteAllChallenges } from '../../../api/challenge';
import { deleteAllRewards } from '../../../api/reward';

import Countries from '../../landing/components/Countries';
import LoadingIndicator from '../components/LoadingIndicator';
import SidebarToggleButton from '../components/SidebarToggleButton';

function Account({ onUserDataUpdate, onMenuOpen }) {
    const [form, setForm] = useState({ name: '', email: '', old_password: '', new_password: '', country: '' });
    const [editMode, setEditMode] = useState({ name: false, email: false, password: false, country: false });
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [deletingChallenges, setDeletingChallenges] = useState(false);
    const [deletingRewards, setDeletingRewards] = useState(false);
    const [deletingAccount, setDeletingAccount] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const cachedUser = Cookies.get('user_data');
        if (cachedUser) {
            try {
                const parsed = JSON.parse(cachedUser);
                setForm({ name: parsed.name, email: parsed.email, old_password: '', new_password: '', country: parsed.country });
                setLoading(false);
            } catch {
                Cookies.remove('user_data');
                loadUser();
            }
        } else {
            loadUser();
        }
    }, []);

    const loadUser = async () => {
        try {
            const data = await fetchUserData();
            setForm({ name: data.name, email: data.email, old_password: '', new_password: '', country: data.country });
        } catch {
            setErrorMessage('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleEdit = (field) => {
        setEditMode(prev => ({ ...prev, [field]: true }));
    };

    const handleCancel = (field) => {
        setEditMode(prev => ({ ...prev, [field]: false }));
        loadUser();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const payload = {
                name: form.name,
                email: form.email,
                country: form.country,
            };
            if (form.old_password && form.new_password) {
                payload.old_password = form.old_password;
                payload.new_password = form.new_password;
            }
            const updatedData = await updateUser(payload);
            setForm({ ...updatedData, old_password: '', new_password: '' });

            if (onUserDataUpdate) {
                onUserDataUpdate(updatedData);
            }
            setSuccessMessage('Profile updated successfully!');
            setEditMode({ name: false, email: false, password: false, country: false });
        } catch (error) {
            const message = error.response?.data?.detail || 'Failed to update profile';
            setErrorMessage(message);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteAllChallenges = async () => {
        if (window.confirm('Are you sure you want to delete all your challenges?')) {
            setDeletingChallenges(true);
            try {
                await deleteAllChallenges();
                setSuccessMessage('All challenges deleted successfully!');
                setErrorMessage('');
            } catch (error) {
                const message = error.response?.data?.detail || 'Failed to delete challenges.';
                setErrorMessage(message);
                setSuccessMessage('');
            } finally {
                setDeletingChallenges(false);
            }
        }
    };

    const handleDeleteAllRewards = async () => {
        if (window.confirm('Are you sure you want to delete all your rewards?')) {
            setDeletingRewards(true);
            try {
                await deleteAllRewards();
                setSuccessMessage('All rewards deleted successfully!');
                setErrorMessage('');
            } catch (error) {
                const message = error.response?.data?.detail || 'Failed to delete rewards.';
                setErrorMessage(message);
                setSuccessMessage('');
            } finally {
                setDeletingRewards(false);
            }
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setDeletingAccount(true);
            try {
                await deleteUser();
                navigate('/login');
            } catch (error) {
                const message = error.response?.data?.detail || 'Failed to delete account.';
                setErrorMessage(message);
            } finally {
                setDeletingAccount(false);
            }
        }
    };

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div className="d-flex flex-column gap-4" style={{ height: '100vh', overflowY: 'auto', zIndex: 1 }}>
            <div className="d-flex align-items-center gap-1">
                <SidebarToggleButton onClick={onMenuOpen} />
                <h4 className="fw-bold m-0">Account</h4>
            </div>

            <div className="card p-4 shadow-sm rounded-4 bg-white border-0">
                {errorMessage && (
                    <div className="w-100 p-3 rounded-3 mb-3" style={{ backgroundColor: '#f8d7da', color: '#58151c', border: '1px solid #f1aeb5' }}>
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="w-100 p-3 rounded-3 mb-3" style={{ backgroundColor: '#d1e7dd', color: '#0f5132', border: '1px solid #a3cfbb' }}>
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    {['name', 'email', 'password', 'country'].map((field) => (
                        <div key={field} className="d-flex flex-column gap-1">
                            <div className="d-flex align-items-center gap-2">
                                <div className="small text-capitalize">{field.replace('_', ' ')}</div>
                                <div className="flex-grow-1">
                                    <hr className="my-0 mx-2 p-0" style={{ borderTop: '1px solid lightgray' }} />
                                </div>
                            </div>

                            <div className="rounded-4 d-flex justify-content-between align-items-center">
                                <div className="flex-grow-1">
                                    {editMode[field] ? (
                                        field === 'country' ? (
                                            <Countries form={form} setForm={setForm} />
                                        ) : field === 'password' ? (
                                            <div className="d-flex flex-column gap-2">
                                                <div className="input-group">
                                                    <input
                                                        type={showOldPassword ? 'text' : 'password'}
                                                        name="old_password"
                                                        className="form-control"
                                                        placeholder="Current password"
                                                        value={form.old_password}
                                                        onChange={handleChange}
                                                        disabled={saving}
                                                    />
                                                    <span className="input-group-text bg-white border-start-0">
                                                        <i
                                                            className={`bi ${showOldPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                                                            role="button"
                                                            onClick={() => setShowOldPassword(!showOldPassword)}
                                                        />
                                                    </span>
                                                </div>

                                                <div className="input-group">
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        name="new_password"
                                                        className="form-control"
                                                        placeholder="New password"
                                                        value={form.new_password}
                                                        onChange={handleChange}
                                                        disabled={saving}
                                                    />
                                                    <span className="input-group-text bg-white border-start-0">
                                                        <i
                                                            className={`bi ${showNewPassword ? 'bi-eye' : 'bi-eye-slash'}`}
                                                            role="button"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                name={field}
                                                className="form-control rounded-3"
                                                placeholder={`Enter your ${field}`}
                                                value={form[field]}
                                                onChange={handleChange}
                                                disabled={saving}
                                            />
                                        )
                                    ) : (
                                        <div className="fw-medium text-dark">{field === 'password' ? '********' : form[field] || '—'}</div>
                                    )}
                                </div>
                                <div className="ms-3 d-flex align-items-center">
                                    {editMode[field] ? (
                                        <div className="d-flex gap-2">
                                            <button type="submit" className="btn btn-sm btn-primary rounded-3 py-2 px-3">Save</button>
                                            <button type="button" className="btn btn-sm btn-outline-primary rounded-3 py-2 px-3" onClick={() => handleCancel(field)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <button type="button" className="btn btn-sm btn-outline-primary rounded-3 py-2 px-3" onClick={() => handleEdit(field)}>Edit</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <hr className="my-0 mx-2 p-0" style={{ borderTop: '1px solid lightgray' }} />

                    <div className="d-flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="btn btn-outline-danger rounded-3 d-flex align-items-center justify-content-center"
                            onClick={handleDeleteAllChallenges}
                            disabled={deletingChallenges || deletingRewards || deletingAccount}
                            style={{ width: 180, height: 42 }}
                        >
                            {deletingChallenges ? (
                                <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                            ) : 'Delete All Challenges'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-danger rounded-3 d-flex align-items-center justify-content-center"
                            onClick={handleDeleteAllRewards}
                            disabled={deletingChallenges || deletingRewards || deletingAccount}
                            style={{ width: 165, height: 42 }}
                        >
                            {deletingRewards ? (
                                <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                            ) : 'Delete All Rewards'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-danger rounded-3 d-flex align-items-center justify-content-center"
                            onClick={handleDeleteAccount}
                            disabled={deletingChallenges || deletingRewards || deletingAccount}
                            style={{ width: 140, height: 42 }}
                        >
                            {deletingAccount ? (
                                <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                            ) : 'Delete Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Account;