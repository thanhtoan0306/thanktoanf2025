// Nucleotide drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.nucleotideDetail(scene, graphics) => { texts }
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function nucleotideDetail(scene, graphics) {
    const h = scene.scale.height;

    // Small "detailed nucleotide" cartoon at bottom-left:
    // Phosphate (P) — Sugar (ribose) — Base (A/U/G/C)
    const x0 = 26;
    const y0 = h - 190;

    const phosphateR = 16;
    const sugarR = 18;
    const baseR = 16;

    const p = { x: x0 + phosphateR, y: y0 + phosphateR };
    const s = { x: p.x + 58, y: p.y + 4 };
    const b = { x: s.x + 64, y: s.y - 2 };

    // connectors
    graphics.lineStyle(4, 0xffffff, 0.18);
    graphics.beginPath();
    graphics.moveTo(p.x + phosphateR, p.y);
    graphics.lineTo(s.x - sugarR, s.y);
    graphics.moveTo(s.x + sugarR, s.y);
    graphics.lineTo(b.x - baseR, b.y);
    graphics.strokePath();

    // phosphate
    graphics.fillStyle(0x78e3ff, 0.9);
    graphics.fillCircle(p.x, p.y, phosphateR);
    graphics.lineStyle(2, 0x78e3ff, 0.35);
    graphics.strokeCircle(p.x, p.y, phosphateR);

    // sugar (ribose) as a pentagon-ish polygon
    graphics.fillStyle(0xffffff, 0.12);
    graphics.lineStyle(2, 0xcad5ff, 0.25);
    const sugarPts = [
      { x: s.x, y: s.y - sugarR },
      { x: s.x + sugarR * 0.9, y: s.y - sugarR * 0.2 },
      { x: s.x + sugarR * 0.6, y: s.y + sugarR * 0.9 },
      { x: s.x - sugarR * 0.6, y: s.y + sugarR * 0.9 },
      { x: s.x - sugarR * 0.9, y: s.y - sugarR * 0.2 },
    ];
    graphics.beginPath();
    graphics.moveTo(sugarPts[0].x, sugarPts[0].y);
    for (let i = 1; i < sugarPts.length; i++) graphics.lineTo(sugarPts[i].x, sugarPts[i].y);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();

    // base (generic)
    graphics.fillStyle(0xffc857, 0.82);
    graphics.fillRoundedRect(b.x - baseR, b.y - baseR, baseR * 2, baseR * 2, 6);
    graphics.lineStyle(2, 0xffffff, 0.12);
    graphics.strokeRoundedRect(b.x - baseR, b.y - baseR, baseR * 2, baseR * 2, 6);

    // labels (return these so caller can destroy them on redraw)
    const texts = [];
    texts.push(
      scene.add
        .text(x0, y0 - 22, "Nucleotide (detail)", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "12px",
          color: "rgba(255,255,255,0.65)",
        })
        .setAlpha(0.9),
    );
    texts.push(
      scene.add
        .text(p.x, p.y, "P", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "12px",
          color: "rgba(5,15,25,0.9)",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0.95),
    );
    texts.push(
      scene.add
        .text(s.x, s.y, "Sugar", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "11px",
          color: "rgba(255,255,255,0.7)",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0.9),
    );
    texts.push(
      scene.add
        .text(b.x, b.y, "Base", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "11px",
          color: "rgba(20,14,0,0.9)",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0.95),
    );

    return { texts };
  }

  window.MoleculeDraw.nucleotideDetail = nucleotideDetail;
})();

