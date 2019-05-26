import dependencyInjector, { inject } from './dependencyInjector';
import jsonCube from './models/cube.json';
import Model from './components/3d-engine/model';

import './global-styles';

@inject('clock')
export class Main {
  instance: {
    clock: Object,
  }

  constructor() {
    const { clock } = this.instance;
    dependencyInjector.initialize();
    const cube = new Model(jsonCube, [0,0,0], [0,0,0], [10,10,10]);
    
  }
}

export default new Main();
