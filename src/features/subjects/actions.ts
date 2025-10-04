import { createAsyncThunk } from '@reduxjs/toolkit';
import { subjectService } from '../../api/configs';
import {CreateSubjectReqDto, UpdateSubjectReqDto} from "../../api/reponse-dto/subjects.res.dto.ts";

export const fetchAssignedSubjects = createAsyncThunk(
    'subjects/fetchAssigned',
    async () => {
        const { userService } = await import('../../api/configs');
        const response = await userService.getTeacherSubjects();
        return response;
    }
);

export const fetchAllSubjects = createAsyncThunk(
    'subjects/fetchAll',
    async (params: { pageNumber?: number; pageSize?: number; sortBy?: string; sortOrder?: string } = {}) => {
        const { adminService } = await import('../../api/configs');
        const response = await adminService.getAllSubjects(params.pageNumber, params.pageSize, params.sortBy, params.sortOrder);
        return response;
    }
);

export const fetchSubjectById = createAsyncThunk(
    'subjects/fetchById',
    async (subjectId: string) => {
        const response = await subjectService.getSubjectById(subjectId);
        return response;
    }
);

export const createSubject = createAsyncThunk(
    'subjects/create',
    async (subjectData: CreateSubjectReqDto) => {
        const { adminService } = await import('../../api/configs');
        const response = await adminService.createSubject({
            subjectCode: subjectData.code,
            credits: subjectData.credits,
            description: subjectData.description,
            teacherId: subjectData.teacherId,
            subjectsLevel: [subjectData.level],
            Studentcycle: subjectData.cycle,
            semesterId: subjectData.semesterId,
            departmentId: subjectData.departmentId
        });
        return response;
    }
);

export const updateSubject = createAsyncThunk(
    'subjects/update',
    async ({ id, subjectData }: { id: string; subjectData: UpdateSubjectReqDto }) => {
        const { adminService } = await import('../../api/configs');
        const response = await adminService.updateSubject(parseInt(id), {
            subjectCode: subjectData.code,
            credits: subjectData.credits,
            description: subjectData.description,
            teacherId: subjectData.teacherId,
            subjectsLevel: [subjectData.level],
            Studentcycle: subjectData.cycle,
            semesterId: subjectData.semesterId,
            departmentId: subjectData.departmentId
        });
        return response;
    }
);

export const deleteSubject = createAsyncThunk(
    'subjects/delete',
    async (subjectId: string) => {
        const { adminService } = await import('../../api/configs');
        await adminService.deleteSubject(parseInt(subjectId));
        return subjectId;
    }
);
