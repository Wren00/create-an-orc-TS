import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MikroORM } from '@mikro-orm/postgresql';


const orm = await MikroORM.init({
  entities: ['./entities'],
  dbName: 'create-an-orc',
});
console.log(orm.em);


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
