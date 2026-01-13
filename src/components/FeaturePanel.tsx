import React from 'react';
import { Settings, CheckCircle2 } from 'lucide-react';
import { FEATURES } from '../data';
import { clsx } from 'clsx';

interface FeaturePanelProps {
    selectedFeatures: string[];
    toggleFeature: (id: string) => void;
    formatCurrency: (val: number) => string;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({
    selectedFeatures,
    toggleFeature,
    formatCurrency
}) => {
    return (
        <aside className="left-panel card">
            <div className="panel-header">
                <Settings size={18} />
                <h2>AI Capabilities</h2>
            </div>
            <div className="feature-list">
                {FEATURES.map(feature => (
                    <div
                        key={feature.id}
                        className={clsx("feature-item", selectedFeatures.includes(feature.id) && "active")}
                        onClick={() => toggleFeature(feature.id)}
                    >
                        <div className="feature-checkbox">
                            {selectedFeatures.includes(feature.id) && <CheckCircle2 size={16} />}
                        </div>
                        <div className="feature-info">
                            <h3>{feature.name}</h3>
                            <div className="feature-meta">
                                <span>{formatCurrency(feature.cost)}</span>
                                <span className="dot">•</span>
                                <span className={clsx("complexity", feature.complexity.toLowerCase())}>
                                    {feature.complexity} Complexity
                                </span>
                            </div>
                            <div className="ttv">TTV: {feature.timeToValue}</div>
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default FeaturePanel;
