import React from 'react';
import { Search, Bell, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="h-16 border-b border-border bg-surface px-8 flex items-center justify-between">
      {/* Page Title & Question Answered */}
      <div>
        <h1 className="text-base font-semibold text-foreground tracking-tight">{title}</h1>
        <p className="text-xs text-foreground-subtle">{subtitle}</p>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-subtle" />
          <input
            type="text"
            placeholder="Search vendor, invoice, staff..."
            className="w-full h-8 pl-9 pr-3 rounded-md bg-surface-secondary border border-border text-xs text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent"
          />
        </div>

        {/* Audit Mode Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Continuous Audit</span>
        </div>

        {/* Notification Bell */}
        <button className="p-2 rounded-md hover:bg-surface-secondary text-foreground-muted hover:text-foreground transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-7 h-7 rounded-full bg-surface-elevated border border-border-strong flex items-center justify-center text-foreground-muted">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left hidden md:block">
            <div className="text-xs font-medium text-foreground">Lead Auditor</div>
            <div className="text-[10px] text-foreground-subtle font-mono">SME Core Org</div>
          </div>
        </div>
      </div>
    </header>
  );
};
