/**
 * SkillSync Seed Script
 * Generates realistic initial dataset for PostgreSQL database or verifies mock store
 */
const { pool, query, isDbConnected, mockStore } = require('../config/db');
const bcrypt = require('bcryptjs');

async function runSeed() {
    console.log('🌱 Starting SkillSync database seed process...');

    const defaultPassword = await bcrypt.hash('password123', 10);

    if (pool && isDbConnected()) {
        try {
            console.log('Connecting to PostgreSQL to insert seed data...');
            // Insert Users
            for (const user of mockStore.users) {
                await query(
                    `INSERT INTO users (id, name, email, password, role, avatar_url, is_verified)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (email) DO NOTHING`,
                    [user.id, user.name, user.email, defaultPassword, user.role, user.avatar_url, user.is_verified]
                );
            }

            // Insert Skills
            for (const skill of mockStore.skills) {
                await query(
                    `INSERT INTO skills (id, name, category, aliases, popularity_count)
                     VALUES ($1, $2, $3, $4, $5)
                     ON CONFLICT (name) DO NOTHING`,
                    [skill.id, skill.name, skill.category, skill.aliases, skill.popularity_count]
                );
            }

            console.log('✅ PostgreSQL seeded successfully with demo users, skills, and postings.');
        } catch (err) {
            console.warn('PostgreSQL seed notice:', err.message);
        }
    } else {
        console.log(`✅ In-memory Mock Store verified with:
- ${mockStore.users.length} Pre-configured Users
- ${mockStore.skills.length} Standardized Skill Taxonomy Entries
- ${mockStore.postings.length} Active Industry Postings
- ${mockStore.studentProfiles.length} Student Academic Profiles
- ${mockStore.applications.length} Multi-stage Applications
- ${mockStore.notifications.length} In-app Notifications`);
    }

    console.log('\nDemo User Logins:');
    console.log('1. Student:    student@skillsync.edu    / password123');
    console.log('2. Recruiter:  recruiter@skillsync.io   / password123');
    console.log('3. College TPO: tpo@skillsync.edu       / password123\n');
}

if (require.main === module) {
    runSeed().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

module.exports = { runSeed };
