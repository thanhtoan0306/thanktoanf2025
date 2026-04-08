package main

import (
	"encoding/binary"
	"flag"
	"fmt"
	"io"
	"math"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-audio/wav"
	"github.com/hajimehoshi/go-mp3"
	"github.com/madelynnblue/go-dsp/fft"
)

func main() {
	frameSize := flag.Int("frame", 1024, "number of samples per FFT frame")
	hopSize := flag.Int("hop", 512, "advance in samples between consecutive frames")
	flag.Parse()

	args := flag.Args()
	if len(args) < 1 {
		fmt.Fprintln(os.Stderr, "Usage: go run . <path-to-audio>")
		fmt.Fprintln(os.Stderr, "       go run . /path/to/file.wav")
		fmt.Fprintln(os.Stderr, "       go run . /path/to/file.mp3 -frame=1024 -hop=512")
		os.Exit(1)
	}
	if *frameSize < 2 {
		fmt.Fprintln(os.Stderr, "frame must be at least 2")
		os.Exit(1)
	}
	if *hopSize < 1 {
		fmt.Fprintln(os.Stderr, "hop must be at least 1")
		os.Exit(1)
	}

	inputPath := args[0]
	mono, err := loadMonoPCM(inputPath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "%v\n", err)
		os.Exit(1)
	}

	frame := *frameSize
	hop := *hopSize

	frameNum := 1
	for i := 0; i+frame <= len(mono); i += hop {
		samples := mono[i : i+frame]
		result := fft.FFTReal(samples)

		mags := make([]float64, len(result))
		for j, c := range result {
			mags[j] = math.Sqrt(real(c)*real(c) + imag(c)*imag(c))
		}

		fmt.Printf("Frame %d:\n", frameNum)
		fmt.Println(formatFloatSlice(mags))
		frameNum++
	}
}

func loadMonoPCM(path string) ([]float64, error) {
	ext := strings.ToLower(filepath.Ext(path))
	switch ext {
	case ".mp3":
		return decodeMP3Mono(path)
	case ".wav":
		return decodeWAVMono(path)
	default:
		return nil, fmt.Errorf("unsupported extension %q (use .wav or .mp3)", ext)
	}
}

func decodeWAVMono(path string) ([]float64, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer file.Close()

	decoder := wav.NewDecoder(file)
	buf, err := decoder.FullPCMBuffer()
	if err != nil {
		return nil, fmt.Errorf("decode wav: %w", err)
	}

	f32 := buf.AsFloat32Buffer()
	ch := 1
	if f32.Format != nil && f32.Format.NumChannels > 0 {
		ch = int(f32.Format.NumChannels)
	}
	return toMonoFloat64(f32.Data, ch), nil
}

func decodeMP3Mono(path string) ([]float64, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open: %w", err)
	}
	defer file.Close()

	d, err := mp3.NewDecoder(file)
	if err != nil {
		return nil, fmt.Errorf("decode mp3: %w", err)
	}

	pcm, err := io.ReadAll(d)
	if err != nil {
		return nil, fmt.Errorf("read mp3 pcm: %w", err)
	}
	if len(pcm)%4 != 0 {
		return nil, fmt.Errorf("mp3 pcm: unexpected byte length %d", len(pcm))
	}
	n := len(pcm) / 4
	mono := make([]float64, n)
	for i := 0; i < n; i++ {
		off := i * 4
		l := int16(binary.LittleEndian.Uint16(pcm[off : off+2]))
		r := int16(binary.LittleEndian.Uint16(pcm[off+2 : off+4]))
		mono[i] = (float64(l) + float64(r)) / (2 * 32768.0)
	}
	return mono, nil
}

func toMonoFloat64(interleaved []float32, numCh int) []float64 {
	if numCh < 1 {
		numCh = 1
	}
	n := len(interleaved) / numCh
	out := make([]float64, n)
	if numCh == 1 {
		for i := 0; i < n; i++ {
			out[i] = float64(interleaved[i])
		}
		return out
	}
	for i := 0; i < n; i++ {
		var sum float64
		base := i * numCh
		for c := 0; c < numCh; c++ {
			sum += float64(interleaved[base+c])
		}
		out[i] = sum / float64(numCh)
	}
	return out
}

func formatFloatSlice(xs []float64) string {
	if len(xs) == 0 {
		return "[]"
	}
	var b strings.Builder
	b.WriteByte('[')
	for i, x := range xs {
		if i > 0 {
			b.WriteByte(' ')
		}
		fmt.Fprintf(&b, "%.4f", x)
	}
	b.WriteByte(']')
	return b.String()
}
