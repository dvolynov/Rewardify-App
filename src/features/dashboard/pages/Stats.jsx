import '../../styles/Dashboard.css';

function Stats() {
    return (
        <div className="stats-container">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <h2 className="fw-bold">Statistic</h2>
                <select className="form-select w-auto rounded-pill bg-light border-0 shadow-sm px-3" style={{ maxWidth: '160px' }}>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>This year</option>
                </select>
            </div>

            <div className="row gy-3">
                <div className="col-md-6">
                    <div className="card shadow-sm p-4 rounded-4 bg-light-blue text-dark h-100">
                        <small className="fw-semibold text-primary">Streak</small>
                        <h3 className="fw-bold mb-1">2 days</h3>
                        <p className="text-muted mb-0">Your current streak</p>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm p-4 rounded-4 bg-light-purple text-dark h-100">
                        <small className="fw-semibold text-primary">Progress</small>
                        <h3 className="fw-bold mb-1">60%</h3>
                        <p className="text-muted mb-0">Plan for 2021</p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="card shadow-sm p-4 rounded-4 text-center h-100">
                        <h4 className="fw-bold">13 days</h4>
                        <p className="text-muted small mb-0">Total perfect days</p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="card shadow-sm p-4 rounded-4 text-center h-100">
                        <h4 className="fw-bold">6.8</h4>
                        <p className="text-muted small mb-0">Average per daily</p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="card shadow-sm p-4 rounded-4 text-center h-100">
                        <h4 className="fw-bold">50%</h4>
                        <p className="text-muted small mb-0">Habit completion rate</p>
                    </div>
                </div>

                <div className="col-6 col-md-3">
                    <div className="card shadow-sm p-4 rounded-4 text-center h-100">
                        <h4 className="fw-bold">8 habits</h4>
                        <p className="text-muted small mb-0">Total habits builded</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;