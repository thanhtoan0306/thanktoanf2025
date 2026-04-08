# gomp3 (Audio FFT Spectrum CLI)

CLI tool (Go) that reads an audio file and prints **FFT magnitude bins** per frame.

## Run

```bash
cd proto/gomp3

# WAV
go run . /path/to/input.wav

# MP3
go run . /path/to/input.mp3

# With options
go run . /path/to/input.mp3 -frame=2048 -hop=1024
```

## Flags

- `-frame` (default `1024`): number of samples per FFT frame
- `-hop` (default `512`): step size (samples) between frames

## Output format

```
Frame 1:
[0.1234 0.5678 0.9101 ...]
Frame 2:
[...]
```

- Each `Frame N:` is one FFT window
- Each number is the **magnitude** for a frequency bin

## Notes

- Supported inputs: **`.wav`** and **`.mp3`**
- Other formats can be converted to WAV, e.g.:

```bash
ffmpeg -i input.m4a output.wav
```
