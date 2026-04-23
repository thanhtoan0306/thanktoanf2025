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

  // Benzene: 6 carbons in a hexagon, 6 hydrogens outward (approx).
  const scale = 0.1;
  const rC = 1.39 * scale; // ring radius (approx C-C)
  const rH = 2.48 * scale; // C-H distance from center (approx)

  const carbonColor = 0x2b2b2b;
  const hydrogenColor = 0xffffff;

  const carbonRadius = 0.30 * scale;
  const hydrogenRadius = 0.20 * scale;
  const bondRadius = 0.06 * scale;

  const carbons = [];
  const hydrogens = [];

  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const cPos = new THREE.Vector3(Math.cos(a) * rC, Math.sin(a) * rC, 0);
    const hPos = new THREE.Vector3(Math.cos(a) * rH, Math.sin(a) * rH, 0);

    const c = sphere(carbonRadius, carbonColor);
    c.position.copy(cPos);
    carbons.push(cPos);
    group.add(c);

    const h = sphere(hydrogenRadius, hydrogenColor);
    h.position.copy(hPos);
    hydrogens.push(hPos);
    group.add(h);

    group.add(bond(cPos, hPos, bondRadius));
  }

  for (let i = 0; i < 6; i++) {
    const a = carbons[i];
    const b = carbons[(i + 1) % 6];
    group.add(bond(a, b, bondRadius));
  }

  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);

  return group;
}

