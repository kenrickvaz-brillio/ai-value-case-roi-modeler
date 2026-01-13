import React from 'react';
import { TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line
} from 'recharts';

interface ROIPanelProps {
    horizon: number;
    totalCost: number;
    financialImpact: {
        netROI: number;
        paybackPeriod: number;
        annualSavings: number;
        revenueUplift: number;
        riskReduction: number;
        totalAnnualBenefit: number;
    };
    chartData: any[];
    formatCurrency: (val: number) => string;
    kpiDelta: number;
}

const ROIPanel: React.FC<ROIPanelProps> = ({
    horizon,
    totalCost,
    financialImpact,
    chartData,
    formatCurrency,
    kpiDelta
}) => {
    return (
        <section className="roi-panel card">
            <div className="panel-header">
                <TrendingUp size={18} />
                <h2>Financial ROI</h2>
            </div>

            <div className="roi-hero">
                <div className="roi-stat">
                    <label>Net ROI ({horizon}mo)</label>
                    <motion.div
                        key={financialImpact.netROI}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="value highlight"
                    >
                        {financialImpact.netROI.toFixed(0)}%
                    </motion.div>
                </div>
                <div className="roi-stat">
                    <label>Payback Period</label>
                    <div className="value">{financialImpact.paybackPeriod.toFixed(1)} <span className="unit">months</span></div>
                </div>
            </div>

            <div className="financial-breakdown">
                <div className="breakdown-item">
                    <span>Annual Savings</span>
                    <span className="val success">{formatCurrency(financialImpact.annualSavings)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Revenue Uplift</span>
                    <span className="val success">{formatCurrency(financialImpact.revenueUplift)}</span>
                </div>
                <div className="breakdown-item">
                    <span>Risk Reduction</span>
                    <span className="val success">{formatCurrency(financialImpact.riskReduction)}</span>
                </div>
                <div className="breakdown-item total">
                    <span>Total Annual Benefit</span>
                    <span className="val">{formatCurrency(financialImpact.totalAnnualBenefit)}</span>
                </div>
                <div className="breakdown-item cost">
                    <span>Initial Investment</span>
                    <span className="val">({formatCurrency(totalCost)})</span>
                </div>
            </div>

            <div className="roi-chart">
                <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="month" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow)' }}
                            formatter={(val: number | string | undefined) => val !== undefined ? formatCurrency(Number(val)) : ''}
                        />
                        <Area type="monotone" dataKey="roi" stroke="var(--accent)" fillOpacity={1} fill="url(#colorRoi)" strokeWidth={2} />
                        <Line type="monotone" dataKey="cost" stroke="var(--danger)" strokeDasharray="5 5" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
                <div className="chart-label">Cumulative Net Value over {horizon} Months</div>
            </div>

            <div className="ai-summary">
                <Info size={16} className="info-icon" />
                <p>
                    Based on selected capabilities, the model estimates a <strong>{Math.abs(kpiDelta).toFixed(0)}% reduction</strong> in operational costs and a <strong>{formatCurrency(financialImpact.totalAnnualBenefit)} annualized ROI</strong> within 18 months.
                </p>
            </div>
        </section>
    );
};

export default ROIPanel;
