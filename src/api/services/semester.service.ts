import {AxiosInstance} from 'axios';
import {SemesterResDto} from "../reponse-dto/semester.res.dto";

const semesterApis = {
    GET_SEMESTERS: 'semesters',
    CREATE_SEMESTER: 'admin/semester',
    UPDATE_SEMESTER: 'admin/semester',
    UPDATE_SEMESTERS: 'admin/semester',
    DELETE_SEMESTER: 'admin/semester',
};

export class SemesterService {
    protected readonly _client: AxiosInstance;
    constructor(client: AxiosInstance) {
        this._client = client;
    }

    async getSemesters(): Promise<SemesterResDto[]> {
        const response = await this._client.get<SemesterResDto[]>(
            semesterApis.GET_SEMESTERS
        );
        return response.data;
    }

    async getActiveSemester(): Promise<SemesterResDto | null> {
        const semesters = await this.getSemesters();
        return semesters.find(semester => semester.active) || null;
    }

    async createSemester(semester: {
        name: string;
        startDate: string;
        endDate: string;
        active: boolean;
        orderIndex: number;
    }): Promise<SemesterResDto> {
        const response = await this._client.post<SemesterResDto>(
            semesterApis.CREATE_SEMESTER,
            semester
        );
        return response.data;
    }

    async updateSemester(semester: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
        active: boolean;
        orderIndex: number;
    }): Promise<SemesterResDto> {
        const response = await this._client.put<SemesterResDto>(
            `${semesterApis.UPDATE_SEMESTERS}/${semester.id}`,
            semester
        );
        return response.data;
    }

    async updateSemesters(semesters: {
        id: number;
        name: string;
        startDate: string;
        endDate: string;
        active: boolean;
        orderIndex: number;
    }[]): Promise<SemesterResDto[]> {
        const response = await this._client.put<SemesterResDto[]>(
            semesterApis.UPDATE_SEMESTERS,
            semesters
        );
        return response.data;
    }

    async deleteSemester(id: number): Promise<void> {
        await this._client.delete(`${semesterApis.DELETE_SEMESTER}/${id}`);
    }
}
