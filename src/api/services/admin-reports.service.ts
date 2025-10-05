import { AxiosInstance } from 'axios';
import { 
    GenerateReportReqDto, 
    ExportGradesReqDto 
} from '../request-dto/admin.req.dto';
import { 
    ReportGenerationResDto, 
    ExportResultResDto,
    AdminStatsResDto 
} from '../reponse-dto/admin.res.dto';

const adminReportsApis = {

    GENERATE_REPORTS: 'admin/reports/generate',
    GET_REPORT_STATUS: 'admin/reports/status',
    DOWNLOAD_REPORT: 'admin/reports/download',
    

    EXPORT_GRADES: 'admin/exports/grades',
    EXPORT_STUDENTS: 'admin/exports/students',
    EXPORT_TEACHERS: 'admin/exports/teachers',
    

    EXPORT_PRINT: 'export/print',
    EXPORT_PUBLISH: 'export/publish',
    

    GET_ADMIN_STATS: 'admin/stats',
    GET_GRADE_STATS: 'admin/stats/grades',
    

    IMPORT_STUDENTS: 'admin/imports/students',
    IMPORT_TEACHERS: 'admin/imports/teachers',
};

export class AdminReportsService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }


    async generateStudentReports(request: GenerateReportReqDto): Promise<ReportGenerationResDto> {
        const response = await this._client.post<ReportGenerationResDto>(adminReportsApis.GENERATE_REPORTS, request);
        return response.data;
    }

    async getReportStatus(jobId: string): Promise<ReportGenerationResDto> {
        const response = await this._client.get<ReportGenerationResDto>(`${adminReportsApis.GET_REPORT_STATUS}/${jobId}`);
        return response.data;
    }

    async downloadReport(jobId: string): Promise<Blob> {
        const response = await this._client.get(`${adminReportsApis.DOWNLOAD_REPORT}/${jobId}`, {
            responseType: 'blob'
        });
        return response.data;
    }


    async exportGrades(request: ExportGradesReqDto): Promise<ExportResultResDto> {
        const response = await this._client.post<ExportResultResDto>(adminReportsApis.EXPORT_GRADES, request);
        return response.data;
    }

    async exportStudents(level?: string): Promise<ExportResultResDto> {
        const params = level ? { level } : {};
        const response = await this._client.get<ExportResultResDto>(adminReportsApis.EXPORT_STUDENTS, { params });
        return response.data;
    }

    async exportTeachers(): Promise<ExportResultResDto> {
        const response = await this._client.get<ExportResultResDto>(adminReportsApis.EXPORT_TEACHERS);
        return response.data;
    }


    async getAdminStats(): Promise<AdminStatsResDto> {
        const response = await this._client.get<AdminStatsResDto>(adminReportsApis.GET_ADMIN_STATS);
        return response.data;
    }

    async getGradeStats(level?: string, semester?: string): Promise<any> {
        const params: any = {};
        if (level) params.level = level;
        if (semester) params.semester = semester;
        
        const response = await this._client.get(adminReportsApis.GET_GRADE_STATS, { params });
        return response.data;
    }


    async importStudents(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await this._client.post(adminReportsApis.IMPORT_STUDENTS, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }

    async importTeachers(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await this._client.post(adminReportsApis.IMPORT_TEACHERS, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }


    async exportPrintTranscripts(request: {
        level?: string;
        subjectId?: number;
        documentType: string;
        periodLabel?: string;
        semesterId?: number;
        studentIds?: number[];
    }): Promise<Blob> {
        const response = await this._client.post(adminReportsApis.EXPORT_PRINT, request, {
            responseType: 'blob'
        });
        return response.data;
    }

    async exportPublishTranscripts(request: {
        level?: string;
        subjectId?: number;
        documentType: string;
        periodLabel?: string;
        semesterId?: number;
        studentIds?: number[];
    }): Promise<any> {
        const response = await this._client.post(adminReportsApis.EXPORT_PUBLISH, request);
        return response.data;
    }
}