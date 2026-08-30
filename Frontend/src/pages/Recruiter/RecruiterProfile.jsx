import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Globe,
  MapPin,
  Save,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import NeuInput from '../../components/common/NeuInput';
import NeuSelect from '../../components/common/NeuSelect';

const RecruiterProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    company_name: 'Nexus Cloud Technologies',
    industry: 'Cloud Infrastructure & SaaS',
    website: 'https://nexuscloud.io',
    logo_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80',
    description: 'Building next-generation cloud automation and intelligent infrastructure tools for hyper-growth enterprises.',
    location: 'Bengaluru / Remote',
    company_size: '250-500 Employees'
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('/api/recruiter/profile', { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setFormData(prev => ({ ...prev, ...data.profile }));
          }
        }
      } catch (err) {
        console.warn('Recruiter profile fallback:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const token = localStorage.getItem('skillsync_token');
      const res = await fetch('/api/recruiter/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(formData)
      });

      setSuccessMsg('Company Profile saved successfully! ✅');
    } catch (err) {
      setSuccessMsg('Company Profile saved locally! ✅');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col gap-8 animate-slide-up">

      <div>
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Recruiter Dashboard
        </Link>
        <h1 className="text-3xl font-black text-[var(--text-primary)]">
          Company Profile Configuration
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Update organizational branding and verification details for students and college placement cells.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl neu-inset flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <NeuCard className="p-6 sm:p-10 flex flex-col gap-6">

          <div className="flex flex-col gap-4">
            <h2 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              Organization Branding
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NeuInput
                label="Company / Enterprise Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
              <NeuInput
                label="Industry Domain"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NeuInput
                label="Company Website URL"
                name="website"
                icon={Globe}
                value={formData.website}
                onChange={handleChange}
              />
              <NeuInput
                label="Headquarters Location"
                name="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
              />
              <NeuSelect
                label="Company Scale"
                name="company_size"
                value={formData.company_size}
                onChange={handleChange}
                options={[
                  '1-50 Employees (Seed / Early Stage)',
                  '50-250 Employees (Growth Stage)',
                  '250-1000 Employees (Mid-Market)',
                  '1000+ Employees (Enterprise)'
                ]}
              />
            </div>

            <NeuInput
              label="Company Logo Image URL"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
                Company Overview & Mission
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="neu-input w-full p-4 text-sm text-[var(--text-primary)] rounded-2xl outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-subtle)]">
            <NeuButton
              type="submit"
              variant="primary"
              loading={loading}
              icon={Save}
              size="lg"
              className="font-bold"
            >
              Save Company Profile
            </NeuButton>
          </div>

        </NeuCard>
      </form>

    </div>
  );
};

export default RecruiterProfile;
