import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Clock,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Award
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import NeuModal from '../../components/common/NeuModal';
import SkillTag from '../../components/matching/SkillTag';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('skillsync_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetch('/api/college/students', { headers });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      }
    } catch (err) {
      console.warn('Fallback college students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStatusUpdate = async (studentId, newStatus) => {
    setActionLoading(studentId);
    try {
      const token = localStorage.getItem('skillsync_token');
      await fetch(`/api/college/students/${studentId}/approval`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status: newStatus })
      });

      // Update locally
      setStudents(students.map(s => {
        if (s.id === studentId || s.user_id === studentId) {
          return { ...s, approval_status: newStatus };
        }
        return s;
      }));
      if (selectedStudent) {
        setSelectedStudent({ ...selectedStudent, approval_status: newStatus });
      }
    } catch (err) {
      console.warn('Approval error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = students.filter(st => {
    const s = search.toLowerCase();
    const matchesSearch = !search ||
      st.name?.toLowerCase().includes(s) ||
      st.email?.toLowerCase().includes(s) ||
      st.roll_no?.toLowerCase().includes(s);

    const matchesStatus = statusFilter === 'all' || st.approval_status === statusFilter;
    const matchesDept = deptFilter === 'all' || (st.department && st.department.toLowerCase().includes(deptFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8 animate-slide-up">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to TPO Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Student Roster & Verification Management
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Audit student academic records, verified skill taxonomies, and manage placement eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl neu-inset text-purple-600">
            {filtered.length} Students Listed
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <NeuCard className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or email..."
            className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="neu-input py-2.5 px-3 text-xs font-semibold text-[var(--text-primary)] rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Dept Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="neu-input py-2.5 px-3 text-xs font-semibold text-[var(--text-primary)] rounded-xl outline-none cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="computer science">Computer Science (CSE)</option>
            <option value="information tech">Information Tech (IT)</option>
            <option value="electronics">ECE</option>
          </select>
        </div>
      </NeuCard>

      {/* Student List */}
      {loading ? (
        <div className="neu-inset p-16 rounded-3xl text-center text-sm text-[var(--text-muted)]">
          Retrieving verified student registry...
        </div>
      ) : filtered.length === 0 ? (
        <NeuCard className="p-12 text-center flex flex-col items-center gap-3">
          <Users className="w-8 h-8 text-purple-500 opacity-60" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Students Found</h3>
          <p className="text-xs text-[var(--text-secondary)]">Try broadening your search or filter options.</p>
        </NeuCard>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(st => {
            const isApproved = st.approval_status === 'approved';
            const isPending = st.approval_status === 'pending';
            const skills = Array.isArray(st.skills) ? st.skills : [];

            return (
              <NeuCard key={st.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">

                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={st.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={st.name}
                    className="w-12 h-12 rounded-2xl object-cover neu-flat shrink-0"
                  />
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        {st.name}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${isApproved ? 'bg-emerald-500/20 text-emerald-600' :
                          isPending ? 'bg-amber-500/20 text-amber-600' :
                            'bg-rose-500/20 text-rose-600'
                        }`}>
                        {st.approval_status || 'approved'}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium">
                      {st.department || 'CSE'} • Roll: {st.roll_no || 'N/A'} • CGPA: {st.cgpa || '8.0'} • Grad: {st.graduation_year || 2026}
                    </p>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skills.slice(0, 5).map((sk, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg neu-inset text-[var(--text-secondary)] font-medium">
                          {typeof sk === 'object' ? sk.name : sk}
                        </span>
                      ))}
                      {skills.length > 5 && (
                        <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                          +{skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-0 border-[var(--border-subtle)]">
                  <NeuButton
                    size="sm"
                    variant="secondary"
                    onClick={() => setSelectedStudent(st)}
                  >
                    Full Profile
                  </NeuButton>

                  {!isApproved ? (
                    <NeuButton
                      size="sm"
                      variant="success"
                      loading={actionLoading === st.id}
                      icon={CheckCircle2}
                      onClick={() => handleStatusUpdate(st.id, 'approved')}
                      className="font-bold"
                    >
                      Approve
                    </NeuButton>
                  ) : (
                    <NeuButton
                      size="sm"
                      variant="danger"
                      loading={actionLoading === st.id}
                      icon={XCircle}
                      onClick={() => handleStatusUpdate(st.id, 'rejected')}
                    >
                      Revoke
                    </NeuButton>
                  )}
                </div>

              </NeuCard>
            );
          })}
        </div>
      )}

      {/* Full Student Profile Modal */}
      <NeuModal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        title="Student Academic Profile & Taxonomy"
      >
        {selectedStudent && (
          <div className="flex flex-col gap-6 text-left">
            <div className="flex items-center gap-4">
              <img
                src={selectedStudent.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-2xl object-cover neu-flat"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{selectedStudent.name}</h3>
                <span className="text-xs text-[var(--text-secondary)]">{selectedStudent.email}</span>
                <span className="text-xs font-semibold text-indigo-600 mt-1">
                  Roll: {selectedStudent.roll_no} • CGPA: {selectedStudent.cgpa}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs neu-inset p-4 rounded-2xl">
              <div><strong>Department:</strong> {selectedStudent.department}</div>
              <div><strong>Graduation Year:</strong> {selectedStudent.graduation_year}</div>
              <div><strong>Phone:</strong> {selectedStudent.phone || '+91 98765 43210'}</div>
              <div><strong>Approval:</strong> {selectedStudent.approval_status}</div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Verified Skill Inventory ({selectedStudent.skills?.length || 0})
              </span>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl neu-flat">
                {selectedStudent.skills?.map((sk, i) => (
                  <SkillTag key={i} skill={sk} isMatched size="sm" />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
              <NeuButton variant="secondary" onClick={() => setSelectedStudent(null)}>
                Close
              </NeuButton>
              {selectedStudent.approval_status !== 'approved' ? (
                <NeuButton
                  variant="success"
                  icon={CheckCircle2}
                  onClick={() => handleStatusUpdate(selectedStudent.id, 'approved')}
                  className="font-bold"
                >
                  Approve Student
                </NeuButton>
              ) : (
                <NeuButton
                  variant="danger"
                  icon={XCircle}
                  onClick={() => handleStatusUpdate(selectedStudent.id, 'rejected')}
                >
                  Revoke Approval
                </NeuButton>
              )}
            </div>
          </div>
        )}
      </NeuModal>

    </div>
  );
};

export default StudentManagement;
