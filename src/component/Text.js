import React from 'react'

const Text = (props) => {
  
  const inputText = (e) => {
    props.setAthlete(e.target.value)
   // //setRowData(datafil)
   // console.log('checked',e.target.value);
   console.log('jjjjjj',e.target.value,props.filterData);
   const data = props.filterData.filter((item) => {
     if (props.selectData === "(a)") {
       return item.athlete.toLowerCase().includes(props.athlete.toLowerCase());
     } else if (props.selectData === "a()") {
       return !item.athlete.toLowerCase().includes(props.athlete.toLowerCase());
     } else if (props.selectData === "=") {
       return item.athlete === props.athlete;
     } else if (props.selectData === "!=") {
       return item.athlete != props.athlete;
     } else if (props.selectData === "Aa") {
       return item.athlete.toLowerCase().startsWith(props.athlete.toLowerCase());
     } else if (props.selectData === "aA") {
       return item.athlete.toLowerCase().endsWith(props.athlete.toLowerCase());
     }
   });
   props.setFilterData(data);
   console.log('jjjjjj11111111',e.target.value,props.filterData);
 };


  return (
    <>
    <div className="btn-group" style={{ marginRight: 10 }}>
      <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.data?.map((item)=>{return <li> <a className="dropdown-item" href="#" onClick={() => props.setSelectData(item.id)}>{item.data}</a> </li>})}
      </ul>
    </div>
    <input type="text" onChange={inputText}  value={props.athlete} placeholder="Enter athlete" />
    </>
  )
}

export default Text