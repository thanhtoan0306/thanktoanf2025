// Main Phaser scene + UI wiring (Phaser 3, global Phaser expected)
(function () {
  // No UI/buttons: just render a default scene.
  const moleculeCount = 1;
  const showRNA = true;
  const showCO2 = true;
  const showBenzene = true;
  const showGlucose = true;
  const showRibose = true;

  class MainScene extends Phaser.Scene {
    create() {
      this.g = this.add.graphics();
      this.title = this.add
        .text(12, 10, "H₂O", {
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
          fontSize: "16px",
          color: "#dbe6ff",
        })
        .setAlpha(0.9);

      this.currentCount = moleculeCount;
      this.showRNA = showRNA;
      this.showCO2 = showCO2;
      this.showBenzene = showBenzene;
      this.showGlucose = showGlucose;
      this.showRibose = showRibose;
      this.rnaTexts = [];
      this.rnaLabel = null;
      this.co2Label = null;
      this.benzeneLabel = null;
      this.glucoseLabel = null;
      this.riboseLabel = null;
      this.detailTexts = [];

      this.draw();
    }

    setState({ moleculeCount, showRNA, showCO2 }) {
      if (typeof moleculeCount === "number") this.currentCount = moleculeCount;
      if (typeof showRNA === "boolean") this.showRNA = showRNA;
      if (typeof showCO2 === "boolean") this.showCO2 = showCO2;
      this.draw();
    }

    clearTextObjects() {
      if (this.detailTexts?.length) {
        for (const t of this.detailTexts) t.destroy();
        this.detailTexts.length = 0;
      }
      if (this.rnaTexts?.length) {
        for (const t of this.rnaTexts) t.destroy();
        this.rnaTexts.length = 0;
      }
      if (this.rnaLabel) {
        this.rnaLabel.destroy();
        this.rnaLabel = null;
      }
      if (this.co2Label) {
        this.co2Label.destroy();
        this.co2Label = null;
      }
      if (this.benzeneLabel) {
        this.benzeneLabel.destroy();
        this.benzeneLabel = null;
      }
      if (this.glucoseLabel) {
        this.glucoseLabel.destroy();
        this.glucoseLabel = null;
      }
      if (this.riboseLabel) {
        this.riboseLabel.destroy();
        this.riboseLabel = null;
      }
    }

    draw() {
      const draw = window.MoleculeDraw || {};
      this.g.clear();
      this.clearTextObjects();

      // H2O grid
      if (typeof draw.h2oGrid === "function") {
        draw.h2oGrid(this, this.g, this.currentCount || 1);
      }

      // CO2
      if (this.showCO2 && typeof draw.co2Molecule === "function") {
        const { label } = draw.co2Molecule(this, this.g) || {};
        if (label) this.co2Label = label;
      }

      // Benzene
      if (this.showBenzene && typeof draw.benzene === "function") {
        const { label } = draw.benzene(this, this.g) || {};
        if (label) this.benzeneLabel = label;
      }

      // Glucose
      if (this.showGlucose && typeof draw.glucose === "function") {
        const { label } = draw.glucose(this, this.g) || {};
        if (label) this.glucoseLabel = label;
      }

      // Ribose
      if (this.showRibose && typeof draw.ribose === "function") {
        const { label } = draw.ribose(this, this.g) || {};
        if (label) this.riboseLabel = label;
      }

      // RNA
      if (this.showRNA && typeof draw.rnaStrand === "function") {
        const { texts, label } = draw.rnaStrand(this, this.g) || {};
        if (Array.isArray(texts)) this.rnaTexts = texts;
        if (label) this.rnaLabel = label;
      }

      // Nucleotide detail
      if (typeof draw.nucleotideDetail === "function") {
        const { texts } = draw.nucleotideDetail(this, this.g) || {};
        if (Array.isArray(texts)) this.detailTexts = texts;
      }
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#0b1020",
    scene: [MainScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };

  new Phaser.Game(config);
})();

