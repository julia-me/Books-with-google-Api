import React from 'react';

const ButtonElem = (props) => {
    const {clasBtn, onClickHendle, children} = props
    return (
        <button className={clasBtn} onClick={onClickHendle}> {children} </button>
    )
}

export default ButtonElem