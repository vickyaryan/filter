import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Moment from 'moment';
const datafil = [
 {athlete: 'Michael Phelps', age: 27, country: 'United States', year: 2012, date: '12/08/2022',register: 'y'},
 {athlete: 'Aleksey Nemov', age: 24, country: 'Russia', year: 2000, date: '01/10/2024',register: 'n'},
 {athlete: 'Alicia Coutts', age: 24, country: 'Australia', year: 2012, date: '12/08/2032',register: 'y'},
 {athlete: 'Missy Franklin', age: 17, country: 'United States', year: 2012, date: '12/08/2052',register: 'n'},
 {athlete: 'Ryan Lochte', age: 27, country: 'United States', year: 2012, date: '12/08/2042',register: 'y'},
]
function App() {
  const [rowData, setRowData] = useState(datafil);
  const [filterData, setFilterData] = useState();
  const [selectData, setSelectData] = useState("(a)");
  const [selectDate, setSelectDate] = useState("greater");
  const [secSelectDate, setSecSelectDate] = useState('');
  const [number,setNumber] = useState("=")
  const [athlete,setAthlete] = useState('')
  const [fsSelectDate,setFsSelectDate] = useState('')
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setRowData(data);
  //      //console.log('hello',data);
  //     });
  // }, []);


  const inputText =async (e) => {
    setAthlete(e.target.value)
    setFilterData(datafil)
    console.log('checked',e.target.value);
    const data = await rowData.filter((item) => {
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
    setFsSelectDate(e.target.value)
    var inputDate = Moment(e.target.value).format('DD-MM-YYYY')
    const data = rowData.filter((item) =>{
    var itemDate = Moment(item.date).format('DD-MM-YYYY')

      if(Date.parse(item.date) > Date.parse(e.target.value) && selectDate === 'greater'){
        return item
      }else if(Date.parse(item.date) <  Date.parse(e.target.value) && selectDate === 'less'){
         return item
       }else if(Date.parse(itemDate) ===  Date.parse(inputDate) && selectDate === '='){
         return item
       }else if(Date.parse(itemDate) !=  Date.parse(inputDate) && selectDate === '!='){
         return item
       }else if(Date.parse(secSelectDate) <  Date.parse(item.date) && Date.parse(item.date) <  Date.parse(e.target.value) && selectDate === 'range'){
         return item
       }
    })
    setFilterData(data)
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
  const checkButton =() =>{
    setChecked(!checked)
    console.log('checked',checked)
    const data = rowData.filter((item) =>{
      if(!checked){
        return item.register === 'y'
      }
      else if(checked){
        return item.register === 'n'
      }
     })
     setFilterData(data);
  }
  const ClearDate = () =>{
    setRowData(datafil)
    setChecked(false)
    setSecSelectDate('');
    setFsSelectDate('')
    setSelectDate('')
    setAthlete('');
  }
  return (
    <div className="App">
      <div className="container">
       <input type="checkbox" defaultChecked={checked} onClick={() => checkButton()}/> 
       <h2 className="margin">register</h2>
      <button className="clearData" onClick={() =>ClearDate()}>Clear</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">athlete</th>
            <th scope="col"> country</th>
            <th scope="col">date</th>
            <th scope="col">register</th>
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
                <input type="text" onChange={inputText}  value={athlete} placeholder="Enter athlete" />
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
              {selectDate === 'range' && <input type="date" value={secSelectDate}  onChange={(e)=>setSecSelectDate(e.target.value)} style={{marginRight:10}}/> }
              <input type="date" onChange={dateFilter}  value={fsSelectDate}/>
              </div>
            </div>
            </th>
            <th scope="col"></th>
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
                <td>{Moment(item.date).format('DD-MM-YYYY')}</td>
                <td>{item.register}</td>
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
