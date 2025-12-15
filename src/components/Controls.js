import React from 'react';
import Button from './Button';
import { UI_CONFIG } from '../utils/constants';

const Controls = ({ showCount, activeButton, sortDirectionUp, onSelectChange, onButtonClick }) => {
    return (
        <>
            <div className="select">
                SHOW:
                <select value={showCount} onChange={onSelectChange}>
                    {UI_CONFIG.select.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="controls">
                <div className="control-text">SORT BY:</div>
                <div className="button-group">
                    {UI_CONFIG.buttons.map(button => (
                        <Button
                            key={button.name}
                            handleClickButton={onButtonClick}
                            showIcon={button.name === activeButton}
                            sortDirectionUp={sortDirectionUp}
                            styles={button.styles}
                        >
                            {button.name}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Controls;

