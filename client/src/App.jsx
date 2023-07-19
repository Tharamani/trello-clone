import { Boards } from "./components/Boards";
import { Header } from "./components/Header";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div id="app-container">
          <div className="header">
            <Header />
          </div>
          <div className="boards-containers">
            <Boards />
          </div>
        </div>
      </DndProvider>
    </>
  );
}

export default App;
