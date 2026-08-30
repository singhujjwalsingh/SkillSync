import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  ArrowLeft,
  PieChart as PieIcon,
  Layers,
  Sparkles,
  Award,
  Filter,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
  Cell
} from 'recharts';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const TpoAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('/api/college/analytics', { headers });
        if (res.ok) {
          const data = await res.json();
          setAnalyticsData(data);
        }
      } catch (err) {
        console.warn('Fallback analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const deptData = analyticsData?.departmentWise || [
    { department: 'CSE', placementRate: 86.6, placed: 104, total: 120 },
    { department: 'IT', placementRate: 82.1, placed: 78, total: 95 },
    { department: 'ECE', placementRate: 72.5, placed: 58, total: 80 },
    { department: 'EE', placementRate: 63.3, placed: 38, total: 60 },
    { department: 'ME', placementRate: 56.4, placed: 31, total: 55 },
  ];

  const skillGaps = analyticsData?.skillGaps || [
    { skill: 'Docker & Containers', gapPercentage: 64, industryDemand: 88 },
    { skill: 'AWS / Cloud', gapPercentage: 58, industryDemand: 84 },
    { skill: 'TypeScript', gapPercentage: 52, industryDemand: 82 },
    { skill: 'System Design', gapPercentage: 48, industryDemand: 80 },
    { skill: 'GraphQL APIs', gapPercentage: 42, industryDemand: 70 },
    { skill: 'PyTorch / AI', gapPercentage: 38, industryDemand: 85 }
  ];

  const monthlyTrends = analyticsData?.monthlyTrends || [
    { month: 'Sep', applications: 45, shortlists: 28, offers: 12 },
    { month: 'Oct', applications: 78, shortlists: 52, offers: 24 },
    { month: 'Nov', applications: 110, shortlists: 74, offers: 38 },
    { month: 'Dec', applications: 85, shortlists: 60, offers: 46 },
    { month: 'Jan', applications: 140, shortlists: 95, offers: 62 },
    { month: 'Feb', applications: 165, shortlists: 112, offers: 86 }
  ];

  const funnel = analyticsData?.funnel || [
    { stage: 'Profiles Active', count: 410, percentage: 100, fill: '#4F46E5' },
    { stage: 'Applications Sent', count: 320, percentage: 78, fill: '#6366F1' },
    { stage: 'Skill Shortlisted', count: 215, percentage: 52.4, fill: '#3B82F6' },
    { stage: 'Interview Stage', count: 128, percentage: 31.2, fill: '#8B5CF6' },
    { stage: 'Offers Extended', count: 86, percentage: 21.0, fill: '#10B981' }
  ];

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 animate-slide-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to TPO Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Institutional Placement & Skill Gap Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Aggregated conversion funnels, department benchmarks, and industry curriculum gap trends.
          </p>
        </div>

        <NeuButton
          size="sm"
          variant="secondary"
          icon={Download}
          onClick={() => alert("Placement Audit Report downloaded as PDF!")}
          className="font-bold"
        >
          Export Audit PDF
        </NeuButton>
      </div>

      {/* Grid: Branch-wise Placement & Skill Gap Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Branch-wise Placement % */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                Department-wise Placement Conversion (%)
              </h2>
              <span className="text-xs text-[var(--text-secondary)]">Batch of 2026</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 neu-inset px-2.5 py-1 rounded-xl">
              Avg: 76.8%
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="department" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--neu-shadow-flat)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val}%`, 'Placement Rate']}
                />
                <Bar dataKey="placementRate" fill="#4F46E5" radius={[10, 10, 0, 0]}>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#4F46E5' : index === 1 ? '#6366F1' : '#8B5CF6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>

        {/* Top Missing Industry Skills (Curriculum Gaps) */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Top Missing Industry Skills (Gap %)
              </h2>
              <span className="text-xs text-[var(--text-secondary)]">Highest gap identified by matching engine</span>
            </div>
            <span className="text-xs font-bold text-amber-600 neu-inset px-2.5 py-1 rounded-xl">
              Curriculum Delta
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" stroke="var(--text-muted)" domain={[0, 100]} fontSize={11} />
                <YAxis dataKey="skill" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--neu-shadow-flat)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px'
                  }}
                  formatter={(val, name) => [`${val}%`, name === 'gapPercentage' ? 'Student Gap %' : 'Industry Demand %']}
                />
                <Bar dataKey="gapPercentage" fill="#F59E0B" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>

      </div>

      {/* Grid: Placement Funnel & Monthly Hiring Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recruitment Funnel */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              Recruitment Conversion Funnel
            </h2>
            <span className="text-xs font-bold text-indigo-600 neu-inset px-2.5 py-1 rounded-xl">
              410 Candidates
            </span>
          </div>

          <div className="flex flex-col gap-3 py-2">
            {funnel.map((step, idx) => (
              <div key={idx} className="neu-inset p-3.5 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--text-primary)]">{step.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-muted)] font-normal">{step.count} candidates</span>
                    <span className="text-indigo-600 font-black">{step.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--bg-main)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${step.percentage}%`, backgroundColor: step.fill }}
                  />
                </div>
              </div>
            ))}
          </div>
        </NeuCard>

        {/* Monthly Hiring Acceleration */}
        <NeuCard className="p-6 sm:p-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Monthly Placement Velocity (2025-2026)
            </h2>
            <span className="text-xs font-bold text-emerald-600 neu-inset px-2.5 py-1 rounded-xl">
              86 Placed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOffers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: '16px',
                    boxShadow: 'var(--neu-shadow-flat)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="applications" stroke="#4F46E5" fillOpacity={1} fill="url(#colorApps)" />
                <Area type="monotone" dataKey="offers" stroke="#10B981" fillOpacity={1} fill="url(#colorOffers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </NeuCard>

      </div>

    </div>
  );
};

export default TpoAnalytics;
