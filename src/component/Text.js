const Text = (props) => {
  
  const inputText = (e) => {
    props.setAthlete(e.target.value)
   // //setRowData(datafil)
   // console.log('checked',e.target.value);
   const data = props.filterData.filter((item) => {
     if (props.selectData === "(a)") {
       return item.athlete.toLowerCase().includes(e.target.value.toLowerCase());
     } else if (props.selectData === "a()") {
       return !item.athlete.toLowerCase().includes(e.target.value.toLowerCase());
     } else if (props.selectData === "=") {
       return item.athlete === e.target.value;
     } else if (props.selectData === "!=") {
       return item.athlete != e.target.value;
     } else if (props.selectData === "Aa") {
       return item.athlete.toLowerCase().startsWith(e.target.value.toLowerCase());
     } else if (props.selectData === "aA") {
       return item.athlete.toLowerCase().endsWith(e.target.value.toLowerCase());
     }
   });
   props.setFilterData(data);
 };


  return (
    <>
    <p>{props.selectData}</p>
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