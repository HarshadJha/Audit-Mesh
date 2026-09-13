export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type InvestigationStatus = 'NEW' | 'UNDER_REVIEW' | 'RESOLVED_CONFIRMED' | 'RESOLVED_DISMISSED';

export interface IEvidenceItem {
  key: string;
  label: string;
  value: string | number | boolean;
  notes?: string;
}

export interface IInvestigation {
  id: string;
  title: string;
  status: InvestigationStatus;
  severity: RiskLevel;
  riskScore: number; // 0 - 100
  primaryEntityType: 'VENDOR' | 'EMPLOYEE' | 'TRANSACTION_CLUSTER';
  primaryEntityId: string;
  primaryEntityName: string;
  detectedAt: string;
  ruleTriggered: string;
  description: string;
  totalFlaggedAmountINR: number;
  evidence: IEvidenceItem[];
  auditorNotes?: string;
}

export interface ITransaction {
  transaction_id: string;
  invoice_number: string;
  date: string;
  timestamp: string;
  amount: number;
  category: string;
  expense_subcategory: string;
  description: string;
  payment_method: string;
  department: string;
  approval_status: 'Approved' | 'Pending' | 'Rejected';
  approver_id: string;
  approver_name?: string;
  vendor_id: string;
  vendor_name?: string;
  employee_id: string;
  employee_name?: string;
  receipt_available: boolean;
  is_flagged?: boolean;
}

export interface IVendor {
  vendor_id: string;
  vendor_name: string;
  vendor_address: string;
  vendor_phone: string;
  bank_account: string;
  category_served: string;
  risk_score: number;
  risk_level: RiskLevel;
  total_spend_inr: number;
  transaction_count: number;
}
