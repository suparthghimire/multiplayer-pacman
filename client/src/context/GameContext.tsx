import { createContext, useContext, useEffect, useState } from "react";
import Game from "../model/Game";

const GameContext = createContext<{
  game: Game | null;
}>({
  game: null,
});

export const useGame = () => useContext(GameContext);

export default function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [game, setGame] = useState<Game | null>(null);
  useEffect(() => {
    const game = new Game(800, 600, 1, 1, 20);
    game.map.GenerateRandomMap();
    setGame(game);
  }, []);

  return (
    <GameContext.Provider
      value={{
        game,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
