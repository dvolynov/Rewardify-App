// src/api/stats.js

import { apiClient } from './auth';

export const fetchLevelStats = async () => {
    const response = await apiClient.get('/stats/level');
    return response.data;
};
