import React from 'react';
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { TouchBackend } from 'react-dnd-touch-backend';

// import TestLayout from './TestLayout';

import HomeScreen from './home';

import './App.css';

const App = () => {
  // const dndBackend = HTML5Backend;

  return (
    <div className="App" data-theme="light">
      {/* <DndProvider backend={dndBackend}>
        <TestLayout />
      </DndProvider> */}
      <HomeScreen />
    </div>
  );
}

export default App;
