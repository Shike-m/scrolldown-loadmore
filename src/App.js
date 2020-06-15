import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './component/PostList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <PostList />
    </div>
  );
}

export default App;
