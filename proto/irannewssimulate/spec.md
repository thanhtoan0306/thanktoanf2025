# Iran news map — Product spec

A single **static HTML page** (CSS + vanilla JS, no build step required) that **simulates a news-style timeline on a map of Iran**: the visitor scrubs (or autoplays) across a **fixed calendar window** and sees **where-and-when** regions appear. The page is **read-only** and renders from **bundled JSON** (no live news fetch in v1).

## Time window (fixed project default)

- **Display window**: **2026-02-29 → 2026-04-07** (shown in the chrome).
- **Calendar note**: the year **2026 is not a leap year**, so the timeline **starts on 2026-02-28** while still labeling the window with **29 Feb** for notational alignment with the “29/2” brief.
- **End**: **2026-04-07** inclusive.
- **Slider**: one **day** step from start through end, plus **Play / Pause** (advance one day per tick) and **Reset**.

## Goals

- **Situate stories in space and time** with a **non-interactive** map (see below): the viewer adjusts **time only**, not the basemap.
- **Auto-colored “areas”** per event: a **filled circle** (~tens of km) tinted by the event’s **primary tag**.
- **Labels on the map**: each visible event shows a **short on-map title** with a border color matching its tag.
- **Calm, legible UI**; respect `prefers-reduced-motion` for any motion.
- **Inspectable data**: id, date, coordinates, title, optional region, tags, optional `sourceUrl`.

## Map behavior (locked manual viewport, automatic camera)

- **User cannot pan or zoom manually** the map: no drag, scroll zoom, double-click zoom, box zoom, keyboard zoom, or zoom controls.
- The map **automatically flies** (`flyTo` / `flyToBounds`) so all **currently visible** event circles fit on screen (with padding), with a calm zoom-in / zoom-out as the day or filters change. **No visible events** flies back to the default Iran overview.
- Clicking a **region or list row** selects it and flies to **that circle** (tighter framing). Scrubbing the timeline again reframes **all** visible events.
- Respect **`prefers-reduced-motion`**: flights use **duration** `0`.
- **Basemap**: Leaflet + OSM tiles; attribution retained.

## Event styling

- **Tag → color** (stroke + fill + label border), e.g. politics / economy / protests / diplomacy / other.
- **Region**: `L.circle` in meters (`REGION_RADIUS_M` in config), **clear stroke** (weight 3, opaque line), semi-transparent fill.
- **Label**: `DivIcon` marker with a visible **“Event”** kicker, **full title**, and **date · region**; clicking the circle or label selects the event and triggers a **focus flight** on that area.

## Non-goals

- Live news ingestion, scraping, or official feeds in v1.
- Province GeoJSON choropleths (optional future).
- Accounts or server state.

## Data model (MVP)

| Field | Type | Required |
|-------|------|----------|
| `id` | string | yes |
| `date` | ISO `YYYY-MM-DD` | yes (inside window) |
| `lat` | number | yes |
| `lng` | number | yes |
| `title` | string | yes |
| `region` | string | no |
| `tags` | string[] | no (drives color) |
| `sourceUrl` | string | no |
| `notes` | string | no |

**Seeding**: placeholder titles only; not verified journalism.

## Interaction

- **Scrub date**; **Play / Pause**; **Reset**; **Cumulative vs this-day-only** toggle.
- **Tag filters** (checkboxes).
- **`?date=YYYY-MM-DD`** loads with the playhead on that day if it falls in the window.
- **List + detail panel**: selecting a row updates the detail pane and **flies** to that event’s circle; scrubbing reframes **all** visible events.

## Technical constraints

- Ship as `index.html`, `styles.css`, `app.js`, `data/events.json`, plus embedded JSON fallback in `index.html` for offline `file://` when fetch fails.
- No framework required; Leaflet via CDN.

## Editorial & ethics

- Prefer `sourceUrl` for real deployments; keep demo data obviously synthetic.
- Respect OSM tile terms.

## Success criteria

- Window matches **2026-02-29 → 2026-04-07** in the UI; timeline runs **2026-02-28 … 2026-04-07** without errors.
- Scrubbing shows **at least three** different days with different visible event sets.
- Regions and labels **match tag colors**; user **cannot** pan or wheel-zoom manually; **auto fly** reframes visible data.

## Future extensions

- Optional unlock “explore mode” for pan/zoom.
- GeoJSON provinces, CSV import, FA/EN UI.
