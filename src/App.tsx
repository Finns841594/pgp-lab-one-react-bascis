import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserCard} from './UserCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Random Users</h2>
      </header>
      <UserCard />
    </div>
  );
}

export default App;
