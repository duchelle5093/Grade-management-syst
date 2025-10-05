import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminService, adminReportsService } from '../../api/configs';
import { CreateTeacherReqDto } from '../../api/request-dto/admin.req.dto';
import { Role, AcademicLevel, StudyCycle } from '../../api/enums';


export const fetchAllStudents = createAsyncThunk(
    'admin/fetchAllStudents',
    async (params: { pageNumber?: number; pageSize?: number; sortBy?: string; sortOrder?: string } = {}) => {
        return await adminService.getAllStudents(params.pageNumber, params.pageSize, params.sortBy, params.sortOrder);
    }
);

export const createUser = createAsyncThunk(
    'admin/createUser',
    async (userData: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: Role;
        password: string;

        levelId?: number;
        matricule?: string;
        speciality?: string;
        cycle?: StudyCycle;
        dateOfBirth?: string;
        placeOfBirth?: string;

        levelIds?: number[];
        departmentId?: number;
        phone?: string;
        subjectIds?: number[];
    }, { rejectWithValue }) => {
        try {
            return await adminService.createUser(userData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création');
        }
    }
);

export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ id, userData, role }: { id: number; userData: any; role: Role }, { rejectWithValue }) => {
        try {
            if (role === Role.TEACHER) {
                return await adminService.updateTeacher(id, userData);
            } else {
                return await adminService.updateStudent(id, userData);
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la modification');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (id: number, { rejectWithValue }) => {
        try {
            await adminService.deleteUser(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression');
        }
    }
);


export const fetchAllTeachers = createAsyncThunk(
    'admin/fetchAllTeachers',
    async (params: { pageNumber?: number; pageSize?: number; sortBy?: string; sortOrder?: string } = {}) => {
        return await adminService.getAllTeachers(params.pageNumber, params.pageSize, params.sortBy, params.sortOrder);
    }
);

export const createTeacher = createAsyncThunk(
    'admin/createTeacher',
    async (teacherData: CreateTeacherReqDto) => {
        return await adminService.createTeacher(teacherData);
    }
);


export const fetchAllDepartments = createAsyncThunk(
    'admin/fetchAllDepartments',
    async (params: { pageNumber?: number; pageSize?: number; sortBy?: string; sortOrder?: string } = {}) => {
        const response = await adminService.getAllDepartments(params.pageNumber, params.pageSize, params.sortBy, params.sortOrder);

        if (Array.isArray(response)) {
            return response.map((dept: any) => ({
                id: dept.departmentId,
                name: dept.departmentName,
                departmentId: dept.departmentId,
                departmentName: dept.departmentName,
                createdDate: dept.createdDate,
                lastModifiedDate: dept.lastModifiedDate,
                subjects: dept.subjects || dept.departmentSubjects
            }));
        }
        return response;
    }
);




export const importStudents = createAsyncThunk(
    'admin/importStudents',
    async (file: File) => {
        return await adminReportsService.importStudents(file);
    }
);

export const importTeachers = createAsyncThunk(
    'admin/importTeachers',
    async (file: File) => {
        return await adminReportsService.importTeachers(file);
    }
);


export const fetchAllGradingWindows = createAsyncThunk(
    'admin/fetchAllGradingWindows',
    async () => {
        return await adminService.getAllGradingWindows();
    }
);

export const createGradingWindow = createAsyncThunk(
    'admin/createGradingWindow',
    async (windowData: any, { rejectWithValue }) => {
        try {
            return await adminService.createGradingWindow(windowData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création');
        }
    }
);

export const updateGradingWindow = createAsyncThunk(
    'admin/updateGradingWindow',
    async (windowData: any, { rejectWithValue }) => {
        try {
            return await adminService.updateGradingWindow(windowData);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur lors de la modification');
        }
    }
);