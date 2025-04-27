import { apiClient } from './auth';

export const fetchRewards = async () => {
    const response = await apiClient.get('/reward/');
    return response.data;
};

export const generateReward = async (data) => {
    const response = await apiClient.post('/reward/generate', data);
    return response.data;
};

export const claimReward = async (rewardHash) => {
    const response = await apiClient.patch(`/reward/${rewardHash}/claim`);
    return response.data;
};

export const fetchRewardByHash = async (rewardHash) => {
    const response = await apiClient.get(`/reward/${rewardHash}`);
    return response.data;
};

export const deleteReward = async (rewardHash) => {
    const response = await apiClient.delete(`/reward/${rewardHash}`);
    return response.status === 204;
};

export const deleteAllRewards = async () => {
    const response = await apiClient.delete('/reward/all');
    return response.status === 204;
};