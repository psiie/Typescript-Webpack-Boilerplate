import animationFrame from '../3d-engine/animationFrame';
import Render from '../3d-engine/render';

export default class Clock {
  isRunning: boolean = false;

  tick() {
    if (!this.isRunning) return;
    
    // fps counter
    // debug.tickFPS();

    // calculate world movement based on key presses
    // movementLoop();
    
    // wait for ready. put image then restart
    // ctx.putImageData(pixels, 0, 0); // paint last frame before we compute the next; may need to move
    new Render();

    animationFrame(this.tick); // continues the loop
  }

  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.tick();
    }
  }

  stop() {
    this.isRunning = false;
  }
}
