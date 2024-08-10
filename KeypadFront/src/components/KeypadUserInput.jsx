import '../style/keypad.css';
import { useState, forwardRef, useImperativeHandle } from 'react';

const KeypadUserInput = forwardRef((props, ref) => {
    const circleCount = 4;
    const [filledCount, setFilledCount] = useState(0);

    useImperativeHandle(ref, () => ({
        keyPress(key) {
            if (key === "Eraser") {
                setFilledCount(0);
            } else if (key === "Backspace") {
                setFilledCount(prevCount => Math.max(prevCount - 1, 0));
            } else if (key !== null) {
                setFilledCount(prevCount => Math.min(prevCount + 1, circleCount));
            }
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
        </div>
    );
});

export default KeypadUserInput;