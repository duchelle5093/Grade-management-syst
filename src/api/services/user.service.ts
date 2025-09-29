import { AxiosInstance } from 'axios';
import { userProfileResDto } from '../reponse-dto/user.res.dto';
import {StudentListResDto} from "../reponse-dto/student.res.dto.ts";

export const userApis = {
  GET_STUDENT_PROFILE: 'student/profile',
  GET_TEACHER_PROFILE: 'teacher/profile',
  GET_ADMIN_PROFILE: 'auth/admin/profile',
  GET_TEACHER_SUBJECTS: 'teacher/subject',
  GET_TEACHER_GRADES: 'teacher/my-grades',
  GET_STUDENT_GRADES: 'student',
  CHANGE_PASSWORD: 'auth/password',
};

export class UserService {
  protected _client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this._client = client;
  }

  async getStudentProfile() {
    const res = await this._client.get(userApis.GET_STUDENT_PROFILE);
    return res.data;
  }

  async getTeacherProfile() {
    const res = await this._client.get(userApis.GET_TEACHER_PROFILE);
    return res.data;
  }

  async getAdminProfile() {
    const res = await this._client.get(userApis.GET_ADMIN_PROFILE);
    return res.data;
  }

  async getProfile() {
    try {
      return await this.getTeacherProfile();
    } catch {
      try {
        return await this.getStudentProfile();
      } catch {
        return await this.getAdminProfile();
      }
    }
  }

  async getTeacherSubjects(pageNumber = 0, pageSize = 50) {
    const res = await this._client.get(userApis.GET_TEACHER_SUBJECTS, {
      params: { pageNumber, pageSize }
    });
    return res.data;
  }

  async getTeacherGrades() {
    const res = await this._client.get(userApis.GET_TEACHER_GRADES);
    return res.data;
  }

  async getStudentGrades(studentId: number, semesterId?: number) {
    const params = semesterId ? { semesterId } : {};
    const res = await this._client.get(`${userApis.GET_STUDENT_GRADES}/${studentId}`, { params });
    return res.data;
  }

  async getStudents() {
    throw new Error('Use AdminService.getAllStudents() instead');
  }
}
