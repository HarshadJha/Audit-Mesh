# Audit Mesh

### AI-Powered Micro-Corruption Investigation Platform for SMEs

Audit Mesh is an intelligent financial investigation platform designed to help Small and Medium Enterprises (SMEs) uncover hidden patterns of micro-corruption that often go unnoticed during traditional audits.

Unlike conventional fraud detection systems that focus on identifying isolated suspicious transactions, Audit Mesh analyzes relationships, behavioral trends, approval patterns, vendor interactions, and historical financial activities to reveal suspicious patterns that emerge only when multiple seemingly legitimate transactions are viewed together.

The platform assists finance teams by providing explainable AI insights, investigation workflows, visual relationship mapping, and evidence-backed reports — while ensuring that humans remain the final decision makers.

---

## The Problem

Most SMEs rely on manual audits or simple accounting software that primarily detects:

- Duplicate invoices
- Incorrect calculations
- Missing entries
- Obvious fraud

However, financial losses often occur through **micro-corruption** rather than large fraudulent transactions.

Examples include:

- Purchase splitting to avoid approval thresholds
- Vendor favoritism
- Repeated low-value suspicious expenses
- Circular employee-vendor relationships
- Approval misuse
- Recurring payments with subtle variations
- Long-term behavioral changes
- Repeated policy violations

Each transaction appears legitimate. **The hidden pattern tells the real story.**

These patterns are extremely difficult to identify manually.

---

## Our Solution

Audit Mesh continuously analyzes financial records to discover hidden behavioral patterns rather than isolated anomalies.

Instead of asking *"Is this transaction fraudulent?"* — Audit Mesh asks:

- Is this behavior becoming a pattern?
- Why is this vendor repeatedly selected?
- Has employee spending behavior changed?
- Are approvals following unusual trends?
- Is a department gradually increasing suspicious purchases?
- Do multiple low-risk events combine into a high-risk investigation?

The platform helps investigators connect evidence across transactions, vendors, employees, departments, and time.

---

## Key Features

### Executive Dashboard
A command center providing:
- Investigation summary
- Risk overview
- Weekly & monthly trends
- Pending investigations
- Recent alerts
- Investigation activity timeline
- Organization health overview

### Smart Transaction Upload
Supports CSV and Excel (`.xlsx`) with:
- Automatic column mapping
- Data validation
- Upload history
- Processing status
- Error reporting

### Hybrid Detection Engine
Audit Mesh combines deterministic rules with machine learning.

**Rule-Based Detection**
- Duplicate invoices
- Purchase splitting
- Approval threshold evasion
- Tax mismatch
- Vendor concentration
- Round amount detection
- Weekend / off-hours transactions
- Sequential invoice analysis

**Machine Learning** (Python service)
- Isolation Forest
- Benford's Law
- Statistical outlier detection
- Behavioral trend analysis

### Investigation Workspace
Every finding becomes an investigation rather than a simple alert. Each investigation includes:
- Investigation summary
- Evidence
- Rules triggered
- AI explanation
- Confidence score
- Timeline
- Related vendors, employees, and transactions
- Auditor notes
- Investigation status

### Vendor Intelligence
Dedicated profile for every vendor:
- Total payments
- Number of transactions
- Departments served
- Connected employees
- Risk history
- Payment trends
- Duplicate invoice history
- Vendor timeline
- Related investigations

### Employee Intelligence
Behavioral analysis for every employee:
- Spending behavior
- Vendor relationships
- Approval history
- Risk trends
- Department comparison
- Investigation history
- Behavioral changes over time

### Financial Timeline
Chronological view of organizational activity. Filter by daily, weekly, monthly, or custom date ranges.

Timeline highlights:
- New investigations
- Risk spikes
- Vendor changes
- Policy violations
- Employee activity

### Relationship Graph
Interactive graph visualization showing connections between employees, vendors, transactions, investigations, and departments.

The graph helps identify:
- Hidden relationships
- Repeated interactions
- Vendor favoritism
- Investigation clusters
- Behavioral networks

### AI Investigation Assistant
Provides explainable recommendations:
- Why was this investigation created?
- Which rules were triggered?
- Which transactions contributed?
- Which vendors are connected?
- Recommended next investigation steps

> The AI never makes final decisions. It assists human investigators.

### Reports
Generate investigation, weekly, monthly, vendor, employee, and organization summary reports.

Export formats: **PDF** and **CSV**

---

## How Audit Mesh Works

```
Upload Financial Data
        │
        ▼
Data Validation
        │
        ▼
Rule Engine
        │
        ▼
Machine Learning Analysis
        │
        ▼
Pattern Detection
        │
        ▼
Investigation Creation
        │
        ▼
Evidence Collection
        │
        ▼
Human Review
        │
        ▼
Report Generation
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Vite, TypeScript, React Router, Tailwind CSS, Framer Motion, Recharts, React Flow |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB Atlas, Mongoose |
| **AI Service** | Python, FastAPI, Pandas, NumPy, Scikit-learn |
| **Algorithms** | Isolation Forest, Benford's Law, Rule-Based Detection |
| **Authentication** | JWT, bcrypt, Role-Based Access Control (RBAC) |

---

## Project Structure

```
audit-mesh/
│
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express REST API
├── python-ml/         # Python FastAPI ML service
├── docs/              # Feature and API documentation
│
├── AGENTS.md
├── PRODUCT_THINKING.md
├── DESIGN_PHILOSOPHY.md
├── DECISION_FRAMEWORK.md
└── README.md
```

---

## What Makes Audit Mesh Different?

Most financial tools analyze transactions individually. Audit Mesh analyzes **financial behavior over time**.

| Traditional Systems | Audit Mesh |
|---|---|
| "Is this transaction suspicious?" | "Does this transaction contribute to a larger behavioral pattern?" |
| Isolated anomaly detection | Pattern discovery across time and entities |
| Single-transaction alerts | Investigation workspaces with evidence chains |
| Rule-only engines | Hybrid rule + ML detection |
| Generic reports | Explainable, evidence-backed audit reports |

By connecting financial events across different entities and time periods, Audit Mesh uncovers hidden micro-corruption patterns that traditional auditing methods often miss.

---

## Design Principles

Audit Mesh follows four core principles:

1. **Investigation First** — Every finding becomes a structured investigation, not just an alert
2. **Explainable AI** — Every AI output includes what was detected, why, and what evidence supports it
3. **Human Decision Making** — AI recommends; humans decide and sign off
4. **Enterprise Simplicity** — Powerful investigation capability without overwhelming complexity

The interface is designed to reduce cognitive load and guide users through investigations instead of overwhelming them with dashboards and metrics.

---

## Current Scope

### Included
- CSV / Excel Upload
- Financial Transaction Analysis
- Rule-Based Detection
- Machine Learning Risk Detection
- Investigation Workspace
- Vendor Intelligence
- Employee Intelligence
- Timeline Analysis
- Relationship Graph
- AI Investigation Assistant
- PDF Reports

### Future Enhancements
- ERP Integration (Tally, Zoho Books, QuickBooks)
- OCR Invoice Analysis
- Email Alerts
- Real-Time Monitoring
- Predictive Risk Forecasting
- Mobile Application

### Limitations
- Current version uses uploaded financial datasets
- Does not directly connect to ERP systems
- Uses synthetic / demo datasets for demonstration
- AI provides recommendations only — human approval is mandatory before any action

---

## Future Vision

Audit Mesh aims to become an intelligent financial investigation platform that enables SMEs to identify hidden micro-corruption patterns before they escalate into significant financial losses.

Rather than replacing auditors, Audit Mesh empowers finance teams with explainable insights, behavioral analysis, and evidence-backed investigations — making financial governance more transparent, efficient, and trustworthy.

---

## License

This project has been developed as a **B.Tech Major Project** for academic purposes. The architecture, workflows, and documentation are inspired by modern enterprise software engineering practices while keeping the implementation practical and maintainable.


*All AI agents must read this before implementing any detection or ML logic.*