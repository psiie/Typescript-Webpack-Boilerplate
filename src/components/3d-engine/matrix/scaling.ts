import Matrix from './standard';

export default class ScalingMatrix extends Matrix {
  constructor(xAmount: number, yAmount: number, zAmount: number) {
    super();

    this.matrix[0] = xAmount;
    this.matrix[5] = yAmount;
    this.matrix[10] = zAmount;
  }
}
