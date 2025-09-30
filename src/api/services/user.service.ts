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
    // Essayer de déterminer le rôle depuis le token JWT
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.sub; // Le username peut indiquer le rôle
        const authorities = payload.authorities;
        
        // Vérifier les autorités d'abord
        if (authorities && Array.isArray(authorities)) {
          const userRole = authorities[0];
          if (userRole === 'ADMIN') {
            return await this.getAdminProfile();
          } else if (userRole === 'TEACHER') {
            return await this.getTeacherProfile();
          } else if (userRole === 'STUDENT') {
            return await this.getStudentProfile();
          }
        }
        
        // Fallback sur le username pattern
        if (role && typeof role === 'string') {
          if (role.includes('admin')) {
            return await this.getAdminProfile();
          } else if (role.includes('prof')) {
            return await this.getTeacherProfile();
          }
        }
      } catch (e) {
        console.warn('Erreur décodage token:', e);
      }
    }
    
    // Fallback: essayer student en premier (plus probable)
    try {
      return await this.getStudentProfile();
    } catch {
      try {
        return await this.getTeacherProfile();
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
