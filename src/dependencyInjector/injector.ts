import { Instance } from './index.d';

export default class DependencyInjector {
  instance: Instance = {};

  constructor(dependencies: Object = {}) {
    Object.entries(dependencies).forEach(([name, func]) => {
      this.instance[name] = new func();
    });

    this.inject = this.inject.bind(this);
    this.injectAll = this.injectAll.bind(this);
  }

  initialize(): void {
    /* the constructor ensures that the depInjector is initialized.
    However, to be sure that tree-shaking during the webpack process doesn't
    remove the import (in the edgecase that no annotations are used), initialize()
    provides a tie to stop tree-shaking and ensure construction. */
    return void 0;
  };

  injectAll(constructor: Function): void {
    constructor.prototype.instance = this.instance;
  }

  inject(dependencyName: string): Function {
    return (constructor: Function): void => {

      const dependency = this.instance[dependencyName];
      if (!dependency) throw(`
        DependencyInjector Error: No dependency named '${dependencyName}'.
        Ensure that the dependency is listed in dependencyInjector/dependencies.ts
      `);
      
      // append dependency to class
      const { instance } = constructor.prototype;
      const newInstance = Object.assign({}, instance, {
        [dependencyName]: dependency
      });
      constructor.prototype.instance = newInstance;
    }
  }
}
