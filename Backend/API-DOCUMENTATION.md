# SkillSync Backend — API Documentation

**Base URL (local development):** `http://localhost:3000`

**Authentication:** Most endpoints require a JWT token. After logging in, include this header on every protected request:


Tokens are role-specific — a **student** token and a **recruiter** token behave differently on role-protected routes (see P2 section).

---

## Auth

### Register
`POST /api/auth/register`

**Body:**
```json
{
  "name": "Test Student",
  "email": "test@student.com",
  "password": "test1234",
  "role": "student"
}
```
`role` must be either `"student"` or `"recruiter"`.

**Response:** `201 Created` — returns a message, token, and user object.

---

### Login
`POST /api/auth/login`

**Body:**
```json
{
  "email": "test@student.com",
  "password": "test1234"
}
```

**Response:** `200 OK` — returns a fresh token. Use this token for all subsequent requests.

---

## P1 — Student Module

### Get profile
`GET /api/student/profile`
🔒 Auth required.

**Response:** current user's `id`, `name`, `email`, `role`, `college`, `bio`, `phone`, `resume_url`.

---

### Update profile
`PUT /api/student/profile`
🔒 Auth required.

**Body:**
```json
{
  "college": "XYZ College",
  "bio": "CS student",
  "phone": "9999999999"
}
```

---

### Add a skill
`POST /api/skills`
🔒 Auth required.

**Body:**
```json
{
  "skillName": "JavaScript",
  "proficiency": "Intermediate"
}
```

---

### Get my skills
`GET /api/skills`
🔒 Auth required.

**Response:** array of `{ id, skill_name, proficiency }`.

---

### Update a skill
`PUT /api/skills/:id`
🔒 Auth required. `:id` is the `student_skills` row id (from the GET response above, not the skill name).

**Body:**
```json
{ "proficiency": "Advanced" }
```

---

### Delete a skill
`DELETE /api/skills/:id`
🔒 Auth required.

---

### Upload resume
`POST /api/resume/upload`
🔒 Auth required.

**Body:** `form-data`, key = `resume`, type = **File**. Accepts `.pdf`, `.doc`, `.docx` (max 5MB).

---

### Download resume
`GET /api/resume`
🔒 Auth required. Returns the file for download.

---

### Browse internships
`GET /api/internships`
🔒 Auth required.

**Optional query params:** `?skill=React` and/or `?location=Delhi` — both do partial, case-insensitive matching.

---

### Internship details
`GET /api/internships/:id`
🔒 Auth required.

---

### Apply to an internship
`POST /api/internships/:id/apply`
🔒 Auth required (student token). No body needed.

Returns `400` with `"You have already applied to this internship"` if applied before — this is expected, not a bug.

---

## P2 — Recruiter Module

All routes below require a **recruiter** token. Using a student token returns `403 Forbidden` — `"Only recruiters can perform this action"`.

### Create a posting
`POST /api/recruiter/postings`
🔒 Auth required, role = recruiter.

**Body:**
```json
{
  "title": "Marketing Intern",
  "company": "AdWorks",
  "location": "Mumbai",
  "required_skills": "Communication, Canva, Social Media",
  "description": "Assist with social media campaigns."
}
```

---

### Edit a posting
`PUT /api/recruiter/postings/:id`
🔒 Auth required, role = recruiter, and must be the posting's creator.

**Body:** same shape as create.

---

### Delete a posting
`DELETE /api/recruiter/postings/:id`
🔒 Auth required, role = recruiter, and must be the posting's creator.

---

### My postings
`GET /api/recruiter/postings`
🔒 Auth required, role = recruiter. Returns only postings created by the logged-in recruiter.

---

### View applicants for a posting
`GET /api/recruiter/postings/:id/applicants`
🔒 Auth required, role = recruiter, and must own the posting.

**Response:** array of `{ application_id, status, applied_at, student_id, name, email }`.

---

## Not yet built (waiting on other team members)

- **P3 — Skill matching engine:** will expose a scoring API (student skills vs. posting `required_skills`). Once ready, `GET /api/internships` and the applicants list can be extended to include a match %.
- **P4 — College/TPO module:** account approval, dashboard shell — separate module, not part of P1/P2.

---

*Last updated: after P1 + P2 backend completion, tested via Postman.*