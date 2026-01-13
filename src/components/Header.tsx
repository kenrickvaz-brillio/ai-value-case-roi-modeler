import React from 'react';
import { Activity } from 'lucide-react';
import { INDUSTRIES, SIZES, HORIZONS, type Industry, type CompanySize, type TimeHorizon } from '../data';

interface HeaderProps {
    industry: Industry;
    setIndustry: (val: Industry) => void;
    size: CompanySize;
    setSize: (val: CompanySize) => void;
    horizon: TimeHorizon;
    setHorizon: (val: TimeHorizon) => void;
}

const Header: React.FC<HeaderProps> = ({
    industry, setIndustry,
    size, setSize,
    horizon, setHorizon
}) => {
    return (
        <header className="main-header glass">
            <div className="header-content">
                <div className="brand">
                    <div className="logo-icon">
                        <Activity size={24} color="var(--accent)" />
                    </div>
                    <div>
                        <h1>AI Value Case & ROI Modeler</h1>
                        <p className="subtitle">From AI Features to Measurable Business Impact</p>
                    </div>
                </div>

                <div className="context-selectors">
                    <div className="selector">
                        <label>Industry</label>
                        <select value={industry} onChange={(e) => setIndustry(e.target.value as Industry)}>
                            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                    </div>
                    <div className="selector">
                        <label>Company Size</label>
                        <select value={size} onChange={(e) => setSize(e.target.value as CompanySize)}>
                            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="selector">
                        <label>Horizon</label>
                        <select value={horizon} onChange={(e) => setHorizon(Number(e.target.value) as TimeHorizon)}>
                            {HORIZONS.map(h => <option key={h} value={h}>{h} Months</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
