import math
from typing import List, Dict, Any
from scipy import stats

BENFORD_EXPECTED = {
    1: 0.301,
    2: 0.176,
    3: 0.125,
    4: 0.097,
    5: 0.079,
    6: 0.067,
    7: 0.058,
    8: 0.051,
    9: 0.046
}

def analyze_benford(amounts: List[float]) -> Dict[str, Any]:
    """
    Evaluates first-digit distribution of financial transaction amounts
    against Benford's Law using Chi-Square Goodness-of-Fit test.
    """
    if len(amounts) < 10:
        return {
            "eligible": False,
            "reason": "Insufficient sample size (minimum 10 required)",
            "sample_size": len(amounts),
            "is_anomaly": False,
            "p_value": 1.0,
            "chi_square_stat": 0.0,
            "digit_distribution": {}
        }

    counts = {d: 0 for d in range(1, 10)}
    valid_count = 0
    round_numbers_count = 0

    for amt in amounts:
        if amt <= 0:
            continue
        valid_count += 1
        # Check round number (divisible by 1000)
        if amt >= 1000 and amt % 1000 == 0:
            round_numbers_count += 1

        first_digit = int(str(amt).replace(".", "").lstrip("0")[0])
        if 1 <= first_digit <= 9:
            counts[first_digit] += 1

    if valid_count < 10:
        return {
            "eligible": False,
            "reason": "Insufficient positive transaction values",
            "sample_size": valid_count,
            "is_anomaly": False,
            "p_value": 1.0,
            "chi_square_stat": 0.0,
            "digit_distribution": {}
        }

    observed_frequencies = [counts[d] for d in range(1, 10)]
    expected_frequencies = [BENFORD_EXPECTED[d] * valid_count for d in range(1, 10)]

    # Chi-Square Goodness-of-Fit
    chi2_stat, p_value = stats.chisquare(f_obs=observed_frequencies, f_exp=expected_frequencies)

    distribution_report = {
        str(d): {
            "observed_count": counts[d],
            "observed_percentage": round((counts[d] / valid_count) * 100, 2),
            "expected_percentage": round(BENFORD_EXPECTED[d] * 100, 2)
        }
        for d in range(1, 10)
    }

    round_ratio = round((round_numbers_count / valid_count) * 100, 2)
    # p_value < 0.05 indicates statistically significant non-conformance
    is_anomaly = bool(p_value < 0.05 or round_ratio > 25.0)

    return {
        "eligible": True,
        "sample_size": valid_count,
        "chi_square_stat": round(float(chi2_stat), 4),
        "p_value": round(float(p_value), 6),
        "round_amount_percentage": round_ratio,
        "is_anomaly": is_anomaly,
        "confidence": round(1.0 - min(float(p_value), 1.0), 3) if is_anomaly else 0.0,
        "digit_distribution": distribution_report
    }
