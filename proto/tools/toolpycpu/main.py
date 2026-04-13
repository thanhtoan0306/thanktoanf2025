#!/usr/bin/env python3
"""Watch CPU and RAM usage (psutil)."""

from __future__ import annotations

import argparse
import signal
import sys
import time
from datetime import datetime

import psutil


def format_bytes(b: int) -> str:
    unit = 1024
    if b < unit:
        return f"{b} B"
    div = unit
    exp = 0
    n = b // unit
    while n >= unit and exp < 4:
        div *= unit
        exp += 1
        n //= unit
    suffix = ("KiB", "MiB", "GiB", "TiB")[exp]
    return f"{b / div:.1f} {suffix}"


def parse_duration(spec: str) -> float:
    """Parse a duration into seconds (e.g. 500ms, 1s, 1.5s, 2m, 1h). Plain numbers are seconds."""
    s = spec.strip().lower()
    if s.endswith("ms"):
        return float(s[:-2]) / 1000.0
    if s.endswith("s") and not s.endswith("ms"):
        return float(s[:-1])
    if s.endswith("m") and not s.endswith("ms"):
        return float(s[:-1]) * 60.0
    if s.endswith("h"):
        return float(s[:-1]) * 3600.0
    return float(s)


def main() -> None:
    p = argparse.ArgumentParser(description="Watch CPU and RAM usage")
    p.add_argument(
        "-i",
        "--interval",
        default="1s",
        metavar="DURATION",
        help="Sampling window: CPU %% is averaged over this duration between updates (default: 1s)",
    )
    args = p.parse_args()
    try:
        interval = parse_duration(args.interval)
    except ValueError as e:
        print(f"invalid interval: {args.interval!r} ({e})", file=sys.stderr)
        sys.exit(2)
    if interval <= 0:
        print("interval must be positive", file=sys.stderr)
        sys.exit(2)

    stop = False

    def _stop(_sig=None, _frame=None) -> None:
        nonlocal stop
        stop = True

    signal.signal(signal.SIGINT, _stop)
    if hasattr(signal, "SIGTERM"):
        signal.signal(signal.SIGTERM, _stop)

    # Prime CPU counters (first cpu_percent compares to boot; later calls use last sample).
    try:
        psutil.cpu_percent(interval=None)
    except Exception as e:
        print(f"cpu: {e}", file=sys.stderr)
        sys.exit(1)

    end = time.monotonic() + interval
    while not stop and time.monotonic() < end:
        time.sleep(min(0.05, end - time.monotonic()))

    while not stop:
        try:
            pct = psutil.cpu_percent(interval=None)
        except Exception as e:
            print(f"cpu: {e}", file=sys.stderr)
            time.sleep(interval)
            continue

        try:
            vm = psutil.virtual_memory()
        except Exception as e:
            print(f"memory: {e}", file=sys.stderr)
            sys.exit(1)

        ts = datetime.now().strftime("%H:%M:%S")
        print(
            f"{ts}  CPU {pct:5.1f}%  |  RAM {format_bytes(vm.used)} / {format_bytes(vm.total)}  "
            f"({vm.percent:5.1f}% used, {format_bytes(vm.available)} available)"
        )

        end = time.monotonic() + interval
        while not stop and time.monotonic() < end:
            time.sleep(min(0.05, end - time.monotonic()))


if __name__ == "__main__":
    main()
