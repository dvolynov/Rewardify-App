import { useEffect, useState } from 'react';
import { fetchRewards, generateReward, claimReward } from '../../../api/reward';
import { fetchLevelStats } from '../../../api/stats';
import LoadingIndicator from '../components/LoadingIndicator';
import SidebarToggleButton from '../components/SidebarToggleButton';

function Reward({ onMenuOpen }) {
    const [inputValue, setInputValue] = useState('');
    const [rewards, setRewards] = useState([]);
    const [availablePoints, setAvailablePoints] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingRewards, setLoadingRewards] = useState(true);
    const [error, setError] = useState(null);
    const [claimingHash, setClaimingHash] = useState(null);

    const quickPrompts = [
        "Coffee break",
        "Watch an episode",
        "Buy a snack",
        "1 hour of gaming"
    ];

    const loadRewardsAndPoints = async () => {
        try {
            const [rewardData, statsData] = await Promise.all([
                fetchRewards(),
                fetchLevelStats()
            ]);

            const formattedRewards = (Array.isArray(rewardData) ? rewardData : []).map(r => ({ ...r, isNew: false, claimed: !!r.claimed_at }));
            setRewards(formattedRewards);
            setAvailablePoints(statsData.points_total);
        } catch {
            setError('Failed to load rewards or stats');
        } finally {
            setLoadingRewards(false);
        }
    };

    useEffect(() => {
        loadRewardsAndPoints();
    }, []);

    const handleGenerate = async (customPrompt) => {
        const prompt = customPrompt !== undefined ? customPrompt : inputValue;
        if (!prompt.trim()) return;
        setLoading(true);
        try {
            const reward = await generateReward({ prompt });
            if (reward) {
                setRewards([{ ...reward, isNew: true, claimed: false }, ...rewards]);
                setInputValue('');
            }
        } catch {
            alert('Error generating reward');
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

    const handleClaim = async (rewardHash, costPoints) => {
        if (availablePoints < costPoints) {
            alert('Not enough points to claim this reward.');
            return;
        }
        setClaimingHash(rewardHash);
        try {
            await claimReward(rewardHash);
            setRewards(prev => prev.map(r => r.hash === rewardHash ? { ...r, claimed: true, claimed_at: new Date().toISOString(), isNew: false } : { ...r, isNew: false }));
            const stats = await fetchLevelStats();
            setAvailablePoints(stats.points_total);
        } catch {
            alert('Error claiming reward');
        } finally {
            setClaimingHash(null);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const parts = new Date(dateString).toLocaleDateString('en-US', options).split(' ');
        if (parts.length === 3) {
            return `${parts[0]} ${parts[1]} ${parts[2]}`;
        }
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="reward-container d-flex flex-column flex-grow-1" style={{ height: '100vh', minHeight: 0, overflow: 'hidden', zIndex: 1 }}>
            <div className="flex-shrink-0">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center gap-1">
                        <SidebarToggleButton onClick={onMenuOpen} />
                        <h4 className="fw-bold m-0">Rewards</h4>
                    </div>
                    <div className="card shadow-sm p-2 px-3 rounded-5 bg-white d-flex align-items-center">
                        <span className="text-muted large">
                            Available: {loadingRewards ? (
                            <div className="spinner-border text-primary" role="status" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }} />
                        ) : (
                            <span className="text-primary">{availablePoints} points</span>
                        )}
                        </span>
                    </div>
                </div>
                <h6 className="text-muted fw-normal">Create a new reward with AI</h6>
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
                            placeholder="Your reward idea"
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
                <h6 className="text-muted fw-normal">Your rewards</h6>
            </div>

            <div className="flex-grow-1 overflow-y-auto overflow-x-hidden p-1">
                {loadingRewards ? (
                    <LoadingIndicator />
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : rewards.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: '100%' }}>
                        No rewards yet
                    </div>
                ) : (
                    <div className="row row-cols-1 g-3">
                        {rewards.map(reward => {
                            const notEnoughPoints = availablePoints < reward.cost_points;
                            const isDisabled = claimingHash === reward.hash || reward.claimed || notEnoughPoints;
                            const buttonClass = reward.claimed ? 'btn btn-outline-success' : notEnoughPoints ? 'btn btn-success' : 'btn btn-success';

                            return (
                                <div key={reward.hash} className="col">
                                    <div className="d-flex rounded-4 shadow-sm p-3 gap-3 bg-white align-items-center justify-content-between">
                                        <div
                                            className="d-flex gap-3 flex-grow-1 align-items-center"
                                            style={{ cursor: 'default' }}
                                        >
                                            <div
                                                className="rounded-4 d-flex align-items-center justify-content-center bg-light fs-4 flex-shrink-0"
                                                style={{ width: 45, height: 45 }}
                                            >
                                                {reward.icon || '🎁'}
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="fw-semibold d-flex align-items-center gap-2">
                                                    {reward.name}
                                                    {reward.isNew && <span className="badge border border-warning text-warning fw-normal">New</span>}
                                                    {reward.claimed && <span className="badge border border-success text-success fw-normal">Claimed on {formatDate(reward.claimed_at)}</span>}
                                                </div>
                                                <div className="text-muted small">{reward.description || 'No description'}</div>
                                            </div>
                                        </div>
                                        <button
                                            className={buttonClass + " rounded-3 d-flex align-items-center justify-content-center text-nowrap"}
                                            onClick={() => handleClaim(reward.hash, reward.cost_points)}
                                            disabled={isDisabled}
                                            style={{ width: 100, height: 38 }}
                                        >
                                            {claimingHash === reward.hash ? (
                                                <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }} />
                                            ) : reward.claimed ? (
                                                `${reward.cost_points} points`
                                            ) : (
                                                `-${reward.cost_points} points`
                                            )}
                                        </button>
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

export default Reward;
