import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { TrendingDown, Package, Award, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:8000';
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const AnalyticsPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${API_URL}/analytics`);
            setData(response.data);
        } catch (err) {
            console.error("Error fetching analytics:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Analyzing data...</div>;
    if (!data || data.total_batches === 0) return (
        <div style={{ padding: '4rem', textAlign: 'center' }} className="glass-card">
            <AlertCircle size={48} style={{ margin: '0 auto 1rem auto', color: 'var(--text-muted)' }} />
            <h2>No Data Available Yet</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Start processing batches to see analytics here.</p>
        </div>
    );

    return (
        <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
            <h1>Batch Analytics Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Quality trends and performance metrics</p>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <KpiCard icon={<Package color="var(--primary)" />} title="Total Batches" value={data.total_batches} unit="Sessions" />
                <KpiCard icon={<TrendingDown color="var(--error)" />} title="Avg Defect Rate" value={data.avg_defect_rate} unit="%" />
                <KpiCard icon={<Award color="var(--accent)" />} title="Most Common" value={data.most_common_grade} unit="Grade" />
                <KpiCard icon={<TrendingDown color="var(--secondary)" />} title="Last Quality" value={data.defect_trend[data.defect_trend.length - 1]?.defect_rate.toFixed(1)} unit="%" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Grade Distribution */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3>Grade Distribution</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Overall batch quality share</p>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.grade_distribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {data.grade_distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Defect Trend */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3>Defect Rate Trend</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Bad + Worst percentage over time</p>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.defect_trend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="timestamp" hide />
                                <YAxis stroke="var(--text-muted)" />
                                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                                <Line type="monotone" dataKey="defect_rate" stroke="var(--primary)" strokeWidth={3} dot={{ fill: 'var(--primary)' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const KpiCard = ({ icon, title, value, unit }) => (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '1rem' }}>
            {icon}
        </div>
        <div>
            <h4 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>{title}</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unit}</span>
            </div>
        </div>
    </div>
);

export default AnalyticsPage;
