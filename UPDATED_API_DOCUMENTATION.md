# ManageNotes API Documentation

**Base URL**: `http://localhost:3030/api`

## Authentication Endpoints

### 1. User Login
- **URL**: `POST /auth/login`
- **Description**: Authenticate user and get JWT token
- **Authorization**: None required
- **Parameters**: None

**Request DTO:**
```json
{
  "username": "string (3-50 chars, required)",
  "password": "string (5-100 chars, required)"
}
```

**Response DTO:**
```json
{
  "id": "Long",
  "username": "string",
  "roles": ["string"],
  "token": "string",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant"
}
```

---

### 2. User Registration (Admin Only)
- **URL**: `POST /auth/admin/register`
- **Description**: Admin registers new users (students/teachers)
- **Authorization**: Admin role required
- **Parameters**: None

**Request DTO:**
```json
{
  "username": "string (3-50 chars, required)",
  "email": "string (valid email, max 100 chars, required)",
  "password": "string (6-100 chars, required)",
  "firstName": "string (2-50 chars, required)",
  "lastName": "string (2-50 chars, required)",
  "role": "string (ADMIN/TEACHER/STUDENT)",
  
  // Student fields (when role = STUDENT)
  "levelId": "Long",
  "matricule": "string",
  "speciality": "string",
  "cycle": "StudentCycle",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string",
  
  // Teacher fields (when role = TEACHER)
  "levelIds": ["Long"],
  "departmentId": "Long",
  "phone": "string",
  "subjectIds": ["Long"]
}
```

**Response DTO:**
```json
{
  "message": "string"
}
```

---

### 3. Get Admin Profile
- **URL**: `GET /auth/admin/profile`
- **Description**: Get current admin profile information
- **Authorization**: Admin role required
- **Parameters**: None

**Response DTO:**
```json
{
  "userId": "Long",
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "roles": "Roles",
  "isActive": "Boolean",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant"
}
```

---

### 4. Change Password
- **URL**: `POST /auth/password`
- **Description**: Update user password
- **Authorization**: Authenticated user required
- **Parameters**: None

**Request DTO:**
```json
{
  "newPassword": "string (6-100 chars, required)",
  "confirmPassword": "string (required)"
}
```

**Response DTO:**
```json
{
  "message": "string"
}
```

---

### 5. User Logout
- **URL**: `POST /auth/logout`
- **Description**: Log out current user
- **Authorization**: Authenticated user required
- **Parameters**: None

**Response DTO:**
```json
{
  "message": "string"
}
```

---

## Department Management (Admin Only)

### 6. Create Department
- **URL**: `POST /admin/department`
- **Description**: Create new department
- **Authorization**: Admin role required
- **Parameters**: None

**Request DTO:**
```json
{
  "departmentName": "string (5-100 chars, required)",
  "subjectIds": ["Long (required)"]
}
```

**Response DTO:**
```json
{
  "departmentName": "string",
  "subjectIds": ["Long"]
}
```

---

### 7. Get All Departments
- **URL**: `GET /admin/department`
- **Description**: Retrieve all departments with pagination
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: departmentName)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
{
  // Individual department fields for single operations
  "departmentId": "Long",
  "departmentName": "string",
  "departmentSubjects": [
    {
      "subjectId": "Long",
      "subjectCode": "string",
      "credits": "BigDecimal",
      "description": "string",
      "teacher": "TeacherResponse",
      "subjectsLevel": ["TeachingLevel"],
      "Studentcycle": "StudentCycle",
      "semester": "SemesterResponse",
      "department": "DepartmentResponse",
      "createdDate": "Instant",
      "lastModifiedDate": "Instant"
    }
  ],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  
  // Pagination fields
  "content": [
    {
      "departmentName": "string",
      "subjectIds": ["Long"]
    }
  ],
  "subjects": ["SubjectResponse"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

### 8. Update Department
- **URL**: `PUT /admin/department/{departmentId}`
- **Description**: Update department information
- **Authorization**: Admin role required
- **Parameters**: `departmentId` (path parameter)

**Request DTO:**
```json
{
  "departmentName": "string (5-100 chars, required)",
  "subjectIds": ["Long (required)"]
}
```

**Response DTO:**
```json
{
  "departmentName": "string",
  "subjectIds": ["Long"]
}
```

---

### 9. Delete Department
- **URL**: `DELETE /admin/department/{departmentId}`
- **Description**: Delete department
- **Authorization**: Admin role required
- **Parameters**: `departmentId` (path parameter)

**Response DTO:**
```json
{
  "departmentName": "string",
  "subjectIds": ["Long"]
}
```

---

## Grade Management

### 10. Create Grade (Teacher)
- **URL**: `POST /teacher/grade`
- **Description**: Teacher creates new grade entry
- **Authorization**: Teacher role required
- **Parameters**: None

**Request DTO:**
```json
{
  "studentId": "Long (required)",
  "subjectId": "Long (required)",
  "examId": "Long (required)",
  "semesterId": "Long (required)",
  "ccScore": "Double (0-30)",
  "snScore": "Double (0-70)",
  "comments": "string (5-255 chars)",
  "assessmentType": "AssessmentType (required)"
}
```

**Response DTO:**
```json
{
  "studentId": "Long",
  "subjectId": "Long",
  "examId": "Long",
  "semesterId": "Long",
  "ccScore": "Double",
  "snScore": "Double",
  "comments": "string",
  "assessmentType": "AssessmentType"
}
```

---

### 11. Update Grade (Teacher)
- **URL**: `PUT /teacher/grade/{gradeId}`
- **Description**: Teacher updates existing grade
- **Authorization**: Teacher role required
- **Parameters**: `gradeId` (path parameter)

**Request DTO:**
```json
{
  "studentId": "Long (required)",
  "subjectId": "Long (required)",
  "examId": "Long (required)",
  "semesterId": "Long (required)",
  "ccScore": "Double (0-30)",
  "snScore": "Double (0-70)",
  "comments": "string (5-255 chars)",
  "assessmentType": "AssessmentType (required)"
}
```

**Response DTO:**
```json
{
  "studentId": "Long",
  "subjectId": "Long",
  "examId": "Long",
  "semesterId": "Long",
  "ccScore": "Double",
  "snScore": "Double",
  "comments": "string",
  "assessmentType": "AssessmentType"
}
```

---

### 12. Delete Grade (Teacher)
- **URL**: `DELETE /teacher/grade/{gradeId}`
- **Description**: Teacher deletes grade entry
- **Authorization**: Teacher role required
- **Parameters**: `gradeId` (path parameter)

**Response DTO:**
```json
{
  "message": "string"
}
```

---

## Student Management

### 13. Update Student (Admin)
- **URL**: `PUT /admin/student/{id}`
- **Description**: Admin updates student information
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "username": "string (3-50 chars)",
  "password": "string (6-100 chars)",
  "appRole": "Roles",
  "firstName": "string (2-50 chars, required)",
  "lastName": "string (2-50 chars, required)",
  "email": "string (valid email, max 100 chars)",
  "studentLevel": "TeachingLevel (required)",
  "cycle": "StudentCycle (required)",
  "matricule": "string (pattern: 2 digits + 1 uppercase letter + 4 digits, required)",
  "speciality": "string (3-100 chars, required)",
  "dateOfBirth": "LocalDate (required)",
  "placeOfBirth": "string (2-100 chars, required)"
}
```

**Response DTO:**
```json
{
  "username": "string",
  "password": "string",
  "appRole": "Roles",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "studentLevel": "TeachingLevel",
  "cycle": "StudentCycle",
  "matricule": "string",
  "speciality": "string",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string"
}
```

---

### 14. Get Student Profile
- **URL**: `GET /profile`
- **Description**: Get current student profile
- **Authorization**: Student role required
- **Parameters**: None

**Response DTO:**
```json
{
  "id": "Long",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "studentLevel": "TeachingLevel",
  "cycle": "StudentCycle",
  "matricule": "string",
  "speciality": "string",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string",
  "grades": [
    {
      "gradeId": "Long",
      "score": "Double",
      "maxValue": "Double",
      "comments": "string",
      "student": "StudentRequest",
      "subject": "SubjectRequest",
      "examiner": "Teacher",
      "semester": "SemesterRequest",
      "exam": "AssessmentType",
      "revendication": ["RevendicationRequest"],
      "hasPassed": "Boolean",
      "gpa": "Double",
      "content": "GradeRequest",
      "createdDate": "Instant",
      "lastModifiedDate": "Instant"
    }
  ],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "isActive": "Boolean",
  "semesterId": "Long",
  
  // Pagination fields
  "content": ["StudentRequest"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

### 15. Get Student Grades
- **URL**: `GET /student/{studentId}`
- **Description**: Get grades for specific student
- **Authorization**: Teacher/Admin role required
- **Parameters**: 
  - `studentId` (path parameter)
  - `semesterId` (optional query parameter)

**Response DTO:**
```json
{
  "id": "Long",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "studentLevel": "TeachingLevel",
  "cycle": "StudentCycle",
  "matricule": "string",
  "speciality": "string",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string",
  "grades": ["GradeResponse"],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "isActive": "Boolean",
  "semesterId": "Long",
  
  // Pagination fields
  "content": ["StudentRequest"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

## Subject Management

### 16. Get All Subjects (Admin)
- **URL**: `GET /admin/subjects`
- **Description**: Admin views all subjects with pagination
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: subjectId)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
{
  "subjectId": "Long",
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacher": {
    "teacherId": "Long",
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "email": "string",
    "subjects": ["SubjectResponse"],
    "department": "Department",
    "teachingLevel": ["TeachingLevel"],
    "createdDate": "Instant",
    "lastModifiedDate": "Instant",
    "appRole": "Roles",
    "isActive": "Boolean"
  },
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semester": "SemesterResponse",
  "department": "DepartmentResponse",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  
  // Pagination fields
  "content": ["SubjectRequest"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

### 17. Create Subject (Admin)
- **URL**: `POST /admin/subject`
- **Description**: Admin creates new subject
- **Authorization**: Admin role required
- **Parameters**: None

**Request DTO:**
```json
{
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacherId": "Long",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semesterId": "Long",
  "departmentId": "Long"
}
```

**Response DTO:**
```json
{
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacherId": "Long",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semesterId": "Long",
  "departmentId": "Long"
}
```

---

### 18. Update Subject (Admin)
- **URL**: `PUT /admin/subject/{id}`
- **Description**: Admin updates subject
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacherId": "Long",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semesterId": "Long",
  "departmentId": "Long"
}
```

**Response DTO:**
```json
{
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacherId": "Long",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semesterId": "Long",
  "departmentId": "Long"
}
```

---

### 19. Delete Subject (Admin)
- **URL**: `DELETE /admin/subject/{id}`
- **Description**: Admin deletes subject
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Response DTO:**
```json
{
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacherId": "Long",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semesterId": "Long",
  "departmentId": "Long"
}
```

---

### 20. Get Teacher Subjects
- **URL**: `GET /teacher/subject`
- **Description**: Get subjects assigned to current teacher
- **Authorization**: Teacher role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: subjectId)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
{
  "subjectId": "Long",
  "subjectCode": "string",
  "credits": "BigDecimal",
  "description": "string",
  "teacher": "TeacherResponse",
  "subjectsLevel": ["TeachingLevel"],
  "Studentcycle": "StudentCycle",
  "semester": "SemesterResponse",
  "department": "DepartmentResponse",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  
  // Pagination fields
  "content": ["SubjectRequest"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

## Teacher Management

### 21. Update Teacher (Admin)
- **URL**: `PUT /admin/teacher/{id}`
- **Description**: Admin updates teacher information
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "email": "string",
  "subjects": ["Subject"],
  "department": "Department",
  "teachingLevel": ["TeachingLevel"],
  "appRole": "Roles",
  "isActive": "Boolean"
}
```

**Response DTO:**
```json
{
  "username": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "email": "string",
  "subjects": ["Subject"],
  "department": "Department",
  "teachingLevel": ["TeachingLevel"],
  "appRole": "Roles",
  "isActive": "Boolean"
}
```

---

### 22. Get Teacher Profile
- **URL**: `GET /profile`
- **Description**: Get current teacher profile
- **Authorization**: Teacher role required
- **Parameters**: None

**Response DTO:**
```json
{
  "teacherId": "Long",
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "email": "string",
  "subjects": ["SubjectResponse"],
  "department": "Department",
  "teachingLevel": ["TeachingLevel"],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "appRole": "Roles",
  "isActive": "Boolean"
}
```

---

### 23. Get Teacher Grades
- **URL**: `GET /teacher/my-grades`
- **Description**: Get all grades entered by current teacher
- **Authorization**: Teacher role required
- **Parameters**: None

**Response DTO:**
```json
[
  {
    "gradeId": "Long",
    "score": "Double",
    "maxValue": "Double",
    "comments": "string",
    "student": "StudentRequest",
    "subject": "SubjectRequest",
    "examiner": "Teacher",
    "semester": "SemesterRequest",
    "exam": "AssessmentType",
    "revendication": ["RevendicationRequest"],
    "hasPassed": "Boolean",
    "gpa": "Double",
    "content": "GradeRequest",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

## Semester Management

### 24. Get All Semesters
- **URL**: `GET /semesters`
- **Description**: Retrieve all semesters
- **Authorization**: Authenticated user required
- **Parameters**: None

**Response DTO:**
```json
[
  {
    "semesterId": "Long",
    "name": "string",
    "startDate": "LocalDate",
    "endDate": "LocalDate",
    "active": "Boolean",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant",
    "subjects": ["SubjectResponse"],
    "grades": ["GradeResponse"],
    
    // Pagination fields
    "content": ["SemesterResponse"],
    "pageNumber": "Integer",
    "pageSize": "Integer",
    "totalElements": "Long",
    "totalPages": "Integer",
    "lastPage": "Boolean"
  }
]
```

---

### 25. Create Semester (Admin)
- **URL**: `POST /admin/semester`
- **Description**: Admin creates new semester
- **Authorization**: Admin role required
- **Parameters**: None

**Request DTO:**
```json
{
  "name": "string (5+ chars, required)",
  "startDate": "LocalDate (required)",
  "endDate": "LocalDate (required)",
  "active": "Boolean (default: true)"
}
```

**Response DTO:**
```json
{
  "name": "string",
  "startDate": "LocalDate",
  "endDate": "LocalDate",
  "active": "Boolean"
}
```

---

### 26. Update Semester (Admin)
- **URL**: `PUT /admin/semester/{id}`
- **Description**: Admin updates semester
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "name": "string (5+ chars, required)",
  "startDate": "LocalDate (required)",
  "endDate": "LocalDate (required)",
  "active": "Boolean (default: true)"
}
```

**Response DTO:**
```json
{
  "name": "string",
  "startDate": "LocalDate",
  "endDate": "LocalDate",
  "active": "Boolean"
}
```

---

### 27. Delete Semester (Admin)
- **URL**: `DELETE /admin/semester/{id}`
- **Description**: Admin deletes semester
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Response DTO:**
```json
{
  "message": "string"
}
```

---

## Revendication Management

### 28. Create Revendication (Student)
- **URL**: `POST /student/revendication`
- **Description**: Student submits grade revendication request
- **Authorization**: Student role required
- **Parameters**: None

**Request DTO:**
```json
{
  "period": "Exam",
  "student": "Student",
  "grade": "Grades",
  "semester": "Semester",
  "requestedScore": "Double",
  "description": "string"
}
```

**Response DTO:**
```json
{
  "period": "Exam",
  "student": "Student",
  "grade": "Grades",
  "semester": "Semester",
  "requestedScore": "Double",
  "description": "string"
}
```

---

### 29. Get Teacher Revendications
- **URL**: `GET /teacher/revendications`
- **Description**: Teacher views pending revendications
- **Authorization**: Teacher role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: revendicationId)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
{
  "revendicationId": "Long",
  "student": "StudentResponse",
  "grade": "GradeResponse",
  "semester": "SemesterResponse",
  "requestedScore": "Double",
  "description": "string",
  "teacherComment": "string",
  "status": "RequestStatus",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  
  // Pagination fields
  "content": ["RevendicationRequest"],
  "pageNumber": "Integer",
  "pageSize": "Integer",
  "totalElements": "Long",
  "totalPages": "Integer",
  "lastPage": "Boolean"
}
```

---

### 30. Approve Revendication (Teacher)
- **URL**: `POST /teacher/revendication/{id}/approve`
- **Description**: Teacher approves grade revendication
- **Authorization**: Teacher role required
- **Parameters**: 
  - `id` (path parameter)
  - `comment` (optional query parameter)

**Response DTO:**
```json
{
  "message": "string"
}
```

---

### 31. Reject Revendication (Teacher)
- **URL**: `POST /teacher/revendication/{id}/reject`
- **Description**: Teacher rejects grade revendication
- **Authorization**: Teacher role required
- **Parameters**: 
  - `id` (path parameter)
  - `reason` (optional query parameter)

**Response DTO:**
```json
{
  "message": "string"
}
```

---

### 32. Get Student Revendications
- **URL**: `GET /student/{studentId}/revendications`
- **Description**: Get student's revendication history
- **Authorization**: Student/Teacher/Admin role required
- **Parameters**: `studentId` (path parameter)

**Response DTO:**
```json
[
  {
    "revendicationId": "Long",
    "student": "StudentResponse",
    "grade": "GradeResponse",
    "semester": "SemesterResponse",
    "requestedScore": "Double",
    "description": "string",
    "teacherComment": "string",
    "status": "RequestStatus",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

## Revendication Period Management

### 33. Get All Revendication Periods
- **URL**: `GET /revendication-period`
- **Description**: Retrieve all revendication periods
- **Authorization**: Authenticated user required
- **Parameters**: None

**Response DTO:**
```json
[
  {
    "revendicationPeriodId": "Long",
    "exam": {
      "examPeriodId": "Long",
      "assessmentType": "AssessmentType"
    },
    "semester": "SemesterResponse",
    "startDate": "LocalDate",
    "endDate": "LocalDate",
    "color": "string",
    "isActive": "Boolean",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

### 34. Create Revendication Period (Admin)
- **URL**: `POST /admin/revendication-period`
- **Description**: Admin creates new revendication period
- **Authorization**: Admin role required
- **Parameters**: None

**Request DTO:**
```json
{
  "examId": "Long (required)",
  "startDate": "LocalDate (required)",
  "endDate": "LocalDate (required)",
  "color": "string",
  "isActive": "Boolean (default: false)"
}
```

**Response DTO:**
```json
{
  "examId": "Long",
  "startDate": "LocalDate",
  "endDate": "LocalDate",
  "color": "string",
  "isActive": "Boolean"
}
```

---

### 35. Update Revendication Period (Admin)
- **URL**: `PUT /admin/revendication-period/{id}`
- **Description**: Admin updates revendication period
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "examId": "Long (required)",
  "startDate": "LocalDate (required)",
  "endDate": "LocalDate (required)",
  "color": "string",
  "isActive": "Boolean (default: false)"
}
```

**Response DTO:**
```json
{
  "examId": "Long",
  "startDate": "LocalDate",
  "endDate": "LocalDate",
  "color": "string",
  "isActive": "Boolean"
}
```

---

### 36. Delete Revendication Period (Admin)
- **URL**: `DELETE /admin/revendication-period/{id}`
- **Description**: Admin deletes revendication period
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Response DTO:**
```json
{
  "message": "string"
}
```

---

### 37. Get Active Revendication Periods
- **URL**: `GET /revendication-period/active`
- **Description**: Retrieve all active revendication periods
- **Authorization**: Authenticated user required
- **Parameters**: None

**Response DTO:**
```json
[
  {
    "revendicationPeriodId": "Long",
    "exam": "ExamResponse",
    "semester": "SemesterResponse",
    "startDate": "LocalDate",
    "endDate": "LocalDate",
    "color": "string",
    "isActive": "Boolean",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

## Transcript Management

### 38. Get Student Transcript
- **URL**: `GET /student/transcript`
- **Description**: Student retrieves their academic transcript
- **Authorization**: Student role required
- **Parameters**: None

**Response DTO:**
```json
{
  "transcriptId": "Long",
  "studentFirstName": "string",
  "studentLastName": "string",
  "studentMatricule": "string",
  "subjectResults": ["SubjectResponse"],
  "status": "TranscriptStatus",
  "studentLevel": "TeachingLevel",
  "studentCycle": "StudentCycle",
  "semesterName": "string",
  "studentGrades": ["GradeResponse"],
  "annualAverage": "Double",
  "pdfPath": "string",
  "creditsEarned": "Integer",
  "totalCreditsRequired": "Integer",
  "semester1Credits": "Integer",
  "semester2Credits": "Integer",
  "semester1Average": "Double",
  "semester2Average": "Double",
  "facultyName": "string",
  "academicYear": "string",
  "createdDate": "Instant",
  "lastModifiedDate": "Instant"
}
```

---

## Enums Reference

### AssessmentType
- `CC_1` - Continuous Assessment 1
- `CC_2` - Continuous Assessment 2
- `SN_1` - Session Normale 1 (Midterm)
- `SN_2` - Session Normale 2 (Final)

### StudentCycle
- `BACHELOR` - Undergraduate (Levels 1-3)
- `MASTER` - Graduate (Levels 4-5)
- `PHD` - Doctoral

### TeachingLevel
- `LEVEL1` - First Year
- `LEVEL2` - Second Year
- `LEVEL3` - Third Year
- `LEVEL4` - Fourth Year (Master's)
- `LEVEL5` - Fifth Year (Master's)

### RequestStatus
- `PENDING` - Awaiting review
- `APPROVED` - Approved by teacher
- `REJECTED` - Rejected by teacher

### TranscriptStatus
- `DRAFT` - In preparation
- `FINAL` - Completed and official
- `ARCHIVED` - Historical record

### AppRole
- `ADMIN` - System administrator
- `TEACHER` - Faculty member
- `STUDENT` - Enrolled student

---

## Authentication Notes
- All endpoints require JWT token in Authorization header: `Bearer <token>`
- Role-based access control enforced on admin/teacher/student specific endpoints
- Token expires after 24 hours by default
- Use `/auth/login` to obtain JWT token
- Include token in all subsequent requests

## Error Responses
All endpoints may return standard HTTP error responses:

```json
{
  "message": "Error description",
  "timestamp": "Instant",
  "status": "HTTP_STATUS_CODE"
}
```

Common status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error