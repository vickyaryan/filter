const NumberFilter = (props) => {
  const numberFilter = (e) =>{
    props.setNumberData(e.target.value)
     const data =  props.filterData?.filter((item) =>{
       if(props.number === 'greater'){
         return item.gold > e.target.value
       }else if(props.number === 'less'){
         return item.gold < e.target.value
       }else if(props.number === '='){
         return item.gold == e.target.value
       }else if(props.number === '!='){
         return item.gold != e.target.value
       }
     })
     props.setFilterData(data);
  }


  return (
    <>
    <div className="btn-group" style={{ marginRight: 10 }}>
      <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      {props.data?.map((item)=>{return <li> <a className="dropdown-item" href="#" onClick={() => props.setNumber(item.id)}>{item.data}</a> </li>})}
      </ul>
    </div> 
        <input type="number" onChange={numberFilter}  value={props.numberData}/> 
    </>
  )
}


export default NumberFilter
