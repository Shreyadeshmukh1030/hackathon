import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Scan, ArrowRight, CheckCircle2, ShieldCheck, Zap,
    BarChart3, Users, Leaf, Cpu, HelpCircle, ChevronDown,
    AlertTriangle, PlayCircle
} from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#fff', overflowX: 'hidden' }}>
            {/* 1. INTERACTIVE HERO SECTION */}
            <section style={{
                position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url("/images/landing_hero.png")',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
                padding: '0 5%', color: 'white'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 2, gap: '4rem' }}>
                    {/* Left Column: Heading and description */}
                    <div style={{ maxWidth: '750px' }}>
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <img src="/images/logo.png" alt="Logo" style={{ height: '40px', background: 'white', padding: '5px', borderRadius: '8px' }} />
                                <div className="section-tag" style={{ background: 'var(--primary)', color: 'white', border: 'none', margin: 0 }}>AI Powered Agriculture</div>
                            </div>
                            <h1 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 950, lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '-2px' }}>
                                <span className="gradient-text">Precision Maize <br /> Quality Control</span>
                            </h1>
                            <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6, fontWeight: 500 }}>
                                Automate your seed grading process with real-time YOLOv8 computer vision.
                                Instantly detect defects, analyze batch quality, and optimize your harvest yield.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Elevated CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: 'flex', gap: '1.5rem', transform: 'translateY(-4rem)' }}
                    >
                        <button onClick={() => navigate('/detect')} className="btn btn-primary shimmer" style={{ padding: '1.25rem 2.5rem', borderRadius: '3rem', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                            Start Detection <ArrowRight size={20} />
                        </button>
                        <button className="btn" style={{
                            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)', color: 'white',
                            padding: '1.25rem 2.5rem', borderRadius: '3rem', fontSize: '1.1rem',
                            whiteSpace: 'nowrap'
                        }}>
                            <PlayCircle size={20} /> Watch Model
                        </button>
                    </motion.div>
                </div>

                {/* Statistics Floating Bar - FIXED ALIGNMENT */}
                <div style={{
                    position: 'absolute', bottom: '8%', left: '5%', right: '5%',
                    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '3rem',
                    background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(35px)',
                    borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', zIndex: 5
                }}>
                    <StatBox val="10k+" label="Seeds Analyzed" />
                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                    <StatBox val="98.4%" label="Average Accuracy" />
                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                    <StatBox val="150ms" label="Inference Speed" />
                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
                    <StatBox val="2k+" label="Farmer Networks" />
                </div>

                {/* Svg Wavy Divider */}
                <div style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '100px' }}>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C53.7,118.1,142.24,111.93,200.58,103c53.21-8.15,90.41-32,120.81-46.56Z" fill="#ffffff"></path>
                    </svg>
                </div>
            </section>

            {/* 2. PROBLEM VS SOLUTION SECTION */}
            <section style={{ padding: '8rem 5%', background: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>Eradicating <span className="gradient-text">Human Error</span></h2>
                    <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>Manual inspection is slow, inconsistent, and expensive. MaizeScan brings industrial-grade precision to your fingertips.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '3rem', background: '#fee2e2' }}>
                        <h3 style={{ color: '#991b1b', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><AlertTriangle /> The Manual Struggle</h3>
                        <BenefitItem icon={<XCircleRed />} title="Time Consuming" desc="Hours spent manually checking grains one by one." />
                        <BenefitItem icon={<XCircleRed />} title="Inconsistent Grading" desc="Fatigue leads to errors and poor quality batches." />
                        <BenefitItem icon={<XCircleRed />} title="Subjective Data" desc="No verifiable metrics or historical logs." />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: '3rem', border: '2px solid var(--primary)' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><ShieldCheck /> The MaizeScan Edge</h3>
                        <BenefitItem icon={<CheckCircleGreen />} title="Rapid Analysis" desc="Detect hundreds of seeds in under a second." />
                        <BenefitItem icon={<CheckCircleGreen />} title="Objective Metrics" desc="Precision scoring based on mathematical vision." />
                        <BenefitItem icon={<CheckCircleGreen />} title="Audit Trail" desc="Automatic history and CSV report generation." />
                    </motion.div>
                </div>
            </section>

            {/* 3. TECHNOLOGY SECTION - NEW PREMIUM BACKGROUND */}
            <section style={{
                padding: '8rem 5%',
                background: 'linear-gradient(rgba(240, 244, 248, 0.92), rgba(240, 244, 248, 0.92)), url("/images/yolo_core_bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                    <div>
                        <div className="section-tag" style={{ border: 'none', background: 'var(--accent)', color: 'var(--primary)' }}>Deep Learning Engine</div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '1.5rem 0' }}>Powered by <span className="gradient-text">YOLOv8</span> Core</h2>
                        <p style={{ color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Our proprietary training pipeline optimizes the state-of-the-art YOLOv8 model specifically for small-object agricultural detection.
                            We handle occlusions, varying orientations, and extreme density with a precision mAP of over 0.85.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <TechFeature icon={<Zap size={20} />} title="RT-Inference" desc="Real-time multi-threaded processing." />
                            <TechFeature icon={<Cpu size={20} />} title="GPU Accelerated" desc="Optimized for edge and cloud compute." />
                            <TechFeature icon={<BarChart3 size={20} />} title="Class Logic" desc="Mathematical grading based on counts." />
                            <TechFeature icon={<ShieldCheck size={20} />} title="Strict Color" desc="Standardized color-coded visual HUD." />
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="glass-panel" style={{ background: '#000', height: '500px', borderRadius: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '20%', left: '20%', border: '2px solid #00C853', padding: '10px', color: 'white' }}>Excellent 98%</div>
                        <div style={{ position: 'absolute', top: '50%', left: '60%', border: '2px solid #D50000', padding: '10px', color: 'white' }}>Bad 94%</div>
                        <div style={{ position: 'absolute', inset: 0, background: 'url("/images/landing_hero.png")', backgroundSize: 'cover', opacity: 0.2 }} />
                        <div className="shimmer" style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem', zIndex: 1 }}>AI CORE INTERFACE</div>
                    </motion.div>
                </div>
            </section>

            {/* 3.5 LIVE DEMO SIMULATOR */}
            <section style={{ padding: '8rem 5%', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                        <div className="glass-panel" style={{
                            height: '500px', background: '#000', borderRadius: '3rem',
                            overflow: 'hidden', position: 'relative', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', boxShadow: '0 40px 80px rgba(0,0,0,0.3)'
                        }}>
                            <motion.div
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                                style={{ position: 'absolute', left: 0, right: 0, height: '4px', background: '#00C853', zIndex: 5, boxShadow: '0 0 20px #00C853' }}
                            />
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("/images/landing_hero.png")', backgroundSize: 'cover', opacity: 0.4 }} />

                            {/* Animated Detection Boxes */}
                            <DemoBox top="20%" left="30%" color="#00C853" label="Excellent" />
                            <DemoBox top="50%" left="60%" color="#FFD600" label="Good" delay={0.5} />
                            <DemoBox top="70%" left="20%" color="#D50000" label="Bad" delay={1} />
                            <DemoBox top="35%" left="75%" color="#00C853" label="Excellent" delay={1.5} />

                            <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.6 }}>SYSTEM TELEMETRY</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>Batch #SA-Live Analysis // <span style={{ color: '#00C853' }}>Active</span></div>
                            </div>
                        </div>

                        <div>
                            <div className="section-tag" style={{ border: 'none', background: '#dcfce7', color: '#166534' }}>Interactive Preview</div>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 950, margin: '1.5rem 0', lineHeight: 1.1 }}>Experience <br /><span className="gradient-text">Instant Insight</span></h2>
                            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                                Unlike traditional methods, MaizeScan provides second-by-second updates.
                                Watch as our AI layers classification over your raw feed, turning visual noise into actionable agricultural data.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontWeight: 800 }}>
                                    <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '50%' }}><CheckCircle2 size={14} color="white" /></div>
                                    Multiple Seed Detection (Standard)
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontWeight: 800 }}>
                                    <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '50%' }}><CheckCircle2 size={14} color="white" /></div>
                                    Micro-Defect Identification
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontWeight: 800 }}>
                                    <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '50%' }}><CheckCircle2 size={14} color="white" /></div>
                                    Automated Grade Recommendation
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* STRATEGIC SOLUTION ROADMAP */}
            <section style={{ padding: '8rem 5%', background: 'white' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="section-tag" style={{ margin: '0 auto 1.5rem' }}>Platform Architecture</div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 950 }}>Designed for <span className="gradient-text">Agricultural Scale</span></h2>
                    <p style={{ color: 'var(--text-light)', marginTop: '1.5rem', fontSize: '1.2rem', maxWidth: '800px', margin: '1.5rem auto' }}>
                        From real-time edge detection to comprehensive supply chain analytics, MaizeScan is a full-stack solution for modern seed quality management.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '2rem', border: '1px solid #f1f5f9' }}>
                        <img src="/images/roadmap_1.jpg" alt="Detection Roadmap" style={{ width: '100%', borderRadius: '1.5rem', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>1. Detection & Analysis Core</h3>
                        <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Our neural networks identify multi-seed clusters and apply real-time 5-class classification with 98% confidence scoring.</p>
                    </motion.div>
                    <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '2rem', border: '1px solid #f1f5f9' }}>
                        <img src="/images/roadmap_2.jpg" alt="Grading Roadmap" style={{ width: '100%', borderRadius: '1.5rem', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem' }}>2. Grading & Recommendation</h3>
                        <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Automated Grade A/B/C assignments with expert agricultural recommendations for sowing, milling, or feed use.</p>
                    </motion.div>
                </div>
            </section>

            <section style={{ padding: '8rem 5%', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Who is <span className="gradient-text">MaizeScan</span> for?</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    <UseCaseCard icon={<Users />} title="Seed Processors" desc="Streamline industrial sorting lines for export." />
                    <UseCaseCard icon={<Cpu />} title="Agri Labs" desc="Standardized grading for certification and testing." />
                    <UseCaseCard icon={<Leaf />} title="Small Farmers" desc="Objective valuation for selling their yield." />
                    <UseCaseCard icon={<HelpCircle />} title="Inspectors" desc="Mobile tool for field quality audits." />
                </div>
            </section>

            {/* 5. FAQ SECTION */}
            <section style={{ padding: '8rem 5%', background: '#f8fafc' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked <span className="gradient-text">Questions</span></h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <FAQItem question="How accurate is the AI detection?" answer="MaizeScan utilizes a custom-trained YOLOv8 model that achieves 98%+ accuracy on standardized laboratory samples and high-reliability in variable field conditions." />
                        <FAQItem question="Can I use it offline?" answer="The mobile-optimized version supports offline inference for edge devices, while our cloud dashboard manages historical synchronization when back online." />
                        <FAQItem question="Does it detect overlapping seeds?" answer="Yes, our advanced segmentation algorithms handle dense clustering and overlapping seeds by analyzing centroid separation and individual edge patterns." />
                        <FAQItem question="How is the final grade calculated?" answer="Grading is based on the weighted percentage of 'Excellent' and 'Good' classes vs 'Bad' and 'Worst', adhering to international seed certification protocols." />
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section style={{ padding: '5rem 5%' }}>
                <motion.div whileHover={{ scale: 1.01 }} className="glass-panel shimmer" style={{
                    padding: '6rem 3rem', textAlign: 'center',
                    background: 'linear-gradient(135deg, var(--primary) 0%, #1b4332 100%)',
                    color: 'white', border: 'none', borderRadius: '4rem'
                }}>
                    <h2 style={{ fontSize: '4rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>Start Smart Inspection Today</h2>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>Join the network of thousands of farmers and labs optimizing their agricultural ecosystem with MaizeScan AI.</p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/register')} className="btn" style={{ background: 'white', color: 'var(--primary)', padding: '1.25rem 3rem', borderRadius: '3rem', fontWeight: 800 }}>Create Free Account</button>
                        <button onClick={() => navigate('/detect')} className="btn" style={{ border: '1px solid white', color: 'white', padding: '1.25rem 3rem', borderRadius: '3rem', fontWeight: 800 }}>Launch Live Demo</button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 5%', borderTop: '1px solid #f1f5f9', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/images/logo.png" alt="MaizeScan Footer Logo" style={{ height: '40px' }} />
                        <span style={{ fontSize: '1.5rem', fontWeight: 950, letterSpacing: '-1px' }}>Maize<span className="gradient-text">Scan</span></span>
                    </div>
                    <div style={{ display: 'flex', gap: '3rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-light)' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Protocol</span>
                        <span>Lab Integration</span>
                        <span>Contact Support</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2024 MaizeScan AI. All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
};

const StatBox = ({ val, label }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        minWidth: '150px'
    }}>
        <div style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '0.2rem', lineHeight: 1 }}>{val}</div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{label}</div>
    </div>
);

const BenefitItem = ({ icon, title, desc }) => (
    <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ marginTop: '0.25rem' }}>{icon}</div>
        <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{title}</div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{desc}</div>
        </div>
    </div>
);

const TechFeature = ({ icon, title, desc }) => (
    <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ height: 'max-content', background: 'white', padding: '0.75rem', borderRadius: '1rem', color: 'var(--primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>{icon}</div>
        <div>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>{title}</div>
            <div style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{desc}</div>
        </div>
    </div>
);

const UseCaseCard = ({ icon, title, desc }) => (
    <motion.div whileHover={{ y: -10 }} className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: 'var(--accent)', color: 'var(--primary)', padding: '1rem', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
            {React.cloneElement(icon, { size: 30 })}
        </div>
        <div style={{ fontWeight: 900, fontSize: '1.25rem', marginBottom: '1rem' }}>{title}</div>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.5 }}>{desc}</p>
    </motion.div>
);

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', cursor: 'pointer', background: 'white' }} onClick={() => setIsOpen(!isOpen)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{question}</span>
                <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                        <p style={{ marginTop: '1.5rem', color: 'var(--text-light)', lineHeight: 1.6 }}>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const XCircleRed = () => <div style={{ background: '#ef4444', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={12} color="white" /></div>;
const CheckCircleGreen = () => <div style={{ background: '#22c55e', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={12} color="white" /></div>;

const DemoBox = ({ top, left, color, label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 4, delay: delay }}
        style={{
            position: 'absolute', top, left,
            width: '80px', height: '80px',
            border: `2px solid ${color}`,
            borderRadius: '1rem',
            boxShadow: `0 0 15px ${color}66`
        }}
    >
        <div style={{ background: color, color: 'white', padding: '2px 6px', fontSize: '0.6rem', fontWeight: 900, borderRadius: '4px', position: 'absolute', top: '-20px', left: '-2px' }}>
            {label}
        </div>
    </motion.div>
);

export default LandingPage;
