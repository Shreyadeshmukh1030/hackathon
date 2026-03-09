import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Download, Search, Filter, ChevronRight, FileSpreadsheet, FileText, Calendar, History, Trash2, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_URL = 'http://localhost:8000';

const ReportsPage = ({ user }) => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGrade, setFilterGrade] = useState('All');
    const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            const response = await axios.get(`${API_URL}/batches`);
            setBatches(response.data);
        } catch (err) {
            console.error("Fetch batches failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        try {
            if (batches.length === 0) return;
            const headers = ["Batch ID", "Timestamp", "Total Count", "Final Grade", "Moisture Content", "Variety"].join(',');
            const rows = batches.map(b => [
                b.batch_id,
                b.timestamp,
                b.total_count,
                b.final_grade,
                b.moisture_content,
                b.seed_variety
            ].join(','));
            const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
            const link = document.createElement("a");
            link.setAttribute("href", encodeURI(csvContent));
            link.setAttribute("download", `MaizeScan_FullAudit_${new Date().getTime()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("CSV Download failed:", err);
            alert("CSV export failed. See console for details.");
        }
    };

    const generateFullPDF = () => {
        try {
            console.log("Generating Full PDF...");
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.setTextColor(45, 106, 79);
            doc.text("MaizeScan Agri-Core Audit Log", 14, 22);

            doc.setFontSize(10);
            doc.setTextColor(100);
            doc.text(`System-Wide Batch Report | Generated: ${new Date().toLocaleString()}`, 14, 30);

            // Add Logo to Master PDF
            try {
                doc.addImage("/images/logo.png", 'PNG', doc.internal.pageSize.width - 45, 10, 30, 30);
            } catch (e) {
                console.error("Master Logo injection failed:", e);
            }

            const tableData = batches.map(b => [
                b.batch_id,
                new Date(b.timestamp).toLocaleDateString(),
                b.total_count,
                b.final_grade,
                `${b.moisture_content}%`,
                b.seed_variety
            ]);

            autoTable(doc, {
                startY: 40,
                head: [['Batch ID', 'Date', 'Seeds', 'Grade', 'Moisture', 'Variety']],
                body: tableData,
                theme: 'striped',
                headStyles: { fillColor: [45, 106, 79] },
                styles: { fontSize: 8 }
            });

            doc.save(`MaizeScan_FullAudit_${new Date().getTime()}.pdf`);
            console.log("Full PDF Saved");
        } catch (err) {
            console.error("Master PDF generation failed:", err);
            alert("Failed to generate Master PDF. Check if jspdf-autotable is loaded correctly.");
        }
    };

    const generateCertificatePDF = (b) => {
        try {
            setDownloading(b.id);
            console.log("Starting PDF generation for:", b.batch_id);
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;

            // 1. Professional Branded Header
            doc.setFillColor(27, 67, 50); // var(--primary-dark)
            doc.rect(0, 0, pageWidth, 45, 'F');

            // Draw Corporate Logo
            try {
                doc.addImage("/images/logo.png", 'PNG', 15, 8, 28, 28);
            } catch (e) {
                console.error("Logo injection failed:", e);
            }

            // Branded Text
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(28);
            doc.setFont("helvetica", "bold");
            doc.text("MaizeScan", 48, 25);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("AI-POWERED SEED QUALITY GRADING SYSTEM", 48, 33);

            doc.setFontSize(14);
            doc.text("OFFICIAL QUALITY REPORT", pageWidth - 15, 25, { align: 'right' });
            doc.setFontSize(9);
            doc.text(`Batch ID: ${b.batch_id}`, pageWidth - 15, 33, { align: 'right' });

            // 2. Report Overview
            let currentY = 55;
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text(`Maize Seed Quality Report – Batch #${b.batch_id}`, 15, currentY);

            currentY += 10;
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Report Date:", 15, currentY);
            doc.setFont("helvetica", "normal");
            doc.text(new Date().toLocaleDateString(), 45, currentY);

            doc.setFont("helvetica", "bold");
            doc.text("Farmer / Client:", 100, currentY);
            doc.setFont("helvetica", "normal");
            doc.text(user?.full_name || b.farmer_name || "Regional Partner", 130, currentY);

            currentY += 6;
            doc.setFont("helvetica", "bold");
            doc.text("Location:", 15, currentY);
            doc.setFont("helvetica", "normal");
            doc.text(b.location_name || "Nagpur, Maharashtra", 45, currentY);

            doc.setFont("helvetica", "bold");
            doc.text("Operator ID:", 100, currentY);
            doc.setFont("helvetica", "normal");
            doc.text(`MS-OPERATOR-${user?.id || '001'}`, 130, currentY);

            currentY += 6;
            doc.setFont("helvetica", "bold");
            doc.text("Model Version:", 15, currentY);
            doc.setFont("helvetica", "normal");
            doc.text("maize_yolov8_cls_v1.2 (YOLOv8n-cls)", 45, currentY);

            // 3. Section 1: Batch Summary
            currentY += 15;
            doc.setDrawColor(200, 200, 200);
            doc.line(15, currentY, pageWidth - 15, currentY);
            currentY += 10;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("1. Batch Summary", 15, currentY);

            currentY += 8;
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`- Total seeds analysed:`, 15, currentY);
            doc.setFont("helvetica", "bold");
            doc.text(`${b.total_count} Seeds`, 55, currentY);

            currentY += 6;
            doc.setFont("helvetica", "normal");
            doc.text(`- Grade assigned:`, 15, currentY);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(45, 106, 79);

            const gQual = (Number(b.excellent_percentage) + Number(b.good_percentage)).toFixed(1);
            const dQual = (Number(b.bad_percentage) + Number(b.worst_percentage)).toFixed(1);

            let gradeLabel = b.final_grade || "N/A";
            if (gQual >= 80 && dQual <= 5) gradeLabel = "Grade A (High Quality)";
            else if (gQual >= 60) gradeLabel = "Grade B (Medium Quality)";
            else gradeLabel = "Grade C (Low Quality)";

            doc.text(`${gradeLabel}`, 55, currentY);
            doc.setTextColor(0, 0, 0);

            currentY += 6;
            doc.setFont("helvetica", "normal");
            doc.text(`- Good-quality percentage:`, 15, currentY);
            doc.setFont("helvetica", "bold");
            doc.text(`${gQual}%`, 65, currentY);

            currentY += 6;
            doc.setFont("helvetica", "normal");
            doc.text(`- Defective percentage:`, 15, currentY);
            doc.setFont("helvetica", "bold");
            doc.text(`${dQual}%`, 65, currentY);

            currentY += 10;
            doc.setFont("helvetica", "bold");
            doc.text("Recommendation:", 15, currentY);
            currentY += 6;
            doc.setFont("helvetica", "normal");
            const recText = b.recommendation || "This batch is suitable for sowing. Only a small proportion of defective seeds were detected. No special cleaning or separation is required beyond standard seed treatment.";
            const splitRec = doc.splitTextToSize(recText, pageWidth - 30);
            doc.text(splitRec, 15, currentY);
            currentY += (splitRec.length * 5);

            // 4. Section 2: Class-wise distribution
            currentY += 5;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("2. Class-wise distribution", 15, currentY);

            autoTable(doc, {
                startY: currentY + 5,
                head: [['Class', 'Description', 'Count', 'Percentage']],
                body: [
                    ['Excellent', 'Uniform, intact, healthy kernels', b.excellent_count || 0, `${Number(b.excellent_percentage || 0).toFixed(1)}%`],
                    ['Good', 'Minor blemishes, still suitable', b.good_count || 0, `${Number(b.good_percentage || 0).toFixed(1)}%`],
                    ['Average', 'Acceptable but below preferred quality', b.average_count || 0, `${Number(b.average_percentage || 0).toFixed(1)}%`],
                    ['Bad', 'Chipped / cracked / shrivelled', b.bad_count || 0, `${Number(b.bad_percentage || 0).toFixed(1)}%`],
                    ['Worst', 'Severe damage / mold / insect attack', b.worst_count || 0, `${Number(b.worst_percentage || 0).toFixed(1)}%`],
                    ['Total', '', b.total_count, '100%']
                ],
                theme: 'striped',
                headStyles: { fillColor: [45, 106, 79] },
                styles: { fontSize: 9 }
            });

            currentY = doc.lastAutoTable.finalY + 15;

            // 5. Section 3: Grading logic
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("3. Grading Logic (Transparency)", 15, currentY);
            currentY += 7;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("The system assigns Grades using rule-based thresholds on Good-Quality% and Defective%:", 15, currentY);
            currentY += 5;
            doc.text("- Grade A: GoodQuality% >= 80% and Defective% <= 5%", 20, currentY);
            currentY += 5;
            doc.text("- Grade B: 60% <= GoodQuality% < 80%", 20, currentY);
            currentY += 5;
            doc.text("- Grade C: GoodQuality% < 60% or Defective% > 15%", 20, currentY);

            // 6. Section 4: Notes / observations
            currentY += 15;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text("4. Notes / observations", 15, currentY);
            currentY += 7;
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.text("- Sample appears to be from a recent harvest with good drying.", 15, currentY);
            currentY += 5;
            doc.text("- Recommended for direct sowing after standard fungicide seed treatment.", 15, currentY);

            // 7. Disclaimer
            currentY += 15;
            doc.setFont("helvetica", "italic");
            doc.setFontSize(8);
            doc.setTextColor(150);
            const discl = "Disclaimer: This report is generated using an AI-based image analysis model trained on maize seed images. Results depend on image quality, sampling method, and model version. For critical certification, combine this report with standard lab tests.";
            const splitDiscl = doc.splitTextToSize(discl, pageWidth - 30);
            doc.text(splitDiscl, 15, currentY);

            // 8. Footer
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(27, 67, 50);
            doc.text("Smart Maize Seed Sorter – AI-Based Seed Quality Grading System", pageWidth / 2, 285, { align: 'center' });
            doc.text("© 2026 – MaizeScan Agri-Core Distribution Hub", pageWidth / 2, 290, { align: 'center' });

            doc.save(`MaizeScan_Report_${b.batch_id}.pdf`);
            console.log("PDF Saved successfully for:", b.batch_id);
        } catch (err) {
            console.error("PDF Generation Error:", err);
            alert("PDF generation failed: " + err.message);
        } finally {
            setDownloading(null);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const processedBatches = [...batches]
        .filter(b => {
            const matchesSearch = (b.batch_id?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                (b.final_grade?.toLowerCase() || "").includes(searchTerm.toLowerCase());
            const matchesGrade = filterGrade === 'All' || b.final_grade === filterGrade;
            return matchesSearch && matchesGrade;
        })
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1400px', margin: '4rem auto', padding: '0 2rem', position: 'relative' }}>
            {/* Background Pattern */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url("/images/pattern.png")',
                backgroundSize: '400px',
                opacity: 0.05,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="section-tag shimmer">Global Audit Trail</div>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '0.8rem' }}>Batch <span className="gradient-text">Operations</span></h1>
                    <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', fontWeight: 600 }}>Secure extraction and certification of regional seed batches.</p>
                </motion.div>
                <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <button className="btn btn-secondary shimmer" onClick={downloadCSV}>
                        <FileSpreadsheet size={20} /> CSV Download
                    </button>
                    <button className="btn btn-primary shimmer" onClick={generateFullPDF}>
                        <Download size={20} /> Master PDF Report
                    </button>
                </div>
            </div>

            {/* Filter Panel */}
            <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={22} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    <input
                        type="text"
                        placeholder="Search Batch ID, Grade, or ID..."
                        className="form-input"
                        style={{ paddingLeft: '3.5rem', fontSize: '1rem', background: 'white' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1, color: 'var(--primary)' }} />
                        <select
                            value={filterGrade}
                            onChange={(e) => setFilterGrade(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '3rem', cursor: 'pointer', background: 'white', fontWeight: 700 }}
                        >
                            <option value="All">All Grades</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Average">Average</option>
                            <option value="Bad">Bad</option>
                            <option value="Worst">Worst</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <div className="glass-panel" style={{ overflow: 'hidden', padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left' }}>
                            <th onClick={() => handleSort('batch_id')} style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}>
                                IDENTITY <ArrowUpDown size={14} style={{ marginLeft: '5px' }} />
                            </th>
                            <th onClick={() => handleSort('timestamp')} style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}>
                                TIMESTAMP <ArrowUpDown size={14} style={{ marginLeft: '5px' }} />
                            </th>
                            <th onClick={() => handleSort('moisture_content')} style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}>
                                MOISTURE <ArrowUpDown size={14} style={{ marginLeft: '5px' }} />
                            </th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800 }}>QUALITY INDEX</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800 }}>STATUS</th>
                            <th style={{ padding: '1rem 1.5rem', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 800, textAlign: 'right' }}>CERTIFICATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6" style={{ padding: '8rem', textAlign: 'center', fontWeight: 900, color: 'var(--primary)', letterSpacing: '2px' }}>ESTABLISHING AUDIT LINK...</td></tr>
                        ) : processedBatches.length === 0 ? (
                            <tr><td colSpan="6" style={{ padding: '8rem', textAlign: 'center', fontWeight: 700, color: 'var(--text-light)' }}>NO BATCHES FOUND IN CURRENT OPERATIONAL SCOPE.</td></tr>
                        ) : processedBatches.map((batch, idx) => (
                            <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                key={batch.id}
                                className="report-row"
                                style={{ background: 'white' }}
                            >
                                <td style={{ padding: '1.25rem 1.5rem', borderRadius: '1rem 0 0 1rem', fontWeight: 900, color: 'var(--primary-dark)' }}>
                                    {batch.batch_id}
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ fontWeight: 800 }}>{new Date(batch.timestamp).toLocaleDateString()}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 700 }}>{new Date(batch.timestamp).toLocaleTimeString()}</div>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', fontWeight: 900, color: 'var(--primary)' }}>{batch.moisture_content}%</td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '60px', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(Number(batch.excellent_percentage || 0) + Number(batch.good_percentage || 0)).toFixed(1)}%`, height: '100%', background: 'var(--excellent)' }} />
                                        </div>
                                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{(Number(batch.excellent_percentage || 0) + Number(batch.good_percentage || 0)).toFixed(1)}%</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.5rem 1.25rem', borderRadius: '2rem', fontSize: '0.8rem', fontWeight: 900,
                                        background: batch.final_grade === 'Excellent' || batch.final_grade === 'Good' ? '#dcfce7' : batch.final_grade === 'Bad' ? '#fee2e2' : '#fef3c7',
                                        color: batch.final_grade === 'Excellent' || batch.final_grade === 'Good' ? '#166534' : batch.final_grade === 'Bad' ? '#991b1b' : '#92400e',
                                        border: '1px solid rgba(0,0,0,0.05)'
                                    }}>
                                        {batch.final_grade?.toUpperCase() || "N/A"}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem 1.5rem', borderRadius: '0 1rem 1rem 0', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                        <button
                                            className="btn-icon"
                                            onClick={() => generateCertificatePDF(batch)}
                                            title="Download PDF Certificate"
                                            disabled={downloading === batch.id}
                                        >
                                            {downloading === batch.id ? "..." : <FileText size={18} />}
                                        </button>
                                        <button className="btn-icon" style={{ color: '#ef4444' }} onClick={async () => { if (confirm('Delete this audit record?')) { await axios.delete(`${API_URL}/batches/${batch.id}`); fetchBatches(); } }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .report-row {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .report-row:hover {
                    transform: scale(1.015) translateX(10px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    z-index: 10;
                    background: #f8fafc !important;
                }
                .btn-icon {
                    background: white;
                    border: 1px solid #e2e8f0;
                    padding: 0.6rem;
                    border-radius: 0.75rem;
                    cursor: pointer;
                    color: var(--text-light);
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .btn-icon:hover:not(:disabled) {
                    border-color: var(--primary);
                    color: var(--primary);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(45,106,79,0.15);
                }
                .btn-icon:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .section-tag {
                    display: inline-block;
                    background: var(--accent);
                    color: var(--primary);
                    padding: 0.4rem 1.25rem;
                    border-radius: 2rem;
                    font-size: 0.8rem;
                    fontWeight: 900;
                    text-transform: uppercase;
                    margin-bottom: 1.5rem;
                }
            `}</style>
        </div>
    );
};

export default ReportsPage;
