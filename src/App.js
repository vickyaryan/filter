import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {

const [rowData,setRowData] = useState()
const [filterData,setFilterData] = useState()
const [selectData,setSelectData] = useState('(a)')

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  });

  useEffect(() => {
    onGridReady()
  },[])

  const inputText =(e) => {
    const data = rowData.filter(item =>{
      if( selectData === '(a)'){
         return item.athlete.toLowerCase().includes(e.target.value.toLowerCase())
      }else if(selectData === 'a()'){
        return !item.athlete.toLowerCase().includes(e.target.value.toLowerCase())
      }else if(selectData === '='){
        return item.athlete === e.target.value
      }else if(selectData === '!='){
        return item.athlete != e.target.value
      }else if(selectData === 'Aa'){
        return item.athlete.toLowerCase().startsWith(e.target.value.toLowerCase())
      }else if(selectData === 'aA'){
        return item.athlete.toLowerCase().endsWith(e.target.value.toLowerCase())
      }
    })
    setFilterData(data)
    console.log('kkkk',data);
    console.log('kkkk111',e.target.value , selectData);
  }
  
  return (
    <div className="App">      
      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">athlete</th>
      <th scope="col">age</th>
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
      <div style={{display:'flex'}}>
        <h2>{selectData}</h2>
        <div class="btn-group" style={{marginRight:10}}>
          <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('(a)')}>(a)Contains</a></li>
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('a()')}>a() Not Contains</a></li>
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('=')}>= Equals</a></li>
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('!=')}>!= Not Equal</a></li>
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('Aa')}>Aa Start With</a></li>
              <li><a class="dropdown-item" href="#" onClick={()=>setSelectData('aA')}>aAEnd With</a></li>
           </ul>
        </div>
        <input type="text" onChange={inputText} placeholder="Enter athlete"/>
      </div>
      </th>
      <th scope="col">        
        <div class="btn-group" style={{marginRight:10}}>
          <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#" >Equal to</a></li>
              <li><a class="dropdown-item" href="#">Greater Then</a></li>
              <li><a class="dropdown-item" href="#">Less Then</a></li>
           </ul>
        </div>
        <input type="text" onChange={inputText} placeholder="Enter Age"/></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="date" onChange={inputText}/></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="text" /></th>
      <th scope="col"><input type="text" /></th>
    </tr>
  </thead>
  {(!filterData ?  rowData : filterData)?.slice(0,10)?.map(item => (
  <>
  <tbody key={item.id}>
    <tr >
      <th scope="row" >{item.id}</th>
      <td>{item.athlete}</td>
      <td>{item.age}</td>
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
