import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLogDocument extends Document {
  log_id: string;
  timestamp: string;
  actor_id: string;
  actor_name: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: string;
  previous_state?: string;
  new_state?: string;
  created_at: Date;
}

const AuditLogSchema: Schema = new Schema<IAuditLogDocument>(
  {
    log_id: { type: String, required: true, unique: true, index: true },
    timestamp: { type: String, required: true, index: true },
    actor_id: { type: String, required: true, index: true },
    actor_name: { type: String, required: true },
    action: { type: String, required: true, index: true },
    entity_type: { type: String, required: true, index: true },
    entity_id: { type: String, required: true, index: true },
    details: { type: String, required: true },
    previous_state: { type: String },
    new_state: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: false },
  }
);

export const AuditLog = mongoose.model<IAuditLogDocument>('AuditLog', AuditLogSchema);
