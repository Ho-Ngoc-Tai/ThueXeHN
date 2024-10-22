import logo from './logo.svg';
import './App.css';
import logochatbot from './chatbot.png';
import Chatbox from '.../pages/chatbot/chatbox';

function App() {
  return (
    <div className="App">
      <Chatbox />
      <header className="App-header">
        <img src={logochatbot} className="App-logo Chatbot-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
