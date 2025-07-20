import React from 'react';
import Converter from './components/Converter.js';
import History from './components/History.js';

function App() {
  return (
    <div className="container mt-4">
      <Converter />
      <History />
    </div>
  );
}

export default App;
