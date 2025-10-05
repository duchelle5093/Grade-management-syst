import { AxiosInstance } from 'axios';

export interface GradingWindowResponse {
    revendicationPeriodId: number;
    exam: {
        examPeriodId: number;
        assessmentType: string;
    };
    semester: any;
    startDate: string;
    endDate: string;
    color?: string;
    isActive: boolean;
    createdDate: string;
    lastModifiedDate: string;

    id: number;
    name: string;
    shortName: string;
    type: string;
    order: number;
}

export interface GradingWindowRequest {
    examId: number;
    startDate: string;
    endDate: string;
    color?: string;
    isActive?: boolean;

    semesterId?: number;
    name?: string;
    shortName?: string;
    type?: string;
    order?: number;
}

const gradingWindowsApis = {
    GET_ALL_GRADING_WINDOWS: 'revendication-period',
    CREATE_GRADING_WINDOW: 'admin/revendication-period',
    UPDATE_GRADING_WINDOW: 'admin/revendication-period',
    DELETE_GRADING_WINDOW: 'admin/revendication-period',
    GET_ACTIVE_GRADING_WINDOWS: 'revendication-period/active',
};

export class GradingWindowsService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }

    async getAllGradingWindows(): Promise<GradingWindowResponse[]> {
        const response = await this._client.get<GradingWindowResponse[]>(gradingWindowsApis.GET_ALL_GRADING_WINDOWS);
        return response.data;
    }

    async createGradingWindow(windowData: GradingWindowRequest): Promise<GradingWindowResponse> {
        const response = await this._client.post<GradingWindowResponse>(gradingWindowsApis.CREATE_GRADING_WINDOW, windowData);
        return response.data;
    }

    async updateGradingWindow(id: number, windowData: GradingWindowRequest): Promise<GradingWindowResponse> {
        const response = await this._client.put<GradingWindowResponse>(`${gradingWindowsApis.UPDATE_GRADING_WINDOW}/${id}`, windowData);
        return response.data;
    }

    async deleteGradingWindow(id: number): Promise<void> {
        await this._client.delete(`${gradingWindowsApis.DELETE_GRADING_WINDOW}/${id}`);
    }

    async getActiveGradingWindows(): Promise<GradingWindowResponse[]> {
        const response = await this._client.get<GradingWindowResponse[]>(gradingWindowsApis.GET_ACTIVE_GRADING_WINDOWS);
        return response.data;
    }
}