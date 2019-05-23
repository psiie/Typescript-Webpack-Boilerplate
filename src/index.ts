import { inject } from './dependencyInjector';

@inject('Counter')
export class Main {
  constructor() {
    const string: String = 'hello world!';
    console.log(string, this);
  }
}

export default new Main();
