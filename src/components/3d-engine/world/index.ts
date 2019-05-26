import Matrix from '../matrix/standard';
import RotationMatrix from '../matrix/rotation';
import ScalingMatrix from '../matrix/scaling';
import TranslationMatrix from '../matrix/translation';
import { radians } from '../matrix/common';
import * as d from '../model/index.d';

export default class World {
  data: Array<d.Object3D> = [];

  cloneWorld() {
    const clone: Array<d.Object3D> = [];

    this.data.forEach((item: d.Object3D) => {
      const cloneItem: d.Object3D = {
        faces: [],
        vertices: [],
      };

      // shallow copy. We don't need deep copy of faces // todo:
      cloneItem.faces = item.faces.slice(0);

      // deep copy vertices
      item.vertices.forEach((vertice: d.Vertices) => {
        const cloneVertice: d.Vertices = vertice.slice(0);
        cloneItem.vertices.push(cloneVertice);
      });

      clone.push(cloneItem);
    });

    return clone;
  }

  rotateWorld(xRotation: number, yRotation: number, zRotation: number) {
    const rotationWorldMatrix = new RotationMatrix(xRotation, yRotation, zRotation);
    
    this.data.forEach((item: d.Object3D, idx: number) => {
      this.data[idx].vertices = rotationWorldMatrix.transform(item.vertices);
    });
  }

  _sort() {
    // this.data.sort((a: d.Object3D, b: d.Object3D) => {
    //   const one = (a && a[0] && a[0][2]);
    //   const two = (b && b[0] && b[0][2]);
    //   return one - two;
    // });
  }

  
}
