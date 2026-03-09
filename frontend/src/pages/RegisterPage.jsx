import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, ArrowLeft, Phone, MapPin, Scan } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', password: '', role: 'Farmer', location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:8000/register', {
                email: formData.email,
                password: formData.password,
                full_name: formData.name,
                role: formData.role
            });
            alert("Network Enrollment Successful! Please authenticate to start your session.");
            navigate('/login');
        } catch (err) {
            console.error("Enrollment failed:", err);
            alert("Enrollment Failed: " + (err.response?.data?.detail || "Connection error."));
        } finally {
            setIsSubmitting(false);
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
            padding: '4rem 2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hero-blur"
                style={{ width: '100%', maxWidth: '700px', padding: '4rem', borderRadius: '4rem', boxShadow: '0 50px 100px rgba(0,0,0,0.3)' }}
            >
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                    <ArrowLeft size={16} /> Port back to Home
                </button>

                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
                        <img src="/images/logo.png" alt="MaizeScan" style={{ height: '80px', width: 'auto' }} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 950, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Network Enrollment</h2>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Join the world's most advanced maize sorting ecosystem</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ position: 'relative' }}>
                            <User style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Full Operator Name"
                                className="form-input"
                                style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Mail style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="email"
                            placeholder="Email Coordinates"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Phone style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="tel"
                            placeholder="Comms Number"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="password"
                            placeholder="Create Secure Password"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <MapPin style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} size={20} />
                        <input
                            type="text"
                            placeholder="Geo-Location (Village/Dist)"
                            className="form-input"
                            style={{ paddingLeft: '3.5rem', height: '60px', borderRadius: '1.25rem', background: 'white' }}
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                        <select
                            className="form-input"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            style={{ height: '60px', borderRadius: '1.25rem', background: 'white', cursor: 'pointer', fontWeight: 700 }}
                        >
                            <option value="Farmer">Primary Producer (Farmer)</option>
                            <option value="Lab Technician">Lab Analyst</option>
                            <option value="Admin">System Administrator</option>
                        </select>
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: 600 }}>
                        <input type="checkbox" required style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                        <span>I accept the <a href="#" style={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>Protocol Terms</a></span>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn btn-primary shimmer" style={{ gridColumn: 'span 2', height: '70px', borderRadius: '1.5rem', fontSize: '1.25rem', width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                        {isSubmitting ? "Syncing to Cloud..." : "Complete Enrollment"} <UserPlus size={24} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2.5rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>
                        Already have an uplink? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 900 }}>Authenticate here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
