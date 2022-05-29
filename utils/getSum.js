export default (rowData, rowIndex) => {
  return rowData[rowIndex].reduce((acc, item) => acc + item.amount, 0);
}