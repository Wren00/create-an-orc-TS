import './App.css';
import {OrcName} from "./components/OrcName";
import {OrcBackstory} from "./components/OrcBackstory";
import {OrcStats} from "./components/OrcStats";
import {DisplayOrcImages} from "./components/OrcImage";
import {DisplayBGImages} from "./components/BGImages";


function App() {

  return (
    <div className="App">
      <header className="p-8"> This page will generate Orcs.</header>
          <div className="grid grid-cols-2">
            <div className="page-container-1">
              <div className="image-stack">
                < DisplayBGImages />
                < DisplayOrcImages />
              </div>
            </div>
            <div className="page-container-2">
              <div className="grid grid-cols-1 gap-1 p-2 text-center">
                < OrcName />
              </div>
              <div className="grid grid-cols-[20%_80%] gap-1 p-4">
                <div className="content-start">Stats: < OrcStats /></div>
                <div className="orc-backsory">< OrcBackstory /></div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default App;
