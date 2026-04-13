use std::cmp::max;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::Arc;
use std::time::Duration;

use chrono::Local;
use clap::Parser;
use sysinfo::{
    CpuRefreshKind, MemoryRefreshKind, RefreshKind, System, MINIMUM_CPU_UPDATE_INTERVAL,
};

fn format_bytes(b: u64) -> String {
    const SUFFIX: [&str; 5] = ["B", "KiB", "MiB", "GiB", "TiB"];
    let mut v = b as f64;
    let mut i = 0;
    while v >= 1024.0 && i < SUFFIX.len() - 1 {
        v /= 1024.0;
        i += 1;
    }
    if i == 0 {
        format!("{b} {}", SUFFIX[0])
    } else {
        format!("{:.1} {}", v, SUFFIX[i])
    }
}

fn parse_humantime(s: &str) -> Result<Duration, String> {
    humantime::parse_duration(s).map_err(|e| e.to_string())
}

#[derive(Parser, Debug)]
#[command(about = "Watch CPU and RAM usage (sysinfo)")]
struct Cli {
    /// Time between samples (e.g. 1s, 500ms). CPU usage is measured over each interval.
    #[arg(short, long, default_value = "1s", value_parser = parse_humantime)]
    interval: Duration,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();
    let interval = max(cli.interval, MINIMUM_CPU_UPDATE_INTERVAL);

    let running = Arc::new(AtomicBool::new(true));
    let r = running.clone();
    ctrlc::set_handler(move || {
        r.store(false, Ordering::SeqCst);
    })?;

    let mut sys = System::new_with_specifics(
        RefreshKind::new()
            .with_cpu(CpuRefreshKind::new().with_cpu_usage())
            .with_memory(MemoryRefreshKind::new().with_ram()),
    );

    sys.refresh_cpu_usage();
    sleep_interruptible(&running, interval);
    if !running.load(Ordering::SeqCst) {
        return Ok(());
    }

    while running.load(Ordering::SeqCst) {
        sys.refresh_cpu_usage();
        sys.refresh_memory();

        let cpu = sys.global_cpu_usage();
        let total = sys.total_memory();
        let used = sys.used_memory();
        let avail = sys.available_memory();
        let used_pct = if total > 0 {
            100.0 * (used as f64 / total as f64)
        } else {
            0.0
        };

        println!(
            "{}  CPU {:5.1}%  |  RAM {} / {}  ({:5.1}% used, {} available)",
            Local::now().format("%H:%M:%S"),
            cpu,
            format_bytes(used),
            format_bytes(total),
            used_pct,
            format_bytes(avail),
        );

        sleep_interruptible(&running, interval);
    }

    Ok(())
}

fn sleep_interruptible(running: &Arc<AtomicBool>, dur: Duration) {
    let step = Duration::from_millis(100);
    let mut left = dur;
    while left > Duration::ZERO && running.load(Ordering::SeqCst) {
        let s = step.min(left);
        std::thread::sleep(s);
        left = left.saturating_sub(s);
    }
}
