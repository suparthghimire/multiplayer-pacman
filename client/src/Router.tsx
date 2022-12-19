import { Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import Game from "./components/Game";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  );
}
