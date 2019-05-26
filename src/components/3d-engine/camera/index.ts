import { inject } from '../../../dependencyInjector';
// import { radians } from '../matrix/common';
// import Matrix from '../matrix/standard';
// import RotationMatrix from '../matrix/rotation';
// import ScalingMatrix from '../matrix/scaling';
import TranslationMatrix from '../matrix/translation';
import World from '../world';

import * as d from '../model/index.d';
import * as d2 from '../matrix/index.d';

// todo: remove camera from depInjector if not a singleton

@inject('world')
export default class Camera {
  instance: {
    world: World,
  }

  VIEWING_DISTANCE: number = 200;
  HITHER_PLANE: number = 0.1;
  YON_PLANE: number = 400;

  render() {
    const { world } = this.instance;
    let perspectiveWorld: d.ObjectVertices = [];

    // perspective
    world.data.forEach((item: d.Object3D, idx: number) => {
      perspectiveWorld = item.vertices.map((vertex: d2.Vertex) => {
        const [ x, y, z, w ] = vertex;
        const d = this.VIEWING_DISTANCE;

        return [ x*d/z, y*d/z, z, 1];
      });
    });
  }
}
