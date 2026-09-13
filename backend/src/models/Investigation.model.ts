import mongoose, { Schema, Document } from 'mongoose';
import { RiskLevel, InvestigationStatus } from '../config/constants.js';

export interface IInvestigationEvidence {
  key: string;
  label: string;
  value: string | number | boolean;
  notes?: string;
}

export interface IInvestigationDocument extends Document {
  investigation_id: string;
  title: string;
  status: InvestigationStatus;
  severity: RiskLevel;
  risk_score: number;
  primary_entity_type: 'VENDOR' | 'EMPLOYEE' | 'TRANSACTION_CLUSTER';
  primary_entity_id: string;
  primary_entity_name: string;
  rules_triggered: string[];
  total_flagged_amount: number;
  evidence: IInvestigationEvidence[];
  related_transactions: string[];
  auditor_notes?: string;
  assigned_to?: string;
  created_at: Date;
  updated_at: Date;
}

const InvestigationSchema: Schema = new Schema<IInvestigationDocument>(
  {
    investigation_id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['NEW', 'UNDER_REVIEW', 'RESOLVED_CONFIRMED', 'RESOLVED_DISMISSED'],
      default: 'NEW',
      index: true,
    },
    severity: {
      type: String,
      required: true,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'HIGH',
      index: true,
    },
    risk_score: { type: Number, required: true, index: true },
    primary_entity_type: {
      type: String,
      required: true,
      enum: ['VENDOR', 'EMPLOYEE', 'TRANSACTION_CLUSTER'],
      index: true,
    },
    primary_entity_id: { type: String, required: true, index: true },
    primary_entity_name: { type: String, required: true },
    rules_triggered: [{ type: String, required: true }],
    total_flagged_amount: { type: Number, required: true, default: 0 },
    evidence: [
      {
        key: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: Schema.Types.Mixed, required: true },
        notes: { type: String },
      },
    ],
    related_transactions: [{ type: String, required: true }],
    auditor_notes: { type: String },
    assigned_to: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const Investigation = mongoose.model<IInvestigationDocument>('Investigation', InvestigationSchema);
