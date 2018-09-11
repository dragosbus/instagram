import React from 'react';

export const ErrorSpan = props => {
    let styles = {
        display: props.isValidInput ? 'none' : 'block'
    };

    return(
        <span style={styles} className="">x</span>
    );
};