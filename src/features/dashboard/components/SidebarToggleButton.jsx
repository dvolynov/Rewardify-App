// src/components/ui/SidebarToggleButton.jsx

import { useEffect, useState } from 'react';

function SidebarToggleButton({ onClick }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!isMobile) return null;

    return (
        <button
            type="button"
            className="btn btn-light border me-3 d-flex align-items-center justify-content-center"
            style={{ width: 36, height: 36, borderRadius: '10px' }}
            onClick={onClick}
        >
            <i className="bi bi-list" style={{ fontSize: '1.2rem' }}></i>
        </button>
    );
}

export default SidebarToggleButton;