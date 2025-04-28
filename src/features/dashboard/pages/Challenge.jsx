import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChallenges, generateChallenge, joinChallenge, updateProgress } from '../../../api/challenge';
import { getColor } from '../../../utils/get_color';
import LoadingIndicator from '../components/LoadingIndicator';
import SidebarToggleButton from '../components/SidebarToggleButton.jsx';

function Challenge({ onMenuOpen }) {
    const [inputValue, setInputValue] = useState('');
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChallenges, setLoadingChallenges] = useState(true);
    const [error, setError] = useState(null);
    const [joiningHash, setJoiningHash] = useState(null);
    const navigate = useNavigate();

    const quickPrompts = [
        "Build a morning routine",
        "30 days of coding",
        "Workout challenge",
        "Meditation practice"
    ];

    useEffect(() => {
        const loadChallenges = async () => {
            try {
                const data = await fetchChallenges();
                const formatted = (Array.isArray(data) ? data : []).map(ch => ({ ...ch, isNew: false }));
                setChallenges(formatted);
            } catch {
                setError('Failed to load challenges');
            } finally {
                setLoadingChallenges(false);
            }
        };
        loadChallenges();
    }, []);

    const handleGenerate = async (customPrompt) => {
        const prompt = customPrompt !== undefined ? customPrompt : inputValue;
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const challenge = await generateChallenge(prompt);
            if (challenge) {
                setChallenges([{ ...challenge, isNew: true }, ...challenges]);
                setInputValue('');
            }
        } catch {
            alert('Error generating challenge');
        } finally {
            setLoading(false);
        }
    };

    const handleQuickPromptClick = (prompt) => {
        setInputValue(prompt);
        setTimeout(() => {
            handleGenerate(prompt);
        }, 100);
    };

    const handleJoin = async (challengeHash) => {
        setJoiningHash(challengeHash);
        try {
            const updated = await joinChallenge(challengeHash);
            const updatedList = challenges.map(ch => (ch.hash === challengeHash ? { ...updated } : ch));
            setChallenges(updatedList);
        } catch {
            alert('Error joining challenge');
        } finally {
            setJoiningHash(null);
        }
    };

    const handleProgress = async (challengeHash) => {
        setJoiningHash(challengeHash);
        try {
            const updated = await updateProgress(challengeHash);
            const updatedList = challenges.map(ch => (ch.hash === challengeHash ? { ...updated } : ch));
            setChallenges(updatedList);
        } catch {
            alert('Error updating progress');
        } finally {
            setJoiningHash(null);
        }
    };

    const handleSelect = (challenge) => {
        navigate(`/app/challenge/${challenge.hash}`);
    };

    return (
        <div className="challenge-container d-flex flex-column flex-grow-1" style={{ height: '100vh', minHeight: 0, overflow: 'hidden', zIndex: 1 }}>
            <div className="flex-shrink-0">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-1">
                        <SidebarToggleButton onClick={onMenuOpen} />
                        <h4 className="fw-bold m-0">Challenges</h4>
                    </div>
                    <div className="card shadow-sm p-2 px-3 rounded-5 bg-white d-flex align-items-center">
                        <span className="text-muted large">
                            Total: {loadingChallenges ? (
                            <div className="spinner-border text-primary" role="status" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }} />
                        ) : (
                            <span className="text-primary">{challenges.length} challenges</span>
                        )}
                        </span>
                    </div>
                </div>

                <h6 className="text-muted fw-normal">Create a new challenge with AI</h6>
                <div className="card shadow-sm p-3 mb-4 rounded-4 bg-white border-0">
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        {quickPrompts.map((prompt, idx) => (
                            <button
                                key={idx}
                                className="btn rounded-5"
                                style={{ backgroundColor: '#e0e0e0', border: 'none', color: '#333', transition: 'background-color 0.3s' }}
                                onClick={() => handleQuickPromptClick(prompt)}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#d5d5d5'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                                disabled={loading}
                            >
                                {`+ ${prompt}`}
                            </button>
                        ))}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="d-flex gap-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Your challenge prompt"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="btn p-2 btn-primary rounded-3 d-flex align-items-center justify-content-center"
                            disabled={loading}
                            style={{ width: 85, height: 42 }}
                        >
                            {loading ? (
                                <div className="spinner-border text-light" role="status" style={{ width: '1.2rem', height: '1.2rem', borderWidth: '2px' }} />
                            ) : (
                                'Generate'
                            )}
                        </button>
                    </form>
                </div>

                <h6 className="text-muted fw-normal">Your challenges</h6>
            </div>

            <div className="flex-grow-1 overflow-y-auto overflow-x-hidden p-1">
                {loadingChallenges ? (
                    <LoadingIndicator />
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : challenges.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: '100%' }}>
                        No challenges yet
                    </div>
                ) : (
                    <div className="row row-cols-1 g-3">
                        {challenges.map(ch => {
                            const isJoined = !!ch.joined_at;
                            const progress = isJoined ? Math.round((ch.cur_day / ch.goal_days) * 100) : 0;
                            const progressColor = getColor(progress);

                            return (
                                <div key={ch.hash} className="col">
                                    <div className="d-flex rounded-4 shadow-sm p-3 gap-3 bg-white align-items-center justify-content-between">
                                        <div
                                            className="d-flex gap-3 flex-grow-1 align-items-center"
                                            onClick={() => handleSelect(ch)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div
                                                className="rounded-4 d-flex align-items-center justify-content-center bg-light fs-4 flex-shrink-0"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                {ch.icon || '🎯'}
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="fw-semibold d-flex align-items-center gap-2">
                                                    {ch.name}
                                                    {ch.isNew && <span className="badge border border-warning text-warning fw-normal">New</span>}
                                                </div>
                                                <div className="text-muted small">{ch.description || 'No description'}</div>
                                            </div>
                                        </div>
                                        <div>
                                            {!isJoined ? (
                                                <button
                                                    className="btn btn-primary rounded-3 d-flex align-items-center justify-content-center text-nowrap"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleJoin(ch.hash);
                                                    }}
                                                    disabled={joiningHash === ch.hash}
                                                    style={{ width: 60, height: 38 }}
                                                >
                                                    {joiningHash === ch.hash ? (
                                                        <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }} />
                                                    ) : (
                                                        'Join'
                                                    )}
                                                </button>
                                            ) : (
                                                <svg viewBox="0 0 36 36" width="56" height="56">
                                                    <path stroke="#eee" strokeWidth="3" fill="none" d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831" />
                                                    <path
                                                        stroke={progressColor}
                                                        strokeWidth="3"
                                                        fill="none"
                                                        strokeDasharray={`${progress}, 100`}
                                                        d="M18 2.0845a15.9155 15.9155 0 1 1 0 31.831 15.9155 15.9155 0 1 1 0-31.831"
                                                    />
                                                    <text x="18" y="20.35" textAnchor="middle" fontSize="8" fill="#555">
                                                        {progress}%
                                                    </text>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Challenge;