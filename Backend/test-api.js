/**
 * SkillSync Backend Automated API Verification Test
 */
const { calculateSkillMatch } = require('./services/matchingEngine');
const { mockStore } = require('./config/mockStore');
const { findUserByEmail } = require('./models/User');
const { getAllPostings } = require('./models/Posting');
const { getAllSkills } = require('./models/Skill');
const { getApplicationsByStudent } = require('./models/Application');

async function testBackend() {
    console.log('🧪 Starting SkillSync Backend Verification Test Suite...\n');

    let passed = 0;
    let failed = 0;

    function assert(condition, testName) {
        if (condition) {
            console.log(`  ✅ PASS: ${testName}`);
            passed++;
        } else {
            console.error(`  ❌ FAIL: ${testName}`);
            failed++;
        }
    }

    // 1. Skill Matching Engine
    console.log('1. Testing Skill Matching Engine:');
    const match1 = calculateSkillMatch(['React', 'Node.js', 'PostgreSQL', 'Docker'], [
        { name: 'React', weight: 1.5, required: true },
        { name: 'Node.js', weight: 1.5, required: true },
        { name: 'Docker', weight: 1.0, required: false }
    ]);
    assert(match1.matchScore === 100, `Full match score is 100% (Got ${match1.matchScore}%)`);
    assert(match1.matchedSkills.length === 3, 'All 3 required skills matched');
    assert(match1.missingSkills.length === 0, '0 missing skills');

    const match2 = calculateSkillMatch(['Python'], [
        { name: 'React.js', weight: 1.5, required: true },
        { name: 'Node.js', weight: 1.5, required: true }
    ]);
    assert(match2.matchScore === 0, `Zero match score is 0% (Got ${match2.matchScore}%)`);
    assert(match2.missingSkills.length === 2, '2 missing skill gaps identified');

    // 2. Auth & Users
    console.log('\n2. Testing User Models & Auth Store:');
    const studentUser = await findUserByEmail('student@skillsync.edu');
    assert(studentUser !== null, 'Found demo student account (student@skillsync.edu)');
    assert(studentUser.role === 'student', 'Student role verified');

    const recruiterUser = await findUserByEmail('recruiter@skillsync.io');
    assert(recruiterUser !== null, 'Found demo recruiter account (recruiter@skillsync.io)');
    assert(recruiterUser.role === 'recruiter', 'Recruiter role verified');

    const tpoUser = await findUserByEmail('tpo@skillsync.edu');
    assert(tpoUser !== null, 'Found demo TPO account (tpo@skillsync.edu)');
    assert(tpoUser.role === 'college_tpo', 'TPO role verified');

    // 3. Postings & Skill Taxonomy
    console.log('\n3. Testing Postings & Skill Taxonomy:');
    const postings = await getAllPostings();
    assert(postings.length >= 4, `Postings loaded successfully (${postings.length} postings)`);

    const skills = await getAllSkills();
    assert(skills.length >= 20, `Skill taxonomy populated (${skills.length} skills)`);

    // 4. Applications Pipeline
    console.log('\n4. Testing Applications Pipeline:');
    const apps = await getApplicationsByStudent(1);
    assert(apps.length >= 1, `Student applications retrieved (${apps.length} applications)`);
    assert(apps[0].status_history !== undefined, 'Application status audit history present');

    console.log(`\n========================================`);
    console.log(`Results: ${passed} Passed, ${failed} Failed`);
    console.log(`========================================\n`);

    if (failed > 0) process.exit(1);
}

testBackend();
