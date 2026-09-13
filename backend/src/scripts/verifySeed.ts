import dotenv from 'dotenv';
import { connectDatabase, disconnectDatabase } from '../config/db.js';
import { Transaction, Vendor, Employee, Investigation, AuditLog } from '../models/index.js';

dotenv.config();

const verify = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/audit_mesh';
  await connectDatabase(uri);

  const txCount = await Transaction.countDocuments();
  const vendorCount = await Vendor.countDocuments();
  const empCount = await Employee.countDocuments();
  const invCount = await Investigation.countDocuments();
  const logCount = await AuditLog.countDocuments();

  console.log('--- MONGODB AUDIT MESH DATA VERIFICATION ---');
  console.log(`Transactions:   ${txCount}`);
  console.log(`Vendors:        ${vendorCount}`);
  console.log(`Employees:      ${empCount}`);
  console.log(`Investigations: ${invCount}`);
  console.log(`Audit Logs:     ${logCount}`);

  // Aggregate anomalies by type
  const anomalyBreakdown = await Transaction.aggregate([
    { $match: { is_anomaly: true } },
    { $group: { _id: '$anomaly_type', count: { $sum: 1 }, total_amount: { $sum: '$amount' } } },
    { $sort: { count: -1 } },
  ]);

  console.log('\n--- ANOMALY PATTERN BREAKDOWN ---');
  let totalAnomalies = 0;
  let totalAnomalyAmount = 0;
  anomalyBreakdown.forEach(item => {
    console.log(`Pattern [${item._id}]: ${item.count} records | ₹${item.total_amount.toLocaleString('en-IN')}`);
    totalAnomalies += item.count;
    totalAnomalyAmount += item.total_amount;
  });

  console.log('---------------------------------');
  console.log(`Total Flagged Anomaly Records: ${totalAnomalies}`);
  console.log(`Total Flagged Exposure Amount: ₹${totalAnomalyAmount.toLocaleString('en-IN')}`);

  await disconnectDatabase();
  process.exit(0);
};

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
