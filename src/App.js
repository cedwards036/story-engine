import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import DeckPage from './components/DeckPage';
import Footer from './components/Footer';

function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  function openSidebar() {
    setSidebarIsOpen(true)
  }

  function closeSidebar() {
    setSidebarIsOpen(false)
  }

  return (
    <Router>
      <div className="App">
        <Header openSidebar={openSidebar} />
        <Switch>
          <Route path="/:deckId" children={<DeckPage sidebarIsOpen={sidebarIsOpen} closeSidebar={closeSidebar} />} />
          <Route path="/"><Redirect to='/1' /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
