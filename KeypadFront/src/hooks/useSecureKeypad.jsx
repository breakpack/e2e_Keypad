"use client";

import {useMemo, useState} from 'react';
import axios from "axios";
import {JSEncrypt} from "jsencrypt";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [userInput, setUserInput] = useState(null);

  const [Hash, setHash] = useState([]);

  const getSecureKeypad = async () => {
    try{
      const res = await axios.get('/api/keypad');
      const image = res.data['imageBase64'];
      setKeypad(`data:image/png;base64,${image}`);
      setHash(data.shuffledHashes);
    } catch(error){
      console.error('Error fetching data:', error);
    }
  }

  // const hashValues = useMemo(() => {
  //   return Hash.map((hash, index) => ({
  //     id: index,
  //     value: hash,
  //   }));
  // }, [Hash]);

  const onKeyPressed = (key) => {
    setUserInput(key);
  }

  const sendUserInput = () => {}

  return {
    states: {
      keypad,
      userInput,
    },
    actions: {
      getSecureKeypad,
      onKeyPressed,
      sendUserInput
    }
  }
}
