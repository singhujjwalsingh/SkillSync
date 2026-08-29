# Full PRD — SIH 26044: Academia-Industry Portal
## Frontend + Backend Requirements, with Detailed UI/Design Spec (Light Neumorphism)

---

# 1. Project Overview

**Problem Statement:** PS 26044 — Portal for Academia-Industry Collaboration for Skill Mapping, Internships and Placement.

**Core idea:** a three-sided portal connecting **Students** (build skill profile, apply to internships), **Recruiters** (post opportunities, find matching candidates), and **College TPOs** (approve students, track placement analytics) — differentiated by a **skill-mapping engine** that scores students against posting requirements instead of acting as a plain job board.

**Tech stack:** React (frontend) · Node.js + Express (backend) · MongoDB/Mongoose (database) · JWT + bcrypt (auth) · Recharts (analytics) · Cloudinary/S3 or local storage (resumes/files).

---

# 2. Backend Requirements

### 2.1 Database Collections
| Collection | Purpose |
|---|---|
| `Users` | Base auth record — email, passwordHash, role, isVerified |
| `StudentProfiles` | Student academic info, skills[], resume, approval status |
| `RecruiterProfiles` | Company info, verification status |
| `Colleges` | College info, linked TPO admin |
| `Skills` | Shared taxonomy — single source of truth for all skill references |
| `Postings` | Internship/job listings with required skills, stipend, deadline |
| `Applications` | Student-posting link, status pipeline, statusHistory |
| `Notifications` | In-app alerts on status changes |

### 2.2 Modules & API Surface

**Auth & Signup**
- Register/login (role-aware), JWT access + refresh tokens, forgot/reset password
- Role-based middleware guarding every downstream route

**Student Module**
- Profile CRUD, skill selection (from taxonomy), resume upload
- Browse/search/filter postings, apply, view own applications + status timeline

**Recruiter Module**
- Company profile setup
- Posting CRUD, applicant list with filter/sort by match score, status updates

**Skill Matching Engine**
- Compute match score, matched skills, and gap list between a student and a posting
- Weighted required skills support
- Exposed as a reusable service + standalone API endpoint

**College/TPO Module**
- Approve/manage student accounts
- View postings/applications relevant to their students
- Analytics aggregation: placement %, top missing skills, applicant funnel

**Application Workflow & Notifications**
- Status state machine with audit trail
- Notification triggers on every status change

### 2.3 Non-functional backend requirements
- Input validation on every write endpoint (skills, dates, enums)
- Rate limiting on auth endpoints
- Centralized error-handling middleware with consistent error JSON shape
- Environment-based config (dev/staging/prod)
- Seed script for realistic demo data

---

# 3. Frontend Requirements

### 3.1 Screens by role

**Shared**
- Landing/marketing page
- Signup (role selection) / Login / Forgot-password flow

**Student**
- Profile setup wizard (basic info → skills → resume → portfolio links)
- Dashboard (recommended postings, application status summary, notifications)
- Posting browse/search/filter page
- Posting detail page (shows match score + skill gap)
- My Applications page (status timeline per application)

**Recruiter**
- Company profile setup
- Dashboard (own postings, applicant counts)
- Create/edit posting form
- Applicant list page (filter/sort by match score, status controls)

**College/TPO**
- Dashboard (pending approvals, placement stats)
- Student management (approve/view list)
- Analytics page (charts: placement %, skill-gap trends, funnel)

### 3.2 Functional frontend requirements
- Build every screen against the agreed API contract; use mocked JSON matching that shape until the real endpoint is live, then swap in the real call
- Every screen needs a loading state and an error state, not just the happy path
- Role-based routing/redirects immediately after login
- Form validation with inline, human-readable error messages
- Responsive layout — must work on a laptop screen for live demo, and reasonably on tablet/mobile

---

# 4. UI / Design Specification — Light Neumorphism Theme

This is the visual identity for the entire product. Every screen listed above should be built to this spec so the app feels like one cohesive product, not four separately-styled modules.

### 4.1 Design philosophy
Neumorphism (soft UI) makes elements look like they're gently extruded from or pressed into the same background surface — achieved through subtle dual shadows rather than borders or flat drop-shadows. Kept **light** (not the darker neumorphism variant) so it reads as clean, modern, and approachable — appropriate for a student/recruiter-facing product, not a dark dashboard tool.

### 4.2 Color palette
| Token | Use | Example |
|---|---|---|
| Base background | Page background, card background | Soft off-white / very light warm grey (e.g. `#EDEFF4` – `#F0F2F7`) |
| Light shadow | Top-left highlight on extruded elements | Near-white, slightly warmer than base (e.g. `#FFFFFF`) |
| Dark shadow | Bottom-right shadow on extruded elements | Slightly darker grey-blue than base (e.g. `#C8CCD6`) |
| Primary accent | Buttons, active states, score indicators | A single confident accent — e.g. a soft indigo or teal — used sparingly so it stands out against the muted base |
| Secondary accent | Success/matched-skill tags | Muted green |
| Warning accent | Gap/missing-skill tags, pending states | Muted amber |
| Text primary | Headings, body | Dark slate grey, not pure black (softer against the light base) |
| Text secondary | Captions, metadata | Mid-grey |

**Rule:** keep the palette mostly monochromatic (base + two shadow tones) and reserve color for the 1–2 accents that carry meaning — this is what makes neumorphism look clean rather than muddy.

### 4.3 Shadow & elevation system
- **Raised elements** (cards, buttons, nav items in default state): dual box-shadow — light shadow offset top-left, dark shadow offset bottom-right, soft blur, no hard edges, no visible border.
- **Pressed/inset elements** (active input fields, toggled buttons, the score indicator's track): shadow direction inverts — appears pressed into the surface rather than raised out of it.
- **Hover state:** slightly increase shadow spread/blur so the element appears to lift a touch.
- **Active/press state:** briefly switch to the inset shadow style, so clicking feels tactile.
- Keep corner radius generously rounded and consistent across all elevated elements (buttons, cards, inputs) — sharp corners break the soft-UI feel.

### 4.4 Creative background design
The base background shouldn't be a flat single color — that reads static and cheap in neumorphism. Instead:
- Use a **very subtle large-scale gradient** across the page (e.g. barely-perceptible diagonal shift between two close tones of the base color) so the surface has gentle depth even before any component is placed on it.
- Add **soft, oversized blurred blob shapes** (large circles/organic shapes at low opacity, heavily blurred) positioned in page corners or behind hero sections — using the accent color at very low opacity so they add visual interest without competing with content. This works especially well behind the landing page and dashboard headers.
- On the landing/marketing page specifically, consider a **subtle abstract network/dot pattern** (very low opacity, thin lines connecting dots) in the hero background — this visually reinforces the "connecting students, recruiters, colleges" concept without being literal or cluttered.
- Keep all background decoration **behind and clearly subordinate to** foreground cards — it should never reduce text contrast or compete with the neumorphic elements sitting on top of it.

### 4.5 Typography
- One clean sans-serif family throughout (e.g. Inter, Poppins, or similar) — avoid mixing multiple typefaces
- Clear hierarchy: page titles bold and larger, section headers medium-bold, body text regular weight
- Generous line-height and letter-spacing — neumorphism reads best with breathing room, not dense text blocks

### 4.6 Key components to design first (design-system priority order)
1. **Button** (raised default, inset on press, disabled = flattened/lower contrast)
2. **Card** (raised container — used for postings, applicant rows, dashboard tiles)
3. **Input field** (inset by default — text fields, dropdowns, search bar)
4. **Match-score indicator** — circular or bar progress, styled with an embossed track and a raised or accent-filled progress fill; this is the single most important visual element in the product since it's the differentiator, so give it more visual weight than a standard progress bar
5. **Skill tag/chip** (small raised pill — green tint for matched, amber tint for gap/missing)
6. **Navbar/sidebar** (raised bar, active item shown with inset/pressed styling to indicate current page)
7. **Status pipeline indicator** (applied → shortlisted → interview → offered) — a horizontal stepper with raised circles for completed stages, inset/flattened for pending stages

### 4.7 Accessibility notes
- Because neumorphism relies on subtle shadows rather than borders, verify text contrast meets WCAG AA against the light base background — don't let muted text tones get too faint
- Don't rely on color alone to distinguish matched vs. missing skills — pair color with an icon or label (checkmark vs. dash) as well
- Ensure focus states (keyboard navigation) are clearly visible even in the soft-shadow system — a visible focus ring/outline should override the neumorphic style when an element is tab-focused

### 4.8 Consistency rule
Every one of the screens listed in Section 3.1 must reuse the same shadow tokens, color palette, and component set from 4.2–4.6 — no screen should introduce its own one-off button style, card shadow, or accent color. This consistency is what turns four independently-built modules (student, recruiter, TPO, matching) into one coherent product for the demo.
