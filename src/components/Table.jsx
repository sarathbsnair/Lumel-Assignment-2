import React from "react";
import "../App.css";
import Row from "./Row";

const Table = ({ tableData, table, setTable }) => {
  const headings = [
    "Label",
    "Value",
    "Input",
    "Allocation %",
    "Allocation Val",
    "Variance %",
  ];
  return (
    <div className="custom__table">
      <table>
        <thead>
          {headings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </thead>
        <tbody>
          {table.map((data) => (
            <Row
              key={data?.id}
              rowData={data}
              rowId={data?.id}
              tableData={tableData}
              setTable={setTable}
              table={table}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
