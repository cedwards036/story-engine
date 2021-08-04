import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DeckPage from './components/DeckPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/:deckId" children={<DeckPage />} />
          <Route path="/"><HomePage /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
