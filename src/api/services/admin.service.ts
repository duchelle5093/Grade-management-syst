import { AxiosInstance } from 'axios';
import { StudentDataResDto } from '../reponse-dto/student.res.dto';
import {CreateSubjectReqDto, SubjectResDto} from '../reponse-dto/subjects.res.dto';

import { 
    CreateTeacherReqDto, 
    CreateDepartmentReqDto, 
    UpdateDepartmentReqDto,
    BulkSemesterUpdateReqDto,
    CreateSemesterReqDto
} from '../request-dto/admin.req.dto';
import { DepartmentResDto } from '../reponse-dto/admin.res.dto';
import { Role } from '../enums';

const adminApis = {

    REGISTER_USER: 'auth/admin/register',
    GET_ADMIN_PROFILE: 'auth/admin/profile',
    DELETE_USER: 'users',
    

    GET_STUDENTS: 'admin/students',
    UPDATE_STUDENT: 'admin/student',
    

    GET_TEACHERS: 'admin/teachers',
    UPDATE_TEACHER: 'admin/teacher',
    

    GET_ALL_DEPARTMENTS: 'admin/department',
    CREATE_DEPARTMENT: 'admin/department',
    UPDATE_DEPARTMENT: 'admin/department',
    DELETE_DEPARTMENT: 'admin/department',
    

    GET_SEMESTERS: 'semesters',
    CREATE_SEMESTER: 'admin/semester',
    UPDATE_SEMESTER: 'admin/semester',
    DELETE_SEMESTER: 'admin/semester',
    

    GET_ALL_SUBJECTS: 'admin/subjects',
    CREATE_SUBJECT: 'admin/subject',
    UPDATE_SUBJECT: 'admin/subject',
    DELETE_SUBJECT: 'admin/subject',
};

export class AdminService {
    protected readonly _client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this._client = client;
    }


    async getAllStudents(pageNumber = 0, pageSize = 50, sortBy = 'firstName', sortOrder = 'asc'): Promise<any> {
        const response = await this._client.get(adminApis.GET_STUDENTS, {
            params: { pageNumber, pageSize, sortBy, sortOrder }
        });
        return response.data;
    }


    async getAllTeachers(pageNumber = 0, pageSize = 50, sortBy = 'firstName', sortOrder = 'asc'): Promise<any> {
        const response = await this._client.get(adminApis.GET_TEACHERS, {
            params: { pageNumber, pageSize, sortBy, sortOrder }
        });
        return response.data;
    }


    async getAdminProfile(): Promise<any> {
        const response = await this._client.get(adminApis.GET_ADMIN_PROFILE);
        return response.data;
    }

    async createUser(userData: {
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        role: Role;
        password: string;

        level?: string;
        matricule?: string;
        speciality?: string;
        cycle?: string;

        levels?: string[];
        department?: string;
        phone?: string;
    }): Promise<any> {

        let payload: any = {
            username: userData.username,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            role: userData.role,
            password: userData.password
        };

        if (userData.role === Role.STUDENT) {
            payload.level = userData.level;
            payload.matricule = userData.matricule;
            payload.speciality = userData.speciality;
            payload.cycle = userData.cycle;
        } else if (userData.role === Role.TEACHER) {
            payload.levels = userData.levels;
            payload.department = userData.department;
            payload.phone = userData.phone;
        }
        

        Object.keys(payload).forEach(key => {
            if (payload[key] === undefined || payload[key] === null || payload[key] === '') {
                delete payload[key];
            }
        });
        
        console.log('Clean payload sent to API:', payload);
        
        const response = await this._client.post(adminApis.REGISTER_USER, payload);
        return response.data;
    }



    async createTeacher(teacher: CreateTeacherReqDto): Promise<any> {
        const response = await this._client.post(adminApis.CREATE_TEACHER, teacher);
        return response.data;
    }


    async updateStudent(id: number, studentData: {
        username?: string;
        password?: string;
        firstName: string;
        lastName: string;
        email: string;
        studentLevel: string;
        cycle: string;
        matricule: string;
        speciality: string;
        dateOfBirth?: string;
        placeOfBirth?: string;
    }): Promise<any> {
        const response = await this._client.put(`${adminApis.UPDATE_STUDENT}/${id}`, studentData);
        return response.data;
    }

    async updateTeacher(id: number, teacherData: {
        username?: string;
        password?: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        subjects?: any[];
        department: any;
        teachingLevel: string[];
        appRole?: string;
        isActive?: boolean;
    }): Promise<any> {
        const response = await this._client.put(`${adminApis.UPDATE_TEACHER}/${id}`, teacherData);
        return response.data;
    }


    async deleteUser(id: number): Promise<void> {
        await this._client.delete(`${adminApis.DELETE_USER}/${id}`);
    }


    async getAllSubjects(pageNumber = 0, pageSize = 50, sortBy = 'subjectId', sortOrder = 'asc'): Promise<any> {
        const response = await this._client.get(adminApis.GET_ALL_SUBJECTS, {
            params: { pageNumber, pageSize, sortBy, sortOrder }
        });
        return response.data;
    }

    async createSubject(subject: {
        subjectCode: string;
        credits: number;
        description?: string;
        teacherId?: number;
        subjectsLevel: string[];
        Studentcycle: string;
        semesterId: number;
        departmentId: number;
    }): Promise<any> {
        const response = await this._client.post(adminApis.CREATE_SUBJECT, subject);
        return response.data;
    }

    async updateSubject(id: number, subject: any): Promise<any> {
        const response = await this._client.put(`${adminApis.UPDATE_SUBJECT}/${id}`, subject);
        return response.data;
    }

    async deleteSubject(id: number): Promise<void> {
        await this._client.delete(`${adminApis.DELETE_SUBJECT}/${id}`);
    }


    async getAllDepartments(pageNumber = 0, pageSize = 50, sortBy = 'departmentName', sortOrder = 'asc'): Promise<any> {
        const response = await this._client.get(adminApis.GET_ALL_DEPARTMENTS, {
            params: { pageNumber, pageSize, sortBy, sortOrder }
        });
        return response.data;
    }

    async createDepartment(department: {
        departmentName: string;
        subjectIds?: number[];
    }): Promise<any> {
        const response = await this._client.post(adminApis.CREATE_DEPARTMENT, department);
        return response.data;
    }

    async updateDepartment(id: number, department: {
        departmentName: string;
        subjectIds?: number[];
    }): Promise<any> {
        const response = await this._client.put(`${adminApis.UPDATE_DEPARTMENT}/${id}`, department);
        return response.data;
    }

    async deleteDepartment(id: number): Promise<void> {
        await this._client.delete(`${adminApis.DELETE_DEPARTMENT}/${id}`);
    }

    async getDepartmentDetails(id: number): Promise<any> {
        const response = await this._client.get(`${adminApis.GET_ALL_DEPARTMENTS}/${id}`);
        return response.data;
    }


    async getAllSemesters(): Promise<any> {
        const response = await this._client.get(adminApis.GET_SEMESTERS);
        return response.data;
    }

    async createSemester(semester: {
        name: string;
        startDate: string;
        endDate: string;
        active?: boolean;
    }): Promise<any> {
        const response = await this._client.post(adminApis.CREATE_SEMESTER, semester);
        return response.data;
    }

    async updateSemester(id: number, semester: {
        name: string;
        startDate: string;
        endDate: string;
        active?: boolean;
    }): Promise<any> {
        const response = await this._client.put(`${adminApis.UPDATE_SEMESTER}/${id}`, semester);
        return response.data;
    }

    async deleteSemester(id: number): Promise<void> {
        await this._client.delete(`${adminApis.DELETE_SEMESTER}/${id}`);
    }


    async switchUserDepartment(deptId: number): Promise<any> {
        const response = await this._client.post(`departments/switch/${deptId}`);
        return response.data;
    }


    async getAllGradingWindows(): Promise<any[]> {
        const response = await this._client.get('grading-windows');
        return response.data;
    }

    async createGradingWindow(windowData: any): Promise<any> {
        const response = await this._client.post('grading-windows', windowData);
        return response.data;
    }

    async updateGradingWindow(windowData: any): Promise<any> {
        const response = await this._client.put(`grading-windows/${windowData.id}`, windowData);
        return response.data;
    }
}