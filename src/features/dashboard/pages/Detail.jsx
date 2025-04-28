import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchChallengeByHash, joinChallenge, updateProgress, deleteChallenge } from '../../../api/challenge';
import { getColor } from '../../../utils/get_color';
import LoadingIndicator from '../components/LoadingIndicator';

function Detail() {
    const { hash } = useParams();
    const navigate = useNavigate();
    const [challenge, setChallenge] = useState(null);
    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joiningId, setJoiningId] = useState(null);
    const todayRef = useRef(null);

    useEffect(() => {
        const loadChallenge = async () => {
            try {
                const data = await fetchChallengeByHash(hash);
                setChallenge(data);
                setPlan(data.plan || []);
            } catch {
                // handle error
            } finally {
                setLoading(false);
            }
        };
        loadChallenge();
    }, [hash]);

    useEffect(() => {
        if (!loading && todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [loading]);

    const handleJoin = async () => {
        if (!challenge) return;
        setJoiningId('join');
        try {
            const updated = await joinChallenge(challenge.hash);
            setChallenge(updated);
        } catch {
            alert('Failed to join challenge.');
        } finally {
            setJoiningId(null);
        }
    };

    const handleProgress = async (day) => {
        if (!challenge) return;
        setJoiningId(`complete-${day}`);
        try {
            const updated = await updateProgress(challenge.hash);
            setChallenge(updated);
        } catch {
            alert('Failed to complete step.');
        } finally {
            setJoiningId(null);
        }
    };

    const handleGiveUp = async () => {
        if (!challenge) return;
        if (!window.confirm('Are you sure you want to give up and delete this challenge?')) return;
        setJoiningId('giveup');
        try {
            await deleteChallenge(challenge.hash);
            navigate('/app/challenge');
        } catch {
            alert('Failed to delete challenge.');
        } finally {
            setJoiningId(null);
        }
    };

    if (loading) {
        return <LoadingIndicator fullscreen message="Loading challenge..." />;
    }

    if (!challenge) {
        return <p className="text-danger text-center">No challenge data available.</p>;
    }

    const { name, description, cur_day, goal_days, icon, created_at, joined_at } = challenge;
    const started = !!joined_at;
    const completed = cur_day >= goal_days;
    const progress = started ? Math.round((cur_day / goal_days) * 100) : 0;
    const dateLabel = completed ? 'Finished at' : started ? 'Joined at' : 'Created at';
    const dateValue = new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return (
        <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0, zIndex: 1 }}>
            <div className="flex-shrink-0 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <button
                        className="btn btn-link text-decoration-none text-dark d-flex align-items-center gap-2 p-0 rounded-5 shadow-sm px-3 py-2"
                        style={{ backgroundColor: 'white', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0f0f0'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                        onClick={() => navigate('/app/challenge')}
                    >
                        <i className="bi bi-arrow-left" />
                        Back
                    </button>
                    {started ? (
                        <button
                            className="btn btn-outline-danger rounded-5 d-flex align-items-center justify-content-center"
                            onClick={handleGiveUp}
                            disabled={joiningId !== null}
                            style={{ width: 90, height: 38 }}
                        >
                            {joiningId === 'giveup' ? (
                                <div className="spinner-border spinner-border-sm text-danger" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (completed ? 'Delete' : 'Give up')}
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary rounded-5 d-flex align-items-center justify-content-center"
                            onClick={handleJoin}
                            disabled={joiningId !== null}
                            style={{ width: 135, height: 38 }}
                        >
                            {joiningId === 'join' ? (
                                <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                            ) : 'Join Challenge'}
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-shrink-0 mb-3">
                <div className="card shadow-sm p-4 mb-3 rounded-4 bg-white border-0">
                    <div className="d-flex justify-content-between align-items-start">
                        <div className="d-flex flex-column">
                            <h5 className="fw-semibold mb-1">{name}</h5>
                            <p className="text-muted small mb-0">{description}</p>
                        </div>
                        <div className="rounded-4 d-flex align-items-center justify-content-center bg-light fs-2" style={{ width: 56, height: 56 }}>
                            {icon || '🎯'}
                        </div>
                    </div>

                    {started && (
                        <div className="d-flex flex-column gap-2 mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-medium small">{progress}% completed</span>
                                <span className="text-muted small">{dateLabel}: {dateValue}</span>
                            </div>
                            <div style={{ width: '100%', height: 6, backgroundColor: '#f1f1f1', borderRadius: 999 }}>
                                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: getColor(progress), borderRadius: 999, transition: 'width 0.3s ease' }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-grow-1 overflow-y-auto overflow-x-hidden px-3">
                <div style={{ paddingBottom: 80 }}>
                    {plan.length === 0 ? (
                        <p className="text-center text-muted">No plan available.</p>
                    ) : (
                        plan.map((item) => {
                            const isToday = started && item.day === cur_day + 1;
                            const isPast = started && item.day <= cur_day;

                            return (
                                <div key={item.id} className="position-relative pb-2 d-flex flex-column align-items-start" ref={isToday ? todayRef : null}>
                                    <div className="position-absolute" style={{ top: 10, left: 17, zIndex: 10 }}>
                                        <span className="text-muted">{`Day ${item.day}`}</span>
                                    </div>
                                    <div className="d-flex gap-3 mt-4 w-100">
                                        <div className="flex-grow-1">
                                            <div className="card shadow-sm rounded-4 p-3 d-flex flex-row align-items-center justify-content-between">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0 bg-light" style={{ width: 42, height: 42, fontSize: '1.2rem' }}>
                                                        {item.icon || '🔔'}
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-semibold mb-1">{item.title}</h6>
                                                        <p className="text-muted small mb-0">{item.description}</p>
                                                    </div>
                                                </div>
                                                {isPast ? (
                                                    <button className="btn btn-outline-success rounded-3" disabled style={{ width: 110, height: 38 }}>Completed</button>
                                                ) : isToday ? (
                                                    <button
                                                        className="btn btn-success d-flex align-items-center justify-content-center rounded-3"
                                                        onClick={() => handleProgress(item.day)}
                                                        disabled={joiningId !== null}
                                                        style={{ width: 110, height: 38 }}
                                                    >
                                                        {joiningId === `complete-${item.day}` ? (
                                                            <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                                                        ) : 'Complete'}
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Detail;