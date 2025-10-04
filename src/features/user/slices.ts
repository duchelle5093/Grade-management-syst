import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userProfileResDto } from '../../api/reponse-dto/user.res.dto';
import {StudentDataResDto} from "../../api/reponse-dto/student.res.dto.ts";

export interface TeacherStudentsResponse {
  [level: string]: StudentDataResDto[];
}
import {fetchStudents, fetchTeacherStudents} from "./actions.ts";
import {fetchAssignedSubjects} from "../subjects/actions.ts";

interface UserSliceState {
  profile: userProfileResDto;
  students:StudentDataResDto[];
}

const initialState: UserSliceState = {
  profile: {} as userProfileResDto,
  students: [] ,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserProfile(state, action: PayloadAction<userProfileResDto>) {
      const profile = action.payload;
      // Normaliser teachingLevel pour compatibilité
      if (profile.teachingLevel && Array.isArray(profile.teachingLevel)) {
        const normalizedLevels = profile.teachingLevel.map((level: any) => 
          typeof level === 'object' ? level.studentLevel : level
        );
        (profile as any).teachingLevelNormalized = normalizedLevels;
      }
      state.profile = profile;
    },
  },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStudents.fulfilled, (state, action) => {
            state.students = action.payload;
        })
        .addCase(fetchTeacherStudents.fulfilled, (state, action) => {
            // Aplatir la structure groupée par niveau
            const groupedStudents = action.payload as TeacherStudentsResponse;
            const allStudents: StudentDataResDto[] = [];
            
            Object.keys(groupedStudents).forEach(level => {
                const levelStudents = groupedStudents[level].map(student => ({
                    ...student,
                    level: level // Ajouter le niveau à chaque étudiant
                }));
                allStudents.push(...levelStudents);
            });
            
            state.students = allStudents;
        })
        .addCase(fetchAssignedSubjects.fulfilled, (state, action) => {
            // Stocker les matières avec leur structure complète
            if (state.profile) {
                state.profile.subjects = action.payload;
            }
        })
    },
});

export const userReducer = slice.reducer;
export const {
  loadUserProfile,
} = slice.actions;
