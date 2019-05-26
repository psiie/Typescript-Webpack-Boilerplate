import Style from './components/style';

new Style(`
  canvas,
  img {
    image-rendering: optimizeSpeed;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: optimize-contrast;
    -ms-interpolation-mode: nearest-neighbor;
    width: 848px;
    height: 480px;
  }
`);
