// Glucose drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.glucose(scene, graphics) => { label }
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function hexagonPoints(cx, cy, r, rotDeg) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Phaser.Math.DegToRad(rotDeg + i * 60);
      pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
    }
    return pts;
  }

  function drawHexagon(graphics, pts) {
    graphics.beginPath();
    graphics.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) graphics.lineTo(pts[i].x, pts[i].y);
    graphics.closePath();
    graphics.strokePath();
  }

  // Cartoon: glucose in a pyranose (6-member) ring with a few OH "sticks".
  function glucose(scene, graphics) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    const cx = Math.min(w - 180, 520);
    const cy = Math.max(170, Math.min(230, h * 0.28));
    const R = 44;
    const pts = hexagonPoints(cx, cy, R, -90);

    // ring
    graphics.lineStyle(4, 0xffffff, 0.20);
    drawHexagon(graphics, pts);

    // atoms (vertices)
    graphics.fillStyle(0xe6edf7, 0.80);
    for (const p of pts) graphics.fillCircle(p.x, p.y, 9);
    graphics.lineStyle(2, 0x8e99ad, 0.25);
    for (const p of pts) graphics.strokeCircle(p.x, p.y, 9);

    // oxygen in ring (top-right vertex highlight)
    const oIdx = 1;
    graphics.fillStyle(0xff5b6e, 0.85);
    graphics.fillCircle(pts[oIdx].x, pts[oIdx].y, 9);
    graphics.lineStyle(2, 0x401018, 0.35);
    graphics.strokeCircle(pts[oIdx].x, pts[oIdx].y, 9);

    // simple substituents (OH) as small sticks
    const sticks = [
      { i: 0, dx: -18, dy: -18 },
      { i: 2, dx: 20, dy: 10 },
      { i: 3, dx: 0, dy: 22 },
      { i: 4, dx: -20, dy: 10 },
      { i: 5, dx: -22, dy: -4 },
    ];
    graphics.lineStyle(3, 0x78e3ff, 0.18);
    for (const s of sticks) {
      const p = pts[s.i];
      graphics.beginPath();
      graphics.moveTo(p.x, p.y);
      graphics.lineTo(p.x + s.dx, p.y + s.dy);
      graphics.strokePath();
      graphics.fillStyle(0xffffff, 0.18);
      graphics.fillCircle(p.x + s.dx, p.y + s.dy, 6);
    }

    const label = scene.add
      .text(cx - 28, cy + R + 18, "Glucose", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "12px",
        color: "rgba(255,255,255,0.7)",
      })
      .setAlpha(0.9);

    return { label };
  }

  window.MoleculeDraw.glucose = glucose;
})();

