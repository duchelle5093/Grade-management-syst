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
  "role": "string",
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

## Teacher Endpoints

### 6. Get Teacher Profile
- **URL**: `GET /teacher/profile`
- **Description**: Get current teacher profile
- **Authorization**: Teacher role  required
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
  "department": {
    "departmentId": "Long",
    "departmentName": "string",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  },
  "teachingLevel": [
    {
      "teachingLevelId": "Long",
      "studentLevel": "string (LEVEL1/LEVEL2/LEVEL3/LEVEL4/LEVEL5)"
    }
  ],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "role": "string",
  "isActive": "Boolean"
}
```

---

### 7. Get Teacher Grades
- **URL**: `GET /teacher/my-grades`
- **Description**: Get all grades entered by current teacher
- **Authorization**: Teacher role required
- **Parameters**: None

**Response DTO:**
```json
[
  {
    "gradeId": "Long",
    "ccScore": "Double",
    "snScore": "Double",
    "totalScore": "Double",
    "maxValue": "Double",
    "comments": "string",
    "student": {
      "id": "Long",
      "username": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "matricule": "string"
    },
    "subject": {
      "id": "Long",
      "subjectName": "string",
      "subjectCode": "string",
      "credits": "Double"
    },
    "examiner": {
      "id": "Long",
      "username": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string"
    },
    "semester": {
      "id": "Long",
      "name": "string",
      "active": "Boolean"
    },
    "exam": "string (CC_1/CC_2/SN_1/SN_2)",
    "revendication": [],
    "hasPassed": "Boolean",
    "gpa": "Double",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

### 8. Get Teacher Students
- **URL**: `GET /teacher/my-students`
- **Description**: Get students grouped by teaching levels
- **Authorization**: Teacher role required
- **Parameters**: None

**Response DTO:**
```json
{
  "LEVEL2": [
    {
      "id": "Long",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "studentLevel": {
        "teachingLevelId": "Long",
        "studentLevel": "string"
      },
      "cycle": "string (BACHELOR/MASTER/PHD)",
      "matricule": "string",
      "speciality": "string",
      "dateOfBirth": "LocalDate",
      "placeOfBirth": "string",
      "grades": null,
      "createdDate": "Instant",
      "lastModifiedDate": "Instant",
      "isActive": "Boolean",
      "role": "string"
    }
  ],
  "LEVEL3": []
}
```

---

## Student Endpoints

### 9. Get Student Profile
- **URL**: `GET /student/profile`
- **Description**: Get current student profile with grades
- **Authorization**: Student role required
- **Parameters**: None

**Response DTO:**
```json
{
  "id": "Long",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "studentLevel": {
    "teachingLevelId": "Long",
    "studentLevel": "string"
  },
  "cycle": "string (BACHELOR/MASTER/PHD)",
  "matricule": "string",
  "speciality": "string",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string",
  "grades": [
    {
      "gradeId": "Long",
      "ccScore": "Double",
      "snScore": "Double",
      "totalScore": "Double",
      "comments": "string",
      "student": {
        "id": "Long",
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "matricule": "string"
      },
      "subject": {
        "id": "Long",
        "subjectName": "string",
        "subjectCode": "string",
        "credits": "Double"
      },
      "examiner": {
        "id": "Long",
        "username": "string",
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      },
      "semester": {
        "id": "Long",
        "name": "string",
        "active": "Boolean"
      },
      "exam": "string (CC_1/CC_2/SN_1/SN_2)",
      "hasPassed": "Boolean",
      "gpa": "Double",
      "createdDate": "Instant",
      "lastModifiedDate": "Instant"
    }
  ],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "isActive": "Boolean",
  "role": "string"
}
```

---

### 10. Get Student Grades
- **URL**: `GET /student/{studentId}`
- **Description**: Get grades for specific student (filtered by semester)
- **Authorization**: Student/Teacher/Admin role required
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
  "studentLevel": {
    "teachingLevelId": "Long",
    "studentLevel": "string"
  },
  "cycle": "string",
  "matricule": "string",
  "speciality": "string",
  "dateOfBirth": "LocalDate",
  "placeOfBirth": "string",
  "grades": [],
  "createdDate": "Instant",
  "lastModifiedDate": "Instant",
  "isActive": "Boolean",
  "role": "string"
}
```

---

### 11. Get Student Revendications
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
    "status": "string (PENDING/APPROVED/REJECTED)",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

## Admin Endpoints

### 12. Get All Teachers
- **URL**: `GET /admin/teachers`
- **Description**: Admin views all teachers
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: id)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
[
  {
    "teacherId": "Long",
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "phoneNumber": "string",
    "email": "string",
    "department": {
      "departmentId": "Long",
      "departmentName": "string",
      "departmentSubjects": [
        {
          "subjectId": "Long",
          "subjectName": "string",
          "subjectCode": "string",
          "credits": "Double",
          "description": "string",
          "teacher": "TeacherResponse",
          "subjectsLevel": ["TeachingLevel"],
          "studentcycle": "string",
          "departmentId": "Long",
          "createdDate": "Instant",
          "lastModifiedDate": "Instant"
        }
      ],
      "createdDate": "Instant",
      "lastModifiedDate": "Instant"
    },
    "teachingLevel": [
      {
        "teachingLevelId": "Long",
        "studentLevel": "string"
      }
    ],
    "createdDate": "Instant",
    "lastModifiedDate": "Instant",
    "role": "string",
    "isActive": "Boolean"
  }
]
```

---

### 13. Get All Students
- **URL**: `GET /admin/students`
- **Description**: Admin views all students
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: id)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
[
  {
    "id": "Long",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "studentLevel": "TeachingLevel",
    "cycle": "string",
    "matricule": "string",
    "speciality": "string",
    "dateOfBirth": "LocalDate",
    "placeOfBirth": "string",
    "grades": null,
    "createdDate": "Instant",
    "lastModifiedDate": "Instant",
    "isActive": "Boolean",
    "role": "string"
  }
]
```

---

### 14. Update Student (Admin)
- **URL**: `PUT /admin/student/{id}`
- **Description**: Admin updates student information
- **Authorization**: Admin role required
- **Parameters**: `id` (path parameter)

**Request DTO:**
```json
{
  "username": "string (3-50 chars)",
  "password": "string (6-100 chars)",
  "firstName": "string (2-50 chars, required)",
  "lastName": "string (2-50 chars, required)",
  "email": "string (valid email, max 100 chars)",
  "studentLevel": "TeachingLevel (required)",
  "cycle": "StudentCycle (required)",
  "matricule": "string (required)",
  "speciality": "string (3-100 chars, required)",
  "dateOfBirth": "LocalDate (required)",
  "placeOfBirth": "string (2-100 chars, required)"
}
```

**Response DTO:**
```json
{
  "username": "string",
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

## Department Management (Admin Only)

### 15. Get All Departments
- **URL**: `GET /admin/department`
- **Description**: Retrieve all departments
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: departmentName)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
[
  {
    "departmentId": "Long",
    "departmentName": "string",
    "departmentSubjects": [
      {
        "subjectId": "Long",
        "subjectName": "string",
        "subjectCode": "string",
        "credits": "Double",
        "description": "string",
        "teacher": "TeacherResponse",
        "subjectsLevel": ["TeachingLevel"],
        "studentcycle": "string",
        "departmentId": "Long"
      }
    ],
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

### 16. Create Department
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

### 17. Update Department
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

### 18. Delete Department
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

## Subject Management

### 19. Get All Subjects (Admin)
- **URL**: `GET /admin/subjects`
- **Description**: Admin views all subjects
- **Authorization**: Admin role required
- **Parameters**: 
  - `pageNumber` (optional, default: 0)
  - `pageSize` (optional, default: 50)
  - `sortBy` (optional, default: subjectId)
  - `sortOrder` (optional, default: asc)

**Response DTO:**
```json
[
  {
    "subjectId": "Long",
    "subjectName": "string",
    "subjectCode": "string",
    "credits": "Double",
    "description": "string",
    "teacher": "TeacherResponse",
    "subjectsLevel": ["TeachingLevel"],
    "studentcycle": "string",
    "departmentId": "Long",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
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
[
  {
    "subjectId": "Long",
    "subjectName": "string",
    "subjectCode": "string",
    "credits": "Double",
    "description": "string",
    "teacher": "TeacherResponse",
    "subjectsLevel": ["TeachingLevel"],
    "studentcycle": "string",
    "departmentId": "Long",
    "createdDate": "Instant",
    "lastModifiedDate": "Instant"
  }
]
```

---

## Grade Management

### 21. Create Grade (Teacher)
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

### 22. Update Grade (Teacher)
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

### 23. Delete Grade (Teacher)
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

### StudentLevel
- `LEVEL1` - First Year
- `LEVEL2` - Second Year
- `LEVEL3` - Third Year
- `LEVEL4` - Fourth Year (Master's)
- `LEVEL5` - Fifth Year (Master's)

### RequestStatus
- `PENDING` - Awaiting review
- `APPROVED` - Approved by teacher
- `REJECTED` - Rejected by teacher

### AppRole
- `ADMIN` - System administrator
- `TEACHER` - Faculty member
- `STUDENT` - Enrolled student

---

## Important Notes

### Authentication
- All endpoints require JWT token in Authorization header: `Bearer <token>`
- Role-based access control enforced on admin/teacher/student specific endpoints
- Token expires after 24 hours by default
- Use `/auth/login` to obtain JWT token

### Pagination Removed
- All list endpoints now return direct arrays without pagination metadata
- No `content`, `pageNumber`, `pageSize`, `totalElements`, `totalPages`, or `lastPage` fields
- Pagination parameters still accepted but only affect result size

### Response Structure Changes
- All responses return direct data without wrapper objects
- GradeResponse uses nested simple DTOs to avoid circular references
- Student/Teacher responses include complete nested objects

### Test Credentials
- Admin: `admin` / `admin`
- Teachers: username format `prof.{lastname}` / password `duchelle`
- Students: matricule format `24X0001` / password `nathan`

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
