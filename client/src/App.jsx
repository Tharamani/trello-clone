import { Boards } from "./components/Boards";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  return (
    <>
      <div id="app-container">
        <div className="header">
          <Header />
        </div>
        <div className="board-sidebar">
          <Boards />
        </div>
        {/* <div className="footer">Footer</div>  */}
      </div>
    </>
  );
}

export default App;
