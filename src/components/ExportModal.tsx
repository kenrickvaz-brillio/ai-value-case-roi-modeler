import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Industry, type CompanySize, type AIFeature } from '../data';

interface ExportModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeFeatures: AIFeature[];
    totalCost: number;
    financialImpact: {
        totalAnnualBenefit: number;
        netROI: number;
        paybackPeriod: number;
    };
    industry: Industry;
    size: CompanySize;
    annualVolume: number;
    adoption: number;
    dataQuality: number;
    formatCurrency: (val: number) => string;
}

const ExportModal: React.FC<ExportModalProps> = ({
    isOpen,
    onClose,
    activeFeatures,
    totalCost,
    financialImpact,
    industry,
    size,
    annualVolume,
    adoption,
    dataQuality,
    formatCurrency
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content card"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>Executive Value Case Summary</h2>
                            <button className="close-btn" onClick={onClose}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="summary-section">
                                <h4>Selected Capabilities</h4>
                                <div className="summary-tags">
                                    {activeFeatures.map(f => <span key={f.id} className="tag">{f.name}</span>)}
                                </div>
                            </div>
                            <div className="summary-grid">
                                <div className="summary-item">
                                    <label>Total Investment</label>
                                    <div className="val">{formatCurrency(totalCost)}</div>
                                </div>
                                <div className="summary-item">
                                    <label>Annual Benefit</label>
                                    <div className="val success">{formatCurrency(financialImpact.totalAnnualBenefit)}</div>
                                </div>
                                <div className="summary-item">
                                    <label>Net ROI</label>
                                    <div className="val highlight">{financialImpact.netROI.toFixed(0)}%</div>
                                </div>
                                <div className="summary-item">
                                    <label>Payback</label>
                                    <div className="val">{financialImpact.paybackPeriod.toFixed(1)} Months</div>
                                </div>
                            </div>
                            <div className="assumptions">
                                <h4>Key Assumptions</h4>
                                <ul>
                                    <li>Industry baseline: {industry}</li>
                                    <li>Scale: {size} ({annualVolume.toLocaleString()} annual tickets)</li>
                                    <li>Adoption: {adoption}%</li>
                                    <li>Data Quality: {dataQuality}%</li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="primary-btn" onClick={onClose}>Download Full Report</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExportModal;
