import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface SensitivityPanelProps {
    adoption: number;
    setAdoption: (val: number) => void;
    dataQuality: number;
    setDataQuality: (val: number) => void;
    changeMgmt: number;
    setChangeMgmt: (val: number) => void;
}

const SensitivityPanel: React.FC<SensitivityPanelProps> = ({
    adoption, setAdoption,
    dataQuality, setDataQuality,
    changeMgmt, setChangeMgmt
}) => {
    return (
        <section className="sensitivity-panel card">
            <div className="panel-header">
                <ShieldCheck size={18} />
                <h2>Risk & Sensitivity</h2>
            </div>
            <div className="sliders">
                <div className="slider-group">
                    <div className="slider-label">
                        <span>Adoption Rate</span>
                        <span className="val">{adoption}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={adoption} onChange={(e) => setAdoption(Number(e.target.value))} />
                </div>
                <div className="slider-group">
                    <div className="slider-label">
                        <span>Data Quality</span>
                        <span className="val">{dataQuality}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={dataQuality} onChange={(e) => setDataQuality(Number(e.target.value))} />
                </div>
                <div className="slider-group">
                    <div className="slider-label">
                        <span>Change Management</span>
                        <span className="val">{changeMgmt}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={changeMgmt} onChange={(e) => setChangeMgmt(Number(e.target.value))} />
                </div>
            </div>
            <div className="sensitivity-note">
                Adjusting these parameters simulates real-world execution risk.
            </div>
        </section>
    );
};

export default SensitivityPanel;
