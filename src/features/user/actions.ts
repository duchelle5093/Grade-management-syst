import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadUserProfile } from "./slices";
import { userService } from "../../api/configs";

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.getProfile();
      dispatch(loadUserProfile(response));
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchStudentProfile = createAsyncThunk(
  'profile/fetchStudentProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.getStudentProfile();
      dispatch(loadUserProfile(response));
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchTeacherProfile = createAsyncThunk(
  'profile/fetchTeacherProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.getTeacherProfile();
      dispatch(loadUserProfile(response));
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchAdminProfile = createAsyncThunk(
  'profile/fetchAdminProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await userService.getAdminProfile();
      dispatch(loadUserProfile(response));
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchStudents = createAsyncThunk(
  'profile/fetchStudents',
  async (params: { pageNumber?: number; pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const { adminService } = await import('../../api/configs');
      const response = await adminService.getAllStudents(params.pageNumber, params.pageSize);
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchTeacherSubjects = createAsyncThunk(
  'profile/fetchTeacherSubjects',
  async (params: { pageNumber?: number; pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await userService.getTeacherSubjects(params.pageNumber, params.pageSize);
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

export const fetchTeacherGrades = createAsyncThunk(
  'profile/fetchTeacherGrades',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getTeacherGrades();
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response);
    }
  }
);

