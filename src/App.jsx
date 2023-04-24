import { useState, useEffect } from 'react';
import './App.css';

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
      <h1>
        <span>GPT-3 Completion App</span> <br />{' '}
        <span>"text-davinci-003" model from OpenAI</span>
      </h1>
      <h2>
        You can find the{' '}
        <a href="https://www.flthompson.com/family-law-attorney-bakersfield-finding-the-right-one-for-you/">
          Best Family Law Attorney
        </a>{' '}
        on https://www.flthompson.com.
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="input-completion">Type text suggestion</label>
        <br />
        <input
          id="input-completion"
          type="text"
          placeholder="type here and get suggestions"
          value={prompts}
          onChange={(e) => handleChange(e.target.value)}
        />
        <br />
        <div>
          {!suggestion && !isLoading && <p>...</p>}
          {isLoading && <p>loading</p>}
          {suggestion}
        </div>
        <button onClick={handleClick}>Get Completion Text</button>
        <br />
        <small>Implemented by RedLds</small>
      </form>
    </div>
  );
}

export default App;
