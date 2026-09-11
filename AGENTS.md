# AGENTS.md

# Audit Mesh — AI Agent Operating Manual

**Version**: 2.0
**Status**: Active Constitution
**Authority**: This document is the permanent operating manual for all AI agents (Antigravity IDE and any future AI systems) working on the Audit Mesh codebase.
**Supersedes**: All ad-hoc instructions given in chat unless explicitly marked as overriding this document.

> This file is NOT a README. It is NOT developer documentation.
> It is the constitutional operating manual that governs every decision, every line of code, every database migration, and every design choice in this project.

---

## Table of Contents

1. [Mission & Identity](#1-mission--identity)
2. [Priority Order](#2-priority-order)
3. [Mandatory Workflow](#3-mandatory-workflow)
4. [Project Structure](#4-project-structure)
5. [Code Quality Rules](#5-code-quality-rules)
6. [Frontend Rules](#6-frontend-rules)
7. [Backend Rules](#7-backend-rules)
8. [Database Rules](#8-database-rules)
9. [AI & ML Rules](#9-ai--ml-rules)
10. [Investigation Rules](#10-investigation-rules)
11. [Performance Rules](#11-performance-rules)
12. [Security Rules](#12-security-rules)
13. [Documentation Rules](#13-documentation-rules)
14. [Git Rules](#14-git-rules)
15. [Testing Rules](#15-testing-rules)
16. [Definition of Done](#16-definition-of-done)
17. [Forbidden Practices](#17-forbidden-practices)
18. [Decision Checklist](#18-decision-checklist)
19. [Completion Checklist](#19-completion-checklist)
20. [Golden Rule](#20-golden-rule)

---

## 1. Mission & Identity

### 1.1 What Audit Mesh Is

Audit Mesh is an **Enterprise Financial Investigation Platform for SMEs**.

It is a continuous monitoring, investigation, and explainable audit system designed for organizations that need to:
- Monitor financial transactions without requiring specialized data science skills
- Detect micro-corruption (duplicate invoices, split purchases, vendor favoritism, approval misuse)
- Investigate suspicious activity with a full chain of evidence
- Generate defensible audit reports with human review and sign-off
- Maintain an immutable historical audit record

### 1.2 What Audit Mesh Is NOT

| This IS Audit Mesh | This is NOT Audit Mesh |
|---|---|
| Enterprise Financial Investigation Platform | Fraud Detection Dashboard |
| Continuous Monitoring Workspace | CSV Analyzer or File Uploader |
| Evidence-Backed Investigation System | AI Chatbot or ChatGPT Wrapper |
| Explainable AI Investigation Assistant | ML Score Generator |
| Immutable Audit Record System | Analytics Dashboard |
| Human-Approved Workflow Engine | Automated Decision System |

**If a proposed feature doesn't strengthen investigation, explainability, or trust — do not build it.**

### 1.3 The AI Agent's Role

When working on this codebase, the AI agent is simultaneously acting as:

- **Principal Software Engineer**: Architectural decisions, code quality, system design
- **Enterprise Architect**: Module boundaries, data flow, service contracts
- **Senior Frontend Engineer**: React architecture, component design, UX implementation
- **Senior Backend Engineer**: API design, business logic, validation, transactions
- **ML Engineer**: Model integration, explainability, confidence scoring
- **DevOps Engineer**: Deployment, CI/CD, environment configuration
- **Security Engineer**: Authentication, authorization, data protection, tenant isolation
- **QA Engineer**: Testing strategy, regression prevention, edge case analysis
- **Documentation Engineer**: Architecture docs, API docs, decision logs

**The agent must never think from only one perspective.**

### 1.4 Primary Governing Documents

This AGENTS.md governs **HOW to work**. These documents govern **WHY and WHAT**:

| Document | Authority | Purpose |
|---|---|---|
| `PRODUCT_THINKING.md` | Highest | 12-Phase feature design process. Never skip phases. |
| `DESIGN_PHILOSOPHY.md` | Highest | Visual language, emotional goals, interaction standards. |
| `DECISION_FRAMEWORK.md` | Highest | Evaluation criteria for every implementation decision. |
| `DETECTION_PATTERNS.md` | Highest | All micro-fraud detection patterns, required data fields, detection logic, and dataset schema. MUST be read before implementing any detection, ML, or rule-based logic. |
| `AGENTS.md` (this file) | Constitutional | How to work, what to build, what never to do. |

**When there is a conflict:** `PRODUCT_THINKING.md` and `DESIGN_PHILOSOPHY.md` always win over implementation convenience.

### 1.5 What the Agent is NOT Allowed to Do

- ❌ Rebuild any existing module from scratch without explicit user approval
- ❌ Duplicate existing components, APIs, or database tables
- ❌ Make arbitrary architectural decisions without documenting the reasoning
- ❌ Add features that are not connected to the investigation workflow
- ❌ Use placeholder business logic or fake data in production paths
- ❌ Generate visually impressive dashboards without functional correctness
- ❌ Skip the 12-Phase design process defined in `PRODUCT_THINKING.md`
- ❌ Override user decisions made in governance documents
- ❌ Allow AI to make final decisions on flagged transactions or investigations
- ❌ Leave documentation outdated after a code change

---

## 2. Priority Order

**Always evaluate decisions in this exact descending order. Never reverse it.**

```
1. Business Value
   └── Does this improve financial investigation, explainability, or trust?

2. User Experience
   └── Does this reduce cognitive load for Auditors, Finance Managers, SME Owners?

3. Security
   └── Does this protect financial data, audit history, and user accounts?

4. Maintainability
   └── Will another engineer understand this in 6 months without asking questions?

5. Scalability
   └── Can this handle 10x current data volume without a rewrite?

6. Performance
   └── Is this fast enough to not interrupt investigation workflows?

7. Development Speed
   └── Only optimize for this after all above criteria are satisfied.
```

### 2.1 Decision Priority Applied — Examples

| Scenario | Wrong Decision | Correct Decision |
|---|---|---|
| Add a real-time chart to dashboard | Adds sparklines because they look professional | Asks: "What business question does this chart answer?" First. |
| Choose between GraphQL and REST | GraphQL because it's modern | REST with clear versioning — simpler, maintainable, auditable. |
| Build vendor risk score display | Show a number: `87/100` | Show score + rules triggered + evidence + recommendation. |
| Handle a failed invoice upload | Return 500 generic error | Return explanatory error: what failed, why, how to fix, next step. |
| Add a new chart to Investigation view | Add pie chart for category distribution | Challenge: "Does this chart help the auditor make a decision?" |

---

## 3. Mandatory Workflow

**Every implementation task must follow this workflow. Never skip a step. Never merge steps.**

### 3.0 The Mandatory Engineering Triad (GSD + Ralph Loop + CodeRabbit)

Every task, feature, bugfix, and refactor in Audit Mesh MUST operate under the **GSD + Ralph Loop + CodeRabbit Triad**:

```
 ┌────────────────────────────────────────────────────────┐
 │                      THE TRIAD                         │
 ├──────────────────┬──────────────────┬──────────────────┤
 │       GSD        │    RALPH LOOP    │   CODE RABBIT    │
 │ (Context & Spec) │  (Persistence)   │ (Review & Audit) │
 └────────┬─────────┴────────┬─────────┴────────┬─────────┘
          │                  │                  │
   Spec → Plan → Wave   Loop until tests   Static analysis,
   Execution → Proof    pass with zero     Clean Architecture,
   Artifacts            regressions        security review
```

1. **GSD (Get Shit Done)**:
   - **Spec-Driven**: Start with `.gsd/SPEC.md`, `.gsd/ROADMAP.md`, and `.gsd/STATE.md`. No unguided vibecoding.
   - **Wave Execution**: Break phases into atomic plans (`PLAN.md`) with 2-3 tasks each, mapped to dependency waves.
   - **GSD Workflows**: Use `/map`, `/plan [N]`, `/execute [N]`, `/verify [N]`, `/debug [desc]`, and `/progress`.
   - **Proof Over Claims**: Every completed task must generate tangible verification evidence (`.gsd/VERIFICATION.md`).

2. **Ralph Loop (Autonomous Persistent Verification)**:
   - **No Premature Exit**: Never stop working or declare a task "complete" based on assumptions.
   - **Self-Correcting Test Loop**: Run automated tests, typechecks (`tsc --noEmit`), and linter runs in an autonomous execution loop. If a failure occurs, isolate the root cause, fix it, and re-test until zero errors remain.
   - **Externalized Memory**: Persist state and checkpoint notes to the filesystem so context remains resilient across turns.

3. **CodeRabbit (Automated Pre-Commit Review & Quality Gate)**:
   - **Pre-Commit Code Review**: Before declaring any change ready or closing a task, subject all modified code to CodeRabbit-standard review against `.coderabbit.yaml`.
   - **Zero `any` Enforcement**: Zero TypeScript `any` types permitted.
   - **Clean Architecture Gate**: Presentation layers must never query the database directly; controllers must not contain business logic; services must depend on abstractions.
   - **Security & Explainability Audit**: Verify strict tenant isolation, JWT claims validation, parameterized queries, and explainable audit trails.

### Step 1 — Read Governance Documents

Before touching any code:
- [ ] Re-read the relevant section of `PRODUCT_THINKING.md` (identify the correct Phase)
- [ ] Re-read `DESIGN_PHILOSOPHY.md` for any UI-related task
- [ ] Re-read `DECISION_FRAMEWORK.md` to confirm the decision priority order

### Step 2 — Understand the Feature Completely

Answer these questions in writing before proceeding:
- What is the **business problem** this feature solves?
- Which **user** (SME Owner / Finance Manager / Auditor / Accountant / Admin) primarily uses this?
- What **single business question** does this page or feature answer?
- What **workflow** does this fit into? (Start → Middle → Decision → Outcome → History → Reports)
- Which **existing modules** are affected?

### Step 3 — Audit Existing Code

Before writing a single line:
- [ ] Search the codebase for similar functionality
- [ ] Check if a reusable component already exists
- [ ] Check if the API endpoint already exists
- [ ] Check if the database table already exists
- [ ] Identify which files will be modified, added, or deleted

### Step 4 — Design Before Implementation

Following `PRODUCT_THINKING.md` Phase 8:
- [ ] Define the **information hierarchy** (Question → Answer → Evidence → Actions → History)
- [ ] Define all **screen states** (loading, empty, error, success)
- [ ] Define all **interactive states** (idle, hover, active, disabled, focused)
- [ ] Verify the design matches `DESIGN_PHILOSOPHY.md` standards
- [ ] Get explicit approval if the design deviates from existing patterns

### Step 5 — Implement

- [ ] Follow the project structure conventions (Section 4)
- [ ] Apply code quality rules (Section 5)
- [ ] Apply frontend or backend rules as applicable (Sections 6 & 7)
- [ ] Apply security rules for any authenticated or data-handling feature (Section 12)

### Step 6 — Test

- [ ] Write unit tests for business logic
- [ ] Write integration tests for API endpoints
- [ ] Write component tests for UI components
- [ ] Manually verify all screen states: loading, empty, error, success
- [ ] Verify keyboard accessibility and focus management
- [ ] Verify the feature does not break any adjacent workflow

### Step 7 — Update Documentation

- [ ] Update feature documentation in `/docs/features/`
- [ ] Update API documentation if endpoints changed
- [ ] Update database documentation if schema changed
- [ ] Add a decision log entry if an architectural decision was made
- [ ] Update `CHANGELOG.md`

---

## 4. Project Structure

### 4.1 Repository Layout

```
audit-mesh/
│
├── AGENTS.md                          # Constitutional operating manual
├── PRODUCT_THINKING.md                # 12-Phase product design framework
├── DESIGN_PHILOSOPHY.md               # Visual language and UX standards
├── DECISION_FRAMEWORK.md              # Implementation decision criteria
├── CHANGELOG.md                       # Chronological change log
├── README.md                          # Project overview and setup guide
│
├── frontend/                          # React + Vite application
├── backend/                           # Node.js + Express REST API
├── python-ml/                         # Python FastAPI ML service
│
└── docs/
    ├── features/                      # Per-feature documentation
    ├── api/                           # API reference documentation
    └── database/                      # MongoDB schema documentation
```

No monorepo. No shared packages directory. No infrastructure directory. Each service is a standalone application.

### 4.2 Frontend Structure (`frontend/`)

```
frontend/
│
├── public/
├── src/
│   ├── pages/                         # React Router page components
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── ResetPasswordPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── investigations/
│   │   │   ├── InvestigationsPage.tsx
│   │   │   └── InvestigationDetailPage.tsx
│   │   ├── transactions/
│   │   │   ├── TransactionsPage.tsx
│   │   │   └── TransactionDetailPage.tsx
│   │   ├── vendors/
│   │   │   ├── VendorsPage.tsx
│   │   │   └── VendorDetailPage.tsx
│   │   ├── employees/
│   │   │   ├── EmployeesPage.tsx
│   │   │   └── EmployeeDetailPage.tsx
│   │   ├── graph/GraphPage.tsx
│   │   ├── timeline/TimelinePage.tsx
│   │   ├── reports/
│   │   │   ├── ReportsPage.tsx
│   │   │   └── ReportDetailPage.tsx
│   │   ├── ai-assistant/AIAssistantPage.tsx
│   │   └── settings/SettingsPage.tsx
│   │
│   ├── components/
│   │   ├── layout/                    # AppShell, Sidebar, Header, Breadcrumbs
│   │   ├── dashboard/
│   │   ├── investigations/
│   │   ├── transactions/
│   │   ├── vendors/
│   │   ├── employees/
│   │   ├── graph/
│   │   ├── timeline/
│   │   ├── reports/
│   │   ├── ai/
│   │   └── shared/                    # Shared reusable components
│   │       ├── RiskBadge.tsx
│   │       ├── StatusBadge.tsx
│   │       ├── EvidencePanel.tsx
│   │       ├── AuditTimestamp.tsx
│   │       ├── InvestigationCard.tsx
│   │       ├── DataTable.tsx
│   │       ├── EmptyState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── LoadingState.tsx
│   │       └── ConfirmationModal.tsx
│   │
│   ├── hooks/                         # Custom React hooks
│   ├── context/                       # React Context providers (Auth, Theme)
│   ├── services/                      # API client functions (axios/fetch wrappers)
│   ├── types/                         # TypeScript interfaces
│   ├── utils/                         # Utility functions
│   └── index.css                      # Global styles and Tailwind base
│
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

### 4.3 Backend Structure (`backend/`)

```
backend/
│
├── src/
│   ├── app.ts                         # Express app setup, middleware registration
│   ├── server.ts                      # Server entrypoint
│   │
│   ├── controllers/                   # Request handlers — call services, return responses
│   │   ├── auth.controller.ts
│   │   ├── investigations.controller.ts
│   │   ├── transactions.controller.ts
│   │   ├── vendors.controller.ts
│   │   ├── employees.controller.ts
│   │   ├── reports.controller.ts
│   │   └── uploads.controller.ts
│   │
│   ├── routes/                        # Route definitions — map URLs to controllers
│   │   ├── auth.routes.ts
│   │   ├── investigations.routes.ts
│   │   ├── transactions.routes.ts
│   │   ├── vendors.routes.ts
│   │   ├── employees.routes.ts
│   │   ├── reports.routes.ts
│   │   └── uploads.routes.ts
│   │
│   ├── models/                        # Mongoose schemas and models
│   │   ├── User.model.ts
│   │   ├── Organization.model.ts
│   │   ├── Transaction.model.ts
│   │   ├── Vendor.model.ts
│   │   ├── Employee.model.ts
│   │   ├── Investigation.model.ts
│   │   ├── Report.model.ts
│   │   └── AuditLog.model.ts
│   │
│   ├── services/                      # Business logic
│   ├── middlewares/                   # Express middleware (Auth, RBAC)
│   ├── validators/                    # Zod request validation schemas
│   ├── utils/                         # Shared utility functions
│   └── config/
│       ├── db.ts                      # MongoDB Atlas connection
│       └── constants.ts
│
├── package.json
└── tsconfig.json
```

### 4.4 ML Service Structure (`python-ml/`)

```
python-ml/
│
├── main.py                            # FastAPI entrypoint
├── routers/
│   ├── analysis.py                    # Analysis endpoints called by backend
│   └── health.py
├── services/
│   ├── isolation_forest.py
│   ├── benford_law.py
│   └── rule_engine.py
├── models/                            # Pydantic request/response models
├── utils/
├── requirements.txt
└── README.md
```

### 4.4 Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| React components | PascalCase | `InvestigationCard.tsx` |
| Hooks | camelCase with `use` prefix | `useInvestigation.ts` |
| API routes | kebab-case | `/api/v1/investigations/:id` |
| API modules | camelCase | `auth.service.ts` |
| Database tables | snake_case | `audit_investigations` |
| Database columns | snake_case | `created_at`, `organization_id` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| CSS custom properties | kebab-case with prefix | `--color-accent`, `--space-4` |
| TypeScript interfaces | PascalCase with `I` prefix | `IInvestigation`, `IVendor` |
| TypeScript enums | PascalCase | `InvestigationStatus`, `RiskLevel` |
| Zod schemas | camelCase with `Schema` suffix | `createInvestigationSchema` |
| Test files | Same name with `.test.ts` | `auth.service.test.ts` |

### 4.5 Import Order

All files must follow this import order:

```typescript
// 1. Node.js built-ins
import path from 'path';

// 2. Third-party packages
import { z } from 'zod';
import mongoose from 'mongoose';

// 3. Internal modules (same service)
import { authMiddleware } from '../middlewares/auth.middleware';

// 4. Relative imports
import { formatCurrency } from './utils';
```

---

## 5. Code Quality Rules

### 5.1 Architecture Principles

**Clean Architecture** is enforced at all times. Dependencies only flow inward:

```
Infrastructure (DB, APIs, External Services)
    ↓
Interface Adapters (Controllers, Presenters, Gateways)
    ↓
Application Use Cases (Services, Business Logic)
    ↓
Domain Entities (Models, Business Rules)
```

**Rules:**
- Domain entities must never import from infrastructure
- Services must never import directly from HTTP controllers
- Database queries must never live in route handlers
- Business logic must never live in React components

### 5.2 SOLID Principles Applied to Audit Mesh

| Principle | Application |
|---|---|
| **Single Responsibility** | `InvestigationService` handles only investigation business logic — not notifications, not reporting |
| **Open/Closed** | Risk rules are defined as a configurable rule registry — not hardcoded if/else chains |
| **Liskov Substitution** | All detection engines (duplicate invoice, split purchase, ML) implement the same `IDetectionEngine` interface |
| **Interface Segregation** | `IInvestigationReader` and `IInvestigationWriter` are separate interfaces |
| **Dependency Inversion** | Services depend on Mongoose model interfaces — not on raw collection calls scattered across the codebase |

### 5.3 Code Standards

- **DRY**: If the same logic appears more than once, extract it to a shared utility or service.
- **KISS**: Prefer the simplest solution that correctly solves the problem.
- **YAGNI**: Never build infrastructure for features that don't exist yet.
- **Strong Typing**: No `any` types in TypeScript. Use proper interfaces and generics.
- **No Magic Numbers**: All numeric constants must be named and documented.
- **Meaningful Names**: Variables, functions, and classes must communicate intent without comments.

```typescript
// ❌ Wrong
const x = t.filter(i => i.s > 85);

// ✅ Correct
const highRiskInvestigations = investigations.filter(
  investigation => investigation.riskScore > HIGH_RISK_THRESHOLD
);
```

### 5.4 Function Design Rules

- Maximum function length: **50 lines**. If longer, extract sub-functions.
- Maximum function parameters: **4**. If more, use an options object.
- Every function has a **single purpose** — it does one thing.
- Functions with side effects must be clearly named (e.g., `createAuditLog`, `sendRiskNotification`).
- **Pure functions are preferred** for business logic transformations.

### 5.5 Error Handling Rules

```typescript
// ❌ Wrong — Silent failure
try {
  await processTransaction(transaction);
} catch (e) {}

// ❌ Wrong — Generic error exposed to user
throw new Error('Database error');

// ✅ Correct — Structured, logged, contextual
try {
  await processTransaction(transaction);
} catch (error) {
  logger.error('Transaction processing failed', {
    transactionId: transaction.id,
    organizationId: transaction.organizationId,
    error: error.message,
  });
  throw new InvestigationServiceError(
    'TRANSACTION_PROCESSING_FAILED',
    'Unable to process this transaction. The audit team has been notified.',
    { transactionId: transaction.id }
  );
}
```

---

## 6. Frontend Rules

## Technology Stack

Audit Mesh intentionally uses a simple and maintainable architecture suitable for a college major project while remaining production-inspired.

### Frontend

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- Framer Motion
- Recharts
- React Flow

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB Atlas
- Mongoose

### AI Service

- Python
- FastAPI
- pandas
- NumPy
- scikit-learn

### Authentication

- JWT
- bcrypt
- Role-Based Access Control

The project intentionally avoids unnecessary enterprise infrastructure unless explicitly required.

When choosing between two technologies, always prefer the simpler option that satisfies the business requirement.

---

### 6.1 Frontend Implementation Rules

### 6.2 Design Token Enforcement

All visual values must come from CSS Custom Properties. **Never hardcode colors, spacing, or typography.**

```css
/* ✅ Design Tokens — defined in globals.css */
:root {
  /* Canvas & Surfaces */
  --color-canvas:          #0a0a0a;
  --color-surface:         #141414;
  --color-surface-raised:  #1c1c1c;
  --color-border:          #1e1e1e;
  --color-border-hover:    #2a2a2a;

  /* Text */
  --color-text-primary:    #ffffff;
  --color-text-secondary:  #a7a7a7;
  --color-text-muted:      #71717a;

  /* Accent */
  --color-accent:          #6798ff;
  --color-accent-hover:    #82abff;

  /* Semantic Risk Colors */
  --color-risk-critical:   #ef4444;
  --color-risk-high:       #f97316;
  --color-risk-medium:     #f59e0b;
  --color-risk-low:        #10b981;
  --color-risk-none:       #71717a;

  /* Typography */
  --font-sans:             'Inter', system-ui, sans-serif;
  --font-mono:             'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing (8px base) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

### 6.3 Component Architecture

Every component must follow this structure:

```typescript
// components/investigations/InvestigationCard.tsx

import type { IInvestigation } from '@audit-mesh/types';
import { RiskBadge } from '@/components/shared/RiskBadge';
import { AuditTimestamp } from '@/components/shared/AuditTimestamp';

interface InvestigationCardProps {
  investigation: IInvestigation;
  onOpen: (id: string) => void;
}

/**
 * InvestigationCard — displays a single investigation summary.
 * Answers: "What is flagged, why does it matter, and what should I do?"
 * Used in: Investigation List, Dashboard Critical Attention section.
 */
export function InvestigationCard({ investigation, onOpen }: InvestigationCardProps) {
  return (
    <article
      className="investigation-card"
      aria-label={`Investigation ${investigation.referenceId}: ${investigation.title}`}
    >
      {/* Primary: What is this? */}
      <header className="investigation-card__header">
        <span className="investigation-card__ref" aria-label="Reference ID">
          {investigation.referenceId}
        </span>
        <RiskBadge level={investigation.riskLevel} />
      </header>

      {/* Secondary: Why does it matter? */}
      <div className="investigation-card__body">
        <h3 className="investigation-card__title">{investigation.title}</h3>
        <p className="investigation-card__summary">{investigation.summary}</p>
      </div>

      {/* Supporting: What should I do? */}
      <footer className="investigation-card__footer">
        <AuditTimestamp date={investigation.flaggedAt} />
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={() => onOpen(investigation.id)}
          aria-label={`Open investigation ${investigation.referenceId}`}
        >
          Review Evidence
        </button>
      </footer>
    </article>
  );
}
```

### 6.4 Mandatory Screen States

Every feature must implement ALL of these states:

| State | Requirement |
|---|---|
| **Loading** | Skeleton loaders matching content layout. Never show spinners alone. |
| **Empty** | Explain WHY it is empty. Suggest the next action. Never show "No Data". |
| **Error** | Explain what happened, why, how to fix it, and the next step. Never show error codes. |
| **Success** | Confirm the action clearly. Communicate the next recommended step. |
| **Partial / Stale** | If data is older than 24h, show a stale warning with refresh option. |

```typescript
// components/shared/EmptyState.tsx — Required structure

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;          // "No Investigations Found"
  description: string;   // "All transactions are within normal parameters..."
  action?: {
    label: string;        // "Run Audit Now"
    onClick: () => void;
  };
}
```

### 6.5 Accessibility Requirements

- All interactive elements must have a visible focus indicator (minimum 2px offset ring in `--color-accent`).
- All images and icons must have `aria-label` or `alt` text.
- Tables must use proper `<th>`, `<caption>`, and `scope` attributes.
- All form inputs must be associated with `<label>` elements.
- Modal dialogs must trap focus and close on `Escape` key.
- Navigation must be fully operable by keyboard alone.
- Minimum contrast ratio: **4.5:1** for normal text, **3:1** for large text.
- Never rely on color alone to communicate risk — always pair with text labels and icons.

### 6.6 Risk Badges

Risk levels are displayed with `RiskBadge`. This component exists once and is reused everywhere.

```typescript
// components/shared/RiskBadge.tsx
type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; icon: string }> = {
  CRITICAL: { label: 'Critical', color: 'var(--color-risk-critical)', icon: '⚠' },
  HIGH:     { label: 'High',     color: 'var(--color-risk-high)',     icon: '↑' },
  MEDIUM:   { label: 'Medium',   color: 'var(--color-risk-medium)',   icon: '~' },
  LOW:      { label: 'Low',      color: 'var(--color-risk-low)',      icon: '↓' },
  NONE:     { label: 'Clear',    color: 'var(--color-risk-none)',     icon: '✓' },
};
```

**Never create a second RiskBadge component. Never hardcode risk colors.**

### 6.7 Navigation Model

Navigation must reflect the user's investigation mental model:

```
Organization Context
    ├── Dashboard (Executive Command Center — "What needs attention?")
    ├── Investigations (Heart of the product — "Why was this flagged?")
    ├── Transactions (Raw evidence — drill-down from investigations)
    ├── Vendors (Intelligence profiles — "Can I trust this vendor?")
    ├── Employees (Behavioral profiles — "Is behavior normal?")
    ├── Departments (Aggregate view — "Which department has anomalies?")
    ├── Graph Intelligence ("How are these entities connected?")
    ├── Timeline ("What happened?")
    ├── Reports ("What changed?")
    ├── AI Assistant (Investigation tool — "Help me understand this finding")
    └── Settings (Organization, Users, Security, Audit Log)
```

**Navigation items are not pages. They are investigation tools.**

---

## 7. Backend Rules

### 7.1 Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| Runtime | Node.js LTS | |
| Framework | Express.js | Simple, maintainable REST API framework |
| Language | TypeScript (strict) | |
| ODM | Mongoose | Schema-based MongoDB document modeling |
| Database | MongoDB Atlas | Cloud-hosted, no SQL migration overhead |
| Validation | Zod | All request bodies validated before business logic |
| Auth | JWT + bcrypt | Stateless tokens, bcrypt for password hashing |
| Logging | Morgan / console (structured) | Lightweight structured logging |

### 7.2 Controller → Service → Model Pattern

All backend code follows this three-layer pattern. Business logic belongs in services. Mongoose queries belong in services or models. No logic in route files or controllers beyond parsing and responding.

```
# Request flow:
Route (routes/) → Controller (controllers/) → Service (services/) → Model (models/)

# Example: Create investigation
POST /api/v1/investigations
  → investigations.routes.ts       # maps URL to controller
  → investigations.controller.ts   # validates body, calls service, sends response
  → investigations.service.ts      # applies business logic, calls mongoose model
  → Investigation.model.ts         # Mongoose schema and query methods
```

### 7.3 API Design Standards

**Base URL**: `/api/v1/`

**Resource naming**: Plural nouns only. No verbs in URLs.

```
# ✅ Correct
GET    /api/v1/investigations
GET    /api/v1/investigations/:id
POST   /api/v1/investigations
PATCH  /api/v1/investigations/:id
DELETE /api/v1/investigations/:id

GET    /api/v1/investigations/:id/evidence
GET    /api/v1/investigations/:id/timeline
POST   /api/v1/investigations/:id/notes

# ❌ Wrong
GET  /api/v1/getInvestigation
POST /api/v1/createNewInvestigation
POST /api/v1/addNoteToInvestigation
```

**All API responses follow this standard envelope**:

```typescript
// Success
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 148,
    "requestId": "req_9a8f7d"
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "INVESTIGATION_NOT_FOUND",
    "message": "No investigation with ID inv_8821 exists in your organization.",
    "hint": "Check the investigation ID and ensure you have access to this organization.",
    "requestId": "req_9a8f7d"
  }
}
```

### 7.4 Validation Rules

- **All** request bodies are validated with Zod before reaching business logic.
- **All** query parameters are typed and validated.
- **All** path parameters are validated (MongoDB ObjectIds or string IDs).
- Validation errors return `400 Bad Request` with field-level error messages.
- **Never** trust client input. Sanitize all string inputs.

```typescript
// validators/investigations.validator.ts
export const createInvestigationSchema = z.object({
  title: z.string().min(10).max(255),
  transactionId: z.string().min(1),
  riskLevel: z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']),
  summary: z.string().min(20).max(2000),
  assignedAuditorId: z.string().optional(),
});
```

### 7.5 Pagination Standard

All list endpoints must support pagination. This is mandatory.

```typescript
// Mandatory query parameters for all list endpoints
interface PaginationQuery {
  page?: number;       // Default: 1
  limit?: number;      // Default: 20, Max: 100
  sortBy?: string;     // Field name
  sortOrder?: 'asc' | 'desc';  // Default: 'desc'
  search?: string;     // Full-text search
}
```

### 7.6 Logging Standards

Every significant business event must be logged. Use structured console logging in development and a lightweight logger in production.

```typescript
// Required fields for business event logs
console.log(JSON.stringify({
  event: 'INVESTIGATION_CREATED',
  organizationId: req.user.organizationId,
  userId: req.user.id,
  investigationId: investigation._id,
  riskLevel: investigation.riskLevel,
  triggeredBy: 'DUPLICATE_INVOICE_RULE',
  timestamp: new Date().toISOString(),
}));
```

---

## 8. Database Rules

**Database**: MongoDB Atlas. **ODM**: Mongoose. No SQL. No migrations. No joins.

### 8.1 Collections

| Collection | Mongoose Model | Purpose |
|---|---|---|
| `users` | `User` | Authentication and profile |
| `organizations` | `Organization` | Multi-tenant company accounts |
| `transactions` | `Transaction` | Financial transaction records |
| `vendors` | `Vendor` | Vendor profiles and intelligence |
| `employees` | `Employee` | Employee behavioral profiles |
| `investigations` | `Investigation` | Investigation workspaces |
| `reports` | `Report` | Generated audit reports |
| `auditLogs` | `AuditLog` | Immutable event and audit trail |
| `settings` | `Setting` | Organization-level settings |

### 8.2 Mongoose Schema Standards

Every Mongoose schema must include these fields:

```typescript
// models/Investigation.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestigation extends Document {
  organizationId: mongoose.Types.ObjectId;
  title: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'CLOSED' | 'DISMISSED';
  summary: string;
  evidence: object[];
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvestigationSchema = new Schema<IInvestigation>({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true, index: true },
  title:          { type: String, required: true },
  riskLevel:      { type: String, enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'], required: true },
  status:         { type: String, enum: ['OPEN', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED', 'DISMISSED'], default: 'OPEN' },
  summary:        { type: String, required: true },
  evidence:       [{ type: Schema.Types.Mixed }],
  isDeleted:      { type: Boolean, default: false },
  createdBy:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const Investigation = mongoose.model<IInvestigation>('Investigation', InvestigationSchema);
```

### 8.3 Soft Delete Standard

Sensitive financial records must never be hard deleted. All financial collection schemas must include:

```typescript
isDeleted:  { type: Boolean, default: false },
deletedAt:  { type: Date },
deletedBy:  { type: Schema.Types.ObjectId, ref: 'User' },
```

**All service queries must filter `{ isDeleted: false }` by default.**

### 8.4 Multi-Tenant Isolation

All organization-scoped documents must include an `organizationId` field. Tenant isolation is enforced at the application layer:

```typescript
// Every query for organization-scoped data must include organizationId
const investigation = await Investigation.findOne({
  _id: req.params.id,
  organizationId: req.user.organizationId,  // MANDATORY — never omit this
  isDeleted: false,
});

if (!investigation) {
  return res.status(404).json({ success: false, error: 'Investigation not found.' });
}
```

**Never query organization-scoped data without including `organizationId` from the verified JWT.**

### 8.5 Index Strategy

Add Mongoose indexes for:
- All `organizationId` fields (every scoped collection)
- All fields used in frequent queries (`status`, `riskLevel`, `createdAt`)
- All fields used for pagination sorting

```typescript
// Define indexes in the schema
InvestigationSchema.index({ organizationId: 1, status: 1 });
InvestigationSchema.index({ organizationId: 1, createdAt: -1 });
```

---

## 9. AI & ML Rules

### 9.1 Core Principle — AI Never Decides

**AI is an investigation assistant. Humans make all final decisions.**

```
AI Role:    Detect patterns, explain findings, recommend next steps
Human Role: Review evidence, make judgments, approve actions, sign off reports
```

### 9.2 Every AI Finding Must Include

No AI output may be displayed to a user without all of these fields:

| Field | Required | Description |
|---|---|---|
| `finding` | ✅ | What was detected, in plain English |
| `evidence` | ✅ | Specific data points that led to the finding |
| `rule` | ✅ | Which rule(s) or model(s) triggered |
| `confidence` | ✅ | Numeric confidence with explicit interpretation |
| `recommendation` | ✅ | Specific suggested next action for the auditor |
| `relatedEntities` | ✅ | Vendors, employees, transactions linked to this finding |

### 9.3 Forbidden AI Outputs

```
❌ "Fraud Detected — Risk Score: 94"

❌ "AI has flagged this vendor as suspicious."

❌ "High risk detected."
```

### 9.4 Required AI Output Format

```typescript
interface AIFinding {
  id: string;
  investigationId: string;
  finding: string;         // "Invoice #INV-9921 appears to be a duplicate of #INV-8847"
  evidence: AIEvidence[];  // Specific data references
  rulesTriggered: string[];// ["DUPLICATE_INVOICE_RULE", "SPLIT_PURCHASE_DETECTOR"]
  mlModels: string[];      // ["invoice_similarity_v2", "vendor_risk_classifier"]
  confidence: {
    score: number;         // 0-100
    interpretation: string; // "High confidence: 8 out of 10 duplicate indicators match"
  };
  graphRelationships: string[];  // Entity IDs from graph
  recommendation: string;  // "Compare both invoices and contact vendor for explanation"
  requiresHumanReview: true;     // Always true — AI never finalizes
}
```

### 9.5 ML Model Documentation Requirements

Every model used in production must be documented in `/docs/ai/`:

```markdown
# Model: invoice_similarity_v2

**Purpose**: Detect potentially duplicate invoices by comparing structural features.
**Training Data**: [describe without exposing PII]
**Features Used**: invoice_number_similarity, amount_match, vendor_id_match, date_proximity, line_item_similarity
**Output**: similarity_score (0.0–1.0), confidence, matched_invoice_id
**Threshold for Flagging**: similarity_score > 0.85
**Known Limitations**: High false positive rate for recurring monthly invoices from same vendor. Mitigated by date window exclusion.
**Last Evaluated**: [date]
**Evaluation Metrics**: Precision: 94.2%, Recall: 88.7%, F1: 91.3%
```

---

## 10. Investigation Rules

### 10.1 Investigations Are the Core Product

Every other module (Transactions, Vendors, Employees, Graph, Reports) exists to serve Investigations. If a feature does not strengthen the investigation workflow, it must not be built.

### 10.2 Investigation Lifecycle

```
DETECTED (System created)
    ↓
OPEN (Assigned to auditor)
    ↓
UNDER_REVIEW (Auditor is actively examining)
    ↓
PENDING_APPROVAL (Finding ready for senior sign-off)
    ↓
RESOLVED (Human decision made)
    ↓
CLOSED (Audit complete, evidence archived)
    │
    └── DISMISSED (False positive, documented reason required)
```

Every status transition must:
1. Be recorded in the `investigation_timeline` table
2. Include the `userId` who made the transition
3. Require a mandatory reason/note for `DISMISSED` and `CLOSED` statuses

### 10.3 Required Investigation Components

Every investigation workspace must display:

| Section | Required | Business Purpose |
|---|---|---|
| **Header** | ✅ | Reference ID, title, status, risk level, assignee |
| **Summary** | ✅ | Plain-English description of what was detected |
| **Evidence Panel** | ✅ | All evidence items with source and confidence |
| **Rules Triggered** | ✅ | Which detection rules fired and why |
| **ML Analysis** | ✅ | Model findings with confidence interpretation |
| **Graph Relationships** | ✅ | Entity connections relevant to this investigation |
| **Timeline** | ✅ | Chronological history of all actions |
| **Auditor Notes** | ✅ | Freeform notes with timestamp and author |
| **Recommendations** | ✅ | AI-suggested next steps |
| **Actions** | ✅ | Status transitions, assignments, escalations |

**Never display a risk score without its supporting evidence.**

### 10.4 Evidence Chain of Custody

All evidence items must maintain:
- `createdBy`: Which system or user added this evidence
- `createdAt`: Exact timestamp (UTC)
- `source`: Rule engine / ML model / manual / document upload
- `immutableHash`: SHA-256 hash of evidence content at creation time

**Evidence must never be deleted or modified after creation.**

---

## 11. Performance Rules

### 11.1 Priority Order — Correct First, Fast Second

```
1. Correctness     → Feature works as designed
2. Maintainability → Another engineer can understand and modify it
3. Performance     → Optimize only after correctness is proven
```

Never optimize prematurely.

### 11.2 Frontend Performance Rules

| Rule | Requirement |
|---|---|
| **Lazy Loading** | All routes are code-split. Heavy components are lazily imported. |
| **Virtualization** | Transaction tables and audit logs exceeding 50 rows use virtual scrolling. |
| **Memoization** | `useMemo` and `useCallback` applied to expensive computations and stable callbacks. |
| **Image Optimization** | Use standard `<img>` with explicit `width` and `height`. Avoid oversized assets. |
| **Bundle Size** | Monitor with bundle analyzer. No single chunk exceeds 250KB uncompressed. |
| **Skeleton Loaders** | All async data displays skeleton loaders with matching layout structure. |

### 11.3 Backend Performance Rules

| Rule | Requirement |
|---|---|
| **Pagination** | All list endpoints paginate. No unbounded queries. |
| **Query Optimization** | Use Mongoose `lean()` for read-only queries. Add indexes for all frequently filtered fields. |
| **N+1 Prevention** | Use Mongoose `populate()` deliberately. Avoid deeply nested populates in list endpoints. |
| **Response Time** | API endpoints must respond in `< 300ms` for simple queries, `< 1000ms` for complex aggregations. |
| **Lean Queries** | Never return entire Mongoose documents to the client — use `.select()` to return only required fields. |

---

## 12. Security Rules

### 12.1 Authentication Architecture

```
User submits credentials
    ↓
bcrypt.compare() verification (saltRounds: 12)
    ↓
Issue: access_token (JWT, HS256, 15-min TTL)
Issue: refresh_token (JWT, HS256, 7-day TTL)
    ↓
Log LOGIN_SUCCESS event
```

### 12.2 Role-Based Access Control Matrix

| Permission | SME_OWNER | FINANCE_MANAGER | INTERNAL_AUDITOR | CHARTERED_ACCOUNTANT | COMPANY_ADMIN |
|---|:---:|:---:|:---:|:---:|:---:|
| View Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Investigations | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Investigation | ❌ | ❌ | ✅ | ✅ | ✅ |
| Add Evidence | ❌ | ❌ | ✅ | ✅ | ❌ |
| Dismiss Investigation | ✅ | ❌ | ❌ | ✅ | ✅ |
| Close Investigation | ✅ | ❌ | ❌ | ✅ | ✅ |
| View Transactions | ✅ | ✅ | ✅ | ✅ | ✅ |
| Upload Transactions | ❌ | ✅ | ❌ | ❌ | ✅ |
| View Vendor Profiles | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Employee Profiles | ✅ | ❌ | ✅ | ✅ | ✅ |
| Generate Reports | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sign Off Reports | ✅ | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ❌ | ✅ |
| Manage Organization | ✅ | ❌ | ❌ | ❌ | ✅ |
| View Audit Logs | ✅ | ❌ | ✅ | ✅ | ✅ |

### 12.3 Tenant Isolation Enforcement

Every authenticated request must:
1. Validate the JWT is signed with `JWT_SECRET`
2. Extract `organizationId` from the JWT payload
3. Include `organizationId` in every MongoDB query for organization-scoped collections
4. Return `404 Not Found` (not `403`) if a document doesn't belong to the requesting organization — do not leak document existence

**Never trust organization IDs from request bodies or query parameters. Always read from the verified JWT.**

### 12.4 Input Security

| Threat | Mitigation |
|---|---|
| NoSQL Injection | Mongoose schema typing + Zod validation. Never pass raw `req.body` directly to MongoDB queries. |
| XSS | Output escaped by React. `dangerouslySetInnerHTML` is forbidden. |
| Path Traversal | Zod validation on all file name inputs. No `..` allowed in file paths. Strip non-alphanumeric characters from uploaded filenames. |
| Mass Assignment | Explicit Zod schema for every request body. Never spread unvalidated objects into Mongoose documents. |
| Prototype Pollution | Use `Object.create(null)` for dynamic objects. Validate all JSON input with Zod before use. |

### 12.5 Secrets Management

- **Never** commit secrets to version control.
- **Never** log secrets, tokens, or PII.
- All secrets are stored in `.env` files, never hardcoded.
- `.env.example` is maintained with all required keys and placeholder values.
- Required environment variables: `MONGODB_URI`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ML_SERVICE_URL`, `PORT`.

### 12.6 Security Audit Logging

Every authentication and significant investigation event is recorded in the `auditLogs` MongoDB collection:

```
LOGIN_SUCCESS
LOGIN_FAILURE
LOGOUT
PASSWORD_RESET_REQUEST
PASSWORD_RESET_SUCCESS
PERMISSION_DENIED
INVESTIGATION_ACCESSED
INVESTIGATION_STATUS_CHANGED
REPORT_GENERATED
EVIDENCE_ADDED
```

Audit logs must never be deleted. The `AuditLog` Mongoose model must not expose any delete route in the API.

---

## 13. Documentation Rules

### 13.1 Documentation is Not Optional

Every code change that affects behavior must be accompanied by a documentation update. PRs that introduce functionality without updating documentation are rejected.

### 13.2 Documentation Structure

| Document Type | Location | Update Trigger |
|---|---|---|
| Feature Specification | `/docs/features/{feature}.md` | New feature or significant update |
| API Reference | `/docs/api/{module}.md` | New or changed endpoint |
| Database Schema | `/docs/database/{collection}.md` | Schema change |
| AI Model Notes | `/docs/ai/{model}.md` | New model or algorithm |
| Changelog | `CHANGELOG.md` | Every meaningful release |

### 13.3 Decision Logging

For significant technical decisions, add a brief note in the relevant feature doc or `CHANGELOG.md`. Full formal ADRs are not required.

```markdown
## Decision: Use bcrypt for Password Hashing
**Context**: Simple, well-understood, widely supported. Adequate for this project's threat model.
**Chosen**: bcrypt with saltRounds: 12.
**Rationale**: Simpler than Argon2id with sufficient security for a college-scale SME platform. Avoids native binary dependency issues in deployment.
```

---

## 14. Git Rules

### 14.1 Branch Strategy

```
main                    # Production — protected. Direct push forbidden.
├── develop             # Integration — requires PR + review
│   ├── feat/auth-login-screen
│   ├── feat/investigation-evidence-panel
│   ├── fix/vendor-risk-score-calculation
│   ├── refactor/investigation-service-split
│   └── docs/update-api-reference
```

### 14.2 Commit Message Format

```
<type>(<scope>): <subject>

[optional body]
[optional footer]
```

| Type | When to Use |
|---|---|
| `feat` | New feature or functionality |
| `fix` | Bug fix |
| `refactor` | Code change that is neither a fix nor feature |
| `docs` | Documentation changes only |
| `test` | Adding or updating tests |
| `chore` | Build tooling, dependency updates |
| `perf` | Performance improvement |
| `security` | Security fix |

**Examples:**
```
feat(investigations): add evidence panel with confidence display
fix(auth): prevent session token reuse after logout
docs(api): update investigation endpoints with pagination params
security(auth): enforce TOTP for INTERNAL_AUDITOR role
```

### 14.3 Commit Rules

- ✅ One logical change per commit (atomic commits)
- ✅ Commit message explains the **why**, not just the what
- ❌ No commits with message "fix", "update", "wip", "temp"
- ❌ No unrelated changes bundled into a single commit
- ❌ No dead code committed (remove it, don't comment it out)
- ❌ No console.log in committed code
- ❌ No `.env` or secrets in any commit

---

## 15. Testing Rules

### 15.1 Test Coverage Requirements

| Layer | Minimum Coverage | Test Type |
|---|---|---|
| Business Logic (Services) | 90% | Unit tests |
| API Endpoints | 100% of endpoints | Integration tests |
| React Components | 80% | Component tests |
| Risk Detection Rules | 100% of rules | Unit tests + scenarios |
| Authentication Flows | 100% | Integration tests |
| UI Screen States | 100% of states | Component tests |

### 15.2 Test Categories and Standards

**Unit Tests** (Services, Utilities, Validators):
```typescript
// investigations.service.test.ts

describe('InvestigationService', () => {
  describe('createFromRule', () => {
    it('creates investigation with CRITICAL risk level when duplicate invoice detected', async () => { ... });
    it('assigns to default auditor when no specific auditor is available', async () => { ... });
    it('generates reference ID in format INV-{YYYY}-{sequence}', async () => { ... });
    it('throws InvestigationServiceError when transaction does not belong to organization', async () => { ... });
  });
});
```

**Integration Tests** (API Endpoints):
```typescript
// investigations.api.test.ts

describe('POST /api/v1/investigations', () => {
  it('returns 201 with created investigation for INTERNAL_AUDITOR role', async () => { ... });
  it('returns 403 for FINANCE_MANAGER role', async () => { ... });
  it('returns 400 with field-level errors for invalid payload', async () => { ... });
  it('returns 401 for unauthenticated requests', async () => { ... });
  it('enforces tenant isolation — cannot access investigation from another org', async () => { ... });
});
```

**Component Tests** (UI Components):
```typescript
// InvestigationCard.test.tsx

describe('InvestigationCard', () => {
  it('renders investigation reference ID prominently', () => { ... });
  it('displays RiskBadge with correct level and label', () => { ... });
  it('shows "Review Evidence" button label, not generic "View"', () => { ... });
  it('button is keyboard accessible and fires onOpen callback', () => { ... });
  it('renders correctly with all required ARIA attributes', () => { ... });
});
```

### 15.3 Mandatory Manual QA Checklist

Before marking any feature complete, manually verify:

- [ ] All loading states display correctly with proper skeleton layouts
- [ ] Empty state explains WHY and provides next action
- [ ] Error state explains what happened, why, and how to fix it
- [ ] All interactive elements are reachable and operable by keyboard
- [ ] Risk badges display correct color and label for each risk level
- [ ] Numbers are correctly formatted (currency, dates, percentages)
- [ ] Feature works correctly at 1280px, 1440px, and 1920px widths
- [ ] No console errors in production mode
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint errors (`eslint .` passes)

---

## 16. Definition of Done

**A feature is NOT complete until every item below is checked.**

### Technical Completion
- [ ] Business goal stated in feature spec is satisfied
- [ ] All screen states implemented: loading, empty, error, success
- [ ] All interactive states implemented: idle, hover, focus, active, disabled
- [ ] Keyboard navigation works on all interactive elements
- [ ] ARIA attributes are present and correct
- [ ] Color contrast meets WCAG AA minimum
- [ ] No console errors in production mode
- [ ] No TypeScript errors (`tsc --noEmit` passes)
- [ ] No ESLint errors or warnings
- [ ] No duplicated components, services, or database tables

### Testing Completion
- [ ] Unit tests pass with required coverage
- [ ] Integration tests pass for all API endpoints
- [ ] Component tests pass for all UI components
- [ ] Regression tests pass — no existing functionality broken
- [ ] Manual QA checklist verified

### Security Completion
- [ ] RBAC permissions verified for all roles
- [ ] Tenant isolation enforced and tested
- [ ] Input validation applied to all user inputs
- [ ] No secrets in code or configuration files

### Documentation Completion
- [ ] Feature specification created or updated in `/docs/features/`
- [ ] API documentation updated if endpoints changed
- [ ] Database documentation updated if schema changed
- [ ] ADR created if an architectural decision was made
- [ ] `CHANGELOG.md` updated with feature entry

### Product Completion
- [ ] Design matches `DESIGN_PHILOSOPHY.md` standards
- [ ] UI uses correct design tokens (no hardcoded colors or spacing)
- [ ] Buttons use action-oriented labels (not "Submit", "Continue")
- [ ] AI findings include evidence, rules, confidence, and recommendations
- [ ] Empty states are helpful, not blank
- [ ] Error messages are explanatory, not technical

---

## 17. Forbidden Practices

The following are **absolutely prohibited** in the Audit Mesh codebase. Violations will be flagged and reverted.

### Architecture
- ❌ **Rewriting entire modules** without documented justification and explicit user approval
- ❌ **Duplicating components** — if a component exists, extend it or use it
- ❌ **Duplicating API endpoints** — if an endpoint exists, reuse it
- ❌ **Duplicating database tables** — normalize before creating new tables
- ❌ **Monolithic service files** — if a service exceeds 300 lines, split it
- ❌ **Circular dependencies** between modules

### Code Quality
- ❌ `any` type in TypeScript without documented exception
- ❌ `@ts-ignore` without a comment explaining why
- ❌ Magic numbers (use named constants)
- ❌ Commented-out code committed to any branch
- ❌ `console.log` statements in committed code
- ❌ `dangerouslySetInnerHTML` in React components
- ❌ Inline styles (except dynamically computed CSS Custom Property values)
- ❌ Hardcoded colors, spacing values, or font sizes

### Product
- ❌ **AI making final decisions** — AI suggests, humans decide, always
- ❌ **Unexplained risk scores** — every score requires evidence display
- ❌ **Decorative charts** — every chart must answer a specific business question
- ❌ **Fake data in production code** — development seeds only, never in production paths
- ❌ **ChatGPT-style AI responses** — always reference evidence and rules
- ❌ **Generic "No Data" empty states** — always explain and suggest next action
- ❌ **Generic error messages** — always explain what happened, why, and how to fix

### Security
- ❌ **Hardcoded secrets** in any file
- ❌ **Raw SQL string concatenation** — use parameterized queries only
- ❌ **Trusting organization IDs from request bodies** — extract from verified JWT only
- ❌ **Skipping input validation** on any user-submitted data
- ❌ **Logging PII** (emails, names, account numbers) in application logs
- ❌ **Disabling CSRF protection** for convenience

### Documentation
- ❌ **Leaving documentation outdated** after a code change
- ❌ **Undocumented architectural decisions**
- ❌ **Merging without updating CHANGELOG.md**

---

## 18. Decision Checklist

**Before implementing any feature, component, API, or database change, answer every question. If any answer is NO, redesign.**

### Product Questions
- [ ] Why does this feature exist? *(write the answer in one sentence)*
- [ ] Which specific user role needs this, and when?
- [ ] What single business question does this answer?
- [ ] Which investigation workflow does this serve?
- [ ] Can an existing component or endpoint solve this?
- [ ] Does this improve the investigation process?
- [ ] Does this increase trust and explainability?
- [ ] Would a finance team understand this in under 10 seconds?
- [ ] Would an auditor trust this to make a business decision?

### Engineering Questions
- [ ] Does a similar implementation already exist in the codebase?
- [ ] Have I checked if an existing component can be extended instead of replaced?
- [ ] Will this change break any adjacent workflow?
- [ ] Will another engineer understand this code in 6 months without asking questions?
- [ ] Are there security implications I have addressed?
- [ ] Are there performance implications I have measured or mitigated?
- [ ] Does this require a database migration? Is a rollback strategy defined?
- [ ] Is documentation affected? Have I updated it?

### Design Questions
- [ ] Does this design follow `DESIGN_PHILOSOPHY.md` standards?
- [ ] Does every interactive element have a keyboard-accessible implementation?
- [ ] Are loading, empty, and error states designed?
- [ ] Are buttons labeled with actions, not generic verbs?
- [ ] Does color communicate meaning, not decoration?

---

## 19. Completion Checklist

**Before closing any task, run through this checklist completely.**

```
TRIAD VERIFICATION GATE
[ ] GSD: Must-haves validated with proof artifact (/verify)
[ ] Ralph Loop: Test execution converged with 0 failures, zero build/type errors
[ ] CodeRabbit: Pre-commit code review passed (.coderabbit.yaml guidelines satisfied)

TECHNICAL
[ ] Build passes (next build / tsc --noEmit)
[ ] Tests pass (unit, integration, component)
[ ] No console errors in production mode
[ ] No TypeScript errors (zero `any` types)
[ ] No ESLint errors
[ ] No duplicated code introduced

PRODUCT
[ ] Business goal from feature spec is satisfied
[ ] UI matches DESIGN_PHILOSOPHY.md standards
[ ] All screen states implemented (loading, empty, error, success)
[ ] Buttons use action-oriented labels
[ ] AI findings include all required fields

SECURITY
[ ] RBAC enforced correctly
[ ] Tenant isolation verified
[ ] Input validation applied
[ ] No secrets in code

PERFORMANCE
[ ] List endpoints use pagination
[ ] No N+1 queries introduced
[ ] Heavy components lazy-loaded

DOCUMENTATION
[ ] Feature documentation updated
[ ] API documentation updated (if applicable)
[ ] Database documentation updated (if applicable)
[ ] ADR created (if architectural decision was made)
[ ] CHANGELOG.md updated
```

---

## 20. Golden Rule

> **Never optimize for writing more code.**
>
> Optimize for building a product that a real SME Finance team would pay for, trust their audit process to, and rely on for regulatory compliance.

**Prefer 5 exceptional investigation workflows over 50 average features.**

**Complexity should live in the backend. Simplicity should live in the interface.**

**Think like a long-term product engineering team. Not a hackathon participant.**

Every line of code in Audit Mesh should exist to answer one of these questions for a real financial professional:

> *"What needs my attention?"*
> *"Why was this flagged?"*
> *"Can I trust this vendor?"*
> *"What happened?"*
> *"How are these entities connected?"*

If a line of code does not serve these questions, it has no place in this repository.

---

## Product Identity

Audit Mesh is NOT a fraud detector.

Audit Mesh is NOT an anomaly dashboard.

Audit Mesh is NOT an accounting software.

Audit Mesh specializes in discovering hidden financial behaviour that appears legitimate at the transaction level but becomes suspicious when viewed across time, people, vendors, departments, and relationships.

Every feature should help answer one of these questions:

- Is this behavior becoming a pattern?
- Has this vendor slowly become unusually dominant?
- Is an employee repeatedly approving similar vendors?
- Are multiple low-risk events combining into a high-risk pattern?
- Has financial behavior changed over time?

If a feature does not help reveal hidden patterns, improve investigations, or explain suspicious behaviour, it should not be implemented.

---

*Audit Mesh AGENTS.md — Version 2.0*
*This document supersedes all previous operating instructions.*
*All changes to this document require explicit user approval and must be versioned.*
*All AI agents must read this before implementing any detection or ML logic.*
