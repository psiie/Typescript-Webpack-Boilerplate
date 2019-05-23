export default class Counter {
  counter = 0;

  increment() {
    this.counter++;
  }

  decrement() {
    this.counter--;
  }

  get current() {
    return this.counter;
  }
}
