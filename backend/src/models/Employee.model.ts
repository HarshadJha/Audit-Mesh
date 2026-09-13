import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployeeDocument extends Document {
  employee_id: string;
  name: string;
  role: 'Accountant' | 'Procurement Officer' | 'Department Manager' | 'VP Operations' | 'CFO' | 'Employee';
  department: 'Finance' | 'IT' | 'Operations' | 'HR' | 'Sales' | 'Procurement';
  address: string;
  phone: string;
  email: string;
  manager_id?: string;
  hire_date: string;
  created_at: Date;
  updated_at: Date;
}

const EmployeeSchema: Schema = new Schema<IEmployeeDocument>(
  {
    employee_id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    role: {
      type: String,
      required: true,
      enum: ['Accountant', 'Procurement Officer', 'Department Manager', 'VP Operations', 'CFO', 'Employee'],
      index: true,
    },
    department: {
      type: String,
      required: true,
      enum: ['Finance', 'IT', 'Operations', 'HR', 'Sales', 'Procurement'],
      index: true,
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    manager_id: { type: String },
    hire_date: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

export const Employee = mongoose.model<IEmployeeDocument>('Employee', EmployeeSchema);
