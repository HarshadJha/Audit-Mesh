import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface GeneratedData {
  vendors: any[];
  employees: any[];
  transactions: any[];
}

export const generateSyntheticBenchmark = (): GeneratedData => {
  console.log('[Generator] Generating synthetic SME benchmark data...');

  // 1. Employees (30 realistic Indian SME employees across 6 departments)
  const departments = ['Finance', 'IT', 'Operations', 'HR', 'Sales', 'Procurement'] as const;
  
  const employees: any[] = [
    // Executive / Approvers
    { employee_id: 'EMP-001', name: 'Rajesh Sharma', role: 'CFO', department: 'Finance', address: 'B-402 Palm Beach Rd, Navi Mumbai', phone: '+91 98201 11223', email: 'rajesh.sharma@auditmesh-demo.in', manager_id: '', hire_date: '2021-02-15' },
    { employee_id: 'EMP-002', name: 'Sunita Menon', role: 'VP Operations', department: 'Operations', address: '12 Emerald Hills, Baner, Pune', phone: '+91 98201 44556', email: 'sunita.menon@auditmesh-demo.in', manager_id: 'EMP-001', hire_date: '2021-06-01' },
    { employee_id: 'EMP-003', name: 'Vikram Mehta', role: 'Department Manager', department: 'Procurement', address: '74 Gulmohar Cross Rd, Juhu, Mumbai', phone: '+91 98202 77889', email: 'vikram.mehta@auditmesh-demo.in', manager_id: 'EMP-001', hire_date: '2022-01-10' },
    { employee_id: 'EMP-004', name: 'Ananya Roy', role: 'Department Manager', department: 'IT', address: 'A-10 Indiranagar, Bengaluru', phone: '+91 98203 12345', email: 'ananya.roy@auditmesh-demo.in', manager_id: 'EMP-002', hire_date: '2022-03-20' },
    { employee_id: 'EMP-005', name: 'Amitabh Deshmukh', role: 'Department Manager', department: 'Finance', address: 'Plot 45, Kothrud, Pune', phone: '+91 98203 67890', email: 'amitabh.d@auditmesh-demo.in', manager_id: 'EMP-001', hire_date: '2022-05-12' },
    // Requesters & Staff
    { employee_id: 'EMP-006', name: 'Rohan Verma', role: 'Procurement Officer', department: 'Procurement', address: 'Flat 204, Sea Breeze Apts, Bandra West, Mumbai', phone: '+91 98204 11223', email: 'rohan.verma@auditmesh-demo.in', manager_id: 'EMP-003', hire_date: '2022-08-01' },
    { employee_id: 'EMP-007', name: 'Pooja Hegde', role: 'Accountant', department: 'Finance', address: '302 Lakeview, Powai, Mumbai', phone: '+91 98204 44556', email: 'pooja.hegde@auditmesh-demo.in', manager_id: 'EMP-005', hire_date: '2022-09-15' },
    { employee_id: 'EMP-008', name: 'Karan Johar', role: 'Employee', department: 'IT', address: '88 Tech Enclave, Whitefield, Bengaluru', phone: '+91 98204 77889', email: 'karan.johar@auditmesh-demo.in', manager_id: 'EMP-004', hire_date: '2023-01-05' },
    { employee_id: 'EMP-009', name: 'Neha Kulkarni', role: 'Employee', department: 'Sales', address: '15 Deccan Gymkhana, Pune', phone: '+91 98205 11223', email: 'neha.k@auditmesh-demo.in', manager_id: 'EMP-002', hire_date: '2023-02-18' },
    { employee_id: 'EMP-010', name: 'Siddharth Nair', role: 'Employee', department: 'Operations', address: 'B-12 Hiranandani Gardens, Powai, Mumbai', phone: '+91 98205 44556', email: 'siddharth.n@auditmesh-demo.in', manager_id: 'EMP-002', hire_date: '2023-04-10' },
  ];

  for (let i = 11; i <= 30; i++) {
    const dept = departments[i % departments.length]!;
    employees.push({
      employee_id: `EMP-${i.toString().padStart(3, '0')}`,
      name: `Employee ${i} ${dept}`,
      role: i % 4 === 0 ? 'Procurement Officer' : 'Employee',
      department: dept,
      address: `Tower ${i}, Sector ${i % 15}, Vashi, Navi Mumbai`,
      phone: `+91 9820${i.toString().padStart(2, '0')} ${i * 111}`,
      email: `emp${i}.${dept.toLowerCase()}@auditmesh-demo.in`,
      manager_id: 'EMP-003',
      hire_date: '2023-05-15',
    });
  }

  // 2. Vendors (50 Indian vendors across IT, Logistics, Supplies, Facility, Consulting)
  const vendorCategories = ['IT Hardware & Cloud', 'Office Supplies', 'Logistics & Transport', 'Facility & Maintenance', 'Consulting & Legal', 'Marketing & Events'] as const;
  
  const vendors: any[] = [
    // Normal Vendors
    { vendor_id: 'VEN-001', vendor_name: 'TechLogix Cloud Systems Pvt Ltd', vendor_address: 'Plot 18, MIDC Industrial Area, Andheri East, Mumbai', vendor_phone: '+91 22 6123 4001', vendor_email: 'billing@techlogix.in', vendor_registration: 'TechLogix Systems Ltd', bank_account: 'HDFC0001234001', category_served: 'IT Hardware & Cloud', onboarded_date: '2022-01-10', risk_score: 12, risk_level: 'LOW', total_spend_inr: 0, transaction_count: 0, is_suspicious: false },
    { vendor_id: 'VEN-002', vendor_name: 'Metro Office Supplies Corp', vendor_address: 'Shop 14, Station Road, Dadar, Mumbai', vendor_phone: '+91 22 6123 4002', vendor_email: 'accounts@metrosupplies.in', vendor_registration: 'Metro Trade Associates', bank_account: 'ICIC0002345002', category_served: 'Office Supplies', onboarded_date: '2022-02-15', risk_score: 15, risk_level: 'LOW', total_spend_inr: 0, transaction_count: 0, is_suspicious: false },
    { vendor_id: 'VEN-003', vendor_name: 'SwiftExpress Cargo Logistics', vendor_address: 'Warehouse 4, Bhiwandi Highway, Thane', vendor_phone: '+91 22 6123 4003', vendor_email: 'invoicing@swiftexpress.in', vendor_registration: 'Swift Transport Services', bank_account: 'SBIN0003456003', category_served: 'Logistics & Transport', onboarded_date: '2022-03-01', risk_score: 18, risk_level: 'LOW', total_spend_inr: 0, transaction_count: 0, is_suspicious: false },
    { vendor_id: 'VEN-004', vendor_name: 'Apex Facilities & Security', vendor_address: 'Building 7, Sector 30, Vashi, Navi Mumbai', vendor_phone: '+91 22 6123 4004', vendor_email: 'finance@apexfacilities.in', vendor_registration: 'Apex Security Solutions', bank_account: 'AXIS0004567004', category_served: 'Facility & Maintenance', onboarded_date: '2022-04-12', risk_score: 10, risk_level: 'LOW', total_spend_inr: 0, transaction_count: 0, is_suspicious: false },
    { vendor_id: 'VEN-005', vendor_name: 'Zenith Legal & Tax Advisory', vendor_address: 'Suite 502, Nariman Point, Mumbai', vendor_phone: '+91 22 6123 4005', vendor_email: 'contact@zenithadvisory.in', vendor_registration: 'Zenith Partners LLP', bank_account: 'KKBK0005678005', category_served: 'Consulting & Legal', onboarded_date: '2022-05-20', risk_score: 8, risk_level: 'LOW', total_spend_inr: 0, transaction_count: 0, is_suspicious: false },

    // Suspicious Vendor A: Circular Linkage with EMP-006 (Rohan Verma) - Shared Address & Phone
    { vendor_id: 'VEN-010', vendor_name: 'Verma Digital Solutions LLP', vendor_address: 'Flat 204, Sea Breeze Apts, Bandra West, Mumbai', vendor_phone: '+91 98204 11223', vendor_email: 'invoicing@vermadigital.in', vendor_registration: 'Rohan Verma Family Trust', bank_account: 'HDFC0009999010', category_served: 'IT Hardware & Cloud', onboarded_date: '2023-02-10', risk_score: 88, risk_level: 'CRITICAL', total_spend_inr: 0, transaction_count: 0, is_suspicious: true, suspicious_reason: 'Circular address and phone match with Procurement Officer Rohan Verma (EMP-006)' },

    // Suspicious Vendors B & C: Shared Bank Account (Shadow Vendor Pattern)
    { vendor_id: 'VEN-011', vendor_name: 'Sahyadri Enterprise Supply Hub', vendor_address: 'Shop 12, APMC Market, Vashi, Navi Mumbai', vendor_phone: '+91 22 6888 1111', vendor_email: 'sales@sahyadrisupply.in', vendor_registration: 'Sahyadri Trading Co', bank_account: 'PUNB0007777888', category_served: 'Office Supplies', onboarded_date: '2023-03-01', risk_score: 85, risk_level: 'HIGH', total_spend_inr: 0, transaction_count: 0, is_suspicious: true, suspicious_reason: 'Shares bank account PUNB0007777888 with VEN-012' },
    { vendor_id: 'VEN-012', vendor_name: 'Konkan Global Traders', vendor_address: 'Gala 44, Turbhe MIDC, Navi Mumbai', vendor_phone: '+91 22 6888 2222', vendor_email: 'info@konkanglobal.in', vendor_registration: 'Konkan Commercial Inc', bank_account: 'PUNB0007777888', category_served: 'Office Supplies', onboarded_date: '2023-04-15', risk_score: 85, risk_level: 'HIGH', total_spend_inr: 0, transaction_count: 0, is_suspicious: true, suspicious_reason: 'Shares bank account PUNB0007777888 with VEN-011' },

    // Suspicious Vendor D: Dormant Shell Vendor Burst
    { vendor_id: 'VEN-013', vendor_name: 'BlueHorizon Consulting Network', vendor_address: 'Office 3, Old Khar Link Road, Mumbai', vendor_phone: '+91 22 6999 3333', vendor_email: 'support@bluehorizonnet.in', vendor_registration: 'Blue Horizon Advisory', bank_account: 'YESB0001234013', category_served: 'Consulting & Legal', onboarded_date: '2022-01-01', risk_score: 82, risk_level: 'HIGH', total_spend_inr: 0, transaction_count: 0, is_suspicious: true, suspicious_reason: 'Dormant for 8 months before sudden high-value invoice burst' },

    // Suspicious Vendor E: Sequential Invoicing & Round Number Fabrications
    { vendor_id: 'VEN-014', vendor_name: 'QuickPrint Solutions & Media', vendor_address: 'Plot 99, Lower Parel Industrial Estate, Mumbai', vendor_phone: '+91 22 6777 4444', vendor_email: 'orders@quickprintmedia.in', vendor_registration: 'QuickPrint Associates', bank_account: 'UTIB0001234014', category_served: 'Marketing & Events', onboarded_date: '2023-05-10', risk_score: 80, risk_level: 'HIGH', total_spend_inr: 0, transaction_count: 0, is_suspicious: true, suspicious_reason: 'Sequential bulk invoices (INV-001, 002, 003) and 100% round number billing' },
  ];

  // Fill up to 50 vendors
  for (let i = vendors.length + 1; i <= 50; i++) {
    const cat = vendorCategories[i % vendorCategories.length]!;
    vendors.push({
      vendor_id: `VEN-${i.toString().padStart(3, '0')}`,
      vendor_name: `Standard Vendor ${i} Solutions`,
      vendor_address: `Plot ${i * 4}, Sector ${i % 20}, Airoli, Navi Mumbai`,
      vendor_phone: `+91 22 6123 ${i.toString().padStart(4, '0')}`,
      vendor_email: `billing@vendor${i}.in`,
      vendor_registration: `Vendor ${i} Commercial Ltd`,
      bank_account: `HDFC0001234${i.toString().padStart(3, '0')}`,
      category_served: cat,
      onboarded_date: '2023-06-01',
      risk_score: Math.floor(Math.random() * 25),
      risk_level: 'LOW',
      total_spend_inr: 0,
      transaction_count: 0,
      is_suspicious: false,
    });
  }

  // 3. Transactions (1,600+ realistic SME records covering Jan 2025 - Jun 2026)
  const transactions: any[] = [];
  let txCounter = 1;

  // Helper to push transactions
  const addTx = (data: Partial<any>) => {
    const txId = `TXN-${txCounter.toString().padStart(5, '0')}`;
    const tx = {
      transaction_id: txId,
      invoice_number: data.invoice_number || `INV-2025-${txCounter.toString().padStart(4, '0')}`,
      date: data.date || '2025-05-10',
      timestamp: data.timestamp || `${data.date || '2025-05-10'}T11:30:00Z`,
      amount: data.amount || 25000,
      category: data.category || 'Office Supplies',
      expense_subcategory: data.expense_subcategory || 'Stationery',
      description: data.description || 'Monthly office consumable procurement',
      payment_method: data.payment_method || 'Bank Transfer',
      department: data.department || 'Procurement',
      approval_status: data.approval_status || 'Approved',
      approver_id: data.approver_id || 'EMP-003',
      approver_name: data.approver_name || 'Vikram Mehta',
      approver_role: data.approver_role || 'Department Manager',
      vendor_id: data.vendor_id || 'VEN-002',
      vendor_name: data.vendor_name || 'Metro Office Supplies Corp',
      employee_id: data.employee_id || 'EMP-006',
      employee_name: data.employee_name || 'Rohan Verma',
      receipt_available: data.receipt_available !== undefined ? data.receipt_available : true,
      notes: data.notes || '',
      is_anomaly: data.is_anomaly || false,
      anomaly_type: data.anomaly_type || undefined,
      ground_truth_reason: data.ground_truth_reason || undefined,
    };
    transactions.push(tx);
    txCounter++;
  };

  console.log('[Generator] Injecting 13 micro-corruption anomaly patterns...');

  // PATTERN 1: Exact Duplicate Invoices (6 pairs = 12 transactions)
  for (let p = 1; p <= 6; p++) {
    const invNum = `INV-DUP-${p * 100}`;
    const amt = 48500 + p * 2500;
    const dt = `2025-0${(p % 5) + 2}-14`;
    // Original
    addTx({
      invoice_number: invNum,
      amount: amt,
      date: dt,
      timestamp: `${dt}T14:15:00Z`,
      vendor_id: 'VEN-001',
      vendor_name: 'TechLogix Cloud Systems Pvt Ltd',
      category: 'IT Hardware & Cloud',
      expense_subcategory: 'Cloud Hosting Services',
      description: 'Q1 Managed Cloud Hosting Service fee',
      is_anomaly: false,
    });
    // Exact Duplicate (submitted 12 days later)
    const dupDate = `2025-0${(p % 5) + 2}-26`;
    addTx({
      invoice_number: invNum,
      amount: amt,
      date: dupDate,
      timestamp: `${dupDate}T16:20:00Z`,
      vendor_id: 'VEN-001',
      vendor_name: 'TechLogix Cloud Systems Pvt Ltd',
      category: 'IT Hardware & Cloud',
      expense_subcategory: 'Cloud Hosting Services',
      description: 'Q1 Managed Cloud Hosting Service fee (Re-billed)',
      is_anomaly: true,
      anomaly_type: 'DUPLICATE_INVOICE_EXACT',
      ground_truth_reason: `Exact match duplicate of invoice ${invNum} on vendor VEN-001`,
    });
  }

  // PATTERN 2: Fuzzy Duplicate Invoices (5 pairs = 10 transactions)
  for (let p = 1; p <= 5; p++) {
    const baseAmt = 75000 + p * 1500;
    const fuzzyAmt = Math.round(baseAmt * 1.012); // +1.2% variation
    const dt1 = `2025-0${p + 1}-08`;
    const dt2 = `2025-0${p + 1}-24`; // 16 days later
    addTx({
      invoice_number: `INV-FZ-${p}01A`,
      amount: baseAmt,
      date: dt1,
      timestamp: `${dt1}T10:00:00Z`,
      vendor_id: 'VEN-003',
      vendor_name: 'SwiftExpress Cargo Logistics',
      category: 'Logistics & Transport',
      expense_subcategory: 'Freight Distribution',
      description: 'Bulk regional warehouse distribution transfer',
      is_anomaly: false,
    });
    addTx({
      invoice_number: `INV-FZ-${p}01B`,
      amount: fuzzyAmt,
      date: dt2,
      timestamp: `${dt2}T11:45:00Z`,
      vendor_id: 'VEN-003',
      vendor_name: 'SwiftExpress Cargo Logistics',
      category: 'Logistics & Transport',
      expense_subcategory: 'Freight Distribution',
      description: 'Bulk regional freight logistics fee (Adjusted)',
      is_anomaly: true,
      anomaly_type: 'DUPLICATE_INVOICE_FUZZY',
      ground_truth_reason: `Fuzzy duplicate: same vendor VEN-003, amount within 1.2% within 16 days`,
    });
  }

  // PATTERN 3: Purchase Splitting Clusters (5 clusters below ₹1,00,000 threshold = 15 transactions)
  // Approval threshold: Rs. 1,00,000
  for (let c = 1; c <= 5; c++) {
    const dates = [`2025-07-0${c}`, `2025-07-0${c + 2}`, `2025-07-0${c + 4}`];
    const amounts = [94500, 92000, 89500]; // Sums to ₹2,76,000! Each < 100k
    amounts.forEach((amt, idx) => {
      addTx({
        invoice_number: `INV-SPLIT-${c}-${idx + 1}`,
        amount: amt,
        date: dates[idx],
        timestamp: `${dates[idx]}T15:00:00Z`,
        employee_id: 'EMP-006',
        employee_name: 'Rohan Verma',
        approver_id: 'EMP-003',
        approver_name: 'Vikram Mehta',
        vendor_id: 'VEN-001',
        vendor_name: 'TechLogix Cloud Systems Pvt Ltd',
        category: 'IT Hardware & Cloud',
        expense_subcategory: 'Workstation Upgrades',
        description: `Modular IT hardware procurement Part ${idx + 1}`,
        is_anomaly: true,
        anomaly_type: 'SPLIT_PURCHASE',
        ground_truth_reason: `Split purchase cluster ${c}: ₹${amounts.reduce((a, b) => a + b, 0)} structured into 3 sub-100k POs in 5 days`,
      });
    });
  }

  // PATTERN 4: Vendor Favoritism (Steering 85% spend to VEN-010 by EMP-006 = 20 transactions)
  for (let f = 1; f <= 20; f++) {
    const m = (f % 12) + 1;
    const dt = `2025-${m.toString().padStart(2, '0')}-18`;
    addTx({
      invoice_number: `INV-FAV-${f.toString().padStart(3, '0')}`,
      amount: 45000 + (f * 1200),
      date: dt,
      timestamp: `${dt}T14:30:00Z`,
      employee_id: 'EMP-006',
      employee_name: 'Rohan Verma',
      vendor_id: 'VEN-010',
      vendor_name: 'Verma Digital Solutions LLP',
      category: 'IT Hardware & Cloud',
      expense_subcategory: 'Digital Maintenance',
      description: `Monthly dedicated IT infrastructure maintenance ${f}`,
      is_anomaly: true,
      anomaly_type: 'VENDOR_FAVORITISM',
      ground_truth_reason: `Vendor steering: EMP-006 routes 85%+ of department digital maintenance to VEN-010`,
    });
  }

  // PATTERN 5: Expense Inflation (Creeping route padding over 12 months = 24 transactions)
  // Employee EMP-008 claims Cab fare "Office to Airport"
  const cabAmounts = [
    450, 480, 520, 650, 800, 950, 1150, 1300, 1500, 1650, 1850, 2100, // 2025
    2250, 2400, 2550, 2700, 2850, 3100 // 2026
  ];
  cabAmounts.forEach((amt, idx) => {
    const year = idx < 12 ? '2025' : '2026';
    const month = ((idx % 12) + 1).toString().padStart(2, '0');
    const dt = `${year}-${month}-12`;
    const isCreeping = idx >= 4; // Starts inflating significantly from Month 5
    addTx({
      invoice_number: `EXP-CAB-${year}-${month}`,
      amount: amt,
      date: dt,
      timestamp: `${dt}T09:15:00Z`,
      employee_id: 'EMP-008',
      employee_name: 'Karan Johar',
      category: 'Travel',
      expense_subcategory: 'Travel - Cab',
      description: 'Office to Airport client transit',
      payment_method: 'Corporate Card',
      department: 'IT',
      receipt_available: idx < 6, // Receipts stop being attached as fraud escalates
      is_anomaly: isCreeping,
      anomaly_type: isCreeping ? 'EXPENSE_INFLATION' : undefined,
      ground_truth_reason: isCreeping ? `Expense inflation: cab fare inflated from ₹450 to ₹${amt} (>3.5x baseline)` : undefined,
    });
  });

  // PATTERN 6: Off-Hours & Weekend Approvals (15 transactions approved late night / Sundays)
  for (let o = 1; o <= 15; o++) {
    const dt = `2025-0${(o % 6) + 1}-1${o % 9}`;
    const hours = ['01:30:00Z', '02:45:00Z', '03:15:00Z', '23:45:00Z'];
    const selectedHour = hours[o % hours.length];
    addTx({
      invoice_number: `INV-OFF-${o.toString().padStart(3, '0')}`,
      amount: 65000 + (o * 1800),
      date: dt,
      timestamp: `${dt}T${selectedHour}`,
      approver_id: 'EMP-007',
      approver_name: 'Pooja Hegde',
      approver_role: 'Accountant',
      category: 'Consulting & Legal',
      expense_subcategory: 'Emergency Audit Signoff',
      description: 'Off-hours emergency expedited invoice settlement',
      is_anomaly: true,
      anomaly_type: 'OFF_HOURS_APPROVAL',
      ground_truth_reason: `Processed outside operational hours at ${selectedHour}`,
    });
  }

  // PATTERN 7: Round Amount Anomalies (Benford's Law violation = 16 transactions)
  // Vendor VEN-014 exclusively billing exact multiples of ₹25,000 / ₹50,000 / ₹1,00,000
  const roundSums = [25000, 50000, 50000, 75000, 100000, 50000, 25000, 100000];
  for (let r = 0; r < 16; r++) {
    const amt = roundSums[r % roundSums.length]!;
    const m = (r % 6) + 1;
    const dt = `2025-0${m}-2${r % 8}`;
    addTx({
      invoice_number: `INV-RND-${r.toString().padStart(3, '0')}`,
      amount: amt,
      date: dt,
      timestamp: `${dt}T11:00:00Z`,
      vendor_id: 'VEN-014',
      vendor_name: 'QuickPrint Solutions & Media',
      category: 'Marketing & Events',
      expense_subcategory: 'Promotional Banners',
      description: 'Fixed tier promotional event media printing package',
      is_anomaly: true,
      anomaly_type: 'ROUND_AMOUNT_ANOMALY',
      ground_truth_reason: `Unnatural round sum of ₹${amt} violating Benford distribution on VEN-014`,
    });
  }

  // PATTERN 8: Sequential Invoice Batches (3 vendors submitting consecutive invoices within 48h = 9 transactions)
  for (let s = 1; s <= 3; s++) {
    const dt = `2025-08-1${s}`;
    for (let seq = 1; seq <= 3; seq++) {
      addTx({
        invoice_number: `INV-BATCH-00${seq}`,
        amount: 38000 + (seq * 4500),
        date: dt,
        timestamp: `${dt}T${10 + seq}:00:00Z`,
        vendor_id: 'VEN-014',
        vendor_name: 'QuickPrint Solutions & Media',
        category: 'Marketing & Events',
        expense_subcategory: 'Print Collateral',
        description: `Sequential batch invoice #${seq} issued in rapid succession`,
        is_anomaly: true,
        anomaly_type: 'SEQUENTIAL_INVOICE_FRAUD',
        ground_truth_reason: `Sequential invoice INV-BATCH-00${seq} submitted within 48 hours by single client vendor`,
      });
    }
  }

  // PATTERN 9: Circular Employee-Vendor Relationship (Linked to EMP-006 & VEN-010 = 8 transactions)
  for (let cr = 1; cr <= 8; cr++) {
    const dt = `2025-09-0${cr}`;
    addTx({
      invoice_number: `INV-CIRC-${cr.toString().padStart(3, '0')}`,
      amount: 52000,
      date: dt,
      timestamp: `${dt}T13:00:00Z`,
      employee_id: 'EMP-006',
      employee_name: 'Rohan Verma',
      vendor_id: 'VEN-010',
      vendor_name: 'Verma Digital Solutions LLP',
      category: 'IT Hardware & Cloud',
      expense_subcategory: 'Network Security Audit',
      description: 'Specialized enterprise network audit consultation',
      is_anomaly: true,
      anomaly_type: 'CIRCULAR_RELATIONSHIP',
      ground_truth_reason: 'Entity link: Rohan Verma (EMP-006) shares residential address & phone with VEN-010',
    });
  }

  // PATTERN 10: Approval Threshold Evasion Clustering (12 transactions clustered in ₹96k - ₹99.5k)
  for (let cl = 1; cl <= 12; cl++) {
    const amt = 96000 + (cl * 280); // ₹96,280 to ₹99,360 (just below ₹1,00,000 threshold)
    const m = (cl % 8) + 1;
    const dt = `2025-0${m}-19`;
    addTx({
      invoice_number: `INV-CLUST-${cl.toString().padStart(3, '0')}`,
      amount: amt,
      date: dt,
      timestamp: `${dt}T14:40:00Z`,
      employee_id: 'EMP-009',
      employee_name: 'Neha Kulkarni',
      approver_id: 'EMP-003',
      approver_name: 'Vikram Mehta',
      category: 'Office Supplies',
      expense_subcategory: 'Bulk Stationery',
      description: 'Departmental bulk annual paper and cartridge order',
      is_anomaly: true,
      anomaly_type: 'THRESHOLD_EVASION_CLUSTERING',
      ground_truth_reason: `Transaction amount ₹${amt} clusters within 4% immediately below ₹1,00,000 signoff cliff`,
    });
  }

  // PATTERN 11: Shared Bank Account (Shadow Vendor Pattern = 10 transactions across VEN-011 and VEN-012)
  for (let sb = 1; sb <= 10; sb++) {
    const ven = sb % 2 === 0 ? vendors.find(v => v.vendor_id === 'VEN-011') : vendors.find(v => v.vendor_id === 'VEN-012');
    const dt = `2025-10-0${(sb % 8) + 1}`;
    addTx({
      invoice_number: `INV-SHBANK-${sb.toString().padStart(3, '0')}`,
      amount: 42000 + (sb * 3000),
      date: dt,
      timestamp: `${dt}T11:20:00Z`,
      vendor_id: ven.vendor_id,
      vendor_name: ven.vendor_name,
      category: 'Office Supplies',
      expense_subcategory: 'Pantry Supplies',
      description: 'Office consumables and pantry management distribution',
      is_anomaly: true,
      anomaly_type: 'SHARED_BANK_ACCOUNT',
      ground_truth_reason: `Shadow vendor billing: VEN-011 and VEN-012 share identical bank account PUNB0007777888`,
    });
  }

  // PATTERN 12: Dormant Shell Vendor Sudden Burst (VEN-013 dormant for 8 months then 6 high-value transactions = 6 transactions)
  // Last invoice was 2025-01-05, sudden burst in 2025-09-15 to 2025-09-25
  const burstDates = ['2025-09-15', '2025-09-17', '2025-09-19', '2025-09-21', '2025-09-23', '2025-09-25'];
  burstDates.forEach((dt, idx) => {
    addTx({
      invoice_number: `INV-BURST-${idx + 1}`,
      amount: 72000 + (idx * 6000), // Total > ₹4,50,000 in 10 days
      date: dt,
      timestamp: `${dt}T16:00:00Z`,
      vendor_id: 'VEN-013',
      vendor_name: 'BlueHorizon Consulting Network',
      category: 'Consulting & Legal',
      expense_subcategory: 'Retainer Fee',
      description: `Emergency restructuring advisory tranche ${idx + 1}`,
      is_anomaly: true,
      anomaly_type: 'DORMANT_SHELL_BURST',
      ground_truth_reason: `Dormant vendor burst: VEN-013 had zero activity for 250+ days before ₹4,50,000 spike in 10 days`,
    });
  });

  // PATTERN 13: Inverted / Cross-Approval Reciprocal Loops (6 transactions between EMP-006 and EMP-007)
  for (let lp = 1; lp <= 6; lp++) {
    const isAtoB = lp % 2 === 0;
    const req = isAtoB ? employees.find(e => e.employee_id === 'EMP-006') : employees.find(e => e.employee_id === 'EMP-007');
    const app = isAtoB ? employees.find(e => e.employee_id === 'EMP-007') : employees.find(e => e.employee_id === 'EMP-006');
    const dt = `2025-11-0${lp}`;
    addTx({
      invoice_number: `INV-LOOP-${lp.toString().padStart(3, '0')}`,
      amount: 54000 + (lp * 2500),
      date: dt,
      timestamp: `${dt}T12:00:00Z`,
      employee_id: req.employee_id,
      employee_name: req.name,
      approver_id: app.employee_id,
      approver_name: app.name,
      category: 'Operations',
      expense_subcategory: 'Field Equipment Maintenance',
      description: `Cross-approved operational field expense claim ${lp}`,
      is_anomaly: true,
      anomaly_type: 'CROSS_APPROVAL_LOOP',
      ground_truth_reason: `Reciprocal cross-approval loop: ${req.name} and ${app.name} repeatedly approve each other's expenses without supervisor sign-off`,
    });
  }

  // FILL WITH REALISTIC LEGITIMATE TRANSACTIONS TO REACH 1,600+ RECORDS
  console.log('[Generator] Generating legitimate background transactions (1,450+ records)...');
  const normalVendors = vendors.filter(v => !v.is_suspicious);
  const normalEmployees = employees.filter(e => e.employee_id !== 'EMP-006');
  const paymentMethods = ['Bank Transfer', 'Corporate Card', 'Cash'] as const;

  const normalSubcats: Record<string, string[]> = {
    'Office Supplies': ['Stationery', 'Pantry & Beverages', 'Printing Supplies', 'Desk Equipment'],
    'IT Hardware & Cloud': ['Cloud Hosting Services', 'Software Licenses', 'Peripherals', 'Network Cabling'],
    'Logistics & Transport': ['Courier Services', 'Freight Distribution', 'Warehouse Handling', 'Fleet Fuel'],
    'Facility & Maintenance': ['HVAC Servicing', 'Office Cleaning', 'Electrical Maintenance', 'Plumbing Repairs'],
    'Consulting & Legal': ['Corporate Compliance', 'Tax Filing Retainer', 'Legal Documentation', 'Audit Consultation'],
    'Marketing & Events': ['Digital Advertising', 'Exhibition Stall Setup', 'Merchandise Printing', 'PR Agency Retainer'],
  };

  const startDate = new Date('2025-01-01');
  const endDate = new Date('2026-06-30');
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  while (transactions.length < 1650) {
    const randomDayOffset = Math.floor(Math.random() * totalDays);
    const txDate = new Date(startDate.getTime() + randomDayOffset * 24 * 60 * 60 * 1000);
    const dateStr = txDate.toISOString().split('T')[0]!;
    
    // Normal business hours: 9 AM to 6 PM
    const hour = Math.floor(Math.random() * 9) + 9;
    const min = Math.floor(Math.random() * 60);
    const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:00Z`;

    const v = normalVendors[Math.floor(Math.random() * normalVendors.length)]!;
    const e = normalEmployees[Math.floor(Math.random() * normalEmployees.length)]!;
    const subcats = normalSubcats[v.category_served] || ['General Services'];
    const subcat = subcats[Math.floor(Math.random() * subcats.length)]!;

    // Log-normal amount distribution (Benford-compliant: ₹1,500 to ₹85,000)
    // Most expenses are smaller, few are large
    const logMean = 9.2; // approx ₹10,000
    const logStd = 0.8;
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u1 || 0.001)) * Math.cos(2.0 * Math.PI * u2);
    let amt = Math.round(Math.exp(logMean + z * logStd));
    if (amt < 800) amt = 800 + Math.floor(Math.random() * 1500);
    if (amt > 95000) amt = 95000 - Math.floor(Math.random() * 20000); // stay under threshold for normal

    addTx({
      invoice_number: `INV-${v.category_served.substring(0, 2).toUpperCase()}-${txCounter.toString().padStart(4, '0')}`,
      date: dateStr,
      timestamp: `${dateStr}T${timeStr}`,
      amount: amt,
      category: v.category_served,
      expense_subcategory: subcat,
      description: `Procurement of ${subcat.toLowerCase()} for ${e.department} operations`,
      payment_method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      department: e.department,
      approval_status: 'Approved',
      approver_id: 'EMP-003',
      approver_name: 'Vikram Mehta',
      approver_role: 'Department Manager',
      vendor_id: v.vendor_id,
      vendor_name: v.vendor_name,
      employee_id: e.employee_id,
      employee_name: e.name,
      receipt_available: Math.random() > 0.04, // 96% have receipts
      is_anomaly: false,
    });
  }

  // Calculate vendor summary stats
  vendors.forEach(ven => {
    const vTx = transactions.filter(t => t.vendor_id === ven.vendor_id);
    ven.transaction_count = vTx.length;
    ven.total_spend_inr = vTx.reduce((acc, t) => acc + t.amount, 0);
  });

  console.log(`[Generator] Generated ${transactions.length} total transactions.`);
  const anomalyCount = transactions.filter(t => t.is_anomaly).length;
  console.log(`[Generator] Ground-truth anomalies: ${anomalyCount} (${((anomalyCount / transactions.length) * 100).toFixed(2)}% anomaly rate).`);

  return { vendors, employees, transactions };
};

// Export to file system if run directly
export const saveBenchmarkToDisk = (data: GeneratedData): void => {
  const dirs = [
    fileURLToPath(new URL('../data', import.meta.url)),
    path.resolve(process.cwd(), 'src/data'),
  ];

  dirs.forEach(dataDir => {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(path.join(dataDir, 'benchmark_vendors.json'), JSON.stringify(data.vendors, null, 2));
    fs.writeFileSync(path.join(dataDir, 'benchmark_employees.json'), JSON.stringify(data.employees, null, 2));
    fs.writeFileSync(path.join(dataDir, 'benchmark_transactions.json'), JSON.stringify(data.transactions, null, 2));
    console.log(`[Generator] Exported benchmark datasets to ${dataDir}`);
  });
};
