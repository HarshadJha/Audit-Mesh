import mongoose, { Schema, Document } from 'mongoose';

export interface ITransactionDocument extends Document {
  transaction_id: string;
  invoice_number: string;
  date: string;
  timestamp: string;
  amount: number;
  category: string;
  expense_subcategory: string;
  description: string;
  payment_method: 'Bank Transfer' | 'Cash' | 'Corporate Card';
  department: 'Finance' | 'IT' | 'Operations' | 'HR' | 'Sales' | 'Procurement';
  approval_status: 'Approved' | 'Pending' | 'Rejected';
  approver_id: string;
  approver_name: string;
  approver_role: string;
  vendor_id: string;
  vendor_name: string;
  employee_id: string;
  employee_name: string;
  receipt_available: boolean;
  notes?: string;
  is_anomaly: boolean;
  anomaly_type?: string;
  ground_truth_reason?: string;
  created_at: Date;
}

const TransactionSchema: Schema = new Schema<ITransactionDocument>(
  {
    transaction_id: { type: String, required: true, unique: true, index: true },
    invoice_number: { type: String, required: true, index: true },
    date: { type: String, required: true, index: true },
    timestamp: { type: String, required: true, index: true },
    amount: { type: Number, required: true, index: true },
    category: { type: String, required: true, index: true },
    expense_subcategory: { type: String, required: true },
    description: { type: String, required: true },
    payment_method: {
      type: String,
      required: true,
      enum: ['Bank Transfer', 'Cash', 'Corporate Card'],
    },
    department: {
      type: String,
      required: true,
      enum: ['Finance', 'IT', 'Operations', 'HR', 'Sales', 'Procurement'],
      index: true,
    },
    approval_status: {
      type: String,
      required: true,
      enum: ['Approved', 'Pending', 'Rejected'],
      default: 'Approved',
      index: true,
    },
    approver_id: { type: String, required: true, index: true },
    approver_name: { type: String, required: true },
    approver_role: { type: String, required: true },
    vendor_id: { type: String, required: true, index: true },
    vendor_name: { type: String, required: true },
    employee_id: { type: String, required: true, index: true },
    employee_name: { type: String, required: true },
    receipt_available: { type: Boolean, required: true, default: true },
    notes: { type: String },
    is_anomaly: { type: Boolean, required: true, default: false, index: true },
    anomaly_type: { type: String, index: true },
    ground_truth_reason: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

TransactionSchema.index({ vendor_id: 1, invoice_number: 1 });
TransactionSchema.index({ employee_id: 1, date: 1 });
TransactionSchema.index({ employee_id: 1, vendor_id: 1 });

export const Transaction = mongoose.model<ITransactionDocument>('Transaction', TransactionSchema);
