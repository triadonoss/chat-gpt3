import { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import './CodeEditor.css';
import CodeEditor from './CodeEditor.jsx';

function App() {
  const [prompts, setPrompts] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const models = async () => {
    setIsLoading(true);
    const list = await fetch('https://tan-clumsy-squid.cyclic.app', {
      // https://nice-erin-basket-clam-tie.cyclic.app
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        promps: prompts,
      }),
    });

    return list.json();
  };

  useEffect(() => {
    if (suggestion) {
      setIsLoading(false);
    }
  }, [suggestion]);
  const handleChange = (value) => {
    setPrompts(value);
    setSuggestion('');
  };
  const handleClick = async () => {
    const res = await models();
    setSuggestion(res[0]?.text);
  };

  return (
    <div className="App">
      <img
        src={logo}
        alt="Mallet with an opening and closing tags for Ask anything logo"
      />
      <h1>
        <span>Ask Anything!</span> <br />{' '}
      </h1>
      <p>
        All Legal Questions can be Answerd here 100% Free of Charge. This
        includes on the matters of Family Law, Criminal Law, Probate Court and
        more.
      </p>
      <div className="card">
        <h2>
          You can find the{' '}
          <a href="https://www.flthompson.com/family-law-attorney-bakersfield-finding-the-right-one-for-you/">
            Best Family Law Attorney
          </a>{' '}
          on <a href="https://www.flthompson.com/">Thompson Law.</a>
        </h2>
      </div>

      <div className="card-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="input-completion">Type in your Question:</label>
          <br />
          <input
            className="search-box"
            id="input-completion"
            type="text"
            placeholder="Write your legal questions here"
            value={prompts}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button className="submit-btn" onClick={handleClick}>
            Go
          </button>
          <br />
          <div>
            {!suggestion && !isLoading && <p>...</p>}
            {isLoading && <p>loading</p>}
            {!isLoading && suggestion && <CodeEditor answer={suggestion} />}
          </div>

          <br />
          <small>Implemented by RedLds</small>
        </form>
      </div>
    </div>
  );
}

export default App;
