import React from 'react';
import {
  LayoutDashboard,
  ShieldAlert,
  ReceiptText,
  Building2,
  Users,
  Network,
  Clock,
  FileSpreadsheet,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'investigations', label: 'Investigations', icon: ShieldAlert, badge: 14 },
  { id: 'transactions', label: 'Transactions', icon: ReceiptText },
  { id: 'vendors', label: 'Vendor Intelligence', icon: Building2 },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'graph', label: 'Entity Graph', icon: Network },
  { id: 'timeline', label: 'Audit Timeline', icon: Clock },
  { id: 'reports', label: 'Audit Reports', icon: FileSpreadsheet },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <div className="font-semibold text-sm tracking-wide text-foreground">Audit Mesh</div>
          <div className="text-[11px] text-foreground-subtle uppercase tracking-wider font-mono">Forensic Core</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-foreground-subtle tracking-wider uppercase">
          WORKSPACE
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-surface-elevated text-foreground border border-border-strong'
                  : 'text-foreground-muted hover:text-foreground hover:bg-surface-secondary'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-foreground-subtle'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / System Status */}
      <div className="p-4 border-t border-border bg-surface-secondary/40">
        <div className="flex items-center justify-between text-xs text-foreground-subtle">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Detection Active
          </span>
          <span className="font-mono text-[10px]">v1.0.0</span>
        </div>
      </div>
    </aside>
  );
};
