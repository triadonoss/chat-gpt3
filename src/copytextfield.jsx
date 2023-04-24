import React, { useState } from 'react';
import './CodeEditor.css';

function CodeEditor(answer) {
  const [code, setCode] = useState('');

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
  };

  const handleChange = (event) => {
    setCode(event.target.value);
    answer = setCode;
  };

  return (
    <div className="editor">
      <textarea className="code-input" value={answer} onChange={handleChange} />
      <button className="copy-button" onClick={handleCopyClick}>
        Copy
      </button>
    </div>
  );
}

export default CodeEditor;
