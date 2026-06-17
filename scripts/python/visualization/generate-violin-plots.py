import sys
from pathlib import Path

import numpy as np
import matplotlib.pyplot as plt

from plot_utils import (
    load_metric_data
)

if len(sys.argv) < 2:
    print(
        "Usage: python generate-violin-plots.py dashboard-warga"
    )
    sys.exit(1)

TEST_NAME = sys.argv[1]

METRICS = [
    "TTFB_ms",
    "FCP_ms",
    "LCP_ms",
    "CLS",
    "TBT_ms"
]

LABELS = [
    "CSR",
    "SSR",
    "SSG"
]

OUTPUT_DIR = (
    Path("results")
    / TEST_NAME
)

OUTPUT_DIR.mkdir(
    parents=True,
    exist_ok=True
)

for metric in METRICS:

    data = load_metric_data(
        TEST_NAME,
        metric
    )

    all_values = np.concatenate(
        data
    )

    #
    # Skip jika seluruh data identik
    #
    if np.std(all_values) == 0:
        print(
            f"Skip {metric}: semua nilai identik"
        )
        continue

    fig, ax = plt.subplots(
        figsize=(10, 6)
    )

    violin = ax.violinplot(
        data,

        showmeans=True,

        showmedians=True,

        showextrema=True
    )

    #
    # Styling violin
    #
    for body in violin["bodies"]:
        body.set_alpha(0.6)

    ax.set_xticks(
        [1, 2, 3]
    )

    ax.set_xticklabels(
        LABELS,
        fontsize=12
    )

    #
    # Dynamic Y Axis
    #
    min_val = np.min(
        all_values
    )

    max_val = np.max(
        all_values
    )

    if min_val == max_val:

        if min_val == 0:
            ax.set_ylim(
                -1,
                1
            )
        else:
            padding = (
                abs(min_val)
                * 0.1
            )

            ax.set_ylim(
                min_val - padding,
                max_val + padding
            )

    else:
        data_range = (
            max_val - min_val
        )

        padding = (
            data_range * 0.15
        )

        ax.set_ylim(
            min_val - padding,
            max_val + padding
        )

    #
    # Label
    #
    if metric == "CLS":
        ylabel = "CLS"
    else:
        ylabel = (
            metric.replace(
                "_ms",
                ""
            )
            + " (ms)"
        )

    ax.set_ylabel(
        ylabel,
        fontsize=14
    )

    ax.set_xlabel(
        "Rendering Strategy",
        fontsize=14
    )

    ax.set_title(
        f"Distribution of {ylabel}",
        fontsize=18,
        pad=10
    )

    ax.grid(
        axis="y",
        linestyle="--",
        alpha=0.4
    )

    plt.tight_layout()

    output_file = (
        OUTPUT_DIR
        / f"{metric.lower()}-violin.png"
    )

    plt.savefig(
        output_file,
        dpi=300,
        bbox_inches="tight"
    )

    plt.close()

    print(
        f"Saved: {output_file}"
    )