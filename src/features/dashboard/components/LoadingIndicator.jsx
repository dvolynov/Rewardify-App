// features/dashboard/components/LoadingIndicator.jsx

function LoadingIndicator({ fullscreen = false, message = 'Loading...' }) {
    if (fullscreen) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'white',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    style={{ width: '3rem', height: '3rem' }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="fw-semibold">{message}</h5>
                <p className="text-muted">Please wait a moment</p>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: '300px' }}>
            <div
                className="spinner-border text-muted"
                role="status"
                style={{ width: '1.5rem', height: '1.5rem', borderWidth: '2px' }}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingIndicator;