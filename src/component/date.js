import Moment from 'moment';

const date = (props) => {
  const dateFilter = (e) => {
    props.setFsSelectDate(e.target.value)
    var inputDate = Moment(e.target.value).format('DD-MM-YYYY')
    const data = props.filterData.filter((item) =>{
    var itemDate = Moment(item.date).format('DD-MM-YYYY')
      if(Date.parse(item.date) > Date.parse(e.target.value) && props.selectDate === 'greater'){
        return item
      }else if(Date.parse(item.date) <  Date.parse(e.target.value) && props.selectDate === 'less'){
         return item
       }else if(Date.parse(itemDate) ===  Date.parse(inputDate) && props.selectDate === '='){
         return item
       }else if(Date.parse(itemDate) !=  Date.parse(inputDate) && props.selectDate === '!='){
         return item
       }else if(Date.parse(props.secSelectDate) <  Date.parse(item.date) && Date.parse(item.date) <  Date.parse(e.target.value) && props.selectDate === 'range'){
         return item
       }
    })
    props.setFilterData(data)
  };

  return (
      <>
      <h4>{props.selectDate}</h4>
      <div className="btn-group" style={{ marginRight: 10 , alignItems: "center" }}>
        <a className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"/>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.data?.map((item)=>{return <li> <a className="dropdown-item" href="#" onClick={() => props.setSelectDate(item.id)}>{item.data}</a> </li>})}
          </ul>
      </div>
      <div style={{ display: "flex" }}>
        {props.selectDate === 'range' && <input type="date" value={props.secSelectDate}  onChange={(e)=>props.setSecSelectDate(e.target.value)} style={{marginRight:10}}/> }
        <input type="date" onChange={dateFilter}  value={props.fsSelectDate}/>
      </div> 
      </>
  )
}

export default date