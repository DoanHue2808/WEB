import React from 'react'
import DataFarm from './DataFarm'
import OverallChart from './OverallChart'
import { faLightbulb, faTemperatureLow,faTemperatureHigh,faNotesMedical} from '@fortawesome/free-solid-svg-icons'
import { faDroplet, faSeedling } from '@fortawesome/free-solid-svg-icons'
import "./style.scss"
import DiagData from '../DiagData/DiagData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalContext } from '../../context/index'
import getData from '../../utils/getData'

const labels = ['Mon', 'Tue', 'Thir', 'Wed', 'Fri', 'Sat', 'Sun'];

export default function Dashboard() {
  const [mode, setMode] = React.useState(0);
  const {temperature,humidity,lightIntensity,strawStatus} = useGlobalContext()
  const [data,setData] = React.useState([
    {
        name: "Nhiệt độ",
        color: "rgb(15, 136, 249)",
        data: []
    },
    {
        name: "Độ ẩm",
        color: "rgb(16, 213, 248)",
        data: []
    },
    {
        name: "Ánh sáng",
        color: "rgb(252, 163, 61)",
        data: []
    },
    {
        name: "Tình trạng cây",
        color: "rgb(63, 221, 102)",
        data: []
    }
  ])
  React.useEffect(()=>{
    const getAllData = async () => {
      setData([
        {
            name: "Nhiệt độ",
            color: "rgb(15, 136, 249)",
            data: (await getData('temperature-sensor')).map(e=>parseInt(e))
        },
        {
            name: "Độ ẩm",
            color: "rgb(16, 213, 248)",
            data: (await getData('humidity-sensor')).map(e=>parseInt(e))
        },
        {
            name: "Ánh sáng",
            color: "rgb(252, 163, 61)",
            data: (await getData('light-sensor')).map(e=>parseInt(e))
        },
        {
            name: "Tình trạng cây",
            color: "rgb(63, 221, 102)",
            data: (await getData('strawberry-status')).map(e=>{
              if (e === 'Good'){
                return 2
              }else if (e === 'Dry'){
                return 1
              }else{
                return 0
              }
            })
        }
      ])
    }
    getAllData()
  },[mode])
  const handleChange = (e)=>{
    setMode(e.target.value);
  }
  const renderIcon = (param = '0') => {
    switch(param) {
      case '0':
        return <FontAwesomeIcon icon={faTemperatureHigh} style={{ color: data[mode].color}}/>;
      case '1':
        return <FontAwesomeIcon icon={faDroplet} style={{ color:data[mode].color}}/>;
      case '2':
        return <FontAwesomeIcon icon={faLightbulb} style={{ color:data[mode].color}}/>;
      case '3':
        return <FontAwesomeIcon icon={faNotesMedical} style={{ color:data[mode].color}}/>;
      default:
        return <FontAwesomeIcon icon={faDroplet} style={{ color:data[mode].color}}/>;
    }
  }
  const renderText = (param = '0') => {
    switch(param) {
      case '0':
        return <div>
          <h2>Nhiệt độ</h2>
          <p>{temperature}°C</p>
        </div>;
      case '1':
        return <div>
        <h2>Độ ẩm</h2>
        <p>{humidity}%</p>
      </div>;
      case '2':
        return <div>
          <h2>Ánh sáng</h2>
          <p>{lightIntensity} Lux</p>
        </div>;
      case '3':
        return <div>
          <h2>Tình trạng</h2>
          <p>Good</p>
        </div>;
      default:
        return <div>
          <h2>Nhiệt độ</h2>
          <p>{temperature}°C</p>
        </div>;
    }
  }
  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <div className='dashboard-header-left'>
        <OverallChart/>
        <div className='dashboard-header-left-mode'>
          <button> Ngày</button>
          <button> Tuần</button>
          <button className='active'> Tháng</button>
          </div>
        </div>
        <div className='dashboard-header-right'>
        <div className='dashboard-header-right-top'>
        <div className='dashboard-header-right-top-left'>
          <div className='dashboard-header-right-top-left-left'>
            {renderIcon(mode)}
          </div>
          <div className='dashboard-header-right-top-left-right'>
            {renderText(mode)}
          </div>
        </div>
        <div className='dashboard-header-right-top-right'>
          <select onChange={handleChange}>
            <option value={0} key={0}>Nhiệt độ</option>
            <option value={1} key={1}>Độ ẩm</option>
            <option value={2} key={2}>Ánh sáng</option>
            <option value={3} key={3}>Tình trạng</option>
          </select>
          </div>
          
          </div>
        <div className='dashboard-header-right-bottom'>

        <DiagData data1= {data[mode]} labels={labels}/>
          <div className='dashboard-header-right-bottom-mode'>
          <button> Ngày</button>
          <button> Tuần</button>
          <button className='active'> Tháng</button>
          </div>
</div>
        </div>
      </div>
      <div className='dashboard-bottom'>
        <div className='dashboard-bottom-row'>

          <DataFarm data={{curVal: temperature, prevVal: 5 ,isCondition: false, color: "#0F88F9", name: "Nhiệt độ", icon: faTemperatureLow, postfix: "°C"}}/>
          <DataFarm data={{curVal: humidity, prevVal: 15 ,isCondition: false, color: "#10D5F8",name: "Độ ẩm",  icon: faDroplet, postfix: "%"}}/>
        </div>
        <div className='dashboard-bottom-row'>

          <DataFarm data={{curVal: lightIntensity, prevVal: 5 ,isCondition: false, color: "#FCA33D",name: "Ánh sáng",  icon: faLightbulb, postfix: "Lux "}} />
          <DataFarm data={{isCondition: true, color: "#3FDD66",name: "Tình trạng cây",  icon: faSeedling, curVal: strawStatus}}/>
      </div>
        </div>
    </div>
  )
}
