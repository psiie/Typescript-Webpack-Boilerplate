import { radians } from '../matrix/common';
import Matrix from '../matrix/standard';
import RotationMatrix from '../matrix/rotation';
import ScalingMatrix from '../matrix/scaling';
import TranslationMatrix from '../matrix/translation';
// import RotationMatrix from '../matrix/rotation';

import * as d from './index.d';
import * as d2 from '../matrix/index.d';

export default class Model {
  normalized: d.Object3D;
  object: d2.Model;
  empty: Array<number> = [0, 0, 0];

  constructor(json: d.ObjectJson, translate: d.XYZ, rotate: d.XYZ, scale: d.XYZ) {
    this.normalized = this._jsonTo3D(json);
    this.object = this._create(translate, rotate, scale);
  }

  _jsonTo3D(json: d.ObjectJson): d.Object3D {
    const oldVertices: d.Vertices = json.meshes[0].vertices;
    const oldFaces: d.Faces = json.meshes[0].faces;
    const newVertices: d.ObjectVertices = [];
    const out: d.Object3D = {
      vertices: null,
      faces: null,
    };

    // refactor old vert format to new
    for (let i = 0; i < oldVertices.length; i += 3) {
      newVertices.push([
        oldVertices[i],
        oldVertices[i + 1],
        oldVertices[i + 2],
        1,
      ]);
    }

    out.vertices = newVertices;
    out.faces = oldFaces;
    return out;
  }

  _create(translate: d.XYZ, rotate: d.XYZ, scale: d.XYZ): d2.Model {
    const [ transX, transY, transZ ] = translate || this.empty;
    const [ rotX, rotY, rotZ ] = (rotate || this.empty).map(i => radians(i));
    const [ scaleX, scaleY, scaleZ ] = scale || this.empty;

    const tMatrix = new TranslationMatrix(transX, transY, transZ);
    const eMatrix = new RotationMatrix(rotX, rotY, rotZ);
    const sMatrix = new ScalingMatrix(scaleX, scaleY, scaleZ);

    const transformMatrix = new Matrix()
      .multiply(sMatrix)
      .multiply(eMatrix)
      .multiply(tMatrix);

    const transformed = transformMatrix.transform(this.normalized.vertices);
    return transformed;
  }

  constructFaces(model: d.Object3D, index: number): Array<d.Faces> {
    const faces: Array<d.Faces> = [];

    model.faces.forEach((face: d.Face) => {
      const [ a, b, c, d ] = [ face[0], face[1], face[2], face[3] ];
      const [ vertexA, vertexB, vertexC, vertexD ] = [
        model.vertices[a],
        model.vertices[b],
        model.vertices[c],
        model.vertices[d],
      ];

      faces.push([ vertexA, vertexB, vertexC, vertexD ]);
    });

    return faces;
  }

}
