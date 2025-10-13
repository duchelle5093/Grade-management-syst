import { createAsyncThunk } from '@reduxjs/toolkit';
import { teacherGradeService, studentRevendicationService } from '../../api/configs';


export const fetchTeacherRevendications = createAsyncThunk(
    'revendications/fetchTeacherRevendications',
    async (params: { pageNumber?: number; pageSize?: number; sortBy?: string; sortOrder?: string } = {}) => {
        const response = await teacherGradeService.getRevendications(
            params.pageNumber,
            params.pageSize,
            params.sortBy,
            params.sortOrder
        );
        return response;
    }
);

export const approveRevendication = createAsyncThunk(
    'revendications/approve',
    async ({ id, comment }: { id: number; comment?: string }) => {
        const response = await teacherGradeService.approveRevendication(id, comment);
        return response;
    }
);

export const rejectRevendication = createAsyncThunk(
    'revendications/reject',
    async ({ id, reason }: { id: number; reason?: string }) => {
        const response = await teacherGradeService.rejectRevendication(id, reason);
        return response;
    }
);


export const createRevendication = createAsyncThunk(
    'revendications/create',
    async (revendicationData: {
        period: { examId: number; examType: string; };
        student: { studentId: number; };
        grade: { gradeId: number; };
        semester: { semesterId: number; };
        requestedScore: number;
        description: string;
    }) => {
        const response = await studentRevendicationService.createRevendication(revendicationData);
        return response;
    }
);

export const fetchStudentRevendications = createAsyncThunk(
    'revendications/fetchStudentRevendications',
    async (studentId: number) => {
        const response = await studentRevendicationService.getStudentRevendications(studentId);
        return response;
    }
);


export const fetchRevendicationPeriods = createAsyncThunk(
    'revendications/fetchPeriods',
    async () => {
        const response = await studentRevendicationService.getAllRevendicationPeriods();
        return response;
    }
);

export const fetchActiveRevendicationPeriods = createAsyncThunk(
    'revendications/fetchActivePeriods',
    async () => {
        const response = await studentRevendicationService.getActiveRevendicationPeriods();
        return response;
    }
);