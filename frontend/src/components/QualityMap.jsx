import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

// Fix for default marker icons in Leaflet + React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const GRADE_COLORS = {
    'Excellent': '#00C853',
    'Good': '#FFD600',
    'Average': '#FF9100',
    'Bad': '#D50000',
    'Worst': '#000000'
};

const QualityMap = ({ batches }) => {
    // Default to Nagpur, India if no batches exist
    const defaultCenter = [21.1458, 79.0882];

    // Filter batches with valid coordinates
    const mapBatches = batches.filter(b => b.latitude && b.longitude);
    const center = mapBatches.length > 0 ? [mapBatches[0].latitude, mapBatches[0].longitude] : defaultCenter;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{
                height: '500px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
            }}
        >
            <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                zIndex: 1000,
                padding: '0.75rem 1.25rem',
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--primary-dark)' }}>Regional Quality Distribution</h3>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time harvest certification mapping</p>
            </div>

            <MapContainer
                center={center}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {mapBatches.map((batch, idx) => (
                    <CircleMarker
                        key={idx}
                        center={[batch.latitude, batch.longitude]}
                        radius={10}
                        pathOptions={{
                            fillColor: GRADE_COLORS[batch.final_grade] || '#52b788',
                            color: 'white',
                            fillOpacity: 0.8,
                            weight: 2
                        }}
                    >
                        <Popup>
                            <div style={{ padding: '0.5rem', minWidth: '150px' }}>
                                <div style={{ fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '0.25rem' }}>Batch: {batch.batch_id}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <div style={{
                                        width: '10px', height: '10px', borderRadius: '50%',
                                        backgroundColor: GRADE_COLORS[batch.final_grade]
                                    }} />
                                    <span style={{ fontWeight: 700 }}>{batch.final_grade} Grade</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    Confidence: {(batch.excellent_percentage + batch.good_percentage).toFixed(1)}%<br />
                                    Variety: {batch.seed_variety}
                                </div>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>

            <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                zIndex: 1000,
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                maxWidth: '300px'
            }}>
                {Object.entries(GRADE_COLORS).map(([grade, color]) => (
                    <div key={grade} style={{
                        background: 'rgba(255,255,255,0.9)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '2rem',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                        {grade}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default QualityMap;
