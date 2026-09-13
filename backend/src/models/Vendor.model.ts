import mongoose, { Schema, Document } from 'mongoose';
import { RiskLevel } from '../config/constants.js';

export interface IVendorDocument extends Document {
  vendor_id: string;
  vendor_name: string;
  vendor_address: string;
  vendor_phone: string;
  vendor_email: string;
  vendor_registration: string;
  bank_account: string;
  category_served: string;
  onboarded_date: string;
  risk_score: number;
  risk_level: RiskLevel;
  total_spend_inr: number;
  transaction_count: number;
  is_suspicious: boolean;
  suspicious_reason?: string;
  created_at: Date;
  updated_at: Date;
}

const VendorSchema: Schema = new Schema<IVendorDocument>(
  {
    vendor_id: { type: String, required: true, unique: true, index: true },
    vendor_name: { type: String, required: true, index: true },
    vendor_address: { type: String, required: true },
    vendor_phone: { type: String, required: true },
    vendor_email: { type: String, required: true },
    vendor_registration: { type: String, required: true },
    bank_account: { type: String, required: true, index: true },
    category_served: { type: String, required: true, index: true },
    onboarded_date: { type: String, required: true },
    risk_score: { type: Number, required: true, default: 0, index: true },
    risk_level: {
      type: String,
      required: true,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'LOW',
      index: true,
    },
    total_spend_inr: { type: Number, required: true, default: 0 },
    transaction_count: { type: Number, required: true, default: 0 },
    is_suspicious: { type: Boolean, required: true, default: false, index: true },
    suspicious_reason: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const Vendor = mongoose.model<IVendorDocument>('Vendor', VendorSchema);
