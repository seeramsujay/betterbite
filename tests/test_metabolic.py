import json
from pathlib import Path

def calculate_metabolic_readiness(sleep_hours, current_heart_rate, daily_steps):
    sleep_score = max(0, min(100, (sleep_hours / 8.0) * 100))
    hr_score = max(0, min(100, ((100 - current_heart_rate) / 40.0) * 100))
    steps_score = max(0, min(100, (daily_steps / 8000.0) * 100))
    score = round((sleep_score * 0.4) + (hr_score * 0.3) + (steps_score * 0.3))
    if score < 55:
        status = "CRITICAL"
    elif score < 75:
        status = "STABLE"
    else:
        status = "OPTIMAL"
    return score, status

def test_optimal_biometrics():
    score, status = calculate_metabolic_readiness(8.0, 60, 8000)
    assert score == 100
    assert status == "OPTIMAL"

def test_critical_biometrics():
    score, status = calculate_metabolic_readiness(4.0, 110, 1000)
    assert score < 55
    assert status == "CRITICAL"

def test_stable_biometrics():
    score, status = calculate_metabolic_readiness(6.5, 75, 5000)
    assert 55 <= score < 75
    assert status == "STABLE"

def test_package_json():
    pkg = json.loads(Path("package.json").read_text())
    assert pkg["name"] == "betterbite"
    assert "scripts" in pkg
