// features/dashboard/components/Sidebar.jsx

import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../../styles/Sidebar.css';

const menuItems = [
    // { label: 'Today', icon: 'bi-calendar-event', key: 'home' },
    // { label: 'Notifications', icon: 'bi-bell', key: 'notifications' },
    { label: 'Challenges', icon: 'bi-flag', key: 'challenge' },
    { label: 'Rewards', icon: 'bi-gift', key: 'reward' },
    // { label: 'Your stats', icon: 'bi-bar-chart', key: 'stats' },
    // { label: 'Wizard', icon: 'bi-magic', key: 'wizard' },
    { label: 'Account', icon: 'bi-gear', key: 'account' },
    { label: 'Help', icon: 'bi-exclamation-circle', key: 'help' },
];

function Sidebar({ user, onLogout, isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const activeTab = location.pathname.split('/')[2] || 'challenge';

    const handleTabChange = (key) => {
        navigate(`/app/${key}`);
        onClose();
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header d-flex align-items-center justify-content-between gap-3 mb-4">
                <div className="w-100 d-flex align-items-center justify-content-between gap-2">
                    <span className="fw-semibold">{user?.name || 'User'}</span>
                    <button
                        type="button"
                        className="btn btn-close d-md-none"
                        onClick={onClose}
                    >
                    </button>
                </div>
            </div>

            <nav className="flex-grow-1">
                {menuItems.map(({ label, icon, key }) => (
                    <div
                        key={key}
                        className={`menu-item px-3 py-2 d-flex align-items-center gap-2 rounded-3 ${activeTab === key ? 'active' : ''}`}
                        onClick={() => handleTabChange(key)}
                        style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                    >
                        <i className={`bi ${icon}`} />
                        <span>{label}</span>
                    </div>
                ))}
            </nav>

            <div className="px-3 py-2">
                <button
                    type="button"
                    className="btn btn-outline-danger w-100 rounded-3"
                    onClick={onLogout}
                >
                    <i className="bi bi-box-arrow-left me-2" />
                    Log out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;