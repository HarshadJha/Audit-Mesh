import { IDetectionRule, DetectionContext, DetectionResult } from './IDetectionRule.js';

export class DetectionRuleRegistry {
  private rules: Map<string, IDetectionRule> = new Map();

  public register(rule: IDetectionRule): void {
    if (this.rules.has(rule.id)) {
      throw new Error(`Detection rule with ID '${rule.id}' is already registered.`);
    }
    this.rules.set(rule.id, rule);
  }

  public getRule(id: string): IDetectionRule | undefined {
    return this.rules.get(id);
  }

  public getAllRules(): IDetectionRule[] {
    return Array.from(this.rules.values());
  }

  public async evaluateAll(context: DetectionContext): Promise<DetectionResult[]> {
    const allResults: DetectionResult[] = [];
    for (const rule of this.rules.values()) {
      try {
        const results = await rule.evaluate(context);
        allResults.push(...results);
      } catch (error) {
        console.error(`[DetectionRegistry] Error evaluating rule ${rule.id}:`, error);
      }
    }
    return allResults;
  }
}

export const globalRuleRegistry = new DetectionRuleRegistry();
