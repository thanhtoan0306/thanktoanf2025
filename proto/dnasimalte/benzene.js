// Benzene drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.benzene(scene, graphics) => { label }
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function benzene(scene, graphics) {
    // Draw near top-right-ish area, away from CO2 label.
    const w = scene.scale.width;
    const cx = Math.min(w - 170, 520);
    const cy = 90;

    const R = 42; // ring radius
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Phaser.Math.DegToRad(-90 + i * 60);
      pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
    }

    // Ring outline
    graphics.lineStyle(4, 0xffffff, 0.22);
    graphics.beginPath();
    graphics.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < 6; i++) graphics.lineTo(pts[i].x, pts[i].y);
    graphics.closePath();
    graphics.strokePath();

    // Alternating double bonds (inside, slightly inset)
    const inset = 8;
    function insetPoint(p) {
      const v = new Phaser.Math.Vector2(p.x - cx, p.y - cy).normalize().scale(R - inset);
      return { x: cx + v.x, y: cy + v.y };
    }
    const ip = pts.map(insetPoint);

    graphics.lineStyle(3, 0xb9c6ff, 0.55);
    graphics.beginPath();
    // bonds: 0-1, 2-3, 4-5 (alternating)
    graphics.moveTo(ip[0].x, ip[0].y);
    graphics.lineTo(ip[1].x, ip[1].y);
    graphics.moveTo(ip[2].x, ip[2].y);
    graphics.lineTo(ip[3].x, ip[3].y);
    graphics.moveTo(ip[4].x, ip[4].y);
    graphics.lineTo(ip[5].x, ip[5].y);
    graphics.strokePath();

    // Carbon atoms at vertices
    const rC = 10;
    graphics.fillStyle(0xe6edf7, 0.85);
    for (const p of pts) graphics.fillCircle(p.x, p.y, rC);
    graphics.lineStyle(2, 0x8e99ad, 0.28);
    for (const p of pts) graphics.strokeCircle(p.x, p.y, rC);

    // Optional aromatic circle
    graphics.lineStyle(2, 0x78e3ff, 0.18);
    graphics.strokeCircle(cx, cy, R - 14);

    const label = scene.add
      .text(cx - 34, cy + R + 18, "C₆H₆", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "12px",
        color: "rgba(255,255,255,0.7)",
      })
      .setAlpha(0.9);

    return { label };
  }

  window.MoleculeDraw.benzene = benzene;
})();

