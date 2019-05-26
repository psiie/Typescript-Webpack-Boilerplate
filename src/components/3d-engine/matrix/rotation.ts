import Matrix from './standard';
import { radians } from '../matrix/common';

export default class EulerMatrix extends Matrix {
  constructor(xRotation: number, yRotation: number, zRotation: number) {
    super();

    const xRotationRads = radians(xRotation);
    const yRotationRads = radians(yRotation);
    const zRotationRads = radians(zRotation);

    // algo from Opengl-tutorials.org. Optimized rotationMatrix's to minimize operations.
    const a = Math.cos(xRotationRads);
    const b = Math.sin(xRotationRads);
    const c = Math.cos(yRotationRads);
    const d = Math.sin(yRotationRads);
    const e = Math.cos(zRotationRads);
    const f = Math.sin(zRotationRads);

    const ad = a * d;
    const bd = b * d;

    this.matrix[0] = c * e;
    this.matrix[1] = -c * f;
    this.matrix[2] = d;
    this.matrix[4] = bd * e + a * f;
    this.matrix[5] = -bd * f + a * e;
    this.matrix[6] = -b * c;
    this.matrix[8] = -ad * e + b * f;
    this.matrix[9] = ad * f + b * e;
    this.matrix[10] = a * c;
  }
}
