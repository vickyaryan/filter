import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Date from './component/date'
import Moment from 'moment';
import Text from "./component/Text";
import NumberFilter from './component/NumberFilter'
const datafil = [
 {"athlete":"Michael Phelps","age":23,"country":"United States","year":2008,"date":"12/08/2022","sport":"Swimming","gold":8,"silver":0,"bronze":0,"total":8,register: 'y'},
  {"athlete":"Michael Phelps","age":19,"country":"United States","year":2004,"date":"12/09/2032","sport":"Swimming","gold":6,"silver":0,"bronze":2,"total":8,register: 'n'},
  {"athlete":"Michael Phelps","age":27,"country":"United States","year":2012,"date":"12/10/2012","sport":"Swimming","gold":4,"silver":2,"bronze":0,"total":6,register: 'y'},
  {"athlete":"Natalie Coughlin","age":25,"country":"United States","year":2008,"date":"12/08/2012","sport":"Swimming","gold":1,"silver":2,"bronze":3,"total":6,register: 'n'},
  {"athlete":"Aleksey Nemov","age":24,"country":"Russia","year":2000,"date":"12/11/2012","sport":"Gymnastics","gold":2,"silver":1,"bronze":3,"total":6,register: 'y'},
  {"athlete":"Alicia Coutts","age":24,"country":"Australia","year":2012,"date":"12/12/2012","sport":"Swimming","gold":1,"silver":3,"bronze":1,"total":5,register: 'y'},
  {"athlete":"Missy Franklin","age":17,"country":"United States","year":2012,"date":"12/01/2012","sport":"Swimming","gold":4,"silver":0,"bronze":1,"total":5,register: 'n'},
  {"athlete":"Ryan Lochte","age":27,"country":"United States","year":2012,"date":"12/02/2012","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5,register: 'y'},
  {"athlete":"Allison Schmitt","age":22,"country":"United States","year":2012,"date":"12/03/2012","sport":"Swimming","gold":3,"silver":1,"bronze":1,"total":5,register: 'n'},
  {"athlete":"Natalie Coughlin","age":21,"country":"United States","year":2004,"date":"12/04/2012","sport":"Swimming","gold":2,"silver":2,"bronze":1,"total":5,register: 'y'}
]
function App() {
  const [inputTextName, setInputTextName] = useState()
  const [rowData, setRowData] = useState(datafil);
  const [filterData, setFilterData] = useState(datafil);
  const [selectData, setSelectData] = useState("(a)");
  const [selectDate, setSelectDate] = useState("greater");
  const [secSelectDate, setSecSelectDate] = useState('');
  const [number,setNumber] = useState("=")
  const [athlete,setAthlete] = useState('')
  const [fsSelectDate,setFsSelectDate] = useState('')
  const [checked, setChecked] = useState(false);
  const [numberData, setNumberData] = useState('')
  const conditionData = [
    {id:'(a)',data:'(a)Contains'},
    {id:'a()',data:'a() Not Contains'},
    {id:'=',data:'= Equals'},
    {id:'=',data:'!= Not Equals'},
    {id:'Aa',data:'Aa Start With'},
    {id:'aA',data:'aA End With'}
  ]
  const conditionDate = [
    {id:'greater',data:' Greater Than'},
    {id:'less',data:'Less Than'},
    {id:'=',data:'Equals'},
    {id:'!=',data:'Not Equal'},
    {id:'range',data:'In Range'},
  ]
  
  const DropdownNumber = [
    {id:'greater',data:' Greater Than'},
    {id:'less',data:'Less Than'},
    {id:'=',data:'Equals'},
    {id:'!=',data:'Not Equal'},
  ]
  
// useEffect(() => {
//   // setTimeout(() => {
//   //   setFilterData(datafil)
//   // }, 3000);
  
// },[numberData,fsSelectDate,athlete])
  // useEffect(() => {
    // setFilterData(datafil)
  //    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //      .then((resp) => resp.json())
  //      .then((data) => {
  //        setRowData(data);
  //       //console.log('hello',data);
  //      });
  //  }, []);

  const checkButton =() =>{
    setChecked(!checked)
    const data = rowData.filter((item) =>{
      if(!checked){return item.register === 'y'}
      else if(checked){return item.register === 'n'}
     })
     setFilterData(data);
  }
  const ClearDate = () =>{setSelectData('(a)'); setFilterData(datafil);setChecked(false);setSecSelectDate('');setFsSelectDate('');setSelectDate('');setAthlete('');setNumberData()}
  return (
    <div className="App">
      <div className="container">
       <input type="checkbox" defaultChecked={checked} onClick={checkButton}/> 
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
                <Text data={conditionData} filterData={filterData} selectData={selectData} setSelectData={setSelectData} setFilterData={setFilterData} athlete={athlete} setAthlete={setAthlete}   />
              </div>
            </th>
            <th scope="col"> <input type="text" /></th>
            <th scope="col">
            <div style={{ display: "flex" }}>
              <Date data={conditionDate} filterData={filterData} setFilterData={setFilterData} setSelectDate={setSelectDate}  secSelectDate={secSelectDate} setSecSelectDate={setSecSelectDate} fsSelectDate={fsSelectDate} setFsSelectDate={setFsSelectDate} selectDate={selectDate}/>
            </div>
            </th>
            <th scope="col"></th>
            <th scope="col">
            <div style={{ display: "flex" }}>
              <NumberFilter data={DropdownNumber} filterData={filterData} setFilterData={setFilterData} number={number} setNumber={setNumber} numberData={numberData}  setNumberData={setNumberData} />
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
                <th style={{textAlign: 'center'}} scope="row">{item.id}</th>
                <td style={{textAlign: 'center'}}>{item.athlete}</td>
                <td style={{textAlign: 'center'}}>{item.country}</td>
                <td style={{textAlign: 'center'}}>{Moment(item.date).format('DD-MM-YYYY')}</td>
                <td style={{textAlign: 'center'}}>{item.register}</td>
                <td style={{textAlign: 'center'}}>{item.gold}</td>
                <td style={{textAlign: 'center'}}>{item.silver}</td>
                <td style={{textAlign: 'center'}}>{item.bronze}</td>
                <td style={{textAlign: 'center'}}>{item.sport}</td>
                <td style={{textAlign: 'center'}}>{item.total}</td>
                <td style={{textAlign: 'center'}}>{item.year}</td>
              </tr>
            </tbody>
          </>
        ))}
      </table>
    </div>
  );
}

export default App;
