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
