import { AxiosInstance } from 'axios';

const teacherGradeApis = {
    CREATE_GRADE: 'teacher/grade',
    UPDATE_GRADE: 'teacher/grade',
    DELETE_GRADE: 'teacher/grade',
    GET_MY_GRADES: 'teacher/my-grades',
    GET_REVENDICATIONS: 'teacher/revendications',
    APPROVE_REVENDICATION: 'teacher/revendication',
    REJECT_REVENDICATION: 'teacher/revendication',
};

export class TeacherGradeService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }


    async createGrade(gradeData: {
        studentId: number;
        subjectId: number;
        examId: number;
        semesterId: number;
        ccScore?: number;
        snScore?: number;
        comments?: string;
        assessmentType: string;
    }): Promise<any> {
        const response = await this._client.post(teacherGradeApis.CREATE_GRADE, gradeData);
        return response.data;
    }

    async updateGrade(gradeId: number, gradeData: {
        studentId: number;
        subjectId: number;
        examId: number;
        semesterId: number;
        ccScore?: number;
        snScore?: number;
        comments?: string;
        assessmentType: string;
    }): Promise<any> {
        const response = await this._client.put(`${teacherGradeApis.UPDATE_GRADE}/${gradeId}`, gradeData);
        return response.data;
    }

    async deleteGrade(gradeId: number): Promise<void> {
        await this._client.delete(`${teacherGradeApis.DELETE_GRADE}/${gradeId}`);
    }

    async getMyGrades(): Promise<any[]> {
        const response = await this._client.get(teacherGradeApis.GET_MY_GRADES);

        return response.data.map((grade: any) => {

            const ccScore = typeof grade.ccScore === 'object' ? grade.ccScore?.parsedValue || 0 : grade.ccScore || 0;
            const snScore = typeof grade.snScore === 'object' ? grade.snScore?.parsedValue || 0 : grade.snScore || 0;
            
            return {
                ...grade,
                studentId: grade.student?.id,
                subjectId: grade.subject?.id,
                ccScore: ccScore,
                snScore: snScore,
                value: ccScore || snScore || 0,
                type: grade.exam
            };
        });
    }


    async getRevendications(pageNumber = 0, pageSize = 50, sortBy = 'revendicationId', sortOrder = 'asc'): Promise<any> {
        const response = await this._client.get(teacherGradeApis.GET_REVENDICATIONS, {
            params: { pageNumber, pageSize, sortBy, sortOrder }
        });
        return response.data;
    }

    async approveRevendication(id: number, comment?: string): Promise<any> {
        const params = comment ? { comment } : {};
        const response = await this._client.post(`${teacherGradeApis.APPROVE_REVENDICATION}/${id}/approve`, null, { params });
        return response.data;
    }

    async rejectRevendication(id: number, reason?: string): Promise<any> {
        const params = reason ? { reason } : {};
        const response = await this._client.post(`${teacherGradeApis.REJECT_REVENDICATION}/${id}/reject`, null, { params });
        return response.data;
    }
}