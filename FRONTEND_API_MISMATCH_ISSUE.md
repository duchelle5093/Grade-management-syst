# Frontend-Backend API Endpoint Mismatch Issue

## Problem Summary
The frontend application is making requests to API endpoints that don't exist in the backend, causing 404 errors and authentication issues.

## Root Cause Analysis

### Frontend Expected Endpoints (Not Found - 404 Errors)
The frontend is trying to access these endpoints that **DO NOT EXIST** in the backend:

1. `GET /api/students` - Returns 404
2. `GET /api/teachers` - Returns 404  
3. `GET /api/departments` - Returns 404
4. `GET /api/subjects` - Returns 404
5. `GET /api/me` - Returns 404

### Backend Available Endpoints
The backend actually provides these endpoints:

#### Authentication
- `POST /api/auth/login` ✅ (Working)
- `POST /api/auth/admin/register`
- `GET /api/auth/admin/profile`
- `POST /api/auth/password`
- `POST /api/auth/logout`

#### Department Management
- `POST /api/admin/department` - Create department
- `GET /api/admin/department` - Get all departments (paginated)
- `PUT /api/admin/department/{departmentId}` - Update department
- `DELETE /api/admin/department/{departmentId}` - Delete department

#### Subject Management
- `GET /api/admin/subjects` - Get all subjects (paginated)
- `POST /api/admin/subject` - Create subject
- `PUT /api/admin/subject/{id}` - Update subject
- `DELETE /api/admin/subject/{id}` - Delete subject
- `GET /api/teacher/subject` - Get subjects by teacher

#### Student Management
- `PUT /api/admin/student/{id}` - Update student
- `GET /api/student/profile` - Get current student profile
- `GET /api/student/{studentId}` - Get student grades
- `GET /api/student/{studentId}/revendications` - Get student revendications

#### Teacher Management
- `PUT /api/admin/teacher/{id}` - Update teacher
- `GET /api/teacher/profile` - Get current teacher profile
- `GET /api/teacher/my-grades` - Get teacher's grades

## Error Log Analysis

```
18:21:55.530 DEBUG [http-nio-3030-exec-5] o.s.w.s.h.SimpleUrlHandlerMapping - Mapped to ResourceHttpRequestHandler
18:21:55.537 DEBUG [http-nio-3030-exec-5] o.s.w.s.r.ResourceHttpRequestHandler - Resource not found
18:21:55.542 DEBUG [http-nio-3030-exec-5] o.s.w.s.m.s.DefaultHandlerExceptionResolver - Resolved [org.springframework.web.servlet.resource.NoResourceFoundException: No static resource api/teachers.]
```

This shows Spring is treating API requests as static resource requests, indicating the endpoints don't exist.

## Required Frontend Changes

### Option 1: Update Frontend to Match Backend URLs

Update your frontend API calls from:

```javascript
// WRONG - These don't exist
GET /api/students
GET /api/teachers  
GET /api/departments
GET /api/subjects
GET /api/me
```

To:

```javascript
// CORRECT - These exist in backend
GET /api/admin/department        // For departments
GET /api/admin/subjects          // For subjects
GET /api/student/profile         // For current student
GET /api/teacher/profile         // For current teacher
GET /api/auth/admin/profile      // For current admin
```

### Option 2: Add Missing Endpoints to Backend

If you prefer to keep frontend URLs, add these endpoints to your backend:

#### Add to StudentController:
```java
@GetMapping("/students")
@Operation(summary = "Get all students")
public ResponseEntity<List<StudentResponse>> getAllStudents() {
    return new ResponseEntity<>(studentService.getAllStudents(), HttpStatus.OK);
}
```

#### Add to TeacherController:
```java
@GetMapping("/teachers")
@Operation(summary = "Get all teachers")
public ResponseEntity<List<TeacherResponse>> getAllTeachers() {
    return new ResponseEntity<>(teacherService.getAllTeachers(), HttpStatus.OK);
}
```

#### Add to DepartmentController:
```java
@GetMapping("/departments")
@Operation(summary = "Get all departments")
public ResponseEntity<DepartmentResponse> getAllDepartments() {
    return new ResponseEntity<>(departmentService.getAllDepartments(0, 10, "name", "asc"), HttpStatus.OK);
}
```

#### Add to SubjectController:
```java
@GetMapping("/subjects")
@Operation(summary = "Get all subjects")
public ResponseEntity<SubjectResponse> getAllSubjects() {
    return new ResponseEntity<>(subjectService.getAllSubjects(0, 10, "name", "asc"), HttpStatus.OK);
}
```

#### Add Universal Profile Endpoint:
Create a new controller or add to AuthController:
```java
@GetMapping("/me")
@Operation(summary = "Get current user profile")
public ResponseEntity<UserResponse> getCurrentUser(Authentication authentication) {
    return new ResponseEntity<>(authService.getCurrentUser(authentication), HttpStatus.OK);
}
```

## Authentication Flow Issue

The logs show successful login:
```
18:21:54.193 DEBUG [http-nio-3030-exec-2] o.s.s.a.d.DaoAuthenticationProvider - Authenticated user
```

But subsequent requests fail because:
1. Endpoints don't exist (404)
2. JWT token might not be properly sent in headers
3. CORS preflight requests are being made

## Recommended Solution

**For immediate fix:** Update your frontend to use the correct backend endpoints listed above.

**For long-term:** Consider standardizing your API design:
- Use consistent URL patterns
- Follow RESTful conventions
- Add the missing endpoints if needed by frontend

## Testing the Fix

After implementing changes, test with:

```bash
# Test existing endpoints
curl -H "Authorization: Bearer <token>" http://localhost:3030/api/admin/department
curl -H "Authorization: Bearer <token>" http://localhost:3030/api/admin/subjects

# Test if new endpoints work (if added)
curl -H "Authorization: Bearer <token>" http://localhost:3030/api/students
curl -H "Authorization: Bearer <token>" http://localhost:3030/api/teachers
```

## Additional Notes

- Your JWT authentication is working correctly
- The issue is purely endpoint mapping mismatch
- Consider using Swagger UI at `http://localhost:3030/swagger-ui.html` to see all available endpoints
- Check your frontend's API service configuration files