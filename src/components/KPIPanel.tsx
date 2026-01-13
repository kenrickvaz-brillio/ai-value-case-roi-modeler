import React from 'react';
import { BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface KPIResult {
    id: string;
    name: string;
    prefix?: string;
    suffix?: string;
    baseline: number;
    improved: number;
    delta: number;
    lowerIsBetter: boolean;
}

interface KPIPanelProps {
    kpiResults: KPIResult[];
}

const KPIPanel: React.FC<KPIPanelProps> = ({ kpiResults }) => {
    return (
        <section className="kpi-panel">
            <div className="panel-header">
                <BarChart3 size={18} />
                <h2>KPI Impact</h2>
            </div>
            <div className="kpi-grid">
                {kpiResults.map(kpi => (
                    <div key={kpi.id} className="kpi-card card">
                        <div className="kpi-label">{kpi.name}</div>
                        <div className="kpi-values">
                            <div className="baseline">
                                <span className="val">{kpi.prefix}{kpi.baseline.toFixed(1)}{kpi.suffix}</span>
                                <span className="lab">Baseline</span>
                            </div>
                            <ArrowRight size={14} className="kpi-arrow" />
                            <div className="improved">
                                <motion.span
                                    key={kpi.improved}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="val"
                                >
                                    {kpi.prefix}{kpi.improved.toFixed(1)}{kpi.suffix}
                                </motion.span>
                                <span className="lab">Projected</span>
                            </div>
                        </div>
                        <div className={clsx("kpi-delta", kpi.delta < 0 ? (kpi.lowerIsBetter ? "good" : "bad") : (kpi.lowerIsBetter ? "bad" : "good"))}>
                            {kpi.delta > 0 ? '+' : ''}{kpi.delta.toFixed(1)}%
                        </div>
                        <div className="confidence-band">
                            <motion.div
                                className="band-fill"
                                animate={{ width: ['40%', '60%', '40%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KPIPanel;
