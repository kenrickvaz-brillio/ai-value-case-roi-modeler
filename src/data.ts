export type Industry = 'Telecom' | 'Banking' | 'Healthcare' | 'Retail';
export type CompanySize = 'Mid-Market' | 'Enterprise' | 'Global';
export type TimeHorizon = 12 | 24 | 36;

export interface AIFeature {
  id: string;
  name: string;
  group: string;
  cost: number;
  complexity: 'Low' | 'Medium' | 'High';
  timeToValue: string;
  impacts: {
    kpiId: string;
    multiplier: number;
  }[];
}

export interface KPI {
  id: string;
  name: string;
  unit: string;
  baseline: number;
  prefix?: string;
  suffix?: string;
  lowerIsBetter: boolean;
}

export interface Outcome {
  id: string;
  name: string;
  description: string;
  featureIds: string[];
}

export const INDUSTRIES: Industry[] = ['Telecom', 'Banking', 'Healthcare', 'Retail'];
export const SIZES: CompanySize[] = ['Mid-Market', 'Enterprise', 'Global'];
export const HORIZONS: TimeHorizon[] = [12, 24, 36];

export const KPIS: KPI[] = [
  { id: 'cost_per_ticket', name: 'Cost per Ticket', unit: '$', baseline: 25, prefix: '$', lowerIsBetter: true },
  { id: 'aht', name: 'Avg Handle Time', unit: 'min', baseline: 12, suffix: ' min', lowerIsBetter: true },
  { id: 'churn_rate', name: 'Annual Churn Rate', unit: '%', baseline: 15, suffix: '%', lowerIsBetter: true },
  { id: 'revenue_at_risk', name: 'Revenue at Risk', unit: '$M', baseline: 45, prefix: '$', suffix: 'M', lowerIsBetter: true },
  { id: 'sla_breach', name: 'SLA Breach Rate', unit: '%', baseline: 8, suffix: '%', lowerIsBetter: true },
  { id: 'productivity', name: 'Agent Productivity', unit: 'tasks/hr', baseline: 4, suffix: ' t/h', lowerIsBetter: false },
];

export const FEATURES: AIFeature[] = [
  {
    id: 'triage',
    name: 'Intelligent Ticket Triage',
    group: 'AI Capabilities',
    cost: 150000,
    complexity: 'Low',
    timeToValue: '2-3 months',
    impacts: [
      { kpiId: 'cost_per_ticket', multiplier: 0.85 },
      { kpiId: 'aht', multiplier: 0.9 },
    ],
  },
  {
    id: 'churn',
    name: 'Predictive Churn Detection',
    group: 'AI Capabilities',
    cost: 250000,
    complexity: 'Medium',
    timeToValue: '4-6 months',
    impacts: [
      { kpiId: 'churn_rate', multiplier: 0.75 },
      { kpiId: 'revenue_at_risk', multiplier: 0.8 },
    ],
  },
  {
    id: 'root_cause',
    name: 'Automated Root Cause Analysis',
    group: 'AI Capabilities',
    cost: 200000,
    complexity: 'Medium',
    timeToValue: '3-5 months',
    impacts: [
      { kpiId: 'aht', multiplier: 0.8 },
      { kpiId: 'sla_breach', multiplier: 0.7 },
    ],
  },
  {
    id: 'copilot',
    name: 'AI-Assisted Agent Copilot',
    group: 'AI Capabilities',
    cost: 400000,
    complexity: 'High',
    timeToValue: '6-9 months',
    impacts: [
      { kpiId: 'productivity', multiplier: 1.4 },
      { kpiId: 'aht', multiplier: 0.75 },
      { kpiId: 'cost_per_ticket', multiplier: 0.8 },
    ],
  },
  {
    id: 'prevention',
    name: 'Proactive Incident Prevention',
    group: 'AI Capabilities',
    cost: 350000,
    complexity: 'High',
    timeToValue: '6-12 months',
    impacts: [
      { kpiId: 'sla_breach', multiplier: 0.5 },
      { kpiId: 'cost_per_ticket', multiplier: 0.7 },
    ],
  },
  {
    id: 'self_service',
    name: 'Self-Service Knowledge Automation',
    group: 'AI Capabilities',
    cost: 180000,
    complexity: 'Medium',
    timeToValue: '3-4 months',
    impacts: [
      { kpiId: 'cost_per_ticket', multiplier: 0.6 },
      { kpiId: 'productivity', multiplier: 1.2 },
    ],
  },
];

export const OUTCOMES: Outcome[] = [
  {
    id: 'op_cost',
    name: 'Reduced Operational Cost',
    description: 'Lower overhead through automation and efficiency.',
    featureIds: ['triage', 'copilot', 'self_service'],
  },
  {
    id: 'retention',
    name: 'Improved Customer Retention',
    description: 'Proactive engagement and faster resolution.',
    featureIds: ['churn', 'prevention'],
  },
  {
    id: 'resolution',
    name: 'Faster Resolution Times',
    description: 'AI-driven insights and automated triage.',
    featureIds: ['triage', 'root_cause', 'copilot'],
  },
  {
    id: 'support_load',
    name: 'Lower Support Load',
    description: 'Deflecting tickets to self-service channels.',
    featureIds: ['self_service', 'prevention'],
  },
  {
    id: 'revenue_leakage',
    name: 'Reduced Revenue Leakage',
    description: 'Preventing churn and SLA penalties.',
    featureIds: ['churn', 'sla_breach'],
  },
  {
    id: 'sla_compliance',
    name: 'Improved SLA Compliance',
    description: 'Meeting commitments through better resource allocation.',
    featureIds: ['root_cause', 'prevention'],
  },
];
