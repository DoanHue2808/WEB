import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext'


import WebsiteLayout from "./layouts/WebsiteLayout";
import LoginLayout from "./layouts/LoginLayout";

import Login from "./pages/Login";
import Signup from './pages/Signup'
import Dashboard from "./components/Dashboard";
import Control from "./pages/Control";
import Datalog from "./components/Datalog/Datalog";

import { useGlobalContext } from './context/index';
import client from './utils/adafruit';

const App = () => {
    const { user } = useAuthContext();

    // Destructuring các hàm thay đổi sensor từ useGlobalContext
    const { setTemperature, setLightIntensity, setHumidity, setLightBtn, setPumperBtn, setAirBtn, setStrawStatus } = useGlobalContext()
    client.on('message', (topic, message, packet) => {
        console.log("Received '" + message + "' on '" + topic + "'");
        switch (topic.split("/")[2]) {
            case 'humidity-sensor':
                setHumidity((message.toString()));
                break;
            case 'temperature-sensor':
                setTemperature((message.toString()));
                break;
            case 'light-sensor':
                setLightIntensity((message.toString()));
                break;
            case 'fan':
                setAirBtn((message.toString()));
                break;
            case 'strawberry-status':
                setStrawStatus((message.toString()));
                break;
            case 'pumper':
                setPumperBtn((message.toString()));
                break;
            case 'led':
                setLightBtn((message.toString()));
                break;
            default:
                break;
        }
    });

    // return (<BrowserRouter>

    //         <Routes>
    //             <Route element={<WebsiteLayout />}>
    //                 <Route path="" element={<Dashboard />} />
    //                 <Route path="control" element={<Control />} />
    //                 <Route path="datalog" element={<Datalog />} />
    //                 <Route path="diagnose" element={<Dashboard />} />
    //                 <Route path="notification" element={<Dashboard />} />
    //                 <Route path="*" element={<Navigate replace to="/" />} />
    //             </Route>
    //     </Routes> 
    //     </BrowserRouter>)

    // return (<BrowserRouter>
    //     {user ?
    //         <Routes>
    //             <Route element={<WebsiteLayout />}>
    //                 <Route path="" element={<Dashboard />} />
    //                 <Route path="control" element={<Control />} />
    //                 <Route path="datalog" element={<Datalog />} />
    //                 <Route path="diagnose" element={<Dashboard />} />
    //                 <Route path="notification" element={<Dashboard />} />
    //                 <Route path="*" element={<Navigate replace to="/" />} />
    //             </Route>
    //         </Routes> :
    // <LoginLayout>
    //    <Routes>
    //        <Route path='/login' element={<Login />} />
    //        <Route path="/signup" element={<Signup />} />
    //        <Route path="*" element={<Navigate replace to="login" />} />
    //   </Routes>
    // </LoginLayout> 
    // }
    // </BrowserRouter >)
    // -----------------------
    const { temperature, humidity, lightIntensity, strawStatus } = useGlobalContext()
    return (
        <>
            <div>
                <h1>Humid: </h1>
                <h2>{humidity}</h2>
            </div>
            <div>
                <h1>Temperature: </h1>
                <h2>{temperature}</h2>
            </div>
            <div>
                <h1>LightIntensity: </h1>
                <h2>{lightIntensity}</h2>
            </div>
            <div>
                <h1>StrawStatus: </h1>
                <h2>{strawStatus}</h2>
            </div>
        </>
    )
    // -----------------------
}

export default App;
