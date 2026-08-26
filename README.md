# SkillSync

**SkillSync** is a centralized Academia–Industry Collaboration Portal built for Smart India Hackathon (SIH) 2026. It connects **students**, **industries**, and **academicians** on a single platform to bridge the gap between academic learning and industry requirements — enabling skill assessment, internship/job matching, industry-academia collaboration, and placement tracking.

---

## 🚩 Problem Statement

A significant gap exists between the skills acquired in academic institutions and the competencies expected by industries. Students struggle to identify relevant skills for their career paths, industries struggle to find the right candidates, and academicians have limited visibility into industry collaboration opportunities. SkillSync solves this by providing a unified, intelligent platform for skill development, internships, and placements.

---

## ✨ Key Features

- **Skill Assessment & Profiling** — Questionnaire-based evaluation of technical and soft skills, generating a personalized skill profile with gap analysis.
- **Skill Mapping** — Recommends industries, job roles, and learning programs based on the student's skill profile.
- **Internship & Job Portal** — Industries post internships/jobs; students get matched recommendations and can apply and track applications.
- **Industry Learning Programs** — Companies publish training, certifications, workshops, and mentorship programs.
- **Academician Collaboration Hub** — Faculty internships, industrial training, FDPs, consultancy, and research collaboration opportunities.
- **Digital Portfolio** — Verified skills, certifications, projects, and achievements for each student.
- **Institution Analytics Dashboard** — Tracks student skill development, internship participation, and placement outcomes.
- **Role-Based Access Control** — Separate experiences for Students, Industries, Academicians, and Institution Admins.

---

## 🛠️ Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Frontend       | React.js (React Router, Context API / Redux) |
| Backend        | Node.js, Express.js                 |
| Database       | SQL (MySQL / PostgreSQL)            |
| Authentication | JWT-based role authentication        |
| API            | RESTful APIs                        |
| Styling        | CSS / Tailwind CSS (update as applicable) |

---

## 📂 Project Structure

```
SkillSync/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages (Student, Industry, Academician, Institution)
│   │   ├── services/       # API call handlers
│   │   ├── context/        # Auth/Global state
│   │   ├── routes/         # Route definitions & role-based guards
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── config/              # DB config, env setup
│   ├── controllers/         # Route logic
│   ├── models/              # SQL models/schemas
│   ├── routes/               # API route definitions
│   ├── middleware/           # Auth, error handling
│   ├── utils/                 # Helper functions
│   ├── server.js
│   └── package.json
│
├── database/
│   └── schema.sql            # Database schema & seed data
│
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Before running this project, ensure you have installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- SQL Database (MySQL or PostgreSQL)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/SkillSync.git
cd SkillSync
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (use `.env.example` as reference):

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=2442
DB_NAME=skillsync_db
JWT_SECRET=your_jwt_secret
```

Set up the database:

```bash
# Import the schema
mysql -u root -p skillsync_db < ../database/schema.sql
```

Run the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm start
```

The frontend will run on `http://localhost:3000`.

---

## 👥 User Roles

| Role         | Capabilities                                                                 |
|--------------|-------------------------------------------------------------------------------|
| Student      | Take skill assessment, view skill gaps, browse & apply to internships/jobs, build digital portfolio |
| Industry     | Post internships/jobs, publish learning programs, shortlist candidates, view analytics |
| Academician  | Explore FDPs, industrial training, consultancy & research collaboration opportunities |
| Institution  | Monitor student progress, view placement & skill development analytics       |

---

## 📊 Core Modules

1. **Skill Development** — Assessment, profiling, personalized learning recommendations, career guidance
2. **Internship Management** — Posting, matching, application tracking, mentor feedback
3. **Placement Management** — Job postings, recommendation engine, shortlisting, recruitment tracking
4. **Analytics & Reporting** — Dashboards for institutions and industries on skill trends and outcomes

---

## 🗺️ Roadmap

- [ ] Phase 1: Core UI (Student, Industry, Academician, Institution dashboards)
- [ ] Phase 2: Skill assessment engine & recommendation algorithm
- [ ] Phase 3: Internship/job matching and application tracking
- [ ] Phase 4: Analytics dashboards & digital portfolio
- [ ] Phase 5: Third-party integrations (learning platforms, certification providers)

---

## 🤝 Contributing

This project is being developed for SIH 2026. Team members can contribute via feature branches and pull requests.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is developed for Smart India Hackathon 2026 under COMMIT CREW. All rights reserved unless otherwise specified.

---

## 📧 Contact

For queries regarding this project, reach out to the SkillSync team.
