import "./App.css";

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
              <div className="grid grid-cols-1 gap-1 p-2 text-start text-4xl">
                < OrcName />
              </div>
              <div className="grid grid-cols-[20%_80%] gap-4 p-4">
                <div className="content-start">
                  Stats:
                  <br />
                  <br />
                  < OrcStats />
                </div>
                <div className="orc-backstory">
                  < OrcBackstory />
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default App;
