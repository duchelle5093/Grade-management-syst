import { createAsyncThunk } from '@reduxjs/toolkit';
import { gradeService, teacherGradeService } from '../../api/configs';
import {
    CreateGradeReqDto,
    CreateGradeByCodeReqDto,
    UpdateGradeReqDto,
} from '../../api/reponse-dto/grade.res.dto';
import {GradeClaimReqDto} from "../../api/request-dto/gradeClaim.req.dto.ts";
import {GradeClaimResDto} from "../../api/reponse-dto/gradeClaim.res.dto.ts";
import { PeriodLabel } from '../../api/enums';

export const fetchTeacherGrades = createAsyncThunk(
    'grades/fetchTeacherGrades',
    async () => {
        const response = await teacherGradeService.getMyGrades();
        return response;
    }
);

export const fetchStudentGrades = createAsyncThunk(
    'grades/fetchStudentGrades',
    async (studentId: number) => {
        const response = await gradeService.getStudentGrades(studentId);
        return response;
    }
);

export const createGrade = createAsyncThunk(
    'grades/create',
    async (gradeData: CreateGradeReqDto) => {
        const response = await teacherGradeService.createGrade({
            studentId: gradeData.studentId,
            subjectId: gradeData.subjectId,
            examId: gradeData.examId || 1,
            semesterId: gradeData.semesterId,
            ccScore: gradeData.type === PeriodLabel.CC1 || gradeData.type === PeriodLabel.CC2 ? gradeData.value : undefined,
            snScore: gradeData.type === PeriodLabel.SN1 || gradeData.type === PeriodLabel.SN2 ? gradeData.value : undefined,
            comments: gradeData.comments,
            assessmentType: gradeData.type
        });
        return response;
    }
);

export const createGradeByCode = createAsyncThunk(
    'grades/createByCode',
    async (gradeData: CreateGradeByCodeReqDto) => {
        const response = await gradeService.createGradeByCode(gradeData);
        return response;
    }
);

export const updateGrade = createAsyncThunk(
    'grades/update',
    async ({ gradeId, gradeData }: { gradeId: number; gradeData: UpdateGradeReqDto }) => {
        const response = await teacherGradeService.updateGrade(gradeId, {
            studentId: gradeData.studentId || 0,
            subjectId: gradeData.subjectId || 0,
            examId: gradeData.examId || 1,
            semesterId: gradeData.semesterId || 1,
            ccScore: gradeData.type === PeriodLabel.CC1 || gradeData.type === PeriodLabel.CC2 ? gradeData.value : undefined,
            snScore: gradeData.type === PeriodLabel.SN1 || gradeData.type === PeriodLabel.SN2 ? gradeData.value : undefined,
            comments: gradeData.comments,
            assessmentType: gradeData.type || PeriodLabel.CC1
        });
        return response;
    }
);

export const deleteGrade = createAsyncThunk(
    'grades/delete',
    async (gradeId: number) => {
        await teacherGradeService.deleteGrade(gradeId);
        return gradeId;
    }
);

export const fetchGradeSheet = createAsyncThunk(
    'grades/fetchGradeSheet',
    async () => {
        const response = await gradeService.getGradeSheet();
        return response;
    }
);

export const exportGrades = createAsyncThunk(
    'grades/export',
    async (data: any) => {
        const response = await gradeService.exportPrint(data);
        return response;
    }
);

export const publishGrades = createAsyncThunk(
    'grades/publish',
    async (data: any) => {
        const response = await gradeService.exportPublish(data);
        return response;
    }
);


export const processGradeClaim = createAsyncThunk('grade-claims/process', async ({ claimId, decision }: { claimId: number; decision: { approve: boolean; comment?: string } }) => {
    const response = await gradeService.processGradeClaim(claimId, decision);
    return response;
})

export const submitGradeClaim = createAsyncThunk('grade-claims/submit' , async (claimData: GradeClaimReqDto): Promise<GradeClaimResDto> => {
    const response = await gradeService.submitGradeClaim(claimData);
    return response
})

export const listGradeClaims = createAsyncThunk('grade-claims/list' , async (): Promise<GradeClaimResDto[]> => {
    const response = await gradeService.listGradeClaims();
    return response
})

export const fetchGradeSheetSelf = createAsyncThunk(
    'grades/fetchGradeSheetSelf',
    async () => {
        const response = await gradeService.getGradeSheetSelf();
        return response;
    }
)

export const fetchActivePeriod = createAsyncThunk(
    'grades/fetchActivePeriod',
    async () => {
        const response = await gradeService.getActivePeriod();
        return response;
    }
)
