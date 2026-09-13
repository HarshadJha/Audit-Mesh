from typing import List, Dict, Any
import numpy as np
from sklearn.ensemble import IsolationForest

def detect_outliers_isolation_forest(records: List[Dict[str, Any]], contamination: float = 0.05) -> List[Dict[str, Any]]:
    """
    Performs multi-feature anomaly detection using scikit-learn Isolation Forest.
    Features: [amount, day_of_week, hour, receipt_available]
    """
    if len(records) < 15:
        return [
            {**rec, "is_anomaly": False, "anomaly_score": 0.0}
            for rec in records
        ]

    features = []
    for rec in records:
        amt = float(rec.get("amount", 0.0))
        dow = float(rec.get("day_of_week", 0))
        hour = float(rec.get("hour", 12))
        receipt = 1.0 if rec.get("receipt_available", True) else 0.0
        features.append([amt, dow, hour, receipt])

    X = np.array(features)
    
    # IsolationForest with robust contamination factor
    model = IsolationForest(
        contamination=min(max(contamination, 0.01), 0.20),
        random_state=42
    )
    predictions = model.fit_predict(X) # -1 for anomaly, 1 for inlier
    scores = model.decision_function(X) # lower score = more anomalous

    # Normalize scores: lower decision_function -> higher anomaly confidence
    min_score, max_score = scores.min(), scores.max()
    span = (max_score - min_score) if (max_score != min_score) else 1.0

    results = []
    for i, rec in enumerate(records):
        is_anomaly = bool(predictions[i] == -1)
        normalized_anomaly_score = round(float(1.0 - ((scores[i] - min_score) / span)), 3)
        results.append({
            **rec,
            "is_anomaly": is_anomaly,
            "anomaly_score": normalized_anomaly_score
        })

    return results
