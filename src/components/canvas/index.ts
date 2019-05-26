type Vertex = Array<number>;
type Face = Array<Vertex>;
type Pixel = Array<number>;
type HexColor = string;

export default class Canvas {
  width: number = 212 * 2;
  height: number = 120 * 2;
  ctx: CanvasRenderingContext2D;
  pixels: ImageData;
  $canvas: HTMLCanvasElement;

  constructor() {
    this.$canvas = document.createElement('canvas');
    this.$canvas.setAttribute('width', this.width.toString());
    this.$canvas.setAttribute('height', this.height.toString());
    this.$canvas.style.border = '1px solid #000000';

    document.body.appendChild(this.$canvas);
    this.ctx = this.$canvas.getContext('2d');
    this.pixels = this.ctx.createImageData(this.width, this.height);
  }

  _setPixel(xy: Vertex, rgba: Pixel): void {
    const [r, g, b, a] = rgba;
    let [x, y] = xy;
    x |= 0;
    y |= 0;

    const index = (x + y * this.pixels.width) * 4;
    this.pixels.data[index + 0] = r || 0;
    this.pixels.data[index + 1] = g || 0;
    this.pixels.data[index + 2] = b || 0;
    this.pixels.data[index + 3] = a || 0;
  }

  _vertexToCanvas(vertex: Vertex, canvasWidth: number, canvasHeight: number): Array<number> {
    const [x, y] = vertex;
    const newX = x + canvasWidth / 2;
    const newY = y + canvasHeight / 2;
    return [newX, newY];
  }

  _drawLine(xy1: Vertex, xy2: Vertex, color: HexColor): void {
    if (!xy1) return;

    const [a, b] = this._vertexToCanvas(xy1, this.width, this.height);
    const [c, d] = this._vertexToCanvas(xy2, this.width, this.height);

    this.ctx.strokeStyle = color || '#000000';
    this.ctx.beginPath();
    this.ctx.moveTo(a, b);
    this.ctx.lineTo(c, d);
    this.ctx.stroke();
  }

  _drawFace(face: Face, idx: number, max: number): void {
    const [ vertexA, vertexB, vertexC, vertexD ] = face;
    const color = '#000'; // debug.constructor.numberToColor(idx, max);
    this._drawLine(vertexA, vertexB, color); // #ff0000
    this._drawLine(vertexB, vertexC, color); // #ff7700
    this._drawLine(vertexC, vertexD, color); // #ffff00
    this._drawLine(vertexD, vertexA, color); // #ffffff
  }

  clearScreen(): void {
    for (let i = 0; i < this.width * this.height; i++) {
      this.pixels.data[i * 4 + 3] = 0;
    }
  }

  drawWorld() {
    // convert world into an array of faces to draw
    let facesToDraw = [];
    renderWorld.forEach((item, idx) => {
      const faces = constructFaces(item, idx);
      facesToDraw = Array.prototype.concat(facesToDraw, faces);
    });

    // sort faces to draw
    facesToDraw.sort((a, b) => {
      const avgA = a.reduce((acc, curr) => acc + curr[2],0);
      const avgB = b.reduce((acc, curr) => acc + curr[2],0);
      return avgA - avgB;
    });

    // // culling
    // facesToDraw = facesToDraw.filter(face => {
    //   const [ vertexA, vertexB, vertexC, vertexD ] = face;
    //   return cullFace(vertexA, vertexB, vertexC, vertexD);
    // });

    // draw faces
    facesToDraw.forEach((face, idx) => {
      this._drawFace(face, idx, facesToDraw.length);
    });
  }
}
