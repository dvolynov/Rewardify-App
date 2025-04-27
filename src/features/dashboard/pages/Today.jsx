// Today.jsx

function Today({ userData, isMobile, menuOpen, setMenuOpen, avatar }) {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold">Today</h2>
                {isMobile && !menuOpen && (
                    <button
                        className="btn btn-light border-0 p-0"
                        style={{ background: 'transparent' }}
                        onClick={() => setMenuOpen(true)}
                    >
                        <img src={avatar} alt="Profile" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                    </button>
                )}
            </div>

            <div className="card shadow-sm p-4 mb-4 rounded-4">
                <h4 className="mb-1">Welcome, {userData.name || userData.email} 👋</h4>
                <p className="mb-0 text-muted">You're doing great! Keep it up 🚀</p>
            </div>

            <div className="card shadow-sm p-4 mb-4 rounded-4">
                <h5 className="mb-3">Weekly Progress</h5>
                <div style={{ height: '200px', backgroundColor: '#f0f0ff', borderRadius: '1rem' }}>
                    <p className="text-center pt-5 text-muted">[Chart Placeholder]</p>
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <span className="text-primary">6 habits</span>
                    <span className="text-pink">20 plans</span>
                </div>
            </div>

            <div className="row gy-3">
                {[
                    {
                        title: 'Drink water',
                        subtitle: 'Detox',
                        percent: 57,
                        color: '#ff6b81',
                        icon: '💧'
                    },
                    {
                        title: 'Do exercise',
                        subtitle: 'Change your batteries',
                        percent: 35,
                        color: '#feca57',
                        icon: '🏋️‍♂️'
                    },
                    {
                        title: 'Read Book',
                        subtitle: 'Focus',
                        percent: 70,
                        color: '#54a0ff',
                        icon: '📘'
                    }
                ].map((habit, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card shadow-sm p-3 rounded-4 d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 50, height: 50, backgroundColor: '#f5f5f5' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{habit.icon}</span>
                                </div>
                                <div>
                                    <h6 className="mb-0">{habit.title}</h6>
                                    <small className="text-muted">{habit.subtitle}</small>
                                </div>
                            </div>
                            <div className="progress mt-2" style={{ height: '8px', borderRadius: '4px' }}>
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${habit.percent}%`, backgroundColor: habit.color }}
                                    aria-valuenow={habit.percent}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                            <small className="text-end text-muted">{habit.percent}%</small>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Today;