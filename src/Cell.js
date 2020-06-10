import React from 'react'
import "./Cell.css";

export const Cell = (props) => {
  const handleClick = e => {
    props.flipCellsAroundMe();
  };
  let classes = "Cell" + (props.isLit ? " Cell-lit" : "");
  return(
    <td className={classes} onClick={() => handleClick()} />
  );
};
