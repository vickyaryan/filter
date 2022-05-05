import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [rowData, setRowData] = useState();
  const [filterData, setFilterData] = useState();
  const [selectData, setSelectData] = useState("(a)");
  const [selectDate, setSelectDate] = useState("grater");
  const [secSelectDate, setSecSelectDate] = useState();
  const [number,setNumber] = useState("=")

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  });

  useEffect(() => {
    onGridReady();
  }, []);

  const inputText = (e) => {
    const data = rowData.filter((item) => {
      if (selectData === "(a)") {
        return item.athlete.toLowerCase().includes(e.target.value.toLowerCase());
      } else if (selectData === "a()") {
        return !item.athlete.toLowerCase().includes(e.target.value.toLowerCase());
      } else if (selectData === "=") {
        return item.athlete === e.target.value;
      } else if (selectData === "!=") {
        return item.athlete != e.target.value;
      } else if (selectData === "Aa") {
        return item.athlete.toLowerCase().startsWith(e.target.value.toLowerCase());
      } else if (selectData === "aA") {
        return item.athlete.toLowerCase().endsWith(e.target.value.toLowerCase());
      }
    });
    setFilterData(data);
  };
  const dateFilter = (e) => {
    const data = rowData.filter((item) =>{
      if(selectDate === 'greater'){
        return Date(item.date) < Date.parse(e.target.value);
      }else if(selectDate === 'less'){
        return  Date.parse(item.date) >  Date.parse(e.target.value)
      }else if(selectDate === '='){
        return  Date.parse(item.date) ===  Date.parse(e.target.value)
      }else if(selectDate === '!='){
        return  Date.parse(item.date) !=  Date.parse(e.target.value)
      }else if( selectDate === 'range'){
        return Date.parse(secSelectDate) >=  Date.parse(item.date) <=  Date.parse(e.target.value)
      }
    })
    setFilterData(data);
    
    // rowData.filter((d) =>{
    //  console.log('date111111111111111',Date.parse(d.date) > Date.parse(e.target.value));
    //   })
  };
  const numberFilter = (e) =>{
     const data = rowData.filter((item) =>{
      if(number === 'greater'){
        return item.gold > e.target.value
      }else if(number === 'less'){
        return item.gold < e.target.value
      }else if(number === '='){
        return item.gold == e.target.value
      }else if(number === '!='){
        return item.gold != e.target.value
      }
     })
  setFilterData(data);
  }
  return (
    <div className="App">
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">athlete</th>
            <th scope="col"> country</th>
            <th scope="col">date</th>
            <th scope="col">gold</th>
            <th scope="col">silver</th>
            <th scope="col">bronze</th>
            <th scope="col">sport</th>
            <th scope="col">total</th>
            <th scope="col">year</th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <div style={{ display: "flex" }}>
                <p>{selectData}</p>
                <div className="btn-group" style={{ marginRight: 10 }}>
                  <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("(a)")}> (a)Contains </a> </li>
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("a()")}> a() Not Contains</a></li>
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("=")}> = Equals </a></li>
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("!=")}> != Not Equal </a> </li>
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("Aa")}> Aa Start With </a> </li>
                    <li> <a className="dropdown-item" href="#" onClick={() => setSelectData("aA")}> aA End With</a></li>
                  </ul>
                </div>
                <input type="text" onChange={inputText} placeholder="Enter athlete" />
              </div>
            </th>
            <th scope="col"> <input type="text" /></th>
            <th scope="col">
            <div style={{ display: "flex" }}>
            <div className="btn-group" style={{ marginRight: 10 , alignItems: "center" }}>
                <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li> <a className="dropdown-item" href="#" onClick={() => setSelectDate("=")}> Equals </a></li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setSelectDate("greater")}> Greater Than</a> </li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setSelectDate("less")}> Less Than</a></li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setSelectDate("!=")}> Not Equal</a></li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setSelectDate("range")}>In Range</a></li>
                </ul>
             </div>
            <div style={{ display: "flex" }}>
              {selectDate === 'range' && <input type="date"  onChange={(e)=>setSecSelectDate(e.target.value)} style={{marginRight:10}}/> }
              <input type="date" onChange={dateFilter} />
              </div>
            </div>
            </th>
            <th scope="col">
            <div style={{ display: "flex" }}>
              <div className="btn-group" style={{ marginRight: 10 }}>
                  <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li> <a className="dropdown-item" href="#" onClick={() => setNumber("=")}> Equals </a></li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setNumber("greater")}> Greater Than</a> </li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setNumber("less")}> Less Than</a></li>
                  <li> <a className="dropdown-item" href="#" onClick={() => setNumber("!=")}> Not Equal</a></li>
                  </ul>
                </div> 
              <input type="number" onChange={numberFilter}/> 
             </div> 
             </th>
            <th scope="col"> <input type="number" /> </th>
            <th scope="col"> <input type="number" /> </th>
            <th scope="col"> <input type="number" /> </th>
            <th scope="col"> <input type="number" /> </th>
            <th scope="col"> <input type="number" /> </th>
          </tr>
        </thead>
        {(!filterData ? rowData : filterData)?.slice(0, 10)?.map((item) => (
          <>
            <tbody key={item.id}>
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.athlete}</td>
                <td>{item.country}</td>
                <td>{item.date}</td>
                <td>{item.gold}</td>
                <td>{item.silver}</td>
                <td>{item.bronze}</td>
                <td>{item.sport}</td>
                <td>{item.total}</td>
                <td>{item.year}</td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </div>
  );
}

export default App;
