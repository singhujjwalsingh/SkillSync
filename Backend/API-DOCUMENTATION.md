# SkillSync API & Architecture Documentation
## Smart India Hackathon — Problem Statement 26044
### Portal for Academia-Industry Collaboration for Skill Mapping, Internships, and Placement

---

## 1. System Overview
SkillSync connects **Students**, **Recruiters**, and **College Placement Officers (TPOs)** through a high-precision **Skill-Mapping Engine** that computes compatibility percentages and skill-gap audits.

---

## 2. Authentication & Authorization
Base URL: `/api/auth`

| Method | Endpoint | Description | Protected | Roles |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user with role (`student`, `recruiter`, `college_tpo`) | No | Any |
| `POST` | `/api/auth/login` | Sign in with email and password | No | Any |
| `GET` | `/api/auth/me` | Retrieve active authenticated session and profile | Yes | All |
| `POST` | `/api/auth/forgot-password` | Generate password reset simulation token | No | Any |
| `POST` | `/api/auth/reset-password` | Set new password with verified token | No | Any |
| `POST` | `/api/auth/change-password` | Change account password | Yes | All |

---

## 3. Standardized Skill Taxonomy & Matching Engine
Base URL: `/api/skills` & `/api/matching`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/skills` | List all standardized skill taxonomy items |
| `GET` | `/api/skills/search?q=:query` | Search skills by name or alias (e.g. `React`, `js`, `k8s`) |
| `POST` | `/api/skills` | Add new skill to the taxonomy |
| `POST` | `/api/matching/score` | Compute match % between candidate skills and job requirements |
| `POST` | `/api/matching/batch` | Score a student's skills against all active postings |

---

## 4. Student Module
Base URL: `/api/student` (Guarded: `student`, `admin`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/student/profile` | Retrieve student profile, roll no, department, and skills |
| `PUT` | `/api/student/profile` | Update academic details, skill list, and portfolio links |
| `GET` | `/api/student/postings` | Browse active postings dynamically scored for student |
| `GET` | `/api/student/postings/:id` | View posting with detailed matched vs gap skill breakdown |
| `POST` | `/api/student/apply` | 1-Click apply with current match score audit snapshot |
| `GET` | `/api/student/applications` | View my applications and real-time status history timeline |

---

## 5. Recruiter Module
Base URL: `/api/recruiter` (Guarded: `recruiter`, `admin`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/recruiter/profile` | Get company profile and verified badge status |
| `PUT` | `/api/recruiter/profile` | Update company description, logo, website, and industry |
| `GET` | `/api/recruiter/postings` | Get all postings created by recruiter with applicant counts |
| `POST` | `/api/recruiter/postings` | Create new posting with weighted required vs optional skills |
| `PUT` | `/api/recruiter/postings/:id` | Edit active posting parameters |
| `DELETE` | `/api/recruiter/postings/:id` | Archive / Remove job posting |
| `GET` | `/api/recruiter/postings/:id/applicants` | View applicants ranked descending by match score % |
| `PUT` | `/api/recruiter/applications/:id/status` | Update candidate pipeline status with audit note |

---

## 6. College TPO Module
Base URL: `/api/college` (Guarded: `college_tpo`, `admin`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/college/dashboard` | Placement stats, pending approvals, and active metrics |
| `GET` | `/api/college/students` | Search and filter student roster by branch and status |
| `PUT` | `/api/college/students/:id/approval` | Approve or reject student profile for company applications |
| `GET` | `/api/college/analytics` | Recharts aggregated placement %, skill gap trends, and funnel |

---

## 7. Demo Persona Credentials

| Persona | Role | Email | Password |
|---|---|---|---|
| **Student** | Aarav Sharma (CSE) | `student@skillsync.edu` | `password123` |
| **Recruiter** | Nexus Cloud Technologies | `recruiter@skillsync.io` | `password123` |
| **College TPO** | Dr. Ramesh Gupta (NIT Delhi) | `tpo@skillsync.edu` | `password123` |