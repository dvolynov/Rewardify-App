// src/pages/Dashboard.jsx

import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Dashboard.css';

import Sidebar from '../features/dashboard/components/Sidebar';
import LoadingIndicator from '../features/dashboard/components/LoadingIndicator';
import Challenge from '../features/dashboard/pages/Challenge';
import Reward from '../features/dashboard/pages/Reward';
import Detail from '../features/dashboard/pages/Detail';
import Account from '../features/dashboard/pages/Account';
import Help from '../features/dashboard/pages/Help';
import { fetchUserData } from '../api/user';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = useCallback(() => {
        Cookies.remove('auth_token');
        Cookies.remove('user_data');
        navigate('/');
    }, [navigate]);

    const handleUserDataUpdate = useCallback((updatedData) => {
        setUserData(updatedData);
        Cookies.set('user_data', JSON.stringify(updatedData), { expires: 7 });
    }, []);

    useEffect(() => {
        const checkAuthAndLoadUser = async () => {
            const token = Cookies.get('auth_token');

            if (!token) {
                navigate('/');
                return;
            }

            const cachedUser = Cookies.get('user_data');
            if (cachedUser) {
                try {
                    setUserData(JSON.parse(cachedUser));
                } catch {
                    Cookies.remove('user_data');
                }
            } else {
                try {
                    const data = await fetchUserData();
                    setUserData(data);
                    Cookies.set('user_data', JSON.stringify(data), { expires: 7 });
                } catch {
                    Cookies.remove('auth_token');
                    Cookies.remove('user_data');
                    navigate('/');
                }
            }
        };

        checkAuthAndLoadUser();
    }, [navigate]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (location.pathname === '/app') {
            navigate('/app/challenge', { replace: true });
        }
    }, [location.pathname, navigate]);

    if (!userData) {
        return <LoadingIndicator fullscreen message="Loading dashboard..." />;
    }

    return (
        <div className="d-flex">
            <Sidebar
                user={userData}
                onLogout={handleLogout}
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
            <div
                className={`flex-grow-1 d-flex flex-column ${isMobile ? 'p-3' : 'p-5'}`}
                style={{
                    marginLeft: isMobile ? 0 : '240px',
                    height: '100vh'
                }}
            >
                <Routes>
                    <Route path="challenge" element={<Challenge onMenuOpen={() => setMenuOpen(true)} />} />
                    <Route path="challenge/:hash" element={<Detail />} />
                    <Route path="reward" element={<Reward onMenuOpen={() => setMenuOpen(true)} />} />
                    <Route path="account" element={<Account onUserDataUpdate={handleUserDataUpdate} onMenuOpen={() => setMenuOpen(true)} />} />
                    <Route path="help" element={<Help onMenuOpen={() => setMenuOpen(true)} />} />
                    <Route path="*" element={<Navigate to="/app/challenge" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;