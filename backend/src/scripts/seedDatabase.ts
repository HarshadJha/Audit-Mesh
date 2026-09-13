import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { Transaction, Vendor, Employee, Investigation, AuditLog } from '../models/index.js';
import { generateSyntheticBenchmark, saveBenchmarkToDisk } from './generateSyntheticData.js';

dotenv.config();

const seed = async () => {
  console.log('====================================================');
  console.log('         AUDIT MESH — DATABASE SEEDER               ');
  console.log('====================================================');

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/audit_mesh';
  console.log(`[Seeder] Connecting to MongoDB: ${uri}`);
  
  await connectDatabase(uri);

  // 1. Generate in-memory benchmark data & save static artifacts
  const data = generateSyntheticBenchmark();
  saveBenchmarkToDisk(data);

  // 2. Clear existing collections
  console.log('[Seeder] Clearing old collections...');
  await Transaction.deleteMany({});
  await Vendor.deleteMany({});
  await Employee.deleteMany({});
  await Investigation.deleteMany({});
  await AuditLog.deleteMany({});

  // 3. Bulk insert entities
  console.log(`[Seeder] Inserting ${data.vendors.length} vendors...`);
  await Vendor.insertMany(data.vendors);

  console.log(`[Seeder] Inserting ${data.employees.length} employees...`);
  await Employee.insertMany(data.employees);

  console.log(`[Seeder] Inserting ${data.transactions.length} transactions...`);
  await Transaction.insertMany(data.transactions);

  // 4. Generate Initial High-Priority Investigations from Ground Truth Anomalies
  console.log('[Seeder] Generating baseline forensic investigations...');
  const investigationsToCreate = [
    {
      investigation_id: 'INV-CASE-001',
      title: 'Circular Relationship & Vendor Favoritism: Rohan Verma ↔ Verma Digital',
      status: 'UNDER_REVIEW' as const,
      severity: 'CRITICAL' as const,
      risk_score: 94,
      primary_entity_type: 'VENDOR' as const,
      primary_entity_id: 'VEN-010',
      primary_entity_name: 'Verma Digital Solutions LLP',
      rules_triggered: ['CIRCULAR_RELATIONSHIP', 'VENDOR_FAVORITISM'],
      total_flagged_amount: 1420000,
      evidence: [
        { key: 'SHARED_ADDRESS', label: 'Matching Address', value: 'Flat 204, Sea Breeze Apts, Bandra West, Mumbai', notes: 'Matches residential address of Rohan Verma (EMP-006)' },
        { key: 'SHARED_PHONE', label: 'Matching Phone', value: '+91 98204 11223', notes: 'Exact match with procurement officer phone' },
        { key: 'CONCENTRATION_RATIO', label: 'Vendor Concentration', value: '87.4%', notes: 'Over 85% of department IT maintenance steered to this vendor' },
      ],
      related_transactions: data.transactions.filter(t => t.vendor_id === 'VEN-010').map(t => t.transaction_id).slice(0, 10),
      auditor_notes: 'High probability of kickback arrangement or undisclosed conflict of interest.',
      assigned_to: 'EMP-001',
    },
    {
      investigation_id: 'INV-CASE-002',
      title: 'Shadow Vendor Ring: Shared Bank Account (VEN-011 & VEN-012)',
      status: 'NEW' as const,
      severity: 'HIGH' as const,
      risk_score: 88,
      primary_entity_type: 'VENDOR' as const,
      primary_entity_id: 'VEN-011',
      primary_entity_name: 'Sahyadri Enterprise Supply Hub',
      rules_triggered: ['SHARED_BANK_ACCOUNT'],
      total_flagged_amount: 570000,
      evidence: [
        { key: 'SHARED_BANK_ACC', label: 'Shared Account #', value: 'PUNB0007777888', notes: 'Identical bank account used by Konkan Global Traders (VEN-012)' },
        { key: 'CO_ENTITY', label: 'Linked Entity', value: 'Konkan Global Traders (VEN-012)', notes: 'Bidding concurrently for office supplies' },
      ],
      related_transactions: data.transactions.filter(t => t.vendor_id === 'VEN-011' || t.vendor_id === 'VEN-012').map(t => t.transaction_id).slice(0, 8),
      auditor_notes: 'Potential bid-rigging or sole-source evasion via dual corporate registration.',
      assigned_to: 'EMP-003',
    },
    {
      investigation_id: 'INV-CASE-003',
      title: 'Purchase Splitting Evasion: Modular IT Hardware (5 Clusters)',
      status: 'UNDER_REVIEW' as const,
      severity: 'HIGH' as const,
      risk_score: 85,
      primary_entity_type: 'TRANSACTION_CLUSTER' as const,
      primary_entity_id: 'CLUSTER-SPLIT-01',
      primary_entity_name: 'TechLogix PO Structuring',
      rules_triggered: ['SPLIT_PURCHASE', 'APPROVAL_THRESHOLD_EVASION'],
      total_flagged_amount: 1380000,
      evidence: [
        { key: 'THRESHOLD_LIMIT', label: 'Policy Approval Limit', value: '₹1,00,000 INR', notes: 'VP signoff required above ₹1,00,000' },
        { key: 'SPLIT_TRANSACTIONS', label: 'Structured POs', value: '15 transactions', notes: 'Individual amounts ₹89,500 - ₹94,500 issued within 5-day windows' },
      ],
      related_transactions: data.transactions.filter(t => t.anomaly_type === 'SPLIT_PURCHASE').map(t => t.transaction_id),
      auditor_notes: 'Transactions structured just beneath the ₹1,00,000 limit to bypass CFO approval.',
      assigned_to: 'EMP-001',
    },
    {
      investigation_id: 'INV-CASE-004',
      title: 'Expense Inflation Creep: Karan Johar (Cab transit to Airport)',
      status: 'NEW' as const,
      severity: 'MEDIUM' as const,
      risk_score: 74,
      primary_entity_type: 'EMPLOYEE' as const,
      primary_entity_id: 'EMP-008',
      primary_entity_name: 'Karan Johar',
      rules_triggered: ['EXPENSE_INFLATION'],
      total_flagged_amount: 38500,
      evidence: [
        { key: 'HISTORICAL_BASELINE', label: 'Jan 2025 Fare', value: '₹450 INR', notes: 'Market standard for Office to Airport route' },
        { key: 'CURRENT_CLAIM', label: 'Jun 2026 Claim', value: '₹3,100 INR', notes: 'Inflated by 6.8x without route alteration' },
        { key: 'MISSING_RECEIPTS', label: 'Receipts Omitted', value: '12 consecutive claims', notes: 'Receipt verification missing for elevated claims' },
      ],
      related_transactions: data.transactions.filter(t => t.employee_id === 'EMP-008' && t.is_anomaly).map(t => t.transaction_id),
      auditor_notes: 'Systematic upward creeping of cab fare reimbursements over 18 months.',
      assigned_to: 'EMP-005',
    },
  ];

  await Investigation.insertMany(investigationsToCreate);
  console.log(`[Seeder] Created ${investigationsToCreate.length} active forensic investigations.`);

  // 5. Initial Audit Log Entry
  await AuditLog.create({
    log_id: `LOG-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor_id: 'SYSTEM_ADMIN',
    actor_name: 'System Seeder',
    action: 'SEED_BENCHMARK_DATASET',
    entity_type: 'SYSTEM',
    entity_id: 'DATABASE',
    details: `Seeded ${data.transactions.length} transactions, ${data.vendors.length} vendors, ${data.employees.length} employees with 13 micro-corruption patterns.`,
  });

  console.log('====================================================');
  console.log('        DATABASE SEEDING COMPLETED SUCCESSFULLY     ');
  console.log('====================================================');

  await disconnectDatabase();
  process.exit(0);
};

seed().catch(err => {
  console.error('[Seeder] Fatal error during database seeding:', err);
  process.exit(1);
});
