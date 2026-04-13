// H2O drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.h2oGrid(scene, graphics, count)
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function drawOne(graphics, cx, cy, scale) {
    // Simple H2O geometry (approx 104.5°)
    const bondLen = 92 * scale;
    const half = Phaser.Math.DegToRad(104.5 / 2);
    const tilt = Phaser.Math.DegToRad(-18);

    const h1 = new Phaser.Math.Vector2(Math.cos(half), Math.sin(half)).scale(bondLen).rotate(tilt);
    const h2 = new Phaser.Math.Vector2(Math.cos(half), -Math.sin(half)).scale(bondLen).rotate(tilt);

    const O = new Phaser.Math.Vector2(cx, cy);
    const H1 = new Phaser.Math.Vector2(cx + h1.x, cy + h1.y);
    const H2 = new Phaser.Math.Vector2(cx + h2.x, cy + h2.y);

    // bonds
    graphics.lineStyle(6 * scale, 0xb9c6ff, 0.85);
    graphics.beginPath();
    graphics.moveTo(O.x, O.y);
    graphics.lineTo(H1.x, H1.y);
    graphics.moveTo(O.x, O.y);
    graphics.lineTo(H2.x, H2.y);
    graphics.strokePath();

    // atoms
    const rO = 28 * scale;
    const rH = 18 * scale;

    graphics.fillStyle(0x5bd7ff, 1); // Oxygen
    graphics.fillCircle(O.x, O.y, rO);
    graphics.lineStyle(3 * scale, 0x0b2a44, 0.9);
    graphics.strokeCircle(O.x, O.y, rO);

    graphics.fillStyle(0xffffff, 1); // Hydrogen
    graphics.fillCircle(H1.x, H1.y, rH);
    graphics.fillCircle(H2.x, H2.y, rH);
    graphics.lineStyle(2 * scale, 0xa9b3c6, 0.9);
    graphics.strokeCircle(H1.x, H1.y, rH);
    graphics.strokeCircle(H2.x, H2.y, rH);
  }

  function h2oGrid(scene, graphics, count) {
    const w = scene.scale.width;
    const h = scene.scale.height;
    const n = Math.max(1, count | 0);

    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const pad = 56;
    const cellW = (w - pad * 2) / cols;
    const cellH = (h - pad * 2) / rows;
    const cell = Math.min(cellW, cellH);
    const scale = Phaser.Math.Clamp(cell / 240, 0.55, 1.15);

    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (i >= n) break;
        const cx = pad + c * cellW + cellW / 2;
        const cy = pad + r * cellH + cellH / 2;
        drawOne(graphics, cx, cy, scale);
        i++;
      }
    }
  }

  window.MoleculeDraw.h2oGrid = h2oGrid;
})();

