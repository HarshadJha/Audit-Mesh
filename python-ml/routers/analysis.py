from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from services.benford_law import analyze_benford
from services.isolation_forest import detect_outliers_isolation_forest

router = APIRouter(prefix="/analysis", tags=["Forensic Analysis"])

class BenfordRequest(BaseModel):
    amounts: List[float] = Field(..., description="List of positive transaction amounts")

class TransactionFeature(BaseModel):
    transaction_id: str
    amount: float
    day_of_week: Optional[int] = 0
    hour: Optional[int] = 12
    receipt_available: Optional[bool] = True

class IsolationForestRequest(BaseModel):
    records: List[TransactionFeature]
    contamination: Optional[float] = 0.05

@router.post("/benford")
async def run_benford_analysis(payload: BenfordRequest):
    result = analyze_benford(payload.amounts)
    return result

@router.post("/isolation-forest")
async def run_isolation_forest(payload: IsolationForestRequest):
    records_dict = [rec.model_dump() for rec in payload.records]
    anomalies = detect_outliers_isolation_forest(records_dict, contamination=payload.contamination or 0.05)
    return {
        "total_evaluated": len(payload.records),
        "anomalies_detected": len([r for r in anomalies if r["is_anomaly"]]),
        "results": anomalies
    }
