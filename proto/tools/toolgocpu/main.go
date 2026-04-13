package main

import (
	"context"
	"flag"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
	"github.com/shirou/gopsutil/v3/mem"
)

func formatBytes(b uint64) string {
	const unit = 1024
	if b < unit {
		return fmt.Sprintf("%d B", b)
	}
	div, exp := uint64(unit), 0
	for n := b / unit; n >= unit && exp < 4; n /= unit {
		div *= unit
		exp++
	}
	suffix := []string{"KiB", "MiB", "GiB", "TiB"}[exp]
	return fmt.Sprintf("%.1f %s", float64(b)/float64(div), suffix)
}

func main() {
	interval := flag.Duration("interval", time.Second, "Sampling window: CPU %% is averaged over this duration between updates")
	flag.Parse()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// Prime CPU counters (first Percent(0) compares to boot; second call onward uses last sample).
	if _, err := cpu.Percent(0, false); err != nil {
		fmt.Fprintf(os.Stderr, "cpu: %v\n", err)
		os.Exit(1)
	}
	select {
	case <-ctx.Done():
		return
	case <-time.After(*interval):
	}

	for {
		pcts, err := cpu.Percent(0, false)
		if err != nil {
			fmt.Fprintf(os.Stderr, "cpu: %v\n", err)
			time.Sleep(*interval)
			continue
		}

		vm, err := mem.VirtualMemory()
		if err != nil {
			fmt.Fprintf(os.Stderr, "memory: %v\n", err)
			os.Exit(1)
		}

		var pct float64
		if len(pcts) > 0 {
			pct = pcts[0]
		}

		fmt.Printf("%s  CPU %5.1f%%  |  RAM %s / %s  (%5.1f%% used, %s available)\n",
			time.Now().Format("15:04:05"),
			pct,
			formatBytes(vm.Used),
			formatBytes(vm.Total),
			vm.UsedPercent,
			formatBytes(vm.Available),
		)

		select {
		case <-ctx.Done():
			return
		case <-time.After(*interval):
		}
	}
}
