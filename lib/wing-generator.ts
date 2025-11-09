import { WingParameters, WingGeometry, Vector3D } from "@/types";

// NACA 4-digit airfoil generator
export function generateNACA4Digit(
  nacaNumber: string,
  nPoints: number = 100
): { x: number[]; y: number[] } {
  const m = parseInt(nacaNumber[5] || "0") / 100.0; // max camber
  const p = parseInt(nacaNumber[6] || "0") / 10.0; // position of max camber
  const t = parseInt(nacaNumber.slice(7, 9) || "12") / 100.0; // thickness

  const beta: number[] = [];
  for (let i = 0; i < nPoints; i++) {
    beta.push((i * Math.PI) / (nPoints - 1));
  }

  const x = beta.map((b) => (1 - Math.cos(b)) / 2);

  const yt = x.map(
    (xi) =>
      5 *
      t *
      (0.2969 * Math.sqrt(xi) -
        0.126 * xi -
        0.3516 * xi * xi +
        0.2843 * xi * xi * xi -
        0.1015 * xi * xi * xi * xi)
  );

  const yc: number[] = [];
  const dycDx: number[] = [];

  for (let i = 0; i < x.length; i++) {
    if (x[i] < p && p > 0) {
      yc[i] = (m / (p * p)) * (2 * p * x[i] - x[i] * x[i]);
      dycDx[i] = (2 * m) / (p * p) * (p - x[i]);
    } else if (p > 0) {
      yc[i] = (m / ((1 - p) * (1 - p))) * (1 - 2 * p + 2 * p * x[i] - x[i] * x[i]);
      dycDx[i] = (2 * m) / ((1 - p) * (1 - p)) * (p - x[i]);
    } else {
      yc[i] = 0;
      dycDx[i] = 0;
    }
  }

  const theta = dycDx.map((d) => Math.atan(d));

  const xu = x.map((xi, i) => xi - yt[i] * Math.sin(theta[i]));
  const yu = yc.map((yi, i) => yi + yt[i] * Math.cos(theta[i]));
  const xl = x.map((xi, i) => xi + yt[i] * Math.sin(theta[i]));
  const yl = yc.map((yi, i) => yi - yt[i] * Math.cos(theta[i]));

  const xAirfoil = [...xu.reverse(), ...xl.slice(1)];
  const yAirfoil = [...yu.reverse(), ...yl.slice(1)];

  return { x: xAirfoil, y: yAirfoil };
}

// Generate wing geometry from parameters
export function generateWingGeometry(params: WingParameters): WingGeometry {
  const airfoil = generateNACA4Digit(params.airfoilType, 50);

  const vertices: Vector3D[] = [];
  const faces: number[][] = [];
  const normals: Vector3D[] = [];

  const ribPositions: number[] = [];
  for (let i = 0; i < params.nRibs; i++) {
    ribPositions.push((i * params.wingspan) / (params.nRibs - 1));
  }

  // Generate vertices for each rib
  ribPositions.forEach((spanPos) => {
    const taperFactor = 1.0 - (1 - params.taperRatio) * (spanPos / params.wingspan);
    const localChord = params.rootChord * taperFactor;

    const sweepOffset = (spanPos / params.wingspan) * params.rootChord * Math.tan((params.sweepAngle * Math.PI) / 180);
    const dihedralOffset = (spanPos / params.wingspan) * params.wingspan * Math.tan((params.dihedralAngle * Math.PI) / 180);

    airfoil.x.forEach((x, idx) => {
      vertices.push({
        x: x * localChord + sweepOffset,
        y: airfoil.y[idx] * localChord + dihedralOffset,
        z: spanPos - params.wingspan / 2,
      });
    });
  });

  // Generate faces (simplified)
  const pointsPerRib = airfoil.x.length;
  for (let i = 0; i < params.nRibs - 1; i++) {
    for (let j = 0; j < pointsPerRib - 1; j++) {
      const idx1 = i * pointsPerRib + j;
      const idx2 = i * pointsPerRib + j + 1;
      const idx3 = (i + 1) * pointsPerRib + j + 1;
      const idx4 = (i + 1) * pointsPerRib + j;

      faces.push([idx1, idx2, idx3]);
      faces.push([idx1, idx3, idx4]);
    }
  }

  // Calculate normals (simplified)
  vertices.forEach(() => {
    normals.push({ x: 0, y: 1, z: 0 }); // placeholder
  });

  return { vertices, faces, normals };
}

