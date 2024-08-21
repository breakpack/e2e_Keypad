"use client";

import {useState} from 'react';
import axios from "axios";
import Encrypt from "./Encrypt.jsx";

export default function useSecureKeypad() {
  const [keypad, setKeypad] = useState(null);
  const [Hash, setHash] = useState([]);
  const [timeStamp, settimeStamp] = useState();
  const [userId, setUserID] = useState("test");

  const getSecureKeypad = async () => {
    try{
      const res = await axios.get(`/api/keypad?userId=${userId}`);
      const image = res.data['imageBase64'];
      setKeypad(`data:image/png;base64,${image}`);
      setHash(res.data['shuffledHashes']);
      settimeStamp(res.data['timestampHash']);
    } catch(error){
      console.error('Error fetching data:', error);
    }
  }
  

  const sendUserInput = async (ResultList) => {
    const encrypted = Encrypt(ResultList);
    const data =  {
      userId: userId,
      timestampHash: timeStamp,
      userInput: encrypted
    }

    const res = await axios.post("/api/verify",data);
    console.log(res);
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
