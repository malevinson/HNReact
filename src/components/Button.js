import React from 'react';
import './Button.css';

const Button = ({ showIcon, sortDirectionUp, styles, handleClickButton, children }) => {
    let className = 'fas fa-2x fa-angle-',
        alt = 'arrow ',
        btnStyles = styles;

    if (sortDirectionUp) {
        className += 'up top';
        alt += 'up';
        if (children === 'Ratio' && showIcon) {
            btnStyles += '-up';
        }
    } else {
        className += 'down down';
        alt += 'down';
        if (children === 'Ratio' && showIcon) {
            btnStyles += '-down';
        }
    }

    return (
        <button onClick={() => handleClickButton(children)} className={btnStyles}>
            {showIcon && <i {...{ className, alt }} />}
            {children}
        </button>
    );
};

export default Button;
