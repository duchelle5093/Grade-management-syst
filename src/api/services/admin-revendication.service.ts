import { AxiosInstance } from 'axios';

const adminRevendicationApis = {
    CREATE_REVENDICATION_PERIOD: 'admin/revendication-period',
    UPDATE_REVENDICATION_PERIOD: 'admin/revendication-period',
    DELETE_REVENDICATION_PERIOD: 'admin/revendication-period',
    GET_ALL_REVENDICATION_PERIODS: 'revendication-period',
    GET_ACTIVE_REVENDICATION_PERIODS: 'revendication-period/active',
};

export class AdminRevendicationService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }

    // Gestion des périodes de réclamation
    async createRevendicationPeriod(periodData: {
        examId: number;
        startDate: string;
        endDate: string;
        color?: string;
        isActive?: boolean;
    }): Promise<any> {
        const response = await this._client.post(adminRevendicationApis.CREATE_REVENDICATION_PERIOD, periodData);
        return response.data;
    }

    async updateRevendicationPeriod(id: number, periodData: {
        examId: number;
        startDate: string;
        endDate: string;
        color?: string;
        isActive?: boolean;
    }): Promise<any> {
        const response = await this._client.put(`${adminRevendicationApis.UPDATE_REVENDICATION_PERIOD}/${id}`, periodData);
        return response.data;
    }

    async deleteRevendicationPeriod(id: number): Promise<void> {
        await this._client.delete(`${adminRevendicationApis.DELETE_REVENDICATION_PERIOD}/${id}`);
    }

    async getAllRevendicationPeriods(): Promise<any[]> {
        const response = await this._client.get(adminRevendicationApis.GET_ALL_REVENDICATION_PERIODS);
        return response.data;
    }

    async getActiveRevendicationPeriods(): Promise<any[]> {
        const response = await this._client.get(adminRevendicationApis.GET_ACTIVE_REVENDICATION_PERIODS);
        return response.data;
    }
}