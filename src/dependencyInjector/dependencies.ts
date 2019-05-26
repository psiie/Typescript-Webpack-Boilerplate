import Canvas from '../components/canvas';
import Clock from '../components/clock';
import World from '../components/3d-engine/world';
import Camera from '../components/3d-engine/camera';

/* Must import all dependencies here for webpack to be able to compile and
make them accessable to the dependencyInjector */

// convert to lowercase to represent instantiation (not class)
export default {
  canvas: Canvas,
  clock: Clock,
  world: World,
  camera: Camera,
};
