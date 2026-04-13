// Ribose drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.ribose(scene, graphics) => { label }
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function ribose(scene, graphics) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    // Draw near top-right, slightly below benzene/glucose area
    const cx = Math.min(w - 170, 520);
    const cy = Math.max(290, Math.min(330, h * 0.42));

    // 5-member furanose ring (pentagon)
    const R = 36;
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = Phaser.Math.DegToRad(-90 + i * 72);
      pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
    }

    // ring
    graphics.lineStyle(4, 0xffffff, 0.20);
    graphics.beginPath();
    graphics.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < 5; i++) graphics.lineTo(pts[i].x, pts[i].y);
    graphics.closePath();
    graphics.strokePath();

    // atoms
    graphics.fillStyle(0xe6edf7, 0.80);
    for (const p of pts) graphics.fillCircle(p.x, p.y, 8.5);
    graphics.lineStyle(2, 0x8e99ad, 0.25);
    for (const p of pts) graphics.strokeCircle(p.x, p.y, 8.5);

    // oxygen in ring (right-top-ish vertex highlight)
    const oIdx = 1;
    graphics.fillStyle(0xff5b6e, 0.85);
    graphics.fillCircle(pts[oIdx].x, pts[oIdx].y, 8.5);
    graphics.lineStyle(2, 0x401018, 0.35);
    graphics.strokeCircle(pts[oIdx].x, pts[oIdx].y, 8.5);

    // a few OH "sticks"
    const sticks = [
      { i: 0, dx: -18, dy: -16 },
      { i: 2, dx: 18, dy: 12 },
      { i: 3, dx: 0, dy: 20 },
      { i: 4, dx: -18, dy: 10 },
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
      .text(cx - 22, cy + R + 16, "Ribose", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "12px",
        color: "rgba(255,255,255,0.7)",
      })
      .setAlpha(0.9);

    return { label };
  }

  window.MoleculeDraw.ribose = ribose;
})();

