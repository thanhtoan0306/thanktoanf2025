export function createMolecule({ THREE }) {
  const group = new THREE.Group();

  const mat = (color) =>
    new THREE.MeshStandardMaterial({
      color,
      metalness: 0.05,
      roughness: 0.25
    });

  const sphere = (radius, color) =>
    new THREE.Mesh(new THREE.SphereGeometry(radius, 36, 18), mat(color));

  const cylinder = (height, radius, color) =>
    new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 18, 1, false),
      mat(color)
    );

  const bond = (a, b, radius, color = 0xd6dbe6) => {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mesh = cylinder(len, radius, color);
    mesh.position.copy(new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    );
    return mesh;
  };

  // Nucleotide (very simplified): phosphate + ribose + base.
  // Visual model only (not stereochemistry accurate).
  const scale = 0.1;

  const carbonColor = 0x2b2b2b;
  const oxygenColor = 0xe43d30;
  const hydrogenColor = 0xffffff;
  const phosphorusColor = 0xffa000;
  const nitrogenColor = 0x3e6bff;

  const cR = 0.26 * scale;
  const oR = 0.30 * scale;
  const nR = 0.27 * scale;
  const pR = 0.34 * scale;
  const hR = 0.17 * scale;
  const bondR = 0.052 * scale;

  const addAtom = (pos, radius, color) => {
    const m = sphere(radius, color);
    m.position.copy(pos);
    group.add(m);
  };

  // --- Ribose ring (5-member: 4 C + 1 O) ---
  const ringR = 1.35 * scale;
  const tiltZ = 0.22 * scale;
  const ring = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.PI / 10;
    ring.push(
      new THREE.Vector3(
        Math.cos(a) * ringR,
        Math.sin(a) * ringR,
        (i % 2 === 0 ? tiltZ : -tiltZ) * 0.7
      )
    );
  }

  const O4 = ring[0]; // ring oxygen
  const C1 = ring[1];
  const C2 = ring[2];
  const C3 = ring[3];
  const C4 = ring[4];

  addAtom(O4, oR, oxygenColor);
  addAtom(C1, cR, carbonColor);
  addAtom(C2, cR, carbonColor);
  addAtom(C3, cR, carbonColor);
  addAtom(C4, cR, carbonColor);

  group.add(bond(O4, C1, bondR));
  group.add(bond(C1, C2, bondR));
  group.add(bond(C2, C3, bondR));
  group.add(bond(C3, C4, bondR));
  group.add(bond(C4, O4, bondR));

  // A couple of OH substituents (simple)
  const out = (p) => p.clone().normalize();
  const addOH = (from, strength = 1.0) => {
    const dir = out(from).multiplyScalar(0.95 * scale * strength);
    const oPos = from.clone().add(dir);
    const hPos = oPos.clone().add(dir.clone().multiplyScalar(0.7));
    addAtom(oPos, oR * 0.82, oxygenColor);
    addAtom(hPos, hR, hydrogenColor);
    group.add(bond(from, oPos, bondR * 0.9));
    group.add(bond(oPos, hPos, bondR * 0.75));
  };
  addOH(C2, 0.95);
  addOH(C3, 1.0);

  // --- Phosphate group attached to C4 (represents 5' phosphate) ---
  const pDir = out(C4).multiplyScalar(1.55 * scale);
  const P = C4.clone().add(pDir);
  addAtom(P, pR, phosphorusColor);
  group.add(bond(C4, P, bondR * 1.05));

  const pO = [];
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const d = new THREE.Vector3(Math.cos(a), Math.sin(a), 0.25).normalize();
    const oPos = P.clone().add(d.multiplyScalar(1.0 * scale));
    pO.push(oPos);
    addAtom(oPos, oR * 0.9, oxygenColor);
    group.add(bond(P, oPos, bondR * 0.95));
  }

  // --- Base attached to C1 (glycosidic bond) ---
  // Use a 6-member "pyrimidine-like" ring with 2 nitrogens.
  const baseCenter = C1.clone().add(out(C1).multiplyScalar(1.65 * scale));
  group.add(bond(C1, baseCenter, bondR)); // link

  const baseR = 1.05 * scale;
  const base = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const pos = new THREE.Vector3(
      baseCenter.x + Math.cos(a) * baseR,
      baseCenter.y + Math.sin(a) * baseR,
      baseCenter.z + (i % 2 === 0 ? 0.08 * scale : -0.08 * scale)
    );
    base.push(pos);
  }

  for (let i = 0; i < 6; i++) {
    const isN = i === 1 || i === 3;
    addAtom(base[i], isN ? nR : cR, isN ? nitrogenColor : carbonColor);
    group.add(bond(base[i], base[(i + 1) % 6], bondR * 0.9));
  }

  // Center
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);

  return group;
}

