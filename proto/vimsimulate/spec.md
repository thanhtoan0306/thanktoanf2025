# Vim Simulate — Product spec

A single **static HTML page** (CSS + vanilla JS, no build step required) that **simulates a calm practice session**: someone learning and using basic Vim commands in a terminal-style editor. The experience is tuned to feel like a **soft, satisfying “study with me / coding ASMR”** video: unhurried motion, gentle audio optional, and visuals that do not fight for attention.

## Goals

- **Teach by showing**: visitors see keystrokes, mode changes, and buffer updates in sync—like watching over someone’s shoulder.
- **Relax, not stress**: low contrast, ample whitespace, no flashing ads or aggressive motion.
- **Faithful enough for beginners**: normal mode vs insert, `:w`, simple motions—without implementing a full Vim engine on day one.

## Non-goals

- Full Neovim/Vim parity (plugins, macros, complex `:ex` scripts).
- Real file I/O to the user’s disk (prototype may use in-memory sample text only).
- Account/login or backend.

## Audience

- Curious beginners who want Vim demystified before installing it.
- People who enjoy **slow tutorial / ambient tech** content.

## Core experience

1. **Viewport**: a faux terminal or editor pane (monospace, subtle grid or scanline optional) with a short sample buffer (e.g. a tiny markdown snippet or comment block).
2. **Status line**: mode indicator (`-- INSERT --`, `NORMAL`), optional filename `scratch.txt`, cursor position `Ln, Col`.
3. **Command / echo line**: shows partial command sequences (`d`, `dw`, `:w`) and brief confirmations—mirroring Vim’s bottom area.
4. **Keystroke overlay**: small labels or a “chord stack” that **animates in** when keys fire (fade + slight scale), not a blinking wall of text.
5. **Narrative pacing**: a **scripted scene** (timeline) of scripted keypresses with **adjustable speed** (0.5×–2×) and a **Play / Pause** control for the ASMR-like rhythm.

## Scripted scenes (MVP)

Define **one default scenario** (~60–120s at 1×) that walks through:

| Step | Idea | Example keys / commands |
|------|------|-------------------------|
| 1 | Open buffer, cursor on first line | (initial state) |
| 2 | Move with `h`, `j`, `k`, `l` | single-axis moves with visible pause |
| 3 | Enter insert, type a short word, return to normal | `i` … `Esc` |
| 4 | Word motion | `w`, `b` |
| 5 | Line operations intro | `0`, `$`, `^` |
| 6 | Delete / change (gentle) | `x` or `dw` on safe sample text |
| 7 | Undo / redo feel | `u` (redo optional / simplified) |
| 8 | Save (pretend) | `:w` + Enter, echo “written” without real save |

Each step includes: **delay before**, **key sequence**, **expected buffer delta**, **optional on-screen caption** (“moving down one line with `j`”).

## ASMR / ambience layer

- **Visual**: dark pastel or warm-neutral palette; soft borders; cursor blink slow or subtle block without harsh contrast jumps.
- **Motion**: ease-in-out transitions for cursor jumps; short dwell time after each successful edit so the eye can rest.
- **Audio** (optional, user toggle default **off**): very quiet mechanical or membrane **key clicks**, spatially flat (no jarring stereo pan). Respect **prefers-reduced-motion**: reduce animations and disable non-essential sound.

## Interaction

- **Play / Pause / Restart** the scripted timeline.
- **Speed** slider or presets.
- **Mute** ambient/keyboard audio.
- **Skip to next / previous scene** (optional stretch): useful for repeat viewing.

## Technical constraints

- **Ship as**: `index.html` + embedded or sibling `styles.css` / `app.js` (or one file if preferred).
- **No frameworks required** for MVP; small state machine for “mode” + “cursor” + “buffer string” is enough.
- **Accessibility**: keyboard focus visible on controls; sufficient color contrast for body text; reduced-motion path as above.

## Success criteria (prototype)

- A first-time visitor understands **normal vs insert** and sees **at least five distinct motions/commands** without reading external docs.
- The page feels **intentionally slow and calm** at default speed—not sluggish, but never frantic.
- Works in current Chrome, Firefox, and Safari without a build step.

## Future extensions (out of scope for spec only)

- User-driven “free practice” mode with the same faux editor.
- Multiple scenarios (delete inside quotes, visual line mode).
- Export script as shareable JSON for custom ASMR-style runs.
