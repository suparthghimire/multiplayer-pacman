import Sketch from "react-p5";
import p5Types from "p5";
function App() {
  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    p5.background("black");
  }
  function draw(p5: p5Types) {
    p5.background("black");
    p5.fill(255);
    p5.rect(0, 0, 100, 100);
  }

  return <Sketch draw={draw} setup={setup} />;
}

export default App;
