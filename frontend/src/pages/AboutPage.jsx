import React from 'react';
import { ShieldCheck, Zap, Database, BarChart, Info, HelpCircle } from 'lucide-react';

const CLASS_COLORS = {
    Excellent: '#22c55e',
    Good: '#eab308',
    Average: '#f97316',
    Bad: '#ef4444',
    Worst: '#000000'
};

const AboutPage = () => {
    return (
        <div className="animate-fade-in" style={{ marginTop: '2rem', maxWidth: '800px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>MaizeScan</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Advanced Computer Vision for Precision Agriculture</p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Info className="color-primary" /> System Purpose
                </h2>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                    MaizeScan is a production-ready visual inspection system designed to automate the grading of maize seeds.
                    By leveraging the YOLOv8 object detection architecture, the system provides real-time, objective measurements
                    of seed quality, reducing human error and increasing throughput in seed processing facilities.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                <FeatureCard
                    icon={<ShieldCheck size={24} color="var(--primary)" />}
                    title="Automated Grading"
                    desc="Rule-based logic applies strict industry standards for A, B, and C grade classification."
                />
                <FeatureCard
                    icon={<Zap size={24} color="var(--primary)" />}
                    title="Real-time Detection"
                    desc="Low-latency inference allows for continuous inspection on conveyors or static samples."
                />
                <FeatureCard
                    icon={<Database size={24} color="var(--primary)" />}
                    title="Batch Management"
                    desc="Serialized batch control ensures every lot is tracked with high precision and persistent storage."
                />
                <FeatureCard
                    icon={<BarChart size={24} color="var(--primary)" />}
                    title="Visual Analytics"
                    desc="Interactive dashboards reveal defect trends and quality distribution over time."
                />
            </div>

            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent)' }}>
                <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle color="var(--accent)" /> Grading Guidelines
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <GradeRule grade="Grade A" rule="(Excellent + Good) ≥ 85% and (Bad + Worst) ≤ 5%" desc="Premium quality, suitable for replanting and certification." />
                    <GradeRule grade="Grade B" rule="(Excellent + Good) ≥ 70% and (Bad + Worst) ≤ 10%" desc="Standard quality, suitable for local markets and culinary use." />
                    <GradeRule grade="Grade C" rule="Otherwise" desc="Reject for seed use. Recommended for animal feed or industrial processing." />
                </div>
            </div>

            <div style={{ marginTop: '3rem', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                <p>© 2026 MaizeScan - Smart Seed Quality Management System</p>
                <p>Developed as a visual pre-screening tool for agricultural labs and processing units.</p>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '1rem' }}>{icon}</div>
        <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{desc}</p>
    </div>
);

const GradeRule = ({ grade, rule, desc }) => (
    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span style={{ fontWeight: 700 }}>{grade}</span>
            <code style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>{rule}</code>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{desc}</p>
    </div>
);

export default AboutPage;
