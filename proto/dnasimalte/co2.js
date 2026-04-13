// CO2 drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.co2Molecule(scene, graphics)
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function co2Molecule(scene, graphics) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    // Place CO2 near top-left, below title
    const cx = 170;
    const cy = 80;
    const bondLen = 70;

    const C = { x: cx, y: cy };
    const O1 = { x: cx - bondLen, y: cy };
    const O2 = { x: cx + bondLen, y: cy };

    // Bonds: O=C=O (double bonds)
    const bondColor = 0xb9c6ff;
    graphics.lineStyle(4, bondColor, 0.55);
    graphics.beginPath();
    graphics.moveTo(O1.x + 16, O1.y - 6);
    graphics.lineTo(C.x - 14, C.y - 6);
    graphics.moveTo(O1.x + 16, O1.y + 6);
    graphics.lineTo(C.x - 14, C.y + 6);
    graphics.moveTo(C.x + 14, C.y - 6);
    graphics.lineTo(O2.x - 16, O2.y - 6);
    graphics.moveTo(C.x + 14, C.y + 6);
    graphics.lineTo(O2.x - 16, O2.y + 6);
    graphics.strokePath();

    // Atoms
    const rO = 20;
    const rC = 18;

    // Oxygen atoms (red-ish)
    graphics.fillStyle(0xff5b6e, 0.95);
    graphics.fillCircle(O1.x, O1.y, rO);
    graphics.fillCircle(O2.x, O2.y, rO);
    graphics.lineStyle(3, 0x401018, 0.45);
    graphics.strokeCircle(O1.x, O1.y, rO);
    graphics.strokeCircle(O2.x, O2.y, rO);

    // Carbon (grey)
    graphics.fillStyle(0xe6edf7, 0.85);
    graphics.fillCircle(C.x, C.y, rC);
    graphics.lineStyle(3, 0x8e99ad, 0.35);
    graphics.strokeCircle(C.x, C.y, rC);

    // Label
    const label = scene.add
      .text(12, 34, "CO₂", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "14px",
        color: "rgba(255,255,255,0.75)",
      })
      .setAlpha(0.9);

    return { label };
  }

  window.MoleculeDraw.co2Molecule = co2Molecule;
})();

