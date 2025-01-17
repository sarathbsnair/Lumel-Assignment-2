import { useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {

  const tableData = [
      {
        "id": "electronics",
        "label": "Electronics",
        "value": 1400, //this value needs to be calculated from the children values (800+700)
        "children": [
          {
            "id": "phones",
            "label": "Phones",
            "value": 800
          },
          {
            "id": "laptops",
            "label": "Laptops",
            "value": 700
          }
        ]
      },
      {
        "id": "furniture",
        "label": "Furniture",
        "value": 1000, //this need to be calculated from the children values (300+700)
        "children": [
          {
            "id": "tables",
            "label": "Tables",
            "value": 200
          },
          {
            "id": "chairs",
            "label": "Chairs",
            "value": 800
          }
        ]
      }
    ]
  
  const [table,setTable] = useState(tableData);

  return (
    <div className="App">
      <Table tableData={tableData} table={table} setTable={setTable}/>
    </div>
  );
}

export default App;
