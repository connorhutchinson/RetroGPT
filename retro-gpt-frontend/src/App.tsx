import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { ReactComponent as ChatGPTLogo } from './assets/ChatGPT-Logo.svg';


const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

enum messageType {
  user,
  AI
}

interface message {
  type: messageType;
  message: string;
}

const fetchResponse = async (message: string): Promise<string> => {
  const response = await fetch(`${apiUrl}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: message }),
  });

  if (!response.ok) {
    throw new Error("Error fetching response from backend");
  }

  const data = await response.json();
  return data.response;
};

const App = () => {

  const [message, setMessage] = useState('');
  const [messageThread, setMessageThread] = useState<message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const ensureFocus = () => {
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Make input the only focusable element
  useEffect(() => {
    const handleWindowClick = () => ensureFocus();
    const handleWindowBlur = () => ensureFocus();

    window.addEventListener("click", handleWindowClick);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("click", handleWindowClick);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, []);

  const handleSubmit = async () => {
    const data = await fetchResponse(message);

    setMessageThread(
      [
        ...messageThread,
        {
          message: message,
          type: messageType.user
        },
        {
          message: data,
          type: messageType.AI
        }
      ]);

    setMessage('');
  };

  return (
    <div className={styles.app} onClick={ensureFocus}>
      <header className={styles.header}>
        Chat GPT <ChatGPTLogo className={styles.logo} />
      </header>
      <div className={styles.responses}>{
        messageThread.map((response) =>
          <div
            className={
              clsx(styles.messageThread, response.type === messageType.user ? styles.user : styles.ai)
            }
          >
            <p className={styles.pointer}>&gt;</p>
            {response.message}
          </div>
        )
      }
      </div>
      <div className={styles.inputLine}>
        <p className={styles.pointer}>&gt;</p>
        <input
          ref={inputRef}
          className={styles.hiddenField}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus={true}
          maxLength={100}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <div className={styles.field}>
          {message}
          <span className={styles.caret}></span>
        </div>
      </div>
    </div>
  );
};

export default App;
