import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Mail, Phone, MapPin, Calendar, Edit3,
    BarChart3, Activity, FileText, Settings,
    Shield, Bell, Moon, Sun, Globe, LogOut,
    CheckCircle2, TrendingUp, Layers
} from 'lucide-react';

const ProfilePage = ({ user: initialUser }) => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [user, setUser] = useState(initialUser);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const [userRes, statsRes] = await Promise.all([
                    axios.get('http://localhost:8000/users/me', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('http://localhost:8000/analytics')
                ]);

                setUser(userRes.data);
                setStats(statsRes.data);
            } catch (err) {
                console.error("Profile fetch failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontWeight: 900, color: 'var(--primary)' }}>Establishing Secure Link...</div>;

    return (
        <div style={{ maxWidth: '1400px', margin: '3rem auto', padding: '0 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '2rem', alignItems: 'start' }}>

                {/* LEFT PANEL: Profile Summary */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
                        <div style={{
                            width: '180px', height: '180px', borderRadius: '4rem',
                            background: 'var(--gradient-lush)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', color: 'white',
                            fontSize: '4rem', fontWeight: 900, boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            border: '5px solid white'
                        }}>
                            {user?.full_name?.charAt(0) || 'U'}
                        </div>
                        <button style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 8px 15px rgba(45,106,79,0.3)' }}>
                            <Edit3 size={18} />
                        </button>
                    </div>

                    <h2 style={{ fontSize: '2rem', fontWeight: 950, marginBottom: '0.5rem', color: 'var(--primary-dark)' }}>{user?.full_name || 'Agri Operator'}</h2>
                    <div style={{ display: 'inline-flex', background: 'var(--accent)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                        {user?.role || 'Operator'}
                    </div>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem', borderTop: '1px dotted #cbd5e1', paddingTop: '2.5rem' }}>
                        <InfoRow icon={<Mail size={18} />} label="Auth Email" val={user?.email} />
                        <InfoRow icon={<Globe size={18} />} label="Organization" val="Agri-Core Network" />
                        <InfoRow icon={<MapPin size={18} />} label="Status" val={user?.is_active ? "Active Link" : "Inactive"} />
                        <InfoRow icon={<Calendar size={18} />} label="System ID" val={`#MS-${user?.id || '0000'}`} />
                    </div>

                    <button onClick={logout} className="btn btn-secondary" style={{ width: '100%', marginTop: '3rem', justifyContent: 'center' }}>
                        <LogOut size={18} /> Disconnect Uplink
                    </button>
                </motion.div>

                {/* RIGHT PANEL: Dynamic Content Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Tab Navigation */}
                    <div className="glass-panel" style={{ padding: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                        <TabBtn active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} icon={<BarChart3 size={18} />} label="Overview" />
                        <TabBtn active={activeTab === 'Activity'} onClick={() => setActiveTab('Activity')} icon={<Activity size={18} />} label="Activity" />
                        <TabBtn active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} icon={<FileText size={18} />} label="Historical Logs" />
                        <TabBtn active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} icon={<Settings size={18} />} label="Protocol Settings" />
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="glass-panel"
                            style={{ padding: '3rem', minHeight: '600px' }}
                        >
                            {activeTab === 'Overview' && <OverviewTab stats={stats} />}
                            {activeTab === 'Activity' && <ActivityTab />}
                            {activeTab === 'Reports' && <ReportsTab />}
                            {activeTab === 'Settings' && <SettingsTab />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const OverviewTab = ({ stats }) => (
    <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '2.5rem' }}>Analytical Performance</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
            <MetricCard label="Total Seeds Analyzed" val={stats?.total_seeds?.toLocaleString() || '...'} sub="Across all local regions" color="var(--primary)" />
            <MetricCard label="Batches Processed" val={stats?.total_batches || '...'} sub="Real-time ledger entries" color="var(--primary-dark)" />
            <MetricCard label="System Consistency" val="High" sub="98.2% Sorter Efficiency" color="var(--excellent)" />
            <MetricCard label="Avg. Defect Rate" val={`${stats?.avg_defect_rate || '...'}%`} sub="Enterprise-wide metrics" color="#ef4444" />
        </div>

        <h4 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '1.5rem', color: 'var(--text-light)' }}>Quality Index Trend</h4>
        <div style={{ height: '300px', background: 'rgba(0,0,0,0.02)', borderRadius: '2rem', border: '1px dashed #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={48} opacity={0.1} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)' }}>Historical performance is synced via NeonDB</span>
        </div>
    </div>
);

const ActivityTab = () => (
    <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '2.5rem' }}>Recent System Events</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <TimelineItem icon={<FileText />} title="Audit Log Exported" desc="Batch list exported to CSV for quarterly review." time="2 hours ago" />
            <TimelineItem icon={<CheckCircle2 />} title="Detection Calibrated" desc="Input threshold adjusted to 0.75 for night vision." time="6 hours ago" />
            <TimelineItem icon={<Layers />} title="Batch #8942 Completed" desc="Total 542 seeds analyzed. Grade: Excellent (A)." time="Yesterday" />
            <TimelineItem icon={<Shield />} title="Security Pulse" desc="Authenticated login from trusted device ID 48-12." time="2 days ago" />
        </div>
    </div>
);

const ReportsTab = () => (
    <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '2.5rem' }}>Recent Inspection Records</h3>
        <div className="glass-panel" style={{ background: 'white', padding: '1rem', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-light)' }}>Batch ID</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-light)' }}>Total Count</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-light)' }}>Grade</th>
                        <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 900, color: 'var(--text-light)' }}>Download</th>
                    </tr>
                </thead>
                <tbody>
                    <ReportRow id="#B-4892" seeds="520" grade="A" />
                    <ReportRow id="#B-4891" seeds="410" grade="B" />
                    <ReportRow id="#B-4890" seeds="580" grade="A" />
                    <ReportRow id="#B-4889" seeds="490" grade="A" />
                </tbody>
            </table>
        </div>
    </div>
);

const SettingsTab = () => (
    <div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '2.5rem' }}>System Preferences</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ToggleOption icon={<Moon size={20} />} label="Global Interface Theme" val="Solarized (Light)" />
            <ToggleOption icon={<Bell size={20} />} label="Email Quality Alerts" val="Enabled" />
            <ToggleOption icon={<Shield size={20} />} label="Two Factor Authentication" val="Active" />

            <div style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                <h4 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Batch Logic Overrides</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>Default Confidence Thres.</label>
                        <input type="range" style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.5rem' }} value="75" readOnly />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)' }}>Auto-Save Interval (Sec)</label>
                        <input type="number" className="form-input" defaultValue="10" style={{ height: '40px', background: 'white' }} />
                    </div>
                </div>
            </div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: '3.5rem', width: '200px', height: '55px', fontSize: '1rem' }}>Commit Changes</button>
    </div>
);

const TabBtn = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
            padding: '1rem', borderRadius: '1.25rem', border: 'none', cursor: 'pointer',
            transition: 'all 0.3s', fontWeight: 900, fontSize: '0.9rem',
            background: active ? 'var(--primary)' : 'transparent',
            color: active ? 'white' : 'var(--text-light)',
            boxShadow: active ? '0 10px 20px rgba(45,106,79,0.2)' : 'none'
        }}
    >
        {icon} {label}
    </button>
);

const InfoRow = ({ icon, label, val }) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ color: 'var(--primary)', opacity: 0.6 }}>{icon}</div>
        <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-dark)' }}>{val}</div>
        </div>
    </div>
);

const MetricCard = ({ label, val, sub, color }) => (
    <div className="glass-panel" style={{ padding: '1.75rem', background: 'white', border: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '1rem' }}>{label}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 950, color: color, lineHeight: 1, marginBottom: '0.5rem' }}>{val}</div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5 }}>{sub}</div>
    </div>
);

const TimelineItem = ({ icon, title, desc, time }) => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div style={{ width: '45px', height: '45px', background: 'var(--accent)', color: 'var(--primary)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
        </div>
        <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{title}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{time}</div>
            </div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{desc}</div>
        </div>
    </div>
);

const ReportRow = ({ id, seeds, grade }) => (
    <tr style={{ borderBottom: '1px solid #f8fafc' }}>
        <td style={{ padding: '1rem', fontWeight: 900, color: 'var(--primary-dark)' }}>{id}</td>
        <td style={{ padding: '1rem', fontWeight: 700 }}>{seeds} Seeds</td>
        <td style={{ padding: '1rem' }}>
            <span style={{
                background: grade === 'A' ? '#dcfce7' : '#fef3c7',
                color: grade === 'A' ? '#166534' : '#92400e',
                padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontWeight: 900, fontSize: '0.75rem'
            }}>
                GRADE {grade}
            </span>
        </td>
        <td style={{ padding: '1rem' }}>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>PDF</button>
        </td>
    </tr>
);

const ToggleOption = ({ icon, label, val }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ color: 'var(--primary-dark)', background: '#f1f5f9', padding: '0.75rem', borderRadius: '1rem' }}>{icon}</div>
            <span style={{ fontWeight: 800 }}>{label}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>{val}</span>
            <div style={{ width: '50px', height: '26px', background: 'var(--primary)', borderRadius: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '4px', top: '4px', width: '18px', height: '18px', background: 'white', borderRadius: '50%' }} />
            </div>
        </div>
    </div>
);

export default ProfilePage;
