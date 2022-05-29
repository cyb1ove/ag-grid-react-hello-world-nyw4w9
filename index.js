import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import valueCellRenderer from './utils/onCellRenderer.jsx';
import onCellClicked from './utils/onCellClicked.js';
import createDataObject from './utils/createDataObject.js';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const App = () => {
  const M = 13;
  const N = 7;
  const X = 3;

  const cellWidth = 75;
  const cellHeight = 43;

  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const columnDefs = Array.from({ length: N }, (_, k) => ({
      field: `${k}`,
  }));

  const defaultColDef = {
    width: cellWidth,
    cellRenderer: (props) => valueCellRenderer(props, rowData, M, N),
    cellStyle: {
      padding: 0,
    },
  };

  const onGridReady = (params) => {
    if (!params.noreapply) {
      setGridApi(params.api);
    }
  };

  useEffect(() => {
    const data = [];
    for (let i = 0; i < M; i++) {
      const row = Array.from({ length: N }, createDataObject);
      data.push(row);

      const sortedRow = [...row].sort(
        (prev, next) => prev.amount - next.amount
      );
      sortedRow.forEach((item, i, arr) => {
        let aspiringCount = X;
        let leftIndex = i - 1;
        let rightIndex = i + 1;

        while (aspiringCount) {
          const leftDiff = Math.abs(item.amount - arr[leftIndex]?.amount);
          const rightDiff = Math.abs(item.amount - arr[rightIndex]?.amount);
          aspiringCount--;

          if (!rightDiff) {
            arr[leftIndex].aspiring.push(item.id);
            leftIndex--;
            continue;
          }

          if (!leftDiff) {
            arr[rightIndex].aspiring.push(item.id);
            rightIndex++;
            continue;
          }

          if (!rightDiff || leftDiff < rightDiff) {
            arr[leftIndex].aspiring.push(item.id);
            leftIndex--;
          } else {
            arr[rightIndex].aspiring.push(item.id);
            rightIndex++;
          }
        }
      });
    }

    setRowData(data);
  }, []);

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{
        width: cellWidth * N + 2,
        height: cellHeight * M + 3,
      }}
    >
      <AgGridReact
        rowData={rowData}
        rowHeight={cellHeight}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        headerHeight={0}
        onGridReady={onGridReady}
        onCellClicked={(params) => onCellClicked(params, rowData, gridApi)}
      ></AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById('root'));
