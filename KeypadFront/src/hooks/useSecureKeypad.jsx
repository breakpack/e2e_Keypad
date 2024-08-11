"use client";

import {useState} from 'react';
import axios from "axios";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [Hash, setHash] = useState([]);

  const getSecureKeypad = async () => {
    try{
      const res = await axios.get('/api/keypad');
      const image = res.data['imageBase64'];
      setKeypad(`data:image/png;base64,${image}`);
      setHash(res.data['shuffledHashes']);
    } catch(error){
      console.error('Error fetching data:', error);
    }
  }

  const sendUserInput = () => {
    // alert(ResultList.join());
  }

  return {
    states: {
      keypad,
      Hash
    },
    actions: {
      getSecureKeypad,
      sendUserInput
    }
  }
}
