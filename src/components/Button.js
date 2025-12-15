import React from 'react';
import './Button.css';

const Button = ({ showIcon, sortDirectionUp, styles, handleClickButton, children }) => {
    const className = sortDirectionUp 
        ? 'fas fa-2x fa-angle-up top' 
        : 'fas fa-2x fa-angle-down down';
    const alt = sortDirectionUp ? 'arrow up' : 'arrow down';
    const btnStyles = (children === 'Ratio' && showIcon)
        ? `${styles}-${sortDirectionUp ? 'up' : 'down'}`
        : styles;

    return (
        <button onClick={() => handleClickButton(children)} className={btnStyles}>
            {showIcon && <i {...{ className, alt }} />}
            {children}
        </button>
    );
};

export default Button;
