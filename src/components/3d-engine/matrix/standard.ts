import * as d from './index.d';
import * as d2 from '../model/index.d';

function noop(): void {}

export default class Matrix {
  matrix: d.MatrixArray;

  constructor(matrix?: d.MatrixArray) {
    this.matrix = matrix || [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  multiply(matrix2: Matrix): Matrix { // d2.ObjectVertices
    const lMatrix = this.matrix;
    const rMatrix = matrix2.matrix;
    // console.log('l', lMatrix, 'r', rMatrix);
    const newMatrix = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
    ];
    for (let i=0; i<64; i++) {
      const i16 = i / 16 | 0;
      const newMatrixIdx = ((i / 4 | 0) * 4) % 16 + i16;
      const leftIdx = i % 16;
      const rightIdx = (i % 4 * 4) + i16;
      
      const leftItem = lMatrix[leftIdx];
      const rightItem = rMatrix[rightIdx];
      let product = 0;

      if (leftItem === 0 || rightItem === 0) noop(); /* optim. blank */
      else if (leftItem === 1) product = rightItem;
      else if (rightItem === 1) product = leftItem;
      else product = leftItem * rightItem;

      newMatrix[newMatrixIdx] += product;
    }

    this.matrix = newMatrix;
    return this;
  }

  transform(model: d.Model): d.Model {
    const newModel: d.Model = [];
    model.forEach((vertex: d.Vertex) => {
      newModel.push(
        this._transformVertex(vertex)
      );
    });
    return newModel;
  }

  _transformVertex(vertex: d.Vertex): d.Vertex {
    if (!vertex || vertex.length < 4) return [,,,,];
  
    const newVertex: d.Vertex = [];
    const matrix: d.MatrixArray = this.matrix;
    for (let i=0; i<16; i+=4) {
      newVertex.push(
        (matrix[i + 0] * vertex[0]) +
        (matrix[i + 1] * vertex[1]) +
        (matrix[i + 2] * vertex[2]) +
        (matrix[i + 3] * vertex[3])
      );
    }
    return newVertex;
  }

  print(): void {
    // prettify. Gets rid of rounding errors for readability
    const m = this.matrix.map(num =>Math.round(num * 100) / 100)
    console.log(`
      [
        ${m[0]}, ${m[1]}, ${m[2]}, ${m[3]},
        ${m[4]}, ${m[5]}, ${m[6]}, ${m[7]},
        ${m[8]}, ${m[9]}, ${m[10]}, ${m[11]},
        ${m[12]}, ${m[13]}, ${m[14]}, ${m[15]},
      ]
    `)
  }
}
