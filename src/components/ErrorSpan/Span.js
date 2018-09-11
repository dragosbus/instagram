import React from 'react';

export const ErrorSpan = props => {
    let styles = {
        display: props.isValidInput ? 'none' : 'block'
    };

    return(
        <span style={styles} className="">x</span>
    );
};

export const MessageSpan = props => {
    return(
        <span className="error-register" style={{ display: props.formIsValid ? 'none' : 'block' }}>
        {props.message}
      </span>
    );
};