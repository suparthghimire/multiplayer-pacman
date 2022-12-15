import { useEffect, useRef } from "react";
import Canvas from "./components/Canvas";
import { useGame } from "./context/GameContext";
import { MAP_CELL } from "./model/utils/utils";

function App() {
  const { game } = useGame();
  if (game) return <Canvas game={game} />;
  else return <div>Loading</div>;
}

export default App;
