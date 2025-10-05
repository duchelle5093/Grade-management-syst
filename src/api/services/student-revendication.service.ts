import { AxiosInstance } from 'axios';

const studentRevendicationApis = {
    CREATE_REVENDICATION: 'student/revendication',
    GET_REVENDICATIONS: 'student',
    GET_TRANSCRIPT: 'student/transcript',
    GET_REVENDICATION_PERIODS: 'revendication-period',
    GET_ACTIVE_REVENDICATION_PERIODS: 'revendication-period/active',
};

export class StudentRevendicationService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }


    async createRevendication(revendicationData: {
        period: any;
        student: any;
        grade: any;
        semester: any;
        requestedScore: number;
        description: string;
    }): Promise<any> {
        const response = await this._client.post(studentRevendicationApis.CREATE_REVENDICATION, revendicationData);
        return response.data;
    }

    async getStudentRevendications(studentId: number): Promise<any[]> {
        const response = await this._client.get(`${studentRevendicationApis.GET_REVENDICATIONS}/${studentId}/revendications`);
        return response.data;
    }


    async getTranscript(): Promise<any> {
        const response = await this._client.get(studentRevendicationApis.GET_TRANSCRIPT);
        return response.data;
    }


    async getAllRevendicationPeriods(): Promise<any[]> {
        const response = await this._client.get(studentRevendicationApis.GET_REVENDICATION_PERIODS);
        return response.data;
    }

    async getActiveRevendicationPeriods(): Promise<any[]> {
        const response = await this._client.get(studentRevendicationApis.GET_ACTIVE_REVENDICATION_PERIODS);
        return response.data;
    }
}