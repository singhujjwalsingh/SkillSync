/**
 * SkillSync Intelligent Skill Matching Engine
 * PS 26044 — Core differentiator algorithm
 *
 * Capabilities:
 * - Weighted required vs optional skill scoring
 * - Alias normalization (e.g. React == React.js == ReactJS, Node == Node.js)
 * - Category alignment & multi-format input parsing
 * - Gap analysis (matched skills vs missing/gap skills)
 * - Tiers: Exceptional (>=90%), High (>=75%), Moderate (>=50%), Emerging (<50%)
 */

const SKILL_ALIASES = {
    'react': ['react.js', 'reactjs', 'react-js'],
    'javascript': ['js', 'es6', 'es2020', 'ecmascript'],
    'typescript': ['ts'],
    'node.js': ['node', 'nodejs', 'node-js'],
    'express.js': ['express', 'expressjs'],
    'python': ['py', 'python3', 'python2'],
    'postgresql': ['postgres', 'pgsql', 'psql'],
    'mongodb': ['mongo', 'nosql', 'mongoose'],
    'docker': ['containerization', 'containers'],
    'aws': ['amazon web services', 'ec2', 's3', 'lambda', 'cloud'],
    'tailwind css': ['tailwind', 'tailwindcss'],
    'rest apis': ['rest', 'restful api', 'api design', 'rest api', 'apis'],
    'graphql': ['gql', 'apollo'],
    'machine learning': ['ml', 'deep learning', 'scikit-learn', 'ai'],
    'pytorch': ['torch'],
    'tensorflow': ['tf', 'keras'],
    'git & github': ['git', 'github', 'version control', 'gitlab'],
    'data structures & algorithms': ['dsa', 'algorithms', 'data structures'],
    'figma': ['ui/ux', 'ui design', 'ux design', 'wireframing'],
    'sql': ['relational database', 'database', 'queries', 'mysql', 'sqlite'],
    'next.js': ['nextjs', 'next', 'next.js 14', 'next.js 15'],
    'redis': ['caching', 'in-memory db'],
    'kubernetes': ['k8s', 'orchestration'],
    'cybersecurity': ['infosec', 'network security', 'ethical hacking']
};

/**
 * Standardize skill string to clean normalized token
 */
function normalizeSkill(skillStr) {
    if (!skillStr) return '';
    const clean = String(skillStr).trim().toLowerCase().replace(/[-_.]+/g, ' ');
    
    // Check known aliases
    for (const [canonical, aliases] of Object.entries(SKILL_ALIASES)) {
        if (clean === canonical.toLowerCase() || aliases.some(a => a.toLowerCase() === clean)) {
            return canonical;
        }
        // Substring token match for compound terms
        if (aliases.some(a => clean.includes(a.toLowerCase())) || clean.includes(canonical.toLowerCase())) {
            return canonical;
        }
    }
    return clean;
}

/**
 * Extract skill name and proficiency from varied input formats
 * e.g. "React", { name: "React", level: "Advanced" }, { name: "React", weight: 1.5, required: true }
 */
function parseSkillItem(item) {
    if (!item) return { name: '', weight: 1.0, required: false, proficiencyMultiplier: 1.0 };
    
    if (typeof item === 'string') {
        return {
            name: item.trim(),
            normalized: normalizeSkill(item),
            weight: 1.0,
            required: false,
            proficiencyMultiplier: 1.0
        };
    }

    const name = item.name || item.skill || '';
    const weight = Number(item.weight) || (item.required ? 1.5 : 1.0);
    const required = Boolean(item.required);

    let proficiencyMultiplier = 1.0;
    if (item.proficiency || item.level) {
        const lvl = String(item.proficiency || item.level).toLowerCase();
        if (lvl.includes('expert') || lvl.includes('advanced')) proficiencyMultiplier = 1.0;
        else if (lvl.includes('intermediate') || lvl.includes('proficient')) proficiencyMultiplier = 0.88;
        else if (lvl.includes('beginner') || lvl.includes('basic')) proficiencyMultiplier = 0.70;
    }

    return {
        name,
        normalized: normalizeSkill(name),
        weight,
        required,
        proficiencyMultiplier
    };
}

/**
 * Compute comprehensive match score between a candidate's skills and a posting's required skills
 * @param {Array<string|Object>} candidateSkills - Array of student's skills
 * @param {Array<string|Object>} postingRequiredSkills - Array of job posting's required skills
 * @returns {Object} Match details
 */
function calculateSkillMatch(candidateSkills = [], postingRequiredSkills = []) {
    // Parse candidate skills
    const candidateList = Array.isArray(candidateSkills) ? candidateSkills : [];
    const parsedCandidate = candidateList.map(parseSkillItem).filter(s => s.name);
    const candidateNormalizedMap = new Map();
    parsedCandidate.forEach(c => {
        candidateNormalizedMap.set(c.normalized, c);
    });

    // Parse posting skills
    const postingList = Array.isArray(postingRequiredSkills) ? postingRequiredSkills : [];
    const parsedPosting = postingList.map(parseSkillItem).filter(s => s.name);

    if (parsedPosting.length === 0) {
        return {
            matchScore: 100,
            matchTier: 'Exceptional',
            matchedSkills: candidateList.map(s => typeof s === 'string' ? s : s.name),
            missingSkills: [],
            totalRequired: 0,
            totalMatched: 0,
            breakdown: { requiredScore: 100, optionalScore: 100, totalWeight: 0 }
        };
    }

    let totalWeight = 0;
    let earnedWeight = 0;
    const matchedSkills = [];
    const missingSkills = [];

    parsedPosting.forEach(requiredSkill => {
        const weight = requiredSkill.weight || 1.0;
        totalWeight += weight;

        // Check if student has normalized skill
        if (candidateNormalizedMap.has(requiredSkill.normalized)) {
            const studentSkill = candidateNormalizedMap.get(requiredSkill.normalized);
            const scoreForSkill = weight * (studentSkill.proficiencyMultiplier || 1.0);
            earnedWeight += scoreForSkill;
            matchedSkills.push({
                name: requiredSkill.name,
                canonical: requiredSkill.normalized,
                required: requiredSkill.required,
                weight
            });
        } else {
            missingSkills.push({
                name: requiredSkill.name,
                canonical: requiredSkill.normalized,
                required: requiredSkill.required,
                weight
            });
        }
    });

    // Calculate percentage (0 - 100)
    const rawScore = totalWeight > 0 ? (earnedWeight / totalWeight) * 100 : 0;
    const matchScore = Math.min(100, Math.max(0, Math.round(rawScore)));

    // Categorize match tier
    let matchTier = 'Emerging';
    if (matchScore >= 90) matchTier = 'Exceptional';
    else if (matchScore >= 75) matchTier = 'High';
    else if (matchScore >= 50) matchTier = 'Moderate';

    return {
        matchScore,
        matchTier,
        matchedSkills: matchedSkills.map(m => m.name),
        missingSkills: missingSkills.map(m => m.name),
        totalRequired: parsedPosting.length,
        totalMatched: matchedSkills.length,
        matchedDetails: matchedSkills,
        missingDetails: missingSkills,
        breakdown: {
            earnedWeight: Number(earnedWeight.toFixed(2)),
            totalWeight: Number(totalWeight.toFixed(2)),
            hasAllRequired: missingSkills.every(m => !m.required)
        }
    };
}

module.exports = {
    calculateSkillMatch,
    normalizeSkill,
    parseSkillItem,
    SKILL_ALIASES
};
