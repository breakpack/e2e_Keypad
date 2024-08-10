"use client";

import React, {useEffect, useRef} from 'react';
import useSecureKeypad from '../hooks/useSecureKeypad';
import SecureKeypad from "../components/SecureKeypad";
import KeypadUserInput from "../components/KeypadUserInput.jsx";

export default function Page() {
  const { states, actions } = useSecureKeypad();

  useEffect(() => {
    actions.getSecureKeypad();
  }, []);

  const childRef = useRef();

  const handleClick = (key) => {
      if (childRef.current) {
          childRef.current.keyPress(key);
      }
  };

  if (states.keypad === null) {
    return (
      <div>
        ...isLoading...
      </div>
    )
  } else {
    return (
      <div>
        <KeypadUserInput ref={childRef}/>
        <SecureKeypad keypad={states.keypad} onKeyPressed={actions.onKeyPressed} handleClick={handleClick}/>
      </div>
    );
  }
}