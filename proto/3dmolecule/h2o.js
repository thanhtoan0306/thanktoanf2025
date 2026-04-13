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

  // H2O (approx): bond length 0.96 Å, angle 104.5°
  const scale = 0.1;
  const bondLen = 0.96 * scale;
  const half = THREE.MathUtils.degToRad(104.5) / 2;

  const O = new THREE.Vector3(0, 0, 0);
  const H1 = new THREE.Vector3(
    Math.sin(half) * bondLen,
    0,
    Math.cos(half) * bondLen
  );
  const H2 = new THREE.Vector3(
    -Math.sin(half) * bondLen,
    0,
    Math.cos(half) * bondLen
  );

  const oxygen = sphere(0.38 * scale, 0xe43d30);
  oxygen.position.copy(O);
  const hydrogen1 = sphere(0.24 * scale, 0xffffff);
  hydrogen1.position.copy(H1);
  const hydrogen2 = sphere(0.24 * scale, 0xffffff);
  hydrogen2.position.copy(H2);

  group.add(oxygen, hydrogen1, hydrogen2);
  group.add(bond(O, H1, 0.07 * scale));
  group.add(bond(O, H2, 0.07 * scale));

  const box = new THREE.Box3().setFromObject(group);
  const center = box.getCenter(new THREE.Vector3());
  group.position.sub(center);

  return group;
}

