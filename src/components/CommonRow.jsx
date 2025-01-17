import React from "react";

const CommonRow = ({
  id,
  label,
  value,
  variance,
  child,
  table,
  setTable,
  rowId,
}) => {
  let inputValue = "";

  const calculateVariance = (prevValue, newValue) => {
    return ((newValue - prevValue) / prevValue) * 100;
  };

  const handleChange = (e) => {
    inputValue = e.target.value;
  };

  const handleRowSubmit = (neededRow, label) => {
    //This row -> value + variance must be updated
    //This row -> childrens values and variances must be updated
    const rowPrevValue = neededRow.value;
    let updatedValue = "";
    if (label === "percentage") {
      updatedValue = (inputValue / 100) * rowPrevValue + rowPrevValue;
      neededRow.value = updatedValue;
      neededRow["variance"] = calculateVariance(rowPrevValue, updatedValue);
    } else {
      updatedValue = parseInt(rowPrevValue) + parseInt(inputValue);
      neededRow.value = updatedValue;
      neededRow["variance"] = calculateVariance(rowPrevValue, updatedValue);
    }
    const updatedChildren = neededRow.children.map((child) => {
      const prevChildValue = child.value;
      const percentageContribution = (prevChildValue / rowPrevValue) * 100;
      child.value = (percentageContribution/100) * updatedValue;
      child["variance"] = (child.value / updatedValue) * 100;
      return child;
    });
    neededRow.children = updatedChildren;
    setTable(table.map((row) => (row.id === rowId ? neededRow : row)));
  };

  const handleSubmit = (id, label, child) => {
    if (inputValue === "") {
      return;
    }
    // id can be rowId or childId inside a row, based on child it can be differentiated
    // label corresponds to whaether percentage button or value button clicked
    if (child) {
      let total = 0;
      const requiredRow = table.find((row) => row?.id === rowId);
      const requiredChild = requiredRow.children.find(
        (child) => child?.id === id
      );
      const prevValue = requiredChild.value;
      if (label === "percentage") {
        const newValue = (inputValue / 100) * prevValue + prevValue;
        const updatedChild = {
          ...requiredChild,
          value: newValue,
          variance: calculateVariance(prevValue, newValue, "percentage"),
        };
        requiredRow.children.forEach((child) => {
          if (child.id !== id) {
            total += child.value;
          } else {
            total += updatedChild.value;
          }
        });
        setTable(
          table.map((row) => {
            if (row.id === rowId) {
              row["variance"] = calculateVariance(row.value, total);
              row.value = total;
              const children = row.children.map((child) =>
                child.id === id ? updatedChild : child
              );
              row.children = children;
            }
            return row;
          })
        );
      } else {
        const updatedChild = {
          ...requiredChild,
          value: parseInt(inputValue) + parseInt(prevValue),
          variance: calculateVariance(
            parseInt(prevValue),
            parseInt(prevValue) + parseInt(inputValue)
          ),
        };
        requiredRow.children.forEach((child) => {
          if (child.id !== id) {
            total += child.value;
          } else {
            total += updatedChild.value;
          }
        });
        setTable(
          table.map((row) => {
            if (row.id === rowId) {
              row["variance"] = calculateVariance(row.value, total);
              row.value = total;
              const children = row.children.map((child) =>
                child.id === id ? updatedChild : child
              );
              row.children = children;
            }
            return row;
          })
        );
      }
    } else {
      const requiredRow = table.find((row) => row.id === rowId);
      handleRowSubmit(requiredRow, label);
    }
  };

  return child ? (
    <tr>
      <td>--{label}</td>
      <td>{value.toFixed(3)}</td>
      <td>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </td>
      <td>
        <button onClick={() => handleSubmit(id, "percentage", child)}>
          Button 1
        </button>
      </td>
      <td>
        <button onClick={() => handleSubmit(id, "value", child)}>
          Button 2
        </button>
      </td>
      <td>{`${variance.toFixed(3)}%`}</td>
    </tr>
  ) : (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
      <td>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </td>
      <td>
        <button onClick={() => handleSubmit(id, "percentage", child)}>
          Button 1
        </button>
      </td>
      <td>
        <button onClick={() => handleSubmit(id, "value")}>Button 2</button>
      </td>
      <td> {variance.toFixed(3)}% </td>
    </tr>
  );
};

export default CommonRow;
