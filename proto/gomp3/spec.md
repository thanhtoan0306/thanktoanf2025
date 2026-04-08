# Audio FFT Spectrum CLI (Go)

## Overview

This project is a **command-line tool written in Go** that analyzes an audio file and outputs its **Frequency Spectrum (FFT)**.

It focuses on one core idea:

> Convert audio → frequency bins → intensity values

---

## Feature

### Frequency Spectrum (FFT)

* Real-time (stream-based) or frame-based analysis
* Each output value represents a **frequency bin**
* Magnitude = intensity of that frequency

---

## Concept

### What is happening

```
Audio Signal (time domain)
 → Frame slicing
 → FFT
 → Frequency bins
 → Magnitude extraction
 → Output (CLI)
```

---

### Interpretation

* Each bin = one frequency range
* Higher magnitude = stronger presence
* Output = snapshot of sound structure

---

## CLI Usage

```bash
go run main.go input.wav
```

Optional flags:

```bash
-go run main.go input.wav -frame=1024 -hop=512
```

---

## Output Example

```
Frame 1:
[0.12 0.45 0.78 0.22 0.05 ...]

Frame 2:
[0.10 0.40 0.80 0.30 0.07 ...]
```

Each line = one time frame
Each value = intensity of a frequency bin

---

## Core Dependencies

* Standard Go libraries
* Optional:

  * github.com/go-audio/wav (read WAV)
  * github.com/mjibson/go-dsp/fft (FFT)

---

## Minimal Implementation (main.go)

```go
package main

import (
	"fmt"
	"os"

	"github.com/go-audio/wav"
	"github.com/mjibson/go-dsp/fft"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go input.wav")
		return
	}

	file, err := os.Open(os.Args[1])
	if err != nil {
		panic(err)
	}
	defer file.Close()

	decoder := wav.NewDecoder(file)
	buf, err := decoder.FullPCMBuffer()
	if err != nil {
		panic(err)
	}

	data := buf.AsFloat32Buffer().Data

	frameSize := 1024

	for i := 0; i+frameSize < len(data); i += frameSize {
		frame := data[i : i+frameSize]

		// FFT
		result := fft.FFTReal(frame)

		// Magnitude
		mags := make([]float64, len(result))
		for j, c := range result {
			mags[j] = real(c)*real(c) + imag(c)*imag(c)
		}

		fmt.Println(mags[:20]) // print first 20 bins
	}
}
```

---

## Notes

* Input should be `.wav` (PCM)
* For `.mp3`, convert first using:

```bash
ffmpeg -i input.mp3 output.wav
```

---

## Limitations

* No visualization (CLI only)
* No normalization
* Basic magnitude (not log-scaled)

---

## Extensions

* Log scale (dB)
* Peak frequency detection
* Real-time microphone input
* Pipe output → graph tool
* Save as CSV

---

## Summary

This tool reduces audio analysis to its core:

* Audio → FFT → frequency bins
* Each bin = intensity of a frequency
* CLI = raw structural output

A minimal system for inspecting the **frequency structure of sound**.
