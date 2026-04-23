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

  // Ribose (very simplified): 5-member ring (furanose) with 4 carbons + 1 oxygen.
  // This is a visual model, not a full stereochemistry-accurate representation.
  const scale = 0.1;

  const carbonColor = 0x2b2b2b;
  const oxygenColor = 0xe43d30;
  const hydrogenColor = 0xffffff;

  const cR = 0.28 * scale;
  const oR = 0.32 * scale;
  const hR = 0.18 * scale;
  const bondR = 0.055 * scale;

  // 5 ring vertices
  const ringR = 1.45 * scale;
  const tiltZ = 0.35 * scale;
  const ring = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + Math.PI / 10;
    ring.push(
      new THREE.Vector3(
        Math.cos(a) * ringR,
        Math.sin(a) * ringR,
        (i % 2 === 0 ? tiltZ : -tiltZ) * 0.6
      )
    );
  }

  // Put oxygen at vertex 0, carbons at 1..4
  const O = ring[0];
  const C1 = ring[1];
  const C2 = ring[2];
  const C3 = ring[3];
  const C4 = ring[4];

  const addAtom = (pos, radius, color) => {
    const m = sphere(radius, color);
    m.position.copy(pos);
    group.add(m);
  };

  addAtom(O, oR, oxygenColor);
  addAtom(C1, cR, carbonColor);
  addAtom(C2, cR, carbonColor);
  addAtom(C3, cR, carbonColor);
  addAtom(C4, cR, carbonColor);

  // Ring bonds
  group.add(bond(O, C1, bondR));
  group.add(bond(C1, C2, bondR));
  group.add(bond(C2, C3, bondR));
  group.add(bond(C3, C4, bondR));
  group.add(bond(C4, O, bondR));

  // Add a few substituents (very simplified "OH" directions)
  const out = (p) => p.clone().normalize();
  const addOH = (from, dirScale = 1.0) => {
    const dir = out(from).multiplyScalar(1.0 * scale * dirScale);
    const oPos = from.clone().add(dir);
    const hPos = oPos.clone().add(dir.clone().multiplyScalar(0.7));
    addAtom(oPos, oR * 0.85, oxygenColor);
    addAtom(hPos, hR, hydrogenColor);
    group.add(bond(from, oPos, bondR * 0.9));
    group.add(bond(oPos, hPos, bondR * 0.75));
  };

  addOH(C1, 1.0);
  addOH(C2, 0.95);
  addOH(C3, 1.0);
  addOH(C4, 0.9);

  // Center
  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);

  return group;
}

