import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, Scan } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('username', formData.email);
            params.append('password', formData.password);

            const response = await axios.post('http://localhost:8000/token', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            localStorage.setItem('token', response.data.access_token);
            navigate('/analytics');
        } catch (err) {
            console.error("Login failed:", err);
            alert("Uplink Failed: " + (err.response?.data?.detail || "Invalid credentials or backend offline."));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(rgba(27, 67, 50, 0.8), rgba(45, 106, 79, 0.4)), url("/images/auth_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hero-blur"
                style={{ width: '100%', maxWidth: '480px', padding: '4rem', borderRadius: '3rem', boxShadow: '0 40px 100px rgba(0,0,0,0.3)' }}
            >
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    <ArrowLeft size={16} /> Port back to Home
                </button>

                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
                        <img src="/images/logo.png" alt="MaizeScan" style={{ height: '80px', width: 'auto' }} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Core Login</h2>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Secure access to the MaizeScan Engine</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="email"
                            placeholder="Operator Email"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="password"
                            placeholder="Access Token"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', fontWeight: 700 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} /> Remember Session
                        </label>
                        <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Recovery?</a>
                    </div>

                    <button type="submit" className="btn btn-primary shimmer" style={{ width: '100%', height: '60px', borderRadius: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Establish Connection <LogIn size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 600 }}>
                        No terminal access? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 900 }}>Create account</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
