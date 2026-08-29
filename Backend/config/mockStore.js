/**
 * SkillSync Mock & Seed Store
 * Provides rich in-memory data store with dual-sync capability
 */
const bcrypt = require('bcryptjs');

const initialPasswordHash = bcrypt.hashSync('password123', 10);

const SKILLS_TAXONOMY = [
    { id: 1, name: 'React', category: 'Frontend', aliases: ['react.js', 'reactjs'], popularity_count: 95 },
    { id: 2, name: 'JavaScript', category: 'Frontend', aliases: ['js', 'es6', 'ecmascript'], popularity_count: 98 },
    { id: 3, name: 'TypeScript', category: 'Frontend', aliases: ['ts'], popularity_count: 88 },
    { id: 4, name: 'Node.js', category: 'Backend', aliases: ['node', 'nodejs'], popularity_count: 92 },
    { id: 5, name: 'Express.js', category: 'Backend', aliases: ['express'], popularity_count: 85 },
    { id: 6, name: 'Python', category: 'Backend', aliases: ['py', 'python3'], popularity_count: 94 },
    { id: 7, name: 'PostgreSQL', category: 'Database', aliases: ['postgres', 'pgsql'], popularity_count: 82 },
    { id: 8, name: 'MongoDB', category: 'Database', aliases: ['mongo', 'nosql'], popularity_count: 80 },
    { id: 9, name: 'Docker', category: 'DevOps', aliases: ['containerization'], popularity_count: 78 },
    { id: 10, name: 'AWS', category: 'Cloud', aliases: ['amazon web services', 's3', 'ec2'], popularity_count: 84 },
    { id: 11, name: 'Tailwind CSS', category: 'Frontend', aliases: ['tailwind', 'tailwindcss'], popularity_count: 89 },
    { id: 12, name: 'REST APIs', category: 'Backend', aliases: ['rest', 'restful api', 'api design'], popularity_count: 90 },
    { id: 13, name: 'GraphQL', category: 'Backend', aliases: ['gql'], popularity_count: 70 },
    { id: 14, name: 'Machine Learning', category: 'AI/ML', aliases: ['ml', 'scikit-learn', 'deep learning'], popularity_count: 86 },
    { id: 15, name: 'PyTorch', category: 'AI/ML', aliases: ['torch'], popularity_count: 76 },
    { id: 16, name: 'TensorFlow', category: 'AI/ML', aliases: ['tf', 'keras'], popularity_count: 74 },
    { id: 17, name: 'Git & GitHub', category: 'Tools', aliases: ['git', 'github', 'version control'], popularity_count: 96 },
    { id: 18, name: 'Data Structures & Algorithms', category: 'Core CS', aliases: ['dsa', 'algorithms'], popularity_count: 92 },
    { id: 19, name: 'Figma', category: 'Design', aliases: ['ui/ux', 'wireframing'], popularity_count: 75 },
    { id: 20, name: 'SQL', category: 'Database', aliases: ['relational database', 'queries'], popularity_count: 90 },
    { id: 21, name: 'Next.js', category: 'Frontend', aliases: ['nextjs', 'next'], popularity_count: 82 },
    { id: 22, name: 'Redis', category: 'Database', aliases: ['caching'], popularity_count: 68 },
    { id: 23, name: 'Kubernetes', category: 'DevOps', aliases: ['k8s'], popularity_count: 65 },
    { id: 24, name: 'Cybersecurity', category: 'Security', aliases: ['infosec', 'network security'], popularity_count: 70 },
];

const COLLEGES = [
    { id: 1, name: 'National Institute of Technology, Delhi', code: 'NITD', location: 'Delhi, India', tpo_user_id: 3, contact_email: 'tpo@nitd.ac.in' },
    { id: 2, name: 'Indian Institute of Information Technology', code: 'IIIT', location: 'Hyderabad, India', tpo_user_id: null, contact_email: 'placements@iiit.ac.in' },
    { id: 3, name: 'Delhi Technological University', code: 'DTU', location: 'Delhi, India', tpo_user_id: null, contact_email: 'tpo@dtu.ac.in' },
];

const USERS = [
    { id: 1, name: 'Aarav Sharma', email: 'student@skillsync.edu', password: initialPasswordHash, role: 'student', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', is_verified: true, created_at: new Date('2026-01-10') },
    { id: 2, name: 'Sarah Jenkins', email: 'recruiter@skillsync.io', password: initialPasswordHash, role: 'recruiter', avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', is_verified: true, created_at: new Date('2026-01-05') },
    { id: 3, name: 'Dr. Ramesh Gupta', email: 'tpo@skillsync.edu', password: initialPasswordHash, role: 'college_tpo', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', is_verified: true, created_at: new Date('2026-01-01') },
    { id: 4, name: 'Priya Patel', email: 'priya@skillsync.edu', password: initialPasswordHash, role: 'student', avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', is_verified: true, created_at: new Date('2026-01-12') },
    { id: 5, name: 'Rohan Verma', email: 'rohan@skillsync.edu', password: initialPasswordHash, role: 'student', avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', is_verified: false, created_at: new Date('2026-02-01') },
    { id: 6, name: 'Vikram Mehta', email: 'recruiter2@techcorp.com', password: initialPasswordHash, role: 'recruiter', avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', is_verified: true, created_at: new Date('2026-01-15') },
];

const STUDENT_PROFILES = [
    {
        id: 1,
        user_id: 1,
        college_id: 1,
        college_name: 'National Institute of Technology, Delhi',
        roll_no: '2022CS1042',
        department: 'Computer Science & Engineering',
        graduation_year: 2026,
        cgpa: 8.85,
        skills: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'Tailwind CSS', 'Git & GitHub', 'REST APIs', 'SQL'],
        bio: 'Passionate full-stack developer focusing on modern web apps, distributed systems, and responsive user interfaces.',
        phone: '+91 98765 43210',
        resume_url: '/uploads/resumes/aarav_sharma_resume.pdf',
        github_url: 'https://github.com/aaravsharma',
        linkedin_url: 'https://linkedin.com/in/aaravsharma',
        portfolio_url: 'https://aaravsharma.dev',
        approval_status: 'approved',
        created_at: new Date('2026-01-10')
    },
    {
        id: 2,
        user_id: 4,
        college_id: 1,
        college_name: 'National Institute of Technology, Delhi',
        roll_no: '2022IT1018',
        department: 'Information Technology',
        graduation_year: 2026,
        cgpa: 9.12,
        skills: ['Python', 'Machine Learning', 'PyTorch', 'TensorFlow', 'SQL', 'Git & GitHub', 'Docker', 'Data Structures & Algorithms'],
        bio: 'AI/ML Enthusiast exploring computer vision and natural language processing with hands-on deep learning projects.',
        phone: '+91 98123 45678',
        resume_url: '/uploads/resumes/priya_patel_resume.pdf',
        github_url: 'https://github.com/priyapatel',
        linkedin_url: 'https://linkedin.com/in/priyapatel',
        portfolio_url: 'https://priyapatel.ai',
        approval_status: 'approved',
        created_at: new Date('2026-01-12')
    },
    {
        id: 3,
        user_id: 5,
        college_id: 1,
        college_name: 'National Institute of Technology, Delhi',
        roll_no: '2023ECE1055',
        department: 'Electronics & Communication',
        graduation_year: 2027,
        cgpa: 7.95,
        skills: ['JavaScript', 'HTML5', 'CSS3', 'Python', 'Git & GitHub'],
        bio: 'Aspiring frontend developer interested in cloud computing and IoT integrations.',
        phone: '+91 97654 32109',
        resume_url: '/uploads/resumes/rohan_verma_resume.pdf',
        github_url: 'https://github.com/rohanverma',
        linkedin_url: 'https://linkedin.com/in/rohanverma',
        portfolio_url: '',
        approval_status: 'pending',
        created_at: new Date('2026-02-01')
    }
];

const RECRUITER_PROFILES = [
    {
        id: 1,
        user_id: 2,
        company_name: 'Nexus Cloud Technologies',
        industry: 'Cloud Infrastructure & SaaS',
        website: 'https://nexuscloud.io',
        logo_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
        description: 'Building next-generation cloud automation and intelligent infrastructure tools for hyper-growth enterprises.',
        location: 'Bengaluru / Remote',
        company_size: '250-500 Employees',
        is_verified: true,
        created_at: new Date('2026-01-05')
    },
    {
        id: 2,
        user_id: 6,
        company_name: 'Synthetix AI Labs',
        industry: 'Artificial Intelligence & Analytics',
        website: 'https://synthetix.ai',
        logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        description: 'Pioneering frontier LLM fine-tuning and enterprise autonomous agent deployments.',
        location: 'Hyderabad / Hybrid',
        company_size: '50-100 Employees',
        is_verified: true,
        created_at: new Date('2026-01-15')
    }
];

const POSTINGS = [
    {
        id: 1,
        recruiter_id: 2,
        company_name: 'Nexus Cloud Technologies',
        company_logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
        title: 'Full Stack Web Engineering Intern',
        role: 'Full Stack Developer',
        location: 'Bengaluru / Remote',
        stipend: '₹40,000 / month',
        type: 'Internship (6 Months)',
        duration: '6 Months',
        deadline: '2026-09-30',
        description: 'Join our core platform engineering team to build scalable micro-frontend architectures, high-performance REST and GraphQL APIs, and reliable cloud-native services.',
        required_skills: [
            { name: 'React', weight: 1.5, required: true },
            { name: 'Node.js', weight: 1.5, required: true },
            { name: 'TypeScript', weight: 1.2, required: false },
            { name: 'PostgreSQL', weight: 1.0, required: false },
            { name: 'Tailwind CSS', weight: 0.8, required: false },
            { name: 'Docker', weight: 1.0, required: false }
        ],
        perks: ['Pre-Placement Offer (PPO) Opportunity', 'Flexible Remote Work', 'Mentorship from Staff Engineers', 'Learning Budget ₹25,000'],
        is_active: true,
        created_at: new Date('2026-01-20')
    },
    {
        id: 2,
        recruiter_id: 6,
        company_name: 'Synthetix AI Labs',
        company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        title: 'Machine Learning Research Intern',
        role: 'AI / ML Engineer',
        location: 'Hyderabad / Hybrid',
        stipend: '₹50,000 / month',
        type: 'Internship (3-6 Months)',
        duration: '6 Months',
        deadline: '2026-10-15',
        description: 'Work on cutting-edge generative AI architectures, model compression techniques, and agentic workflows alongside our PhD research scientists.',
        required_skills: [
            { name: 'Python', weight: 1.5, required: true },
            { name: 'Machine Learning', weight: 1.5, required: true },
            { name: 'PyTorch', weight: 1.3, required: true },
            { name: 'Data Structures & Algorithms', weight: 1.0, required: false },
            { name: 'Docker', weight: 0.9, required: false }
        ],
        perks: ['High-PPO Conversion', 'Research Publication Support', 'Top-tier Compute Cluster Access'],
        is_active: true,
        created_at: new Date('2026-01-25')
    },
    {
        id: 3,
        recruiter_id: 2,
        company_name: 'Nexus Cloud Technologies',
        company_logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
        title: 'Frontend React UI/UX Specialist Intern',
        role: 'Frontend Engineer',
        location: 'Remote',
        stipend: '₹35,000 / month',
        type: 'Internship',
        duration: '3 Months',
        deadline: '2026-09-20',
        description: 'Design and implement soft neumorphic UI systems, interactive data visualizer dashboards, and accessible user flows.',
        required_skills: [
            { name: 'React', weight: 1.5, required: true },
            { name: 'JavaScript', weight: 1.3, required: true },
            { name: 'Tailwind CSS', weight: 1.2, required: true },
            { name: 'Figma', weight: 1.0, required: false },
            { name: 'TypeScript', weight: 0.9, required: false }
        ],
        perks: ['Work with award-winning design leads', 'Flexible Schedule', 'Certificate & Recommendation Letter'],
        is_active: true,
        created_at: new Date('2026-02-05')
    },
    {
        id: 4,
        recruiter_id: 6,
        company_name: 'Synthetix AI Labs',
        company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
        title: 'Cloud DevOps & SRE Intern',
        role: 'DevOps Engineer',
        location: 'Bengaluru / Hybrid',
        stipend: '₹45,000 / month',
        type: 'Internship',
        duration: '6 Months',
        deadline: '2026-10-01',
        description: 'Manage automated CI/CD pipelines, Kubernetes orchestration clusters, and infrastructure as code across multi-cloud environments.',
        required_skills: [
            { name: 'Docker', weight: 1.5, required: true },
            { name: 'AWS', weight: 1.4, required: true },
            { name: 'Kubernetes', weight: 1.3, required: false },
            { name: 'Python', weight: 1.0, required: false },
            { name: 'Git & GitHub', weight: 1.0, required: true }
        ],
        perks: ['AWS Certification Sponsorship', 'Health Insurance', 'PPO Opportunity'],
        is_active: true,
        created_at: new Date('2026-02-10')
    }
];

const APPLICATIONS = [
    {
        id: 1,
        student_id: 1, // Aarav Sharma
        posting_id: 1, // Full Stack Web Engineering Intern
        status: 'shortlisted',
        match_score: 88,
        matched_skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
        missing_skills: ['Docker', 'PostgreSQL'],
        status_history: [
            { status: 'applied', date: '2026-01-22T10:00:00Z', note: 'Application submitted with verified academic profile' },
            { status: 'shortlisted', date: '2026-01-26T14:30:00Z', note: 'Strong skill profile match (88%). Resume forwarded to engineering team.' }
        ],
        notes: 'Candidate completed advanced React project with state machine.',
        applied_at: new Date('2026-01-22')
    },
    {
        id: 2,
        student_id: 4, // Priya Patel
        posting_id: 2, // Machine Learning Research Intern
        status: 'interview',
        match_score: 95,
        matched_skills: ['Python', 'Machine Learning', 'PyTorch', 'Data Structures & Algorithms', 'Docker'],
        missing_skills: [],
        status_history: [
            { status: 'applied', date: '2026-01-27T09:15:00Z', note: 'Applied via college portal' },
            { status: 'shortlisted', date: '2026-01-29T11:00:00Z', note: 'Top 5% match score in candidate pool' },
            { status: 'interview', date: '2026-02-03T16:00:00Z', note: 'Technical Round scheduled for Feb 5th at 3:00 PM IST' }
        ],
        notes: 'Excellent research portfolio in deep learning computer vision.',
        applied_at: new Date('2026-01-27')
    },
    {
        id: 3,
        student_id: 1, // Aarav Sharma
        posting_id: 3, // Frontend React UI/UX Specialist Intern
        status: 'offered',
        match_score: 92,
        matched_skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript'],
        missing_skills: ['Figma'],
        status_history: [
            { status: 'applied', date: '2026-02-06T11:20:00Z', note: 'Application submitted' },
            { status: 'shortlisted', date: '2026-02-08T10:00:00Z', note: 'Shortlisted for practical assessment' },
            { status: 'interview', date: '2026-02-12T15:00:00Z', note: 'Cleared technical interview round' },
            { status: 'offered', date: '2026-02-16T18:00:00Z', note: 'Official Internship Offer Letter extended! Stipend: ₹35,000/mo' }
        ],
        notes: 'Stellar UI showcase during live technical demonstration.',
        applied_at: new Date('2026-02-06')
    }
];

const NOTIFICATIONS = [
    {
        id: 1,
        user_id: 1,
        title: '🎉 Internship Offer Received!',
        message: 'Synthetix AI / Nexus Cloud extended an internship offer for Frontend React UI/UX Specialist Intern.',
        type: 'application_status',
        is_read: false,
        link: '/applications',
        created_at: new Date('2026-02-16T18:05:00Z')
    },
    {
        id: 2,
        user_id: 1,
        title: 'Application Shortlisted',
        message: 'Your application for Full Stack Web Engineering Intern has been shortlisted by Nexus Cloud Technologies.',
        type: 'application_status',
        is_read: true,
        link: '/applications',
        created_at: new Date('2026-01-26T14:35:00Z')
    },
    {
        id: 3,
        user_id: 2,
        title: 'New Candidate Applied',
        message: 'Aarav Sharma (88% Skill Match) applied for Full Stack Web Engineering Intern.',
        type: 'recruiter',
        is_read: false,
        link: '/recruiter/applicants/1',
        created_at: new Date('2026-01-22T10:05:00Z')
    },
    {
        id: 4,
        user_id: 3,
        title: 'Student Verification Pending',
        message: 'Rohan Verma (2023ECE1055) submitted profile for TPO approval.',
        type: 'approval',
        is_read: false,
        link: '/tpo/students',
        created_at: new Date('2026-02-01T10:00:00Z')
    }
];

class MockStore {
    constructor() {
        this.users = [...USERS];
        this.studentProfiles = [...STUDENT_PROFILES];
        this.recruiterProfiles = [...RECRUITER_PROFILES];
        this.colleges = [...COLLEGES];
        this.skills = [...SKILLS_TAXONOMY];
        this.postings = [...POSTINGS];
        this.applications = [...APPLICATIONS];
        this.notifications = [...NOTIFICATIONS];
        this.nextUserId = 10;
        this.nextPostingId = 10;
        this.nextAppId = 10;
        this.nextNotifId = 10;
    }

    // Helpers
    findUserByEmail(email) {
        return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    findUserById(id) {
        return this.users.find(u => u.id === Number(id));
    }

    createUser(name, email, hashedPassword, role, avatarUrl = '') {
        const newUser = {
            id: this.nextUserId++,
            name,
            email,
            password: hashedPassword,
            role,
            avatar_url: avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
            is_verified: true,
            created_at: new Date()
        };
        this.users.push(newUser);

        // Auto-create initial profile
        if (role === 'student') {
            this.studentProfiles.push({
                id: this.studentProfiles.length + 1,
                user_id: newUser.id,
                college_id: 1,
                college_name: 'National Institute of Technology, Delhi',
                roll_no: `2024CS${Math.floor(1000 + Math.random() * 9000)}`,
                department: 'Computer Science',
                graduation_year: 2026,
                cgpa: 8.0,
                skills: ['JavaScript', 'React', 'Git & GitHub'],
                bio: 'Passionate student eager to learn and contribute to cutting-edge projects.',
                approval_status: 'approved',
                created_at: new Date()
            });
        } else if (role === 'recruiter') {
            this.recruiterProfiles.push({
                id: this.recruiterProfiles.length + 1,
                user_id: newUser.id,
                company_name: `${name}'s Organization`,
                industry: 'Information Technology',
                location: 'Remote',
                is_verified: true,
                created_at: new Date()
            });
        }

        return newUser;
    }

    getStudentProfile(userId) {
        return this.studentProfiles.find(sp => sp.user_id === Number(userId));
    }

    updateStudentProfile(userId, data) {
        let profile = this.getStudentProfile(userId);
        if (!profile) {
            profile = { id: this.studentProfiles.length + 1, user_id: Number(userId), ...data, created_at: new Date() };
            this.studentProfiles.push(profile);
        } else {
            Object.assign(profile, data, { updated_at: new Date() });
        }
        return profile;
    }

    getRecruiterProfile(userId) {
        return this.recruiterProfiles.find(rp => rp.user_id === Number(userId));
    }

    updateRecruiterProfile(userId, data) {
        let profile = this.getRecruiterProfile(userId);
        if (!profile) {
            profile = { id: this.recruiterProfiles.length + 1, user_id: Number(userId), ...data, created_at: new Date() };
            this.recruiterProfiles.push(profile);
        } else {
            Object.assign(profile, data, { updated_at: new Date() });
        }
        return profile;
    }

    getPostings() {
        return this.postings;
    }

    getPostingById(id) {
        return this.postings.find(p => p.id === Number(id));
    }

    createPosting(recruiterId, data) {
        const recruiter = this.findUserById(recruiterId);
        const profile = this.getRecruiterProfile(recruiterId);
        const newPosting = {
            id: this.nextPostingId++,
            recruiter_id: Number(recruiterId),
            company_name: profile?.company_name || recruiter?.name || 'Partner Company',
            company_logo: profile?.logo_url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
            title: data.title,
            role: data.role || data.title,
            location: data.location || 'Remote',
            stipend: data.stipend || 'Competitive',
            type: data.type || 'Internship',
            duration: data.duration || '3-6 Months',
            deadline: data.deadline || '2026-12-31',
            description: data.description || '',
            required_skills: Array.isArray(data.required_skills) ? data.required_skills : [],
            perks: Array.isArray(data.perks) ? data.perks : ['Certificate', 'Flexible Work'],
            is_active: true,
            created_at: new Date()
        };
        this.postings.unshift(newPosting);
        return newPosting;
    }

    updatePosting(id, recruiterId, data) {
        const posting = this.getPostingById(id);
        if (!posting || posting.recruiter_id !== Number(recruiterId)) return null;
        Object.assign(posting, data, { updated_at: new Date() });
        return posting;
    }

    deletePosting(id, recruiterId) {
        const idx = this.postings.findIndex(p => p.id === Number(id) && p.recruiter_id === Number(recruiterId));
        if (idx === -1) return false;
        this.postings.splice(idx, 1);
        return true;
    }

    getApplicationsByStudent(studentId) {
        return this.applications
            .filter(a => a.student_id === Number(studentId))
            .map(a => {
                const posting = this.getPostingById(a.posting_id);
                return { ...a, posting };
            });
    }

    getApplicationsByPosting(postingId) {
        return this.applications
            .filter(a => a.posting_id === Number(postingId))
            .map(a => {
                const student = this.findUserById(a.student_id);
                const profile = this.getStudentProfile(a.student_id);
                return { ...a, student, student_profile: profile };
            });
    }

    createApplication(studentId, postingId, matchResult) {
        const existing = this.applications.find(a => a.student_id === Number(studentId) && a.posting_id === Number(postingId));
        if (existing) return existing;

        const newApp = {
            id: this.nextAppId++,
            student_id: Number(studentId),
            posting_id: Number(postingId),
            status: 'applied',
            match_score: matchResult?.matchScore || 0,
            matched_skills: matchResult?.matchedSkills || [],
            missing_skills: matchResult?.missingSkills || [],
            status_history: [
                { status: 'applied', date: new Date().toISOString(), note: 'Application submitted successfully' }
            ],
            applied_at: new Date()
        };
        this.applications.unshift(newApp);

        // Auto notification to recruiter
        const posting = this.getPostingById(postingId);
        if (posting) {
            const student = this.findUserById(studentId);
            this.createNotification(
                posting.recruiter_id,
                'New Applicant Received',
                `${student?.name || 'A student'} applied for ${posting.title} (${matchResult?.matchScore || 0}% match)`,
                'recruiter',
                `/recruiter/applicants/${posting.id}`
            );
        }

        return newApp;
    }

    updateApplicationStatus(appId, status, note = '') {
        const app = this.applications.find(a => a.id === Number(appId));
        if (!app) return null;
        app.status = status;
        app.status_history.push({
            status,
            date: new Date().toISOString(),
            note: note || `Status updated to ${status}`
        });

        // Notify student
        const posting = this.getPostingById(app.posting_id);
        this.createNotification(
            app.student_id,
            `Application Update: ${status.toUpperCase()}`,
            `Your application for ${posting?.title || 'Internship'} has been updated to "${status}".`,
            'application_status',
            '/applications'
        );

        return app;
    }

    createNotification(userId, title, message, type = 'system', link = '') {
        const notif = {
            id: this.nextNotifId++,
            user_id: Number(userId),
            title,
            message,
            type,
            is_read: false,
            link,
            created_at: new Date()
        };
        this.notifications.unshift(notif);
        return notif;
    }

    getNotifications(userId) {
        return this.notifications.filter(n => n.user_id === Number(userId));
    }

    markNotificationRead(id, userId) {
        const notif = this.notifications.find(n => n.id === Number(id) && n.user_id === Number(userId));
        if (notif) notif.is_read = true;
        return notif;
    }

    markAllNotificationsRead(userId) {
        this.notifications.forEach(n => {
            if (n.user_id === Number(userId)) n.is_read = true;
        });
        return true;
    }

    getAllStudents() {
        return this.users
            .filter(u => u.role === 'student')
            .map(u => {
                const profile = this.getStudentProfile(u.id);
                return {
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    avatar_url: u.avatar_url,
                    ...profile
                };
            });
    }

    updateStudentApproval(studentUserId, status) {
        const profile = this.getStudentProfile(studentUserId);
        if (!profile) return null;
        profile.approval_status = status;
        
        this.createNotification(
            studentUserId,
            `Academic Profile ${status === 'approved' ? 'Approved ✅' : 'Review Update'}`,
            status === 'approved' ? 'Your college TPO has approved your profile. You can now apply for all verified company postings!' : 'Your profile status has been updated by your college TPO.',
            'approval',
            '/profile'
        );
        return profile;
    }
}

const mockStore = new MockStore();

module.exports = {
    mockStore,
    SKILLS_TAXONOMY
};
