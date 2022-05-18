import React from 'react'

const date = (props) => {
  return (
      <>
      
      <div className="btn-group" style={{ marginRight: 10 , alignItems: "center" }}>
        <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.data?.map((item)=>{return <li> <a className="dropdown-item" href="#" onClick={() => props.setSelectDate(item.id)}>{item.data}</a> </li>})}
          </ul>
      </div>
      <div style={{ display: "flex" }}>
        {props.selectDate === 'range' && <input type="date" value={props.secSelectDate}  onChange={(e)=>props.setSecSelectDate(e.target.value)} style={{marginRight:10}}/> }
        <input type="date" onChange={props.dateFilter}  value={props.fsSelectDate}/>
      </div> 
      </>
  )
}

export default date