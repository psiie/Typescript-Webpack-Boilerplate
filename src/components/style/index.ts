
export default class Style {
  constructor(css: string) {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css";
    styleSheet.innerHTML = css;
    document.head.appendChild(styleSheet);
  }
}
