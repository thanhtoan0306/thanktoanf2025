// RNA drawing helpers (Phaser 3, global Phaser expected)
// Exposes: window.MoleculeDraw.rnaStrand(scene, graphics) => { texts, label }
(function () {
  if (!window.MoleculeDraw) window.MoleculeDraw = {};

  function rnaStrand(scene, graphics) {
    const w = scene.scale.width;
    const h = scene.scale.height;

    // Simple cartoon RNA strand (single-stranded): backbone + bases A/U/G/C
    const bases = ["A", "U", "G", "C", "A", "U", "G", "C", "A", "U", "G", "C"];
    const n = bases.length;
    const left = 90;
    const right = w - 90;
    const y0 = h - 140;
    const amp = 26;

    // Backbone
    graphics.lineStyle(6, 0x78e3ff, 0.25);
    graphics.beginPath();
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = left + (right - left) * t;
      const y = y0 + Math.sin(t * Math.PI * 3) * amp;
      if (i === 0) graphics.moveTo(x, y);
      else graphics.lineTo(x, y);
    }
    graphics.strokePath();

    // Nucleotides
    const baseColor = {
      A: 0xffc857,
      U: 0xa3ff8f,
      G: 0x9aa9ff,
      C: 0xff7aa2,
    };

    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = left + (right - left) * t;
      const y = y0 + Math.sin(t * Math.PI * 3) * amp;

      graphics.fillStyle(0xffffff, 0.10);
      graphics.fillCircle(x, y, 18);
      graphics.lineStyle(2, 0xffffff, 0.15);
      graphics.strokeCircle(x, y, 18);

      const b = bases[i];
      graphics.fillStyle(baseColor[b] ?? 0xffffff, 0.85);
      graphics.fillCircle(x, y, 10);
    }

    // Text labels (return these so caller can destroy them on redraw)
    const texts = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const x = left + (right - left) * t;
      const y = y0 + Math.sin(t * Math.PI * 3) * amp;
      const b = bases[i];
      const txt = scene.add
        .text(x, y - 8, b, {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "12px",
          color: "rgba(255,255,255,0.85)",
        })
        .setOrigin(0.5, 0.5)
        .setAlpha(0.85);
      texts.push(txt);
    }

    const label = scene.add
      .text(12, h - 34, "RNA (cartoon strand)", {
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        fontSize: "12px",
        color: "rgba(255,255,255,0.65)",
      })
      .setAlpha(0.9);

    return { texts, label };
  }

  window.MoleculeDraw.rnaStrand = rnaStrand;
})();

