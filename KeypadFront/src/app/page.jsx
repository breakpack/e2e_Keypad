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

  const PProps = {
    Hash: states.Hash,
    Send: actions.sendUserInput
  };

  if (states.keypad === null && states.Hash === null)  {
    return (
      <div>
        ...isLoading...
      </div>
    )
  } else {
    return (
      <div>
        <KeypadUserInput ref={childRef} {...PProps}/>
        <SecureKeypad keypad={states.keypad} handleClick={handleClick}/>
      </div>
    );
  }
}