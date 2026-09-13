# Audit Mesh — Execution Roadmap (ROADMAP.md)

## Milestone 1: Core Engine & Investigation MVP

### Phase 1: Foundation & Project Scaffolding (Current)
- [x] Governance & Pattern registry update (added patterns 11, 12, 13)
- [x] GSD baseline setup (`SPEC.md`, `ROADMAP.md`, `STATE.md`)
- [ ] Decoupled service scaffolding:
  - `backend/` with Express + TypeScript + Strict configs + Pluggable Rule Registry interface
  - `python-ml/` with FastAPI + requirements + Benford & Isolation Forest routers
  - `frontend/` with Vite + React + TypeScript + Design token styling + Layout shell
- **Verification Gate**: `tsc --noEmit` clean on backend/frontend; python health endpoint responds.

### Phase 2: Domain Schema, Synthetic Data Generator & Seeder
- [ ] Mongoose models (`Transaction`, `Vendor`, `Employee`, `Investigation`, `AuditLog`)
- [ ] Synthetic benchmark dataset generator implementing all 13 micro-corruption patterns (1,500+ records)
- [ ] Database seeder script with idempotent execution
- **Verification Gate**: Seeder runs without error; database contains correctly labeled baseline and corrupt records.

### Phase 3: Detection Engines (Backend Rules & Python ML)
- [ ] Pluggable deterministic rule detectors in backend (Splitting, Duplicates, Off-Hours, Shared Accounts, Cross-Approvals)
- [ ] Statistical and ML endpoints in `python-ml/` (Benford's Law Chi-Square, Isolation Forest anomaly scoring, Linear trend slope)
- [ ] Detection coordinator & explainability payload builder
- **Verification Gate**: Unit and integration tests verify each rule flags the synthetic corrupt records with >95% precision.

### Phase 4: Ingestion Pipeline & Investigation API
- [ ] CSV/JSON transaction upload and validation endpoint with Zod schema verification
- [ ] Investigation lifecycle state machine (`NEW` → `UNDER_REVIEW` → `RESOLVED`)
- [ ] Audit trail logging for all user actions
- **Verification Gate**: Uploading a new batch creates transactions, triggers detection, and generates investigations.

### Phase 5: Enterprise Frontend Workspace
- [ ] Design token implementation in `src/index.css` & `tailwind.config.ts`
- [ ] AppShell with Sidebar, Top Navigation, and Command Palette
- [ ] Dashboard Page with KPI metrics, Risk Distribution, and Recent Alerts
- [ ] Investigation Workspace: List, Filter, and Detail View with side-by-side Evidence Panel
- **Verification Gate**: Visual verification of dark mode theme, responsiveness, and zero TypeScript errors.

### Phase 6: Entity Graph & Timeline Intelligence
- [ ] Interactive Entity Graph using React Flow (`@xyflow/react`) mapping Employee ↔ Vendor ↔ Bank Account
- [ ] Chronological Investigation Timeline with visual badges for off-hours and sequential bursts
- [ ] Benford's Law distribution visualizer (Recharts)
- **Verification Gate**: Graph dynamically renders relationships for selected investigations with node drill-down.

### Phase 7: Defensible Audit Reports & End-to-End Verification
- [ ] Audit Dossier generation (printable/exportable report format with auditor sign-off notes)
- [ ] End-to-End user flow test from CSV upload to signed report
- [ ] Final verification against `.coderabbit.yaml` and constitutional requirements in `AGENTS.md`
- **Verification Gate**: Complete user walkthrough passing all success criteria.
