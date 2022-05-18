import React from 'react'

const NumberFilter = (props) => {
  const filterData = props.filterData;
  const numberFilter = (e) =>{
    console.log('kkkkkkkkkkkkkkkkk',props,e.target.value,filterData);
    props.setNumberData(e.target.value)
     const data = filterData?.filter((item) =>{
       console.log('kkkkkkkkk11111',item);
       if(props.number === 'greater'){
         return item.gold > props.numberData
       }else if(props.number === 'less'){
         return item.gold < props.numberData
       }else if(props.number === '='){
         return item.gold == props.numberData
       }else if(props.number === '!='){
         return item.gold != props.numberData
       }
     })
     console.log('kkkkkkkkkkkkkkkkk2222222222',data);
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
