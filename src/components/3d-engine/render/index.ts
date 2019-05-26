import { inject } from '../../../dependencyInjector';
import { radians } from '../matrix/common';
import Matrix from '../matrix/standard';
import RotationMatrix from '../matrix/rotation';
import ScalingMatrix from '../matrix/scaling';
import TranslationMatrix from '../matrix/translation';

import * as d from '../model/index.d';
import * as d2 from '../matrix/index.d';

@inject('canvas')
@inject('world')
@inject('camera')
export default class Render {
  instance: {
    canvas: {
      clearScreen: Function,
    },
    world: {
      data: Array<d.Object3D>,
      cloneWorld: Function,
      rotate: Function,
      clone: Function,
    },
  }

  constructor() {
    const { canvas, world } = this.instance;
    canvas.clearScreen();
    
    this.render();

  }

  render() {
    const { canvas, world, camera } = this.instance;
    // occlusionList = []; // eslint-disable-line

    // ----------------- world space ----------------- //
    // rotate world
    world.rotate(0, 0.25, 0);

    // simple sort world

    // ----------------- camera space ----------------- //
    // camera()
    

    

    // ----------------- draw world ----------------- //
    // canvas();
    
  }
}