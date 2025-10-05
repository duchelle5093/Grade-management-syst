import { createSlice} from '@reduxjs/toolkit';
import {
    fetchAssignedSubjects,
    fetchAllSubjects,
    fetchSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
} from './actions';
import {SubjectResDto} from "../../api/reponse-dto/subjects.res.dto.ts";

interface SubjectsState {
    assignedSubjects: SubjectResDto[];
    allSubjects: SubjectResDto[];
    currentSubject: SubjectResDto | null;
    loading: boolean;
    error: string | null;
}

const initialState: SubjectsState = {
    assignedSubjects: [],
    allSubjects: [],
    currentSubject: null,
    loading: false,
    error: null,
};

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        clearCurrentSubject: (state) => {
            state.currentSubject = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAssignedSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignedSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.assignedSubjects = action.payload;
            })
            .addCase(fetchAssignedSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch assigned subjects';
            })

            .addCase(fetchAllSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllSubjects.fulfilled, (state, action) => {
                state.loading = false;

                const subjects = Array.isArray(action.payload) ? action.payload.map((subject: any) => ({
                    id: subject.subjectId,
                    name: subject.subjectName || subject.subjectCode,
                    code: subject.subjectCode,
                    credits: typeof subject.credits === 'object' ? subject.credits.parsedValue : subject.credits,
                    description: subject.description || '',
                    active: true,
                    level: subject.subjectsLevel?.[0]?.studentLevel || 'LEVEL1',
                    cycle: subject.studentCycle,
                    semesterId: subject.semester?.id,
                    semesterName: subject.semester?.name || '',
                    departmentId: subject.departmentId,
                    departmentName: subject.department?.departmentName || '',
                    teacherId: subject.teacher?.teacherId,
                    teacherName: subject.teacher ? `${subject.teacher.firstName} ${subject.teacher.lastName}` : undefined
                })) : [];
                state.allSubjects = subjects;
            })
            .addCase(fetchAllSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch all subjects';
            })

            .addCase(fetchSubjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSubject = action.payload;
            })
            .addCase(fetchSubjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch subject';
            })

            .addCase(createSubject.fulfilled, (state, action) => {
                state.assignedSubjects.push(action.payload);
                state.allSubjects.push(action.payload);
            })

            .addCase(updateSubject.fulfilled, (state, action) => {
                const updatedSubject = action.payload;
                state.assignedSubjects = state.assignedSubjects.map(subject =>
                    subject.id === updatedSubject.id ? updatedSubject : subject
                );
                state.allSubjects = state.allSubjects.map(subject =>
                    subject.id === updatedSubject.id ? updatedSubject : subject
                );
                if (state.currentSubject?.id === updatedSubject.id) {
                    state.currentSubject = updatedSubject;
                }
            })

            .addCase(deleteSubject.fulfilled, (state, action) => {
                const deletedId = action.payload;
                state.assignedSubjects = state.assignedSubjects.filter(subject => subject.id !== deletedId);
                state.allSubjects = state.allSubjects.filter(subject => subject.id !== deletedId);
                if (state.currentSubject?.id === deletedId) {
                    state.currentSubject = null;
                }
            });
    },
});

export const { clearCurrentSubject, clearError } = subjectsSlice.actions;
export const subjectsReducer = subjectsSlice.reducer;
