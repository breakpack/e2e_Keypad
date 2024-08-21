import '../style/keypad.css';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

const KeypadUserInput = forwardRef((props, ref) => {
    const circleCount = 6;
    const [filledCount, setFilledCount] = useState(0);
    const [ResultList, setResultList] = useState([]);

    useEffect(() => {
        if(ResultList.length === 6){
        //   alert(ResultList);
            props.Send(ResultList);
            setResultList([]);
        }
      }, [ResultList]);

    const mapKeyToIndex = (key) => {
        const [rowPart, colPart] = key.replace('key', '').split('_');
        const rowIndex = parseInt(rowPart, 10) - 1;
        const colIndex = parseInt(colPart, 10) - 1;
        
        return rowIndex * 4 + colIndex;
    };
    
    const KeyPress = (key) => {
        const value = props.Hash[mapKeyToIndex(key)];
        if (key === "Eraser") {
            setFilledCount(0);
            setResultList([]);
        } else if (key === "Backspace") {
            setFilledCount(prevCount => Math.max(prevCount - 1, 0));
            setResultList(prevStack => prevStack.slice(0, -1)); 
        } else if (key !== null && value !=='') {
            setFilledCount(prevCount => Math.min(prevCount % 6 + 1, circleCount));
            setResultList(prevStack => [...prevStack, value]);
        }
    }

    useImperativeHandle(ref, () => ({
        keyPress(key) {
            KeyPress(key);
        }
    }));

    return (
        <div className='wrapper'>
            <div className="input-group-style">
                {Array.from({ length: circleCount }).map((_, index) => (
                    <div 
                        key={index} 
                        className={`circle ${index < filledCount ? 'filled' : ''}`}
                    ></div>
                ))}
            </div>
            <hr></hr>
        </div>
    );
});

export default KeypadUserInput;