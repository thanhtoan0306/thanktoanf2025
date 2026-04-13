export function createMolecule({ THREE }) {
  const group = new THREE.Group();

  const mat = (color) =>
    new THREE.MeshStandardMaterial({
      color,
      metalness: 0.05,
      roughness: 0.25
    });

  const sphere = (radius, color) =>
    new THREE.Mesh(new THREE.SphereGeometry(radius, 48, 24), mat(color));

  const cylinder = (height, radius, color) =>
    new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, height, 24, 1, false),
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

  // CO2 (approx): linear O=C=O, C=O bond length ~1.16 Å
  const scale = 0.1;
  const coBondLen = 1.16 * scale;

  const C = new THREE.Vector3(0, 0, 0);
  const O1 = new THREE.Vector3(-coBondLen, 0, 0);
  const O2 = new THREE.Vector3(coBondLen, 0, 0);

  const carbon = sphere(0.30 * scale, 0x2b2b2b);
  carbon.position.copy(C);
  const oxygen1 = sphere(0.38 * scale, 0xe43d30);
  oxygen1.position.copy(O1);
  const oxygen2 = sphere(0.38 * scale, 0xe43d30);
  oxygen2.position.copy(O2);

  group.add(carbon, oxygen1, oxygen2);
  group.add(bond(C, O1, 0.075 * scale));
  group.add(bond(C, O2, 0.075 * scale));

  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);

  return group;
}

