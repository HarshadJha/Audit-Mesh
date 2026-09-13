import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
  children?: React.ReactNode;
}

const TAB_TITLES: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Executive Oversight & Active Risks',
    subtitle: 'Answers: "What financial risks require immediate investigation today?"',
  },
  investigations: {
    title: 'Investigation Workspace',
    subtitle: 'Answers: "Why was this transaction cluster flagged, and what is the evidence?"',
  },
  transactions: {
    title: 'Transaction Ledger & Normalization',
    subtitle: 'Answers: "What transactions have been processed and what patterns did they trigger?"',
  },
  vendors: {
    title: 'Vendor Risk & Intelligence',
    subtitle: 'Answers: "Can this vendor be trusted based on invoicing history and associations?"',
  },
  employees: {
    title: 'Employee Spending & Approvals',
    subtitle: 'Answers: "Are there behavioral shifts, self-approvals, or vendor steering?"',
  },
  graph: {
    title: 'Entity Relationship Graph',
    subtitle: 'Answers: "How are vendors, employees, and bank accounts secretly linked?"',
  },
  timeline: {
    title: 'Forensic Transaction Timeline',
    subtitle: 'Answers: "What was the chronological sequence of actions and off-hours approvals?"',
  },
  reports: {
    title: 'Defensible Audit Reports',
    subtitle: 'Answers: "What formal evidence and auditor sign-offs have been compiled?"',
  },
  settings: {
    title: 'System & Policy Configuration',
    subtitle: 'Configure approval thresholds, active detection rules, and organizational settings.',
  },
};

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const activeHeader = TAB_TITLES[currentTab] || {
    title: 'Audit Mesh',
    subtitle: 'Forensic Financial Investigation Platform',
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header title={activeHeader.title} subtitle={activeHeader.subtitle} />
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children ? children : (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Executive Welcome Card */}
              <div className="p-6 rounded-lg bg-surface border border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Welcome to Audit Mesh Workspace</h2>
                  <p className="text-xs text-foreground-muted mt-1 max-w-xl">
                    Phase 1 Scaffolding Complete. The dual detection engines (Node.js rule registry + Python ML anomaly service) are operational and ready for benchmark data seeding in Phase 2.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-md bg-surface-secondary border border-border-strong text-xs font-mono text-blue-400">
                    13 Rules Active
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
