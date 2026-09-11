# DETECTION_PATTERNS.md

# Audit Mesh — Micro-Fraud Detection Pattern Registry

**Version**: 1.0
**Status**: Active
**Authority**: This document is the permanent detection pattern memory for all AI agents working on Audit Mesh.
All micro-fraud patterns, their required data fields, detection logic, and dataset design decisions are recorded here.

> Whenever a new detection pattern is identified during development or conversation, it MUST be added here.
> The AI agent must read this document before implementing any detection, ML, or rule-based logic.

---

## Table of Contents

1. [Duplicate Invoice Detection](#1-duplicate-invoice-detection)
2. [Purchase Splitting](#2-purchase-splitting)
3. [Vendor Favoritism](#3-vendor-favoritism)
4. [Expense Inflation Fraud](#4-expense-inflation-fraud)
5. [Off-Hours Transactions](#5-off-hours-transactions)
6. [Round Amount Anomaly (Benford's Law)](#6-round-amount-anomaly-benfords-law)
7. [Sequential Invoice Fraud](#7-sequential-invoice-fraud)
8. [Circular Employee-Vendor Relationship](#8-circular-employee-vendor-relationship)
9. [Behavioral Shift Detection](#9-behavioral-shift-detection)
10. [Approval Threshold Evasion](#10-approval-threshold-evasion)
11. [Master Data Schema](#master-data-schema)
12. [Dataset Design Decisions](#dataset-design-decisions)

---

## 1. Duplicate Invoice Detection

### What It Is
A vendor submits the same invoice more than once with identical or slight variations (different dates, minor amount changes) to collect double payment.

### Required Fields
- `invoice_number`
- `vendor_id`
- `amount`
- `date`
- `department`
- `payment_status`

### Detection Logic
- Exact match: Same `invoice_number` + same `vendor_id` = definite duplicate
- Fuzzy match: Same `vendor_id` + amount within +/-2% + within 30-day window = probable duplicate
- Flag confidence: HIGH if exact, MEDIUM if fuzzy

### Embedded in Synthetic Dataset
- ~5-8 exact duplicates
- ~4-6 fuzzy duplicates (slight amount variation)

---

## 2. Purchase Splitting

### What It Is
A single large purchase is split into multiple smaller transactions to stay below the approval threshold, avoiding senior management oversight.

### Required Fields
- `amount`
- `employee_id` (who raised the purchase order)
- `vendor_id`
- `date` (must be within a short window, e.g., 7 days)
- `category`
- `approval_threshold` (organizational policy constant)
- `description`

### Detection Logic
- Group transactions by `employee_id` + `vendor_id` + `category` within a 7-day window
- Sum grouped amounts - if total exceeds `approval_threshold`, flag as probable split purchase
- Individual amounts must each be BELOW threshold to qualify
- Flag confidence: HIGH if 3+ splits in same window, MEDIUM if 2 splits

### Embedded in Synthetic Dataset
- Approval threshold set at Rs. 1,00,000 (INR)
- ~4-6 split purchase clusters

---

## 3. Vendor Favoritism

### What It Is
One employee repeatedly selects the same vendor for purchases, even when better alternatives exist. Often indicates a kickback arrangement.

### Required Fields
- `vendor_id`
- `employee_id` (who raised / approved the PO)
- `department`
- `date`
- `amount`
- `category`

### Detection Logic
- For each employee, calculate vendor concentration ratio:
  concentration = (transactions_with_top_vendor / total_employee_transactions) * 100
- Flag if concentration > 70% with the same vendor across 10+ transactions
- Also flag if same employee-vendor pair accounts for > 60% of department spending

### Embedded in Synthetic Dataset
- ~2-3 employees with clear vendor favoritism patterns

---

## 4. Expense Inflation Fraud

### What It Is
An employee repeatedly claims the same type of expense (e.g., cab fare, meals, fuel) for the same route/purpose, but the claimed amount gradually or suddenly increases over time while the actual cost for that route/service remains stable or increases only modestly.

### Real-World Example
Employee claims cab fare from "Office to Airport" every Friday.
- Jan: Rs. 450
- Feb: Rs. 450
- Mar: Rs. 500
- Apr: Rs. 600
- May: Rs. 800
- Jun: Rs. 1,500
The actual market rate for that route is approximately Rs. 450-550.
The employee is padding the claim to pocket the difference.

### Required Fields
- `employee_id`
- `amount`
- `date` (with timestamp - month/year granularity minimum)
- `category` - must be a specific subcategory e.g., "Travel - Cab", "Travel - Fuel", "Meals"
- `description` - should include route or purpose e.g., "Office to Airport", "Client Visit - Andheri"
- `expense_subcategory` - granular tag for grouping same-type expenses
- `vendor_id` (cab company / fuel station / restaurant)
- `receipt_available` - boolean; inflation often correlates with missing receipts

### Detection Logic
1. Group transactions by `employee_id` + `expense_subcategory` + `description` (same route/purpose)
2. Sort by `date` ascending
3. Calculate Rolling Average: 3-month rolling mean of amount for this group
4. Flag if:
   - Current month amount > 2x the 3-month rolling average, OR
   - Linear regression slope over 6+ months is statistically significant (p < 0.05), OR
   - Amount increased > 50% over 3 consecutive months for same description
5. Severity:
   - > 2x rolling average = HIGH risk
   - > 1.5x rolling average = MEDIUM risk
   - Significant upward trend (6+ months) = MEDIUM risk

### Detection Algorithm (ML Layer)
- Use Linear Regression on (date, amount) per employee per expense subcategory
- A high positive slope = suspicious inflation trend
- Combine with Z-score: if current amount is > 2 standard deviations from employee's personal baseline for same category, flag it

### Important Notes for Dataset Design
- Every travel/expense transaction MUST have a `description` that identifies the route or purpose
- The `expense_subcategory` field is critical - cannot lump all "Travel" together
- Need at least 6-12 months of data to make trend detection meaningful
- Timestamps must be monthly at minimum (preferably exact date)

### Embedded in Synthetic Dataset
- ~3 employees with expense inflation patterns across different categories:
  - Employee A: Cab inflation (Office to Airport route)
  - Employee B: Fuel expense inflation
  - Employee C: Client entertainment/meal inflation

---

## 5. Off-Hours Transactions

### What It Is
Transactions approved or processed outside normal business hours (late night, early morning, weekends, public holidays), which may indicate unauthorized access or collusion.

### Required Fields
- `timestamp` (full datetime - NOT just date. Time is mandatory)
- `day_of_week` (derived: 0=Monday ... 6=Sunday)
- `hour` (derived from timestamp)
- `approver_id`
- `approval_timestamp`

### Detection Logic
- Flag if hour < 7 or hour > 21 on a weekday
- Flag if day_of_week in [5, 6] (Saturday, Sunday) for non-emergency categories
- Flag if approved on a public holiday
- Repeated off-hours approvals by the same `approver_id` = escalate risk

---

## 6. Round Amount Anomaly (Benford's Law)

### What It Is
Real-world expenses are rarely perfectly round numbers. A high frequency of round amounts (Rs. 10,000 / Rs. 50,000 / Rs. 1,00,000) suggests fabricated or padded claims.

### Required Fields
- `amount` (the only field needed)

### Detection Logic
- Benford's Law: First digit distribution of legitimate financial data follows a logarithmic pattern (1 appears ~30%, 9 appears ~5%)
- Apply Chi-square goodness-of-fit test against Benford's expected distribution
- Separately flag: percentage of transactions that are perfectly round (divisible by 1000 or 5000)
- Normal threshold: < 5% round amounts; suspicious: > 20%

---

## 7. Sequential Invoice Fraud

### What It Is
A vendor submits multiple invoices with sequential numbers (INV-001, INV-002, INV-003) all on the same day or within days - indicating fabricated invoices generated in bulk.

### Required Fields
- `invoice_number` (must be parseable as sequential)
- `vendor_id`
- `date`

### Detection Logic
- Parse invoice numbers to extract the numeric suffix
- Group by `vendor_id` + `date` window (7 days)
- Flag if 3+ sequential invoice numbers from same vendor in same window
- Real vendors invoice organically - sequential bulk invoices are rare

---

## 8. Circular Employee-Vendor Relationship

### What It Is
An employee has a personal connection to a vendor they approve payments for - e.g., the vendor is owned by a family member, friend, or the employee themselves.

### Required Fields
- `employee_address`
- `vendor_address`
- `employee_phone`
- `vendor_phone`
- `vendor_registration_name` (owner name)
- `employee_name`

### Detection Logic
- Match `employee_address` with `vendor_address` (exact or fuzzy)
- Match `employee_phone` with `vendor_phone`
- Name similarity: employee last name appears in `vendor_registration_name`
- Flag confidence: HIGH if 2+ matches, MEDIUM if 1 match

---

## 9. Behavioral Shift Detection

### What It Is
An employee's spending behavior changes significantly over time - either a sudden spike or a gradual escalation that deviates from their historical baseline.

### Required Fields
- `employee_id`
- `amount`
- `date` (monthly aggregation)
- `category`

### Detection Logic
- Calculate employee's 6-month baseline average spending per category
- Flag if current month spending > 2x personal baseline
- Also apply Isolation Forest (ML) on employee spending vectors across time

---

## 10. Approval Threshold Evasion

### What It Is
Approvals systematically cluster just below the policy approval threshold - e.g., if Rs. 1L requires VP approval, many transactions appear at Rs. 98,000-99,999.

### Required Fields
- `amount`
- `approval_threshold` (policy constant)
- `approver_id`
- `approver_role`

### Detection Logic
- Calculate percentage of transactions within 5% below each threshold tier
- Normal distribution would show uniform spread
- Flag if > 15% of transactions cluster in the 95%-99% range of a threshold

---

## Master Data Schema

### Transaction (Core Table)
```
transaction_id        STRING    Unique ID
invoice_number        STRING    e.g., INV-2024-001
date                  DATE      Transaction date (YYYY-MM-DD)
timestamp             DATETIME  Full datetime including time - MANDATORY
amount                FLOAT     Transaction amount in INR
category              STRING    e.g., "Travel", "Office Supplies", "IT Equipment"
expense_subcategory   STRING    e.g., "Travel - Cab", "Travel - Fuel", "Meals"
description           STRING    e.g., "Office to Airport", "Client Visit - Andheri"
payment_method        STRING    Bank Transfer, Cash, Corporate Card
department            STRING    Finance, IT, Operations, HR, Sales
approval_status       STRING    Approved / Pending / Rejected
approver_id           STRING    FK -> Employee table
approver_role         STRING    Manager / VP / CFO
vendor_id             STRING    FK -> Vendor table
employee_id           STRING    FK -> Employee table (who raised the request)
receipt_available     BOOLEAN   Whether receipt was submitted
notes                 STRING    Free text notes
```

### Vendor Table
```
vendor_id              STRING    Unique ID
vendor_name            STRING
vendor_address         STRING    Full address - needed for circular relationship detection
vendor_phone           STRING
vendor_email           STRING
vendor_registration    STRING    Legal registration / owner name
bank_account           STRING    For duplicate payment detection
category_served        STRING    What they supply
onboarded_date         DATE
```

### Employee Table
```
employee_id            STRING    Unique ID
name                   STRING
role                   STRING    Accountant, Manager, VP, CFO
department             STRING
address                STRING    Full address - needed for circular relationship detection
phone                  STRING
email                  STRING
manager_id             STRING    FK -> Employee table (their manager)
hire_date              DATE
```

---

## Dataset Design Decisions

### Language/Currency
- Use INR (Indian Rupees) as the default currency
- Approval threshold: Rs. 1,00,000 (common SME policy level)
- Dataset context: Indian SME, ~200 employees, ~50 vendors

### Time Range
- 12 months minimum of transaction history required
- Without 12 months, expense inflation and behavioral shift detection are unreliable
- Preferred: 18 months for more robust trend detection

### Volume
- ~1,500-2,000 transactions total
- ~50 vendors (5-8 with suspicious patterns)
- ~30 employees (5-8 with suspicious behavior)

### Embedded Pattern Distribution
| Pattern | Count |
|---|---|
| Duplicate invoices (exact) | 6 |
| Duplicate invoices (fuzzy) | 5 |
| Purchase splitting clusters | 5 |
| Vendor favoritism cases | 3 |
| Expense inflation employees | 3 |
| Off-hours transactions | 15 |
| Sequential invoice batches | 3 |
| Circular relationships | 2 |
| Behavioral shift employees | 3 |
| Round amount anomaly vendors | 4 |

### Critical Field Notes (NON-NEGOTIABLE)
- `timestamp` (not just `date`) is NON-NEGOTIABLE - off-hours detection requires it
- `expense_subcategory` and `description` are NON-NEGOTIABLE - expense inflation detection requires route/purpose granularity
- `vendor_address` and `employee_address` are NON-NEGOTIABLE - circular relationship detection requires them
- `receipt_available` boolean improves confidence scoring for expense fraud

---

*DETECTION_PATTERNS.md - Version 1.0*
*This document must be updated whenever a new detection pattern is identified.*
*All AI agents must read this before implementing any detection or ML logic.*
