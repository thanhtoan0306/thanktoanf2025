/**
 * Iran news map prototype — bundled logic (no build step).
 */
(function () {
  "use strict";

  const CONFIG = {
    /** Shown in the toolbar; timeline may start 28 Feb when 29 is not valid. */
    WINDOW_LABEL: { start: "2026-02-29", end: "2026-04-07" },
    START_REQUESTED: "2026-02-29",
    END_DATE: "2026-04-07",
    PLAY_MS: 880,
    IR_BBOX: { minLat: 25, maxLat: 40, minLng: 44, maxLng: 64 },
    REGION_RADIUS_M: 76_000,
    MAP_VIEW: { lat: 32.4, lng: 53.7, zoom: 5 },
    FLY_MS: 900,
    FLY_MAX_ZOOM_ALL: 8,
    FLY_MAX_ZOOM_ONE: 10,
  };

  const TAG_STYLES = {
    politics: { stroke: "#ef9a9a", fill: "#e57373" },
    economy: { stroke: "#90caf9", fill: "#64b5f6" },
    protests: { stroke: "#ffcc80", fill: "#ffb74d" },
    diplomacy: { stroke: "#ce93d8", fill: "#ba68c8" },
    other: { stroke: "#b0bec5", fill: "#90a4ae" },
  };

  const TAGS = Object.keys(TAG_STYLES);

  const el = (id) => document.getElementById(id);

  function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  /**
   * If the label asks for Feb 29 in a non-leap year, use Feb 28 for the timeline anchor.
   */
  function resolveTimelineStart(requestedIso) {
    const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(requestedIso);
    if (!p) return startOfDay(new Date(2026, 1, 28));
    const y = Number(p[1]);
    const mo = Number(p[2]);
    const day = Number(p[3]);
    if (mo === 2 && day === 29) {
      const trial = new Date(y, 1, 29);
      if (trial.getMonth() !== 1) return startOfDay(new Date(y, 1, 28));
    }
    const parsed = parseISODate(requestedIso);
    return parsed ? startOfDay(parsed) : startOfDay(new Date(2026, 1, 28));
  }

  function toISODateLocal(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function parseISODate(s) {
    const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!p) return null;
    const y = Number(p[1]);
    const m = Number(p[2]);
    const d = Number(p[3]);
    return new Date(y, m - 1, d);
  }

  function dayIndexBetween(start, end, d) {
    const ms = 86400000;
    const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const b = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    const c = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
    if (c < a || c > b) return -1;
    return Math.round((c - a) / ms);
  }

  function addDays(start, idx) {
    const t = startOfDay(start);
    t.setDate(t.getDate() + idx);
    return t;
  }

  function daySpanInclusive(start, end) {
    const ms = 86400000;
    const a = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const b = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
    return Math.floor((b - a) / ms) + 1;
  }

  function readQueryDate() {
    const q = new URLSearchParams(window.location.search).get("date");
    if (!q) return null;
    return parseISODate(q);
  }

  function setQueryDate(iso) {
    const u = new URL(window.location.href);
    u.searchParams.set("date", iso);
    window.history.replaceState({}, "", u);
  }

  function validateCoords(ev) {
    const { minLat, maxLat, minLng, maxLng } = CONFIG.IR_BBOX;
    if (ev.lat < minLat || ev.lat > maxLat || ev.lng < minLng || ev.lng > maxLng) {
      console.warn("[iran-newssim] Out of Iran bbox:", ev.id, ev.lat, ev.lng);
    }
  }

  function primaryTag(ev) {
    const t = ev.tags && ev.tags.length ? ev.tags[0] : "other";
    return TAG_STYLES[t] ? t : "other";
  }

  function tagColors(ev) {
    return TAG_STYLES[primaryTag(ev)];
  }

  function motionReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function flyDuration() {
    return motionReduced() ? 0 : CONFIG.FLY_MS / 1000;
  }

  function flyToDefaultView() {
    if (!map) return;
    map.flyTo([CONFIG.MAP_VIEW.lat, CONFIG.MAP_VIEW.lng], CONFIG.MAP_VIEW.zoom, {
      duration: flyDuration(),
    });
  }

  /** Fit all visible event circles (zoom in/out) without user pan/zoom controls. */
  function flyToVisibleAreas(visibleList) {
    if (!map) return;
    if (!visibleList.length) {
      flyToDefaultView();
      return;
    }
    const fg = L.featureGroup();
    visibleList.forEach((ev) => {
      const c = L.circle([ev.lat, ev.lng], { radius: CONFIG.REGION_RADIUS_M });
      c.addTo(fg);
    });
    const bb = fg.getBounds();
    if (!bb.isValid()) return;
    map.flyToBounds(bb.pad(0.14), {
      duration: flyDuration(),
      maxZoom: CONFIG.FLY_MAX_ZOOM_ALL,
      minZoom: 5,
    });
  }

  function flyToCircle(circle) {
    if (!map || !circle) return;
    const bb = circle.getBounds();
    if (!bb.isValid()) return;
    map.flyToBounds(bb.pad(0.11), {
      duration: flyDuration(),
      maxZoom: CONFIG.FLY_MAX_ZOOM_ONE,
      minZoom: 5,
    });
  }

  let events = [];
  let map;
  let markerLayer;
  const markersById = new Map();
  let playTimer = null;
  let dayIndex = 0;
  let dayTotal = 1;
  let startDate;
  let endDate;

  /** @type {'cumulative' | 'exact'} */
  let displayMode = "cumulative";
  const activeTags = new Set(TAGS);

  async function loadEvents() {
    try {
      const res = await fetch("data/events.json", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    } catch (_e) {
      const node = document.getElementById("seed-events");
      if (node && node.textContent.trim()) {
        return JSON.parse(node.textContent);
      }
      throw new Error("No events data (fetch failed and no embedded seed).");
    }
  }

  function filterByTags(list) {
    return list.filter((ev) => {
      const tags = ev.tags && ev.tags.length ? ev.tags : ["other"];
      return tags.some((t) => activeTags.has(t));
    });
  }

  function visibleForPlayhead(all, playhead, mode) {
    const filtered = filterByTags(all);
    const ph = toISODateLocal(playhead);
    if (mode === "exact") {
      return filtered.filter((e) => e.date === ph);
    }
    return filtered.filter((e) => e.date <= ph);
  }

  function renderMarkers(visibleList) {
    markerLayer.clearLayers();
    markersById.clear();

    const group = L.featureGroup();

    visibleList.forEach((ev) => {
      const { stroke, fill } = tagColors(ev);
      const ring = L.circle([ev.lat, ev.lng], {
        radius: CONFIG.REGION_RADIUS_M,
        color: stroke,
        weight: 3,
        opacity: 1,
        fillColor: fill,
        fillOpacity: 0.28,
      });

      const html = `<div class="map-label" style="--lb:${stroke};--lf:${fill}22">
  <span class="map-label-kicker">Event</span>
  <span class="map-label-title">${escapeHtml(ev.title)}</span>
  <span class="map-label-meta">${escapeHtml(ev.date)}${ev.region ? ` · ${escapeHtml(ev.region)}` : ""}</span>
</div>`;
      const icon = L.divIcon({
        className: "map-label-wrap",
        html,
        iconSize: [300, 130],
        iconAnchor: [150, 65],
      });

      const label = L.marker([ev.lat, ev.lng], {
        icon,
        interactive: true,
        keyboard: false,
        zIndexOffset: 400,
      });

      const pick = () => selectEvent(ev.id, { focus: true });
      ring.on("click", pick);
      label.on("click", pick);

      ring.addTo(group);
      label.addTo(group);
      markersById.set(ev.id, { circle: ring, label, event: ev });
    });

    group.addTo(markerLayer);
  }

  function refreshMap() {
    const playhead = addDays(startDate, dayIndex);
    el("date-readout").textContent = toISODateLocal(playhead);
    setQueryDate(toISODateLocal(playhead));

    const vis = visibleForPlayhead(events, playhead, displayMode);
    renderMarkers(vis);
    const prevId =
      document.querySelector('#event-list button[aria-selected="true"]')?.dataset.id ?? null;
    renderList(vis);
    announceCount(vis.length);

    if (prevId && vis.some((e) => e.id === prevId)) selectEvent(prevId, { focus: false });
    else if (vis.length) selectEvent(vis[0].id, { focus: false });
    else {
      el("detail").innerHTML =
        '<h2 class="detail-heading">Selected</h2><p class="placeholder">No events in view for this date and filters.</p>';
    }

    flyToVisibleAreas(vis);
  }

  function announceCount(n) {
    const live = el("aria-live");
    if (live) {
      live.textContent = `${n} event region${n === 1 ? "" : "s"} visible for ${toISODateLocal(addDays(startDate, dayIndex))}.`;
    }
  }

  function selectEvent(id, opts) {
    const options = opts || {};
    const focus = options.focus === true;

    document.querySelectorAll("#event-list button").forEach((b) => {
      b.setAttribute("aria-selected", b.dataset.id === id ? "true" : "false");
    });

    const rec = markersById.get(id);
    const ev = rec ? rec.event : events.find((e) => e.id === id);
    if (!ev) return;

    const panel = el("detail");
    const { stroke, fill } = tagColors(ev);
    const src = ev.sourceUrl
      ? `<p class="meta"><a href="${escapeAttr(ev.sourceUrl)}" rel="noopener noreferrer" target="_blank">Source (example)</a></p>`
      : "";
    const notes = ev.notes ? `<p class="meta">${escapeHtml(ev.notes)}</p>` : "";
    const tags =
      ev.tags && ev.tags.length
        ? `<p class="meta">Tags: ${escapeHtml(ev.tags.join(", "))}</p>`
        : "";

    panel.innerHTML = `
      <h2 class="detail-heading">Selected</h2>
      <p class="title"><span class="detail-swatch" style="background:${fill};box-shadow:0 0 0 2px ${stroke}"></span>${escapeHtml(ev.title)}</p>
      <p class="meta"><span class="list-date">${escapeHtml(ev.date)}</span>${ev.region ? ` · ${escapeHtml(ev.region)}` : ""}</p>
      ${tags}
      ${src}
      ${notes}
    `;

    if (focus && rec && rec.circle) {
      flyToCircle(rec.circle);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function renderList(visibleList) {
    const ul = el("event-list");
    ul.innerHTML = "";
    const sorted = visibleList.slice().sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

    sorted.forEach((ev) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.id = ev.id;
      const { fill, stroke } = tagColors(ev);
      btn.innerHTML = `<span class="list-swatch" style="background:${fill};box-shadow:0 0 0 1px ${stroke}" aria-hidden="true"></span><span class="list-date">${escapeHtml(ev.date)}</span>${escapeHtml(ev.title)}`;
      btn.addEventListener("click", () => selectEvent(ev.id, { focus: true }));
      li.appendChild(btn);
      ul.appendChild(li);
    });
  }

  function stopPlay() {
    if (playTimer) {
      clearInterval(playTimer);
      playTimer = null;
    }
    el("btnPlay").textContent = "Play";
    el("btnPlay").setAttribute("aria-pressed", "false");
  }

  function startPlay() {
    if (playTimer) return;
    el("btnPlay").textContent = "Pause";
    el("btnPlay").setAttribute("aria-pressed", "true");
    playTimer = window.setInterval(() => {
      if (dayIndex >= dayTotal - 1) {
        stopPlay();
        return;
      }
      dayIndex++;
      el("day-slider").value = String(dayIndex);
      refreshMap();
    }, CONFIG.PLAY_MS);
  }

  function wireControls() {
    const slider = el("day-slider");
    slider.addEventListener("input", () => {
      dayIndex = Number(slider.value);
      refreshMap();
    });

    el("btnPlay").addEventListener("click", () => {
      if (playTimer) stopPlay();
      else startPlay();
    });

    el("btnReset").addEventListener("click", () => {
      stopPlay();
      dayIndex = 0;
      slider.value = "0";
      refreshMap();
    });

    document.querySelectorAll('input[name="display-mode"]').forEach((r) => {
      r.addEventListener("change", () => {
        displayMode = el("mode-cumulative").checked ? "cumulative" : "exact";
        refreshMap();
      });
    });

    TAGS.forEach((tag) => {
      const input = document.querySelector(`input[data-tag="${tag}"]`);
      if (!input) return;
      input.addEventListener("change", () => {
        if (input.checked) activeTags.add(tag);
        else activeTags.delete(tag);
        refreshMap();
      });
    });
  }

  function initMap() {
    map = L.map("map", {
      zoomControl: false,
      attributionControl: true,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      tap: false,
    }).setView([CONFIG.MAP_VIEW.lat, CONFIG.MAP_VIEW.lng], CONFIG.MAP_VIEW.zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a>',
    }).addTo(map);

    markerLayer = L.layerGroup().addTo(map);
  }

  async function init() {
    startDate = resolveTimelineStart(CONFIG.START_REQUESTED);
    const endParsed = parseISODate(CONFIG.END_DATE);
    endDate = endParsed ? startOfDay(endParsed) : startOfDay(new Date(2026, 3, 7));

    if (startDate > endDate) {
      console.warn("[iran-newssim] start > end; swapping");
      const t = startDate;
      startDate = endDate;
      endDate = t;
    }

    const raw = await loadEvents();
    events = raw.filter((e) => {
      const ed = parseISODate(e.date);
      if (!ed) return false;
      const ds = toISODateLocal(ed);
      return ds >= toISODateLocal(startDate) && ds <= toISODateLocal(endDate);
    });
    const dropped = raw.length - events.length;
    if (dropped > 0) {
      console.warn(`[iran-newssim] Dropped ${dropped} event(s) outside the visible date window.`);
    }
    if (!events.length) {
      console.warn("[iran-newssim] No events in window; add dates or widen the range.");
    }
    events.forEach(validateCoords);

    dayTotal = daySpanInclusive(startDate, endDate);
    const slider = el("day-slider");
    slider.min = "0";
    slider.max = String(Math.max(0, dayTotal - 1));
    slider.value = "0";

    const qd = readQueryDate();
    if (qd) {
      const idx = dayIndexBetween(startDate, endDate, qd);
      if (idx >= 0) {
        dayIndex = idx;
        slider.value = String(idx);
      }
    }

    el("window-readout").textContent = `${CONFIG.WINDOW_LABEL.start} → ${CONFIG.WINDOW_LABEL.end}`;
    el("window-note").textContent = `Timeline uses ${toISODateLocal(startDate)} as day 0 (2026 is not a leap year). The map still can’t be dragged or wheel-zoomed; it auto-flies to visible event areas.`;

    initMap();
    wireControls();
    refreshMap();
  }

  init().catch((e) => {
    console.error(e);
    el("detail").innerHTML = `<p class="placeholder" style="color:var(--danger)">Could not load data. Serve this folder over HTTP (e.g. <code>python3 -m http.server</code>) or keep embedded JSON.</p>`;
  });
})();
