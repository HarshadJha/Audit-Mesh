# Audit Mesh — System Specification (SPEC.md)

## 1. Executive Summary
Audit Mesh is an enterprise-grade financial investigation platform designed for SMEs to continuously monitor transactions, uncover subtle micro-corruption patterns (invoice splitting, duplicate billing, shell vendors, kickback rings), and provide explainable, human-in-the-loop audit dossiers.

## 2. Architecture & Service Boundaries
The system is partitioned into three decoupled services:
1. **`backend/` (Node.js + Express + TypeScript)**
   - API Gateway & Authentication (JWT + Role-based access control: Admin, Auditor, SME Owner).
   - Ingestion Pipeline: Ingests, validates, and normalizes transaction CSV/JSON datasets.
   - Deterministic Rule Engine: Pluggable `IDetectionRule` registry evaluating structural fraud (split purchases, off-hours, duplicates, cross-approvals, shared bank accounts).
   - Investigation Lifecycle & Audit Trail: Immutable event logging, state transitions, and dossier generation.
2. **`python-ml/` (FastAPI + scikit-learn + scipy)**
   - Statistical & Unsupervised Anomaly Engine.
   - Benford's Law First-Digit Analysis (Chi-Square goodness-of-fit).
   - Isolation Forest multi-dimensional outlier scoring on transaction velocity and category deviations.
   - Linear regression trend estimation for expense creeping.
3. **`frontend/` (React + Vite + TypeScript + Tailwind CSS)**
   - Dark-mode forensic workspace built on custom CSS design tokens.
   - Investigation Workspace: Side-by-side evidence panels, timeline views, and interactive entity relation graphs (`@xyflow/react`).
   - Audit Dossier Generator: Defensible PDF/export format with human sign-off notes.

## 3. Data Schema & Core Entities
- **Transaction**: `transaction_id`, `invoice_number`, `date`, `timestamp`, `amount`, `category`, `expense_subcategory`, `description`, `payment_method`, `department`, `approval_status`, `approver_id`, `approver_role`, `vendor_id`, `employee_id`, `receipt_available`, `notes`.
- **Vendor**: `vendor_id`, `vendor_name`, `vendor_address`, `vendor_phone`, `vendor_email`, `vendor_registration`, `bank_account`, `category_served`, `onboarded_date`.
- **Employee**: `employee_id`, `name`, `role`, `department`, `address`, `phone`, `email`, `manager_id`, `hire_date`.
- **Investigation**: `investigation_id`, `title`, `status` (`NEW`, `UNDER_REVIEW`, `RESOLVED_CONFIRMED`, `RESOLVED_DISMISSED`), `severity` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `risk_score`, `primary_entity_type`, `primary_entity_id`, `rules_triggered`, `evidence_data`, `auditor_notes`, `created_at`, `updated_at`.
- **AuditLog**: `log_id`, `timestamp`, `actor_id`, `action`, `entity_type`, `entity_id`, `details`, `previous_state`, `new_state`.

## 4. Detection Ruleset (13 Patterns)
1. Exact & Fuzzy Duplicate Invoices
2. Purchase Splitting (Approval Evasion)
3. Vendor Favoritism / Steering
4. Expense Creep / Inflation Fraud
5. Off-Hours & Weekend Approvals
6. Benford's Law & Round Amount Anomaly
7. Sequential Bulk Invoice Batches
8. Circular Employee-Vendor Address/Phone Linkage
9. Behavioral Spending Shift (Isolation Forest)
10. Approval Threshold Cliff Clustering
11. Shared Bank Account / Shadow Vendors
12. Dormant / Shell Vendor Activation Burst
13. Inverted / Reciprocal Cross-Approval Loops

## 5. Success & Verification Criteria
1. Synthetic dataset with 1,500+ realistic transactions correctly seeds and triggers all 13 micro-corruption patterns.
2. Every detection produces an explainable evidence payload (Rule ID, Formula, Comparative Baseline, Risk Delta).
3. Auditor can navigate from Dashboard → Flagged Transaction → Entity Graph → Document Review → Export Report.
4. Zero TypeScript `any` types; all API contracts validated via Zod and Pydantic schemas.
