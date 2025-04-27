import { apiClient } from './auth';

export const fetchChallenges = async () => {
    const res = await apiClient.get('/challenge');
    return res.data;
};

export const fetchChallengeByHash = async (hash) => {
    const res = await apiClient.get(`/challenge/${hash}`);
    return res.data;
};

export const generateChallenge = async (prompt) => {
    const res = await apiClient.post('/challenge/generate', { prompt });
    return res.data;
};

export const joinChallenge = async (challengeHash) => {
    const res = await apiClient.patch(`/challenge/${challengeHash}/join`);
    return res.data;
};

export const updateProgress = async (challengeHash) => {
    const res = await apiClient.patch(`/challenge/${challengeHash}/progress`);
    return res.data;
};

export const deleteChallenge = async (hash) => {
    const res = await apiClient.delete(`/challenge/${hash}`);
    return res.data;
};

export const deleteAllChallenges = async () => {
    const res = await apiClient.delete('/challenge/all');
    return res;
};