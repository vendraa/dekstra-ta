import sys
from pathlib import Path

import pandas as pd

from utils import (
    METRICS,
    load_metrics,
    calculate_statistics,
)

RENDERINGS = [
    "csr",
    "ssr",
    "ssg",
]


def format_stat(
    metric: str,
    value: float,
) -> str:
    """
    Format angka untuk tabel skripsi.

    CLS      -> 4 digit desimal
    Lainnya  -> 2 digit desimal
    """

    if pd.isna(value):
        return "-"

    if metric == "CLS":
        return f"{value:.4f}"

    return f"{value:.2f}"


def main():
    if len(sys.argv) < 2:
        print(
            "Usage: python analyze-results.py dashboard-warga"
        )
        sys.exit(1)

    test_name = sys.argv[1]

    base_dir = (
        Path("results")
        / test_name
    )

    if not base_dir.exists():
        print(
            f"Folder tidak ditemukan: {base_dir}"
        )
        sys.exit(1)

    rows = []

    for rendering in RENDERINGS:

        csv_file = (
            base_dir
            / rendering
            / "metrics.csv"
        )

        if not csv_file.exists():
            print(
                f"File tidak ditemukan: {csv_file}"
            )
            continue

        df = load_metrics(
            csv_file
        )

        for metric in METRICS:

            stats = calculate_statistics(
                df[metric]
            )

            rows.append(
                {
                    "Rendering":
                        rendering.upper(),

                    "Metric":
                        metric,

                    "Mean":
                        format_stat(
                            metric,
                            stats["mean"]
                        ),

                    "Median":
                        format_stat(
                            metric,
                            stats["median"]
                        ),

                    "StdDev":
                        format_stat(
                            metric,
                            stats["std"]
                        ),
                }
            )

    result_df = pd.DataFrame(rows)

    output_file = (
        base_dir
        / "results.csv"
    )

    result_df.to_csv(
        output_file,
        sep=";",
        index=False
    )

    print(
        f"Statistics saved: {output_file}"
    )


if __name__ == "__main__":
    main()