import Matrix from './standard';

export default class TranslationMatrix extends Matrix {
  constructor(xAmount: number, yAmount: number, zAmount: number) {
    super();

    this.matrix[3] = xAmount;
    this.matrix[7] = -yAmount;
    this.matrix[11] = zAmount;
  }
}
