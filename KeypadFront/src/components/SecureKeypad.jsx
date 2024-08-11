import '../style/keypad.css'
import React, { useState, useEffect } from 'react';

export default function SecureKeypad({ keypad, handleClick }) {
    const [pressedKey, setPressedKey] = useState(null);
    const [randomPressedKey, setRandomPressedKey] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        checkIsMobile();
      }, [isMobile]);

    // 기기가 모바일인지 확인하는 함수
    const checkIsMobile = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android|iPad|iPhone|iPod|Windows Phone/i.test(userAgent)) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    const buttonConfig = [
        [{ key: 'key1_1', position: '0 0' }, { key: 'key1_2', position: '-50px 0' }, { key: 'key1_3', position: '-100px 0' }, { key: 'key1_4', position: '-150px 0' }],
        [{ key: 'key2_1', position: '0 -50px' }, { key: 'key2_2', position: '-50px -50px' }, { key: 'key2_3', position: '-100px -50px' }, { key: 'key2_4', position: '-150px -50px' }],
        [{ key: 'key3_1', position: '0 -100px' }, { key: 'key3_2', position: '-50px -100px' }, { key: 'key3_3', position: '-100px -100px' }, { key: 'key3_4', position: '-150px -100px' }]
    ];

    const flatButtonKeys = buttonConfig.flat().map(button => button.key);

    const getRandomKey = (currentKey) => {
        const otherKeys = flatButtonKeys.filter(key => key !== currentKey && key !== randomPressedKey);
        if (otherKeys.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherKeys.length);
            return otherKeys[randomIndex];
        }
    
        return null;
    };

    const handleMouseDown = (key) => {
        handleClick(key);
        if (key !== 'Backspace' && key !== 'Eraser') {
            const randomKey = getRandomKey(key);
            setPressedKey(key);
            setRandomPressedKey(randomKey);
        }
    };

    const handleMouseUp = () => {
        setPressedKey(null);
        setRandomPressedKey(null);
    };

    return (
        <>
            <table className="table-style">
                <tbody>
                {buttonConfig.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {row.map((button) => (
                                <td key={button.key}>
                                    <button
                                        type="button"
                                        className={`button-style ${pressedKey === button.key || randomPressedKey === button.key ? 'pressed' : ''}`}
                                        onMouseDown={isMobile ? undefined : () => handleMouseDown(button.key)}
                                        onMouseUp={isMobile ? undefined : handleMouseUp}
                                        onTouchStart={isMobile ? () => handleMouseDown(button.key) : undefined}  // 모바일 터치 대응
                                        onTouchEnd={isMobile ? handleMouseUp : undefined}  // 모바일 터치 대응
                                    >
                                        <span
                                            className="number-style"
                                            style={{
                                                backgroundImage: `url(data:${keypad})`,
                                                backgroundPosition: button.position,
                                            }}
                                        ></span>
                                    </button>
                                </td>
                            ))}
                        </tr>
                    ))}
                <tr>
                    <td colSpan={2}>
                        <button type="button" className="button-style" onMouseDown={() => handleMouseDown('Eraser')}>
                            <span className='input-char-style font'>
                                전체삭제
                            </span>
                        </button>
                    </td>
                    <td colSpan={2}>
                        <button type="button" className="button-style" onMouseDown={() => handleMouseDown('Backspace')}>
                            <span>
                                <img src="https://www.svgrepo.com/show/500329/backspace.svg"/>
                            </span>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    );
}
