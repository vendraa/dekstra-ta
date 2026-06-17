from pathlib import Path

import pandas as pd

RENDERINGS = [
    "csr",
    "ssr",
    "ssg"
]


def load_metric_data(
    test_name,
    metric
):
    data = []

    for rendering in RENDERINGS:

        csv_file = (
            Path("results")
            / test_name
            / rendering
            / "metrics.csv"
        )

        df = pd.read_csv(
            csv_file,
            sep=";"
        )

        data.append(
            df[metric]
        )

    return data