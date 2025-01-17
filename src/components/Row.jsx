import React from "react";
import "../App.css";
import CommonRow from "./CommonRow";

const Row = ({ rowData, rowId, tableData, setTable, table }) => {
  return (
    <>
      <CommonRow
        id={rowData?.id}
        label={rowData?.label}
        value={rowData?.value}
        variance={rowData?.variance ? rowData?.variance : 0.0}
        child={false}
        table={table}
        setTable={setTable}
        rowId={rowId}
      />
      {rowData.children.map((childRow) => (
        <CommonRow
          key={childRow?.id}
          id={childRow?.id}
          label={childRow?.label}
          value={childRow?.value}
          variance={childRow?.variance ? childRow?.variance : 0.0}
          child={true}
          table={table}
          setTable={setTable}
          rowId={rowId}
        />
      ))}
    </>
  );
};

export default Row;
