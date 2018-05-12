import React from 'react';

const Button = props => {
    const { showIcon, iconDirection, styles, handleClickButton, children } = props;

    return (
        <button onClick={() => handleClickButton(children)} className={'button ' + styles}>
            {showIcon && <img src="./sortArrow.png" alt={'arrow ' + iconDirection} />}
            {children}
        </button>
    );
};

export default Button;
