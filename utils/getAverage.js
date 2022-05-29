export default (rowData, colIndex, colLength) => {
  return rowData.reduce((acc, item) => acc + item[colIndex].amount, 0) / colLength
}