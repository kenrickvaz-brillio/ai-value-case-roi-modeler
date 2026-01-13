import React, { useState, useMemo } from 'react';
import { Download } from 'lucide-react';
import {
  FEATURES,
  KPIS,
  OUTCOMES,
  type Industry,
  type CompanySize,
  type TimeHorizon
} from './data';
import Header from './components/Header';
import FeaturePanel from './components/FeaturePanel';
import OutcomesPanel from './components/OutcomesPanel';
import KPIPanel from './components/KPIPanel';
import ROIPanel from './components/ROIPanel';
import SensitivityPanel from './components/SensitivityPanel';
import ExportModal from './components/ExportModal';
import './App.css';

const App: React.FC = () => {
  // --- State ---
  const [industry, setIndustry] = useState<Industry>('Banking');
  const [size, setSize] = useState<CompanySize>('Enterprise');
  const [horizon, setHorizon] = useState<TimeHorizon>(24);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['triage', 'copilot']);
  const [adoption, setAdoption] = useState(80);
  const [dataQuality, setDataQuality] = useState(75);
  const [changeMgmt, setChangeMgmt] = useState(70);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Calculations ---
  const industryMult = useMemo(() => {
    const map: Record<Industry, number> = { Telecom: 1.2, Banking: 1.5, Healthcare: 1.3, Retail: 1.0 };
    return map[industry];
  }, [industry]);

  const sizeMult = useMemo(() => {
    const map: Record<CompanySize, number> = { 'Mid-Market': 0.5, Enterprise: 1.0, Global: 2.5 };
    return map[size];
  }, [size]);

  const totalMultiplier = industryMult * sizeMult;
  const annualVolume = 1000000 * totalMultiplier;

  const activeFeatures = useMemo(() =>
    FEATURES.filter(f => selectedFeatures.includes(f.id)),
    [selectedFeatures]);

  const totalCost = useMemo(() =>
    activeFeatures.reduce((acc, f) => acc + f.cost, 0),
    [activeFeatures]);

  const sensitivityMult = useMemo(() => {
    return (adoption / 100) * (dataQuality / 100) * (0.5 + changeMgmt / 200);
  }, [adoption, dataQuality, changeMgmt]);

  const kpiResults = useMemo(() => {
    return KPIS.map(kpi => {
      const baseline = kpi.baseline * (kpi.id === 'revenue_at_risk' ? totalMultiplier : 1);

      let improved = baseline;
      activeFeatures.forEach(f => {
        const impact = f.impacts.find(i => i.kpiId === kpi.id);
        if (impact) {
          if (kpi.lowerIsBetter) {
            const reduction = 1 - impact.multiplier;
            improved = improved * (1 - (reduction * sensitivityMult));
          } else {
            const gain = impact.multiplier - 1;
            improved = improved * (1 + (gain * sensitivityMult));
          }
        }
      });

      return {
        ...kpi,
        baseline,
        improved,
        delta: ((improved - baseline) / baseline) * 100
      };
    });
  }, [activeFeatures, totalMultiplier, sensitivityMult]);

  const financialImpact = useMemo(() => {
    const costPerTicketKPI = kpiResults.find(k => k.id === 'cost_per_ticket')!;
    const annualSavings = (costPerTicketKPI.baseline - costPerTicketKPI.improved) * annualVolume;

    const revenueAtRiskKPI = kpiResults.find(k => k.id === 'revenue_at_risk')!;
    const revenueUplift = (revenueAtRiskKPI.baseline - revenueAtRiskKPI.improved) * 1000000 * 0.5;

    const riskReduction = (revenueAtRiskKPI.baseline - revenueAtRiskKPI.improved) * 1000000 * 0.5;

    const totalAnnualBenefit = annualSavings + revenueUplift + riskReduction;
    const netROI = ((totalAnnualBenefit * (horizon / 12) - totalCost) / totalCost) * 100;
    const paybackPeriod = (totalCost / (totalAnnualBenefit / 12));

    return {
      annualSavings,
      revenueUplift,
      riskReduction,
      totalAnnualBenefit,
      netROI,
      paybackPeriod
    };
  }, [kpiResults, annualVolume, totalCost, horizon]);

  const chartData = useMemo(() => {
    const data = [];
    const monthlyBenefit = financialImpact.totalAnnualBenefit / 12;
    let cumulativeBenefit = 0;

    for (let i = 0; i <= horizon; i++) {
      if (i > 0) cumulativeBenefit += monthlyBenefit;
      data.push({
        month: i,
        cost: totalCost,
        benefit: cumulativeBenefit,
        roi: cumulativeBenefit - totalCost
      });
    }
    return data;
  }, [financialImpact, totalCost, horizon]);

  const activeOutcomes = useMemo(() => {
    return OUTCOMES.filter(o => o.featureIds.some(fid => selectedFeatures.includes(fid)));
  }, [selectedFeatures]);

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val.toFixed(0)}`;
  };

  return (
    <div className="app-container">
      <Header
        industry={industry} setIndustry={setIndustry}
        size={size} setSize={setSize}
        horizon={horizon} setHorizon={setHorizon}
      />

      <main className="dashboard-grid">
        <FeaturePanel
          selectedFeatures={selectedFeatures}
          toggleFeature={toggleFeature}
          formatCurrency={formatCurrency}
        />

        <div className="middle-content">
          <OutcomesPanel activeOutcomes={activeOutcomes} />
          <KPIPanel kpiResults={kpiResults} />
        </div>

        <div className="right-panel">
          <ROIPanel
            horizon={horizon}
            totalCost={totalCost}
            financialImpact={financialImpact}
            chartData={chartData}
            formatCurrency={formatCurrency}
            kpiDelta={kpiResults[0].delta}
          />

          <SensitivityPanel
            adoption={adoption} setAdoption={setAdoption}
            dataQuality={dataQuality} setDataQuality={setDataQuality}
            changeMgmt={changeMgmt} setChangeMgmt={setChangeMgmt}
          />

          <button className="export-btn" onClick={() => setIsModalOpen(true)}>
            <Download size={18} />
            <span>Export Value Case (PDF)</span>
          </button>
        </div>
      </main>

      <ExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeFeatures={activeFeatures}
        totalCost={totalCost}
        financialImpact={financialImpact}
        industry={industry}
        size={size}
        annualVolume={annualVolume}
        adoption={adoption}
        dataQuality={dataQuality}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};

export default App;
