import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Clock,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Briefcase,
  Award,
  Sparkles
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const TpoDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('skillsync_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetch('/api/college/dashboard', { headers });
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (err) {
      console.warn('Fallback TPO dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleApproval = async (studentId, status) => {
    setActionLoading(studentId);
    try {
      const token = localStorage.getItem('skillsync_token');
      await fetch(`/api/college/students/${studentId}/approval`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status })
      });
      await fetchDashboard();
    } catch (err) {
      console.warn('Approval action error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const metrics = dashboardData?.metrics || {
    total_students: 4,
    pending_approvals: 1,
    approved_students: 3,
    active_postings: 4,
    placed_count: 2,
    placement_rate: 75,
    avg_match_score: 86
  };

  const pendingStudents = dashboardData?.recent_pending_students || [
    {
      id: 5,
      name: 'Rohan Verma',
      email: 'rohan@skillsync.edu',
      department: 'Electronics & Communication',
      roll_no: '2023ECE1055',
      cgpa: 7.95,
      skills: ['JavaScript', 'HTML5', 'Python', 'Git & GitHub']
    }
  ];

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 animate-slide-up">
      
      {/* 1. HERO BANNER */}
      <NeuCard className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-purple-900/10 via-[var(--bg-main)] to-indigo-900/10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-purple-600 text-white flex items-center justify-center neu-flat ring-2 ring-purple-500/20 shrink-0">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {user?.name || 'Dr. Ramesh Gupta'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-purple-600 bg-purple-500/10 border border-purple-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Institutional TPO Admin
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              National Institute of Technology, Delhi • Training & Placement Cell Console
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link to="/tpo/students">
            <NeuButton variant="secondary" icon={Users} size="md">
              Student Approvals ({metrics.pending_approvals})
            </NeuButton>
          </Link>
          <Link to="/tpo/analytics">
            <NeuButton variant="primary" icon={BarChart3} size="md" className="font-bold">
              Placement Analytics
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* 2. INSTITUTIONAL KPIS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Placement %', value: `${metrics.placement_rate}%`, icon: TrendingUp, color: 'text-emerald-600', sub: 'Offers to batch ratio' },
          { label: 'Pending Approvals', value: metrics.pending_approvals, icon: Clock, color: 'text-amber-600', sub: 'Requires TPO action' },
          { label: 'Active Students', value: metrics.total_students, icon: Users, color: 'text-indigo-600', sub: 'Profiles registered' },
          { label: 'Avg Skill Match', value: `${metrics.avg_match_score}%`, icon: Sparkles, color: 'text-purple-600', sub: 'Candidate quality score' },
        ].map((tile, idx) => (
          <NeuCard key={idx} variant="sm" className="p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {tile.label}
              </span>
              <div className={`p-2 rounded-xl neu-inset ${tile.color}`}>
                <tile.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {tile.value}
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">
                {tile.sub}
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* 3. PENDING STUDENT VERIFICATION QUEUE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Pending Approvals */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Student Verification Queue
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Approve verified academic profiles to permit company applications
              </p>
            </div>
            <Link to="/tpo/students" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              View All Students <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {pendingStudents.length === 0 ? (
            <NeuCard className="p-8 text-center flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <span className="text-sm font-bold text-[var(--text-primary)]">Verification Queue Clear!</span>
              <span className="text-xs text-[var(--text-secondary)]">All registered student profiles have been reviewed and approved.</span>
            </NeuCard>
          ) : (
            <div className="flex flex-col gap-4">
              {pendingStudents.map(student => (
                <NeuCard key={student.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 font-black text-base flex items-center justify-center neu-flat shrink-0">
                      {student.name ? student.name[0] : 'S'}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[var(--text-primary)]">
                          {student.name}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          Pending Approval
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {student.department} • Roll: {student.roll_no} • CGPA: {student.cgpa}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {student.skills && student.skills.map((sk, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg neu-inset text-[var(--text-secondary)]">
                            {typeof sk === 'object' ? sk.name : sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[var(--border-subtle)]">
                    <NeuButton
                      size="sm"
                      variant="success"
                      loading={actionLoading === student.id}
                      icon={CheckCircle2}
                      onClick={() => handleApproval(student.id, 'approved')}
                      className="font-bold"
                    >
                      Approve
                    </NeuButton>
                    <NeuButton
                      size="sm"
                      variant="danger"
                      loading={actionLoading === student.id}
                      icon={XCircle}
                      onClick={() => handleApproval(student.id, 'rejected')}
                    >
                      Reject
                    </NeuButton>
                  </div>
                </NeuCard>
              ))}
            </div>
          )}
        </div>

        {/* Quick Analytics Teaser Card */}
        <div className="flex flex-col gap-6">
          <NeuCard className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                Curriculum Skill Gaps
              </h3>
              <Link to="/tpo/analytics" className="text-xs text-indigo-500 font-bold hover:underline">
                Full Report →
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { skill: 'Docker & DevOps', gap: 64, demand: 'High' },
                { skill: 'AWS / Cloud Architectures', gap: 58, demand: 'High' },
                { skill: 'TypeScript Enterprise', gap: 52, demand: 'Medium' },
                { skill: 'PyTorch / GenAI', gap: 38, demand: 'Surging' },
              ].map((item, idx) => (
                <div key={idx} className="neu-inset p-3 rounded-2xl flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-[var(--text-primary)]">{item.skill}</span>
                    <span className="text-amber-600 font-bold">{item.gap}% Gap</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-main)] overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${item.gap}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </NeuCard>
        </div>

      </div>

    </div>
  );
};

export default TpoDashboard;
