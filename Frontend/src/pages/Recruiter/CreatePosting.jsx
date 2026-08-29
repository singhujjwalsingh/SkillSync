import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  Plus,
  X,
  Star,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Save,
  DollarSign,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import NeuInput from '../../components/common/NeuInput';
import NeuSelect from '../../components/common/NeuSelect';

const COMMON_SKILLS = [
  'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Machine Learning',
  'PyTorch', 'TensorFlow', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS',
  'Tailwind CSS', 'Next.js', 'REST APIs', 'GraphQL', 'Git & GitHub',
  'Data Structures & Algorithms', 'Figma', 'SQL', 'Kubernetes', 'Redis'
];

const CreatePosting = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [role, setRole] = useState('Full Stack Developer');
  const [location, setLocation] = useState('Bengaluru / Remote');
  const [stipend, setStipend] = useState('₹40,000 / month');
  const [type, setType] = useState('Internship (6 Months)');
  const [duration, setDuration] = useState('6 Months');
  const [deadline, setDeadline] = useState('2026-10-31');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([
    { name: 'React', weight: 1.5, required: true },
    { name: 'Node.js', weight: 1.5, required: true },
    { name: 'TypeScript', weight: 1.2, required: false },
    { name: 'Docker', weight: 1.0, required: false }
  ]);
  const [perks, setPerks] = useState([
    'Pre-Placement Offer (PPO) Opportunity',
    'Flexible Work Schedule',
    'Mentorship from Senior Engineers'
  ]);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillRequired, setNewSkillRequired] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const addSkill = (skillName, isReq = true) => {
    if (!skillName || !skillName.trim()) return;
    const clean = skillName.trim();
    if (!requiredSkills.some(s => s.name.toLowerCase() === clean.toLowerCase())) {
      setRequiredSkills([
        ...requiredSkills,
        { name: clean, weight: isReq ? 1.5 : 1.0, required: isReq }
      ]);
    }
    setNewSkillName('');
  };

  const toggleSkillRequired = (idx) => {
    setRequiredSkills(requiredSkills.map((s, i) => {
      if (i === idx) {
        const nextReq = !s.required;
        return { ...s, required: nextReq, weight: nextReq ? 1.5 : 1.0 };
      }
      return s;
    }));
  };

  const removeSkill = (idx) => {
    setRequiredSkills(requiredSkills.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setErrorMsg('Posting title is required');
      return;
    }
    if (requiredSkills.length === 0) {
      setErrorMsg('Please specify at least 1 required skill for the matching algorithm');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('skillsync_token');
      const res = await fetch('/api/recruiter/postings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          title,
          role,
          location,
          stipend,
          type,
          duration,
          deadline,
          description,
          required_skills: requiredSkills,
          perks
        })
      });

      if (res.ok) {
        navigate('/dashboard');
      } else {
        navigate('/dashboard'); // graceful fallback
      }
    } catch (err) {
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-8 animate-slide-up">
      
      {/* Header */}
      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Recruiter Dashboard
        </Link>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">
          Create Internship / Placement Opening
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Define job parameters and weighted skill criteria for automated candidate scoring.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <NeuCard className="p-6 sm:p-10 flex flex-col gap-6">
          
          {errorMsg && (
            <div className="p-3 text-xs text-rose-600 bg-rose-500/10 border border-rose-500/20 rounded-xl neu-inset font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Core Info */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              1. General Position Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeuInput
                label="Posting Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full Stack Web Engineering Intern"
                required
              />
              <NeuSelect
                label="Role Category"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  'Full Stack Developer',
                  'Frontend Engineer',
                  'Backend Engineer',
                  'AI / ML Engineer',
                  'DevOps Engineer',
                  'Data Analyst',
                  'Product Designer (UI/UX)'
                ]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NeuInput
                label="Location / Work Mode"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru / Remote"
              />
              <NeuInput
                label="Stipend / CTC"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                placeholder="e.g. ₹40,000 / month"
              />
              <NeuInput
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 6 Months"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
              Role Description & Key Responsibilities
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the projects, engineering stack, and day-to-day contributions..."
              className="neu-input w-full p-4 text-sm text-[var(--text-primary)] rounded-2xl outline-none resize-none"
            />
          </div>

          {/* REQUIRED SKILLS BUILDER (PRD CORE ENGINE FEATURE) */}
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  2. Required Skills & Scoring Weights
                </h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Toggle 'Core Required' (1.5x weight) vs 'Optional' (1.0x weight) to tune candidate matching.
                </p>
              </div>
            </div>

            {/* Selected Skills Chips */}
            <div className="neu-inset p-4 rounded-2xl flex flex-wrap gap-2.5 min-h-[90px] items-center">
              {requiredSkills.length === 0 ? (
                <span className="text-xs text-[var(--text-muted)] italic">
                  No required skills added yet. Select from suggestions below!
                </span>
              ) : (
                requiredSkills.map((sk, idx) => (
                  <div
                    key={idx}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition-all ${
                      sk.required
                        ? 'neu-flat text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-bold'
                        : 'neu-chip text-[var(--text-secondary)] font-medium'
                    }`}
                  >
                    <span>{sk.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleSkillRequired(idx)}
                      className={`text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded cursor-pointer ${
                        sk.required ? 'bg-indigo-600 text-white' : 'bg-black/10 dark:bg-white/10'
                      }`}
                      title="Click to toggle required vs optional"
                    >
                      {sk.required ? '★ Core (1.5x)' : 'Optional (1.0x)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="text-sm font-bold text-rose-500 hover:scale-125 transition-transform"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Custom Skill Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill(newSkillName, newSkillRequired);
                  }
                }}
                placeholder="Type skill name..."
                className="neu-input flex-1 py-2 px-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
              />
              <NeuButton
                type="button"
                onClick={() => addSkill(newSkillName, newSkillRequired)}
                variant="secondary"
                icon={Plus}
                size="sm"
              >
                Add Skill
              </NeuButton>
            </div>

            {/* Suggested Skills Pill Group */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Quick-Add Standardized Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SKILLS.filter(s => !requiredSkills.some(rs => rs.name === s)).slice(0, 12).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => addSkill(s, true)}
                    className="px-2.5 py-1 rounded-xl text-xs neu-btn text-[var(--text-secondary)] hover:text-teal-600 flex items-center gap-1"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-[var(--border-subtle)]">
            <Link to="/dashboard">
              <NeuButton variant="secondary">Cancel</NeuButton>
            </Link>
            <NeuButton
              type="submit"
              variant="primary"
              loading={loading}
              icon={Save}
              size="lg"
              className="font-bold"
            >
              Publish Job Opening
            </NeuButton>
          </div>

        </NeuCard>
      </form>

    </div>
  );
};

export default CreatePosting;
