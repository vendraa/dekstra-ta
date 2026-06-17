import pandas as pd

METRICS = [
    "TTFB_ms",
    "FCP_ms",
    "LCP_ms",
    "CLS",
    "TBT_ms"
]


def load_metrics(csv_path):
    return pd.read_csv(
        csv_path,
        sep=";"
    )


def calculate_statistics(values):
    return {
        "mean": values.mean(),
        "median": values.median(),
        "std": values.std()
    }