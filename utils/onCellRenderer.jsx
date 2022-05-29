import React from 'react';
import getSum from './getSum.js';
import getAverage from './getAverage';
import CellTemplate from '../cell-template';

export default (props, rowData, rowLength, colLength) => {
  const colIndex = Number(props.colDef.field);
  const rowIndex = props.node.rowIndex;

  if (colIndex === colLength - 1 && rowIndex === rowLength - 1) {
    return null;
  }

  if (colIndex < colLength - 1 && rowIndex < rowLength - 1) {
    const classNames = props.value.aspiring
      .map(id => `.${id}_aspiring`)
      .join(' ');

    return (
      <CellTemplate
        id={props.value.id}
        classNames={classNames}
      >
        {props.value.amount}
      </CellTemplate>
    );
  }

  if (colIndex === colLength - 1) {
    return <strong>{getSum(rowData, rowIndex)}</strong>;
  }

  if (rowIndex === rowLength - 1) {
    return (
      <strong>{getAverage(rowData, colIndex, colLength).toFixed(1)}</strong>
    );
  }
};
