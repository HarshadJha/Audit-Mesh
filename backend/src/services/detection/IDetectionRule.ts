import { RiskLevel } from '../../config/constants.js';

export interface DetectionEvidenceItem {
  key: string;
  label: string;
  value: string | number | boolean;
  notes?: string;
}

export interface DetectionResult {
  ruleId: string;
  ruleName: string;
  severity: RiskLevel;
  confidenceScore: number; // 0.0 to 1.0
  title: string;
  description: string;
  evidence: DetectionEvidenceItem[];
  relatedTransactionIds: string[];
  relatedEntityIds: {
    employeeIds?: string[];
    vendorIds?: string[];
    bankAccounts?: string[];
  };
  recommendedAction: string;
}

export interface DetectionContext<T = unknown> {
  transactions: T[];
  organizationId: string;
  metadata?: Record<string, unknown>;
}

export interface IDetectionRule {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly severity: RiskLevel;
  evaluate(context: DetectionContext): Promise<DetectionResult[]>;
}
