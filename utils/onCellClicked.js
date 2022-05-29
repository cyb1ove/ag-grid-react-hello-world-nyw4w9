export default (params, rowData, gridApi) => {
  const rowIndex = params.rowIndex;
  const colIndex = params.column.colId;
  const cell = rowData[rowIndex][colIndex];
  const rowNode = gridApi.getRowNode(rowIndex);

  rowNode.setDataValue(colIndex, {
    ...cell,
    amount: ++cell.amount,
  });

  gridApi.refreshCells({
    force: true
  });
};
