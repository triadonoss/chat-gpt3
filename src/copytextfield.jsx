import React, { useState, useEffect } from 'react';

function CodeEditor(answer) {
  const [code, setCode] = useState('');

  useEffect(() => {
    setCode(answer);
    console.log(code);
  }, [answer]);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
  };

  const handleChange = (event) => {
    setCode(event.target.value);
    //setCode(answer);
  };

  const styles = {
    editor: {
      position: 'relative',
      width: '80%',
      backgroundColor: '#292D3E',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
      margin: '0 auto',
    },
    codeInput: {
      width: '100%',
      height: '300px',
      fontFamily: "'Fira Code', monospace",
      fontSize: '14px',
      lineHeight: '1.5',
      padding: '10px',
      color: '#fff',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
    },
    copyButton: {
      position: 'absolute',
      //float: 'right',
      top: '0px',
      right: '10px',
      padding: '5px',
      fontSize: '10px',
      backgroundColor: 'transparent',
      color: 'gray',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      //width: '100%',
    },
  };

  return (
    <div style={styles.editor}>
      <textarea style={styles.codeInput} value={code} onChange={handleChange} />
      <button style={styles.copyButton} onClick={handleCopyClick}>
        Copy
      </button>
    </div>
  );
}

export default CodeEditor;
