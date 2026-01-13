import React from 'react';
import { Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OUTCOMES, type Outcome } from '../data';
import { clsx } from 'clsx';

interface OutcomesPanelProps {
    activeOutcomes: Outcome[];
}

const OutcomesPanel: React.FC<OutcomesPanelProps> = ({ activeOutcomes }) => {
    return (
        <section className="outcomes-panel card">
            <div className="panel-header">
                <Zap size={18} />
                <h2>Strategic Outcomes</h2>
            </div>
            <div className="outcomes-grid">
                <AnimatePresence mode="popLayout">
                    {OUTCOMES.map(outcome => {
                        const isActive = activeOutcomes.some(o => o.id === outcome.id);
                        return (
                            <motion.div
                                key={outcome.id}
                                layout
                                initial={{ opacity: 0.3, scale: 0.95 }}
                                animate={{
                                    opacity: isActive ? 1 : 0.2,
                                    scale: isActive ? 1 : 0.95,
                                    borderColor: isActive ? 'var(--accent)' : 'var(--border)'
                                }}
                                className={clsx("outcome-card", isActive && "active")}
                            >
                                <h3>{outcome.name}</h3>
                                <p>{outcome.description}</p>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default OutcomesPanel;
